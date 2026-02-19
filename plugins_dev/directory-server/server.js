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
  const config = readJson(CONFIG_PATH, { hiddenIds: [], blockedHosts: [] });
  const state = readJson(STATE_PATH, { version: 1, entries: {} });
  const entries = new Map(Object.entries(state.entries || {}));

  const normalizeId = (s) => String(s || "").trim().toLowerCase();
  const normalizeHost = (rawUrl) => {
    try {
      const u = new URL(String(rawUrl || ""));
      return String(u.hostname || "").trim().toLowerCase();
    } catch {
      return "";
    }
  };

  config.hiddenIds = Array.isArray(config.hiddenIds) ? config.hiddenIds.map(normalizeId).filter(Boolean) : [];
  config.blockedHosts = Array.isArray(config.blockedHosts) ? config.blockedHosts.map((h) => String(h || "").trim().toLowerCase()).filter(Boolean) : [];

  const persist = () => {
    const out = { version: 1, entries: Object.fromEntries(entries) };
    writeJson(STATE_PATH, out);
  };

  api.registerWs("getConfig", (ws) => {
    if (ws?.user?.role !== "owner") return;
    api.sendToUsers([ws.user.username], {
      type: "plugin:directory-server:config",
      hiddenIds: config.hiddenIds.slice(0, 500),
      blockedHosts: config.blockedHosts.slice(0, 500),
      entryCount: entries.size,
      pendingCount: Array.from(entries.values()).filter((e) => String(e?.status || "pending") === "pending").length
    });
  });

  api.registerWs("getEntries", (ws) => {
    if (ws?.user?.role !== "owner") return;
    const list = Array.from(entries.values())
      .map((e) => {
        const host = normalizeHost(e?.instance?.url);
        const id = normalizeId(e?.instance?.id);
        return {
          ...e,
          host,
          hidden: Boolean(id && config.hiddenIds.includes(id)),
          blocked: Boolean(host && config.blockedHosts.includes(host))
        };
      })
      .sort((a, b) => (b.lastSeenAt || 0) - (a.lastSeenAt || 0));
    api.sendToUsers([ws.user.username], { type: "plugin:directory-server:entries", entries: list });
  });

  api.registerWs("setHidden", (ws, msg) => {
    if (ws?.user?.role !== "owner") return;
    const id = normalizeId(msg?.id);
    const hidden = Boolean(msg?.hidden);
    if (!id) return;
    const set = new Set(config.hiddenIds);
    if (hidden) set.add(id);
    else set.delete(id);
    config.hiddenIds = Array.from(set.values()).sort();
    writeJson(CONFIG_PATH, config);
    api.broadcast({ type: "plugin:directory-server:configUpdated" });
  });

  api.registerWs("setBlockedHost", (ws, msg) => {
    if (ws?.user?.role !== "owner") return;
    const host = String(msg?.host || "").trim().toLowerCase();
    const blocked = Boolean(msg?.blocked);
    if (!host) return;
    const set = new Set(config.blockedHosts);
    if (blocked) set.add(host);
    else set.delete(host);
    config.blockedHosts = Array.from(set.values()).sort();
    writeJson(CONFIG_PATH, config);
    api.broadcast({ type: "plugin:directory-server:configUpdated" });
  });

  api.registerWs("deleteEntry", (ws, msg) => {
    if (ws?.user?.role !== "owner") return;
    const id = normalizeId(msg?.id);
    if (!id) return;
    entries.delete(id);
    persist();
    api.broadcast({ type: "plugin:directory-server:updated", id, deleted: true });
  });

  api.registerWs("approveEntry", (ws, msg) => {
    if (ws?.user?.role !== "owner") return;
    const id = normalizeId(msg?.id);
    if (!id) return;
    const current = entries.get(id);
    if (!current || !current.instance) return;
    const next = {
      ...current,
      status: "approved",
      reviewedAt: Date.now(),
      reviewedBy: String(ws?.user?.username || ""),
      rejectedReason: ""
    };
    entries.set(id, next);
    persist();
    api.broadcast({ type: "plugin:directory-server:updated", id, status: "approved", reviewedAt: next.reviewedAt, reviewedBy: next.reviewedBy });
  });

  api.registerWs("rejectEntry", (ws, msg) => {
    if (ws?.user?.role !== "owner") return;
    const id = normalizeId(msg?.id);
    if (!id) return;
    const current = entries.get(id);
    if (!current || !current.instance) return;
    const reason = String(msg?.reason || "").trim().slice(0, 240);
    const next = {
      ...current,
      status: "rejected",
      reviewedAt: Date.now(),
      reviewedBy: String(ws?.user?.username || ""),
      rejectedReason: reason
    };
    entries.set(id, next);
    persist();
    api.broadcast({
      type: "plugin:directory-server:updated",
      id,
      status: "rejected",
      reviewedAt: next.reviewedAt,
      reviewedBy: next.reviewedBy,
      rejectedReason: reason
    });
  });

  api.registerHttp("GET", "/list", (_req, res, ctx) => {
    const hidden = new Set(config.hiddenIds);
    const blocked = new Set(config.blockedHosts);
    const list = Array.from(entries.values())
      .map((e) => e)
      .filter((e) => {
        if (String(e?.status || "pending") !== "approved") return false;
        const id = normalizeId(e?.instance?.id);
        if (id && hidden.has(id)) return false;
        const host = normalizeHost(e?.instance?.url);
        if (host && blocked.has(host)) return false;
        return true;
      })
      .sort((a, b) => (b.lastSeenAt || 0) - (a.lastSeenAt || 0));
    ctx.sendJson(200, { ok: true, entries: list });
    res.end();
  });

  api.registerHttp("POST", "/announce", async (req, _res, ctx) => {
    let body;
    try {
      body = await ctx.readJsonBody({ maxBytes: 256 * 1024 });
    } catch (e) {
      const code = String(e?.message || "") === "PAYLOAD_TOO_LARGE" ? 413 : 400;
      return ctx.sendJson(code, { ok: false, error: "Invalid JSON body." });
    }

    const inst = sanitizeInstance(body);
    if (!inst) return ctx.sendJson(400, { ok: false, error: "Invalid instance payload." });
    const host = normalizeHost(inst.url);
    if (host && config.blockedHosts.includes(host)) {
      return ctx.sendJson(403, { ok: false, error: "This host is blocked by the directory owner." });
    }
    const publicHives = sanitizePublicHives(body);
    const current = entries.get(inst.id);
    const keepApproved = String(current?.status || "") === "approved";
    const entry = {
      instance: inst,
      publicHives,
      lastSeenAt: Date.now(),
      status: keepApproved ? "approved" : "pending",
      reviewedAt: keepApproved ? Number(current?.reviewedAt || 0) : 0,
      reviewedBy: keepApproved ? String(current?.reviewedBy || "") : "",
      rejectedReason: ""
    };
    entries.set(inst.id, entry);
    persist();
    api.broadcast({ type: "plugin:directory-server:updated", id: inst.id, lastSeenAt: entry.lastSeenAt, status: entry.status });
    return ctx.sendJson(200, { ok: true, id: inst.id, status: entry.status });
  });

  api.log("info", "directory-server loaded", { http: ["/announce", "/list"] });
};
