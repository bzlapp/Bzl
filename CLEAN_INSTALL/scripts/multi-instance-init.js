const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const MULTI_DIR = path.join(ROOT, "multi_instance");
const DEFAULT_CONFIG_PATH = path.join(MULTI_DIR, "instances.json");
const DEFAULT_EXAMPLE_PATH = path.join(MULTI_DIR, "instances.example.json");

function log(msg) {
  console.log(`[multi-init] ${msg}`);
}

function warn(msg) {
  console.warn(`[multi-init] WARN: ${msg}`);
}

function fail(msg) {
  console.error(`[multi-init] ERROR: ${msg}`);
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

function expandHome(p) {
  const value = String(p || "").trim();
  if (!value.startsWith("~")) return value;
  const home = process.env.HOME || process.env.USERPROFILE || "";
  if (!home) return value;
  if (value === "~") return home;
  if (value.startsWith("~/") || value.startsWith("~\\")) return path.join(home, value.slice(2));
  return value;
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    fail(`Failed to read JSON: ${filePath} (${e?.message || e})`);
  }
}

function writeText(filePath, body) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, body, "utf8");
}

function displayPath(filePath) {
  const abs = path.resolve(filePath);
  const rel = path.relative(process.cwd(), abs);
  if (rel && !rel.startsWith("..") && !path.isAbsolute(rel)) return rel.replace(/\\/g, "/");
  return abs.replace(/\\/g, "/");
}

function envValue(v) {
  const raw = String(v ?? "");
  if (!raw) return "";
  if (/^[A-Za-z0-9._:@/+,-]+$/.test(raw)) return raw;
  return `"${raw.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function looksLikeHost(h) {
  const host = String(h || "").trim().toLowerCase();
  if (!host) return false;
  if (host.includes("://")) return false;
  if (host.length > 253) return false;
  if (!/^[a-z0-9.-]+$/.test(host)) return false;
  if (host.startsWith(".") || host.endsWith(".") || host.includes("..")) return false;
  return host.includes(".");
}

function normalizeId(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
}

function templateConfig() {
  return {
    projectName: "bzl-multi",
    networkName: "bzl_multi_net",
    cloudflared: {
      enabled: true,
      tunnel: "bzl",
      routeDns: false,
      overwriteDns: true,
      configPath: "~/.cloudflared/config.yml",
      credentialsFile: "~/.cloudflared/TUNNEL-UUID.json"
    },
    instances: [
      {
        id: "official",
        hostname: "chat.example.com",
        hostPort: 3301,
        registrationCode: "replace-with-random-code",
        env: {
          SESSION_TTL_MS: "2592000000",
          DEFAULT_TTL_MS: "3600000"
        }
      },
      {
        id: "staging",
        hostname: "staging.example.com",
        hostPort: 3302,
        registrationCode: "replace-with-another-code",
        env: {}
      }
    ]
  };
}

function ensureConfigFile(configPath, examplePath) {
  const template = `${JSON.stringify(templateConfig(), null, 2)}\n`;
  if (!fs.existsSync(examplePath)) {
    writeText(examplePath, template);
    log(`Wrote example config: ${displayPath(examplePath)}`);
  }
  if (!fs.existsSync(configPath)) {
    writeText(configPath, template);
    fail(
      `Created ${displayPath(configPath)}. Edit hostnames/ports/registration codes, then run this command again.`
    );
  }
}

function validateConfig(raw) {
  const projectName = normalizeId(raw?.projectName || "bzl-multi") || "bzl-multi";
  const networkName = normalizeId(raw?.networkName || "bzl_multi_net").replace(/-/g, "_") || "bzl_multi_net";
  const cf = raw?.cloudflared && typeof raw.cloudflared === "object" ? raw.cloudflared : {};
  const cloudflared = {
    enabled: Boolean(cf.enabled),
    tunnel: String(cf.tunnel || "bzl").trim(),
    routeDns: Boolean(cf.routeDns),
    overwriteDns: cf.overwriteDns == null ? true : Boolean(cf.overwriteDns),
    configPath: String(cf.configPath || "~/.cloudflared/config.yml").trim(),
    credentialsFile: String(cf.credentialsFile || "~/.cloudflared/TUNNEL-UUID.json").trim()
  };

  const instancesRaw = Array.isArray(raw?.instances) ? raw.instances : [];
  if (!instancesRaw.length) fail("Config must include at least one instance.");

  const ids = new Set();
  const hostnames = new Set();
  const ports = new Set();
  const instances = [];

  for (const [index, row] of instancesRaw.entries()) {
    const id = normalizeId(row?.id);
    if (!id) fail(`instances[${index}].id is required (letters/numbers/dashes).`);
    if (ids.has(id)) fail(`Duplicate instance id: ${id}`);
    ids.add(id);

    const hostname = String(row?.hostname || "").trim().toLowerCase();
    if (!looksLikeHost(hostname)) fail(`instances[${index}] (${id}) has invalid hostname: ${hostname}`);
    if (hostnames.has(hostname)) fail(`Duplicate hostname: ${hostname}`);
    hostnames.add(hostname);

    const hostPort = Number(row?.hostPort || 0);
    if (!Number.isInteger(hostPort) || hostPort < 1024 || hostPort > 65535) {
      fail(`instances[${index}] (${id}) hostPort must be an integer between 1024 and 65535.`);
    }
    if (ports.has(hostPort)) fail(`Duplicate hostPort: ${hostPort}`);
    ports.add(hostPort);

    const envRaw = row?.env && typeof row.env === "object" ? row.env : {};
    const env = {};
    for (const [key, value] of Object.entries(envRaw)) {
      const k = String(key || "").trim().toUpperCase();
      if (!k || !/^[A-Z0-9_]+$/.test(k)) continue;
      env[k] = String(value ?? "");
    }

    instances.push({
      id,
      serviceName: `bzl_${id.replace(/-/g, "_")}`,
      volumeName: `${projectName}_${id.replace(/-/g, "_")}_data`,
      hostname,
      hostPort,
      registrationCode: String(row?.registrationCode || "").trim(),
      env
    });
  }

  if (cloudflared.enabled && !cloudflared.tunnel) fail("cloudflared.tunnel is required when cloudflared.enabled=true.");
  if (cloudflared.enabled && !cloudflared.configPath) fail("cloudflared.configPath is required when cloudflared.enabled=true.");
  if (cloudflared.enabled && !cloudflared.credentialsFile) {
    warn("cloudflared.credentialsFile is empty; update it before starting cloudflared.");
  }

  return { projectName, networkName, cloudflared, instances };
}

function renderEnvFile(instance) {
  const lines = [
    `# Generated by scripts/multi-instance-init.js`,
    `# Instance: ${instance.id} (${instance.hostname})`,
    "",
    "PORT=3000",
    "HOST=0.0.0.0",
    `REGISTRATION_CODE=${envValue(instance.registrationCode)}`
  ];
  const keys = Object.keys(instance.env).sort();
  if (keys.length) {
    lines.push("", "# Extra per-instance env overrides");
    for (const key of keys) lines.push(`${key}=${envValue(instance.env[key])}`);
  }
  lines.push("");
  return lines.join("\n");
}

function renderCompose(cfg) {
  const lines = ["services:"];
  for (const inst of cfg.instances) {
    lines.push(
      `  ${inst.serviceName}:`,
      `    build:`,
      `      context: ..`,
      `      dockerfile: Dockerfile`,
      `    image: bzl:latest`,
      `    container_name: ${inst.serviceName}`,
      `    restart: unless-stopped`,
      `    env_file:`,
      `      - ./env/${inst.id}.env`,
      `    ports:`,
      `      - "127.0.0.1:${inst.hostPort}:3000"`,
      `    volumes:`,
      `      - ${inst.volumeName}:/app/data`,
      `    networks:`,
      `      - ${cfg.networkName}`
    );
  }
  lines.push("", "volumes:");
  for (const inst of cfg.instances) lines.push(`  ${inst.volumeName}:`);
  lines.push("", "networks:", `  ${cfg.networkName}:`, `    name: ${cfg.networkName}`, "");
  return lines.join("\n");
}

function renderCloudflaredConfig(cfg) {
  const lines = [
    `# Generated by scripts/multi-instance-init.js`,
    `tunnel: ${cfg.cloudflared.tunnel}`,
    `credentials-file: ${expandHome(cfg.cloudflared.credentialsFile)}`,
    `ingress:`
  ];
  for (const inst of cfg.instances) {
    lines.push(`  - hostname: ${inst.hostname}`, `    service: http://127.0.0.1:${inst.hostPort}`);
  }
  lines.push(`  - service: http_status:404`, "");
  return lines.join("\n");
}

function renderChecklist(cfg, composePath) {
  const lines = [
    "# Multi-instance DNS / deployment checklist",
    "",
    `Compose file: ${displayPath(composePath)}`,
    "",
    "## 1) Bring up all instances",
    "```bash",
    `docker compose -f ${displayPath(composePath)} up -d --build --remove-orphans`,
    "```",
    "",
    "## 2) Validate each local instance responds",
    "```bash"
  ];
  for (const inst of cfg.instances) lines.push(`curl -fsS http://127.0.0.1:${inst.hostPort}/api/health`);
  lines.push("```", "");
  if (cfg.cloudflared.enabled) {
    lines.push(
      "## 3) Cloudflare DNS routing",
      "",
      "Run these once per hostname (safe to re-run with overwrite):",
      "```bash"
    );
    for (const inst of cfg.instances) {
      const overwrite = cfg.cloudflared.overwriteDns ? "--overwrite-dns " : "";
      lines.push(`cloudflared tunnel route dns ${overwrite}${cfg.cloudflared.tunnel} ${inst.hostname}`);
    }
    lines.push(
      "```",
      "",
      "## 4) Start/restart the tunnel",
      "```bash",
      `cloudflared tunnel run ${cfg.cloudflared.tunnel}`,
      "```",
      "",
      "## 5) DNS sanity reminders",
      "- Verify each hostname resolves to Cloudflare tunnel (proxied CNAME).",
      "- Keep SSL/TLS mode in Cloudflare set to Full (strict preferred).",
      "- Ensure your tunnel credentials file matches the tunnel UUID in config.",
      "- If a route changed recently, allow DNS propagation time and re-test `/api/health` through the hostname."
    );
  } else {
    lines.push("## 3) DNS sanity reminders", "- Point each hostname to your reverse proxy/tunnel endpoint.", "- Ensure TLS termination/proxy forwards to the mapped host ports above.");
  }
  lines.push("");
  return lines.join("\n");
}

function runCommand(cmd, args, cwd) {
  const result = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: false });
  if (result.error) throw result.error;
  return result.status || 0;
}

function maybeRouteDns(cfg, forceRouteFlag) {
  if (!cfg.cloudflared.enabled) return;
  if (!(cfg.cloudflared.routeDns || forceRouteFlag)) return;

  log("Applying cloudflared DNS routes...");
  for (const inst of cfg.instances) {
    const args = ["tunnel", "route", "dns"];
    if (cfg.cloudflared.overwriteDns) args.push("--overwrite-dns");
    args.push(cfg.cloudflared.tunnel, inst.hostname);
    try {
      const code = runCommand("cloudflared", args, ROOT);
      if (code !== 0) warn(`cloudflared route failed (${inst.hostname}), exit code ${code}.`);
    } catch (e) {
      warn(`cloudflared route failed (${inst.hostname}): ${e?.message || e}`);
    }
  }
}

function main() {
  const args = parseArgs();
  const configPath = args.config
    ? path.resolve(process.cwd(), String(args.config))
    : DEFAULT_CONFIG_PATH;
  const examplePath = args.example
    ? path.resolve(process.cwd(), String(args.example))
    : DEFAULT_EXAMPLE_PATH;
  const forceRouteDns = args["route-dns"] === "1";

  fs.mkdirSync(MULTI_DIR, { recursive: true });
  ensureConfigFile(configPath, examplePath);

  const cfg = validateConfig(readJson(configPath));
  const envDir = path.join(path.dirname(configPath), "env");
  const composePath = path.join(path.dirname(configPath), "docker-compose.yml");
  const checklistPath = path.join(path.dirname(configPath), "DNS_CHECKLIST.md");

  for (const inst of cfg.instances) {
    const envPath = path.join(envDir, `${inst.id}.env`);
    writeText(envPath, renderEnvFile(inst));
    log(`Wrote ${displayPath(envPath)}`);
  }

  writeText(composePath, renderCompose(cfg));
  log(`Wrote ${displayPath(composePath)}`);

  writeText(checklistPath, renderChecklist(cfg, composePath));
  log(`Wrote ${displayPath(checklistPath)}`);

  if (cfg.cloudflared.enabled) {
    const cfPath = path.resolve(expandHome(cfg.cloudflared.configPath));
    writeText(cfPath, renderCloudflaredConfig(cfg));
    log(`Wrote cloudflared config: ${cfPath}`);
  }

  maybeRouteDns(cfg, forceRouteDns);

  console.log("");
  console.log("Next:");
  console.log(`  1) docker compose -f ${displayPath(composePath)} up -d --build --remove-orphans`);
  if (cfg.cloudflared.enabled) {
    console.log(`  2) cloudflared tunnel run ${cfg.cloudflared.tunnel}`);
  }
  console.log(`  3) Review ${displayPath(checklistPath)} for DNS validation reminders.`);
}

main();
