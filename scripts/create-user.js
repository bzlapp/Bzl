const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const readline = require("readline");

const USERS_FILE = process.env.USERS_FILE || path.join(__dirname, "..", "data", "users.json");

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
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf8");
    const data = JSON.parse(raw);
    const list = Array.isArray(data) ? data : Array.isArray(data?.users) ? data.users : [];
    return { version: 1, users: list };
  } catch (e) {
    if (e?.code === "ENOENT") return { version: 1, users: [] };
    throw e;
  }
}

function normalizeUsernameList(users) {
  if (!Array.isArray(users)) return [];
  return users.filter((u) => u && typeof u === "object");
}

function saveUsers(data) {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify({ version: 1, users: data.users }, null, 2) + "\n", "utf8");
}

async function promptHidden(query) {
  return await new Promise((resolve) => {
    // Some Windows shells / double-clicked wrappers can behave oddly with manual stdin listeners.
    // Use readline's built-in masking approach, and fall back to visible input when not a TTY.
    if (!process.stdin.isTTY || !process.stdout.isTTY) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
      rl.question(`${query}(input will be visible) `, (value) => {
        rl.close();
        resolve(value);
      });
      return;
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl.stdoutMuted = true;
    // eslint-disable-next-line no-underscore-dangle
    rl._writeToOutput = function _writeToOutput(stringToWrite) {
      const s = String(stringToWrite || "");
      if (!rl.stdoutMuted) return rl.output.write(s);
      // Preserve newlines (enter) so the prompt advances properly.
      if (s === "\n" || s === "\r\n" || s === "\r") return rl.output.write(s);
      return rl.output.write("*");
    };

    try {
      rl.output.write(query);
    } catch {
      // ignore
    }
    rl.question("", (value) => {
      rl.history = rl.history.slice(1);
      rl.close();
      try {
        process.stdout.write("\n");
      } catch {
        // ignore
      }
      resolve(value);
    });
  });
}

async function main() {
  const rawUsername = process.argv[2] || "";
  const username = normalizeUsername(rawUsername);
  if (!username) {
    console.error('Usage: node scripts/create-user.js <username>\nAllowed: a-z 0-9 _ . - (max 32 chars)');
    process.exit(1);
  }

  const password = await promptHidden("Password: ");
  const confirm = await promptHidden("Confirm:  ");
  if (password !== confirm) {
    console.error("\nPasswords did not match.");
    process.exit(1);
  }
  if (password.length < 4) {
    console.error("\nPassword too short (min 4).");
    process.exit(1);
  }

  const data = loadUsers();
  data.users = normalizeUsernameList(data.users);
  const exists = (data.users || []).some((u) => normalizeUsername(u?.username) === username);
  if (exists) {
    console.error(`\nUser "${username}" already exists in ${USERS_FILE}`);
    process.exit(1);
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(password, salt);
  const isFirst = data.users.length === 0;
  const role = isFirst ? "owner" : "member";
  data.users.push({
    username,
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
  console.log(`\nCreated "${username}" (${role}) in ${USERS_FILE}`);
}

main().catch((err) => {
  console.error("Failed:", err?.message || err);
  process.exit(1);
});
