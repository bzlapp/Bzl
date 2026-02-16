const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "config.json");
const STATE_PATH = path.join(__dirname, "directory-state.json");

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function getTokenFromReq(req) {
  const h = req?.headers || {};
  const direct = typeof h["x-bzl-directory-token"] === "string" ? h["x-bzl-directory-token"].trim() : "";
  if (direct) return direct;
  const auth = typeof h.authorization === "string" ? h.authorization.trim() : "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : "";
}

function normalizeUrl(s) {
  const raw = String(s || "").trim();
  if (!raw) return "";
  try {
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    u.hash = "";
    return u.toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function sanitizeInstance(payload) {
  const inst = payload?.instance || {};
  const id = String(inst.id || "").trim();
  const url = normalizeUrl(inst.url);
  const name = String(inst.name || "").trim() || id;
  const description = String(inst.description || "").trim();
  const bzlVersion = String(inst.bzlVersion || "").trim();
  const requiresRegistrationCode = Boolean(inst.requiresRegistrationCode);
  if (!id || !/^[a-z0-9][a-z0-9_.-]{0,31}$/i.test(id)) return null;
  if (!url) return null;
  return { id, url, name, description, bzlVersion, requiresRegistrationCode };
}

function sanitizePublicHives(payload) {
  const list = Array.isArray(payload?.publicHives) ? payload.publicHives : [];
  return list
    .map((h) => ({
      title: String(h?.title || "").trim(),
      url: normalizeUrl(h?.url),
      description: String(h?.description || "").trim(),
      tags: Array.isArray(h?.tags) ? h.tags.map((t) => String(t || "").trim()).filter(Boolean).slice(0, 12) : []
    }))
    .filter((h) => h.title && h.url)
    .slice(0, 100);
}

module.exports = function init(api) {
  const config = readJson(CONFIG_PATH, { token: "" });
  const state = readJson(STATE_PATH, { version: 1, entries: {} });
  const entries = new Map(Object.entries(state.entries || {}));

  const persist = () => {
    const out = { version: 1, entries: Object.fromEntries(entries) };
    writeJson(STATE_PATH, out);
  };

  api.registerWs("getConfig", (ws) => {
    if (ws?.user?.role !== "owner") return;
    api.sendToUsers([ws.user.username], { type: "plugin:directory-server:config", tokenSet: Boolean(config.token) });
  });

  api.registerWs("setToken", (ws, msg) => {
    if (ws?.user?.role !== "owner") return;
    const token = String(msg?.token || "").trim();
    config.token = token;
    writeJson(CONFIG_PATH, config);
    api.broadcast({ type: "plugin:directory-server:configUpdated", tokenSet: Boolean(config.token) });
  });

  api.registerHttp("GET", "/list", (_req, res, ctx) => {
    const list = Array.from(entries.values())
      .map((e) => e)
      .sort((a, b) => (b.lastSeenAt || 0) - (a.lastSeenAt || 0));
    ctx.sendJson(200, { ok: true, entries: list });
    res.end();
  });

  api.registerHttp("POST", "/announce", async (req, _res, ctx) => {
    if (!config.token) return ctx.sendJson(503, { ok: false, error: "Directory token not configured." });
    const token = getTokenFromReq(req);
    if (!token || token !== config.token) return ctx.sendJson(401, { ok: false, error: "Unauthorized." });

    let body;
    try {
      body = await ctx.readJsonBody({ maxBytes: 256 * 1024 });
    } catch (e) {
      const code = String(e?.message || "") === "PAYLOAD_TOO_LARGE" ? 413 : 400;
      return ctx.sendJson(code, { ok: false, error: "Invalid JSON body." });
    }

    const inst = sanitizeInstance(body);
    if (!inst) return ctx.sendJson(400, { ok: false, error: "Invalid instance payload." });
    const publicHives = sanitizePublicHives(body);
    const entry = { instance: inst, publicHives, lastSeenAt: Date.now() };
    entries.set(inst.id, entry);
    persist();
    api.broadcast({ type: "plugin:directory-server:updated", id: inst.id, lastSeenAt: entry.lastSeenAt });
    return ctx.sendJson(200, { ok: true, id: inst.id });
  });

  api.log("info", "directory-server loaded", { http: ["/announce", "/list"] });
};

