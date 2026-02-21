const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

function log(msg) {
  console.log(`[instance-create] ${msg}`);
}

function fail(msg) {
  console.error(`[instance-create] ERROR: ${msg}`);
  process.exit(1);
}

function parseArgs() {
  const out = {};
  for (const raw of process.argv.slice(2)) {
    const a = String(raw || "");
    if (!a.startsWith("--")) continue;
    const eq = a.indexOf("=");
    if (eq > -1) out[a.slice(2, eq)] = a.slice(eq + 1);
    else out[a.slice(2)] = "1";
  }
  return out;
}

function expandHome(value) {
  const v = String(value || "").trim();
  if (!v.startsWith("~")) return v;
  const home = process.env.HOME || process.env.USERPROFILE || "";
  if (!home) return v;
  if (v === "~") return home;
  if (v.startsWith("~/") || v.startsWith("~\\")) return path.join(home, v.slice(2));
  return v;
}

function displayPath(filePath) {
  const abs = path.resolve(filePath);
  const rel = path.relative(process.cwd(), abs);
  if (rel && !rel.startsWith("..") && !path.isAbsolute(rel)) return rel.replace(/\\/g, "/");
  return abs.replace(/\\/g, "/");
}

function run(cmd, args, cwd, { dryRun = false } = {}) {
  const printable = `${cmd} ${args.join(" ")}`;
  if (dryRun) {
    log(`[dry-run] ${printable} (cwd=${displayPath(cwd)})`);
    return 0;
  }
  const result = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: false });
  if (result.error) fail(`${printable} failed to start: ${result.error?.message || result.error}`);
  const code = result.status || 0;
  if (code !== 0) fail(`${printable} failed with exit code ${code}`);
  return code;
}

function randomCode(bytes = 18) {
  return crypto.randomBytes(bytes).toString("base64url");
}

function parseEnv(body) {
  const map = new Map();
  const lines = String(body || "").split(/\r?\n/);
  for (const line of lines) {
    const s = String(line || "");
    const m = s.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    map.set(m[1], m[2]);
  }
  return map;
}

function setEnvKey(body, key, value) {
  const lines = String(body || "").split(/\r?\n/);
  let replaced = false;
  const out = lines.map((line) => {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) return line;
    if (m[1] !== key) return line;
    replaced = true;
    return `${key}=${value}`;
  });
  if (!replaced) out.push(`${key}=${value}`);
  return `${out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd()}\n`;
}

function main() {
  const args = parseArgs();
  const repo = String(args.repo || "https://github.com/bzlapp/Bzl.git").trim();
  const branch = String(args.branch || "main").trim();
  const targetPathRaw = String(args.path || "").trim();
  const hostname = String(args.hostname || "").trim().toLowerCase();
  const dryRun = args["dry-run"] === "1";
  const noStart = args["no-start"] === "1";

  if (!targetPathRaw) fail("Missing --path=/absolute/or/relative/path");
  const targetPath = path.resolve(expandHome(targetPathRaw));

  const port = Number(args.port || 0);
  if (!Number.isInteger(port) || port < 1024 || port > 65535) fail("--port must be an integer between 1024 and 65535.");

  const registrationCode = String(args["registration-code"] || randomCode()).trim();
  if (!registrationCode) fail("registration code resolved empty");

  const exists = fs.existsSync(targetPath);
  if (exists) {
    const list = fs.readdirSync(targetPath).filter((x) => x !== "." && x !== "..");
    if (list.length) fail(`Target path is not empty: ${displayPath(targetPath)}`);
  } else if (!dryRun) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  run("git", ["clone", "--branch", branch, repo, targetPath], ROOT, { dryRun });

  const envExample = path.join(targetPath, ".env.example");
  const envFile = path.join(targetPath, ".env");

  if (dryRun) {
    log(`[dry-run] would create/update ${displayPath(envFile)} with PORT=${port}, HOST=0.0.0.0, REGISTRATION_CODE=...`);
  } else {
    let base = "";
    if (fs.existsSync(envFile)) base = fs.readFileSync(envFile, "utf8");
    else if (fs.existsSync(envExample)) base = fs.readFileSync(envExample, "utf8");
    else base = "";

    let next = setEnvKey(base, "PORT", String(port));
    next = setEnvKey(next, "HOST", "0.0.0.0");
    next = setEnvKey(next, "REGISTRATION_CODE", registrationCode);
    fs.writeFileSync(envFile, next, "utf8");
    log(`Wrote ${displayPath(envFile)}`);
  }

  if (!noStart) {
    run("docker", ["compose", "-f", "compose.yaml", "up", "-d", "--build", "--remove-orphans"], targetPath, { dryRun });
  }

  console.log("");
  console.log("Instance created.");
  console.log(`- Path: ${displayPath(targetPath)}`);
  console.log(`- Port: ${port}`);
  console.log(`- Registration code: ${registrationCode}`);
  if (hostname) {
    console.log("");
    console.log("Caddy reminder:");
    console.log(`${hostname} {`);
    console.log(`  reverse_proxy 127.0.0.1:${port}`);
    console.log("}");
  }
}

main();
