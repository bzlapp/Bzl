const { spawn } = require("child_process");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const SERVER_ENTRY = path.join(ROOT_DIR, "server.js");
const PORT = Number(process.env.PORT || 3000);
const HEALTHCHECK_URL = process.env.HEALTHCHECK_URL || `http://127.0.0.1:${PORT}/api/health`;
const HEALTHCHECK_MS = Number(process.env.HEALTHCHECK_MS || 15_000);
const HEALTHCHECK_TIMEOUT_MS = Number(process.env.HEALTHCHECK_TIMEOUT_MS || 4_000);
const HEALTHCHECK_FAILS = Number(process.env.HEALTHCHECK_FAILS || 3);
const RESTART_MIN_MS = Number(process.env.RESTART_MIN_MS || 2_000);
const RESTART_MAX_MS = Number(process.env.RESTART_MAX_MS || 30_000);

let child = null;
let stopping = false;
let checkTimer = null;
let restarting = false;
let backoffMs = RESTART_MIN_MS;
let consecutiveHealthFails = 0;

function log(msg) {
  console.log(`[runner] ${msg}`);
}

async function healthcheck() {
  if (!child || child.killed) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HEALTHCHECK_TIMEOUT_MS);
  try {
    const res = await fetch(HEALTHCHECK_URL, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json().catch(() => ({}));
    if (!body || body.ok !== true) throw new Error("Invalid health payload");
    consecutiveHealthFails = 0;
  } catch (e) {
    consecutiveHealthFails += 1;
    log(`Healthcheck failed (${consecutiveHealthFails}/${HEALTHCHECK_FAILS}): ${e?.message || e}`);
    if (consecutiveHealthFails >= HEALTHCHECK_FAILS) {
      log("Healthcheck threshold exceeded. Restarting server process.");
      restartChild("healthcheck");
    }
  } finally {
    clearTimeout(timer);
  }
}

function scheduleChecks() {
  if (checkTimer) clearInterval(checkTimer);
  checkTimer = setInterval(() => {
    healthcheck().catch(() => {
      // ignore
    });
  }, Math.max(1000, HEALTHCHECK_MS));
}

function clearChecks() {
  if (checkTimer) clearInterval(checkTimer);
  checkTimer = null;
}

function spawnChild() {
  consecutiveHealthFails = 0;
  const nodeExe = process.execPath;
  child = spawn(nodeExe, [SERVER_ENTRY], {
    cwd: ROOT_DIR,
    env: process.env,
    stdio: "inherit"
  });
  log(`Started server (pid ${child.pid})`);

  child.on("exit", (code, signal) => {
    const wasStopping = stopping;
    const detail = signal ? `signal=${signal}` : `code=${code}`;
    log(`Server exited (${detail})`);
    child = null;
    if (wasStopping) return;
    restartChild("exit");
  });
}

function restartChild(reason) {
  if (stopping || restarting) return;
  restarting = true;
  clearChecks();
  const delay = backoffMs;
  backoffMs = Math.min(RESTART_MAX_MS, Math.floor(backoffMs * 1.8));

  const finishRestart = () => {
    restarting = false;
    if (stopping) return;
    spawnChild();
    scheduleChecks();
  };

  if (child && !child.killed) {
    try {
      child.kill("SIGTERM");
    } catch {
      // ignore
    }
  }
  log(`Restart scheduled in ${delay}ms (reason: ${reason})`);
  setTimeout(finishRestart, delay);
}

function shutdown(signal) {
  if (stopping) return;
  stopping = true;
  clearChecks();
  log(`Stopping runner (${signal})`);
  if (child && !child.killed) {
    try {
      child.kill("SIGTERM");
    } catch {
      // ignore
    }
    setTimeout(() => {
      if (child && !child.killed) {
        try {
          child.kill("SIGKILL");
        } catch {
          // ignore
        }
      }
      process.exit(0);
    }, 5_000);
  } else {
    process.exit(0);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

log(`Health URL: ${HEALTHCHECK_URL}`);
spawnChild();
scheduleChecks();
