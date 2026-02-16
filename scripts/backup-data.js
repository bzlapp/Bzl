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

function copyIfExists(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return false;
  fs.cpSync(srcPath, destPath, { recursive: true, force: true });
  return true;
}

function main() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(BACKUP_ROOT, { recursive: true });

  const name = `backup-${timestamp()}`;
  const targetDir = path.join(BACKUP_ROOT, name);
  fs.mkdirSync(targetDir, { recursive: false });

  const copied = [];
  for (const rel of TARGETS) {
    const src = path.join(DATA_DIR, rel);
    const dest = path.join(targetDir, rel);
    if (copyIfExists(src, dest)) copied.push(rel);
  }

  const manifest = {
    version: 1,
    createdAt: Date.now(),
    createdAtIso: new Date().toISOString(),
    dataDir: DATA_DIR,
    backupRoot: BACKUP_ROOT,
    backupName: name,
    copied
  };
  fs.writeFileSync(path.join(targetDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");

  console.log(`Created backup: ${targetDir}`);
  if (!copied.length) console.log("No runtime files existed yet; backup contains only manifest.");
  else console.log(`Copied: ${copied.join(", ")}`);
}

try {
  main();
} catch (e) {
  console.error("Backup failed:", e?.message || e);
  process.exit(1);
}
