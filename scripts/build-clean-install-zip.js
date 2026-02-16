const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "CLEAN_INSTALL");
const OUT_DIR = path.join(ROOT, "dist");

function readPkgVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    return String(pkg?.version || "0.0.0").trim() || "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function shouldSkip(rel) {
  const r = rel.replace(/\\/g, "/");
  if (!r) return false;
  if (r.startsWith(".git/")) return true;
  if (r.startsWith("node_modules/")) return true;
  if (r.startsWith("data/")) return true;
  if (r.startsWith("dist/") && !r.startsWith("dist/plugins/")) return true;
  if (r.endsWith(".log")) return true;
  return false;
}

function walk(dir, baseRel = "") {
  const out = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const abs = path.join(dir, it.name);
    const rel = path.join(baseRel, it.name);
    if (shouldSkip(rel)) continue;
    if (it.isDirectory()) out.push(...walk(abs, rel));
    else if (it.isFile()) out.push({ abs, rel });
  }
  return out;
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error("Missing CLEAN_INSTALL directory.");
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const version = readPkgVersion();
  const outPath = path.join(OUT_DIR, `Bzl-CLEAN_INSTALL-v${version}.zip`);

  const zip = new AdmZip();
  const files = walk(SRC, "");
  for (const f of files) {
    zip.addLocalFile(f.abs, path.dirname(f.rel), path.basename(f.rel));
  }
  zip.writeZip(outPath);

  console.log(`Built: ${outPath}`);
}

main();

