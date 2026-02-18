const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const MAX_STATIONS = Number(process.env.RADIO_MAX_STATIONS || 500);
const MAX_TRACKS_PER_STATION = Number(process.env.RADIO_MAX_TRACKS_PER_STATION || 500);

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function readJsonOrNull(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return safeJsonParse(raw);
  } catch {
    return null;
  }
}

function writeFileAtomic(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = `${filePath}.tmp.${crypto.randomBytes(6).toString("hex")}`;
  fs.writeFileSync(tmp, content, "utf8");
  fs.renameSync(tmp, filePath);
}

function nowMs() {
  return Date.now();
}

function toId(bytes = 6) {
  return crypto.randomBytes(Math.max(3, Math.min(16, bytes))).toString("hex");
}

function normUser(u) {
  return String(u || "").trim().toLowerCase();
}

function normTitle(t, fallback) {
  const s = String(t || "").replace(/\s+/g, " ").trim().slice(0, 40);
  return s || fallback || "Untitled";
}

function normUrl(u) {
  const s = String(u || "").trim();
  if (!s) return "";
  if (!s.startsWith("/uploads/")) return "";
  if (!/\.mp3(\?|#|$)/i.test(s)) return "";
  if (s.length > 280) return "";
  return s;
}

module.exports = function init(api) {
  const dataFile = path.join(__dirname, "radio.json");

  function loadState() {
    const parsed = readJsonOrNull(dataFile);
    const stations = Array.isArray(parsed?.stations) ? parsed.stations : [];
    const cleaned = stations
      .map((s) => {
        const id = String(s?.id || "").trim().toLowerCase();
        const name = normTitle(s?.name, "Station");
        const author = normUser(s?.author);
        const createdAt = Number(s?.createdAt || 0) || 0;
        const tracks = Array.isArray(s?.tracks) ? s.tracks : [];
        const cleanTracks = tracks
          .map((t) => {
            const tid = String(t?.id || "").trim().toLowerCase();
            const title = normTitle(t?.title, "Track");
            const url = normUrl(t?.url);
            const addedBy = normUser(t?.addedBy);
            const addedAt = Number(t?.addedAt || 0) || 0;
            if (!tid || !url) return null;
            return { id: tid, title, url, addedBy, addedAt };
          })
          .filter(Boolean)
          .slice(0, MAX_TRACKS_PER_STATION);
        if (!id || !author) return null;
        return { id, name, author, createdAt, tracks: cleanTracks };
      })
      .filter(Boolean)
      .slice(0, MAX_STATIONS);
    cleaned.sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
    return { stations: cleaned };
  }

  function saveState(state) {
    const stations = Array.isArray(state?.stations) ? state.stations : [];
    writeFileAtomic(dataFile, JSON.stringify({ version: 1, savedAt: nowMs(), stations }, null, 2) + "\n");
  }

  function listForClient() {
    const state = loadState();
    return state.stations.map((s) => ({
      id: s.id,
      name: s.name,
      author: s.author,
      createdAt: s.createdAt,
      trackCount: Array.isArray(s.tracks) ? s.tracks.length : 0,
      tracks: (Array.isArray(s.tracks) ? s.tracks : []).map((t) => ({
        id: t.id,
        title: t.title,
        url: t.url,
        addedBy: t.addedBy,
        addedAt: t.addedAt
      }))
    }));
  }

  function send(ws, msg) {
    try {
      ws.send(JSON.stringify(msg));
      return true;
    } catch {
      return false;
    }
  }

  function sendError(ws, message, data) {
    send(ws, { type: "plugin:radio:error", message: String(message || "Error."), data: data || null });
  }

  function broadcastStations() {
    api.broadcast({ type: "plugin:radio:stations", stations: listForClient(), at: api.now() });
  }

  api.registerWs("stateReq", (ws) => {
    send(ws, { type: "plugin:radio:stations", stations: listForClient(), at: api.now() });
  });

  api.registerWs("createStation", (ws, msg) => {
    const user = normUser(ws?.user?.username);
    if (!user) {
      sendError(ws, "Sign in required to create a station.");
      return;
    }
    const name = normTitle(msg?.name, "");
    if (!name) {
      sendError(ws, "Station name required.");
      return;
    }
    const state = loadState();
    if (state.stations.length >= MAX_STATIONS) {
      sendError(ws, "Station limit reached.");
      return;
    }
    const station = {
      id: toId(6),
      name,
      author: user,
      createdAt: nowMs(),
      tracks: []
    };
    state.stations.push(station);
    saveState(state);
    broadcastStations();
    send(ws, { type: "plugin:radio:createOk", stationId: station.id });
  });

  api.registerWs("addTracks", (ws, msg) => {
    const user = normUser(ws?.user?.username);
    if (!user) {
      sendError(ws, "Sign in required to upload tracks.");
      return;
    }
    const stationId = String(msg?.stationId || "").trim().toLowerCase();
    if (!stationId) {
      sendError(ws, "Missing stationId.");
      return;
    }
    const incoming = Array.isArray(msg?.tracks) ? msg.tracks : [];
    if (!incoming.length) {
      sendError(ws, "No tracks provided.");
      return;
    }
    const state = loadState();
    const idx = state.stations.findIndex((s) => String(s?.id || "") === stationId);
    if (idx < 0) {
      sendError(ws, "Station not found.");
      return;
    }
    const station = state.stations[idx];
    const existingUrls = new Set((station.tracks || []).map((t) => String(t.url || "")));
    const space = Math.max(0, MAX_TRACKS_PER_STATION - (Array.isArray(station.tracks) ? station.tracks.length : 0));
    if (space <= 0) {
      sendError(ws, "Track limit reached for this station.");
      return;
    }

    const clean = [];
    for (const raw of incoming) {
      if (clean.length >= space) break;
      const url = normUrl(raw?.url);
      if (!url || existingUrls.has(url)) continue;
      const title = normTitle(raw?.title, "Track");
      clean.push({
        id: toId(6),
        title,
        url,
        addedBy: user,
        addedAt: nowMs()
      });
      existingUrls.add(url);
    }
    if (!clean.length) {
      sendError(ws, "No valid MP3 tracks to add.");
      return;
    }
    station.tracks = [...(Array.isArray(station.tracks) ? station.tracks : []), ...clean].slice(0, MAX_TRACKS_PER_STATION);
    state.stations[idx] = station;
    saveState(state);
    broadcastStations();
    send(ws, { type: "plugin:radio:addOk", stationId, added: clean.length });
  });
};

