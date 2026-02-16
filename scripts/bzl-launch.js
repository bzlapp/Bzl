const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.join(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".env");

function log(msg) {
  console.log(`[bzl-launch] ${msg}`);
}

function warn(msg) {
  console.warn(`[bzl-launch] WARN: ${msg}`);
}

function fail(msg) {
  console.error(`[bzl-launch] ERROR: ${msg}`);
  process.exit(1);
}

function isWin() {
  return process.platform === "win32";
}

function readEnvFile() {
  try {
    const raw = fs.readFileSync(ENV_PATH, "utf8");
    const out = {};
    for (const line of raw.split(/\r?\n/)) {
      const s = line.trim();
      if (!s || s.startsWith("#")) continue;
      const m = s.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      let v = m[2] || "";
      v = v.trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      out[m[1]] = v;
    }
    return out;
  } catch {
    return null;
  }
}

function mergeEnv(baseEnv, fromEnvFile) {
  const out = { ...(baseEnv || {}) };
  const src = fromEnvFile && typeof fromEnvFile === "object" ? fromEnvFile : {};
  for (const [k, v] of Object.entries(src)) {
    if (out[k] == null || String(out[k]) === "") out[k] = String(v ?? "");
  }
  return out;
}

function getPortFromEnv() {
  const fromProc = Number(process.env.PORT || 0);
  if (Number.isFinite(fromProc) && fromProc > 0) return Math.floor(fromProc);
  const env = readEnvFile();
  const fromFile = Number(env?.PORT || 0);
  if (Number.isFinite(fromFile) && fromFile > 0) return Math.floor(fromFile);
  return 3000;
}

function getHostFromEnv() {
  const fromProc = String(process.env.HOST || "").trim();
  if (fromProc) return fromProc;
  const env = readEnvFile();
  const fromFile = String(env?.HOST || "").trim();
  return fromFile || "0.0.0.0";
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    supervised: true,
    open: true,
    cloudflared: "off", // off | quick | named
    logFile: ""
  };
  for (const a of args) {
    if (a === "--no-open") opts.open = false;
    if (a === "--open") opts.open = true;
    if (a === "--supervised") opts.supervised = true;
    if (a === "--no-supervised") opts.supervised = false;
    if (a === "--cloudflared") opts.cloudflared = "quick";
    if (a === "--no-cloudflared") opts.cloudflared = "off";
    if (a.startsWith("--log=")) {
      opts.logFile = String(a.split("=", 2)[1] || "").trim();
    }
    if (a.startsWith("--cloudflared=")) {
      const v = String(a.split("=", 2)[1] || "").trim().toLowerCase();
      if (v === "off" || v === "quick" || v === "named") opts.cloudflared = v;
    }
  }
  return opts;
}

function getJson(url, { timeoutMs = 1500 } = {}) {
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

async function healthcheck(url, { timeoutMs = 1500 } = {}) {
  const res = await getJson(url, { timeoutMs });
  return res?.ok === true && res?.json?.ok === true;
}

async function waitForHealthy(url, { maxMs = 20_000 } = {}) {
  const t0 = Date.now();
  while (Date.now() - t0 < maxMs) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await healthcheck(url);
    if (ok) return true;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

function openUrl(url) {
  const u = String(url || "").trim();
  if (!u) return;
  if (isWin()) {
    const trySpawn = (cmd, args, onFail) => {
      try {
        const child = spawn(cmd, args, { stdio: "ignore", detached: true, windowsHide: true });
        child.once("error", () => (typeof onFail === "function" ? onFail() : undefined));
        child.unref();
      } catch {
        if (typeof onFail === "function") onFail();
      }
    };
    const escapePsSingleQuoted = (s) => `'${String(s || "").replaceAll("'", "''")}'`;
    trySpawn("powershell.exe", ["-NoProfile", "-Command", `Start-Process ${escapePsSingleQuoted(u)}`], () =>
      trySpawn("cmd.exe", ["/d", "/s", "/c", "start", "", u], () =>
        trySpawn("rundll32.exe", ["url.dll,FileProtocolHandler", u])
      )
    );
    return;
  }
  if (process.platform === "darwin") {
    const child = spawn("open", [u], { stdio: "ignore", detached: true, windowsHide: true });
    child.on("error", () => {});
    child.unref();
    return;
  }
  const child = spawn("xdg-open", [u], { stdio: "ignore", detached: true, windowsHide: true });
  child.on("error", () => {});
  child.unref();
}

function teeStreamTo(stream, out, fileStream) {
  if (!stream) return;
  stream.on("data", (chunk) => {
    try {
      out.write(chunk);
    } catch {
      // ignore
    }
    try {
      if (fileStream) fileStream.write(chunk);
    } catch {
      // ignore
    }
  });
}

function spawnServer({ supervised, fileStream }) {
  const entry = supervised ? path.join(ROOT, "scripts", "service-runner.js") : path.join(ROOT, "server.js");
  const args = [entry];
  const childEnv = mergeEnv(process.env, readEnvFile());
  const child = spawn(process.execPath, args, { cwd: ROOT, env: childEnv, stdio: ["inherit", "pipe", "pipe"] });
  teeStreamTo(child.stdout, process.stdout, fileStream);
  teeStreamTo(child.stderr, process.stderr, fileStream);
  child.on("exit", (code) => {
    const c = Number(code || 0);
    if (c !== 0) warn(`Server process exited (code ${c}).`);
  });
  return child;
}

function defaultCloudflaredConfigPath() {
  const env = readEnvFile();
  const fromEnv = String(process.env.CLOUDFLARED_CONFIG || env?.CLOUDFLARED_CONFIG || "").trim();
  if (fromEnv) return fromEnv;
  const home = process.env.USERPROFILE || process.env.HOME || "";
  const userCfg = home ? path.join(home, ".cloudflared", "config.yml") : "";
  const localCfg = path.join(ROOT, "cloudflared", "config.yml");
  if (userCfg && fs.existsSync(userCfg)) return userCfg;
  if (fs.existsSync(localCfg)) return localCfg;
  return userCfg || localCfg;
}

function parseTunnelIdFromConfig(configPath) {
  try {
    const raw = fs.readFileSync(configPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*tunnel\s*:\s*(.+?)\s*$/);
      if (m) return String(m[1] || "").trim().replace(/^['"]|['"]$/g, "");
    }
    return "";
  } catch {
    return "";
  }
}

function spawnCloudflared({ mode, port }) {
  if (mode === "off") return null;

  const localUrl = `http://localhost:${port}`;
  const env = readEnvFile();
  const tunnelFromEnv = String(process.env.CLOUDFLARED_TUNNEL || env?.CLOUDFLARED_TUNNEL || "").trim();
  const cfg = defaultCloudflaredConfigPath();

  // Fail early if cloudflared isn't installed.
  try {
    const probe = spawn("cloudflared", ["--version"], { cwd: ROOT, env: process.env, stdio: "ignore" });
    probe.on("error", () => {
      warn("cloudflared not found on PATH. Install it first (Windows: winget install Cloudflare.cloudflared).");
    });
  } catch {
    warn("cloudflared not found on PATH. Install it first (Windows: winget install Cloudflare.cloudflared).");
  }

  let args = [];
  if (mode === "quick") {
    args = ["tunnel", "--url", localUrl];
  } else if (mode === "named") {
    const tunnel = tunnelFromEnv || (cfg && fs.existsSync(cfg) ? parseTunnelIdFromConfig(cfg) : "");
    if (!tunnel) {
      warn("Named tunnel requested but no tunnel id found. Set CLOUDFLARED_TUNNEL or provide a config.yml with `tunnel:`.");
      return null;
    }
    if (cfg && fs.existsSync(cfg)) {
      args = ["--config", cfg, "tunnel", "run", tunnel];
    } else {
      args = ["tunnel", "run", tunnel];
    }
  }

  log(`Starting cloudflared (${mode})...`);
  if (mode === "quick") log("cloudflared will print a public URL (trycloudflare.com) in the console.");

  const child = spawn("cloudflared", args, { cwd: ROOT, env: mergeEnv(process.env, env), stdio: "inherit" });
  child.on("error", (e) => warn(`cloudflared failed to start: ${e?.message || e}`));
  child.on("exit", (code) => {
    const c = Number(code || 0);
    if (c !== 0) warn(`cloudflared exited (code ${c}).`);
  });
  return child;
}

async function main() {
  const { supervised, open, cloudflared, logFile } = parseArgs();
  const port = getPortFromEnv();
  const host = getHostFromEnv();

  if (!fs.existsSync(ENV_PATH)) {
    warn("No .env found. Consider running `npm run init` first.");
  }

  const localUrl = `http://localhost:${port}`;
  const healthUrl = `http://127.0.0.1:${port}/api/health`;

  log(`Launching Bzl (${supervised ? "supervised" : "direct"})...`);
  log(`Bind: ${host}:${port}`);
  log(`URL:  ${localUrl}`);

  let fileStream = null;
  if (logFile) {
    try {
      const abs = path.isAbsolute(logFile) ? logFile : path.join(ROOT, logFile);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fileStream = fs.createWriteStream(abs, { flags: "a" });
      fileStream.write(`--- ${new Date().toISOString()} ---\n`);
      log(`Logging to: ${abs}`);
    } catch (e) {
      warn(`Failed to open log file: ${e?.message || e}`);
    }
  }

  const server = spawnServer({ supervised, fileStream });
  const tunnel = spawnCloudflared({ mode: cloudflared, port });

  const shutdown = () => {
    try {
      if (tunnel && !tunnel.killed) tunnel.kill("SIGTERM");
    } catch {
      // ignore
    }
    try {
      if (server && !server.killed) server.kill("SIGTERM");
    } catch {
      // ignore
    }
    try {
      if (fileStream) fileStream.end();
    } catch {
      // ignore
    }
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  const ok = await waitForHealthy(healthUrl);
  if (!ok) {
    warn("Server did not become healthy within 20s. It may still be starting—check the console output.");
    process.exitCode = 1;
    return;
  }

  log("Server is healthy.");
  if (open) openUrl(localUrl);

  // Keep this launcher process alive; if it exits, a double-clicked console window will close
  // and can terminate the child processes (server/tunnel) on Windows.
  log("Press Ctrl+C to stop.");
  await new Promise((resolve) => {
    server.on("exit", () => resolve());
  });
}

main().catch((err) => fail(err?.message || String(err)));
