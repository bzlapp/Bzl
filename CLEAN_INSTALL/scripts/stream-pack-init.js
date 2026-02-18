const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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

  const lines = [
    "# Stream Pack (optional)",
    "#",
    "# This stack is separate from core Bzl. Core stays runnable without any domain.",
    "# Streaming requires HTTPS and a public server.",
    "",
    `STREAM_DOMAIN=${domain}`,
    `STREAM_EMAIL=${email}`,
    "",
    "# LiveKit auth (Bzl will mint JWTs with these)",
    `LIVEKIT_API_KEY=${API_KEY}`,
    `LIVEKIT_API_SECRET=${API_SECRET}`,
    "",
    "# TURN (coturn) credentials for LiveKit clients",
    `TURN_USER=${TURN_USER}`,
    `TURN_PASS=${TURN_PASS}`,
    `TURN_REALM=${TURN_REALM}`,
    `TURN_EXTERNAL_IP=${TURN_EXTERNAL_IP}`,
    "",
    "# WebRTC UDP port range exposed by livekit-server (keep small for firewall sanity)",
    `RTC_UDP_START=${RTC_UDP_START}`,
    `RTC_UDP_END=${RTC_UDP_END}`,
    "",
    "# TURN relay UDP ports (coturn will allocate from this range)",
    `TURN_RELAY_START=${TURN_RELAY_START}`,
    `TURN_RELAY_END=${TURN_RELAY_END}`,
    ""
  ];
  writeFileAlways(envPath, lines.join("\n"));
  log(`Wrote ${path.relative(ROOT, envPath)}`);

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

  log("Done.");
  log("Next: edit stream_pack/.env (TURN_EXTERNAL_IP), add the Caddy snippet, open firewall ports, then run `docker compose up -d`.");
}

main();

