const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(ROOT_DIR, "data"));
const BACKUP_ROOT = path.resolve(process.env.BACKUP_DIR || path.join(DATA_DIR, "backups"));
const TARGETS = ["users.json", "posts.json", "reports.json", "mod-log.json", "sessions.json", "uploads"];

function pad2(value) {
  return String(value).padStart(2, "0");
}

function timestamp() {
  const d = new Date();
  return [
    d.getFullYear(),
    pad2(d.getMonth() + 1),
    pad2(d.getDate()),
    "-",
    pad2(d.getHours()),
    pad2(d.getMinutes()),
    pad2(d.getSeconds())
  ].join("");
}

function parseArgs(argv) {
  const out = { yes: false, list: false, name: "" };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--yes") out.yes = true;
    else if (token === "--list") out.list = true;
    else if (token === "--name") out.name = String(argv[i + 1] || "");
  }
  return out;
}

function listBackups() {
  if (!fs.existsSync(BACKUP_ROOT)) return [];
  return fs
    .readdirSync(BACKUP_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const full = path.join(BACKUP_ROOT, e.name);
      const stat = fs.statSync(full);
      return { name: e.name, full, mtimeMs: Number(stat.mtimeMs || 0) };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);
}

function createPreRestoreSnapshot() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(BACKUP_ROOT, { recursive: true });
  const name = `pre-restore-${timestamp()}`;
  const destDir = path.join(BACKUP_ROOT, name);
  fs.mkdirSync(destDir, { recursive: false });
  const copied = [];
  for (const rel of TARGETS) {
    const src = path.join(DATA_DIR, rel);
    if (!fs.existsSync(src)) continue;
    fs.cpSync(src, path.join(destDir, rel), { recursive: true, force: true });
    copied.push(rel);
  }
  fs.writeFileSync(
    path.join(destDir, "manifest.json"),
    JSON.stringify(
      {
        version: 1,
        createdAt: Date.now(),
        createdAtIso: new Date().toISOString(),
        kind: "pre-restore",
        copied
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
  return destDir;
}

function resetTarget(dest) {
  if (!fs.existsSync(dest)) return;
  fs.rmSync(dest, { recursive: true, force: true });
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const backups = listBackups();

  if (args.list) {
    if (!backups.length) {
      console.log("No backups found.");
      return;
    }
    for (const b of backups) console.log(b.name);
    return;
  }

  if (!backups.length) {
    console.error(`No backups found in ${BACKUP_ROOT}`);
    process.exit(1);
  }

  const selected = args.name ? backups.find((b) => b.name === args.name) : backups[0];
  if (!selected) {
    console.error(`Backup not found: ${args.name}`);
    process.exit(1);
  }

  if (!args.yes) {
    console.error("Restore requires --yes (it overwrites current runtime data).");
    console.error(`Try: node scripts/restore-data.js --name ${selected.name} --yes`);
    process.exit(1);
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const preRestorePath = createPreRestoreSnapshot();

  const restored = [];
  for (const rel of TARGETS) {
    const from = path.join(selected.full, rel);
    const to = path.join(DATA_DIR, rel);
    resetTarget(to);
    if (!fs.existsSync(from)) continue;
    fs.cpSync(from, to, { recursive: true, force: true });
    restored.push(rel);
  }

  console.log(`Restored backup: ${selected.full}`);
  console.log(`Pre-restore snapshot: ${preRestorePath}`);
  if (restored.length) console.log(`Restored targets: ${restored.join(", ")}`);
  else console.log("Selected backup had no data targets.");
}

try {
  main();
} catch (e) {
  console.error("Restore failed:", e?.message || e);
  process.exit(1);
}
