const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { spawn } = require("child_process");
const readline = require("readline");

const ROOT = path.join(__dirname, "..");
const ENV_EXAMPLE = path.join(ROOT, ".env.example");
const ENV_FILE = path.join(ROOT, ".env");

function log(msg) {
  console.log(`[bzl-init] ${msg}`);
}

function warn(msg) {
  console.warn(`[bzl-init] WARN: ${msg}`);
}

function fail(msg) {
  console.error(`[bzl-init] ERROR: ${msg}`);
  process.exit(1);
}

function nodeMajor() {
  const m = String(process.versions.node || "").match(/^(\d+)\./);
  return m ? Number(m[1]) : 0;
}

function isWin() {
  return process.platform === "win32";
}

function randomToken(bytes = 24) {
  return crypto.randomBytes(bytes).toString("hex");
}

function question(rl, prompt, { defaultValue = "" } = {}) {
  const suffix = defaultValue ? ` (${defaultValue})` : "";
  return new Promise((resolve) => {
    rl.question(`${prompt}${suffix}: `, (answer) => {
      const v = String(answer || "").trim();
      resolve(v || defaultValue);
    });
  });
}

function questionYesNo(rl, prompt, { defaultYes = true } = {}) {
  const def = defaultYes ? "Y/n" : "y/N";
  return new Promise((resolve) => {
    rl.question(`${prompt} [${def}]: `, (answer) => {
      const v = String(answer || "").trim().toLowerCase();
      if (!v) return resolve(defaultYes);
      if (v === "y" || v === "yes") return resolve(true);
      if (v === "n" || v === "no") return resolve(false);
      resolve(defaultYes);
    });
  });
}

function parseEnvTemplate(template) {
  const lines = String(template || "").split(/\r?\n/);
  const entries = [];
  for (const line of lines) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) {
      entries.push({ type: "kv", key: m[1], raw: line });
    } else {
      entries.push({ type: "raw", raw: line });
    }
  }
  return entries;
}

function renderEnv(entries, values) {
  return (
    entries
      .map((e) => {
        if (e.type !== "kv") return e.raw;
        const key = e.key;
        if (!(key in values)) return e.raw;
        const val = String(values[key] ?? "");
        return `${key}=${val}`;
      })
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trimEnd() + "\n"
  );
}

function npmCmd() {
  return isWin() ? "npm.cmd" : "npm";
}

function spawnInherit(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", cwd: ROOT, env: process.env, ...opts });
    child.on("error", reject);
    child.on("exit", (code) => resolve(code || 0));
  });
}

async function runNpm(args) {
  if (isWin()) {
    // On Windows, `.cmd` isn't directly executable via CreateProcess. Run through `cmd.exe /c`.
    return await spawnInherit("cmd", ["/d", "/s", "/c", npmCmd(), ...args]);
  }
  return await spawnInherit(npmCmd(), args);
}

function hasNodeModules() {
  try {
    return fs.existsSync(path.join(ROOT, "node_modules")) && fs.statSync(path.join(ROOT, "node_modules")).isDirectory();
  } catch {
    return false;
  }
}

function ensureDataDirs() {
  const dirs = [
    path.join(ROOT, "data"),
    path.join(ROOT, "data", "uploads"),
    path.join(ROOT, "data", "plugins"),
    path.join(ROOT, "data", "plugin-data")
  ];
  for (const d of dirs) {
    try {
      fs.mkdirSync(d, { recursive: true });
    } catch {
      // ignore
    }
  }
}

function usersFilePath() {
  return process.env.USERS_FILE || path.join(ROOT, "data", "users.json");
}

function normalizeUsername(username) {
  if (typeof username !== "string") return "";
  const cleaned = username.trim().toLowerCase();
  if (!cleaned) return "";
  if (cleaned.length > 32) return "";
  if (!/^[a-z0-9_][a-z0-9_.-]*$/.test(cleaned)) return "";
  return cleaned;
}

function hashPassword(password, saltHex) {
  const salt = Buffer.from(saltHex, "hex");
  const derived = crypto.scryptSync(String(password), salt, 64);
  return derived.toString("hex");
}

function loadUsers() {
  const file = usersFilePath();
  try {
    const raw = fs.readFileSync(file, "utf8");
    const data = JSON.parse(raw);
    const list = Array.isArray(data) ? data : Array.isArray(data?.users) ? data.users : [];
    return { version: 1, users: Array.isArray(list) ? list : [] };
  } catch (e) {
    if (e?.code === "ENOENT") return { version: 1, users: [] };
    throw e;
  }
}

function userExists(username) {
  const u = normalizeUsername(username);
  if (!u) return false;
  const data = loadUsers();
  return (data.users || []).some((x) => normalizeUsername(String(x?.username || "")) === u);
}

function saveUsers(data) {
  const file = usersFilePath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify({ version: 1, users: data.users }, null, 2) + "\n", "utf8");
}

function addUser({ username, password }) {
  const u = normalizeUsername(username);
  if (!u) throw new Error("Invalid username. Allowed: a-z 0-9 _ . - (max 32 chars).");
  if (typeof password !== "string" || password.length < 4) throw new Error("Password too short (min 4).");

  const data = loadUsers();
  const exists = (data.users || []).some((x) => normalizeUsername(String(x?.username || "")) === u);
  if (exists) throw new Error(`User "${u}" already exists in ${usersFilePath()}`);

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(password, salt);
  const isFirst = (data.users || []).length === 0;
  const role = isFirst ? "owner" : "member";

  data.users.push({
    username: u,
    salt,
    hash,
    role,
    customRoles: [],
    mutedUntil: 0,
    suspendedUntil: 0,
    banned: false,
    pronouns: "",
    bioHtml: "",
    themeSongUrl: "",
    links: [],
    starredPostIds: [],
    hiddenPostIds: [],
    createdAt: Date.now()
  });

  saveUsers(data);
  return { username: u, role };
}

async function main() {
  if (nodeMajor() < 18) {
    fail(`Node.js 18+ required. Detected: ${process.versions.node}`);
  }
  if (!fs.existsSync(ENV_EXAMPLE)) {
    fail("Missing .env.example (expected at repo root).");
  }

  log("Welcome! This wizard sets up local configuration for Bzl.");
  log("It can also install dependencies and create your first user.");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  try {
    const portRaw = await question(rl, "Port", { defaultValue: "3000" });
    const port = Math.max(1, Math.min(65535, Math.floor(Number(portRaw || 3000))));

    const host = await question(rl, "Host bind address", { defaultValue: "0.0.0.0" });
    const allowRegistrations = await questionYesNo(rl, "Enable account registration code?", { defaultYes: false });

    let registrationCode = "";
    if (allowRegistrations) {
      const code = await question(rl, "Registration code (leave blank to generate)", { defaultValue: "" });
      registrationCode = code || randomToken(18);
      log(`Registration code set to: ${registrationCode}`);
    }

    const createOwner = await questionYesNo(rl, "Create first user now (becomes owner if first)?", { defaultYes: true });
    let ownerUsername = "";
    if (createOwner) {
      ownerUsername = await question(rl, "Owner username (a-z 0-9 _ . -)", { defaultValue: "owner" });
    }

    const installDeps = !hasNodeModules()
      ? await questionYesNo(rl, "node_modules not found. Run npm install now?", { defaultYes: true })
      : await questionYesNo(rl, "Run npm install to ensure dependencies are up to date?", { defaultYes: false });

    // .env
    const template = fs.readFileSync(ENV_EXAMPLE, "utf8");
    const entries = parseEnvTemplate(template);
    const values = {
      PORT: String(port),
      HOST: host,
      REGISTRATION_CODE: registrationCode ? `"${registrationCode}"` : ""
    };

    if (fs.existsSync(ENV_FILE)) {
      const overwrite = await questionYesNo(rl, ".env already exists. Overwrite it?", { defaultYes: false });
      if (overwrite) {
        fs.writeFileSync(ENV_FILE, renderEnv(entries, values), "utf8");
        log("Wrote .env");
      } else {
        log("Keeping existing .env");
      }
    } else {
      fs.writeFileSync(ENV_FILE, renderEnv(entries, values), "utf8");
      log("Wrote .env");
    }

    ensureDataDirs();

    if (installDeps) {
      log("Installing dependencies...");
      const code = await runNpm(["install"]);
      if (code !== 0) fail("npm install failed.");
    }

    if (createOwner && ownerUsername) {
      if (userExists(ownerUsername)) {
        warn(`User "${normalizeUsername(ownerUsername)}" already exists. Skipping user creation.`);
      } else {
        log("Creating user (password input will be visible)...");
        let created = null;
        for (let attempt = 1; attempt <= 3; attempt += 1) {
          const pass1 = await question(rl, "Password", { defaultValue: "" });
          const pass2 = await question(rl, "Confirm password", { defaultValue: "" });
          if (pass1 !== pass2) {
            warn("Passwords did not match. Try again.");
            continue;
          }
          try {
            created = addUser({ username: ownerUsername, password: pass1 });
            break;
          } catch (e) {
            warn(e?.message || String(e));
          }
        }
        if (!created) fail("Failed to create user after 3 attempts.");
        log(`Created "${created.username}" (${created.role}).`);
      }
    }

    log("Setup complete.");
    log("Start the server with:");
    log("  npm start");
    log("Or supervised (auto-restart) with:");
    log("  npm run start:supervised");
    log(`Then open: http://localhost:${port}`);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  fail(err?.message || String(err));
});
