const fs = require("fs");
const path = require("path");
const https = require("https");

const CONFIG_PATH = path.join(__dirname, "config.json");

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

function postJson(targetUrl, token, payload) {
  return new Promise((resolve) => {
    let u;
    try {
      u = new URL(targetUrl);
    } catch {
      resolve({ ok: false, status: 0, error: "Invalid URL" });
      return;
    }

    const body = Buffer.from(JSON.stringify(payload), "utf8");
    const req = https.request(
      {
        method: "POST",
        hostname: u.hostname,
        port: u.port || 443,
        path: u.pathname + u.search,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": body.length,
          Authorization: token ? `Bearer ${token}` : ""
        }
      },
      (res) => {
        let out = "";
        res.on("data", (d) => (out += String(d || "")));
        res.on("end", () => resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode || 0, body: out }));
      }
    );
    req.on("error", (e) => resolve({ ok: false, status: 0, error: e?.message || String(e) }));
    req.end(body);
  });
}

module.exports = function init(api) {
  const config = readJson(CONFIG_PATH, {
    directoryUrl: "",
    token: "",
    instance: { id: "", url: "", name: "", description: "", bzlVersion: "", requiresRegistrationCode: false },
    publicHives: []
  });

  api.registerWs("getConfig", (ws) => {
    if (ws?.user?.role !== "owner") return;
    api.sendToUsers([ws.user.username], { type: "plugin:directory-publisher:config", config });
  });

  api.registerWs("setConfig", (ws, msg) => {
    if (ws?.user?.role !== "owner") return;
    const next = msg?.config || {};
    config.directoryUrl = normalizeUrl(next.directoryUrl || config.directoryUrl);
    config.token = String(next.token || config.token || "").trim();
    config.instance = { ...(config.instance || {}), ...(next.instance || {}) };
    config.instance.url = normalizeUrl(config.instance.url);
    config.instance.id = String(config.instance.id || "").trim();
    config.instance.name = String(config.instance.name || "").trim();
    config.instance.description = String(config.instance.description || "").trim();
    config.instance.bzlVersion = String(config.instance.bzlVersion || "").trim();
    config.instance.requiresRegistrationCode = Boolean(config.instance.requiresRegistrationCode);
    config.publicHives = Array.isArray(next.publicHives) ? next.publicHives : config.publicHives;
    writeJson(CONFIG_PATH, config);
    api.sendToUsers([ws.user.username], { type: "plugin:directory-publisher:configSaved" });
  });

  api.registerWs("publishNow", async (ws) => {
    if (ws?.user?.role !== "owner") return;
    const urlBase = normalizeUrl(config.directoryUrl);
    if (!urlBase) return api.sendToUsers([ws.user.username], { type: "plugin:directory-publisher:result", ok: false, error: "Missing directory URL." });
    const endpoint = `${urlBase}/api/plugins/directory-server/announce`;
    const payload = { instance: config.instance, publicHives: config.publicHives };
    const r = await postJson(endpoint, config.token, payload);
    api.sendToUsers([ws.user.username], { type: "plugin:directory-publisher:result", ...r });
  });

  api.log("info", "directory-publisher loaded");
};

