const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const BZL_COMPOSE_FILES = ["compose.yaml", "compose.yml", "docker-compose.yml", "docker-compose.yaml"];
const DEFAULT_MAX_DEPTH = 4;
const SKIP_DIR_NAMES = new Set([
  ".git",
  "node_modules",
  "data",
  "dist",
  "clean_install",
  "multi_instance",
  "tmp",
  "temp",
  "proc",
  "sys",
  "dev",
  "run",
  "usr",
  "lib",
  "lib64",
  "bin",
  "sbin",
  "etc",
  "boot",
  "mnt",
  "media",
  "snap",
  "lost+found",
  "__pycache__"
]);

function log(msg) {
  console.log(`[instances] ${msg}`);
}

function warn(msg) {
  console.warn(`[instances] WARN: ${msg}`);
}

function fail(msg) {
  console.error(`[instances] ERROR: ${msg}`);
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

function splitList(raw, fallback) {
  const text = String(raw || "").trim();
  if (!text) return fallback;
  return text
    .split(",")
    .map((x) => expandHome(String(x || "").trim()))
    .filter(Boolean);
}

function shouldSkipDir(name) {
  const n = String(name || "").trim().toLowerCase();
  if (!n) return true;
  return SKIP_DIR_NAMES.has(n);
}

function isExistingFile(filePath) {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function isExistingDir(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

function readPackageJson(dir) {
  try {
    const pkgPath = path.join(dir, "package.json");
    return JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  } catch {
    return null;
  }
}

function looksLikeBzlProject(pkg) {
  const p = pkg && typeof pkg === "object" ? pkg : null;
  if (!p) return false;
  const name = String(p?.name || "").trim().toLowerCase();
  if (name.includes("bzl")) return true;
  const scripts = p?.scripts && typeof p.scripts === "object" ? p.scripts : {};
  const startScript = String(scripts.start || "").trim().toLowerCase();
  if (startScript.includes("server.js")) return true;
  if (Object.prototype.hasOwnProperty.call(scripts, "create-user")) return true;
  const deps = p?.dependencies && typeof p.dependencies === "object" ? p.dependencies : {};
  if (Object.prototype.hasOwnProperty.call(deps, "ws") && Object.prototype.hasOwnProperty.call(deps, "sanitize-html")) {
    return true;
  }
  return false;
}

function looksLikeBzlText(value) {
  const text = String(value || "").trim().toLowerCase();
  return text.includes("bzl");
}

function sourcePriority(source) {
  const s = String(source || "").trim().toLowerCase();
  if (s === "docker-label") return 2;
  return 1;
}

function normalizeDockerValue(value) {
  const text = String(value || "").trim();
  if (!text || text === "<no value>" || text === "<nil>") return "";
  return text;
}

function composeCandidatesFromLabel(workingDir, rawConfigFiles) {
  const cfg = String(rawConfigFiles || "").trim();
  if (!cfg) return [];
  const candidates = [];
  const tokens = cfg
    .split(/[;,]/)
    .map((x) => normalizeDockerValue(x))
    .filter(Boolean);
  for (const token of tokens) {
    const full = path.isAbsolute(token) ? token : path.resolve(workingDir, token);
    if (isExistingFile(full) && !candidates.includes(full)) candidates.push(full);
  }
  return candidates;
}

function findComposeFile(dir) {
  for (const name of BZL_COMPOSE_FILES) {
    const full = path.join(dir, name);
    if (isExistingFile(full)) return full;
  }
  return "";
}

function detectBzlInstance(dir, options = {}) {
  try {
    const absDir = path.resolve(dir);
    let composeFile = String(options.preferredComposeFile || "").trim();
    if (composeFile) composeFile = path.resolve(absDir, composeFile);
    if (!isExistingFile(composeFile)) composeFile = "";
    if (!composeFile) composeFile = findComposeFile(absDir);
    if (!composeFile) return null;

    const source = String(options.source || "filesystem").trim() || "filesystem";
    const allowComposeOnly = options.allowComposeOnly === true;
    const hints = Array.isArray(options.hints) ? options.hints : [];

    const hasServer = isExistingFile(path.join(absDir, "server.js"));
    const hasPkg = isExistingFile(path.join(absDir, "package.json"));
    const pkg = hasPkg ? readPackageJson(absDir) : null;

    const packageHint = hasPkg && looksLikeBzlProject(pkg);
    const pathHint = looksLikeBzlText(absDir) || looksLikeBzlText(path.basename(absDir));
    const externalHint = hints.some((hint) => looksLikeBzlText(hint));
    const hasSource = hasServer && hasPkg;
    const allowBySource = hasSource && (packageHint || pathHint || externalHint);
    const allowByComposeOnly = allowComposeOnly && (pathHint || externalHint);
    if (!allowBySource && !allowByComposeOnly) return null;

    return {
      rootDir: absDir,
      composeFile: path.resolve(composeFile),
      source,
      hasSource
    };
  } catch {
    return null;
  }
}

function discoverFromRoot(rootDir, maxDepth) {
  const found = [];
  const queue = [{ dir: rootDir, depth: 0 }];
  const seen = new Set();
  while (queue.length) {
    const current = queue.shift();
    const abs = path.resolve(current.dir);
    if (seen.has(abs)) continue;
    seen.add(abs);

    const instance = detectBzlInstance(abs, {
      source: "filesystem",
      allowComposeOnly: true,
      hints: [abs]
    });
    if (instance) {
      found.push(instance);
      continue;
    }
    if (current.depth >= maxDepth) continue;

    let entries = [];
    try {
      entries = fs.readdirSync(abs, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.isSymbolicLink()) continue;
      if (shouldSkipDir(entry.name)) continue;
      queue.push({ dir: path.join(abs, entry.name), depth: current.depth + 1 });
    }
  }
  return found;
}

function discoverFromDockerLabels() {
  try {
    const format = [
      "{{.Names}}",
      "{{.Image}}",
      '{{.Label "com.docker.compose.project"}}',
      '{{.Label "com.docker.compose.service"}}',
      '{{.Label "com.docker.compose.project.working_dir"}}',
      '{{.Label "com.docker.compose.project.config_files"}}'
    ].join("|");
    const psRes = spawnSync("docker", ["ps", "-a", "--format", format], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8",
      shell: false
    });
    if (psRes.error || (psRes.status || 0) !== 0) return [];

    const found = [];
    const lines = String(psRes.stdout || "")
      .split(/\r?\n/)
      .map((line) => String(line || "").trim())
      .filter(Boolean);

    for (const line of lines) {
      const parts = line.split("|");
      if (parts.length < 6) continue;
      const containerName = normalizeDockerValue(parts[0]);
      const imageName = normalizeDockerValue(parts[1]);
      const projectName = normalizeDockerValue(parts[2]);
      const serviceName = normalizeDockerValue(parts[3]);
      const workingDirRaw = normalizeDockerValue(parts[4]);
      const configFilesRaw = normalizeDockerValue(parts[5]);
      if (!workingDirRaw) continue;

      const workingDir = path.resolve(workingDirRaw);
      if (!isExistingDir(workingDir)) continue;

      const composeCandidates = composeCandidatesFromLabel(workingDir, configFilesRaw);
      const preferredComposeFile = composeCandidates.length ? composeCandidates[0] : "";
      const detected = detectBzlInstance(workingDir, {
        source: "docker-label",
        allowComposeOnly: true,
        preferredComposeFile,
        hints: [containerName, imageName, projectName, serviceName, workingDir]
      });
      if (detected) {
        found.push(detected);
      }
    }
    return found;
  } catch {
    return [];
  }
}

function run(cmd, args, cwd, { dryRun = false, allowFail = false } = {}) {
  const printable = `${cmd} ${args.join(" ")}`;
  if (dryRun) {
    log(`[dry-run] ${printable} (cwd=${displayPath(cwd)})`);
    return 0;
  }
  const result = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: false });
  if (result.error) {
    if (allowFail) {
      warn(`${printable} failed to start: ${result.error?.message || result.error}`);
      return 1;
    }
    fail(`${printable} failed to start: ${result.error?.message || result.error}`);
  }
  const code = result.status || 0;
  if (code !== 0 && !allowFail) fail(`${printable} failed with exit code ${code}`);
  return code;
}

function defaultRoots() {
  const list = [];
  const cwd = process.cwd();
  list.push(cwd);
  if (process.platform !== "win32") {
    list.push("/", "/root", "/home", "/opt", "/srv", "/var/www");
  } else {
    const driveRoot = path.parse(cwd).root;
    if (driveRoot) list.push(driveRoot);
  }
  const uniq = [];
  for (const item of list) {
    const abs = path.resolve(expandHome(item));
    if (!fs.existsSync(abs)) continue;
    if (uniq.includes(abs)) continue;
    uniq.push(abs);
  }
  return uniq;
}

function printDiscovered(instances) {
  if (!instances.length) {
    log("No Bzl instances discovered.");
    return;
  }
  log(`Discovered ${instances.length} instance(s):`);
  for (const [i, inst] of instances.entries()) {
    const source = String(inst?.source || "filesystem");
    console.log(
      `  ${i + 1}. ${displayPath(inst.rootDir)}  (compose: ${path.basename(inst.composeFile)}, source: ${source})`
    );
  }
}

function main() {
  const args = parseArgs();
  const update = args.update === "1";
  const skipGit = args["skip-git"] === "1";
  const skipBuild = args["skip-build"] === "1";
  const dryRun = args["dry-run"] === "1";
  const noDockerDiscovery = args["no-docker-discovery"] === "1";
  const remote = String(args.remote || "origin").trim();
  const branch = String(args.branch || "main").trim();
  const maxDepth = Number.isInteger(Number(args["max-depth"])) ? Math.max(1, Number(args["max-depth"])) : DEFAULT_MAX_DEPTH;
  const roots = splitList(args.roots, defaultRoots())
    .map((r) => path.resolve(r))
    .filter((r, idx, arr) => fs.existsSync(r) && arr.indexOf(r) === idx);

  if (!roots.length) fail("No valid search roots. Use --roots=/path1,/path2");

  log(`Scanning roots: ${roots.map((r) => displayPath(r)).join(", ")} (max-depth=${maxDepth})`);

  const foundRaw = [];
  for (const root of roots) foundRaw.push(...discoverFromRoot(root, maxDepth));
  if (!noDockerDiscovery) foundRaw.push(...discoverFromDockerLabels());

  const byRoot = new Map();
  for (const inst of foundRaw) {
    const key = path.resolve(inst.rootDir);
    const existing = byRoot.get(key);
    if (!existing || sourcePriority(inst.source) > sourcePriority(existing.source)) {
      byRoot.set(key, inst);
    }
  }
  const instances = Array.from(byRoot.values()).sort((a, b) => a.rootDir.localeCompare(b.rootDir));
  printDiscovered(instances);

  if (!update) {
    console.log("");
    console.log("Tip: run with --update to pull/rebuild all detected instances.");
    return;
  }
  if (!instances.length) return;

  const summary = [];
  for (const inst of instances) {
    const rel = displayPath(inst.rootDir);
    log(`Updating ${rel}`);
    let ok = true;
    let notes = [];
    try {
      if (!skipGit) {
        const inGit = run("git", ["-C", inst.rootDir, "rev-parse", "--is-inside-work-tree"], inst.rootDir, {
          dryRun,
          allowFail: true
        });
        if (inGit !== 0) {
          notes.push("not a git checkout (skipped git pull)");
        } else {
          run("git", ["-C", inst.rootDir, "fetch", remote], inst.rootDir, { dryRun });
          run("git", ["-C", inst.rootDir, "checkout", branch], inst.rootDir, { dryRun });
          run("git", ["-C", inst.rootDir, "pull", "--ff-only", remote, branch], inst.rootDir, { dryRun });
        }
      }
      const composeArgs = ["compose", "-f", inst.composeFile.replace(/\\/g, "/"), "up", "-d", "--remove-orphans"];
      if (!skipBuild) composeArgs.push("--build");
      run("docker", composeArgs, inst.rootDir, { dryRun });
      summary.push({ instance: rel, ok: true, notes: notes.join("; ") });
    } catch (e) {
      ok = false;
      notes.push(e?.message || String(e));
      summary.push({ instance: rel, ok, notes: notes.join("; ") });
      warn(`Failed update for ${rel}: ${notes.join("; ")}`);
    }
  }

  console.log("");
  console.log("Update summary:");
  for (const row of summary) {
    const status = row.ok ? "OK" : "FAIL";
    console.log(`- [${status}] ${row.instance}${row.notes ? ` - ${row.notes}` : ""}`);
  }
}

main();
