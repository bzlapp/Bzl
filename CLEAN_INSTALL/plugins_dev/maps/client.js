(function () {
  if (!window.BzlPluginHost) return;

  window.BzlPluginHost.register("maps", (ctx) => {
    const ws = window.__bzlWs;
    if (!ws) return;

    const mainPanel = document.querySelector(".main .panelFill");
    const panelHeader = mainPanel ? mainPanel.querySelector(".panelHeader") : null;
    const panelTitle = panelHeader ? panelHeader.querySelector(".panelTitle") : null;
    const filters = panelHeader ? panelHeader.querySelector(".filters") : null;
    const hiveTabs = document.getElementById("hiveTabs");
    const feed = document.getElementById("feed");
    const pollinatePanel = document.getElementById("pollinatePanel");
    const chatPanel = document.querySelector(".chat");
    const chatResizeHandle = document.getElementById("chatResizeHandle");
    const appRoot = document.querySelector(".app");

    if (!mainPanel || !panelHeader || !panelTitle) return;

    const style = document.createElement("style");
    style.textContent = `
      .mapsTabBtn { margin-left: 10px; }
      .mapsPanel.hidden { display: none; }
      .mapsPanel { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; display:flex; flex-direction: column; }
      .app.mapsRoom .chat { display: none !important; }
      .app.mapsRoom .chatResizeHandle { display: none !important; }
      /* Keep core resize handles working in map mode by preserving grid areas. */
      @media (min-width: 761px) {
        .app.mapsRoom {
          grid-template-columns: minmax(240px, var(--sidebar-width)) 10px 1fr !important;
          grid-template-areas: "sidebar sidebarResize main" !important;
        }
        .app.mapsRoom.hasMod {
          grid-template-columns: minmax(240px, var(--sidebar-width)) 10px 1fr 10px minmax(280px, var(--mod-width)) !important;
          grid-template-areas: "sidebar sidebarResize main mainResize moderation" !important;
        }
        .app.mapsRoom.sidebarHidden {
          grid-template-columns: 1fr !important;
          grid-template-areas: "main" !important;
        }
        .app.mapsRoom.sidebarHidden.hasMod {
          grid-template-columns: 1fr 10px minmax(280px, var(--mod-width)) !important;
          grid-template-areas: "main mainResize moderation" !important;
        }
      }
      .mapsTop { padding: 12px 12px 0; display:flex; justify-content: space-between; align-items: center; gap: 10px; }
      .mapsTopTitle { font-weight: 900; }
      .mapCreateWrap { padding: 12px; }
      .mapCreateCard { border: 1px solid rgba(246,240,255,0.14); border-radius: 14px; background: rgba(255,255,255,0.02); padding: 10px; }
      .mapCreateGrid { display:grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: end; }
      .mapCreateGrid label span { display:block; font-size: 12px; color: rgba(246,240,255,0.72); margin-bottom: 4px; }
      .mapCreateGrid input[type="text"] { width: 100%; }
      .mapCreateRow { display:flex; gap: 10px; align-items: center; justify-content: flex-end; margin-top: 10px; }
      .mapRangeRow { display:flex; gap: 10px; align-items: center; }
      .mapRangeRow input[type="range"] { flex: 1; }
      .mapRangeVal { width: 44px; text-align: right; font-variant-numeric: tabular-nums; }
      .mapsGrid { display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; padding: 12px; }
      .mapCard { border: 1px solid rgba(246,240,255,0.14); border-radius: 14px; background: rgba(255,255,255,0.02); padding: 10px; }
      .mapThumb { width: 100%; aspect-ratio: 16 / 9; border-radius: 12px; border: 1px solid rgba(246,240,255,0.10); object-fit: cover; background: rgba(255,255,255,0.02); }
      .mapTitle { font-weight: 800; margin-top: 8px; }
      .mapMeta { margin-top: 6px; color: rgba(246,240,255,0.72); font-size: 12px; display:flex; justify-content: space-between; gap: 10px; }
      .mapEnterRow { margin-top: 10px; display:flex; justify-content:flex-end; gap: 8px; }
      .mapView { display:flex; gap: 12px; padding: 12px; min-height: 0; flex: 1; }
      .mapCanvasWrap { flex: 1; border: 1px solid rgba(246,240,255,0.14); border-radius: 14px; background: rgba(0,0,0,0.18); position: relative; overflow:hidden; min-height: 360px; }
      .mapCanvas { width: 100%; height: 100%; display:block; }
      .mapHud { width: 240px; border: 1px solid rgba(246,240,255,0.14); border-radius: 14px; background: rgba(255,255,255,0.02); padding: 10px; min-height: 0; max-height: 100%; overflow: auto; }
      .mapHudTitle { font-weight: 800; display:flex; justify-content: space-between; align-items:center; gap: 8px; }
      .mapHudList { margin-top: 10px; display:flex; flex-direction: column; gap: 8px; max-height: 340px; overflow:auto; }
      .mapHint { margin-top: 10px; color: rgba(246,240,255,0.72); font-size: 12px; line-height: 1.05rem; }
      .mapChatOverlay { position:absolute; left: 12px; right: 12px; bottom: 12px; display:flex; gap: 8px; }
      .mapChatOverlay input { flex:1; }
      .mapWalkieBar { position:absolute; left: 12px; right: 12px; bottom: 12px; display:flex; justify-content:center; pointer-events:none; }
      .mapWalkieBarInner { pointer-events:auto; display:flex; gap: 10px; align-items:center; width: min(520px, 100%); }
      .mapWalkieBtn { flex: 1; height: 44px; border-radius: 14px; font-weight: 900; letter-spacing: 0.01em; }
      .mapWalkieHint { font-size: 12px; color: rgba(246,240,255,0.75); white-space: nowrap; }
      .mapsRoomWrap { display:flex; flex-direction: column; min-height: 0; flex: 1; }
      .mapDock { border: 1px solid rgba(246,240,255,0.14); border-radius: 14px; background: rgba(255,255,255,0.02); margin: 0 12px 12px; padding: 10px 12px; display:flex; flex-direction: column; min-height: 0; max-height: min(46vh, 520px); overflow:hidden; }
      .mapDock.collapsed { max-height: none; }
      .mapDock.collapsed .dockBody { display:none; }
      .dockHeaderRow { margin-bottom: 0; }
      .dockBody { flex: 1; min-height: 0; overflow:auto; padding-right: 4px; padding-top: 8px; }
      .dockRow { display:flex; gap: 10px; align-items: center; margin-bottom: 8px; flex-wrap: wrap; }
      .dockTitle { font-weight: 900; }
      .dockRow input[type="file"] { flex: 1 1 240px; max-width: 360px; }
      .dockRow input[type="text"] { flex: 1 1 220px; min-width: 180px; }
      .dockRow input[type="number"] { width: 92px; }
      .dockScale { display:flex; gap: 8px; align-items:center; min-width: 160px; flex: 1 1 160px; }
      .dockScale input[type="range"] { flex: 1; }
      .dockScaleVal { width: 52px; text-align:right; font-variant-numeric: tabular-nums; color: rgba(246,240,255,0.78); }
      .spriteTray { display:flex; gap: 8px; overflow:auto; padding: 8px; border: 1px solid rgba(246,240,255,0.10); border-radius: 12px; background: rgba(0,0,0,0.12); }
      .spriteThumb { width: 56px; height: 56px; border-radius: 12px; border: 1px solid rgba(246,240,255,0.14); background: rgba(255,255,255,0.02); overflow:hidden; padding: 0; display:flex; }
      .spriteThumb img { width:100%; height:100%; object-fit: cover; display:block; }
      .spriteThumb.selected { outline: 2px solid rgba(255,62,165,0.80); }

      .mapsPolyModal { position: fixed; inset: 0; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.55); z-index: 9999; }
      .mapsPolyModalInner { width: min(980px, calc(100vw - 48px)); max-height: min(78vh, 760px); overflow:hidden; border-radius: 18px; border: 1px solid rgba(246,240,255,0.14); background: linear-gradient(180deg, rgba(30,20,38,0.96), rgba(12,10,18,0.96)); box-shadow: 0 18px 60px rgba(0,0,0,0.55); padding: 14px; display:flex; flex-direction:column; }
      .mapsPolyHeader { display:flex; justify-content:space-between; gap: 14px; align-items:flex-start; }
      .mapsPolyTitle { font-weight: 900; font-size: 16px; }
      .mapsPolyGrid { margin-top: 12px; display:grid; grid-template-columns: 1fr 1fr; gap: 12px; min-height: 0; flex: 1; }
      .mapsPolyList { min-height: 0; overflow:auto; border: 1px solid rgba(246,240,255,0.10); border-radius: 14px; background: rgba(0,0,0,0.10); padding: 8px; }
      .mapsPolyInspector { min-height: 0; overflow:auto; border: 1px solid rgba(246,240,255,0.10); border-radius: 14px; background: rgba(0,0,0,0.10); padding: 10px; }
      .polyRowBtn { width: 100%; text-align:left; padding: 10px; border-radius: 12px; border: 1px solid rgba(246,240,255,0.10); background: rgba(255,255,255,0.02); margin-bottom: 8px; cursor:pointer; }
      .polyRowBtn:hover { border-color: rgba(246,240,255,0.18); background: rgba(255,255,255,0.03); }
      .polyRowBtn.selected { outline: 2px solid rgba(255,62,165,0.55); border-color: rgba(255,62,165,0.55); }
      .polyRowMain { font-weight: 800; }
      .polyRowMeta { margin-top: 2px; font-size: 12px; color: rgba(246,240,255,0.62); }
    `;
    document.head.appendChild(style);

    const mapsBtn = document.createElement("button");
    mapsBtn.type = "button";
    mapsBtn.className = "ghost smallBtn mapsTabBtn";
    mapsBtn.textContent = "Maps";
    panelTitle.insertAdjacentElement("afterend", mapsBtn);

    const mapsPanel = document.createElement("div");
    mapsPanel.className = "mapsPanel hidden";
    mainPanel.appendChild(mapsPanel);

    let mode = "hives"; // "hives" | "maps" | "map"
    let maps = [];
    let activeMap = null;
    let users = new Map(); // username -> {x,y,color,image}
    let bubbles = new Map(); // username -> {text, expiresAt}
    const avatarCache = new Map(); // username -> {src:string,img:HTMLImageElement|null,status:"loading"|"ok"|"error",failedAt:number}
    let self = "";
    let localPos = { x: 0.5, y: 0.5 };
    let keys = new Set();
    let raf = 0;
    let lastTick = 0;
    let lastSentAt = 0;
    let moveSeq = 1;
    let bgImg = null;
    let cameraPos = null; // {x,y} in normalized 0..1
    let createIdTouched = false;
    let mapAvatarSaveTimer = 0;
    let mapZoomSaveTimer = 0;
    let editMode = false;
    let editKind = "collision"; // "collision" | "mask" | "exit" | "hidden" | "occluder"
    let editTool = "draw"; // "draw" | "select" | "move" | "vertex"
    let selectedPolyKind = "";
    let selectedPolyIndex = -1;
    let selectedVertexIndex = -1;
    let polyClipboard = null; // { kind, poly }
    let polyDrag = null; // { kind, index, start:{x,y}, origPoints:[{x,y}] }
    let vertexDrag = null; // { kind, index, vIdx:number }

    // Exit metadata (used both for "new exit defaults" and for selected-exit edits)
    let exitAction = "toMaps"; // "toMaps" | "toMap"
    let exitTargetMapId = "";
    let exitTargetExitName = "";
    let exitDraftName = "";
    let draftPoly = []; // points [{x,y}] in normalized
    let lastTransform = null; // {srcX,srcY,zoom,worldW,worldH,viewW,viewH}
    let selfInvisible = false;
    let panning = false;
    let panStart = null; // {x,y,cx,cy}
    let audioCtx = null;
    let audioWarned = false;
    let walkieStream = null;
    let walkieRecorder = null;
    let walkieChunks = [];
    let walkieRecording = false;
    let walkieStartAt = 0;
    const walkiePlaybacks = new Map(); // id -> {audio, gain, pan, filter?, interval?, ackTimer?}
    const exitInside = new Map(); // idx -> boolean
    let lastExitAt = 0;
    let pendingSpawn = null; // { mapId, exitName }
    let selectedSpriteId = "";
    let selectedPropId = "";
    let spriteKind = "prop"; // "prop" | "token" (v1 uses props)
    let spriteScale = 1.0;
    let spriteScaleSaveTimer = 0;
    let placeRot = 0; // degrees (-180..180)
    const spriteImageCache = new Map(); // url -> {img,status:"loading"|"ok"|"error",failedAt:number}
    let propDrag = null; // {propId, offsetX, offsetY}
    let propDragMoved = false;
    let lastPropMoveAt = 0;
    let canManageTtrpg = false;
    let ttrpgTool = "select"; // "select" | "place" | "pan"
    let placeScale = 1.0;
    let speakingAsPropId = "";
    let ttrpgDockCollapsed = false;

    function setHidden(el, hidden) {
      if (!el) return;
      el.classList.toggle("hidden", Boolean(hidden));
    }

    function getSessionToken() {
      try {
        return localStorage.getItem("bzl_session_token") || "";
      } catch {
        return "";
      }
    }

    function dockCollapsedKey(mapId) {
      const id = String(mapId || "")
        .trim()
        .toLowerCase();
      const safe = id && /^[a-z0-9][a-z0-9_-]{0,40}$/.test(id) ? id : "default";
      return `bzl_maps_dockCollapsed_${safe}`;
    }

    function readDockCollapsed(mapId) {
      try {
        return localStorage.getItem(dockCollapsedKey(mapId)) === "1";
      } catch {
        return false;
      }
    }

    function writeDockCollapsed(mapId, collapsed) {
      ttrpgDockCollapsed = Boolean(collapsed);
      try {
        localStorage.setItem(dockCollapsedKey(mapId), ttrpgDockCollapsed ? "1" : "0");
      } catch {
        // ignore
      }
    }

    function slugifyId(title) {
      const t = String(title || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 28);
      if (!t) return "";
      const first = t[0];
      if (!/[a-z0-9]/.test(first)) return `map-${t}`.slice(0, 31);
      return t;
    }

    async function uploadImageFile(file) {
      const token = getSessionToken();
      if (!token) throw new Error("Sign in required.");
      const maxBytes = 20 * 1024 * 1024;
      if (Number(file?.size || 0) > maxBytes) throw new Error("Map image too large (max 20 MB).");
      const name = String(file?.name || "").toLowerCase();
      const guessed =
        name.endsWith(".png")
          ? "image/png"
          : name.endsWith(".jpg") || name.endsWith(".jpeg")
            ? "image/jpeg"
            : name.endsWith(".gif")
              ? "image/gif"
              : name.endsWith(".webp")
                ? "image/webp"
                : "";
      const contentType = file.type || guessed || "";
      if (!contentType.startsWith("image/")) throw new Error("Unsupported image type.");
      const res = await fetch("/api/upload?kind=image&purpose=map", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": contentType
        },
        body: file
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(String(json?.error || "Upload failed."));
      if (!json?.url) throw new Error("Upload failed.");
      return String(json.url);
    }

    async function uploadSpriteImageFile(file) {
      const token = getSessionToken();
      if (!token) throw new Error("Sign in required.");
      const maxBytes = 10 * 1024 * 1024;
      if (Number(file?.size || 0) > maxBytes) throw new Error("Sprite image too large (max 10 MB).");
      const name = String(file?.name || "").toLowerCase();
      const isPng = name.endsWith(".png") || file.type === "image/png";
      const isWebp = name.endsWith(".webp") || file.type === "image/webp";
      if (!isPng && !isWebp) throw new Error("Sprites must be PNG or WebP (transparency).");
      const contentType = isWebp ? "image/webp" : "image/png";
      const res = await fetch("/api/upload?kind=image&purpose=sprite", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": contentType
        },
        body: file
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(String(json?.error || "Upload failed."));
      if (!json?.url) throw new Error("Upload failed.");
      return String(json.url);
    }

    async function uploadAudioBlob(blob, filenameHint = "walkie.webm") {
      const token = getSessionToken();
      if (!token) throw new Error("Sign in required.");
      const name = String(filenameHint || "").toLowerCase();
      const guessed =
        name.endsWith(".wav")
          ? "audio/wav"
          : name.endsWith(".ogg")
            ? "audio/ogg"
            : name.endsWith(".m4a")
              ? "audio/mp4"
              : name.endsWith(".aac")
                ? "audio/aac"
                : "audio/webm";
      const rawType = typeof blob?.type === "string" ? blob.type : "";
      const contentType = (rawType.split(";")[0] || "").trim().toLowerCase() || guessed;
      if (!contentType.startsWith("audio/")) throw new Error("Unsupported audio type.");
      const res = await fetch("/api/upload?kind=audio", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": contentType
        },
        body: blob
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(String(json?.error || "Upload failed."));
      if (!json?.url) throw new Error("Upload failed.");
      return String(json.url);
    }

    function ensureAudioContext() {
      if (audioCtx) return audioCtx;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
      return audioCtx;
    }

    async function ensureAudioReady() {
      const ctxA = ensureAudioContext();
      if (!ctxA) return false;
      try {
        if (ctxA.state !== "running") await ctxA.resume();
        return true;
      } catch {
        return false;
      }
    }

    function clamp(n, a, b) {
      const x = Number(n);
      if (!Number.isFinite(x)) return a;
      return Math.max(a, Math.min(b, x));
    }

    function computeWalkieSpatial(from, to, dims) {
      const dx = (Number(from.x || 0) - Number(to.x || 0)) * dims.w;
      const dy = (Number(from.y || 0) - Number(to.y || 0)) * dims.h;
      const dist = Math.hypot(dx, dy);
      const base = Math.min(dims.w, dims.h);
      const radius = clamp(base * 0.28, 280, 680);
      const v = Math.max(0, 1 - dist / radius);
      const vol = v * v;
      const pan = clamp(dx / radius, -1, 1);
      const cutoff = 600 + 7400 * vol;
      return { vol, pan, cutoff };
    }

    async function ensureWalkieStream() {
      if (walkieStream) return walkieStream;
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("Mic not supported in this browser.");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      walkieStream = stream;
      return stream;
    }

    function pickRecorderMime() {
      if (!window.MediaRecorder) return "";
      const prefs = ["audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/webm", "audio/ogg"];
      for (const t of prefs) {
        try {
          if (MediaRecorder.isTypeSupported(t)) return t;
        } catch {
          // ignore
        }
      }
      return "";
    }

    async function startWalkie() {
      if (walkieRecording) return;
      if (!activeMap?.walkiesEnabled) return;
      await ensureAudioReady();
      const stream = await ensureWalkieStream();
      const mimeType = pickRecorderMime();
      walkieChunks = [];
      walkieRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      walkieRecording = true;
      walkieStartAt = Date.now();
      walkieRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size) walkieChunks.push(e.data);
      };
      walkieRecorder.onstop = async () => {
        walkieRecording = false;
        const elapsed = Date.now() - walkieStartAt;
        if (elapsed < 180) return;
        const blob = new Blob(walkieChunks, { type: walkieRecorder?.mimeType || walkieChunks?.[0]?.type || "audio/webm" });
        walkieChunks = [];
        const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
        try {
          const url = await uploadAudioBlob(blob, "walkie.webm");
          // Play locally immediately using spatial audio too.
          playWalkie({ id, username: String(ctx.getUser() || "").trim().toLowerCase(), url, x: localPos.x, y: localPos.y });
          ctx.send("walkieSend", { id, url, x: localPos.x, y: localPos.y });
        } catch (e) {
          ctx.toast("Walkie", String(e?.message || e));
        }
      };
      walkieRecorder.start();
    }

    function stopWalkie() {
      if (!walkieRecording || !walkieRecorder) return;
      try {
        walkieRecorder.stop();
      } catch {
        // ignore
      }
    }

    function stopAllWalkies() {
      for (const entry of walkiePlaybacks.values()) {
        try {
          if (entry.interval) clearInterval(entry.interval);
          if (entry.ackTimer) clearTimeout(entry.ackTimer);
          entry.audio?.pause?.();
          entry.audio?.remove?.();
        } catch {
          // ignore
        }
      }
      walkiePlaybacks.clear();
    }

    async function playWalkie(msg) {
      const id = String(msg?.id || "").trim();
      const url = String(msg?.url || "").trim();
      const username = String(msg?.username || "").trim().toLowerCase();
      if (!id || !url || !username) return;
      if (walkiePlaybacks.has(id)) return;
      if (!activeMap?.walkiesEnabled) return;

      const ok = await ensureAudioReady();
      if (!ok) {
        if (!audioWarned) {
          audioWarned = true;
          ctx.toast("Audio", "Click or press a key once to enable audio playback.");
        }
        return;
      }

      const dims = getWorldDims();
      const from = { x: Number(msg.x || 0), y: Number(msg.y || 0) };
      const to = { x: Number(localPos.x || 0), y: Number(localPos.y || 0) };
      const spatial = computeWalkieSpatial(from, to, dims);

      const a = document.createElement("audio");
      a.src = url;
      a.preload = "auto";
      a.crossOrigin = "anonymous";
      a.style.display = "none";
      document.body.appendChild(a);

      const ac = ensureAudioContext();
      let source = null;
      let gain = null;
      let pan = null;
      let filter = null;
      try {
        source = ac.createMediaElementSource(a);
        gain = ac.createGain();
        gain.gain.value = spatial.vol;
        filter = ac.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = spatial.cutoff;
        if (ac.createStereoPanner) {
          pan = ac.createStereoPanner();
          pan.pan.value = spatial.pan;
          source.connect(filter);
          filter.connect(pan);
          pan.connect(gain);
          gain.connect(ac.destination);
        } else {
          source.connect(filter);
          filter.connect(gain);
          gain.connect(ac.destination);
        }
      } catch (e) {
        try {
          a.remove();
        } catch {
          // ignore
        }
        return;
      }

      const ack = () => {
        if (!activeMap?.id) return;
        ctx.send("walkiePlayed", { id });
      };

      const cleanup = () => {
        const entry = walkiePlaybacks.get(id);
        if (!entry) return;
        try {
          if (entry.interval) clearInterval(entry.interval);
          if (entry.ackTimer) clearTimeout(entry.ackTimer);
        } catch {
          // ignore
        }
        try {
          a.pause();
        } catch {
          // ignore
        }
        try {
          a.remove();
        } catch {
          // ignore
        }
        walkiePlaybacks.delete(id);
      };

      a.onended = () => {
        ack();
        cleanup();
      };
      a.onerror = () => {
        ack();
        cleanup();
      };

      const interval = setInterval(() => {
        const u = users.get(username);
        const fx = u && typeof u.tx === "number" ? u.tx : from.x;
        const fy = u && typeof u.ty === "number" ? u.ty : from.y;
        const sp = computeWalkieSpatial({ x: fx, y: fy }, { x: localPos.x, y: localPos.y }, dims);
        if (gain) gain.gain.value = sp.vol;
        if (pan) pan.pan.value = sp.pan;
        if (filter) filter.frequency.value = sp.cutoff;
      }, 120);

      const ackTimer = setTimeout(() => {
        ack();
      }, 25_000);

      walkiePlaybacks.set(id, { audio: a, gain, pan, filter, interval, ackTimer });
      try {
        await a.play();
      } catch {
        // If autoplay blocked, we'll just cleanup (owner can click to enable and retry later).
        cleanup();
      }
    }

    function enterMaps() {
      mode = "maps";
      mapsBtn.classList.add("primary");
      mapsBtn.classList.remove("ghost");
      setHidden(filters, true);
      setHidden(hiveTabs, true);
      setHidden(feed, true);
      setHidden(pollinatePanel, true);
      setHidden(mapsPanel, false);
      if (appRoot) appRoot.classList.remove("mapsRoom");
      if (chatPanel) chatPanel.classList.remove("hidden");
      if (chatResizeHandle) chatResizeHandle.classList.remove("hidden");
      renderMapsList();
      ctx.send("list", {});
    }

    function exitMapsToHives() {
      mode = "hives";
      mapsBtn.classList.add("ghost");
      mapsBtn.classList.remove("primary");
      setHidden(filters, false);
      setHidden(hiveTabs, false);
      setHidden(feed, false);
      setHidden(pollinatePanel, false);
      setHidden(mapsPanel, true);
      if (appRoot) appRoot.classList.remove("mapsRoom");
      if (chatPanel) chatPanel.classList.remove("hidden");
      if (chatResizeHandle) chatResizeHandle.classList.remove("hidden");
      stopLoop();
      stopWalkie();
      stopAllWalkies();
      activeMap = null;
      speakingAsPropId = "";
      users.clear();
      bubbles.clear();
      keys.clear();
    }

    function renderMapsList() {
      if (!mapsPanel) return;
      if (mode !== "maps") return;
      const canCreate = ["owner", "moderator"].includes(String(ctx.getRole() || "").toLowerCase());
      const me = String(ctx.getUser() || "").trim().toLowerCase();
      const role = String(ctx.getRole() || "").toLowerCase();
      const createHtml = canCreate
        ? `
        <div class="mapCreateWrap">
          <div class="mapCreateCard">
            <div class="mapsTop">
              <div class="mapsTopTitle">Create map</div>
              <div class="small muted">Owner/mod only</div>
            </div>
            <div class="mapCreateGrid">
              <label>
                <span>Title</span>
                <input id="mapsCreateTitle" type="text" maxlength="60" placeholder="Example: Lounge" />
              </label>
              <label>
                <span>Map id</span>
                <input id="mapsCreateId" type="text" maxlength="31" placeholder="lounge" />
              </label>
              <label>
                <span>Background image</span>
                <input id="mapsCreateFile" type="file" accept="image/*" />
              </label>
              <label>
                <span>Avatar size</span>
                <div class="mapRangeRow">
                  <input id="mapsCreateAvatarSize" type="range" min="18" max="96" value="36" />
                  <div class="mapRangeVal" id="mapsCreateAvatarVal">36</div>
                </div>
              </label>
            </div>
            <div class="mapCreateRow">
              <div class="small muted grow" id="mapsCreateStatus"></div>
              <button type="button" class="primary smallBtn" id="mapsCreateBtn">Create</button>
            </div>
          </div>
        </div>`
        : "";
      const grid = maps
        .map((m) => {
          const count = Number(m.userCount || 0) || 0;
          const thumb = m.thumbUrl || "";
          const owner = String(m.owner || "").trim().toLowerCase();
          const canManage = role === "owner" || role === "moderator" || (owner && me && owner === me);
          return `<div class="mapCard">
            <img class="mapThumb" src="${thumb}" alt="" />
            <div class="mapTitle">${escapeHtml(m.title || m.id)}</div>
            <div class="mapMeta"><span>${escapeHtml(m.id)}</span><span>${count} in room</span></div>
            <div class="mapEnterRow">
              <button type="button" class="primary smallBtn" data-mapenter="${escapeHtml(m.id)}">Enter</button>
              ${canManage && owner ? `<button type="button" class="ghost smallBtn" data-mapdelete="${escapeHtml(m.id)}">Delete</button>` : ""}
            </div>
          </div>`;
        })
        .join("");
      mapsPanel.innerHTML = `${createHtml}<div class="mapsGrid">${grid || `<div class="muted">No maps available.</div>`}</div>`;

      const titleEl = document.getElementById("mapsCreateTitle");
      const idEl = document.getElementById("mapsCreateId");
      const fileEl = document.getElementById("mapsCreateFile");
      const rangeEl = document.getElementById("mapsCreateAvatarSize");
      const rangeVal = document.getElementById("mapsCreateAvatarVal");
      const btnEl = document.getElementById("mapsCreateBtn");
      const statusEl = document.getElementById("mapsCreateStatus");
      if (rangeEl && rangeVal) {
        rangeEl.oninput = () => {
          rangeVal.textContent = String(rangeEl.value || "36");
        };
      }
      if (idEl) {
        idEl.oninput = () => {
          createIdTouched = true;
        };
      }
      if (titleEl && idEl) {
        titleEl.oninput = () => {
          if (createIdTouched) return;
          idEl.value = slugifyId(titleEl.value);
        };
      }
      if (btnEl && titleEl && idEl && fileEl && statusEl && rangeEl) {
        btnEl.onclick = async () => {
          const title = String(titleEl.value || "").trim();
          const id = String(idEl.value || "").trim().toLowerCase();
          const file = fileEl.files && fileEl.files[0] ? fileEl.files[0] : null;
          const avatarSize = Number(rangeEl.value || 36);
          if (!title) {
            statusEl.textContent = "Title required.";
            return;
          }
          if (!id || !/^[a-z0-9][a-z0-9_.-]{0,31}$/.test(id)) {
            statusEl.textContent = "Valid map id required (letters/numbers, '-', '_', '.').";
            return;
          }
          if (!file) {
            statusEl.textContent = "Choose an image file.";
            return;
          }
          btnEl.disabled = true;
          statusEl.textContent = "Uploading...";
          try {
            const url = await uploadImageFile(file);
            statusEl.textContent = "Creating...";
            ctx.send("createMap", { id, title, backgroundUrl: url, thumbUrl: url, avatarSize });
            statusEl.textContent = "Created.";
            titleEl.value = "";
            idEl.value = "";
            fileEl.value = "";
            createIdTouched = false;
          } catch (e) {
            statusEl.textContent = String(e?.message || e);
          } finally {
            btnEl.disabled = false;
          }
        };
      }
    }

    function renderMapView() {
      if (!mapsPanel) return;
      if (mode !== "map" || !activeMap) return;
      if (appRoot) appRoot.classList.add("mapsRoom");
      if (chatPanel) chatPanel.classList.add("hidden");
      if (chatResizeHandle) chatResizeHandle.classList.add("hidden");
      const title = escapeHtml(activeMap.title || activeMap.id);
      const list = Array.from(users.keys())
        .sort((a, b) => a.localeCompare(b))
        .map((u) => `<div class="small">@${escapeHtml(u)}</div>`)
        .join("");

      const role = String(ctx.getRole() || "").toLowerCase();
      const me = String(ctx.getUser() || "").trim().toLowerCase();
      const canManage = role === "owner" || role === "moderator" || (activeMap.owner && me && activeMap.owner === me);
      const canEditMap = canManage && Boolean(activeMap.owner);
      const showSettings = canManage;
      canManageTtrpg = Boolean(canManage);
      const avatarSize = Number(activeMap.avatarSize || 36);
      const cameraZoom = Math.max(0.8, Math.min(5.0, Number(activeMap.cameraZoom || 2.35) || 2.35));
      const polysCount =
        (Array.isArray(activeMap.collisions) ? activeMap.collisions.length : 0) +
        (Array.isArray(activeMap.masks) ? activeMap.masks.length : 0) +
        (Array.isArray(activeMap.exits) ? activeMap.exits.length : 0);
      const walkiesEnabled = Boolean(activeMap.walkiesEnabled);
      const ttrpgEnabled = Boolean(activeMap.ttrpgEnabled);
      const shortcutHintHtml = `
        <div class="mapHint">
          Shortcuts:<br/>
          Move: <b>WASD</b> / arrows, Chat: <b>T</b><br/>
          ${walkiesEnabled ? `Walkie: hold <b>~</b><br/>` : ""}
          ${ttrpgEnabled && canManageTtrpg ? `Tools: <b>V</b> select, <b>P</b> place, hold <b>Space</b> pan<br/>Transform: <b>Q/E</b> rotate, <b>Z/X</b> scale<br/>` : ""}
          Leave: click <b>Back</b>
        </div>
      `;
      const settingsHtml = showSettings
        ? `
          <div class="panelDivider"></div>
          <div class="small muted">Map settings</div>
          <label class="checkRow" style="margin-top:10px;">
            <span>GM invisible</span>
            <input id="mapsInvisibleToggle" type="checkbox" ${selfInvisible ? "checked" : ""} />
          </label>
          ${canEditMap ? `
          <label>
            <span class="small muted">Avatar size</span>
            <div class="mapRangeRow">
              <input id="mapsAvatarSizeRange" type="range" min="18" max="96" value="${escapeHtml(avatarSize)}" />
              <div class="mapRangeVal" id="mapsAvatarSizeVal">${escapeHtml(avatarSize)}</div>
            </div>
          </label>
          <label style="margin-top:10px;">
            <span class="small muted">Camera zoom</span>
            <div class="mapRangeRow">
              <input id="mapsCameraZoomRange" type="range" min="1" max="4" step="0.05" value="${escapeHtml(cameraZoom.toFixed(2))}" />
              <div class="mapRangeVal" id="mapsCameraZoomVal">${escapeHtml(cameraZoom.toFixed(2))}</div>
            </div>
          </label>
          <label class="checkRow" style="margin-top:10px;">
            <span>Enable walkies</span>
            <input id="mapsWalkiesToggle" type="checkbox" ${walkiesEnabled ? "checked" : ""} />
          </label>
          <label class="checkRow" style="margin-top:10px;">
            <span>TTRPG mode</span>
            <input id="mapsTtrpgToggle" type="checkbox" ${ttrpgEnabled ? "checked" : ""} />
          </label>
          ${ttrpgEnabled && canManageTtrpg ? `
          <div class="small muted" style="margin-top:10px; line-height:1.15rem;">
            Inspector shortcuts:<br/>
            <b>V</b> select, <b>P</b> place, hold <b>Space</b> pan<br/>
            <b>Q/E</b> rotate selected, <b>Z/X</b> scale selected
          </div>
          ` : ""}
          <div class="row" style="margin-top:10px; gap:10px;">
            <button type="button" class="${editMode ? "primary" : "ghost"} smallBtn" id="mapsEditToggle">Polygon editor</button>
            <div class="small muted grow">${polysCount} polys</div>
          </div>
          <div id="mapsEditPanel" class="hidden">
            <div class="small muted" style="margin-top:10px;">Click to add points. Right-click (or Shift+drag) to pan. ESC clears draft.</div>
            <div class="row" style="margin-top:10px; gap:10px; align-items:center;">
              <button type="button" class="${editKind === "collision" ? "primary" : "ghost"} smallBtn" id="mapsKindCollision">Collision</button>
              <button type="button" class="${editKind === "mask" ? "primary" : "ghost"} smallBtn" id="mapsKindMask">Y-sort mask</button>
              <button type="button" class="${editKind === "exit" ? "primary" : "ghost"} smallBtn" id="mapsKindExit">Exit</button>
            </div>
            <div class="row ${editKind === "exit" ? "" : "hidden"}" id="mapsExitRow" style="margin-top:10px; gap:10px; align-items:center;">
              <select id="mapsExitAction" class="grow">
                <option value="toMaps">Exit to Maps</option>
                <option value="toMap">Exit to Map…</option>
              </select>
              <select id="mapsExitTarget" class="grow hidden"></select>
            </div>
            <div class="row" style="margin-top:10px; gap:10px; align-items:center;">
              <button type="button" class="ghost smallBtn" id="mapsPolyUndo">Undo</button>
              <button type="button" class="ghost smallBtn" id="mapsPolyClose">Close poly</button>
            </div>
            <div class="row" style="margin-top:10px; gap:10px; align-items:center;">
              <button type="button" class="ghost smallBtn" id="mapsPolyClearAll">Clear all</button>
              <button type="button" class="primary smallBtn" id="mapsPolySave">Save</button>
            </div>
            <div class="small muted" id="mapsPolyStatus" style="margin-top:8px;"></div>
          </div>
          ` : ""}
        `
        : "";
      const polyModalHtml = canEditMap && editMode ? renderPolyModal() : "";
      mapsPanel.innerHTML = `
        <div class="mapsRoomWrap">
        <div class="mapView">
          <div class="mapCanvasWrap">
            <canvas class="mapCanvas" id="mapsCanvas"></canvas>
            <div class="mapChatOverlay hidden" id="mapsChatOverlay">
              <input id="mapsChatInput" placeholder="Say something..." />
              <button type="button" class="primary" id="mapsChatSend">Send</button>
            </div>
            <div class="mapWalkieBar ${walkiesEnabled ? "" : "hidden"}" id="mapsWalkieBar">
              <div class="mapWalkieBarInner">
                <button type="button" class="primary mapWalkieBtn" id="mapsWalkieBtn">Hold to talk</button>
                <div class="mapWalkieHint">or hold <b>~</b></div>
              </div>
            </div>
          </div>
          <div class="mapHud">
            <div class="mapHudTitle">
              <div>${title}</div>
              <button type="button" class="ghost smallBtn" data-mapback="1">Back</button>
            </div>
            <div class="small muted">${users.size} in room</div>
            <div class="mapHudList">${list || `<div class="muted small">No one here yet.</div>`}</div>
            <div class="mapHint">
              Exits: <b>${escapeHtml(Array.isArray(activeMap.exits) ? activeMap.exits.length : 0)}</b>
            </div>
            ${shortcutHintHtml}
            ${settingsHtml}
          </div>
        </div>
        <div class="mapDock ${ttrpgEnabled ? "" : "hidden"}" id="mapsTtrpgDock"></div>
        ${polyModalHtml}
        </div>
      `;
      loadBackground(activeMap.backgroundUrl || "");
      startLoop();

      const invToggle = document.getElementById("mapsInvisibleToggle");
      if (invToggle && showSettings) {
        invToggle.onchange = () => {
          const invisible = Boolean(invToggle.checked);
          selfInvisible = invisible;
          ctx.send("setInvisible", { mapId: activeMap.id, invisible });
          renderMapView();
        };
      }

      const range = document.getElementById("mapsAvatarSizeRange");
      const val = document.getElementById("mapsAvatarSizeVal");
      if (range && val && canEditMap) {
        const commit = () => {
          const next = Math.max(18, Math.min(96, Number(range.value || 36)));
          val.textContent = String(next);
          activeMap.avatarSize = next;
          if (mapAvatarSaveTimer) clearTimeout(mapAvatarSaveTimer);
          mapAvatarSaveTimer = setTimeout(() => {
            ctx.send("updateMap", { id: activeMap.id, avatarSize: next });
          }, 220);
        };
        range.oninput = commit;
        range.onchange = commit;
      }

      const zoomRange = document.getElementById("mapsCameraZoomRange");
      const zoomVal = document.getElementById("mapsCameraZoomVal");
      if (zoomRange && zoomVal && canEditMap) {
        const commit = () => {
          const next = Math.max(1, Math.min(4, Number(zoomRange.value || 2.35) || 2.35));
          zoomVal.textContent = next.toFixed(2);
          activeMap.cameraZoom = next;
          if (mapZoomSaveTimer) clearTimeout(mapZoomSaveTimer);
          mapZoomSaveTimer = setTimeout(() => {
            ctx.send("updateMap", { id: activeMap.id, cameraZoom: next });
          }, 220);
        };
        zoomRange.oninput = commit;
        zoomRange.onchange = commit;
      }

      const walkiesToggle = document.getElementById("mapsWalkiesToggle");
      if (walkiesToggle && canEditMap) {
        walkiesToggle.onchange = () => {
          const enabled = Boolean(walkiesToggle.checked);
          activeMap.walkiesEnabled = enabled;
          ctx.send("updateMap", { id: activeMap.id, walkiesEnabled: enabled });
          const bar = document.getElementById("mapsWalkieBar");
          if (bar) bar.classList.toggle("hidden", !enabled);
        };
      }

      const ttrpgToggle = document.getElementById("mapsTtrpgToggle");
      if (ttrpgToggle && canEditMap) {
        ttrpgToggle.onchange = () => {
          const enabled = Boolean(ttrpgToggle.checked);
          activeMap.ttrpgEnabled = enabled;
          ctx.send("ttrpgSetEnabled", { mapId: activeMap.id, enabled });
          renderMapView();
        };
      }

      const editBtn = document.getElementById("mapsEditToggle");
      if (editBtn && canEditMap) {
        editBtn.onclick = () => {
          editMode = !editMode;
          draftPoly = [];
          polyDrag = null;
          vertexDrag = null;
          panning = false;
          panStart = null;
          if (editMode) {
            const list = polysForKind(activeMap, editKind);
            editTool = list.length ? "select" : "draw";
          } else {
            selectedPolyKind = "";
            selectedPolyIndex = -1;
            selectedVertexIndex = -1;
          }
          renderMapView();
        };
      }

      if (editMode) {
        wirePolyModalHandlers();
      }

      const canvas = document.getElementById("mapsCanvas");
      if (canvas) {
        if (editMode) {
          canvas.style.cursor =
            editTool === "draw" ? "crosshair" : editTool === "select" ? "pointer" : editTool === "move" ? "move" : "cell";
        }
        else if (activeMap?.ttrpgEnabled && canManageTtrpg && ttrpgTool === "pan") canvas.style.cursor = "grab";
        else if (activeMap?.ttrpgEnabled && canManageTtrpg && ttrpgTool === "place") canvas.style.cursor = "copy";
        else canvas.style.cursor = "default";
        canvas.oncontextmenu = (e) => {
          if (editMode) e.preventDefault();
        };
        canvas.onpointerdown = (e) => {
          if (!lastTransform) return;
          // Edit mode interactions
          if (editMode) {
            const isPan = e.button === 2 || e.shiftKey;
            if (isPan) {
              panning = true;
              canvas.setPointerCapture(e.pointerId);
              panStart = { x: e.clientX, y: e.clientY, cx: cameraPos?.x ?? 0.5, cy: cameraPos?.y ?? 0.5 };
              return;
            }
            if (e.button !== 0) return;
            const pt = screenToWorldNormalized(e.clientX, e.clientY, canvas, lastTransform);
            if (!pt) return;

            if (editTool === "draw") {
              draftPoly.push(pt);
              const se = document.getElementById("mapsPolyStatus");
              if (se) se.textContent = `${draftPoly.length} pts (draft)`;
              return;
            }

            if (editTool === "select") {
              const hit = hitTestPoly(pt, activeMap, editKind);
              if (hit) {
                selectedPolyKind = editKind;
                selectedPolyIndex = hit.index;
                selectedVertexIndex = -1;
              } else {
                selectedPolyKind = "";
                selectedPolyIndex = -1;
                selectedVertexIndex = -1;
              }
              renderMapView();
              return;
            }

            if (editTool === "move") {
              if (selectedPolyKind !== editKind || selectedPolyIndex < 0) return;
              const list = polysForKind(activeMap, editKind);
              const poly = list[selectedPolyIndex];
              if (!poly || !pointInPoly(pt, poly)) return;
              polyDrag = {
                kind: editKind,
                index: selectedPolyIndex,
                start: { x: pt.x, y: pt.y },
                origPoints: (Array.isArray(poly.points) ? poly.points : []).map((p) => ({ x: Number(p.x || 0), y: Number(p.y || 0) })),
              };
              canvas.setPointerCapture(e.pointerId);
              return;
            }

            if (editTool === "vertex") {
              if (selectedPolyKind !== editKind || selectedPolyIndex < 0) return;
              const list = polysForKind(activeMap, editKind);
              const poly = list[selectedPolyIndex];
              if (!poly) return;
              const vIdx = hitTestVertex(e.clientX, e.clientY, canvas, lastTransform, poly);
              if (vIdx < 0) return;
              selectedVertexIndex = vIdx;
              vertexDrag = { kind: editKind, index: selectedPolyIndex, vIdx };
              canvas.setPointerCapture(e.pointerId);
              return;
            }
          }

          if (!activeMap?.ttrpgEnabled || !canManageTtrpg) return;
          if (e.button !== 0) return;
          if (ttrpgTool === "pan") {
            panning = true;
            canvas.setPointerCapture(e.pointerId);
            panStart = { x: e.clientX, y: e.clientY, cx: cameraPos?.x ?? 0.5, cy: cameraPos?.y ?? 0.5 };
            canvas.style.cursor = "grabbing";
            return;
          }
          const hit = hitTestPropAtPointer(e.clientX, e.clientY, canvas, lastTransform);
          if (hit) {
            selectedPropId = hit.propId;
            const pt = screenToWorldNormalized(e.clientX, e.clientY, canvas, lastTransform);
            if (!pt) return;
            if (ttrpgTool === "select") {
              propDrag = { propId: hit.propId, offsetX: hit.x - pt.x, offsetY: hit.y - pt.y };
              propDragMoved = false;
              canvas.setPointerCapture(e.pointerId);
            }
            renderTtrpgDock();
          } else if (ttrpgTool === "select") {
            selectedPropId = "";
            renderTtrpgDock();
          }
        };
        canvas.onpointermove = (e) => {
          if (!lastTransform) return;
          if (editMode) {
            if (panning && panStart && lastTransform) {
              const dx = e.clientX - panStart.x;
              const dy = e.clientY - panStart.y;
              const worldDx = -(dx / lastTransform.zoom);
              const worldDy = -(dy / lastTransform.zoom);
              const nx = (panStart.cx * lastTransform.worldW + worldDx) / lastTransform.worldW;
              const ny = (panStart.cy * lastTransform.worldH + worldDy) / lastTransform.worldH;
              cameraPos = { x: Math.max(0, Math.min(1, nx)), y: Math.max(0, Math.min(1, ny)) };
              return;
            }
            if (polyDrag) {
              const pt = screenToWorldNormalized(e.clientX, e.clientY, canvas, lastTransform);
              if (!pt) return;
              const dx = pt.x - polyDrag.start.x;
              const dy = pt.y - polyDrag.start.y;
              const list = polysForKind(activeMap, polyDrag.kind);
              const poly = list[polyDrag.index];
              if (!poly) return;
              poly.points = polyDrag.origPoints.map((p) => ({ x: Math.max(0, Math.min(1, p.x + dx)), y: Math.max(0, Math.min(1, p.y + dy)) }));
              return;
            }
            if (vertexDrag) {
              const pt = screenToWorldNormalized(e.clientX, e.clientY, canvas, lastTransform);
              if (!pt) return;
              const list = polysForKind(activeMap, vertexDrag.kind);
              const poly = list[vertexDrag.index];
              const pts = Array.isArray(poly?.points) ? poly.points : null;
              if (!poly || !pts || vertexDrag.vIdx < 0 || vertexDrag.vIdx >= pts.length) return;
              pts[vertexDrag.vIdx] = { x: pt.x, y: pt.y };
              poly.points = pts;
              return;
            }
            return;
          }
          if (panning && panStart && lastTransform) {
            const dx = e.clientX - panStart.x;
            const dy = e.clientY - panStart.y;
            const worldDx = -(dx / lastTransform.zoom);
            const worldDy = -(dy / lastTransform.zoom);
            const nx = (panStart.cx * lastTransform.worldW + worldDx) / lastTransform.worldW;
            const ny = (panStart.cy * lastTransform.worldH + worldDy) / lastTransform.worldH;
            cameraPos = { x: Math.max(0, Math.min(1, nx)), y: Math.max(0, Math.min(1, ny)) };
            return;
          }
          if (!propDrag || !activeMap?.ttrpgEnabled || !canManageTtrpg) return;
          const pt = screenToWorldNormalized(e.clientX, e.clientY, canvas, lastTransform);
          if (!pt) return;
          const x = Math.max(0, Math.min(1, pt.x + propDrag.offsetX));
          const y = Math.max(0, Math.min(1, pt.y + propDrag.offsetY));
          const props = Array.isArray(activeMap.props) ? activeMap.props : [];
          const idx = props.findIndex((p) => String(p?.id || "") === propDrag.propId);
          if (idx < 0) return;
          const prev = props[idx];
          if (!prev) return;
          const moved = Math.hypot((prev.x || 0) - x, (prev.y || 0) - y) > 0.0006;
          if (moved) propDragMoved = true;
          props[idx] = { ...prev, x, y };
          activeMap.props = props;
          const now = Date.now();
          if (now - lastPropMoveAt > 70) {
            lastPropMoveAt = now;
            ctx.send("ttrpgPropMove", { mapId: activeMap.id, propId: propDrag.propId, x, y, z: prev.z || 0, rot: prev.rot || 0, scale: prev.scale || 1 });
          }
        };
        canvas.onpointerup = (e) => {
          if (!lastTransform) return;
          if (editMode) {
            panning = false;
            panStart = null;
            polyDrag = null;
            vertexDrag = null;
            try {
              canvas.releasePointerCapture(e.pointerId);
            } catch {
              // ignore
            }
            return;
          }
          if (panning) {
            panning = false;
            panStart = null;
            if (activeMap?.ttrpgEnabled && canManageTtrpg && ttrpgTool === "pan") canvas.style.cursor = "grab";
            return;
          }

          if (propDrag) {
            // finalize drag
            const props = Array.isArray(activeMap.props) ? activeMap.props : [];
            const idx = props.findIndex((p) => String(p?.id || "") === propDrag.propId);
            if (idx >= 0) {
              const p = props[idx];
              if (p) ctx.send("ttrpgPropMove", { mapId: activeMap.id, propId: propDrag.propId, x: p.x, y: p.y, z: p.z || 0, rot: p.rot || 0, scale: p.scale || 1 });
            }
            propDrag = null;
            renderTtrpgDock();
            return;
          }

          // Place prop (GM only) by clicking canvas with a selected sprite.
          if (!activeMap?.ttrpgEnabled || !canManageTtrpg) return;
          if (ttrpgTool !== "place") return;
          if (!selectedSpriteId) return;
          if (e.button !== 0) return;
          const pt = screenToWorldNormalized(e.clientX, e.clientY, canvas, lastTransform);
          if (!pt) return;
          const propId = `prop_${Date.now()}_${Math.random().toString(16).slice(2)}`;
          const sprite = (Array.isArray(activeMap.sprites) ? activeMap.sprites : []).find((s) => String(s?.id || "") === String(selectedSpriteId || ""));
          const isToken = sprite?.kind === "token";
          const optimistic = {
            id: propId,
            spriteId: selectedSpriteId,
            x: pt.x,
            y: pt.y,
            z: 0,
            rot: placeRot,
            scale: placeScale,
            nickname: "",
            hpCurrent: isToken ? 10 : 0,
            hpMax: isToken ? 10 : 0,
            controlledBy: ""
          };
          if (!Array.isArray(activeMap.props)) activeMap.props = [];
          activeMap.props = [...activeMap.props.filter((p) => String(p?.id || "") !== propId), optimistic];
          selectedPropId = propId;
          renderTtrpgDock();
          ctx.send("ttrpgPropAdd", { mapId: activeMap.id, id: propId, spriteId: selectedSpriteId, x: pt.x, y: pt.y, z: 0, rot: placeRot, scale: placeScale });
        };
      }

      const walkieBtn = document.getElementById("mapsWalkieBtn");
      if (walkieBtn) {
        const down = async (e) => {
          if (e) e.preventDefault();
          if (editMode) return;
          if (!activeMap?.walkiesEnabled) return;
          try {
            await startWalkie();
            walkieBtn.textContent = "Recording…";
          } catch (err) {
            ctx.toast("Walkie", String(err?.message || err));
          }
        };
        const up = (e) => {
          if (e) e.preventDefault();
          stopWalkie();
          walkieBtn.textContent = "Hold to talk";
        };
        walkieBtn.onpointerdown = down;
        walkieBtn.onpointerup = up;
        walkieBtn.onpointercancel = up;
        walkieBtn.onpointerleave = (e) => {
          // If the pointer is captured during recording, we'll still stop on up; otherwise stop on leave.
          if (walkieRecording) up(e);
        };
      }

      renderTtrpgDock();
    }

    function renderTtrpgDock() {
      const dock = document.getElementById("mapsTtrpgDock");
      if (!dock) return;
      if (!activeMap?.ttrpgEnabled) {
        dock.innerHTML = "";
        dock.classList.remove("collapsed");
        return;
      }
      const collapsed = Boolean(ttrpgDockCollapsed);
      dock.classList.toggle("collapsed", collapsed);
      const sprites = Array.isArray(activeMap.sprites) ? activeMap.sprites : [];
      const props = Array.isArray(activeMap.props) ? activeMap.props : [];
      const kind = spriteKind === "token" ? "token" : "prop";
      const spritesOfKind = sprites.filter((s) => (s?.kind || "prop") === kind);
      if (canManageTtrpg) {
        const hasSelected = spritesOfKind.some((s) => String(s?.id || "") === String(selectedSpriteId || ""));
        if ((!selectedSpriteId || !hasSelected) && spritesOfKind.length) {
          selectedSpriteId = String(spritesOfKind[0]?.id || "");
        }
      }
      const selectedSprite = sprites.find((s) => String(s?.id || "") === selectedSpriteId) || null;
      const placingLabel = selectedSprite ? (selectedSprite.name ? selectedSprite.name : selectedSprite.id) : "";
      const thumbs = spritesOfKind
        .map((s) => {
          const sel = s.id === selectedSpriteId ? " selected" : "";
          const label = s.name ? escapeHtml(s.name) : escapeHtml(s.id);
          return `<button type="button" class="spriteThumb${sel}" data-spriteid="${escapeHtml(s.id)}" title="${label}">
            <img src="${escapeHtml(s.url)}" alt="" />
          </button>`;
        })
        .join("");
      const spriteById = new Map(sprites.map((s) => [String(s?.id || ""), s]));
      const placedOfKind = props.filter((p) => (spriteById.get(String(p?.spriteId || ""))?.kind || "prop") === kind);
      const placedThumbs = placedOfKind
        .slice()
        .sort((a, b) => Number(a?.y || 0) - Number(b?.y || 0))
        .slice(0, 160)
        .map((p) => {
          const spr = spriteById.get(String(p?.spriteId || ""));
          if (!spr) return "";
          const sel = String(p?.id || "") === String(selectedPropId || "") ? " selected" : "";
          const label = spr.name ? spr.name : spr.id;
          return `<button type="button" class="spriteThumb${sel}" data-propid="${escapeHtml(String(p.id || ""))}" title="${escapeHtml(label)}">
            <img src="${escapeHtml(String(spr.url || ""))}" alt="" />
          </button>`;
        })
        .join("");
      const me = String(ctx.getUser() || "").trim().toLowerCase();
      const selectedProp = props.find((p) => String(p?.id || "") === String(selectedPropId || "")) || null;
      const selectedPropSprite = selectedProp ? spriteById.get(String(selectedProp.spriteId || "")) || null : null;
      const selectedIsToken = Boolean(selectedProp && selectedPropSprite?.kind === "token");
      const selectedScale = selectedProp ? Math.max(0.1, Math.min(4.0, Number(selectedProp.scale || 1))) : 1;
      if (speakingAsPropId && !props.some((p) => String(p?.id || "") === String(speakingAsPropId))) {
        speakingAsPropId = "";
      }
      const speakingProp = speakingAsPropId ? props.find((p) => String(p?.id || "") === String(speakingAsPropId)) : null;
      const speakingSprite = speakingProp ? spriteById.get(String(speakingProp.spriteId || "")) : null;
      const speakingName = speakingProp ? String(speakingProp.nickname || speakingSprite?.name || speakingSprite?.id || "token") : "";

      dock.innerHTML = `
        <div class="dockRow">
          <div class="dockTitle">TTRPG mode</div>
          <div class="small muted grow">${canManageTtrpg ? "GM tools enabled" : "Waiting for GM…"}</div>
        </div>
        <div class="dockRow">
          <button type="button" class="${ttrpgTool === "select" ? "primary" : "ghost"} smallBtn" id="mapsToolSelect">Select</button>
          <button type="button" class="${ttrpgTool === "place" ? "primary" : "ghost"} smallBtn" id="mapsToolPlace">Place</button>
          <button type="button" class="${ttrpgTool === "pan" ? "primary" : "ghost"} smallBtn" id="mapsToolPan">Pan</button>
          <div class="small muted grow">V select · P place · Space pan</div>
        </div>
        <div class="dockRow">
          <button type="button" class="${kind === "prop" ? "primary" : "ghost"} smallBtn" id="mapsKindProp">Props</button>
          <button type="button" class="${kind === "token" ? "primary" : "ghost"} smallBtn" id="mapsKindToken">Tokens</button>
          <div class="small muted grow">${spritesOfKind.length} sprites â€¢ ${placedOfKind.length} placed</div>
        </div>
        <div class="dockRow">
          <div class="small muted grow">${
            canManageTtrpg
              ? placingLabel
                ? `Placing: <b>${escapeHtml(placingLabel)}</b> · Rot <b>Q/E</b> ${escapeHtml(placeRot.toFixed(0))}° · Scale <b>Z/X</b> ${escapeHtml(placeScale.toFixed(2))}x`
                : `Select a sprite then place it on the map.`
              : `${kind === "token" ? "Tokens" : "Props"} are controlled by the GM.`
          }</div>
        </div>
        <div class="dockRow">
          ${canManageTtrpg ? `
          <input id="mapsSpriteFile" type="file" accept="image/png,image/webp" />
          <input id="mapsSpriteName" type="text" maxlength="40" placeholder="Sprite name" />
          <div class="dockScale">
            <input id="mapsSpriteScale" type="range" min="0.25" max="4" step="0.05" value="${escapeHtml(String(spriteScale))}" />
            <div class="dockScaleVal" id="mapsSpriteScaleVal">${escapeHtml(spriteScale.toFixed(2))}</div>
          </div>
          <div class="dockScale">
            <input id="mapsPlaceScale" type="range" min="0.10" max="4" step="0.05" value="${escapeHtml(String(placeScale))}" />
            <div class="dockScaleVal" id="mapsPlaceScaleVal">${escapeHtml(placeScale.toFixed(2))}</div>
          </div>
          <button type="button" class="ghost smallBtn" id="mapsSpriteAddBtn">Add</button>
          <button type="button" class="ghost smallBtn" id="mapsSpriteRemoveBtn" ${selectedSpriteId ? "" : "disabled"}>Remove</button>
          ` : `<div class="muted small">Props/tokens are controlled by the GM.</div>`}
        </div>
        <div class="spriteTray" id="mapsSpriteTray">
          ${thumbs || `<div class="muted small">No sprites yet.</div>`}
        </div>
        <div class="dockRow" style="margin-top:6px;">
          <div class="small muted grow">Placed ${kind === "token" ? "tokens" : "props"}</div>
          <button type="button" class="ghost smallBtn" id="mapsPropDeleteBtn" ${selectedPropId ? "" : "disabled"}>Delete</button>
        </div>
        <div class="spriteTray" id="mapsPropTray">
          ${placedThumbs || `<div class="muted small">None placed yet.</div>`}
        </div>
        <div class="dockRow" style="margin-top:8px;">
          ${selectedProp ? `<div class="small muted grow">Selected: <b>${escapeHtml(String(selectedProp.nickname || selectedPropSprite?.name || selectedPropSprite?.id || selectedProp.id || "item"))}</b> · ${escapeHtml(selectedScale.toFixed(2))}x</div>` : `<div class="small muted grow">Select an item to edit it.</div>`}
          <button type="button" class="ghost smallBtn" id="mapsScaleDownBtn" ${selectedProp ? "" : "disabled"}>-</button>
          <button type="button" class="ghost smallBtn" id="mapsScaleUpBtn" ${selectedProp ? "" : "disabled"}>+</button>
        </div>
        ${
          selectedIsToken
            ? `<div class="dockRow" style="gap:8px;">
                 <input id="mapsPropNick" type="text" maxlength="40" placeholder="Token nickname" value="${escapeHtml(String(selectedProp.nickname || ""))}" />
                 <input id="mapsPropHpCur" type="number" min="0" max="9999" value="${escapeHtml(String(selectedProp.hpCurrent || 0))}" />
                 <input id="mapsPropHpMax" type="number" min="0" max="9999" value="${escapeHtml(String(selectedProp.hpMax || 0))}" />
                 <button type="button" class="ghost smallBtn" id="mapsPropSaveMeta">Save</button>
               </div>
               <div class="dockRow" style="gap:8px;">
                 <div class="small muted grow">Controller: <b>${escapeHtml(String(selectedProp.controlledBy || "none"))}</b></div>
                  <button type="button" class="ghost smallBtn" id="mapsTokenPossessBtn" ${selectedProp.controlledBy && selectedProp.controlledBy !== me ? "disabled" : ""}>${selectedProp.controlledBy === me ? "Release" : "Possess"}</button>
                  <button type="button" class="${speakingAsPropId === selectedPropId ? "primary" : "ghost"} smallBtn" id="mapsTokenSpeakBtn">${speakingAsPropId === selectedPropId ? "Speaking" : "Speak as"}</button>
                </div>`
             : ""
        }
        ${speakingProp ? `<div class="dockRow"><div class="small muted">Chat voice: <b>${escapeHtml(speakingName)}</b></div></div>` : ""}
      `;

      const dockChildren = Array.from(dock.children);
      const headerRow = dockChildren[0];
      if (headerRow) {
        headerRow.classList.add("dockHeaderRow");
        const grow = headerRow.querySelector(".grow");
        if (grow) {
          const base = grow.getAttribute("data-base") || grow.textContent || "";
          if (!grow.hasAttribute("data-base")) grow.setAttribute("data-base", base);
          grow.textContent = base + (collapsed ? " (hidden)" : "");
        }
        let toggleBtn = headerRow.querySelector("#mapsDockToggle");
        if (!toggleBtn) {
          toggleBtn = document.createElement("button");
          toggleBtn.type = "button";
          toggleBtn.className = "ghost smallBtn";
          toggleBtn.id = "mapsDockToggle";
          headerRow.appendChild(toggleBtn);
        }

        let releaseBtn = headerRow.querySelector("#mapsReleasePossession");
        if (canManageTtrpg) {
          const possessed = getPossessedTokenForMe();
          if (!releaseBtn) {
            releaseBtn = document.createElement("button");
            releaseBtn.type = "button";
            releaseBtn.className = "ghost smallBtn";
            releaseBtn.id = "mapsReleasePossession";
          }
          if (toggleBtn) headerRow.insertBefore(releaseBtn, toggleBtn);
          else headerRow.appendChild(releaseBtn);
          releaseBtn.textContent = "Release";
          releaseBtn.disabled = !possessed;
          releaseBtn.title = possessed ? "Release token control" : "Not controlling a token";
          releaseBtn.onclick = () => {
            if (!activeMap?.id) return;
            const pid = possessed ? String(possessed.id || "") : String(selectedPropId || "");
            const meU = String(ctx.getUser() || "").trim().toLowerCase();
            speakingAsPropId = "";
            if (meU) {
              const list = Array.isArray(activeMap.props) ? activeMap.props : [];
              let changed = false;
              const nextList = list.map((p) => {
                if (!p) return p;
                if (String(p.controlledBy || "") !== meU) return p;
                const spr = spriteById.get(String(p?.spriteId || ""));
                if (spr?.kind !== "token") return p;
                changed = true;
                return { ...p, controlledBy: "" };
              });
              if (changed) activeMap.props = nextList;
            }
            ctx.send("ttrpgTokenPossess", { mapId: activeMap.id, propId: pid, action: "release" });
            renderTtrpgDock();
          };
        } else if (releaseBtn) {
          releaseBtn.remove();
        }

        toggleBtn.textContent = collapsed ? "Show" : "Hide";
        toggleBtn.onclick = () => {
          if (!activeMap?.id) return;
          writeDockCollapsed(activeMap.id, !ttrpgDockCollapsed);
          renderTtrpgDock();
        };

        const body = document.createElement("div");
        body.className = "dockBody";
        for (let i = 1; i < dockChildren.length; i++) {
          body.appendChild(dockChildren[i]);
        }
        dock.appendChild(body);
      }

      const tray = document.getElementById("mapsSpriteTray");
      if (tray) {
        tray.onclick = (e) => {
          const btn = e.target.closest("[data-spriteid]");
          if (!btn) return;
          selectedSpriteId = String(btn.getAttribute("data-spriteid") || "");
          selectedPropId = "";
          ttrpgTool = "place";
          renderTtrpgDock();
        };
      }

      const toolSelect = document.getElementById("mapsToolSelect");
      const toolPlace = document.getElementById("mapsToolPlace");
      const toolPan = document.getElementById("mapsToolPan");
      if (toolSelect) toolSelect.onclick = () => { ttrpgTool = "select"; renderMapView(); };
      if (toolPlace) toolPlace.onclick = () => { ttrpgTool = "place"; renderMapView(); };
      if (toolPan) toolPan.onclick = () => { ttrpgTool = "pan"; renderMapView(); };

      const kindPropBtn = document.getElementById("mapsKindProp");
      const kindTokenBtn = document.getElementById("mapsKindToken");
      if (kindPropBtn) kindPropBtn.onclick = () => { spriteKind = "prop"; selectedSpriteId = ""; selectedPropId = ""; renderTtrpgDock(); };
      if (kindTokenBtn) kindTokenBtn.onclick = () => { spriteKind = "token"; selectedSpriteId = ""; selectedPropId = ""; renderTtrpgDock(); };

      const propTray = document.getElementById("mapsPropTray");
      if (propTray) {
        propTray.onclick = (e) => {
          const btn = e.target.closest("[data-propid]");
          if (!btn) return;
          selectedPropId = String(btn.getAttribute("data-propid") || "");
          ttrpgTool = "select";
          renderTtrpgDock();
        };
      }

      if (!canManageTtrpg) return;
      const scaleEl = document.getElementById("mapsSpriteScale");
      const scaleVal = document.getElementById("mapsSpriteScaleVal");
      if (scaleEl && scaleVal) {
        const update = () => {
          const v = Math.max(0.1, Math.min(4.0, Number(scaleEl.value || 1)));
          spriteScale = v;
          scaleVal.textContent = v.toFixed(2);
        };
        scaleEl.oninput = update;
        update();
      }
      const placeScaleEl = document.getElementById("mapsPlaceScale");
      const placeScaleVal = document.getElementById("mapsPlaceScaleVal");
      if (placeScaleEl && placeScaleVal) {
        const update = () => {
          const v = Math.max(0.1, Math.min(4.0, Number(placeScaleEl.value || 1)));
          placeScale = v;
          placeScaleVal.textContent = v.toFixed(2);
        };
        placeScaleEl.oninput = update;
        update();
      }
      const addBtn = document.getElementById("mapsSpriteAddBtn");
      const fileEl = document.getElementById("mapsSpriteFile");
      const nameEl = document.getElementById("mapsSpriteName");
      if (addBtn && fileEl) {
        addBtn.onclick = async () => {
          const file = fileEl.files && fileEl.files[0] ? fileEl.files[0] : null;
          if (!file) return;
          addBtn.disabled = true;
          try {
            const url = await uploadSpriteImageFile(file);
            const name = nameEl ? String(nameEl.value || "").trim() : "";
            const k = spriteKind === "token" ? "token" : "prop";
            const id = `spr_${Date.now()}_${Math.random().toString(16).slice(2)}`;
            const sprite = { id, kind: k, name, url, scale: spriteScale };
            if (!Array.isArray(activeMap.sprites)) activeMap.sprites = [];
            activeMap.sprites = [...activeMap.sprites.filter((s) => String(s?.id || "") !== id), sprite];
            selectedSpriteId = id;
            selectedPropId = "";
            ttrpgTool = "place";
            renderTtrpgDock();
            ctx.send("ttrpgSpriteAdd", { mapId: activeMap.id, id, kind: k, name, url, scale: spriteScale });
            fileEl.value = "";
            if (nameEl) nameEl.value = "";
          } catch (e) {
            ctx.toast("Sprites", String(e?.message || e));
          } finally {
            addBtn.disabled = false;
          }
        };
      }
      const removeBtn = document.getElementById("mapsSpriteRemoveBtn");
      if (removeBtn) {
        removeBtn.onclick = () => {
          if (!selectedSpriteId) return;
          const ok = window.confirm("Remove this sprite? Props using it will also be removed.");
          if (!ok) return;
          const spriteId = String(selectedSpriteId || "");
          activeMap.sprites = (Array.isArray(activeMap.sprites) ? activeMap.sprites : []).filter((s) => String(s?.id || "") !== spriteId);
          activeMap.props = (Array.isArray(activeMap.props) ? activeMap.props : []).filter((p) => String(p?.spriteId || "") !== spriteId);
          if (speakingAsPropId && !activeMap.props.some((p) => String(p?.id || "") === String(speakingAsPropId))) speakingAsPropId = "";
          selectedSpriteId = "";
          selectedPropId = "";
          renderTtrpgDock();
          ctx.send("ttrpgSpriteRemove", { mapId: activeMap.id, spriteId });
        };
      }

      const delPropBtn = document.getElementById("mapsPropDeleteBtn");
      if (delPropBtn) {
        delPropBtn.onclick = () => {
          if (!selectedPropId) return;
          const ok = window.confirm("Delete this placed item?");
          if (!ok) return;
          const propId = String(selectedPropId || "");
          activeMap.props = (Array.isArray(activeMap.props) ? activeMap.props : []).filter((p) => String(p?.id || "") !== propId);
          if (speakingAsPropId === propId) speakingAsPropId = "";
          selectedPropId = "";
          renderTtrpgDock();
          ctx.send("ttrpgPropRemove", { mapId: activeMap.id, propId });
        };
      }

      const scaleDownBtn = document.getElementById("mapsScaleDownBtn");
      const scaleUpBtn = document.getElementById("mapsScaleUpBtn");
      if (scaleDownBtn && selectedProp) {
        scaleDownBtn.onclick = () => {
          const next = Math.max(0.1, Math.min(4.0, Number(selectedProp.scale || 1) - 0.1));
          const list = Array.isArray(activeMap.props) ? activeMap.props : [];
          const idx = list.findIndex((p) => String(p?.id || "") === String(selectedProp.id || ""));
          if (idx < 0) return;
          list[idx] = { ...list[idx], scale: next };
          activeMap.props = list;
          renderTtrpgDock();
          ctx.send("ttrpgPropMove", { mapId: activeMap.id, propId: selectedProp.id, x: list[idx].x, y: list[idx].y, z: list[idx].z || 0, rot: list[idx].rot || 0, scale: next });
        };
      }
      if (scaleUpBtn && selectedProp) {
        scaleUpBtn.onclick = () => {
          const next = Math.max(0.1, Math.min(4.0, Number(selectedProp.scale || 1) + 0.1));
          const list = Array.isArray(activeMap.props) ? activeMap.props : [];
          const idx = list.findIndex((p) => String(p?.id || "") === String(selectedProp.id || ""));
          if (idx < 0) return;
          list[idx] = { ...list[idx], scale: next };
          activeMap.props = list;
          renderTtrpgDock();
          ctx.send("ttrpgPropMove", { mapId: activeMap.id, propId: selectedProp.id, x: list[idx].x, y: list[idx].y, z: list[idx].z || 0, rot: list[idx].rot || 0, scale: next });
        };
      }

      const saveMetaBtn = document.getElementById("mapsPropSaveMeta");
      if (saveMetaBtn && selectedProp && selectedIsToken) {
        saveMetaBtn.onclick = () => {
          const nickEl = document.getElementById("mapsPropNick");
          const hpCurEl = document.getElementById("mapsPropHpCur");
          const hpMaxEl = document.getElementById("mapsPropHpMax");
          const nickname = String(nickEl?.value || "").trim().slice(0, 40);
          const hpMax = Math.max(0, Math.min(9999, Number(hpMaxEl?.value || 0) || 0));
          let hpCurrent = Math.max(0, Math.min(hpMax > 0 ? hpMax : 9999, Number(hpCurEl?.value || 0) || 0));
          if (hpCurrent > hpMax && hpMax > 0) hpCurrent = hpMax;
          const list = Array.isArray(activeMap.props) ? activeMap.props : [];
          const idx = list.findIndex((p) => String(p?.id || "") === String(selectedProp.id || ""));
          if (idx < 0) return;
          list[idx] = { ...list[idx], nickname, hpCurrent, hpMax };
          activeMap.props = list;
          renderTtrpgDock();
          ctx.send("ttrpgPropPatch", { mapId: activeMap.id, propId: selectedProp.id, nickname, hpCurrent, hpMax });
        };
      }

      const possessBtn = document.getElementById("mapsTokenPossessBtn");
      if (possessBtn && selectedProp && selectedIsToken) {
        possessBtn.onclick = () => {
          if (!activeMap?.id) return;
          const isMine = String(selectedProp.controlledBy || "") === me;
          const action = isMine ? "release" : "possess";

          // Optimistic UI: keep possession exclusive and make release always "release all my tokens".
          const list = Array.isArray(activeMap.props) ? activeMap.props : [];
          const targetId = String(selectedProp.id || "");
          let changed = false;
          const nextList = list.map((p) => {
            if (!p) return p;
            const pid = String(p?.id || "");
            const spr = spriteById.get(String(p?.spriteId || ""));
            const isToken = spr?.kind === "token";
            if (!isToken) return p;
            if (action === "release") {
              if (String(p.controlledBy || "") !== me) return p;
              changed = true;
              return { ...p, controlledBy: "" };
            }
            // possess: release other tokens I control, and claim selected
            if (pid === targetId) {
              if (String(p.controlledBy || "") !== me) changed = true;
              return { ...p, controlledBy: me };
            }
            if (String(p.controlledBy || "") === me) {
              changed = true;
              return { ...p, controlledBy: "" };
            }
            return p;
          });
          if (action === "release") speakingAsPropId = "";
          if (action === "possess") speakingAsPropId = targetId;
          if (changed) activeMap.props = nextList;

          ctx.send("ttrpgTokenPossess", { mapId: activeMap.id, propId: selectedProp.id, action });
          renderTtrpgDock();
        };
      }

      const speakBtn = document.getElementById("mapsTokenSpeakBtn");
      if (speakBtn && selectedProp && selectedIsToken) {
        speakBtn.onclick = () => {
          speakingAsPropId = speakingAsPropId === selectedProp.id ? "" : selectedProp.id;
          renderTtrpgDock();
        };
      }
    }

    function screenToWorldNormalized(clientX, clientY, canvas, tr) {
      const rect = canvas.getBoundingClientRect();
      const sx = clientX - rect.left;
      const sy = clientY - rect.top;
      if (sx < 0 || sy < 0 || sx > rect.width || sy > rect.height) return null;
      const worldX = tr.srcX + (sx / tr.zoom);
      const worldY = tr.srcY + (sy / tr.zoom);
      return { x: Math.max(0, Math.min(1, worldX / tr.worldW)), y: Math.max(0, Math.min(1, worldY / tr.worldH)) };
    }

    function getSpriteImage(url) {
      const src = String(url || "").trim();
      if (!src) return null;
      const now = Date.now();
      const cached = spriteImageCache.get(src);
      if (cached) {
        if (cached.status === "ok" && cached.img) return cached.img;
        if (cached.status === "loading") return null;
        if (cached.status === "error" && now - Number(cached.failedAt || 0) < 5000) return null;
      }
      const img = new Image();
      if (!src.startsWith("data:")) img.crossOrigin = "anonymous";
      spriteImageCache.set(src, { img: null, status: "loading", failedAt: 0 });
      img.onload = () => spriteImageCache.set(src, { img, status: "ok", failedAt: 0 });
      img.onerror = () => spriteImageCache.set(src, { img: null, status: "error", failedAt: Date.now() });
      img.src = src;
      return null;
    }

    function commitDraftPoly() {
      if (!draftPoly || draftPoly.length < 3) return false;
      const poly = { points: draftPoly.map((p) => ({ x: p.x, y: p.y })) };
      const list = polysForKind(activeMap, editKind, true);
      if (editKind === "exit") {
        const name = String(exitDraftName || "").trim().slice(0, 40);
        if (!name) return false;
        const action = exitAction === "toMap" ? "toMap" : "toMaps";
        const toMapId = action === "toMap" ? String(exitTargetMapId || "").trim().toLowerCase() : "";
        if (action === "toMap" && !toMapId) return false;
        const targetExit = action === "toMap" ? String(exitTargetExitName || "").trim().slice(0, 40) : "";
        list.push({ ...poly, name, action, toMapId, targetExit });
      } else {
        list.push(poly);
      }
      draftPoly = [];
      selectedPolyKind = editKind;
      selectedPolyIndex = Math.max(0, list.length - 1);
      selectedVertexIndex = -1;
      return true;
    }

    function polysForKind(map, kind, ensure = false) {
      if (!map) return [];
      const k = String(kind || "");
      if (k === "collision") {
        if (ensure && !Array.isArray(map.collisions)) map.collisions = [];
        return Array.isArray(map.collisions) ? map.collisions : [];
      }
      if (k === "mask") {
        if (ensure && !Array.isArray(map.masks)) map.masks = [];
        return Array.isArray(map.masks) ? map.masks : [];
      }
      if (k === "exit") {
        if (ensure && !Array.isArray(map.exits)) map.exits = [];
        return Array.isArray(map.exits) ? map.exits : [];
      }
      if (k === "hidden") {
        if (ensure && !Array.isArray(map.hiddenMasks)) map.hiddenMasks = [];
        return Array.isArray(map.hiddenMasks) ? map.hiddenMasks : [];
      }
      if (k === "occluder") {
        if (ensure && !Array.isArray(map.occluders)) map.occluders = [];
        return Array.isArray(map.occluders) ? map.occluders : [];
      }
      return [];
    }

    function kindLabel(kind) {
      if (kind === "collision") return "Collisions";
      if (kind === "mask") return "Y-sort masks";
      if (kind === "exit") return "Exits";
      if (kind === "hidden") return "Hidden masks";
      if (kind === "occluder") return "Occluders";
      return String(kind || "");
    }

    function hitTestPoly(pt, map, kind) {
      const list = polysForKind(map, kind);
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        if (p && pointInPoly(pt, p)) return { index: i };
      }
      return null;
    }

    function hitTestVertex(clientX, clientY, canvas, tr, poly) {
      const pts = Array.isArray(poly?.points) ? poly.points : [];
      if (!pts.length) return -1;
      const rect = canvas.getBoundingClientRect();
      const sx = clientX - rect.left;
      const sy = clientY - rect.top;
      const threshold = 12;
      let best = { idx: -1, d2: Infinity };
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const x = (Number(p.x) * tr.worldW - tr.srcX) * tr.zoom;
        const y = (Number(p.y) * tr.worldH - tr.srcY) * tr.zoom;
        const dx = x - sx;
        const dy = y - sy;
        const d2 = dx * dx + dy * dy;
        if (d2 < best.d2) best = { idx: i, d2 };
      }
      if (best.idx < 0) return -1;
      return best.d2 <= threshold * threshold ? best.idx : -1;
    }

    function polyCentroid(points) {
      const pts = Array.isArray(points) ? points : [];
      if (!pts.length) return { x: 0.5, y: 0.5 };
      let sx = 0;
      let sy = 0;
      for (const p of pts) {
        sx += Number(p?.x || 0);
        sy += Number(p?.y || 0);
      }
      return { x: Math.max(0, Math.min(1, sx / pts.length)), y: Math.max(0, Math.min(1, sy / pts.length)) };
    }

    function renderPolyModal() {
      const list = polysForKind(activeMap, editKind);
      const selOk = selectedPolyKind === editKind && selectedPolyIndex >= 0 && selectedPolyIndex < list.length;
      const selected = selOk ? list[selectedPolyIndex] : null;

      const otherMaps = (Array.isArray(maps) ? maps : [])
        .map((m) => String(m?.id || "").trim().toLowerCase())
        .filter(Boolean)
        .filter((id) => id !== String(activeMap?.id || "").trim().toLowerCase())
        .sort((a, b) => a.localeCompare(b));

      const mapOptions = otherMaps
        .map((id) => `<option value="${escapeHtml(id)}" ${id === exitModel.toMapId ? "selected" : ""}>${escapeHtml(id)}</option>`)
        .join("");

      const exitModel =
        editKind === "exit" && selected
          ? {
              name: String(selected.name || "").trim(),
              action: String(selected.action || "toMaps") === "toMap" ? "toMap" : "toMaps",
              toMapId: String(selected.toMapId || "").trim().toLowerCase(),
              targetExit: String(selected.targetExit || "").trim(),
            }
          : {
              name: String(exitDraftName || "").trim(),
              action: exitAction === "toMap" ? "toMap" : "toMaps",
              toMapId: String(exitTargetMapId || "").trim().toLowerCase(),
              targetExit: String(exitTargetExitName || "").trim(),
            };

      const polyRows = list
        .map((p, idx) => {
          const on = selOk && idx === selectedPolyIndex ? " selected" : "";
          let label = `${kindLabel(editKind).replace(/s$/, "")} ${idx + 1}`;
          if (editKind === "exit") {
            const name = String(p?.name || "").trim();
            label = name ? name : `Exit ${idx + 1}`;
          }
          const pts = Array.isArray(p?.points) ? p.points.length : 0;
          const meta =
            editKind === "exit"
              ? `${String(p?.action || "toMaps") === "toMap" ? `to ${escapeHtml(String(p?.toMapId || ""))}` : "to maps"}`
              : `${pts} pts`;
          return `<button type="button" class="polyRowBtn${on}" data-polysel="${idx}">
            <div class="polyRowMain">${escapeHtml(label)}</div>
            <div class="polyRowMeta">${meta}</div>
          </button>`;
        })
        .join("");

      const kindBtn = (kind, label, disabled = false) => {
        const on = editKind === kind;
        const dis = disabled ? "disabled" : "";
        return `<button type="button" class="${on ? "primary" : "ghost"} smallBtn" ${dis} data-polykind="${escapeHtml(kind)}">${escapeHtml(label)}</button>`;
      };
      const toolBtn = (tool, label) => {
        const on = editTool === tool;
        return `<button type="button" class="${on ? "primary" : "ghost"} smallBtn" data-polytool="${escapeHtml(tool)}">${escapeHtml(label)}</button>`;
      };

      const inspectorBody = (() => {
        const pts = Array.isArray(selected?.points) ? selected.points.length : 0;
        if (editKind !== "exit") {
          return selOk
            ? `
              <div class="small muted">Selected</div>
              <div style="margin-top:6px;"><b>${escapeHtml(kindLabel(editKind))}</b></div>
              <div class="small muted" style="margin-top:6px;">${pts} points</div>
            `
            : `<div class="small muted">Select a polygon to edit, or draw a new one.</div>`;
        }

        const header = selOk ? "Selected exit" : "New exit defaults";
        return `
          <div class="small muted">${header}</div>
          <label style="margin-top:6px;">
            <div class="small muted">Name</div>
            <input id="mapsExitName" type="text" maxlength="40" placeholder="Example: North Gate" value="${escapeHtml(exitModel.name)}" />
          </label>
          <label style="margin-top:10px;">
            <div class="small muted">Behavior</div>
            <select id="mapsExitBehavior">
              <option value="toMaps" ${exitModel.action === "toMaps" ? "selected" : ""}>Exit to Maps</option>
              <option value="toMap" ${exitModel.action === "toMap" ? "selected" : ""}>Exit to Map</option>
            </select>
          </label>
          <div class="${exitModel.action === "toMap" ? "" : "hidden"}" id="mapsExitToMapWrap" style="margin-top:10px;">
            <label>
              <div class="small muted">Target map</div>
              <select id="mapsExitToMap">${mapOptions}</select>
            </label>
            <label style="margin-top:10px;">
              <div class="small muted">Target exit name (optional)</div>
              <input id="mapsExitTargetExit" type="text" maxlength="40" placeholder="Example: South Gate" value="${escapeHtml(exitModel.targetExit)}" />
            </label>
          </div>
          <div class="small muted" style="margin-top:10px;">${selOk ? `${pts} points` : "Tip: pick Draw, click 3+ points, then Close polygon."}</div>
        `;
      })();

      return `
        <div class="mapsPolyModal" id="mapsPolyModal">
          <div class="mapsPolyModalInner">
            <div class="mapsPolyHeader">
              <div>
                <div class="mapsPolyTitle">Polygon editor</div>
                <div class="small muted">Right-click or Shift+drag to pan. Esc clears draft. Delete removes selected.</div>
              </div>
              <button type="button" class="ghost smallBtn" id="mapsPolyModalClose">Close</button>
            </div>
            <div class="row" style="gap:10px; flex-wrap:wrap; margin-top:10px;">
              ${kindBtn("collision", "Collisions")}
              ${kindBtn("mask", "Y-sort")}
              ${kindBtn("exit", "Exits")}
              ${kindBtn("hidden", "Hidden (soon)", true)}
              ${kindBtn("occluder", "Occluders (soon)", true)}
              <div class="small muted" style="margin-left:auto;">${escapeHtml(String(list.length))} in ${escapeHtml(kindLabel(editKind))}</div>
            </div>
            <div class="row" style="gap:10px; flex-wrap:wrap; margin-top:10px;">
              ${toolBtn("draw", "Draw")}
              ${toolBtn("select", "Select")}
              ${toolBtn("move", "Move")}
              ${toolBtn("vertex", "Vertices")}
              <div class="row" style="gap:10px; margin-left:auto; flex-wrap:wrap;">
                <button type="button" class="ghost smallBtn" id="mapsPolyPrev">Prev</button>
                <button type="button" class="ghost smallBtn" id="mapsPolyNext">Next</button>
                <button type="button" class="ghost smallBtn" id="mapsPolyCopy">Copy</button>
                <button type="button" class="ghost smallBtn" id="mapsPolyPaste" ${polyClipboard ? "" : "disabled"}>Paste</button>
                <button type="button" class="ghost smallBtn" id="mapsPolyDuplicate" ${selOk ? "" : "disabled"}>Duplicate</button>
                <button type="button" class="danger smallBtn" id="mapsPolyDelete" ${selOk ? "" : "disabled"}>Delete</button>
                <button type="button" class="primary smallBtn" id="mapsPolySaveAll">Save</button>
              </div>
            </div>
            <div class="row" style="gap:10px; flex-wrap:wrap; margin-top:10px; align-items:center;">
              <div class="small muted">Draft: <b>${escapeHtml(String(draftPoly.length))}</b> pts</div>
              <button type="button" class="ghost smallBtn" id="mapsPolyUndoPt" ${draftPoly.length ? "" : "disabled"}>Undo point</button>
              <button type="button" class="ghost smallBtn" id="mapsPolyCloseDraft" ${draftPoly.length >= 3 ? "" : "disabled"}>Close polygon</button>
              <button type="button" class="ghost smallBtn" id="mapsPolyClearDraft" ${draftPoly.length ? "" : "disabled"}>Clear draft</button>
              <button type="button" class="ghost smallBtn" id="mapsPolyClearKind" ${list.length ? "" : "disabled"}>Clear kind</button>
              <div class="small muted" id="mapsPolyStatus" style="margin-left:auto;"></div>
            </div>
            <div class="mapsPolyGrid">
              <div class="mapsPolyList" id="mapsPolyList">${polyRows || `<div class="small muted" style="padding:10px;">No polygons yet.</div>`}</div>
              <div class="mapsPolyInspector" id="mapsPolyInspector">${inspectorBody}</div>
            </div>
          </div>
        </div>
      `;
    }

    function wirePolyModalHandlers() {
      const modal = document.getElementById("mapsPolyModal");
      if (!modal) return;

      const modalClose = document.getElementById("mapsPolyModalClose");
      if (modalClose) {
        modalClose.onclick = () => {
          editMode = false;
          draftPoly = [];
          polyDrag = null;
          vertexDrag = null;
          selectedPolyKind = "";
          selectedPolyIndex = -1;
          selectedVertexIndex = -1;
          renderMapView();
        };
      }

      const statusEl = document.getElementById("mapsPolyStatus");
      const setStatus = (txt) => {
        if (statusEl) statusEl.textContent = txt;
      };

      modal.onclick = (e) => {
        const k = e.target.closest?.("[data-polykind]");
        if (k) {
          if (k.hasAttribute("disabled")) return;
          const kind = String(k.getAttribute("data-polykind") || "");
          if (!kind) return;
          editKind = kind;
          const list = polysForKind(activeMap, editKind);
          if (!(selectedPolyKind === editKind && selectedPolyIndex >= 0 && selectedPolyIndex < list.length)) {
            selectedPolyKind = "";
            selectedPolyIndex = -1;
            selectedVertexIndex = -1;
          }
          renderMapView();
          return;
        }
        const t = e.target.closest?.("[data-polytool]");
        if (t) {
          const tool = String(t.getAttribute("data-polytool") || "");
          if (!tool) return;
          editTool = tool;
          renderMapView();
          return;
        }
      };

      const listEl = document.getElementById("mapsPolyList");
      if (listEl) {
        listEl.onclick = (e) => {
          const btn = e.target.closest?.("[data-polysel]");
          if (!btn) return;
          const idx = Number(btn.getAttribute("data-polysel") || -1);
          const list = polysForKind(activeMap, editKind);
          if (idx < 0 || idx >= list.length) return;
          selectedPolyKind = editKind;
          selectedPolyIndex = idx;
          selectedVertexIndex = -1;
          editTool = "select";
          renderMapView();
        };
      }

      const undoPt = document.getElementById("mapsPolyUndoPt");
      if (undoPt) {
        undoPt.onclick = () => {
          if (!draftPoly.length) return;
          draftPoly.pop();
          setStatus(`${draftPoly.length} pts (draft)`);
          renderMapView();
        };
      }
      const clearDraft = document.getElementById("mapsPolyClearDraft");
      if (clearDraft) {
        clearDraft.onclick = () => {
          draftPoly = [];
          setStatus("Draft cleared.");
          renderMapView();
        };
      }
      const closeDraft = document.getElementById("mapsPolyCloseDraft");
      if (closeDraft) {
        closeDraft.onclick = () => {
          const ok = commitDraftPoly();
          setStatus(ok ? "Polygon added." : editKind === "exit" ? "Exit needs a name + target map (if to map)." : "Need at least 3 points.");
          if (ok) editTool = "select";
          renderMapView();
        };
      }

      const clearKind = document.getElementById("mapsPolyClearKind");
      if (clearKind) {
        clearKind.onclick = () => {
          const list = polysForKind(activeMap, editKind);
          if (!list.length) return;
          const ok = window.confirm(`Clear all polygons in ${kindLabel(editKind)}? (Not saved yet)`);
          if (!ok) return;
          const target = polysForKind(activeMap, editKind, true);
          target.length = 0;
          selectedPolyKind = "";
          selectedPolyIndex = -1;
          selectedVertexIndex = -1;
          draftPoly = [];
          setStatus("Cleared kind (not saved).");
          renderMapView();
        };
      }

      const saveAll = document.getElementById("mapsPolySaveAll");
      if (saveAll) {
        saveAll.onclick = () => {
          if (!activeMap?.id) return;
          const collisions = Array.isArray(activeMap.collisions) ? activeMap.collisions : [];
          const masks = Array.isArray(activeMap.masks) ? activeMap.masks : [];
          const exits = Array.isArray(activeMap.exits) ? activeMap.exits : [];
          const hiddenMasks = Array.isArray(activeMap.hiddenMasks) ? activeMap.hiddenMasks : [];
          const occluders = Array.isArray(activeMap.occluders) ? activeMap.occluders : [];
          ctx.send("updateMap", { id: activeMap.id, collisions, masks, exits, hiddenMasks, occluders });
          setStatus("Saved.");
        };
      }

      const cycle = (delta) => {
        const list = polysForKind(activeMap, editKind);
        if (!list.length) return;
        const current = selectedPolyKind === editKind ? selectedPolyIndex : -1;
        const next = current < 0 ? 0 : (current + delta + list.length) % list.length;
        selectedPolyKind = editKind;
        selectedPolyIndex = next;
        selectedVertexIndex = -1;
        editTool = "select";
        renderMapView();
      };
      const prevBtn = document.getElementById("mapsPolyPrev");
      const nextBtn = document.getElementById("mapsPolyNext");
      if (prevBtn) prevBtn.onclick = () => cycle(-1);
      if (nextBtn) nextBtn.onclick = () => cycle(+1);

      const copyBtn = document.getElementById("mapsPolyCopy");
      if (copyBtn) {
        copyBtn.onclick = () => {
          const list = polysForKind(activeMap, editKind);
          const ok = selectedPolyKind === editKind && selectedPolyIndex >= 0 && selectedPolyIndex < list.length;
          if (!ok) return;
          const src = list[selectedPolyIndex];
          polyClipboard = { kind: editKind, poly: JSON.parse(JSON.stringify(src)) };
          setStatus("Copied.");
          renderMapView();
        };
      }
      const pasteBtn = document.getElementById("mapsPolyPaste");
      if (pasteBtn) {
        pasteBtn.onclick = () => {
          if (!polyClipboard || !polyClipboard.poly) return;
          const targetKind = editKind;
          const list = polysForKind(activeMap, targetKind, true);
          const copy = JSON.parse(JSON.stringify(polyClipboard.poly));
          const pts = Array.isArray(copy.points) ? copy.points : [];
          for (const p of pts) {
            p.x = Math.max(0, Math.min(1, Number(p.x || 0) + 0.02));
            p.y = Math.max(0, Math.min(1, Number(p.y || 0) + 0.02));
          }
          copy.points = pts;
          if (targetKind === "exit") {
            copy.name = String(copy.name || "Exit").trim().slice(0, 40);
          }
          list.push(copy);
          selectedPolyKind = targetKind;
          selectedPolyIndex = list.length - 1;
          selectedVertexIndex = -1;
          setStatus("Pasted.");
          renderMapView();
        };
      }

      const dupBtn = document.getElementById("mapsPolyDuplicate");
      if (dupBtn) {
        dupBtn.onclick = () => {
          const list = polysForKind(activeMap, editKind);
          const ok = selectedPolyKind === editKind && selectedPolyIndex >= 0 && selectedPolyIndex < list.length;
          if (!ok) return;
          polyClipboard = { kind: editKind, poly: JSON.parse(JSON.stringify(list[selectedPolyIndex])) };
          const paste = document.getElementById("mapsPolyPaste");
          if (paste) paste.click();
        };
      }

      const delBtn = document.getElementById("mapsPolyDelete");
      if (delBtn) {
        delBtn.onclick = () => {
          const list = polysForKind(activeMap, editKind);
          const ok = selectedPolyKind === editKind && selectedPolyIndex >= 0 && selectedPolyIndex < list.length;
          if (!ok) return;
          const label = editKind === "exit" ? String(list[selectedPolyIndex]?.name || `Exit ${selectedPolyIndex + 1}`) : `${kindLabel(editKind)} #${selectedPolyIndex + 1}`;
          const yes = window.confirm(`Delete "${label}"? (Not saved yet)`);
          if (!yes) return;
          list.splice(selectedPolyIndex, 1);
          selectedPolyKind = "";
          selectedPolyIndex = -1;
          selectedVertexIndex = -1;
          setStatus("Deleted (not saved).");
          renderMapView();
        };
      }

      // Exit meta fields (selected exit OR draft defaults)
      const exitNameEl = document.getElementById("mapsExitName");
      const exitBehaviorEl = document.getElementById("mapsExitBehavior");
      const exitToMapWrap = document.getElementById("mapsExitToMapWrap");
      const exitToMapEl = document.getElementById("mapsExitToMap");
      const exitTargetExitEl = document.getElementById("mapsExitTargetExit");

      const applyExitModel = (patch) => {
        if (editKind !== "exit") return;
        const list = polysForKind(activeMap, "exit", true);
        const isSel = selectedPolyKind === "exit" && selectedPolyIndex >= 0 && selectedPolyIndex < list.length;
        if (isSel) {
          list[selectedPolyIndex] = { ...list[selectedPolyIndex], ...patch };
        } else {
          if (Object.prototype.hasOwnProperty.call(patch, "name")) exitDraftName = String(patch.name || "");
          if (Object.prototype.hasOwnProperty.call(patch, "action")) exitAction = patch.action === "toMap" ? "toMap" : "toMaps";
          if (Object.prototype.hasOwnProperty.call(patch, "toMapId")) exitTargetMapId = String(patch.toMapId || "");
          if (Object.prototype.hasOwnProperty.call(patch, "targetExit")) exitTargetExitName = String(patch.targetExit || "");
        }
      };

      const syncExitVis = () => {
        const behavior = exitBehaviorEl ? String(exitBehaviorEl.value || "toMaps") : "toMaps";
        if (exitToMapWrap) exitToMapWrap.classList.toggle("hidden", behavior !== "toMap");
      };

      if (exitBehaviorEl) {
        exitBehaviorEl.onchange = () => {
          const behavior = String(exitBehaviorEl.value || "toMaps") === "toMap" ? "toMap" : "toMaps";
          applyExitModel({ action: behavior });
          syncExitVis();
          renderMapView();
        };
      }
      if (exitNameEl) {
        exitNameEl.oninput = () => {
          applyExitModel({ name: String(exitNameEl.value || "").slice(0, 40) });
        };
      }
      if (exitToMapEl) {
        if (!exitToMapEl.value && otherMaps.length) exitToMapEl.value = otherMaps[0];
        exitToMapEl.onchange = () => {
          applyExitModel({ toMapId: String(exitToMapEl.value || "").trim().toLowerCase() });
        };
      }
      if (exitTargetExitEl) {
        exitTargetExitEl.oninput = () => {
          applyExitModel({ targetExit: String(exitTargetExitEl.value || "").slice(0, 40) });
        };
      }
      syncExitVis();
    }

    function pointInPoly(pt, poly) {
      const x = pt.x;
      const y = pt.y;
      const pts = Array.isArray(poly?.points) ? poly.points : [];
      if (pts.length < 3) return false;
      let inside = false;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const xi = Number(pts[i].x);
        const yi = Number(pts[i].y);
        const xj = Number(pts[j].x);
        const yj = Number(pts[j].y);
        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-12) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    }

    function loadBackground(url) {
      bgImg = null;
      if (!url) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        bgImg = img;
      };
      img.src = url;
    }

    function stopLoop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      lastTick = 0;
    }

    function startLoop() {
      stopLoop();
      lastTick = performance.now();
      raf = requestAnimationFrame(tick);
    }

    function tick(ts) {
      raf = requestAnimationFrame(tick);
      const dt = Math.max(0, Math.min(0.05, (ts - lastTick) / 1000));
      lastTick = ts;
      if (mode !== "map" || !activeMap) return;

      // Smooth remote users to reduce jitter.
      for (const [name, u] of users.entries()) {
        if (!u) continue;
        if (name === (self || String(ctx.getUser() || "").trim().toLowerCase())) continue;
        if (typeof u.tx !== "number" || typeof u.ty !== "number") continue;
        if (typeof u.x !== "number" || typeof u.y !== "number") {
          u.x = u.tx;
          u.y = u.ty;
          continue;
        }
        const k = 1 - Math.exp(-dt * 14);
        u.x = u.x + (u.tx - u.x) * k;
        u.y = u.y + (u.ty - u.y) * k;
      }

      // Movement speed in world pixels/sec, converted to normalized units based on map size.
      const dims = getWorldDims();
      const speedPxPerSec = 220;
      const possessedToken = getPossessedTokenForMe();
      const controlPos = possessedToken
        ? { x: Math.max(0, Math.min(1, Number(possessedToken.x || 0.5))), y: Math.max(0, Math.min(1, Number(possessedToken.y || 0.5))) }
        : { x: localPos.x, y: localPos.y };
      let dx = 0;
      let dy = 0;
      if (!editMode) {
        if (keys.has("ArrowUp") || keys.has("KeyW")) dy -= 1;
        if (keys.has("ArrowDown") || keys.has("KeyS")) dy += 1;
        if (keys.has("ArrowLeft") || keys.has("KeyA")) dx -= 1;
        if (keys.has("ArrowRight") || keys.has("KeyD")) dx += 1;
      }
      if (selfInvisible && !possessedToken) {
        dx = 0;
        dy = 0;
      }
      const mag = Math.hypot(dx, dy) || 1;
      dx /= mag;
      dy /= mag;

      const moved = Boolean(dx || dy);
      if (moved) {
        const speedNx = speedPxPerSec / Math.max(1, dims.w);
        const speedNy = speedPxPerSec / Math.max(1, dims.h);
        const nextX = Math.max(0, Math.min(1, controlPos.x + dx * speedNx * dt));
        const nextY = Math.max(0, Math.min(1, controlPos.y + dy * speedNy * dt));
        const collisions = Array.isArray(activeMap.collisions) ? activeMap.collisions : [];
        const tryPtX = { x: nextX, y: controlPos.y };
        const tryPtY = { x: controlPos.x, y: nextY };
        const blockedX = collisions.some((p) => pointInPoly(tryPtX, p));
        const blockedY = collisions.some((p) => pointInPoly(tryPtY, p));
        const finalX = !blockedX ? nextX : controlPos.x;
        const finalY = !blockedY ? nextY : controlPos.y;
        if (possessedToken && activeMap?.ttrpgEnabled && canManageTtrpg) {
          const props = Array.isArray(activeMap.props) ? activeMap.props : [];
          const idx = props.findIndex((p) => String(p?.id || "") === String(possessedToken.id || ""));
          if (idx >= 0) {
            const current = props[idx];
            props[idx] = { ...current, x: finalX, y: finalY };
            activeMap.props = props;
            const now = Date.now();
            if (now - lastPropMoveAt > 60) {
              lastPropMoveAt = now;
              ctx.send("ttrpgPropMove", {
                mapId: activeMap.id,
                propId: current.id,
                x: finalX,
                y: finalY,
                z: current.z || 0,
                rot: current.rot || 0,
                scale: current.scale || 1
              });
            }
          }
        } else {
          localPos.x = finalX;
          localPos.y = finalY;
          const me = (self || String(ctx.getUser() || "")).trim().toLowerCase();
          if (me) {
            const prev = users.get(me) || { x: localPos.x, y: localPos.y, tx: localPos.x, ty: localPos.y, color: "", image: "" };
            users.set(me, { ...prev, x: localPos.x, y: localPos.y, tx: localPos.x, ty: localPos.y });
          }
          const now = Date.now();
          if (now - lastSentAt > 60) {
            lastSentAt = now;
            ctx.send("move", { x: localPos.x, y: localPos.y, seq: moveSeq++ });
          }
        }
      }

      if (!editMode) {
        const exitPos = possessedToken
          ? { x: Math.max(0, Math.min(1, Number(possessedToken.x || 0.5))), y: Math.max(0, Math.min(1, Number(possessedToken.y || 0.5))) }
          : localPos;
        checkExits(exitPos);
      }
      draw();
      cleanupBubbles();
    }

    function checkExits(position = localPos) {
      if (!activeMap) return;
      const exits = Array.isArray(activeMap.exits) ? activeMap.exits : [];
      if (!exits.length) return;
      const now = Date.now();
      if (now - lastExitAt < 900) return;
      let triggered = null;
      for (let i = 0; i < exits.length; i++) {
        const ex = exits[i];
        const inside = pointInPoly({ x: Number(position?.x || 0), y: Number(position?.y || 0) }, ex);
        const was = Boolean(exitInside.get(i));
        exitInside.set(i, inside);
        if (inside && !was) {
          triggered = ex;
          break;
        }
      }
      if (!triggered) return;
      lastExitAt = now;
      const action = String(triggered.action || "toMaps");
      if (action === "toMap") {
        const to = String(triggered.toMapId || "").trim().toLowerCase();
        const targetExit = String(triggered.targetExit || "").trim();
        if (to && to !== String(activeMap.id || "").trim().toLowerCase()) transitionToMap(to, targetExit);
        return;
      }
      leaveMap();
    }

    function transitionToMap(mapId, targetExitName = "") {
      // Leave current room on the server side, then join target.
      try {
        ctx.send("leave", {});
      } catch {
        // ignore
      }
      stopWalkie();
      stopAllWalkies();
      exitInside.clear();
      const to = String(mapId || "").trim().toLowerCase();
      pendingSpawn = targetExitName ? { mapId: to, exitName: String(targetExitName || "").trim().toLowerCase() } : null;
      enterMap(to);
    }

    function getWorldDims() {
      const w =
        activeMap?.world?.w && Number.isFinite(Number(activeMap.world.w))
          ? Number(activeMap.world.w)
          : bgImg && (bgImg.naturalWidth || bgImg.width)
            ? Number(bgImg.naturalWidth || bgImg.width)
            : 1400;
      const h =
        activeMap?.world?.h && Number.isFinite(Number(activeMap.world.h))
          ? Number(activeMap.world.h)
          : bgImg && (bgImg.naturalHeight || bgImg.height)
            ? Number(bgImg.naturalHeight || bgImg.height)
            : 900;
      return { w: Math.max(200, Math.min(10000, w)), h: Math.max(200, Math.min(10000, h)) };
    }

    function propScreenBox(prop, spriteById, tr) {
      const sprite = spriteById.get(String(prop?.spriteId || "")) || null;
      if (!sprite) return null;
      const img = getSpriteImage(sprite.url || "");
      if (!img) return null;
      const spriteScale = Math.max(0.1, Math.min(4.0, Number(sprite.scale || 1)));
      const instanceScale = Math.max(0.1, Math.min(4.0, Number(prop?.scale || 1)));
      const scale = spriteScale * instanceScale;
      const maxWorld = 220;
      const minWorld = 12;
      const iw = Math.max(1, Number(img.naturalWidth || img.width || 1));
      const ih = Math.max(1, Number(img.naturalHeight || img.height || 1));
      const wWorld = Math.max(minWorld, Math.min(maxWorld, iw * scale));
      const hWorld = Math.max(minWorld, Math.min(maxWorld, ih * scale));

      const xw = Number(prop?.x || 0) * tr.worldW;
      const yw = Number(prop?.y || 0) * tr.worldH;
      const cx = (xw - tr.srcX) * tr.zoom;
      const cy = (yw - tr.srcY) * tr.zoom;
      const w = wWorld * tr.zoom;
      const h = hWorld * tr.zoom;
      return { x: cx - w / 2, y: cy - h / 2, w, h, cx, cy, img, sprite };
    }

    function hitTestPropAtPointer(clientX, clientY, canvas, tr) {
      if (!activeMap?.ttrpgEnabled) return null;
      const props = Array.isArray(activeMap.props) ? activeMap.props : [];
      if (!props.length) return null;
      const sprites = Array.isArray(activeMap.sprites) ? activeMap.sprites : [];
      const spriteById = new Map(sprites.map((s) => [String(s.id || ""), s]));
      const rect = canvas.getBoundingClientRect();
      const sx = clientX - rect.left;
      const sy = clientY - rect.top;
      if (sx < 0 || sy < 0 || sx > rect.width || sy > rect.height) return null;

      // Check top-most first: sort by y then z.
      const sorted = props
        .slice()
        .sort((a, b) => {
          const ay = Number(a?.y || 0);
          const by = Number(b?.y || 0);
          if (ay !== by) return ay - by;
          return Number(a?.z || 0) - Number(b?.z || 0);
        });
      for (let i = sorted.length - 1; i >= 0; i--) {
        const p = sorted[i];
        const box = propScreenBox(p, spriteById, tr);
        if (!box) continue;
        if (sx >= box.x && sx <= box.x + box.w && sy >= box.y && sy <= box.y + box.h) {
          return { propId: String(p.id || ""), x: Number(p.x || 0), y: Number(p.y || 0) };
        }
      }
      return null;
    }

    function getPossessedTokenForMe() {
      if (!activeMap?.ttrpgEnabled) return null;
      const me = String(ctx.getUser() || "").trim().toLowerCase();
      if (!me) return null;
      const props = Array.isArray(activeMap.props) ? activeMap.props : [];
      if (!props.length) return null;
      const sprites = Array.isArray(activeMap.sprites) ? activeMap.sprites : [];
      const spriteById = new Map(sprites.map((s) => [String(s?.id || ""), s]));
      const isTokenControlledByMe = (prop) => {
        if (!prop) return false;
        if (String(prop.controlledBy || "").trim().toLowerCase() !== me) return false;
        const spr = spriteById.get(String(prop.spriteId || ""));
        return spr?.kind === "token";
      };
      if (speakingAsPropId) {
        const preferred = props.find((p) => String(p?.id || "") === String(speakingAsPropId || ""));
        if (isTokenControlledByMe(preferred)) return preferred;
      }
      const fallback = props.find((p) => isTokenControlledByMe(p));
      return fallback || null;
    }

    function cleanupBubbles() {
      const t = Date.now();
      let changed = false;
      for (const [u, b] of bubbles.entries()) {
        if (!b || Number(b.expiresAt || 0) <= t) {
          bubbles.delete(u);
          changed = true;
        }
      }
      if (changed && mode === "map") {
        // force redraw by leaving tick running
      }
    }

    function draw() {
      const canvas = document.getElementById("mapsCanvas");
      if (!canvas) return;
      const wrap = canvas.parentElement;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const g = canvas.getContext("2d");
      if (!g) return;
      g.clearRect(0, 0, w, h);

      // Camera + zoom.
      const zoom = Math.max(0.8, Math.min(5.0, Number(activeMap?.cameraZoom || 2.35) || 2.35));
      const me = (self || String(ctx.getUser() || "")).trim().toLowerCase();
      const possessedToken = getPossessedTokenForMe();
      const followTarget = editMode
        ? null
        : possessedToken
          ? { x: Number(possessedToken.x || 0.5), y: Number(possessedToken.y || 0.5) }
          : me && !selfInvisible
            ? { x: Number(localPos.x || 0.5), y: Number(localPos.y || 0.5) }
            : null;
      if (!cameraPos) {
        const seed = followTarget || { x: Number(localPos.x || 0.5), y: Number(localPos.y || 0.5) };
        cameraPos = { x: seed.x, y: seed.y };
      }
      if (followTarget) {
        const dist = Math.hypot(followTarget.x - cameraPos.x, followTarget.y - cameraPos.y);
        const lerp = dist > 0.25 ? 1 : 0.28;
        cameraPos.x = cameraPos.x + (followTarget.x - cameraPos.x) * lerp;
        cameraPos.y = cameraPos.y + (followTarget.y - cameraPos.y) * lerp;
      }
      const cam = cameraPos;

      const worldW = activeMap?.world?.w ? Number(activeMap.world.w) : bgImg ? bgImg.naturalWidth : 1400;
      const worldH = activeMap?.world?.h ? Number(activeMap.world.h) : bgImg ? bgImg.naturalHeight : 900;
      const viewW = w / zoom;
      const viewH = h / zoom;
      const cx = Math.max(viewW / 2, Math.min(worldW - viewW / 2, cam.x * worldW));
      const cy = Math.max(viewH / 2, Math.min(worldH - viewH / 2, cam.y * worldH));
      const srcX = Math.max(0, Math.min(worldW - viewW, cx - viewW / 2));
      const srcY = Math.max(0, Math.min(worldH - viewH, cy - viewH / 2));
      lastTransform = { srcX, srcY, zoom, worldW, worldH, viewW, viewH };

      // Background (cropped to camera view)
      if (bgImg) {
        g.globalAlpha = 0.92;
        g.drawImage(bgImg, srcX, srcY, viewW, viewH, 0, 0, w, h);
        g.globalAlpha = 1;
      } else {
        g.fillStyle = "rgba(0,0,0,0.25)";
        g.fillRect(0, 0, w, h);
      }

      // Props (TTRPG mode) — draw before players.
      const tr = { srcX, srcY, zoom, worldW, worldH };
      if (activeMap?.ttrpgEnabled) {
        const sprites = Array.isArray(activeMap.sprites) ? activeMap.sprites : [];
        const spriteById = new Map(sprites.map((s) => [String(s?.id || ""), s]));
        const props = Array.isArray(activeMap.props) ? activeMap.props : [];
        const sortedProps = props
          .slice()
          .sort((a, b) => {
            const ay = Number(a?.y || 0);
            const by = Number(b?.y || 0);
            if (ay !== by) return ay - by;
            return Number(a?.z || 0) - Number(b?.z || 0);
          });
        for (const p of sortedProps) {
          const box = propScreenBox(p, spriteById, tr);
          if (!box) continue;
          // Skip if far outside viewport for perf.
          if (box.x > w + 80 || box.y > h + 80 || box.x + box.w < -80 || box.y + box.h < -80) continue;
          const rotDeg = Number(p?.rot || 0);
          const rot = Number.isFinite(rotDeg) ? (rotDeg * Math.PI) / 180 : 0;
          g.save();
          g.globalAlpha = 0.98;
          g.imageSmoothingEnabled = true;
          g.shadowColor = "rgba(0,0,0,0.35)";
          g.shadowBlur = 10;
          g.shadowOffsetY = 6;
          g.translate(box.cx, box.cy);
          if (rot) g.rotate(rot);
          g.drawImage(box.img, -box.w / 2, -box.h / 2, box.w, box.h);
          g.restore();
        }
      }

      // Players (draw in world coords -> screen coords)
      for (const [username, u] of users.entries()) {
        if (!u) continue;
        const rx = typeof u.x === "number" ? u.x : Number(u.tx || 0);
        const ry = typeof u.y === "number" ? u.y : Number(u.ty || 0);
        const xw = Number(rx || 0) * worldW;
        const yw = Number(ry || 0) * worldH;
        const px = Math.floor((xw - srcX) * zoom);
        const py = Math.floor((yw - srcY) * zoom);

        const size = Math.max(18, Math.min(96, Math.floor(Number(activeMap?.avatarSize || 36))));
        const radius = Math.floor(size / 2);
        const color = typeof u.color === "string" && u.color ? u.color : "#ff3ea5";

        // Avatar circle
        const img = getAvatarImage(username, u.image || "");
        g.save();
        g.beginPath();
        g.arc(px, py, radius, 0, Math.PI * 2);
        g.closePath();
        g.clip();
        if (img) {
          g.drawImage(img, px - radius, py - radius, size, size);
        } else {
          g.fillStyle = color;
          g.beginPath();
          g.arc(px, py, radius, 0, Math.PI * 2);
          g.fill();
        }
        g.restore();
        g.strokeStyle = "rgba(255,255,255,0.28)";
        g.lineWidth = 2;
        g.beginPath();
        g.arc(px, py, radius, 0, Math.PI * 2);
        g.stroke();

        // Username in user's color, with contrast highlight (bigger + darker for readability)
        const nameText = `@${username}`;
        const nameColor = normalizeReadableColor(color);
        g.font = "700 15px system-ui, -apple-system, Segoe UI, sans-serif";
        g.textAlign = "center";
        const nm = g.measureText(nameText);
        const nameW = Math.ceil(nm.width) + 14;
        const nameH = 22;
        const nameX = px - nameW / 2;
        const nameY = py - (radius + 30);
        const bg = chooseHighlightBg(nameColor);
        g.fillStyle = bg;
        g.strokeStyle = "rgba(255,255,255,0.10)";
        roundRect(g, nameX, nameY, nameW, nameH, 10);
        g.fill();
        g.stroke();
        g.fillStyle = nameColor;
        g.shadowColor = "rgba(0,0,0,0.55)";
        g.shadowBlur = 6;
        g.shadowOffsetY = 2;
        g.fillText(nameText, px, nameY + 16);
        g.shadowBlur = 0;

        const b = bubbles.get(`user:${username}`);
        if (b && b.text) {
          const text = String(b.text);
          const pad = 7;
          g.font = "14px system-ui, -apple-system, Segoe UI, sans-serif";
          const tw = Math.min(w - 20, Math.ceil(g.measureText(text).width) + pad * 2);
          const th = 26;
          const bx = Math.max(10, Math.min(w - 10 - tw, px - tw / 2));
          const by = Math.max(10, py - (radius + 64));
          g.fillStyle = "rgba(10,9,14,0.88)";
          g.strokeStyle = "rgba(246,240,255,0.14)";
          roundRect(g, bx, by, tw, th, 12);
          g.fill();
          g.stroke();
          g.fillStyle = "rgba(246,240,255,0.92)";
          g.shadowColor = "rgba(0,0,0,0.55)";
          g.shadowBlur = 6;
          g.shadowOffsetY = 2;
          g.fillText(text, bx + tw / 2, by + 18);
          g.shadowBlur = 0;
        }
      }

      // Token chat bubbles
      if (activeMap?.ttrpgEnabled) {
        const sprites = Array.isArray(activeMap.sprites) ? activeMap.sprites : [];
        const spriteById = new Map(sprites.map((s) => [String(s?.id || ""), s]));
        const props = Array.isArray(activeMap.props) ? activeMap.props : [];
        for (const [key, b] of bubbles.entries()) {
          if (!b || b.actorType !== "token") continue;
          const propId = String(b.actorPropId || "");
          if (!propId || key !== `token:${propId}`) continue;
          const prop = props.find((p) => String(p?.id || "") === propId);
          if (!prop) continue;
          const box = propScreenBox(prop, spriteById, { srcX, srcY, zoom, worldW, worldH });
          if (!box) continue;
          const text = String(b.text || "").trim();
          if (!text) continue;
          const pad = 7;
          g.font = "14px system-ui, -apple-system, Segoe UI, sans-serif";
          const tw = Math.min(w - 20, Math.ceil(g.measureText(text).width) + pad * 2);
          const th = 26;
          const bx = Math.max(10, Math.min(w - 10 - tw, box.cx - tw / 2));
          const by = Math.max(10, box.y - 34);
          g.fillStyle = "rgba(10,9,14,0.88)";
          g.strokeStyle = "rgba(246,240,255,0.14)";
          roundRect(g, bx, by, tw, th, 12);
          g.fill();
          g.stroke();
          g.fillStyle = "rgba(246,240,255,0.92)";
          g.shadowColor = "rgba(0,0,0,0.55)";
          g.shadowBlur = 6;
          g.shadowOffsetY = 2;
          g.fillText(text, bx + tw / 2, by + 18);
          g.shadowBlur = 0;
        }
      }

      // Y-sort masks: redraw background clipped to polygon on top of entities when they're "behind".
      const masks = Array.isArray(activeMap.masks) ? activeMap.masks : [];
      if (bgImg && masks.length) {
        for (const poly of masks) {
          const pts = Array.isArray(poly?.points) ? poly.points : [];
          if (pts.length < 3) continue;
          const sortY = Math.max(...pts.map((p) => Number(p?.y || 0)));
          let needs = false;
          for (const [, u] of users.entries()) {
            if (!u) continue;
            const ux = typeof u.x === "number" ? u.x : Number(u.tx || 0);
            const uy = typeof u.y === "number" ? u.y : Number(u.ty || 0);
            if (uy >= sortY) continue; // in front
            if (!pointInPoly({ x: ux, y: uy }, poly)) continue;
            needs = true;
            break;
          }
          if (!needs && activeMap?.ttrpgEnabled) {
            const props = Array.isArray(activeMap.props) ? activeMap.props : [];
            for (const p of props) {
              if (!p) continue;
              const px = Number(p.x || 0);
              const py = Number(p.y || 0);
              if (py >= sortY) continue;
              if (!pointInPoly({ x: px, y: py }, poly)) continue;
              needs = true;
              break;
            }
          }
          if (!needs) continue;
          g.save();
          g.beginPath();
          const first = pts[0];
          g.moveTo(((Number(first.x) * worldW - srcX) * zoom) | 0, ((Number(first.y) * worldH - srcY) * zoom) | 0);
          for (let i = 1; i < pts.length; i++) {
            const p = pts[i];
            g.lineTo(((Number(p.x) * worldW - srcX) * zoom) | 0, ((Number(p.y) * worldH - srcY) * zoom) | 0);
          }
          g.closePath();
          g.clip();
          g.globalAlpha = 0.92;
          g.drawImage(bgImg, srcX, srcY, viewW, viewH, 0, 0, w, h);
          g.restore();
        }
      }

      // Edit overlays
      if (editMode) {
        drawPolysOverlay(g, activeMap, worldW, worldH, srcX, srcY, zoom);
      }
    }

    function drawPolysOverlay(g, map, worldW, worldH, srcX, srcY, zoom) {
      const selected =
        selectedPolyKind && selectedPolyKind === editKind
          ? (() => {
              const list = polysForKind(map, editKind);
              return selectedPolyIndex >= 0 && selectedPolyIndex < list.length ? list[selectedPolyIndex] : null;
            })()
          : null;

      const drawPoly = (poly, stroke, fill, showPoints, emphasized) => {
        const pts = Array.isArray(poly?.points) ? poly.points : [];
        if (pts.length < 2) return;
        g.save();
        g.beginPath();
        g.moveTo((Number(pts[0].x) * worldW - srcX) * zoom, (Number(pts[0].y) * worldH - srcY) * zoom);
        for (let i = 1; i < pts.length; i++) {
          g.lineTo((Number(pts[i].x) * worldW - srcX) * zoom, (Number(pts[i].y) * worldH - srcY) * zoom);
        }
        g.closePath();
        g.fillStyle = fill;
        g.strokeStyle = stroke;
        g.lineWidth = emphasized ? 3.5 : 2;
        if (emphasized) {
          g.shadowColor = "rgba(0,0,0,0.45)";
          g.shadowBlur = 12;
        }
        g.fill();
        g.stroke();
        if (showPoints) {
          g.fillStyle = stroke;
          for (let i = 0; i < pts.length; i++) {
            const p = pts[i];
            const x = (Number(p.x) * worldW - srcX) * zoom;
            const y = (Number(p.y) * worldH - srcY) * zoom;
            g.beginPath();
            const r = emphasized && selectedVertexIndex === i ? 7.0 : emphasized ? 5.2 : 3.2;
            g.arc(x, y, r, 0, Math.PI * 2);
            g.fill();
            if (emphasized) {
              g.strokeStyle = "rgba(0,0,0,0.35)";
              g.lineWidth = 1;
              g.stroke();
            }
          }
        }
        g.restore();
      };

      const collisions = Array.isArray(map.collisions) ? map.collisions : [];
      const masks = Array.isArray(map.masks) ? map.masks : [];
      for (const p of collisions) drawPoly(p, "rgba(255,70,70,0.82)", "rgba(255,70,70,0.10)", false, selected === p);
      for (const p of masks) drawPoly(p, "rgba(80,195,255,0.82)", "rgba(80,195,255,0.08)", false, selected === p);
      const exits = Array.isArray(map.exits) ? map.exits : [];
      for (const p of exits) drawPoly(p, "rgba(255,215,90,0.90)", "rgba(255,215,90,0.10)", false, selected === p);
      const hidden = Array.isArray(map.hiddenMasks) ? map.hiddenMasks : [];
      const occ = Array.isArray(map.occluders) ? map.occluders : [];
      for (const p of hidden) drawPoly(p, "rgba(180,120,255,0.80)", "rgba(180,120,255,0.08)", false, selected === p);
      for (const p of occ) drawPoly(p, "rgba(120,255,180,0.80)", "rgba(120,255,180,0.08)", false, selected === p);

      if (selected) {
        const stroke =
          editKind === "collision"
            ? "rgba(255,70,70,0.98)"
            : editKind === "mask"
              ? "rgba(80,195,255,0.98)"
              : editKind === "exit"
                ? "rgba(255,215,90,0.98)"
                : editKind === "hidden"
                  ? "rgba(180,120,255,0.98)"
                  : "rgba(120,255,180,0.98)";
        const fill =
          editKind === "collision"
            ? "rgba(255,70,70,0.16)"
            : editKind === "mask"
              ? "rgba(80,195,255,0.14)"
              : editKind === "exit"
                ? "rgba(255,215,90,0.14)"
                : editKind === "hidden"
                  ? "rgba(180,120,255,0.12)"
                  : "rgba(120,255,180,0.12)";
        drawPoly(selected, stroke, fill, true, true);
      }

      if (draftPoly && draftPoly.length) {
        const poly = { points: draftPoly };
        const stroke =
          editKind === "collision"
            ? "rgba(255,70,70,0.95)"
            : editKind === "mask"
              ? "rgba(80,195,255,0.95)"
              : editKind === "exit"
                ? "rgba(255,215,90,0.98)"
                : editKind === "hidden"
                  ? "rgba(180,120,255,0.98)"
                  : "rgba(120,255,180,0.98)";
        const fill =
          editKind === "collision"
            ? "rgba(255,70,70,0.10)"
            : editKind === "mask"
              ? "rgba(80,195,255,0.10)"
              : editKind === "exit"
                ? "rgba(255,215,90,0.10)"
                : editKind === "hidden"
                  ? "rgba(180,120,255,0.10)"
                  : "rgba(120,255,180,0.10)";
        drawPoly(poly, stroke, fill, true, false);
      }
    }

    function parseHexColor(hex) {
      const s = String(hex || "").trim();
      const m = s.match(/^#([0-9a-f]{6})$/i);
      if (!m) return null;
      const n = parseInt(m[1], 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }

    function relLuma(rgb) {
      // sRGB relative luminance
      const srgb = [rgb.r, rgb.g, rgb.b].map((v) => v / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    }

    function mix(a, b, t) {
      return Math.round(a + (b - a) * t);
    }

    function normalizeReadableColor(hex) {
      const rgb = parseHexColor(hex);
      if (!rgb) return "#ff3ea5";
      const l = relLuma(rgb);
      if (l > 0.25) return hex;
      // brighten toward white a bit
      const t = (0.25 - l) * 1.15;
      const r = mix(rgb.r, 255, Math.min(0.65, Math.max(0.15, t)));
      const g = mix(rgb.g, 255, Math.min(0.65, Math.max(0.15, t)));
      const b = mix(rgb.b, 255, Math.min(0.65, Math.max(0.15, t)));
      return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
    }

    function chooseHighlightBg(textHex) {
      // Always use a darker background for legibility on busy maps.
      // (We still tint the text itself via normalizeReadableColor().)
      const rgb = parseHexColor(textHex);
      if (!rgb) return "rgba(10,9,14,0.80)";
      return "rgba(10,9,14,0.80)";
    }

    function getAvatarImage(username, url) {
      const u = String(username || "").toLowerCase();
      if (!u) return null;
      const src = String(url || "").trim();
      if (!src) return null;
      const now = Date.now();
      const cached = avatarCache.get(u);
      if (cached && cached.src === src) {
        if (cached.status === "ok" && cached.img) return cached.img;
        if (cached.status === "loading") return null;
        if (cached.status === "error" && now - Number(cached.failedAt || 0) < 5000) return null;
      }
      const img = new Image();
      if (!src.startsWith("data:")) img.crossOrigin = "anonymous";
      avatarCache.set(u, { src, img: null, status: "loading", failedAt: 0 });
      img.onload = () => avatarCache.set(u, { src, img, status: "ok", failedAt: 0 });
      img.onerror = () => avatarCache.set(u, { src, img: null, status: "error", failedAt: Date.now() });
      img.src = src;
      return null;
    }

    function roundRect(g, x, y, w, h, r) {
      const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
      g.beginPath();
      g.moveTo(x + rr, y);
      g.arcTo(x + w, y, x + w, y + h, rr);
      g.arcTo(x + w, y + h, x, y + h, rr);
      g.arcTo(x, y + h, x, y, rr);
      g.arcTo(x, y, x + w, y, rr);
      g.closePath();
    }

    function escapeHtml(s) {
      return String(s || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function enterMap(mapId) {
      mode = "map";
      users.clear();
      bubbles.clear();
      editMode = false;
      draftPoly = [];
      polyDrag = null;
      vertexDrag = null;
      selectedPolyKind = "";
      selectedPolyIndex = -1;
      selectedVertexIndex = -1;
      selfInvisible = false;
      speakingAsPropId = "";
      ttrpgDockCollapsed = readDockCollapsed(mapId);
      ttrpgTool = "select";
      cameraPos = null;
      // Seed a known-good local position (will be replaced once we get roomState).
      localPos = { x: 0.5, y: 0.5 };
      exitInside.clear();
      activeMap =
        maps.find((m) => m.id === mapId) || {
          id: mapId,
          title: mapId,
          owner: "",
          backgroundUrl: "",
          thumbUrl: "",
          userCount: 0,
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
        };
      selectedPropId = "";
      renderMapView();
      ctx.send("join", { mapId });
    }

    function leaveMap() {
      ctx.send("leave", {});
      mode = "maps";
      activeMap = null;
      speakingAsPropId = "";
      if (appRoot) appRoot.classList.remove("mapsRoom");
      if (chatPanel) chatPanel.classList.remove("hidden");
      if (chatResizeHandle) chatResizeHandle.classList.remove("hidden");
      stopWalkie();
      stopAllWalkies();
      users.clear();
      bubbles.clear();
      keys.clear();
      stopLoop();
      renderMapsList();
    }

    mapsBtn.addEventListener("click", () => {
      if (mode === "hives") enterMaps();
      else exitMapsToHives();
    });

    mapsPanel.addEventListener("click", (e) => {
      const enter = e.target.closest("[data-mapenter]");
      if (enter) {
        const id = String(enter.getAttribute("data-mapenter") || "");
        if (id) enterMap(id);
        return;
      }
      const del = e.target.closest("[data-mapdelete]");
      if (del) {
        const id = String(del.getAttribute("data-mapdelete") || "");
        if (!id) return;
        const ok = window.confirm(`Delete map "${id}"? This cannot be undone.`);
        if (!ok) return;
        ctx.send("deleteMap", { id });
        return;
      }
      const back = e.target.closest("[data-mapback]");
      if (back) {
        leaveMap();
        return;
      }
    });

    function setChatOverlayOpen(open) {
      const overlay = document.getElementById("mapsChatOverlay");
      const input = document.getElementById("mapsChatInput");
      const send = document.getElementById("mapsChatSend");
      const walkieBar = document.getElementById("mapsWalkieBar");
      if (!overlay || !input || !send) return;
      overlay.classList.toggle("hidden", !open);
      if (walkieBar) walkieBar.classList.toggle("hidden", Boolean(open) || !Boolean(activeMap?.walkiesEnabled));
      if (open) {
        input.value = "";
        input.focus();
      } else {
        input.blur();
      }
      send.onclick = () => {
        const text = String(input.value || "").trim();
        if (!text) return;
        const me = String(ctx.getUser() || "").trim().toLowerCase();
        const actorPropId = speakingAsPropId ? String(speakingAsPropId) : "";
        if (actorPropId) bubbles.set(`token:${actorPropId}`, { text: text.slice(0, 120), actorType: "token", actorPropId, expiresAt: Date.now() + 4000 });
        else if (me) bubbles.set(`user:${me}`, { text: text.slice(0, 120), actorType: "user", username: me, expiresAt: Date.now() + 4000 });
        ctx.send("say", { text, actorPropId });
        setChatOverlayOpen(false);
      };
      input.onkeydown = (ev) => {
        if (ev.key === "Escape") {
          ev.preventDefault();
          setChatOverlayOpen(false);
        }
        if (ev.key === "Enter") {
          ev.preventDefault();
          const text = String(input.value || "").trim();
          if (!text) return;
          const me = String(ctx.getUser() || "").trim().toLowerCase();
          const actorPropId = speakingAsPropId ? String(speakingAsPropId) : "";
          if (actorPropId) bubbles.set(`token:${actorPropId}`, { text: text.slice(0, 120), actorType: "token", actorPropId, expiresAt: Date.now() + 4000 });
          else if (me) bubbles.set(`user:${me}`, { text: text.slice(0, 120), actorType: "user", username: me, expiresAt: Date.now() + 4000 });
          ctx.send("say", { text, actorPropId });
          setChatOverlayOpen(false);
        }
      };
    }

    window.addEventListener("keydown", (e) => {
      if (mode !== "map") return;
      // This is a user gesture; try to unlock audio playback early.
      ensureAudioReady();
      const overlay = document.getElementById("mapsChatOverlay");
      const overlayOpen = overlay && !overlay.classList.contains("hidden");
      if (editMode) {
        if (e.key === "Escape") {
          draftPoly = [];
          polyDrag = null;
          vertexDrag = null;
          const se = document.getElementById("mapsPolyStatus");
          if (se) se.textContent = "Draft cleared.";
          renderMapView();
          return;
        }
        if (e.key === "Delete" || e.key === "Backspace") {
          const list = polysForKind(activeMap, editKind);
          const ok = selectedPolyKind === editKind && selectedPolyIndex >= 0 && selectedPolyIndex < list.length;
          if (!ok) return;
          e.preventDefault();
          list.splice(selectedPolyIndex, 1);
          selectedPolyKind = "";
          selectedPolyIndex = -1;
          selectedVertexIndex = -1;
          renderMapView();
          return;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) {
          const list = polysForKind(activeMap, editKind);
          const ok = selectedPolyKind === editKind && selectedPolyIndex >= 0 && selectedPolyIndex < list.length;
          if (!ok) return;
          e.preventDefault();
          polyClipboard = { kind: editKind, poly: JSON.parse(JSON.stringify(list[selectedPolyIndex])) };
          renderMapView();
          return;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === "v" || e.key === "V")) {
          if (!polyClipboard || !polyClipboard.poly) return;
          e.preventDefault();
          const list = polysForKind(activeMap, editKind, true);
          const copy = JSON.parse(JSON.stringify(polyClipboard.poly));
          const pts = Array.isArray(copy.points) ? copy.points : [];
          for (const p of pts) {
            p.x = Math.max(0, Math.min(1, Number(p.x || 0) + 0.02));
            p.y = Math.max(0, Math.min(1, Number(p.y || 0) + 0.02));
          }
          copy.points = pts;
          list.push(copy);
          selectedPolyKind = editKind;
          selectedPolyIndex = list.length - 1;
          selectedVertexIndex = -1;
          renderMapView();
          return;
        }
        // Don't move / chat while editing.
        return;
      }
      if (activeMap?.walkiesEnabled && !overlayOpen && !editMode && e.code === "Backquote") {
        e.preventDefault();
        startWalkie().catch((err) => ctx.toast("Walkie", String(err?.message || err)));
        const btn = document.getElementById("mapsWalkieBtn");
        if (btn) btn.textContent = "Recording…";
        return;
      }
      if (e.code === "KeyT" && !overlayOpen) {
        e.preventDefault();
        setChatOverlayOpen(true);
        return;
      }
      if (!overlayOpen && !editMode && activeMap?.ttrpgEnabled && canManageTtrpg) {
        if (e.code === "KeyV") {
          e.preventDefault();
          ttrpgTool = "select";
          renderMapView();
          return;
        }
        if (e.code === "KeyP") {
          e.preventDefault();
          ttrpgTool = "place";
          renderMapView();
          return;
        }
        if (e.code === "Space") {
          e.preventDefault();
          ttrpgTool = "pan";
          renderMapView();
          return;
        }
      }
      if (!overlayOpen && !editMode && activeMap?.ttrpgEnabled && canManageTtrpg && (e.code === "KeyQ" || e.code === "KeyE")) {
        e.preventDefault();
        const step = e.shiftKey ? 45 : 15;
        const dir = e.code === "KeyQ" ? -1 : 1;
        const wrapRot = (deg) => {
          let d = Number(deg || 0);
          if (!Number.isFinite(d)) d = 0;
          while (d > 180) d -= 360;
          while (d < -180) d += 360;
          return d;
        };
        const props = Array.isArray(activeMap?.props) ? activeMap.props : [];
        const pidx = selectedPropId ? props.findIndex((p) => String(p?.id || "") === selectedPropId) : -1;
        if (pidx >= 0) {
          const p = props[pidx];
          const nextRot = wrapRot(Number(p?.rot || 0) + step * dir);
          props[pidx] = { ...p, rot: nextRot };
          activeMap.props = props;
          ctx.send("ttrpgPropMove", { mapId: activeMap.id, propId: selectedPropId, x: p.x, y: p.y, z: p.z || 0, rot: nextRot, scale: p.scale || 1 });
          return;
        }
        if (selectedSpriteId) {
          placeRot = wrapRot(placeRot + step * dir);
          renderTtrpgDock();
          return;
        }
      }
      if (!overlayOpen && !editMode && activeMap?.ttrpgEnabled && canManageTtrpg && (e.code === "KeyZ" || e.code === "KeyX")) {
        e.preventDefault();
        const delta = e.shiftKey ? 0.2 : 0.1;
        const dir = e.code === "KeyZ" ? -1 : 1;
        const props = Array.isArray(activeMap?.props) ? activeMap.props : [];
        const pidx = selectedPropId ? props.findIndex((p) => String(p?.id || "") === selectedPropId) : -1;
        if (pidx >= 0) {
          const p = props[pidx];
          const nextScale = Math.max(0.1, Math.min(4.0, Number(p?.scale || 1) + delta * dir));
          props[pidx] = { ...p, scale: nextScale };
          activeMap.props = props;
          ctx.send("ttrpgPropMove", { mapId: activeMap.id, propId: selectedPropId, x: p.x, y: p.y, z: p.z || 0, rot: p.rot || 0, scale: nextScale });
          renderTtrpgDock();
          return;
        }
        if (selectedSpriteId) {
          placeScale = Math.max(0.1, Math.min(4.0, Number(placeScale || 1) + delta * dir));
          renderTtrpgDock();
          return;
        }
      }
      if (overlayOpen) return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
        keys.add(e.code);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (mode !== "map") return;
      keys.delete(e.code);
      if (activeMap?.ttrpgEnabled && canManageTtrpg && e.code === "Space" && ttrpgTool === "pan") {
        ttrpgTool = "select";
        renderMapView();
      }
      if (activeMap?.walkiesEnabled && e.code === "Backquote") {
        stopWalkie();
        const btn = document.getElementById("mapsWalkieBtn");
        if (btn) btn.textContent = "Hold to talk";
      }
    });

    ws.addEventListener("message", (evt) => {
      let msg;
      try {
        msg = JSON.parse(evt.data);
      } catch {
        return;
      }
      if (!msg || typeof msg !== "object") return;
      const type = String(msg.type || "");

      if (type === "plugin:maps:mapsList") {
        maps = Array.isArray(msg.maps) ? msg.maps : [];
        if (mode === "maps") renderMapsList();
        return;
      }

      if (type === "plugin:maps:joinOk") {
        self = String(ctx.getUser() || "").trim().toLowerCase();
        selfInvisible = Boolean(msg.selfInvisible);
        if (msg.map && typeof msg.map === "object") {
          activeMap = {
            id: String(msg.map.id || "").trim().toLowerCase(),
            title: String(msg.map.title || "").trim(),
            owner: String(msg.map.owner || "").trim().toLowerCase(),
            backgroundUrl: String(msg.map.backgroundUrl || "").trim(),
            world: msg.map.world || null,
            avatarSize: Number(msg.map.avatarSize || 36) || 36,
            cameraZoom: Number(msg.map.cameraZoom || 2.35) || 2.35,
            collisions: Array.isArray(msg.map.collisions) ? msg.map.collisions : [],
            masks: Array.isArray(msg.map.masks) ? msg.map.masks : [],
            exits: Array.isArray(msg.map.exits) ? msg.map.exits : [],
            hiddenMasks: Array.isArray(msg.map.hiddenMasks) ? msg.map.hiddenMasks : [],
            occluders: Array.isArray(msg.map.occluders) ? msg.map.occluders : [],
            ttrpgEnabled: Boolean(msg.map.ttrpgEnabled),
            sprites: Array.isArray(msg.map.sprites) ? msg.map.sprites : [],
            props: Array.isArray(msg.map.props) ? msg.map.props : [],
            walkiesEnabled: Boolean(msg.map.walkiesEnabled)
          };
          ttrpgDockCollapsed = readDockCollapsed(activeMap.id);
          if (pendingSpawn && pendingSpawn.mapId === activeMap.id && pendingSpawn.exitName) {
            const exits = Array.isArray(activeMap.exits) ? activeMap.exits : [];
            const want = String(pendingSpawn.exitName || "").trim().toLowerCase();
            const target = exits.find((ex) => String(ex?.name || "").trim().toLowerCase() === want);
            if (target && Array.isArray(target.points) && target.points.length) {
              const c = polyCentroid(target.points);
              localPos = { x: c.x, y: c.y };
              lastExitAt = Date.now();
              try {
                ctx.send("move", { x: c.x, y: c.y, seq: moveSeq++ });
              } catch {
                // ignore
              }
            }
            pendingSpawn = null;
          }
          renderMapView();
        }
        return;
      }

      if (type === "plugin:maps:mapPatched") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        const patch = msg.patch && typeof msg.patch === "object" ? msg.patch : null;
        if (!patch) return;
        if (Object.prototype.hasOwnProperty.call(patch, "avatarSize")) activeMap.avatarSize = Number(patch.avatarSize || 36) || 36;
        if (Object.prototype.hasOwnProperty.call(patch, "cameraZoom")) activeMap.cameraZoom = Number(patch.cameraZoom || 2.35) || 2.35;
        if (Object.prototype.hasOwnProperty.call(patch, "walkiesEnabled")) activeMap.walkiesEnabled = Boolean(patch.walkiesEnabled);
        if (Object.prototype.hasOwnProperty.call(patch, "collisions")) activeMap.collisions = Array.isArray(patch.collisions) ? patch.collisions : [];
        if (Object.prototype.hasOwnProperty.call(patch, "masks")) activeMap.masks = Array.isArray(patch.masks) ? patch.masks : [];
        if (Object.prototype.hasOwnProperty.call(patch, "exits")) activeMap.exits = Array.isArray(patch.exits) ? patch.exits : [];
        if (Object.prototype.hasOwnProperty.call(patch, "hiddenMasks")) activeMap.hiddenMasks = Array.isArray(patch.hiddenMasks) ? patch.hiddenMasks : [];
        if (Object.prototype.hasOwnProperty.call(patch, "occluders")) activeMap.occluders = Array.isArray(patch.occluders) ? patch.occluders : [];
        renderMapView();
        return;
      }

      if (type === "plugin:maps:selfInvisible") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        selfInvisible = Boolean(msg.invisible);
        renderMapView();
        return;
      }

      if (type === "plugin:maps:roomState") {
        if (mode !== "map") return;
        const list = Array.isArray(msg.users) ? msg.users : [];
        const next = new Map();
        for (const raw of list) {
          const name = String(raw?.username || "").toLowerCase();
          if (!name) continue;
          const tx = Number(raw?.x || 0);
          const ty = Number(raw?.y || 0);
          const prev = users.get(name) || { x: tx, y: ty, tx, ty, color: "", image: "" };
          prev.tx = tx;
          prev.ty = ty;
          // Initialize render position on first sight.
          if (typeof prev.x !== "number" || typeof prev.y !== "number") {
            prev.x = tx;
            prev.y = ty;
          }
          prev.color = raw?.color || prev.color || "";
          prev.image = raw?.image || prev.image || "";
          next.set(name, prev);
        }
        users = next;
        const me = (self || String(ctx.getUser() || "")).trim().toLowerCase();
        const mine = me ? users.get(me) : null;
        if (mine) {
          // Keep local prediction, but if we're brand new, seed from server once.
          if (!Number.isFinite(localPos?.x) || !Number.isFinite(localPos?.y)) localPos = { x: Number(mine.tx || 0.5), y: Number(mine.ty || 0.5) };
        }
        renderMapView();
        return;
      }

      if (type === "plugin:maps:userMoved") {
        if (mode !== "map") return;
        const username = String(msg.username || "").toLowerCase();
        if (!username) return;
        const me = (self || String(ctx.getUser() || "")).trim().toLowerCase();
        // Ignore self movement echoes to avoid jitter/snapback.
        if (me && username === me) return;
        const tx = Number(msg.x || 0);
        const ty = Number(msg.y || 0);
        const prev = users.get(username) || { x: tx, y: ty, tx, ty, color: "", image: "" };
        prev.tx = tx;
        prev.ty = ty;
        if (typeof prev.x !== "number" || typeof prev.y !== "number") {
          prev.x = tx;
          prev.y = ty;
        }
        users.set(username, prev);
        return;
      }

      if (type === "plugin:maps:bubble") {
        if (mode !== "map") return;
        const username = String(msg.username || "").toLowerCase();
        const actorType = String(msg.actorType || "user");
        const actorPropId = String(msg.actorPropId || "");
        const text = String(msg.text || "").trim();
        if (!username || !text) return;
        const bubbleKey = actorType === "token" && actorPropId ? `token:${actorPropId}` : `user:${username}`;
        bubbles.set(bubbleKey, {
          text: text.slice(0, 120),
          actorType: actorType === "token" ? "token" : "user",
          actorPropId,
          username,
          displayName: String(msg.displayName || ""),
          color: String(msg.color || ""),
          expiresAt: Date.now() + 4000
        });
        return;
      }

      if (type === "plugin:maps:walkie") {
        if (mode !== "map") return;
        playWalkie(msg);
        return;
      }

      if (type === "plugin:maps:ttrpgEnabled") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        activeMap.ttrpgEnabled = Boolean(msg.enabled);
        if (!activeMap.ttrpgEnabled) {
          selectedSpriteId = "";
        }
        renderMapView();
        return;
      }

      if (type === "plugin:maps:spriteAdded") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        const sprite = msg.sprite && typeof msg.sprite === "object" ? msg.sprite : null;
        if (!sprite || !sprite.id) return;
        if (!Array.isArray(activeMap.sprites)) activeMap.sprites = [];
        activeMap.sprites = [...activeMap.sprites.filter((s) => String(s?.id || "") !== String(sprite.id)), sprite];
        if (canManageTtrpg && !selectedSpriteId) {
          const k = spriteKind === "token" ? "token" : "prop";
          if ((sprite.kind || "prop") === k) selectedSpriteId = String(sprite.id);
        }
        renderTtrpgDock();
        return;
      }

      if (type === "plugin:maps:spriteRemoved") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        const spriteId = String(msg.spriteId || "");
        if (!spriteId) return;
        activeMap.sprites = (Array.isArray(activeMap.sprites) ? activeMap.sprites : []).filter((s) => String(s?.id || "") !== spriteId);
        activeMap.props = (Array.isArray(activeMap.props) ? activeMap.props : []).filter((p) => String(p?.spriteId || "") !== spriteId);
        if (selectedSpriteId === spriteId) selectedSpriteId = "";
        selectedPropId = "";
        renderTtrpgDock();
        return;
      }

      if (type === "plugin:maps:propsReset") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        activeMap.props = Array.isArray(msg.props) ? msg.props : [];
        if (speakingAsPropId && !activeMap.props.some((p) => String(p?.id || "") === String(speakingAsPropId))) speakingAsPropId = "";
        selectedPropId = "";
        renderTtrpgDock();
        return;
      }

      if (type === "plugin:maps:propAdded") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        const prop = msg.prop && typeof msg.prop === "object" ? msg.prop : null;
        if (!prop || !prop.id) return;
        if (!Array.isArray(activeMap.props)) activeMap.props = [];
        activeMap.props = [...activeMap.props.filter((p) => String(p?.id || "") !== String(prop.id)), prop];
        renderTtrpgDock();
        return;
      }

      if (type === "plugin:maps:propMoved") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        const propId = String(msg.propId || "");
        if (!propId) return;
        const props = Array.isArray(activeMap.props) ? activeMap.props : [];
        const idx = props.findIndex((p) => String(p?.id || "") === propId);
        if (idx < 0) return;
        props[idx] = {
          ...props[idx],
          x: Number(msg.x || 0),
          y: Number(msg.y || 0),
          z: Number(msg.z || props[idx]?.z || 0),
          rot: Object.prototype.hasOwnProperty.call(msg || {}, "rot") ? Number(msg.rot || 0) : Number(props[idx]?.rot || 0),
          scale: Object.prototype.hasOwnProperty.call(msg || {}, "scale") ? Number(msg.scale || 1) : Number(props[idx]?.scale || 1)
        };
        activeMap.props = props;
        if (selectedPropId === propId) renderTtrpgDock();
        return;
      }

      if (type === "plugin:maps:propRemoved") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        const propId = String(msg.propId || "");
        if (!propId) return;
        activeMap.props = (Array.isArray(activeMap.props) ? activeMap.props : []).filter((p) => String(p?.id || "") !== propId);
        if (selectedPropId === propId) selectedPropId = "";
        if (speakingAsPropId === propId) speakingAsPropId = "";
        renderTtrpgDock();
        return;
      }

      if (type === "plugin:maps:propPatched") {
        if (mode !== "map") return;
        const mapId = String(msg.mapId || "").trim().toLowerCase();
        if (!activeMap || mapId !== String(activeMap.id || "")) return;
        const prop = msg.prop && typeof msg.prop === "object" ? msg.prop : null;
        if (!prop || !prop.id) return;
        const props = Array.isArray(activeMap.props) ? activeMap.props : [];
        const idx = props.findIndex((p) => String(p?.id || "") === String(prop.id || ""));
        if (idx >= 0) props[idx] = { ...props[idx], ...prop };
        else props.push(prop);
        activeMap.props = props;
        if (speakingAsPropId && String(prop.id || "") === String(speakingAsPropId || "")) {
          const controller = String(prop.controlledBy || "").trim().toLowerCase();
          const me = String(ctx.getUser() || "").trim().toLowerCase();
          if (controller && controller !== me) speakingAsPropId = "";
        }
        renderTtrpgDock();
        return;
      }

      if (type === "plugin:maps:error") {
        const message = String(msg.message || "Maps error.");
        ctx.toast("Maps", message);
        return;
      }
    });

    // Initial list request (in case the Maps view is opened immediately).
    // The Maps panel triggers another list() on open.
    ctx.send("list", {});
  });
})();

