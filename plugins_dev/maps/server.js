const fs = require("fs");
const path = require("path");

module.exports = function init(api) {
  const MAP_CHAT_GLOBAL_MAX = 200;
  const MAP_CHAT_LOCAL_RADIUS = Number.isFinite(Number(process.env.MAP_CHAT_LOCAL_RADIUS))
    ? Math.max(0.01, Math.min(1.0, Number(process.env.MAP_CHAT_LOCAL_RADIUS)))
    : 0.12; // positions are normalized 0..1

  const BUILTIN_MAPS = [
    {
      id: "studio",
      title: "Studio (demo)",
      owner: "",
      // Placeholder image; replace with your own PNG in a real plugin build.
      backgroundUrl: "/assets/logobzl.png",
      thumbUrl: "/assets/logobzl.png",
      world: { w: 1400, h: 900 },
      avatarSize: 36,
      cameraZoom: 2.35,
      collisions: [],
      masks: [],
      exits: [],
      hiddenMasks: [],
      occluders: [],
      ttrpgEnabled: false,
      sprites: [],
      props: [],
      walkiesEnabled: false
    }
  ];

  const DATA_DIR = path.join(process.cwd(), "data", "plugin-data");
  const MAPS_FILE = path.join(DATA_DIR, "maps.json");
  const AVATAR_PREFS_FILE = path.join(DATA_DIR, "maps-avatar-prefs.json");

  /** @type {Array<{id:string,title:string,owner:string,backgroundUrl:string,thumbUrl:string,world?:{w:number,h:number}|null,avatarSize?:number,cameraZoom?:number,collisions?:any[],masks?:any[],exits?:any[],ttrpgEnabled?:boolean,sprites?:any[],props?:any[],walkiesEnabled?:boolean}>} */
  let customMaps = [];
  /** @type {Array<{id:string,name:string,description:string,tags:string[],mode:string,avatar:any,createdBy:string,updatedBy:string,createdAt:number,updatedAt:number,published:boolean}>} */
  let avatarPresets = [];
  /** @type {Map<string, {mode:"profile_token",displayName:string,showUsername:boolean}>} */
  let avatarPrefsByUser = new Map();

  /** @type {Map<string, {users: Map<string, {x:number,y:number,color:string,image:string,invisible?:boolean,seq?:number}>, lastListAt:number, lastActiveAt:number, typing?: Map<string, number>, walkies?: Map<string, {url:string, pending:Set<string>, createdAt:number, mapId:string, timeout?:NodeJS.Timeout}>, chatGlobal?: Array<{id:string,fromUser:string,text:string,createdAt:number}>}>} */
  const rooms = new Map();
  const avatarSnapshotNeededByUser = new Set();

  function normId(raw) {
    const s = typeof raw === "string" ? raw.trim().toLowerCase() : "";
    if (!s) return "";
    if (!/^[a-z0-9][a-z0-9_.-]{0,31}$/.test(s)) return "";
    return s;
  }

  function clampInt(n, min, max) {
    const x = Math.floor(Number(n));
    if (!Number.isFinite(x)) return min;
    return Math.max(min, Math.min(max, x));
  }

  function isSafeImageUrl(url) {
    const u = typeof url === "string" ? url.trim() : "";
    if (!u) return false;
    if (u.startsWith("/uploads/")) return true;
    if (u.startsWith("/assets/")) return true;
    return false;
  }

  function isSafeUploadUrl(url) {
    const u = typeof url === "string" ? url.trim() : "";
    if (!u.startsWith("/uploads/")) return false;
    if (!/^\/uploads\/[a-zA-Z0-9][a-zA-Z0-9._-]{0,220}$/.test(u)) return false;
    return true;
  }

  function uploadsDir() {
    return process.env.UPLOADS_DIR || path.join(process.cwd(), "data", "uploads");
  }

  function tryDeleteUploadSoon(url, createdAt) {
    if (!isSafeUploadUrl(url)) return false;
    const filename = url.replace("/uploads/", "");
    const filePath = path.resolve(path.join(uploadsDir(), filename));
    const root = path.resolve(uploadsDir()) + path.sep;
    if (!filePath.startsWith(root)) return false;
    const now = api.now();
    // Only delete "fresh" uploads to avoid nuking older content.
    if (now - Number(createdAt || 0) > 10 * 60 * 1000) return false;
    try {
      const st = fs.statSync(filePath);
      if (!st.isFile()) return false;
      if (now - st.mtimeMs > 10 * 60 * 1000) return false;
      fs.unlinkSync(filePath);
      return true;
    } catch {
      return false;
    }
  }

  const walkieTelemetry = {
    counters: new Map(),
    lastFlushAt: 0
  };

  function walkieMetricKey(stage, mapId) {
    return `${String(stage || "unknown")}:${String(mapId || "_")}`;
  }

  function noteWalkie(stage, mapId, extra) {
    const key = walkieMetricKey(stage, mapId);
    walkieTelemetry.counters.set(key, Number(walkieTelemetry.counters.get(key) || 0) + 1);
    const now = api.now();
    if (now - walkieTelemetry.lastFlushAt < 60_000) return;
    walkieTelemetry.lastFlushAt = now;
    const snapshot = {};
    for (const [k, v] of walkieTelemetry.counters.entries()) snapshot[k] = v;
    if (extra && typeof extra === "object") {
      console.info("[maps/walkie]", stage, { mapId, ...extra, counters: snapshot });
      return;
    }
    console.info("[maps/walkie]", stage, { mapId, counters: snapshot });
  }

  function dropWalkiePendingForUser(room, username, reason) {
    if (!room || !room.walkies || !username) return;
    for (const [walkieId, entry] of room.walkies.entries()) {
      if (!entry?.pending || !entry.pending.has(username)) continue;
      entry.pending.delete(username);
      noteWalkie("pending-drop", entry.mapId || "", { walkieId, reason });
      if (entry.pending.size === 0) {
        cleanupWalkieEntry(room, walkieId, "cleanup-all-acked", { reason });
      }
    }
  }

  function clearRoomWalkies(room, reason) {
    if (!room || !room.walkies) return;
    for (const walkieId of room.walkies.keys()) cleanupWalkieEntry(room, walkieId, "cleanup-room-clear", { reason });
  }

  function cleanupWalkieEntry(room, walkieId, stage, extra) {
    if (!room?.walkies) return;
    const entry = room.walkies.get(walkieId);
    if (!entry) return;
    if (entry.timeout) {
      try {
        clearTimeout(entry.timeout);
      } catch {
        // ignore
      }
    }
    room.walkies.delete(walkieId);
    tryDeleteUploadSoon(entry.url, entry.createdAt);
    noteWalkie(stage || "cleanup", entry.mapId || "", { walkieId, ...(extra || {}) });
  }


  function normalizePolyList(list) {
    const input = Array.isArray(list) ? list : [];
    const out = [];
    const maxPolys = 80;
    const maxPoints = 60;
    for (const raw of input.slice(0, maxPolys)) {
      const points = Array.isArray(raw?.points) ? raw.points : [];
      if (points.length < 3) continue;
      const normPoints = [];
      for (const p of points.slice(0, maxPoints)) {
        const x = Number(p?.x);
        const y = Number(p?.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
        normPoints.push({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      }
      if (normPoints.length < 3) continue;
      out.push({ points: normPoints });
    }
    return out;
  }

  function normalizeFogList(list) {
    const input = Array.isArray(list) ? list : [];
    const out = [];
    const maxPolys = 80;
    const maxPoints = 60;
    for (const raw of input.slice(0, maxPolys)) {
      const points = Array.isArray(raw?.points) ? raw.points : [];
      if (points.length < 3) continue;
      const normPoints = [];
      for (const p of points.slice(0, maxPoints)) {
        const x = Number(p?.x);
        const y = Number(p?.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
        normPoints.push({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      }
      if (normPoints.length < 3) continue;
      const modeRaw =
        typeof raw?.mode === "string"
          ? raw.mode.trim().toLowerCase()
          : typeof raw?.reveal === "string"
            ? raw.reveal.trim().toLowerCase()
            : "";
      const mode = modeRaw === "manual" ? "manual" : "auto";
      const name = typeof raw?.name === "string" ? raw.name.trim().slice(0, 40) : "";
      out.push({ points: normPoints, mode, name });
    }
    return out;
  }

  function normalizeFallList(list) {
    const input = Array.isArray(list) ? list : [];
    const out = [];
    const maxPolys = 60;
    const maxPoints = 60;
    for (const raw of input.slice(0, maxPolys)) {
      const points = Array.isArray(raw?.points) ? raw.points : [];
      if (points.length < 3) continue;
      const normPoints = [];
      for (const p of points.slice(0, maxPoints)) {
        const x = Number(p?.x);
        const y = Number(p?.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
        normPoints.push({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      }
      if (normPoints.length < 3) continue;
      const dirRaw = typeof raw?.direction === "string" ? raw.direction.trim().toLowerCase() : "";
      const direction = dirRaw === "up" || dirRaw === "left" || dirRaw === "right" ? dirRaw : "down";
      const offset = clampFloat(raw?.offset, 0.002, 0.08, 0.02);
      const name = typeof raw?.name === "string" ? raw.name.trim().slice(0, 40) : "";
      out.push({ points: normPoints, direction, offset, name });
    }
    return out;
  }

  function normalizeExitList(list) {
    const input = Array.isArray(list) ? list : [];
    const out = [];
    const maxExits = 40;
    const maxPoints = 60;
    for (const raw of input.slice(0, maxExits)) {
      const points = Array.isArray(raw?.points) ? raw.points : [];
      if (points.length < 3) continue;
      const normPoints = [];
      for (const p of points.slice(0, maxPoints)) {
        const x = Number(p?.x);
        const y = Number(p?.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
        normPoints.push({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      }
      if (normPoints.length < 3) continue;
      const name = typeof raw?.name === "string" ? raw.name.trim().slice(0, 40) : "";
      const actionRaw = typeof raw?.action === "string" ? raw.action.trim() : "";
      const action = actionRaw === "toMap" ? "toMap" : "toMaps";
      const toMapId = action === "toMap" ? normId(raw?.toMapId || "") : "";
      if (action === "toMap" && !toMapId) continue;
      const targetExit = action === "toMap" && typeof raw?.targetExit === "string" ? raw.targetExit.trim().slice(0, 40) : "";
      out.push({ points: normPoints, name, action, toMapId, targetExit });
    }
    return out;
  }

  function normalizeSpriteList(list) {
    const input = Array.isArray(list) ? list : [];
    const out = [];
    const max = 120;
    for (const raw of input.slice(0, max)) {
      const id = typeof raw?.id === "string" ? raw.id.trim() : "";
      const safeId = id && /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,64}$/.test(id) ? id : randId("spr");
      const kind = raw?.kind === "token" ? "token" : "prop";
      const name = typeof raw?.name === "string" ? raw.name.trim().slice(0, 40) : "";
      const url = typeof raw?.url === "string" ? raw.url.trim() : "";
      if (!url.startsWith("/uploads/")) continue;
      if (!isSafeImageUrl(url)) continue;
      const scale = clampFloat(raw?.scale, 0.1, 4.0, 1.0);
      out.push({ id: safeId, kind, name, url, scale });
    }
    return out;
  }

  function normalizePropList(list, allowedSpriteIds = null) {
    const input = Array.isArray(list) ? list : [];
    const out = [];
    const max = 800;
    for (const raw of input.slice(0, max)) {
      const id = typeof raw?.id === "string" ? raw.id.trim() : "";
      const safeId = id && /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,64}$/.test(id) ? id : randId("prop");
      const spriteId = typeof raw?.spriteId === "string" ? raw.spriteId.trim() : "";
      if (!spriteId) continue;
      if (allowedSpriteIds && !allowedSpriteIds.has(spriteId)) continue;
      const x = clamp01(raw?.x);
      const y = clamp01(raw?.y);
      const z = clampInt(raw?.z || 0, -10_000, 10_000);
      const rot = clampFloat(raw?.rot, -180, 180, 0);
      const scale = clampFloat(raw?.scale, 0.1, 4.0, 1.0);
      const nickname = typeof raw?.nickname === "string" ? raw.nickname.trim().slice(0, 40) : "";
      const hpMax = clampInt(raw?.hpMax || 10, 0, 9999);
      const hpCurrent = clampInt(raw?.hpCurrent || hpMax, 0, hpMax > 0 ? hpMax : 9999);
      const controlledBy = typeof raw?.controlledBy === "string" ? normId(raw.controlledBy) : "";
      out.push({ id: safeId, spriteId, x, y, z, rot, scale, nickname, hpCurrent, hpMax, controlledBy });
    }
    return out;
  }

  function canManageMaps(ws, map) {
    const role = String(ws?.user?.role || "").toLowerCase();
    const username = userIdentity(ws);
    if (role === "owner" || role === "admin" || role === "moderator") return true;
    if (map && username && map.owner && username === map.owner) return true;
    return false;
  }

  function canManageAvatarPresets(ws) {
    const role = String(ws?.user?.role || "").toLowerCase();
    return role === "owner" || role === "admin" || role === "moderator";
  }

  function normalizePresetName(value) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, 40);
  }

  function normalizePresetDescription(value) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, 140);
  }

  function normalizePresetTags(list) {
    const src = Array.isArray(list) ? list : [];
    const out = [];
    const seen = new Set();
    for (const raw of src.slice(0, 12)) {
      const tag = String(raw || "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 24);
      if (!tag || seen.has(tag)) continue;
      seen.add(tag);
      out.push(tag);
    }
    return out;
  }

  function clamp01(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return 0;
    return Math.max(0, Math.min(1, x));
  }

  function clampSeq(n) {
    const x = Math.floor(Number(n));
    if (!Number.isFinite(x) || x < 0) return 0;
    return Math.min(1_000_000_000, x);
  }

  function clampFloat(n, min, max, fallback = min) {
    const x = Number(n);
    if (!Number.isFinite(x)) return fallback;
    return Math.max(min, Math.min(max, x));
  }

  function randId(prefix = "id") {
    return `${prefix}_${api.now()}_${Math.random().toString(16).slice(2)}`;
  }

  const saveTimersByMapId = new Map();
  function scheduleSaveSoon(mapId) {
    const mid = normId(mapId);
    if (!mid) return;
    const existing = saveTimersByMapId.get(mid);
    if (existing) clearTimeout(existing);
    saveTimersByMapId.set(
      mid,
      setTimeout(() => {
        saveTimersByMapId.delete(mid);
        try {
          saveCustomMapsToDisk();
        } catch (e) {
          console.warn("Maps plugin: failed to persist maps:", e?.message || e);
        }
      }, 500)
    );
  }

  function mapById(id) {
    const mid = normId(id);
    if (!mid) return null;
    return BUILTIN_MAPS.find((m) => m.id === mid) || customMaps.find((m) => m.id === mid) || null;
  }

  function spriteById(map, spriteId) {
    const sid = typeof spriteId === "string" ? spriteId.trim() : "";
    if (!sid) return null;
    const sprites = Array.isArray(map?.sprites) ? map.sprites : [];
    return sprites.find((s) => String(s?.id || "") === sid) || null;
  }

  function propById(map, propId) {
    const pid = typeof propId === "string" ? propId.trim() : "";
    if (!pid) return { prop: null, index: -1 };
    const props = Array.isArray(map?.props) ? map.props : [];
    const index = props.findIndex((p) => String(p?.id || "") === pid);
    return { prop: index >= 0 ? props[index] : null, index };
  }

  function roomFor(mapId) {
    const mid = normId(mapId);
    if (!mid) return null;
    if (!rooms.has(mid)) rooms.set(mid, { users: new Map(), lastListAt: 0, lastActiveAt: 0, typing: new Map(), walkies: new Map(), chatGlobal: [] });
    return rooms.get(mid) || null;
  }

  function touchRoomActivity(mapId) {
    const room = roomFor(mapId);
    if (!room) return;
    room.lastActiveAt = api.now();
    broadcastMapsListThrottled();
  }

  function mapsCapabilities(ws = null) {
    return {
      type: "plugin:maps:capabilities",
      version: "0.4.0",
      emittedAt: api.now(),
      mapId: normId(ws?.__mapsRoomId || ""),
      features: {
        focusMode: true,
        gmOverlay: true,
        avatarModes: ["profile_token", "frame_animation"],
        avatarPresets: true,
        walkieV2: true,
        spatialStreamAudio: false,
        undoRedo: false
      }
    };
  }

  function sanitizeDisplayName(name) {
    const raw = typeof name === "string" ? name : "";
    return raw.replace(/\s+/g, " ").trim().slice(0, 32);
  }

  function sanitizeFrameStateName(name) {
    const raw = typeof name === "string" ? name.trim() : "";
    if (!raw) return "";
    if (!/^[a-z][a-z0-9_]{0,31}$/i.test(raw)) return "";
    return raw;
  }

  function sanitizeHotkeyName(name) {
    const raw = typeof name === "string" ? name.trim() : "";
    if (!raw) return "";
    if (!/^(Digit[0-9]|Key[A-Z])$/.test(raw)) return "";
    return raw;
  }

  function normalizeFrameAnimation(raw) {
    const input = raw && typeof raw === "object" ? raw : {};
    const defaultFps = clampInt(input.defaultFps, 1, 24);
    const renderScale = clampFloat(input.renderScale, 0.25, 4.0, 1.0);
    const statesIn = input.states && typeof input.states === "object" ? input.states : {};
    const states = {};
    let totalFrames = 0;
    const MAX_STATES = 24;
    const MAX_FRAMES_PER_STATE = 48;
    const MAX_TOTAL_FRAMES = 220;
    for (const [stateRaw, defRaw] of Object.entries(statesIn).slice(0, MAX_STATES)) {
      const state = sanitizeFrameStateName(stateRaw);
      if (!state) continue;
      const def = defRaw && typeof defRaw === "object" ? defRaw : {};
      const framesIn = Array.isArray(def.frames) ? def.frames : [];
      const frames = [];
      for (const frameRaw of framesIn.slice(0, MAX_FRAMES_PER_STATE)) {
        const frameUrl = typeof frameRaw?.url === "string" ? frameRaw.url.trim() : "";
        if (!frameUrl || frameUrl.length > 240) continue;
        if (!isSafeImageUrl(frameUrl)) continue;
        const sx = clampInt(frameRaw?.sx, 0, 8192);
        const sy = clampInt(frameRaw?.sy, 0, 8192);
        const sw = clampInt(frameRaw?.sw, 1, 8192);
        const sh = clampInt(frameRaw?.sh, 1, 8192);
        const hasCrop =
          Number.isFinite(Number(frameRaw?.sx)) &&
          Number.isFinite(Number(frameRaw?.sy)) &&
          Number.isFinite(Number(frameRaw?.sw)) &&
          Number.isFinite(Number(frameRaw?.sh));
        frames.push(hasCrop ? { url: frameUrl, sx, sy, sw, sh } : { url: frameUrl });
        totalFrames += 1;
        if (totalFrames >= MAX_TOTAL_FRAMES) break;
      }
      if (!frames.length) continue;
      states[state] = {
        frames,
        fps: clampInt(def.fps, 1, 24),
        loop: Object.prototype.hasOwnProperty.call(def, "loop") ? Boolean(def.loop) : true,
        flipXWithDirection: Object.prototype.hasOwnProperty.call(def, "flipXWithDirection") ? Boolean(def.flipXWithDirection) : true
      };
      if (totalFrames >= MAX_TOTAL_FRAMES) break;
    }
    const movementMapIn = input.movementMap && typeof input.movementMap === "object" ? input.movementMap : {};
    const movementMap = {};
    const moveKeys = ["idle", "idleUp", "idleDown", "walkVertical", "walkHorizontal", "walkUp", "walkDown", "walkLeft", "walkRight"];
    for (const key of moveKeys) {
      const state = sanitizeFrameStateName(movementMapIn[key]);
      if (state && states[state]) movementMap[key] = state;
    }
    const emotesIn = Array.isArray(input.emotes) ? input.emotes : [];
    const emotes = [];
    for (const emoteRaw of emotesIn.slice(0, 16)) {
      const emote = emoteRaw && typeof emoteRaw === "object" ? emoteRaw : {};
      const name = sanitizeFrameStateName(emote.name);
      const state = sanitizeFrameStateName(emote.state);
      if (!name || !state || !states[state]) continue;
      emotes.push({
        name,
        state,
        hotkey: sanitizeHotkeyName(emote.hotkey),
        loop: Object.prototype.hasOwnProperty.call(emote, "loop") ? Boolean(emote.loop) : false,
        interruptible: Object.prototype.hasOwnProperty.call(emote, "interruptible") ? Boolean(emote.interruptible) : true
      });
    }
    if (!Object.keys(states).length) return null;
    return { defaultFps, renderScale, states, movementMap, emotes };
  }

  function estimateEmoteDurationMs(frameAnimation, emoteState) {
    const anim = frameAnimation && typeof frameAnimation === "object" ? frameAnimation : null;
    if (!anim) return 1000;
    const states = anim.states && typeof anim.states === "object" ? anim.states : {};
    const state = states[emoteState] && typeof states[emoteState] === "object" ? states[emoteState] : null;
    if (!state) return 1000;
    if (state.loop) return 1200;
    const frames = Array.isArray(state.frames) ? state.frames.length : 0;
    const fps = clampInt(state.fps || anim.defaultFps || 8, 1, 24);
    const raw = Math.round((Math.max(1, frames) / Math.max(1, fps)) * 1000);
    return Math.max(320, Math.min(4000, raw));
  }

  function resolveAvatarEmote(pref, msg) {
    if (!pref || pref.mode !== "frame_animation" || !pref.frameAnimation) return null;
    const anim = pref.frameAnimation;
    const emotes = Array.isArray(anim.emotes) ? anim.emotes : [];
    if (!emotes.length) return null;
    const nameRaw = typeof msg?.name === "string" ? msg.name.trim().toLowerCase() : "";
    const idxRaw = Number(msg?.index);
    let emote = null;
    if (nameRaw) {
      emote = emotes.find((e) => String(e?.name || "").toLowerCase() === nameRaw) || null;
    } else if (Number.isFinite(idxRaw) && idxRaw >= 0 && idxRaw < emotes.length) {
      emote = emotes[Math.floor(idxRaw)] || null;
    }
    if (!emote) return null;
    const state = sanitizeFrameStateName(emote.state);
    if (!state) return null;
    const durationMs = estimateEmoteDurationMs(anim, state);
    return { name: emote.name, state, loop: Boolean(emote.loop), durationMs };
  }

  function normalizeAvatarPref(raw) {
    const rawMode = String(raw?.mode || "profile_token").trim();
    const mode = rawMode === "frame_animation" ? "frame_animation" : "profile_token";
    const displayName = sanitizeDisplayName(raw?.displayName);
    const showUsername = raw && Object.prototype.hasOwnProperty.call(raw, "showUsername") ? Boolean(raw.showUsername) : true;
    const frameAnimation = mode === "frame_animation" ? normalizeFrameAnimation(raw?.frameAnimation) : null;
    return {
      mode: frameAnimation ? "frame_animation" : "profile_token",
      displayName,
      showUsername,
      frameAnimation: frameAnimation || null
    };
  }

  function loadAvatarPrefsFromDisk() {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      if (!fs.existsSync(AVATAR_PREFS_FILE)) {
        avatarPrefsByUser = new Map();
        return;
      }
      const raw = fs.readFileSync(AVATAR_PREFS_FILE, "utf8");
      const json = JSON.parse(raw);
      const users = json && typeof json === "object" ? json.users : null;
      const next = new Map();
      if (users && typeof users === "object") {
        for (const [usernameRaw, prefRaw] of Object.entries(users)) {
          const username = normId(usernameRaw);
          if (!username) continue;
          next.set(username, normalizeAvatarPref(prefRaw));
        }
      }
      avatarPrefsByUser = next;
    } catch (e) {
      console.warn("Maps plugin: failed to load avatar prefs:", e?.message || e);
      avatarPrefsByUser = new Map();
    }
  }

  function saveAvatarPrefsToDisk() {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const users = {};
    for (const [username, pref] of avatarPrefsByUser.entries()) users[username] = normalizeAvatarPref(pref);
    fs.writeFileSync(AVATAR_PREFS_FILE, JSON.stringify({ users }, null, 2));
  }

  function getAvatarPref(username) {
    const key = normId(username);
    if (!key) return normalizeAvatarPref(null);
    return normalizeAvatarPref(avatarPrefsByUser.get(key));
  }

  function normalizeAvatarPreset(raw, actor = "") {
    const name = normalizePresetName(raw?.name || "");
    if (!name) return null;
    const idRaw = typeof raw?.id === "string" ? normId(raw.id) : "";
    const avatar = normalizeAvatarPref(raw?.avatar || {});
    const now = api.now();
    return {
      id: idRaw || randId("preset"),
      name,
      description: normalizePresetDescription(raw?.description || ""),
      tags: normalizePresetTags(raw?.tags),
      mode: avatar.mode,
      avatar: {
        mode: avatar.mode,
        frameAnimation: avatar.frameAnimation || null
      },
      createdBy: normId(raw?.createdBy || actor || ""),
      updatedBy: normId(actor || raw?.updatedBy || ""),
      createdAt: clampInt(raw?.createdAt || now, 0, now + 365 * 24 * 60 * 60 * 1000),
      updatedAt: clampInt(now, 0, now + 365 * 24 * 60 * 60 * 1000),
      published: Boolean(raw?.published)
    };
  }

  function presetMetaPayload(preset) {
    return {
      id: preset.id,
      name: preset.name,
      description: preset.description || "",
      tags: Array.isArray(preset.tags) ? preset.tags : [],
      mode: preset.mode || "profile_token",
      createdBy: preset.createdBy || "",
      updatedBy: preset.updatedBy || "",
      createdAt: Number(preset.createdAt || 0) || 0,
      updatedAt: Number(preset.updatedAt || 0) || 0,
      published: Boolean(preset.published)
    };
  }

  function sendAvatarPresets(ws) {
    const canManage = canManageAvatarPresets(ws);
    const presets = avatarPresets
      .filter((preset) => canManage || Boolean(preset.published))
      .map((preset) => (canManage ? { ...presetMetaPayload(preset), avatar: preset.avatar } : presetMetaPayload(preset)));
    ws.send(JSON.stringify({ type: "plugin:maps:avatarPresets", presets, canManage }));
  }

  function findAvatarPresetIndexById(rawId) {
    const targetId = normId(rawId || "");
    if (!targetId) return -1;
    return avatarPresets.findIndex((preset) => normId(preset?.id || "") === targetId);
  }

  function sanitizeMapChatText(text) {
    const raw = typeof text === "string" ? text : "";
    return raw.replace(/\s+/g, " ").trim().slice(0, 420);
  }

  function distance01(ax, ay, bx, by) {
    const dx = Number(ax) - Number(bx);
    const dy = Number(ay) - Number(by);
    return Math.sqrt(dx * dx + dy * dy);
  }

  function userIdentity(ws) {
    const u = ws?.user?.username ? String(ws.user.username).trim().toLowerCase() : "";
    return u && /^[a-z0-9][a-z0-9_.-]{0,31}$/.test(u) ? u : "";
  }

  function listMapsPayload() {
    const t = api.now();
    const all = [...BUILTIN_MAPS, ...customMaps];
    return all.map((m) => {
      const room = rooms.get(m.id);
      const count = room ? Array.from(room.users.values()).filter((u) => !u?.invisible).length : 0;
      const lastActiveAt = Number(room?.lastActiveAt || 0) || 0;
      const live = count > 0 && t - lastActiveAt <= 60_000;
      return {
        id: m.id,
        title: m.title,
        owner: m.owner || "",
        thumbUrl: m.thumbUrl,
        backgroundUrl: m.backgroundUrl,
        world: m.world,
        avatarSize: clampInt(m.avatarSize || 36, 18, 96),
        cameraZoom: clampFloat(m.cameraZoom, 0.8, 5.0, 2.35),
        walkiesEnabled: Boolean(m.walkiesEnabled),
        ttrpgEnabled: Boolean(m.ttrpgEnabled),
        spritesCount: Array.isArray(m.sprites) ? m.sprites.length : 0,
        propsCount: Array.isArray(m.props) ? m.props.length : 0,
        collisionsCount: Array.isArray(m.collisions) ? m.collisions.length : 0,
        masksCount: Array.isArray(m.masks) ? m.masks.length : 0,
        exitsCount: Array.isArray(m.exits) ? m.exits.length : 0,
        userCount: count,
        live,
        lastActiveAt
      };
    });
  }

  function broadcastMapsListThrottled() {
    // Avoid spamming when users move around maps frequently.
    const t = api.now();
    let should = false;
    for (const m of [...BUILTIN_MAPS, ...customMaps]) {
      const r = roomFor(m.id);
      if (!r) continue;
      if (t - (r.lastListAt || 0) > 750) {
        r.lastListAt = t;
        should = true;
      }
    }
    if (!should) return;
    api.broadcast({ type: "plugin:maps:mapsList", maps: listMapsPayload() });
  }

  function usersInRoom(mapId) {
    const room = rooms.get(normId(mapId));
    if (!room) return [];
    return Array.from(room.users.keys());
  }

  function broadcastRoomState(mapId) {
    const mid = normId(mapId);
    const room = rooms.get(mid);
    if (!room) return;
    const all = Array.from(room.users.entries());
    const recipients = usersInRoom(mid);
    for (const recipient of recipients) {
      const includeAvatarSnapshot = avatarSnapshotNeededByUser.has(recipient);
      const users = all
        .filter(([username, u]) => username === recipient || !u?.invisible)
        .map(([username, u]) => {
          const base = {
            username,
            x: u.x,
            y: u.y,
            color: u.color || "",
            image: u.image || ""
          };
          if (includeAvatarSnapshot) {
            base.avatar = normalizeAvatarPref(u?.avatar || getAvatarPref(username));
          }
          return base;
        });
      const now = api.now();
      const typingUsers = Array.from(room.typing?.entries() || [])
        .filter(([name, until]) => name !== recipient && Number(until || 0) > now)
        .map(([name]) => name);
      const visibleCount = all.filter(([, u]) => !u?.invisible).length;
      const presence = { userCount: visibleCount, live: visibleCount > 0 && now - Number(room.lastActiveAt || 0) <= 60_000, lastActiveAt: Number(room.lastActiveAt || 0) || 0 };
      api.sendToUsers([recipient], { type: "plugin:maps:roomState", mapId: mid, users, typingUsers, presence });
      if (includeAvatarSnapshot) avatarSnapshotNeededByUser.delete(recipient);
    }
    broadcastMapsListThrottled();
  }

  function leaveAnyRoom(ws) {
    const username = userIdentity(ws);
    if (!username) return;
    const current = normId(ws.__mapsRoomId || "");
    if (!current) return;
    const room = rooms.get(current);
    if (!room) {
      ws.__mapsRoomId = "";
      ws.__mapsInvisible = 0;
      ws.__mapsSpeakAsPropId = "";
      return;
    }
    dropWalkiePendingForUser(room, username, "leave");
    if (room.users.has(username)) room.users.delete(username);
    if (room.typing && room.typing.has(username)) room.typing.delete(username);
    ws.__mapsRoomId = "";
    ws.__mapsInvisible = 0;
    ws.__mapsSpeakAsPropId = "";
    if (room.users.size === 0) {
      clearRoomWalkies(room, "room-empty");
      rooms.delete(current);
    }
    broadcastRoomState(current);
  }

  api.onWsClose((ws) => {
    leaveAnyRoom(ws);
  });

  function loadCustomMapsFromDisk() {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      if (!fs.existsSync(MAPS_FILE)) {
        customMaps = [];
        return;
      }
      const raw = fs.readFileSync(MAPS_FILE, "utf8");
      const json = JSON.parse(raw);
      const list = Array.isArray(json?.maps) ? json.maps : [];
      const presetList = Array.isArray(json?.avatarPresets) ? json.avatarPresets : [];
      const next = [];
      for (const m of list) {
        const id = normId(m?.id || "");
        if (!id) continue;
        if (BUILTIN_MAPS.some((b) => b.id === id)) continue;
        const title = typeof m?.title === "string" ? m.title.trim().slice(0, 60) : id;
        const owner = typeof m?.owner === "string" ? normId(m.owner) : "";
        const backgroundUrl = typeof m?.backgroundUrl === "string" ? m.backgroundUrl.trim() : "";
        const thumbUrl = typeof m?.thumbUrl === "string" ? m.thumbUrl.trim() : backgroundUrl;
        if (!isSafeImageUrl(backgroundUrl) || !isSafeImageUrl(thumbUrl)) continue;
        const avatarSize = clampInt(m?.avatarSize || 36, 18, 96);
        const cameraZoom = clampFloat(m?.cameraZoom, 0.8, 5.0, 2.35);
        const walkiesEnabled = Boolean(m?.walkiesEnabled);
        const world =
          m?.world && typeof m.world === "object"
            ? { w: clampInt(m.world.w, 200, 10000), h: clampInt(m.world.h, 200, 10000) }
            : null;
        const collisions = normalizePolyList(m?.collisions);
        const masks = normalizePolyList(m?.masks);
        const exits = normalizeExitList(m?.exits);
        const hiddenMasks = normalizeFogList(m?.hiddenMasks);
        const occluders = normalizePolyList(m?.occluders);
        const fallThroughs = normalizeFallList(m?.fallThroughs);
        const ttrpgEnabled = Boolean(m?.ttrpgEnabled);
        const sprites = normalizeSpriteList(m?.sprites);
        const spriteIds = new Set(sprites.map((s) => s.id));
        const props = normalizePropList(m?.props, spriteIds);
        next.push({
          id,
          title,
          owner,
          backgroundUrl,
          thumbUrl,
          world,
          avatarSize,
          cameraZoom,
          collisions,
          masks,
          exits,
          hiddenMasks,
          occluders,
          fallThroughs,
          ttrpgEnabled,
          sprites,
          props,
          walkiesEnabled
        });
      }
      customMaps = next;
      const nextPresets = [];
      const seenPresetIds = new Set();
      for (const rawPreset of presetList) {
        const preset = normalizeAvatarPreset(rawPreset || {}, rawPreset?.updatedBy || rawPreset?.createdBy || "");
        if (!preset) continue;
        if (seenPresetIds.has(preset.id)) continue;
        seenPresetIds.add(preset.id);
        nextPresets.push(preset);
      }
      avatarPresets = nextPresets;
    } catch (e) {
      console.warn("Maps plugin: failed to load custom maps:", e?.message || e);
      customMaps = [];
      avatarPresets = [];
    }
  }

  function saveCustomMapsToDisk() {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(MAPS_FILE, JSON.stringify({ maps: customMaps, avatarPresets }, null, 2));
  }

  loadCustomMapsFromDisk();
  loadAvatarPrefsFromDisk();

  api.registerWs("list", (ws) => {
    ws.send(JSON.stringify({ type: "plugin:maps:mapsList", maps: listMapsPayload() }));
    ws.send(JSON.stringify(mapsCapabilities(ws)));
    sendAvatarPresets(ws);
  });

  api.registerWs("createMap", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Sign in required." }));
      return;
    }
    const role = String(ws?.user?.role || "").toLowerCase();
    if (role !== "owner" && role !== "admin" && role !== "moderator") {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Owner/admin/mod access required to create maps." }));
      return;
    }

    const id = normId(msg?.id || "");
    if (!id) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Invalid map id." }));
      return;
    }
    if (mapById(id)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map id already exists." }));
      return;
    }

    const title = typeof msg?.title === "string" ? msg.title.trim().slice(0, 60) : "";
    if (!title) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Missing map title." }));
      return;
    }
    const backgroundUrl = typeof msg?.backgroundUrl === "string" ? msg.backgroundUrl.trim() : "";
    const thumbUrl = typeof msg?.thumbUrl === "string" ? msg.thumbUrl.trim() : backgroundUrl;
    if (!isSafeImageUrl(backgroundUrl) || !isSafeImageUrl(thumbUrl)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Invalid map image URL." }));
      return;
    }
    const avatarSize = clampInt(msg?.avatarSize || 36, 18, 96);

    customMaps.push({
      id,
      title,
      owner: username,
      backgroundUrl,
      thumbUrl,
      world: null,
      avatarSize,
      cameraZoom: 2.35,
      collisions: [],
      masks: [],
      exits: [],
      hiddenMasks: [],
      occluders: [],
      fallThroughs: [],
      ttrpgEnabled: false,
      sprites: [],
      props: [],
      walkiesEnabled: false
    });
    try {
      saveCustomMapsToDisk();
    } catch (e) {
      customMaps = customMaps.filter((m) => m.id !== id);
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Failed to save map." }));
      return;
    }

    api.broadcast({ type: "plugin:maps:mapsList", maps: listMapsPayload() });
  });

  api.registerWs("updateMap", (ws, msg) => {
    const mapId = normId(msg?.id || "");
    const map = mapById(mapId);
    if (!map || BUILTIN_MAPS.some((m) => m.id === mapId)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    const idx = customMaps.findIndex((m) => m.id === mapId);
    if (idx < 0) return;

    const next = { ...customMaps[idx] };
    const patch = {};
    if (msg && Object.prototype.hasOwnProperty.call(msg, "avatarSize")) {
      next.avatarSize = clampInt(msg.avatarSize, 18, 96);
      patch.avatarSize = next.avatarSize;
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "cameraZoom")) {
      next.cameraZoom = clampFloat(msg.cameraZoom, 0.8, 5.0, 2.35);
      patch.cameraZoom = next.cameraZoom;
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "collisions")) {
      next.collisions = normalizePolyList(msg.collisions);
      patch.collisions = next.collisions;
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "masks")) {
      next.masks = normalizePolyList(msg.masks);
      patch.masks = next.masks;
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "exits")) {
      next.exits = normalizeExitList(msg.exits);
      patch.exits = next.exits;
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "hiddenMasks")) {
      next.hiddenMasks = normalizeFogList(msg.hiddenMasks);
      patch.hiddenMasks = next.hiddenMasks;
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "occluders")) {
      next.occluders = normalizePolyList(msg.occluders);
      patch.occluders = next.occluders;
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "fallThroughs")) {
      next.fallThroughs = normalizeFallList(msg.fallThroughs);
      patch.fallThroughs = next.fallThroughs;
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "ttrpgEnabled")) {
      next.ttrpgEnabled = Boolean(msg.ttrpgEnabled);
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "sprites")) {
      next.sprites = normalizeSpriteList(msg.sprites);
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "props")) {
      const spriteIds = new Set((Array.isArray(next.sprites) ? next.sprites : []).map((s) => s?.id).filter(Boolean));
      next.props = normalizePropList(msg.props, spriteIds);
    }
    if (msg && Object.prototype.hasOwnProperty.call(msg, "walkiesEnabled")) {
      next.walkiesEnabled = Boolean(msg.walkiesEnabled);
      patch.walkiesEnabled = next.walkiesEnabled;
    }
    customMaps[idx] = next;
    scheduleSaveSoon(mapId);
    api.broadcast({ type: "plugin:maps:mapsList", maps: listMapsPayload() });
    if (Object.keys(patch).length) {
      sendToRoom(mapId, { type: "plugin:maps:mapPatched", mapId, patch });
    }
  });

  function customMapIndex(mapId) {
    const mid = normId(mapId);
    if (!mid) return -1;
    return customMaps.findIndex((m) => m.id === mid);
  }

  function sendToRoom(mapId, msg) {
    const mid = normId(mapId);
    if (!mid) return 0;
    return api.sendToUsers(usersInRoom(mid), msg);
  }

  api.registerWs("ttrpgSetEnabled", (ws, msg) => {
    const mapId = normId(msg?.mapId || msg?.id || "");
    const idx = customMapIndex(mapId);
    if (idx < 0) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }
    const map = customMaps[idx];
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    map.ttrpgEnabled = Boolean(msg?.enabled);
    scheduleSaveSoon(mapId);
    api.broadcast({ type: "plugin:maps:mapsList", maps: listMapsPayload() });
    sendToRoom(mapId, { type: "plugin:maps:ttrpgEnabled", mapId, enabled: Boolean(map.ttrpgEnabled) });
  });

  api.registerWs("ttrpgSpriteAdd", (ws, msg) => {
    const mapId = normId(msg?.mapId || "");
    const idx = customMapIndex(mapId);
    if (idx < 0) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }
    const map = customMaps[idx];
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    const url = typeof msg?.url === "string" ? msg.url.trim() : "";
    if (!url.startsWith("/uploads/") || !isSafeImageUrl(url)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Invalid sprite image URL." }));
      return;
    }
    const kind = msg?.kind === "token" ? "token" : "prop";
    const name = typeof msg?.name === "string" ? msg.name.trim().slice(0, 40) : "";
    const scale = clampFloat(msg?.scale, 0.1, 4.0, 1.0);
    const id = typeof msg?.id === "string" && /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,64}$/.test(msg.id) ? msg.id : randId("spr");
    const sprite = { id, kind, name, url, scale };
    if (!Array.isArray(map.sprites)) map.sprites = [];
    map.sprites = normalizeSpriteList([...map.sprites, sprite]);
    scheduleSaveSoon(mapId);
    sendToRoom(mapId, { type: "plugin:maps:spriteAdded", mapId, sprite });
    api.broadcast({ type: "plugin:maps:mapsList", maps: listMapsPayload() });
  });

  api.registerWs("ttrpgSpriteRemove", (ws, msg) => {
    const mapId = normId(msg?.mapId || "");
    const idx = customMapIndex(mapId);
    if (idx < 0) return;
    const map = customMaps[idx];
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    const spriteId = typeof msg?.spriteId === "string" ? msg.spriteId.trim() : "";
    if (!spriteId) return;
    map.sprites = (Array.isArray(map.sprites) ? map.sprites : []).filter((s) => String(s?.id || "") !== spriteId);
    map.props = (Array.isArray(map.props) ? map.props : []).filter((p) => String(p?.spriteId || "") !== spriteId);
    scheduleSaveSoon(mapId);
    sendToRoom(mapId, { type: "plugin:maps:spriteRemoved", mapId, spriteId });
    sendToRoom(mapId, { type: "plugin:maps:propsReset", mapId, props: Array.isArray(map.props) ? map.props : [] });
    api.broadcast({ type: "plugin:maps:mapsList", maps: listMapsPayload() });
  });

  api.registerWs("ttrpgPropAdd", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || msg?.mapId || "");
    const idx = customMapIndex(mapId);
    if (idx < 0) return;
    const map = customMaps[idx];
    if (!map.ttrpgEnabled) return;
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    const spriteId = typeof msg?.spriteId === "string" ? msg.spriteId.trim() : "";
    const spriteOk = (Array.isArray(map.sprites) ? map.sprites : []).some((s) => String(s?.id || "") === spriteId);
    if (!spriteId || !spriteOk) return;
    const x = clamp01(msg?.x);
    const y = clamp01(msg?.y);
    const z = clampInt(msg?.z || 0, -10_000, 10_000);
    const rot = clampFloat(msg?.rot, -180, 180, 0);
    const scale = clampFloat(msg?.scale, 0.1, 4.0, 1.0);
    const sprite = spriteById(map, spriteId);
    const nickname = typeof msg?.nickname === "string" ? msg.nickname.trim().slice(0, 40) : "";
    const hpMax = clampInt(msg?.hpMax || 10, 0, 9999);
    const hpCurrent = clampInt(msg?.hpCurrent || hpMax, 0, hpMax > 0 ? hpMax : 9999);
    const id = typeof msg?.id === "string" && /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,64}$/.test(msg.id) ? msg.id : randId("prop");
    const prop = {
      id,
      spriteId,
      x,
      y,
      z,
      rot,
      scale,
      nickname: sprite?.kind === "token" ? nickname : "",
      hpCurrent: sprite?.kind === "token" ? hpCurrent : 0,
      hpMax: sprite?.kind === "token" ? hpMax : 0,
      controlledBy: ""
    };
    if (!Array.isArray(map.props)) map.props = [];
    map.props = normalizePropList([...map.props, prop], new Set(map.sprites.map((s) => s.id)));
    scheduleSaveSoon(mapId);
    sendToRoom(mapId, { type: "plugin:maps:propAdded", mapId, prop });
    api.broadcast({ type: "plugin:maps:mapsList", maps: listMapsPayload() });
  });

  api.registerWs("ttrpgPropMove", (ws, msg) => {
    const mapId = normId(ws.__mapsRoomId || msg?.mapId || "");
    const idx = customMapIndex(mapId);
    if (idx < 0) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }
    const map = customMaps[idx];
    if (!map.ttrpgEnabled) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "TTRPG mode is disabled for this map." }));
      return;
    }
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    const propId = typeof msg?.propId === "string" ? msg.propId.trim() : "";
    if (!propId) return;
    const list = Array.isArray(map.props) ? map.props : [];
    const pidx = list.findIndex((p) => String(p?.id || "") === propId);
    if (pidx < 0) return;
    const prev = list[pidx] || {};
    const x = clamp01(msg?.x);
    const y = clamp01(msg?.y);
    const z = Object.prototype.hasOwnProperty.call(msg || {}, "z") ? clampInt(msg?.z || 0, -10_000, 10_000) : prev.z || 0;
    const rot = Object.prototype.hasOwnProperty.call(msg || {}, "rot") ? clampFloat(msg?.rot, -180, 180, 0) : prev.rot || 0;
    const scale = Object.prototype.hasOwnProperty.call(msg || {}, "scale") ? clampFloat(msg?.scale, 0.1, 4.0, 1.0) : clampFloat(prev.scale, 0.1, 4.0, 1.0);
    list[pidx] = { ...prev, x, y, z, rot, scale };
    map.props = list;
    scheduleSaveSoon(mapId);
    sendToRoom(mapId, { type: "plugin:maps:propMoved", mapId, propId, x, y, z, rot, scale });
  });

  api.registerWs("ttrpgPropPatch", (ws, msg) => {
    const mapId = normId(ws.__mapsRoomId || msg?.mapId || "");
    const idx = customMapIndex(mapId);
    if (idx < 0) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }
    const map = customMaps[idx];
    if (!map.ttrpgEnabled) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "TTRPG mode is disabled for this map." }));
      return;
    }
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    const propId = typeof msg?.propId === "string" ? msg.propId.trim() : "";
    const { prop: prev, index: pidx } = propById(map, propId);
    if (!prev || pidx < 0) return;
    const sprite = spriteById(map, String(prev.spriteId || ""));
    const isToken = sprite?.kind === "token";
    const patch = {};
    if (Object.prototype.hasOwnProperty.call(msg || {}, "nickname")) {
      patch.nickname = isToken ? String(msg?.nickname || "").trim().slice(0, 40) : "";
    }
    if (Object.prototype.hasOwnProperty.call(msg || {}, "hpMax")) {
      patch.hpMax = isToken ? clampInt(msg?.hpMax || 0, 0, 9999) : 0;
    }
    if (Object.prototype.hasOwnProperty.call(msg || {}, "hpCurrent")) {
      const currentCap = Object.prototype.hasOwnProperty.call(patch, "hpMax") ? patch.hpMax : clampInt(prev.hpMax || 0, 0, 9999);
      patch.hpCurrent = isToken ? clampInt(msg?.hpCurrent || 0, 0, currentCap > 0 ? currentCap : 9999) : 0;
    }
    if (!Object.keys(patch).length) return;
    const next = { ...prev, ...patch };
    map.props[pidx] = next;
    scheduleSaveSoon(mapId);
    sendToRoom(mapId, { type: "plugin:maps:propPatched", mapId, prop: next });
  });

  api.registerWs("ttrpgTokenPossess", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || msg?.mapId || "");
    const idx = customMapIndex(mapId);
    if (idx < 0) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }
    const map = customMaps[idx];
    if (!map.ttrpgEnabled) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "TTRPG mode is disabled for this map." }));
      return;
    }
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    const action = msg?.action === "release" ? "release" : "possess";
    const props = Array.isArray(map.props) ? map.props : [];

    // Release always clears *all* tokens controlled by this user (prevents "stuck" control).
    if (action === "release") {
      let changed = false;
      for (let i = 0; i < props.length; i++) {
        const p = props[i];
        if (!p) continue;
        if (String(p.controlledBy || "") !== username) continue;
        const spr = spriteById(map, String(p.spriteId || ""));
        if (!spr || spr.kind !== "token") continue;
        props[i] = { ...p, controlledBy: "" };
        changed = true;
        sendToRoom(mapId, { type: "plugin:maps:propPatched", mapId, prop: props[i] });
      }
      ws.__mapsSpeakAsPropId = "";
      if (changed) {
        map.props = props;
        scheduleSaveSoon(mapId);
      }
      return;
    }

    const propId = typeof msg?.propId === "string" ? msg.propId.trim() : "";
    const { prop: prev, index: pidx } = propById(map, propId);
    if (!prev || pidx < 0) return;
    const sprite = spriteById(map, String(prev.spriteId || ""));
    if (!sprite || sprite.kind !== "token") return;
    if (prev.controlledBy && prev.controlledBy !== username) return;

    // Possession is exclusive per user: release any other controlled tokens first.
    for (let i = 0; i < props.length; i++) {
      const p = props[i];
      if (!p) continue;
      if (String(p.id || "") === propId) continue;
      if (String(p.controlledBy || "") !== username) continue;
      const spr = spriteById(map, String(p.spriteId || ""));
      if (!spr || spr.kind !== "token") continue;
      props[i] = { ...p, controlledBy: "" };
      sendToRoom(mapId, { type: "plugin:maps:propPatched", mapId, prop: props[i] });
    }

    const next = { ...prev, controlledBy: username };
    props[pidx] = next;
    map.props = props;
    ws.__mapsSpeakAsPropId = propId;
    scheduleSaveSoon(mapId);
    sendToRoom(mapId, { type: "plugin:maps:propPatched", mapId, prop: next });
  });

  api.registerWs("ttrpgPropRemove", (ws, msg) => {
    const mapId = normId(ws.__mapsRoomId || msg?.mapId || "");
    const idx = customMapIndex(mapId);
    if (idx < 0) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }
    const map = customMaps[idx];
    if (!map.ttrpgEnabled) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "TTRPG mode is disabled for this map." }));
      return;
    }
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    const propId = typeof msg?.propId === "string" ? msg.propId.trim() : "";
    if (!propId) return;
    map.props = (Array.isArray(map.props) ? map.props : []).filter((p) => String(p?.id || "") !== propId);
    scheduleSaveSoon(mapId);
    sendToRoom(mapId, { type: "plugin:maps:propRemoved", mapId, propId });
    api.broadcast({ type: "plugin:maps:mapsList", maps: listMapsPayload() });
  });

  api.registerWs("deleteMap", (ws, msg) => {
    const mapId = normId(msg?.id || "");
    const map = mapById(mapId);
    if (!map || BUILTIN_MAPS.some((m) => m.id === mapId)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    customMaps = customMaps.filter((m) => m.id !== mapId);
    try {
      saveCustomMapsToDisk();
    } catch (e) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Failed to delete map." }));
      return;
    }
    api.broadcast({ type: "plugin:maps:mapsList", maps: listMapsPayload() });
  });

  api.registerWs("join", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Sign in required." }));
      return;
    }
    const mapId = normId(msg?.mapId || "");
    const map = mapById(mapId);
    if (!map) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }

    leaveAnyRoom(ws);

    const room = roomFor(mapId);
    if (!room) return;

    const prof = api.getProfile(username) || {};
    const color = typeof prof.color === "string" ? prof.color : "";
    const image = typeof prof.image === "string" ? prof.image : "";
    room.users.set(username, { x: Math.random(), y: Math.random(), color, image, avatar: getAvatarPref(username), invisible: false, seq: 0 });
    room.lastActiveAt = api.now();
    avatarSnapshotNeededByUser.add(username);
    ws.__mapsRoomId = mapId;
    ws.__mapsInvisible = 0;

    ws.send(
      JSON.stringify({
        type: "plugin:maps:joinOk",
        map: {
          id: map.id,
          title: map.title,
          owner: map.owner || "",
          backgroundUrl: map.backgroundUrl,
          world: map.world || null,
          avatarSize: clampInt(map.avatarSize || 36, 18, 96),
          cameraZoom: clampFloat(map.cameraZoom, 0.8, 5.0, 2.35),
          collisions: Array.isArray(map.collisions) ? map.collisions : [],
          masks: Array.isArray(map.masks) ? map.masks : [],
          exits: Array.isArray(map.exits) ? map.exits : [],
          hiddenMasks: Array.isArray(map.hiddenMasks) ? map.hiddenMasks : [],
          occluders: Array.isArray(map.occluders) ? map.occluders : [],
          fallThroughs: Array.isArray(map.fallThroughs) ? map.fallThroughs : [],
          ttrpgEnabled: Boolean(map.ttrpgEnabled),
          sprites: Array.isArray(map.sprites) ? map.sprites : [],
          props: Array.isArray(map.props) ? map.props : [],
          walkiesEnabled: Boolean(map.walkiesEnabled)
        },
        selfInvisible: false
      })
    );
    ws.send(JSON.stringify(mapsCapabilities(ws)));
    sendAvatarPresets(ws);
    broadcastRoomState(mapId);
  });

  api.registerWs("getCapabilities", (ws) => {
    ws.send(JSON.stringify(mapsCapabilities(ws)));
  });

  api.registerWs("setAvatar", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const avatar = normalizeAvatarPref(msg || {});
    avatarPrefsByUser.set(username, avatar);
    try {
      saveAvatarPrefsToDisk();
    } catch (e) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Failed to save avatar settings." }));
      return;
    }
    const mapId = normId(ws.__mapsRoomId || "");
    const room = mapId ? rooms.get(mapId) : null;
    if (room && room.users.has(username)) {
      const current = room.users.get(username) || {};
      room.users.set(username, { ...current, avatar });
      api.sendToUsers(usersInRoom(mapId), { type: "plugin:maps:avatarChanged", mapId, username, avatar });
      broadcastRoomState(mapId);
    }
    ws.send(JSON.stringify({ type: "plugin:maps:avatarSet", avatar }));
  });

  api.registerWs("listAvatarPresets", (ws) => {
    sendAvatarPresets(ws);
  });

  api.registerWs("upsertAvatarPreset", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    if (!canManageAvatarPresets(ws)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Owner/admin/mod access required." }));
      return;
    }
    const normalized = normalizeAvatarPreset(msg || {}, username);
    if (!normalized) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Invalid avatar preset." }));
      return;
    }
    const idx = findAvatarPresetIndexById(normalized.id);
    if (idx >= 0) {
      const prior = avatarPresets[idx];
      avatarPresets[idx] = {
        ...prior,
        ...normalized,
        id: prior.id,
        createdAt: Number(prior.createdAt || api.now()),
        createdBy: prior.createdBy || username,
        updatedAt: api.now(),
        updatedBy: username
      };
    } else {
      avatarPresets.push({
        ...normalized,
        createdAt: api.now(),
        updatedAt: api.now(),
        createdBy: username,
        updatedBy: username
      });
    }
    try {
      saveCustomMapsToDisk();
    } catch {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Failed to save avatar presets." }));
      return;
    }
    sendAvatarPresets(ws);
    api.broadcast({ type: "plugin:maps:avatarPresetsUpdated" });
  });

  api.registerWs("deleteAvatarPreset", (ws, msg) => {
    if (!canManageAvatarPresets(ws)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Owner/admin/mod access required." }));
      return;
    }
    const id = normId(msg?.id || "");
    if (!id) return;
    const idx = findAvatarPresetIndexById(id);
    if (idx < 0) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Preset not found." }));
      return;
    }
    avatarPresets.splice(idx, 1);
    try {
      saveCustomMapsToDisk();
    } catch {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Failed to save avatar presets." }));
      return;
    }
    sendAvatarPresets(ws);
    api.broadcast({ type: "plugin:maps:avatarPresetsUpdated" });
  });

  api.registerWs("applyAvatarPreset", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const id = normId(msg?.id || "");
    if (!id) return;
    const idx = findAvatarPresetIndexById(id);
    if (idx < 0) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Preset not found." }));
      return;
    }
    const preset = avatarPresets[idx];
    if (!preset.published && !canManageAvatarPresets(ws)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Preset unavailable." }));
      return;
    }
    const current = getAvatarPref(username);
    const avatar = normalizeAvatarPref({
      ...preset.avatar,
      displayName: current.displayName || "",
      showUsername: current.showUsername !== false
    });
    avatarPrefsByUser.set(username, avatar);
    try {
      saveAvatarPrefsToDisk();
    } catch {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Failed to apply avatar preset." }));
      return;
    }
    const mapId = normId(ws.__mapsRoomId || "");
    const room = mapId ? rooms.get(mapId) : null;
    if (room && room.users.has(username)) {
      const currentUser = room.users.get(username) || {};
      room.users.set(username, { ...currentUser, avatar });
      api.sendToUsers(usersInRoom(mapId), { type: "plugin:maps:avatarChanged", mapId, username, avatar });
      broadcastRoomState(mapId);
    }
    ws.send(JSON.stringify({ type: "plugin:maps:avatarSet", avatar }));
  });

  api.registerWs("avatarEmote", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || msg?.mapId || "");
    if (!mapId) return;
    const room = rooms.get(mapId);
    if (!room || !room.users.has(username)) return;
    const pref = getAvatarPref(username);
    const resolved = resolveAvatarEmote(pref, msg);
    if (!resolved) return;
    const until = api.now() + resolved.durationMs;
    room.lastActiveAt = api.now();
    api.sendToUsers(usersInRoom(mapId), {
      type: "plugin:maps:avatarEmote",
      mapId,
      username,
      state: resolved.state,
      name: resolved.name,
      loop: resolved.loop,
      until
    });
    broadcastMapsListThrottled();
  });

  api.registerWs("leave", (ws) => {
    leaveAnyRoom(ws);
    ws.send(JSON.stringify({ type: "plugin:maps:left" }));
  });

  api.registerWs("move", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || "");
    if (!mapId) return;
    const room = rooms.get(mapId);
    if (!room) return;
    const u = room.users.get(username);
    if (!u) return;

    const t = api.now();
    const last = Number(ws.__mapsLastMoveAt || 0) || 0;
    if (t - last < 50) return; // ~20Hz
    ws.__mapsLastMoveAt = t;

    const x = clamp01(msg?.x);
    const y = clamp01(msg?.y);
    const seq = clampSeq(msg?.seq);
    const prevSeq = clampSeq(u?.seq || 0);
    if (seq && seq < prevSeq) return;
    const next = { ...u, x, y, seq: seq || prevSeq };
    room.users.set(username, next);
    room.lastActiveAt = api.now();

    const payload = { type: "plugin:maps:userMoved", mapId, username, x, y, seq: seq || prevSeq };
    if (next.invisible) {
      api.sendToUsers([username], payload);
    } else {
      api.sendToUsers(usersInRoom(mapId), payload);
    }
  });

  api.registerWs("chatHistoryReq", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(msg?.mapId || ws.__mapsRoomId || "");
    if (!mapId) return;
    const room = rooms.get(mapId);
    if (!room) return;
    if (!room.users.has(username)) return;
    const list = Array.isArray(room.chatGlobal) ? room.chatGlobal : [];
    ws.send(JSON.stringify({ type: "plugin:maps:chatHistory", mapId, scope: "global", messages: list.slice(-MAP_CHAT_GLOBAL_MAX) }));
  });

  api.registerWs("chatSend", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || msg?.mapId || "");
    if (!mapId) return;
    const room = rooms.get(mapId);
    if (!room) return;
    const u = room.users.get(username);
    if (!u) return;

    const scopeRaw = typeof msg?.scope === "string" ? msg.scope.trim().toLowerCase() : "local";
    const scope = scopeRaw === "global" ? "global" : "local";
    const text = sanitizeMapChatText(msg?.text);
    if (!text) return;

    const createdAt = api.now();
    room.lastActiveAt = createdAt;
    const id = `${createdAt}_${Math.random().toString(16).slice(2)}`;
    const message = { id, fromUser: username, text, createdAt };
    const payload = { type: "plugin:maps:chatMessage", mapId, scope, message };

    // If invisible, only send to self (consistent with bubbles/movement).
    if (u.invisible) {
      api.sendToUsers([username], payload);
      return;
    }

    if (scope === "global") {
      if (!Array.isArray(room.chatGlobal)) room.chatGlobal = [];
      room.chatGlobal.push(message);
      if (room.chatGlobal.length > MAP_CHAT_GLOBAL_MAX * 2) room.chatGlobal = room.chatGlobal.slice(-MAP_CHAT_GLOBAL_MAX);
      api.sendToUsers(usersInRoom(mapId), payload);
      return;
    }

    // Local: deliver only to users within radius at send-time ("witnessing it").
    const recipients = [];
    const all = Array.from(room.users.entries());
    for (const [otherName, other] of all) {
      if (!other) continue;
      const d = distance01(u.x, u.y, other.x, other.y);
      if (d <= MAP_CHAT_LOCAL_RADIUS) recipients.push(otherName);
    }
    if (!recipients.includes(username)) recipients.push(username);
    api.sendToUsers(recipients, payload);
  });

  api.registerWs("say", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || "");
    if (!mapId) return;
    const map = mapById(mapId);
    if (!map) return;
    const room = rooms.get(mapId);
    if (!room) return;
    const u = room.users.get(username);
    if (!u) return;

    const text = typeof msg?.text === "string" ? msg.text.replace(/\s+/g, " ").trim().slice(0, 120) : "";
    if (!text) return;
    let actorType = "user";
    let actorPropId = "";
    let displayName = `@${username}`;
    const color = typeof u.color === "string" ? u.color : "";
    const requestedPropId = typeof msg?.actorPropId === "string" ? msg.actorPropId.trim() : "";
    if (requestedPropId && map.ttrpgEnabled && canManageMaps(ws, map)) {
      const { prop } = propById(map, requestedPropId);
      const sprite = prop ? spriteById(map, String(prop.spriteId || "")) : null;
      if (prop && sprite && sprite.kind === "token") {
        if (!prop.controlledBy || prop.controlledBy === username) {
          actorType = "token";
          actorPropId = requestedPropId;
          ws.__mapsSpeakAsPropId = requestedPropId;
          displayName = String(prop.nickname || sprite.name || sprite.id || "token").slice(0, 40);
        }
      }
    }
    const createdAt = api.now();
    room.lastActiveAt = createdAt;
    const scopeRaw = typeof msg?.scope === "string" ? msg.scope.trim().toLowerCase() : "local";
    const scope = scopeRaw === "global" ? "global" : "local";
    const payload = { type: "plugin:maps:bubble", mapId, username, actorType, actorPropId, displayName, color, text, createdAt, scope };
    if (u.invisible) {
      api.sendToUsers([username], payload);
    } else if (scope === "global") {
      api.sendToUsers(usersInRoom(mapId), payload);
    } else {
      const recipients = [];
      const all = Array.from(room.users.entries());
      for (const [otherName, other] of all) {
        if (!other) continue;
        const d = distance01(u.x, u.y, other.x, other.y);
        if (d <= MAP_CHAT_LOCAL_RADIUS) recipients.push(otherName);
      }
      if (!recipients.includes(username)) recipients.push(username);
      api.sendToUsers(recipients, payload);
    }
  });

  api.registerWs("typing", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || msg?.mapId || "");
    if (!mapId) return;
    const room = rooms.get(mapId);
    if (!room || !room.users.has(username)) return;
    const isTyping = Boolean(msg?.isTyping);
    if (!room.typing) room.typing = new Map();
    if (isTyping) {
      room.typing.set(username, api.now() + 4500);
      room.lastActiveAt = api.now();
    } else {
      room.typing.delete(username);
    }
    api.sendToUsers(usersInRoom(mapId), { type: "plugin:maps:typing", mapId, username, isTyping, expiresAt: Number(room.typing.get(username) || 0) || 0 });
    broadcastMapsListThrottled();
  });

  api.registerWs("setInvisible", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(msg?.mapId || ws.__mapsRoomId || "");
    if (!mapId) return;
    const map = mapById(mapId);
    if (!map) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Map not found." }));
      return;
    }
    if (!canManageMaps(ws, map)) {
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Permission denied." }));
      return;
    }
    const room = rooms.get(mapId);
    if (!room) return;
    const u = room.users.get(username);
    if (!u) return;
    const invisible = Boolean(msg?.invisible);
    room.users.set(username, { ...u, invisible });
    ws.__mapsInvisible = invisible ? 1 : 0;
    ws.send(JSON.stringify({ type: "plugin:maps:selfInvisible", mapId, invisible }));
    broadcastRoomState(mapId);
  });

  api.registerWs("walkieSend", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || "");
    if (!mapId) return;
    const map = mapById(mapId);
    if (!map) return;
    if (!map.walkiesEnabled) {
      noteWalkie("send-denied-disabled", mapId, { username });
      ws.send(JSON.stringify({ type: "plugin:maps:error", message: "Walkies are disabled for this map." }));
      return;
    }
    const room = roomFor(mapId);
    if (!room) return;
    if (!room.users.has(username)) return;

    const idRaw = typeof msg?.id === "string" ? msg.id.trim() : "";
    let id = idRaw && /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,80}$/.test(idRaw) ? idRaw : `${api.now()}_${Math.random().toString(16).slice(2)}`;
    while (room.walkies?.has(id)) id = `${id}_${Math.random().toString(16).slice(2, 6)}`;
    const url = typeof msg?.url === "string" ? msg.url.trim() : "";
    if (!isSafeUploadUrl(url)) {
      noteWalkie("send-denied-bad-url", mapId, { username });
      return;
    }
    const x = clamp01(msg?.x);
    const y = clamp01(msg?.y);

    const createdAt = api.now();
    room.lastActiveAt = createdAt;
    const pending = new Set(usersInRoom(mapId));
    if (!room.walkies) room.walkies = new Map();
    const timeout = setTimeout(() => {
      const r = rooms.get(mapId);
      if (!r?.walkies?.has(id)) return;
      cleanupWalkieEntry(r, id, "cleanup-timeout", {});
    }, 2 * 60 * 1000);
    room.walkies.set(id, { url, pending, createdAt, mapId, timeout });
    noteWalkie("send", mapId, { id, pendingCount: pending.size });

    api.sendToUsers(usersInRoom(mapId), { type: "plugin:maps:walkie", mapId, id, username, url, x, y, createdAt });

  });

  api.registerWs("walkiePlayed", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || "");
    if (!mapId) return;
    const room = rooms.get(mapId);
    if (!room || !room.walkies) return;
    const id = typeof msg?.id === "string" ? msg.id.trim() : "";
    if (!id) return;
    const entry = room.walkies.get(id);
    if (!entry) return;
    if (!entry.pending.has(username)) {
      noteWalkie("ack-duplicate", mapId, { id, username, reason: String(msg?.reason || "") });
      return;
    }
    entry.pending.delete(username);
    noteWalkie("ack", mapId, { id, username, pendingCount: entry.pending.size, reason: String(msg?.reason || "") });
    if (entry.pending.size === 0) {
      cleanupWalkieEntry(room, id, "cleanup-all-acked", {});
    }
  });

  api.registerWs("walkieState", (ws, msg) => {
    const username = userIdentity(ws);
    if (!username) return;
    const mapId = normId(ws.__mapsRoomId || msg?.mapId || "");
    if (!mapId) return;
    const phaseRaw = typeof msg?.phase === "string" ? msg.phase.trim().toLowerCase() : "";
    const phase = /^[a-z_]{2,24}$/.test(phaseRaw) ? phaseRaw : "unknown";
    const id = typeof msg?.id === "string" ? msg.id.trim().slice(0, 120) : "";
    const attempt = clampInt(msg?.attempt, 0, 10);
    const error = typeof msg?.error === "string" ? msg.error.trim().slice(0, 120) : "";
    noteWalkie(`client-${phase}`, mapId, { username, id, attempt, error });
  });
};
