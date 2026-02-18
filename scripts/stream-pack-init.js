const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const PACK_DIR = path.join(ROOT, "stream_pack");

function log(msg) {
  console.log(`[stream-pack] ${msg}`);
}

function fail(msg) {
  console.error(`[stream-pack] ERROR: ${msg}`);
  process.exit(1);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (const a of args) {
    const m = String(a || "").match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

function randHex(bytes) {
  return crypto.randomBytes(bytes).toString("hex");
}

function randToken(bytes) {
  return crypto.randomBytes(bytes).toString("base64url");
}

function normalizeDomain(s) {
  const v = String(s || "").trim().toLowerCase();
  if (!v) return "";
  if (!/^[a-z0-9.-]+$/.test(v)) return "";
  if (!v.includes(".")) return "";
  return v;
}

function getJson(url, { timeoutMs = 2500 } = {}) {
  return new Promise((resolve) => {
    let settled = false;
    const done = (v) => {
      if (settled) return;
      settled = true;
      resolve(v);
    };
    try {
      const u = new URL(url);
      const req = https.request(
        {
          method: "GET",
          protocol: u.protocol,
          hostname: u.hostname,
          port: u.port,
          path: `${u.pathname || "/"}${u.search || ""}`,
          headers: { Accept: "application/json", "Cache-Control": "no-store" }
        },
        (res) => {
          let buf = "";
          res.setEncoding("utf8");
          res.on("data", (c) => (buf += c));
          res.on("end", () => {
            try {
              done({ ok: true, status: res.statusCode || 0, json: JSON.parse(buf || "{}") });
            } catch {
              done({ ok: true, status: res.statusCode || 0, json: {} });
            }
          });
        }
      );
      req.on("error", (e) => done({ ok: false, error: e?.message || String(e) }));
      req.setTimeout(timeoutMs, () => {
        try {
          req.destroy(new Error("timeout"));
        } catch {
          // ignore
        }
        done({ ok: false, timeout: true });
      });
      req.end();
    } catch (e) {
      done({ ok: false, error: e?.message || String(e) });
    }
  });
}

function writeFileIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) return false;
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function writeFileAlways(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function readEnvFile(envPath) {
  try {
    const raw = fs.readFileSync(envPath, "utf8");
    const out = {};
    for (const line of raw.split(/\r?\n/)) {
      const s = line.trim();
      if (!s || s.startsWith("#")) continue;
      const m = s.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      let v = m[2] || "";
      v = v.trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      out[m[1]] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function main() {
  const args = parseArgs();
  const domain = normalizeDomain(args.domain);
  const email = String(args.email || "").trim();

  if (!domain) {
    fail('Missing/invalid `--domain=...` (example: --domain=stream.example.com)');
  }
  if (!email || !email.includes("@")) {
    fail('Missing/invalid `--email=...` (needed for HTTPS certs; example: --email=you@example.com)');
  }

  fs.mkdirSync(PACK_DIR, { recursive: true });

  const envPath = path.join(PACK_DIR, ".env");
  const existing = readEnvFile(envPath);

  const API_KEY = existing.LIVEKIT_API_KEY || randToken(8);
  const API_SECRET = existing.LIVEKIT_API_SECRET || randToken(24);
  const TURN_USER = existing.TURN_USER || "bzl";
  const TURN_PASS = existing.TURN_PASS || randToken(18);
  const TURN_REALM = existing.TURN_REALM || domain;
  const TURN_EXTERNAL_IP = existing.TURN_EXTERNAL_IP || "";
  const RTC_UDP_START = existing.RTC_UDP_START || "50000";
  const RTC_UDP_END = existing.RTC_UDP_END || "50100";
  const TURN_RELAY_START = existing.TURN_RELAY_START || "49160";
  const TURN_RELAY_END = existing.TURN_RELAY_END || "49200";

  const envBody = `# Stream Pack (optional)
#
# This stack is separate from core Bzl. Core stays runnable without any domain.
# Streaming requires HTTPS and a public server.

STREAM_DOMAIN=${domain}
STREAM_EMAIL=${email}

# LiveKit auth (Bzl will mint JWTs with these)
LIVEKIT_API_KEY=${API_KEY}
LIVEKIT_API_SECRET=${API_SECRET}

# TURN (coturn) credentials for LiveKit clients
TURN_USER=${TURN_USER}
TURN_PASS=${TURN_PASS}
TURN_REALM=${TURN_REALM}
TURN_EXTERNAL_IP=${TURN_EXTERNAL_IP}

# WebRTC UDP port range exposed by livekit-server (keep small for firewall sanity)
RTC_UDP_START=${RTC_UDP_START}
RTC_UDP_END=${RTC_UDP_END}

# TURN relay UDP ports (coturn will allocate from this range)
TURN_RELAY_START=${TURN_RELAY_START}
TURN_RELAY_END=${TURN_RELAY_END}
`;

  if (!fs.existsSync(envPath)) {
    writeFileAlways(envPath, envBody);
    log(`Wrote ${path.relative(ROOT, envPath)}`);
  } else {
    // Keep user edits; only ensure required keys exist.
    const merged = { ...existing };
    const ensure = (k, v) => {
      if (!merged[k]) merged[k] = v;
    };
    ensure("STREAM_DOMAIN", domain);
    ensure("STREAM_EMAIL", email);
    ensure("LIVEKIT_API_KEY", API_KEY);
    ensure("LIVEKIT_API_SECRET", API_SECRET);
    ensure("TURN_USER", TURN_USER);
    ensure("TURN_PASS", TURN_PASS);
    ensure("TURN_REALM", TURN_REALM);
    ensure("TURN_EXTERNAL_IP", TURN_EXTERNAL_IP);
    ensure("RTC_UDP_START", RTC_UDP_START);
    ensure("RTC_UDP_END", RTC_UDP_END);
    ensure("TURN_RELAY_START", TURN_RELAY_START);
    ensure("TURN_RELAY_END", TURN_RELAY_END);

    const lines = [
      "# Stream Pack (optional)",
      "#",
      "# This stack is separate from core Bzl. Core stays runnable without any domain.",
      "# Streaming requires HTTPS and a public server.",
      "",
      `STREAM_DOMAIN=${merged.STREAM_DOMAIN}`,
      `STREAM_EMAIL=${merged.STREAM_EMAIL}`,
      "",
      "# LiveKit auth (Bzl will mint JWTs with these)",
      `LIVEKIT_API_KEY=${merged.LIVEKIT_API_KEY}`,
      `LIVEKIT_API_SECRET=${merged.LIVEKIT_API_SECRET}`,
      "",
      "# TURN (coturn) credentials for LiveKit clients",
      `TURN_USER=${merged.TURN_USER}`,
      `TURN_PASS=${merged.TURN_PASS}`,
      `TURN_REALM=${merged.TURN_REALM}`,
      `TURN_EXTERNAL_IP=${merged.TURN_EXTERNAL_IP || ""}`,
      "",
      "# WebRTC UDP port range exposed by livekit-server (keep small for firewall sanity)",
      `RTC_UDP_START=${merged.RTC_UDP_START}`,
      `RTC_UDP_END=${merged.RTC_UDP_END}`,
      "",
      "# TURN relay UDP ports (coturn will allocate from this range)",
      `TURN_RELAY_START=${merged.TURN_RELAY_START}`,
      `TURN_RELAY_END=${merged.TURN_RELAY_END}`,
      ""
    ];
    writeFileAlways(envPath, lines.join("\n"));
    log(`Updated ${path.relative(ROOT, envPath)}`);
  }

  const livekitYamlPath = path.join(PACK_DIR, "livekit.yaml");
  const livekitYaml = `port: 7880
log_level: info

rtc:
  tcp_port: 7881
  port_range_start: ${RTC_UDP_START}
  port_range_end: ${RTC_UDP_END}
  use_external_ip: true
  turn_servers:
    - host: ${domain}
      port: 3478
      protocol: udp
      username: ${TURN_USER}
      credential: ${TURN_PASS}

keys:
  ${API_KEY}: ${API_SECRET}
`;
  writeFileAlways(livekitYamlPath, livekitYaml);
  log(`Wrote ${path.relative(ROOT, livekitYamlPath)}`);

  const composePath = path.join(PACK_DIR, "docker-compose.yml");
  const composeBody = `services:
  livekit:
    image: livekit/livekit-server:latest
    container_name: bzl_livekit
    restart: unless-stopped
    command: --config /etc/livekit.yaml
    volumes:
      - ./livekit.yaml:/etc/livekit.yaml:ro
    ports:
      - "127.0.0.1:7880:7880"
      - "7881:7881"
      - "${RTC_UDP_START}-${RTC_UDP_END}:${RTC_UDP_START}-${RTC_UDP_END}/udp"

  turn:
    image: coturn/coturn:latest
    container_name: bzl_turn
    restart: unless-stopped
    network_mode: host
    command:
      - -n
      - --log-file=stdout
      - --realm=${TURN_REALM}
      - --fingerprint
      - --lt-cred-mech
      - --no-tls
      - --no-dtls
      - --no-cli
      - --no-multicast-peers
      - --no-loopback-peers
      - --listening-port=3478
      - --min-port=${TURN_RELAY_START}
      - --max-port=${TURN_RELAY_END}
      - --user=${TURN_USER}:${TURN_PASS}
      - --external-ip=${TURN_EXTERNAL_IP}
`;
  writeFileAlways(composePath, composeBody);
  log(`Wrote ${path.relative(ROOT, composePath)}`);

  const caddySnippetPath = path.join(PACK_DIR, "Caddyfile.snippet");
  const caddySnippet = `${domain} {
  encode zstd gzip
  reverse_proxy 127.0.0.1:7880
}
`;
  writeFileAlways(caddySnippetPath, caddySnippet);
  log(`Wrote ${path.relative(ROOT, caddySnippetPath)}`);

  const readmePath = path.join(PACK_DIR, "README.md");
  writeFileAlways(
    readmePath,
    `# Stream Pack (LiveKit + TURN)\n\nThis folder is generated by \`node scripts/stream-pack-init.js\`.\n\n## What this is\n- Optional infrastructure for the future Bzl streaming plugin.\n- Keeps core Bzl launchable without any domain name.\n- Uses LiveKit (SFU) + coturn for NAT traversal.\n\n## Requirements\n- Dedicated server with Docker + Docker Compose\n- HTTPS reverse proxy (Caddy recommended)\n- DNS A record: \`${domain}\` → your server\n  - Important: set this record to **DNS-only** (no Cloudflare proxy), otherwise UDP will break.\n\n## 1) Set TURN external IP\nEdit \`.env\` and set:\n\n\`\`\nTURN_EXTERNAL_IP=<your_server_public_ipv4>\n\`\`\n\n## 2) Reverse proxy (HTTPS)\nAdd \`Caddyfile.snippet\` to your Caddy config, then reload Caddy.\n\n## 3) Open firewall ports\nMinimum ports:\n- TCP 80/443 (Caddy)\n- TCP 7881 (LiveKit TCP fallback)\n- UDP \`${RTC_UDP_START}-${RTC_UDP_END}\` (LiveKit media)\n- UDP 3478 (TURN)\n- UDP \`${TURN_RELAY_START}-${TURN_RELAY_END}\` (TURN relays)\n\n## 4) Start services\nFrom this folder:\n\n\`\`\ncd stream_pack\ndocker compose up -d\n\`\`\n\n## Notes\n- LiveKit signaling is kept on localhost:7880 and exposed via Caddy.\n- TURN uses host networking (best reliability).\n`
  );
  log(`Wrote ${path.relative(ROOT, readmePath)}`);

  log("Done.");
  log("Next: edit stream_pack/.env (TURN_EXTERNAL_IP), add the Caddy snippet, open firewall ports, then run `docker compose up -d`.");

  if (!existing.TURN_EXTERNAL_IP) {
    log("Optional: auto-detect public IP:");
    log("  node scripts/stream-pack-detect-ip.js");
  }
}

main();
