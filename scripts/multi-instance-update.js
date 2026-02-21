const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

function log(msg) {
  console.log(`[multi-update] ${msg}`);
}

function fail(msg) {
  console.error(`[multi-update] ERROR: ${msg}`);
  process.exit(1);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (const raw of args) {
    const a = String(raw || "");
    if (!a.startsWith("--")) continue;
    const eq = a.indexOf("=");
    if (eq > -1) {
      out[a.slice(2, eq)] = a.slice(eq + 1);
      continue;
    }
    out[a.slice(2)] = "1";
  }
  return out;
}

function run(cmd, args, cwd = ROOT, { allowFail = false } = {}) {
  const result = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: false });
  if (result.error) fail(`${cmd} failed to start: ${result.error?.message || result.error}`);
  const code = result.status || 0;
  if (code !== 0 && !allowFail) fail(`${cmd} ${args.join(" ")} failed with exit code ${code}`);
  return code;
}

function main() {
  const args = parseArgs();
  const remote = String(args.remote || "origin").trim();
  const branch = String(args.branch || "main").trim();
  const configPath = args.config
    ? path.resolve(process.cwd(), String(args.config))
    : path.join(ROOT, "multi_instance", "instances.json");
  const composePath = args.compose
    ? path.resolve(process.cwd(), String(args.compose))
    : path.join(path.dirname(configPath), "docker-compose.yml");

  const skipGit = args["skip-git"] === "1";
  const skipBuild = args["skip-build"] === "1";
  const routeDns = args["route-dns"] === "1";
  const dryRun = args["dry-run"] === "1";

  if (!skipGit) {
    log(`Pulling latest source-of-truth from ${remote}/${branch}...`);
    run("git", ["fetch", remote], ROOT);
    run("git", ["checkout", branch], ROOT);
    run("git", ["pull", "--ff-only", remote, branch], ROOT);
  } else {
    log("Skipping git fetch/pull (--skip-git).");
  }

  if (!fs.existsSync(configPath)) {
    fail(`Missing config: ${configPath}\nRun: node scripts/multi-instance-init.js --config=${configPath}`);
  }

  log("Regenerating multi-instance compose/env files...");
  const initArgs = [`--config=${configPath}`];
  if (routeDns) initArgs.push("--route-dns");
  run(process.execPath, [path.join(ROOT, "scripts", "multi-instance-init.js"), ...initArgs], ROOT);

  if (!fs.existsSync(composePath)) fail(`Expected compose file was not generated: ${composePath}`);

  const composeRef = composePath.replace(/\\/g, "/");
  const upArgs = ["compose", "-f", composeRef, "up", "-d", "--remove-orphans"];
  if (!skipBuild) upArgs.push("--build");

  if (dryRun) {
    log("Dry run mode enabled (--dry-run). No docker compose command executed.");
    console.log("");
    console.log("Would run:");
    console.log(`docker ${upArgs.join(" ")}`);
    return;
  }

  log("Updating all instances...");
  run("docker", upArgs, ROOT);

  log("Container status:");
  run("docker", ["compose", "-f", composeRef, "ps"], ROOT, { allowFail: true });

  console.log("");
  console.log("Done.");
  console.log(`- Updated compose stack: ${path.relative(ROOT, composePath).replace(/\\/g, "/")}`);
  console.log("- Verify health for each hostname and /api/health endpoint.");
  console.log("- If cloudflared ingress changed, restart tunnel service/process.");
}

main();
