const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { spawn } = require("child_process");

const ROOT = path.join(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".env");
const HTML_PATH = path.join(__dirname, "launcher-ui.html");

const UI_HOST = "127.0.0.1";
function getUiPort() {
  const raw = String(process.env.BZL_LAUNCHER_PORT || "8787").trim();
  const n = Number(raw);
  if (!Number.isFinite(n)) return 8787;
  const p = Math.floor(n);
  if (p < 1 || p > 65535) return 8787;
  return p;
}
const UI_PORT = getUiPort();
const apiToken = crypto.randomBytes(18).toString("hex");

function nowIso() {
  return new Date().toISOString();
}

function crashLogPath() {
  return path.join(ROOT, "launcher-ui.crash.log");
}

function appendCrashLog(line) {
  try {
    fs.appendFileSync(crashLogPath(), `${nowIso()} ${line}\n`, "utf8");
  } catch {
    // ignore
  }
}

process.on("uncaughtException", (err) => {
  const msg = err?.stack || err?.message || String(err);
  console.error("[launcher-ui] FATAL:", msg);
  appendCrashLog(`FATAL uncaughtException: ${msg}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  const msg = reason?.stack || reason?.message || String(reason);
  console.error("[launcher-ui] FATAL:", msg);
  appendCrashLog(`FATAL unhandledRejection: ${msg}`);
  process.exit(1);
});

function readEnvFile() {
  try {
    const raw = fs.readFileSync(ENV_PATH, "utf8");
    const out = {};
    for (const line of raw.split(/\r?\n/)) {
      const s = String(line || "").trim();
      if (!s || s.startsWith("#")) continue;
      const m = s.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      let v = String(m[2] || "").trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      out[m[1]] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function mergeEnv(baseEnv, envFile) {
  const out = { ...(baseEnv || {}) };
  const src = envFile && typeof envFile === "object" ? envFile : {};
  for (const [k, v] of Object.entries(src)) {
    if (out[k] == null || String(out[k]) === "") out[k] = String(v ?? "");
  }
  return out;
}

function getConfiguredPort(env) {
  const p = Number(env?.PORT || 3000);
  return Number.isFinite(p) && p > 0 ? Math.floor(p) : 3000;
}

function getConfiguredHost(env) {
  return String(env?.HOST || "0.0.0.0").trim() || "0.0.0.0";
}

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function spawnDetached(cmd, args) {
  const child = spawn(cmd, args, { stdio: "ignore", detached: true, windowsHide: true });
  child.on("error", () => {});
  child.unref();
}

function escapePsSingleQuoted(s) {
  return `'${String(s || "").replaceAll("'", "''")}'`;
}

function openUrl(url) {
  const u = String(url || "").trim();
  if (!u) return;
  if (process.platform === "win32") {
    const trySpawn = (cmd, args, onFail) => {
      try {
        const child = spawn(cmd, args, { stdio: "ignore", detached: true, windowsHide: true });
        child.once("error", () => (typeof onFail === "function" ? onFail() : undefined));
        child.unref();
      } catch {
        if (typeof onFail === "function") onFail();
      }
    };

    // Prefer PowerShell; it avoids some cmd.exe `start` edge-cases.
    trySpawn("powershell.exe", ["-NoProfile", "-Command", `Start-Process ${escapePsSingleQuoted(u)}`], () =>
      trySpawn("cmd.exe", ["/d", "/s", "/c", "start", "", u], () =>
        trySpawn("rundll32.exe", ["url.dll,FileProtocolHandler", u])
      )
    );
    return;
  }
  if (process.platform === "darwin") {
    spawnDetached("open", [u]);
    return;
  }
  spawnDetached("xdg-open", [u]);
}

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

function getJson(url, { timeoutMs = 1200 } = {}) {
  return new Promise((resolve) => {
    let settled = false;
    const done = (v) => {
      if (settled) return;
      settled = true;
      resolve(v);
    };

    try {
      const u = new URL(url);
      const mod = u.protocol === "https:" ? https : http;
      const req = mod.request(
        {
          method: "GET",
          protocol: u.protocol,
          hostname: u.hostname,
          port: u.port,
          path: `${u.pathname || "/"}${u.search || ""}`,
          headers: { Accept: "application/json", "Cache-Control": "no-store" }
        },
        (res) => {
          let buf = "";
          res.setEncoding("utf8");
          res.on("data", (c) => (buf += c));
          res.on("end", () => {
            const status = Number(res.statusCode || 0);
            if (status < 200 || status >= 300) return done({ ok: false, status });
            try {
              return done({ ok: true, json: JSON.parse(buf || "{}") });
            } catch {
              return done({ ok: true, json: {} });
            }
          });
        }
      );
      req.on("error", () => done({ ok: false }));
      req.setTimeout(timeoutMs, () => {
        try {
          req.destroy(new Error("timeout"));
        } catch {
          // ignore
        }
        done({ ok: false, timeout: true });
      });
      req.end();
    } catch {
      done({ ok: false });
    }
  });
}

async function readJsonBody(req) {
  return await new Promise((resolve) => {
    let buf = "";
    req.on("data", (c) => (buf += c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(buf || "{}"));
      } catch {
        resolve({});
      }
    });
  });
}

function makeRing(maxLines = 600) {
  const lines = [];
  return {
    push(line) {
      lines.push(line);
      while (lines.length > maxLines) lines.shift();
    },
    list() {
      return lines.slice();
    }
  };
}

const logRing = makeRing(800);
const subscribers = new Set();

function pushLog(kind, msg) {
  const line = `[${nowIso()}] ${kind}: ${msg}`;
  logRing.push(line);
  for (const res of subscribers) {
    try {
      res.write(`data: ${JSON.stringify({ line })}\n\n`);
    } catch {
      // ignore
    }
  }
}

function teeChild(child, prefix) {
  if (!child) return;
  const on = (data, stream) => {
    const text = String(data || "");
    for (const line of text.split(/\r?\n/)) {
      if (!line.trim()) continue;
      pushLog(prefix, line);
    }
    try {
      stream.write(data);
    } catch {
      // ignore
    }
  };
  if (child.stdout) child.stdout.on("data", (d) => on(d, process.stdout));
  if (child.stderr) child.stderr.on("data", (d) => on(d, process.stderr));
}

let bzlChild = null;
let tunnelChild = null;
let cloudflaredSetupChild = null;
let lastCloudflaredCreate = null;
let lastCloudflaredLoginUrl = "";

function isRunning(child) {
  return Boolean(child && !child.killed);
}

async function healthcheck(url, { timeoutMs = 1200 } = {}) {
  const res = await getJson(url, { timeoutMs });
  return res?.ok === true && res?.json?.ok === true;
}

function startBzl({ supervised = true } = {}) {
  if (isRunning(bzlChild)) return { ok: true, already: true };
  const envFile = readEnvFile();
  const childEnv = mergeEnv(process.env, envFile);
  const entry = supervised ? path.join(ROOT, "scripts", "service-runner.js") : path.join(ROOT, "server.js");
  bzlChild = spawn(process.execPath, [entry], { cwd: ROOT, env: childEnv, stdio: ["ignore", "pipe", "pipe"] });
  teeChild(bzlChild, "bzl");
  pushLog("ui", `Bzl starting (${supervised ? "supervised" : "direct"})...`);
  bzlChild.on("exit", (code, signal) => {
    const detail = signal ? `signal=${signal}` : `code=${code}`;
    pushLog("ui", `Bzl exited (${detail})`);
    bzlChild = null;
  });
  return { ok: true };
}

function stopBzl() {
  if (!isRunning(bzlChild)) return { ok: true, already: true };
  try {
    bzlChild.kill("SIGTERM");
  } catch {
    // ignore
  }
  return { ok: true };
}

function startTunnel({ mode = "quick", port }) {
  if (isRunning(tunnelChild)) return { ok: true, already: true };
  const envFile = readEnvFile();
  const childEnv = mergeEnv(process.env, envFile);
  const localUrl = `http://localhost:${port}`;

  let args = [];
  if (mode === "named") {
    const tunnel = normalizeTunnelIdOrName(childEnv.CLOUDFLARED_TUNNEL);
    if (!tunnel) return { ok: false, error: "Set CLOUDFLARED_TUNNEL in .env to use named tunnels." };
    const cfg = String(childEnv.CLOUDFLARED_CONFIG || "").trim();
    args = cfg ? ["--config", cfg, "tunnel", "run", tunnel] : ["tunnel", "run", tunnel];
  } else {
    args = ["tunnel", "--url", localUrl];
  }

  tunnelChild = spawn("cloudflared", args, { cwd: ROOT, env: childEnv, stdio: ["ignore", "pipe", "pipe"] });
  teeChild(tunnelChild, "tunnel");
  pushLog("ui", `cloudflared starting (${mode})...`);
  tunnelChild.on("exit", (code, signal) => {
    const detail = signal ? `signal=${signal}` : `code=${code}`;
    pushLog("ui", `cloudflared exited (${detail})`);
    tunnelChild = null;
  });
  return { ok: true };
}

function stopTunnel() {
  if (!isRunning(tunnelChild)) return { ok: true, already: true };
  try {
    tunnelChild.kill("SIGTERM");
  } catch {
    // ignore
  }
  return { ok: true };
}

function getHomeDir() {
  return process.env.USERPROFILE || process.env.HOME || "";
}

function cloudflaredDir() {
  const home = getHomeDir();
  return home ? path.join(home, ".cloudflared") : "";
}

function defaultCloudflaredConfigPath() {
  const dir = cloudflaredDir();
  return dir ? path.join(dir, "config.yml") : "";
}

function cloudflaredCertPath() {
  const dir = cloudflaredDir();
  return dir ? path.join(dir, "cert.pem") : "";
}

function expandEnvVars(p) {
  let out = String(p || "").trim();
  if (!out) return "";
  if (out.startsWith("~")) {
    const home = getHomeDir();
    if (home) out = path.join(home, out.slice(1));
  }
  out = out.replaceAll(/%([A-Za-z0-9_]+)%/g, (m, k) => String(process.env[k] || m));
  return out;
}

function parseCreateOutput(output) {
  const text = String(output || "");
  const uuidMatch = text.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  const credMatch =
    text.match(/written to\s+(\S+?\.json)/i) ||
    text.match(/credentials?-file:\s*(\S+?\.json)/i) ||
    text.match(/cred(?:entials)?-file:\s*(\S+?\.json)/i);
  return {
    tunnelId: uuidMatch ? uuidMatch[0] : "",
    credentialsFile: credMatch ? String(credMatch[1] || "").trim().replace(/[.)\]]+$/, "") : ""
  };
}

function guessCredentialsFilePath(tunnelId) {
  const dir = cloudflaredDir();
  const id = String(tunnelId || "").trim();
  if (!dir || !id) return "";
  const p = path.join(dir, `${id}.json`);
  return fs.existsSync(p) ? p : "";
}

function parseUuidFromText(s) {
  const m = String(s || "").match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  return m ? m[0] : "";
}

function normalizeTunnelIdOrName(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  const uuid = parseUuidFromText(s);
  if (uuid) return uuid;
  return s.replace(/\.json$/i, "").trim();
}

function stripYamlScalar(s) {
  return String(s || "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .trim();
}

function readCloudflaredConfigSummary(configPath) {
  const cfg = expandEnvVars(configPath || "");
  if (!cfg || !fs.existsSync(cfg)) return { ok: false, configPath: cfg };
  try {
    const raw = fs.readFileSync(cfg, "utf8");
    let tunnel = "";
    let credentialsFile = "";
    let hostname = "";
    let service = "";

    for (const line of raw.split(/\r?\n/)) {
      const t = line.match(/^\s*tunnel\s*:\s*(.+?)\s*$/i);
      if (t && !tunnel) tunnel = stripYamlScalar(t[1]);
      const c = line.match(/^\s*credentials-file\s*:\s*(.+?)\s*$/i);
      if (c && !credentialsFile) credentialsFile = stripYamlScalar(c[1]);
      const h = line.match(/^\s*-\s*hostname\s*:\s*(.+?)\s*$/i);
      if (h && !hostname) hostname = stripYamlScalar(h[1]);
      const s = line.match(/^\s*service\s*:\s*(.+?)\s*$/i);
      if (s && hostname && !service) service = stripYamlScalar(s[1]);
    }

    return {
      ok: true,
      configPath: cfg,
      tunnel,
      credentialsFile,
      hostname,
      service
    };
  } catch {
    return { ok: false, configPath: cfg };
  }
}

function writeCloudflaredConfig({ configPath, tunnelId, credentialsFile, hostname, port }) {
  const cfg = expandEnvVars(configPath || defaultCloudflaredConfigPath());
  if (!cfg) throw new Error("Missing config path.");
  const t = String(tunnelId || "").trim();
  const cred = expandEnvVars(credentialsFile || "");
  const host = String(hostname || "").trim();
  const p = Number(port || 0);
  if (!t) throw new Error("Missing tunnel id.");
  if (!cred) throw new Error("Missing credentials file path.");
  if (!host || !host.includes(".")) throw new Error("Invalid hostname (example: bzl.example.com).");
  if (!Number.isFinite(p) || p < 1 || p > 65535) throw new Error("Invalid port.");

  fs.mkdirSync(path.dirname(cfg), { recursive: true });
  const yaml = [
    `tunnel: ${t}`,
    `credentials-file: ${cred}`,
    `ingress:`,
    `  - hostname: ${host}`,
    `    service: http://localhost:${Math.floor(p)}`,
    `  - service: http_status:404`,
    ``
  ].join("\n");
  fs.writeFileSync(cfg, yaml, "utf8");
  return cfg;
}

function runCloudflaredCommand(args, { label = "cloudflared", capture = false, quiet = false } = {}) {
  if (isRunning(cloudflaredSetupChild)) return Promise.resolve({ ok: false, error: "Another cloudflared command is running." });
  return new Promise((resolve) => {
    let output = "";
    try {
      cloudflaredSetupChild = spawn("cloudflared", args, { cwd: ROOT, env: mergeEnv(process.env, readEnvFile()), stdio: ["ignore", "pipe", "pipe"] });
    } catch (e) {
      cloudflaredSetupChild = null;
      return resolve({ ok: false, error: e?.message || String(e) });
    }

    const child = cloudflaredSetupChild;
    if (!quiet) pushLog("ui", `${label}: cloudflared ${args.join(" ")}`);
    const onData = (d) => {
      if (capture) output += String(d || "");
    };
    if (child.stdout) child.stdout.on("data", onData);
    if (child.stderr) child.stderr.on("data", onData);
    if (!quiet) teeChild(child, "cf");
    child.on("error", (e) => {
      if (!quiet) pushLog("ui", `${label}: failed to start (${e?.message || e})`);
    });
    child.on("exit", (code, signal) => {
      const detail = signal ? `signal=${signal}` : `code=${code}`;
      if (!quiet) pushLog("ui", `${label}: exited (${detail})`);
      cloudflaredSetupChild = null;
      resolve({ ok: Number(code || 0) === 0, code: Number(code || 0), output });
    });
  });
}

function startCloudflaredLogin() {
  if (isRunning(cloudflaredSetupChild)) return { ok: false, error: "Another cloudflared command is running." };
  const cert = cloudflaredCertPath();
  if (cert && fs.existsSync(cert)) {
    pushLog("ui", `login: already logged in (cert exists at ${cert})`);
    pushLog("ui", `login: to switch accounts, move/delete cert.pem then press Login again`);
    return { ok: true, alreadyLoggedIn: true, certPath: cert };
  }
  const args = ["tunnel", "login"];
  let opened = false;
  let buf = "";

  try {
    cloudflaredSetupChild = spawn("cloudflared", args, {
      cwd: ROOT,
      env: mergeEnv(process.env, readEnvFile()),
      stdio: ["ignore", "pipe", "pipe"]
    });
  } catch (e) {
    cloudflaredSetupChild = null;
    return { ok: false, error: e?.message || String(e) };
  }

  const child = cloudflaredSetupChild;
  pushLog("ui", `login: cloudflared ${args.join(" ")}`);

  const maybeOpenFromText = (text) => {
    buf += String(text || "");
    const lines = buf.split(/\r?\n/);
    buf = lines.pop() || "";
    for (const line of lines) {
      const m = String(line || "").match(/https?:\/\/\S+/i);
      if (m) {
        lastCloudflaredLoginUrl = m[0];
        if (!opened) {
          opened = true;
          openUrl(m[0]);
        }
      }
    }
  };

  if (child.stdout) child.stdout.on("data", (d) => maybeOpenFromText(String(d || "")));
  if (child.stderr) child.stderr.on("data", (d) => maybeOpenFromText(String(d || "")));

  teeChild(child, "cf");
  child.on("error", (e) => pushLog("ui", `login: failed to start (${e?.message || e})`));
  child.on("exit", (code, signal) => {
    const detail = signal ? `signal=${signal}` : `code=${code}`;
    pushLog("ui", `login: exited (${detail})`);
    cloudflaredSetupChild = null;
  });

  return { ok: true, started: true };
}

async function probeCloudflared() {
  if (!probeCloudflared.cache) probeCloudflared.cache = { ts: 0, result: { ok: false, exists: false, version: "" } };
  if (Date.now() - probeCloudflared.cache.ts < 10_000) return probeCloudflared.cache.result;

  const res = await runCloudflaredCommand(["--version"], { label: "probe", capture: true, quiet: true }).catch(() => ({
    ok: false,
    output: ""
  }));
  const out = String(res?.output || "").trim();
  if (!res?.ok) {
    const result = { ok: false, exists: false, version: "" };
    probeCloudflared.cache = { ts: Date.now(), result };
    return result;
  }
  const line = out.split(/\r?\n/).find((l) => l.toLowerCase().includes("cloudflared")) || out.split(/\r?\n/)[0] || "";
  const result = { ok: true, exists: true, version: line.trim() };
  probeCloudflared.cache = { ts: Date.now(), result };
  return result;
}

function extractJsonArray(text) {
  const s = String(text || "");
  const start = s.indexOf("[");
  const end = s.lastIndexOf("]");
  if (start === -1 || end === -1 || end < start) return null;
  const chunk = s.slice(start, end + 1);
  try {
    return JSON.parse(chunk);
  } catch {
    return null;
  }
}

async function listCloudflaredTunnels() {
  const r = await runCloudflaredCommand(["tunnel", "list", "--output", "json"], { label: "tunnels", capture: true, quiet: true });
  if (!r.ok) return { ok: false, code: r.code, tunnels: [], error: "cloudflared tunnel list failed" };
  const arr = extractJsonArray(r.output);
  if (!Array.isArray(arr)) return { ok: false, code: r.code, tunnels: [], error: "Failed to parse tunnel list output." };
  const tunnels = arr
    .map((t) => ({
      id: String(t?.id || t?.ID || "").trim(),
      name: String(t?.name || t?.Name || "").trim()
    }))
    .filter((t) => t.id && t.name);
  tunnels.sort((a, b) => a.name.localeCompare(b.name));
  return { ok: true, code: 0, tunnels };
}

function listCloudflaredFiles() {
  const dir = cloudflaredDir();
  const out = {
    dir,
    certPath: cloudflaredCertPath(),
    certExists: false,
    configCandidates: [],
    credentials: []
  };
  if (out.certPath) out.certExists = fs.existsSync(out.certPath);
  if (!dir || !fs.existsSync(dir)) return out;

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const it of items) {
      if (!it.isFile()) continue;
      const name = it.name;
      const abs = path.join(dir, name);
      const lower = name.toLowerCase();
      if (lower === "config.yml" || lower === "config.yaml") out.configCandidates.push(abs);
      if (lower.endsWith(".json")) {
        const m = name.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.json$/i);
        out.credentials.push({ path: abs, tunnelId: m ? m[1] : "", name });
      }
    }
  } catch {
    // ignore
  }

  out.configCandidates.sort((a, b) => a.localeCompare(b));
  out.credentials.sort((a, b) => (a.tunnelId || a.name).localeCompare(b.tunnelId || b.name));
  return out;
}

function writeEnvKeyValues(pairs) {
  const existing = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, "utf8") : "";
  const lines = existing.split(/\r?\n/);
  const map = new Map();
  for (const [k, v] of Object.entries(pairs || {})) {
    const key = String(k || "").trim().toUpperCase();
    if (!key) continue;
    map.set(key, String(v ?? ""));
  }
  const seen = new Set();
  const out = [];
  for (const line of lines) {
    const m = String(line || "").match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) {
      out.push(line);
      continue;
    }
    const key = m[1];
    if (!map.has(key)) {
      out.push(line);
      continue;
    }
    const val = map.get(key);
    seen.add(key);
    out.push(`${key}=${val}`);
  }
  for (const [key, val] of map.entries()) {
    if (seen.has(key)) continue;
    out.push(`${key}=${val}`);
  }
  fs.writeFileSync(ENV_PATH, out.join("\n").trimEnd() + "\n", "utf8");
}

function renderHtmlTemplate() {
  const tpl = fs.readFileSync(HTML_PATH, "utf8");
  const env = readEnvFile();
  return tpl
    .replaceAll("__PORT__", escapeHtml(String(getConfiguredPort(env))))
    .replaceAll("__HOST__", escapeHtml(String(getConfiguredHost(env))))
    .replaceAll("__REGISTRATION_CODE__", escapeHtml(String(env.REGISTRATION_CODE || "")))
    .replaceAll("__CLOUDFLARED_TUNNEL__", escapeHtml(String(env.CLOUDFLARED_TUNNEL || "")))
    .replaceAll("__CLOUDFLARED_CONFIG__", escapeHtml(String(env.CLOUDFLARED_CONFIG || "")))
    .replaceAll("__API_TOKEN__", escapeHtml(apiToken));
}

function requireLocal(req) {
  const ip = String(req.socket.remoteAddress || "");
  return ip === "127.0.0.1" || ip === "::1" || ip.endsWith("127.0.0.1");
}

function requireToken(req) {
  const h = String(req.headers["x-bzl-launcher"] || "");
  return h === apiToken;
}

function withTokenHeaders(res) {
  res.setHeader("X-Bzl-Launcher", apiToken);
}

const srv = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (!requireLocal(req)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    res.end(renderHtmlTemplate());
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/log") {
    json(res, 200, { ok: true, lines: logRing.list() });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/log/stream") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
      Connection: "keep-alive"
    });
    subscribers.add(res);
    req.on("close", () => subscribers.delete(res));
    return;
  }

  if (url.pathname.startsWith("/api/") && req.method !== "GET") {
    if (!requireToken(req)) {
      json(res, 401, { ok: false, error: "Missing token." });
      return;
    }
  }

  if (req.method === "GET" && url.pathname === "/api/status") {
    const env = readEnvFile();
    const port = getConfiguredPort(env);
    const localUrl = `http://localhost:${port}`;
    const healthy = await healthcheck(`http://127.0.0.1:${port}/api/health`);
    const namedHostname = readCloudflaredConfigSummary(expandEnvVars(String(env.CLOUDFLARED_CONFIG || "")) || defaultCloudflaredConfigPath())?.hostname || "";
    json(res, 200, {
      ok: true,
      serverRunning: isRunning(bzlChild),
      tunnelRunning: isRunning(tunnelChild),
      localUrl,
      healthy,
      namedPublicUrl: namedHostname ? `https://${namedHostname}` : ""
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/cloudflared/status") {
    const env = readEnvFile();
    const port = getConfiguredPort(env);
    const probe = await probeCloudflared();
    const cfgPath = expandEnvVars(String(env.CLOUDFLARED_CONFIG || "")) || defaultCloudflaredConfigPath();
    const cert = cloudflaredCertPath();
    const cfgSummary = readCloudflaredConfigSummary(cfgPath);
    const expectedCred = guessCredentialsFilePath(String(env.CLOUDFLARED_TUNNEL || ""));
    json(res, 200, {
      ok: true,
      exists: probe.exists,
      version: probe.version,
      setupRunning: isRunning(cloudflaredSetupChild),
      certPath: cert,
      certExists: cert ? fs.existsSync(cert) : false,
      lastLoginUrl: lastCloudflaredLoginUrl || "",
      defaultConfigPath: defaultCloudflaredConfigPath(),
      configPath: cfgPath,
      configExists: cfgPath ? fs.existsSync(cfgPath) : false,
      envTunnel: String(env.CLOUDFLARED_TUNNEL || ""),
      envConfig: String(env.CLOUDFLARED_CONFIG || ""),
      configTunnel: cfgSummary?.ok ? cfgSummary.tunnel : "",
      configCredentialsFile: cfgSummary?.ok ? cfgSummary.credentialsFile : "",
      configHostname: cfgSummary?.ok ? cfgSummary.hostname : "",
      configService: cfgSummary?.ok ? cfgSummary.service : "",
      expectedCredentialsFile: expectedCred,
      expectedCredentialsFileExists: expectedCred ? fs.existsSync(expectedCred) : false,
      configCredentialsFileExists: cfgSummary?.ok && cfgSummary.credentialsFile ? fs.existsSync(expandEnvVars(cfgSummary.credentialsFile)) : false,
      suggestedLocalUrl: `http://localhost:${port}`,
      lastCreate: lastCloudflaredCreate || null
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/cloudflared/files") {
    const f = listCloudflaredFiles();
    json(res, 200, { ok: true, ...f });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/cloudflared/tunnels") {
    const r = await listCloudflaredTunnels();
    json(res, 200, r);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/start") {
    const body = await readJsonBody(req);
    const supervised = body?.supervised !== false;
    withTokenHeaders(res);
    json(res, 200, startBzl({ supervised }));
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/stop") {
    withTokenHeaders(res);
    json(res, 200, stopBzl());
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/open") {
    const env = readEnvFile();
    const port = getConfiguredPort(env);
    openUrl(`http://localhost:${port}`);
    withTokenHeaders(res);
    json(res, 200, { ok: true });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/tunnel/start") {
    const body = await readJsonBody(req);
    const env = readEnvFile();
    const port = getConfiguredPort(env);
    const mode = String(body?.mode || "quick") === "named" ? "named" : "quick";
    withTokenHeaders(res);
    json(res, 200, startTunnel({ mode, port }));
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/cloudflared/cancel") {
    const ok = isRunning(cloudflaredSetupChild);
    try {
      if (cloudflaredSetupChild && !cloudflaredSetupChild.killed) cloudflaredSetupChild.kill("SIGTERM");
    } catch {
      // ignore
    }
    withTokenHeaders(res);
    json(res, 200, { ok: true, canceled: ok });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/cloudflared/login") {
    withTokenHeaders(res);
    json(res, 200, startCloudflaredLogin());
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/cloudflared/create") {
    const body = await readJsonBody(req);
    const name = String(body?.name || "").trim();
    if (!name) {
      withTokenHeaders(res);
      json(res, 400, { ok: false, error: "Missing tunnel name." });
      return;
    }
    const r = await runCloudflaredCommand(["tunnel", "create", name], { label: `create:${name}`, capture: true });
    const parsed = parseCreateOutput(r.output);
    let ok = r.ok;
    const result = { name, ...parsed };

    if (!ok) {
      const out = String(r.output || "");
      if (/tunnel with name already exists/i.test(out) || /name already exists/i.test(out)) {
        const list = await listCloudflaredTunnels();
        const found = list.ok ? (list.tunnels || []).find((t) => t.name === name) : null;
        if (found?.id) {
          ok = true;
          result.tunnelId = found.id;
          result.credentialsFile = result.credentialsFile || guessCredentialsFilePath(found.id) || "";
          result.reused = true;
          pushLog("ui", `create:${name}: tunnel already exists; using ${found.id}`);
        }
      }
    }

    if (ok) {
      lastCloudflaredCreate = { ...result };
      try {
        const pairs = {
          // Use UUID for consistency; it matches the credentials JSON filename.
          CLOUDFLARED_TUNNEL: result.tunnelId || name,
          CLOUDFLARED_CONFIG: defaultCloudflaredConfigPath()
        };
        writeEnvKeyValues(pairs);
        pushLog("ui", "Saved .env (CLOUDFLARED_TUNNEL / CLOUDFLARED_CONFIG)");
      } catch {
        // ignore
      }
    }
    withTokenHeaders(res);
    json(res, 200, { ok, code: ok ? 0 : r.code, ...result });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/cloudflared/route-dns") {
    const body = await readJsonBody(req);
    const hostname = String(body?.hostname || "").trim();
    const tunnel = String(body?.tunnel || "").trim();
    const force = body?.force !== false;
    if (!hostname || !hostname.includes(".")) {
      withTokenHeaders(res);
      json(res, 400, { ok: false, error: "Invalid hostname (example: bzl.example.com)." });
      return;
    }
    if (!tunnel) {
      withTokenHeaders(res);
      json(res, 400, { ok: false, error: "Missing tunnel (name or UUID)." });
      return;
    }
    withTokenHeaders(res);
    // cloudflared disables interspersed flags for this command; flags must come before positional args.
    const args = ["tunnel", "route", "dns"];
    if (force) args.push("--overwrite-dns");
    args.push(tunnel, hostname);
    json(res, 200, await runCloudflaredCommand(args, { label: `route:${hostname}` }));
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/cloudflared/write-config") {
    const body = await readJsonBody(req);
    const env = readEnvFile();
    const port = Number(body?.port || getConfiguredPort(env));
    const hostname = String(body?.hostname || "").trim();
    const tunnelId = String(body?.tunnelId || env.CLOUDFLARED_TUNNEL || lastCloudflaredCreate?.tunnelId || "").trim();
    const credentialsFile =
      String(body?.credentialsFile || env.CLOUDFLARED_CREDS || lastCloudflaredCreate?.credentialsFile || guessCredentialsFilePath(tunnelId) || "").trim();
    const configPath = String(body?.configPath || env.CLOUDFLARED_CONFIG || defaultCloudflaredConfigPath() || "").trim();

    try {
      // If a credentials JSON is selected, prefer its UUID to avoid "Invalid tunnel secret" mismatches.
      const uuidFromCreds = parseUuidFromText(credentialsFile);
      const effectiveTunnelId = uuidFromCreds || tunnelId;
      if (uuidFromCreds && tunnelId && uuidFromCreds !== tunnelId) {
        pushLog("ui", `cloudflared: tunnel/creds mismatch; using ${uuidFromCreds} from credentials file`);
      }

      const writtenTo = writeCloudflaredConfig({ configPath, tunnelId: effectiveTunnelId, credentialsFile, hostname, port });
      writeEnvKeyValues({ CLOUDFLARED_TUNNEL: effectiveTunnelId, CLOUDFLARED_CONFIG: writtenTo });
      pushLog("ui", `Wrote cloudflared config: ${writtenTo}`);
      withTokenHeaders(res);
      json(res, 200, { ok: true, configPath: writtenTo });
    } catch (e) {
      withTokenHeaders(res);
      json(res, 400, { ok: false, error: e?.message || String(e) });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/tunnel/stop") {
    withTokenHeaders(res);
    json(res, 200, stopTunnel());
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/config") {
    const body = await readJsonBody(req);
    const pairs = {};
    for (const k of ["PORT", "HOST", "REGISTRATION_CODE", "CLOUDFLARED_TUNNEL", "CLOUDFLARED_CONFIG"]) {
      if (k in (body || {})) pairs[k] = String(body[k] ?? "");
    }
    if ("CLOUDFLARED_TUNNEL" in pairs) pairs.CLOUDFLARED_TUNNEL = normalizeTunnelIdOrName(pairs.CLOUDFLARED_TUNNEL);
    try {
      writeEnvKeyValues(pairs);
      pushLog("ui", "Saved .env");
      withTokenHeaders(res);
      json(res, 200, { ok: true });
    } catch (e) {
      json(res, 500, { ok: false, error: e?.message || String(e) });
    }
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

srv.on("error", (err) => {
  const code = String(err?.code || "");
  const url = `http://${UI_HOST}:${UI_PORT}`;
  if (code === "EADDRINUSE") {
    console.error(`[launcher-ui] Port ${UI_PORT} is already in use.`);
    console.error(`[launcher-ui] If another Launcher UI is already running, open: ${url}`);
    appendCrashLog(`listen EADDRINUSE on ${url}`);
    openUrl(url);
    process.exit(0);
    return;
  }
  const msg = err?.stack || err?.message || String(err);
  console.error("[launcher-ui] Failed to start:", msg);
  appendCrashLog(`listen error: ${msg}`);
  process.exit(1);
});

srv.listen(UI_PORT, UI_HOST, () => {
  const url = `http://${UI_HOST}:${UI_PORT}`;
  pushLog("ui", `Launcher UI running at ${url}`);
  pushLog("ui", `Token header: X-Bzl-Launcher: ${apiToken}`);
  pushLog("ui", `Root: ${ROOT}`);
  pushLog("ui", `CWD: ${process.cwd()}`);
  console.log(`[launcher-ui] Running at ${url}`);
  console.log("[launcher-ui] If it doesn't auto-open, paste the URL into your browser.");
  console.log(`[launcher-ui] Root: ${ROOT}`);
  console.log(`[launcher-ui] CWD: ${process.cwd()}`);
  openUrl(url);
});

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
