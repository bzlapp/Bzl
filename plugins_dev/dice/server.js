const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const HISTORY_MAX = Number(process.env.DICE_HISTORY_MAX || 120);
const MAX_DICE = Number(process.env.DICE_MAX_DICE || 100);
const MAX_SIDES = Number(process.env.DICE_MAX_SIDES || 1000);
const MAX_MOD_ABS = Number(process.env.DICE_MAX_MOD_ABS || 10000);

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

function parseExpr(raw) {
  const s = String(raw || "").trim();
  if (!s) return { ok: false, error: "Empty roll." };
  const m = s.match(/^\s*(\d*)\s*d\s*(\d+)\s*([+-]\s*\d+)?\s*$/i);
  if (!m) return { ok: false, error: "Invalid format. Use XdY+Z (example: 2d6+1)." };
  const countRaw = m[1];
  const sidesRaw = m[2];
  const modRaw = m[3] || "";
  const count = countRaw ? Number(countRaw) : 1;
  const sides = Number(sidesRaw);
  const mod = modRaw ? Number(String(modRaw).replace(/\s+/g, "")) : 0;
  if (!Number.isFinite(count) || !Number.isFinite(sides) || !Number.isFinite(mod)) {
    return { ok: false, error: "Invalid numbers in roll." };
  }
  const dice = Math.floor(count);
  const sds = Math.floor(sides);
  const md = Math.trunc(mod);
  if (dice <= 0) return { ok: false, error: "Dice count must be >= 1." };
  if (dice > MAX_DICE) return { ok: false, error: `Too many dice (max ${MAX_DICE}).` };
  if (sds < 2) return { ok: false, error: "Sides must be >= 2." };
  if (sds > MAX_SIDES) return { ok: false, error: `Too many sides (max ${MAX_SIDES}).` };
  if (Math.abs(md) > MAX_MOD_ABS) return { ok: false, error: `Modifier too large (max ±${MAX_MOD_ABS}).` };
  return { ok: true, dice, sides: sds, mod: md, expr: `${dice}d${sds}${md === 0 ? "" : md > 0 ? `+${md}` : `${md}`}` };
}

function rollOnce(sides) {
  // inclusive 1..sides
  return crypto.randomInt(1, sides + 1);
}

module.exports = function init(api) {
  const dataFile = path.join(__dirname, "dice.json");
  let history = [];

  function loadHistory() {
    const parsed = readJsonOrNull(dataFile);
    const arr = Array.isArray(parsed?.history) ? parsed.history : [];
    history = arr
      .map((r) => {
        const id = String(r?.id || "").trim().toLowerCase();
        const user = normUser(r?.user);
        const expr = String(r?.expr || "").trim().slice(0, 40);
        const dice = Number(r?.dice || 0) || 0;
        const sides = Number(r?.sides || 0) || 0;
        const mod = Number(r?.mod || 0) || 0;
        const rolls = Array.isArray(r?.rolls) ? r.rolls.map((n) => Math.max(1, Math.floor(Number(n || 0) || 0))) : [];
        const total = Number(r?.total || 0) || 0;
        const createdAt = Number(r?.createdAt || 0) || 0;
        if (!id || !user || !expr || !createdAt) return null;
        return { id, user, expr, dice, sides, mod, rolls: rolls.slice(0, MAX_DICE), total, createdAt };
      })
      .filter(Boolean)
      .slice(-HISTORY_MAX);
  }

  function saveHistory() {
    writeFileAtomic(dataFile, JSON.stringify({ version: 1, savedAt: nowMs(), history }, null, 2) + "\n");
  }

  function broadcastRoll(entry) {
    api.broadcast({ type: "plugin:dice:rolled", roll: entry });
  }

  function send(ws, msg) {
    try {
      ws.send(JSON.stringify(msg));
      return true;
    } catch {
      return false;
    }
  }

  function sendError(ws, message) {
    send(ws, { type: "plugin:dice:error", message: String(message || "Error.") });
  }

  loadHistory();

  api.registerWs("stateReq", (ws) => {
    send(ws, { type: "plugin:dice:history", history });
  });

  api.registerWs("roll", (ws, msg) => {
    const user = normUser(ws?.user?.username);
    if (!user) {
      sendError(ws, "Sign in required to roll dice.");
      return;
    }
    const parsed = parseExpr(msg?.expr);
    if (!parsed.ok) {
      sendError(ws, parsed.error);
      return;
    }
    const rolls = [];
    let sum = 0;
    for (let i = 0; i < parsed.dice; i++) {
      const r = rollOnce(parsed.sides);
      rolls.push(r);
      sum += r;
    }
    const total = sum + parsed.mod;
    const entry = {
      id: toId(6),
      user,
      expr: parsed.expr,
      dice: parsed.dice,
      sides: parsed.sides,
      mod: parsed.mod,
      rolls,
      total,
      createdAt: nowMs()
    };
    history = [...history, entry].slice(-HISTORY_MAX);
    saveHistory();
    broadcastRoll(entry);
  });
};

