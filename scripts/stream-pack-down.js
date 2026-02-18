const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PACK_DIR = path.join(ROOT, "stream_pack");

function run(cmd, args, opts = {}) {
  return spawnSync(cmd, args, { stdio: "inherit", cwd: PACK_DIR, ...opts });
}

function main() {
  if (!fs.existsSync(path.join(PACK_DIR, "docker-compose.yml"))) {
    console.error("[stream-pack] Missing stream_pack/docker-compose.yml.");
    process.exit(1);
  }

  let r = run("docker", ["compose", "down"]);
  if (r.status === 0) return;
  r = run("docker-compose", ["down"]);
  process.exit(r.status || 1);
}

main();

