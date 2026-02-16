const http = require("http");
const fs = require("fs");
const path = require("path");

// Minimal .env loader (no external deps). Only sets vars that aren't already set.
function loadDotEnvIfPresent() {
  try {
    const envPath = path.join(__dirname, ".env");
    if (!fs.existsSync(envPath)) return;
    const raw = fs.readFileSync(envPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const s = String(line || "").trim();
      if (!s || s.startsWith("#")) continue;
      const m = s.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      const key = m[1];
      if (Object.prototype.hasOwnProperty.call(process.env, key) && String(process.env[key] || "") !== "") continue;
      let v = String(m[2] || "").trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      process.env[key] = v;
    }
  } catch {
    // ignore
  }
}

loadDotEnvIfPresent();
const os = require("os");
const crypto = require("crypto");
const { WebSocketServer } = require("ws");
const sanitizeHtml = require("sanitize-html");
const AdmZip = require("adm-zip");

function configErrorList() {
  return [];
}

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";

const MIN_TTL_MS = Number(process.env.MIN_TTL_MS || 60_000); // 1 min
const MAX_TTL_MS = Number(process.env.MAX_TTL_MS || 48 * 60 * 60_000); // 48h
const DEFAULT_TTL_MS = Number(process.env.DEFAULT_TTL_MS || 60 * 60_000); // 1h

const POSTS_MAX_CONTENT_LEN = Number(process.env.POSTS_MAX_CONTENT_LEN || 400);
const POST_TITLE_MAX_LEN = Number(process.env.POST_TITLE_MAX_LEN || 96);
const CHAT_MAX_LEN = Number(process.env.CHAT_MAX_LEN || 280);
const CHAT_MAX_PER_POST = Number(process.env.CHAT_MAX_PER_POST || 100);

const USERS_FILE = process.env.USERS_FILE || path.join(__dirname, "data", "users.json");
const REGISTRATION_CODE = typeof process.env.REGISTRATION_CODE === "string" ? process.env.REGISTRATION_CODE : "";

const BOOST_MIN_MS = Number(process.env.BOOST_MIN_MS || 5 * 60_000); // 5m
const BOOST_MAX_MS = Number(process.env.BOOST_MAX_MS || 2 * 60 * 60_000); // 2h
const CHAT_BOOST_MS = Number(process.env.CHAT_BOOST_MS || 2 * 60_000); // 2m per chat message
const PROFILE_IMAGE_MAX_DATA_URL_LEN = Number(process.env.PROFILE_IMAGE_MAX_DATA_URL_LEN || 250_000); // ~250KB
const RICH_IMAGE_MAX_DATA_URL_LEN = Number(process.env.RICH_IMAGE_MAX_DATA_URL_LEN || 50_000_000); // very high for local prototype
const RICH_AUDIO_MAX_DATA_URL_LEN = Number(process.env.RICH_AUDIO_MAX_DATA_URL_LEN || 50_000_000); // very high for local prototype
const POST_MAX_HTML_LEN = Number(process.env.POST_MAX_HTML_LEN || 60_000_000);
const CHAT_MAX_HTML_LEN = Number(process.env.CHAT_MAX_HTML_LEN || 60_000_000);
const PROFILE_BIO_MAX_HTML_LEN = Number(process.env.PROFILE_BIO_MAX_HTML_LEN || 120_000);
const PROFILE_PRONOUNS_MAX_LEN = Number(process.env.PROFILE_PRONOUNS_MAX_LEN || 40);
const PROFILE_LINK_LABEL_MAX_LEN = Number(process.env.PROFILE_LINK_LABEL_MAX_LEN || 40);
const PROFILE_LINK_URL_MAX_LEN = Number(process.env.PROFILE_LINK_URL_MAX_LEN || 280);
const PROFILE_LINKS_MAX = Number(process.env.PROFILE_LINKS_MAX || 8);
const INSTANCE_TITLE_MAX_LEN = Number(process.env.INSTANCE_TITLE_MAX_LEN || 32);
const INSTANCE_SUBTITLE_MAX_LEN = Number(process.env.INSTANCE_SUBTITLE_MAX_LEN || 80);
const DM_RETENTION_MS = Number(process.env.DM_RETENTION_MS || 24 * 60 * 60_000); // 24h rolling purge
const SESSION_TTL_MS = Number(process.env.SESSION_TTL_MS || 30 * 24 * 60 * 60_000); // 30 days
const RL_LOGIN_WINDOW_MS = Number(process.env.RL_LOGIN_WINDOW_MS || 60_000);
const RL_LOGIN_MAX = Number(process.env.RL_LOGIN_MAX || 12);
const RL_REGISTER_WINDOW_MS = Number(process.env.RL_REGISTER_WINDOW_MS || 10 * 60_000);
const RL_REGISTER_MAX = Number(process.env.RL_REGISTER_MAX || 6);
const RL_RESUME_WINDOW_MS = Number(process.env.RL_RESUME_WINDOW_MS || 60_000);
const RL_RESUME_MAX = Number(process.env.RL_RESUME_MAX || 30);
const RL_UPLOAD_WINDOW_MS = Number(process.env.RL_UPLOAD_WINDOW_MS || 5 * 60_000);
const RL_UPLOAD_IMAGE_MAX = Number(process.env.RL_UPLOAD_IMAGE_MAX || 20);
const RL_UPLOAD_AUDIO_MAX = Number(process.env.RL_UPLOAD_AUDIO_MAX || 10);
const RL_REPORT_WINDOW_MS = Number(process.env.RL_REPORT_WINDOW_MS || 10 * 60_000);
const RL_REPORT_MAX = Number(process.env.RL_REPORT_MAX || 12);
const RL_MOD_WINDOW_MS = Number(process.env.RL_MOD_WINDOW_MS || 60_000);
const RL_MOD_MAX = Number(process.env.RL_MOD_MAX || 40);

const POSTS_FILE = process.env.POSTS_FILE || path.join(__dirname, "data", "posts.json");
const MOD_LOG_FILE = process.env.MOD_LOG_FILE || path.join(__dirname, "data", "mod-log.json");
const REPORTS_FILE = process.env.REPORTS_FILE || path.join(__dirname, "data", "reports.json");
const SESSIONS_FILE = process.env.SESSIONS_FILE || path.join(__dirname, "data", "sessions.json");
const COLLECTIONS_FILE = process.env.COLLECTIONS_FILE || path.join(__dirname, "data", "collections.json");
const ROLES_FILE = process.env.ROLES_FILE || path.join(__dirname, "data", "roles.json");
const INSTANCE_FILE = process.env.INSTANCE_FILE || path.join(__dirname, "data", "instance.json");
const DMS_FILE = process.env.DMS_FILE || path.join(__dirname, "data", "dms.json");
const DM_KEY_FILE = process.env.DM_KEY_FILE || path.join(__dirname, "data", "dm-key.txt");
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, "data", "uploads");
const IMAGE_UPLOAD_MAX_BYTES = Number(process.env.IMAGE_UPLOAD_MAX_BYTES || 100 * 1024 * 1024);
const MAP_IMAGE_UPLOAD_MAX_BYTES = Number(process.env.MAP_IMAGE_UPLOAD_MAX_BYTES || 20 * 1024 * 1024);
const SPRITE_IMAGE_UPLOAD_MAX_BYTES = Number(process.env.SPRITE_IMAGE_UPLOAD_MAX_BYTES || 10 * 1024 * 1024);
const AUDIO_UPLOAD_MAX_BYTES = Number(process.env.AUDIO_UPLOAD_MAX_BYTES || 150 * 1024 * 1024);
const PLUGINS_DIR = process.env.PLUGINS_DIR || path.join(__dirname, "data", "plugins");
const PLUGINS_FILE = process.env.PLUGINS_FILE || path.join(__dirname, "data", "plugins.json");
const PLUGIN_ZIP_MAX_BYTES = Number(process.env.PLUGIN_ZIP_MAX_BYTES || 50 * 1024 * 1024);

const publicDir = path.join(__dirname, "public");

function validateRuntimeConfig() {
  const errors = configErrorList();

  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    errors.push("PORT must be an integer between 1 and 65535.");
  }
  if (!HOST || typeof HOST !== "string") {
    errors.push("HOST must be a non-empty string.");
  }

  if (!Number.isFinite(MIN_TTL_MS) || MIN_TTL_MS < 1) errors.push("MIN_TTL_MS must be >= 1.");
  if (!Number.isFinite(MAX_TTL_MS) || MAX_TTL_MS < 1) errors.push("MAX_TTL_MS must be >= 1.");
  if (!Number.isFinite(DEFAULT_TTL_MS) || DEFAULT_TTL_MS < 1) errors.push("DEFAULT_TTL_MS must be >= 1.");
  if (MIN_TTL_MS > MAX_TTL_MS) errors.push("MIN_TTL_MS cannot be greater than MAX_TTL_MS.");
  if (DEFAULT_TTL_MS < MIN_TTL_MS || DEFAULT_TTL_MS > MAX_TTL_MS) {
    errors.push("DEFAULT_TTL_MS must be between MIN_TTL_MS and MAX_TTL_MS.");
  }

  if (!Number.isFinite(BOOST_MIN_MS) || BOOST_MIN_MS < 1) errors.push("BOOST_MIN_MS must be >= 1.");
  if (!Number.isFinite(BOOST_MAX_MS) || BOOST_MAX_MS < 1) errors.push("BOOST_MAX_MS must be >= 1.");
  if (BOOST_MIN_MS > BOOST_MAX_MS) errors.push("BOOST_MIN_MS cannot be greater than BOOST_MAX_MS.");
  if (!Number.isFinite(CHAT_BOOST_MS) || CHAT_BOOST_MS < 0) errors.push("CHAT_BOOST_MS must be >= 0.");

  if (!Number.isFinite(SESSION_TTL_MS) || SESSION_TTL_MS < 60_000) {
    errors.push("SESSION_TTL_MS must be >= 60000.");
  }

  if (!Number.isFinite(IMAGE_UPLOAD_MAX_BYTES) || IMAGE_UPLOAD_MAX_BYTES < 1024) {
    errors.push("IMAGE_UPLOAD_MAX_BYTES must be >= 1024.");
  }
  if (!Number.isFinite(MAP_IMAGE_UPLOAD_MAX_BYTES) || MAP_IMAGE_UPLOAD_MAX_BYTES < 1024) {
    errors.push("MAP_IMAGE_UPLOAD_MAX_BYTES must be >= 1024.");
  }
  if (!Number.isFinite(SPRITE_IMAGE_UPLOAD_MAX_BYTES) || SPRITE_IMAGE_UPLOAD_MAX_BYTES < 1024) {
    errors.push("SPRITE_IMAGE_UPLOAD_MAX_BYTES must be >= 1024.");
  }
  if (!Number.isFinite(AUDIO_UPLOAD_MAX_BYTES) || AUDIO_UPLOAD_MAX_BYTES < 1024) {
    errors.push("AUDIO_UPLOAD_MAX_BYTES must be >= 1024.");
  }
  if (!Number.isFinite(PLUGIN_ZIP_MAX_BYTES) || PLUGIN_ZIP_MAX_BYTES < 1024) {
    errors.push("PLUGIN_ZIP_MAX_BYTES must be >= 1024.");
  }
  const rlChecks = [
    ["RL_LOGIN_WINDOW_MS", RL_LOGIN_WINDOW_MS],
    ["RL_LOGIN_MAX", RL_LOGIN_MAX],
    ["RL_REGISTER_WINDOW_MS", RL_REGISTER_WINDOW_MS],
    ["RL_REGISTER_MAX", RL_REGISTER_MAX],
    ["RL_RESUME_WINDOW_MS", RL_RESUME_WINDOW_MS],
    ["RL_RESUME_MAX", RL_RESUME_MAX],
    ["RL_UPLOAD_WINDOW_MS", RL_UPLOAD_WINDOW_MS],
    ["RL_UPLOAD_IMAGE_MAX", RL_UPLOAD_IMAGE_MAX],
    ["RL_UPLOAD_AUDIO_MAX", RL_UPLOAD_AUDIO_MAX],
    ["RL_REPORT_WINDOW_MS", RL_REPORT_WINDOW_MS],
    ["RL_REPORT_MAX", RL_REPORT_MAX],
    ["RL_MOD_WINDOW_MS", RL_MOD_WINDOW_MS],
    ["RL_MOD_MAX", RL_MOD_MAX]
  ];
  for (const [name, value] of rlChecks) {
    if (!Number.isFinite(value) || value <= 0) errors.push(`${name} must be > 0.`);
  }

  if (errors.length) {
    console.error("Invalid runtime configuration:");
    for (const issue of errors) console.error(`- ${issue}`);
    process.exit(1);
  }
}

validateRuntimeConfig();

/** @type {Map<string, {post: any, timer: NodeJS.Timeout | null, chat: any[]}>} */
const posts = new Map();

/** @type {Set<import("ws").WebSocket>} */
const sockets = new Set();

/** @type {Map<string, {username: string, salt: string, hash: string, createdAt?: number}>} */
let usersByName = new Map();

/** @type {any[]} */
let moderationLog = [];
let devLog = [];
let devLogSeq = 1;
/** @type {any[]} */
let reports = [];
/** @type {Map<string, any>} */
let sessionsById = new Map();
let collections = [];
let customRoles = [];
let instanceBranding = {
  title: "Bzl",
  subtitle: "Ephemeral hives + chat",
  allowMemberPermanentPosts: false,
  appearance: {
    bg: "#060611",
    panel: "#0c0c18",
    text: "#f6f0ff",
    accent: "#ff3ea5",
    accent2: "#b84bff",
    good: "#3ddc97",
    bad: "#ff4d8a",
    fontBody: "system",
    fontMono: "mono",
    mutedPct: 65,
    linePct: 10,
    panel2Pct: 2
  }
};
let lastInstanceBroadcastHash = "";

function broadcastInstanceUpdated(force = false) {
  const clean = sanitizeInstanceBranding(instanceBranding);
  instanceBranding = clean;
  const hash = JSON.stringify(clean);
  if (!force && hash === lastInstanceBroadcastHash) return false;
  lastInstanceBroadcastHash = hash;
  sendToSockets(() => true, { type: "instanceUpdated", instance: instanceBranding });
  return true;
}
let dmKey = null;
/** @type {Map<string, any>} */
let dmThreadsById = new Map();
/** @type {Map<string, {enabled: boolean}>} */
let pluginsStateById = new Map();
/** @type {Map<string, any>} */
let pluginManifestsById = new Map();
/** @type {Map<string, {wsHandlers: Map<string, Function>, onCloseHandlers: Function[], error?: string}>} */
let pluginRuntimeById = new Map();

/** @type {Map<string, Map<string, NodeJS.Timeout>>} */
const typingByPostId = new Map();

const ALLOWED_POST_REACTIONS = ["👍", "❤️", "😡", "😭", "🥺", "😂", "⭐"];
const ALLOWED_CHAT_REACTIONS = ["👍", "❤️", "😡", "😭", "🥺", "😂"];
const ALLOWED_REACTIONS = Array.from(new Set([...ALLOWED_POST_REACTIONS, ...ALLOWED_CHAT_REACTIONS]));
/** @type {Map<string, Map<string, Set<string>>>} */
const postReactionsByPostId = new Map();
/** @type {Map<string, Map<string, Set<string>>>} */
const chatReactionsByMessageId = new Map();
/** @type {Map<string, {count: number, resetAt: number}>} */
const rateLimits = new Map();

let persistTimer = null;

const ROLE_MEMBER = "member";
const ROLE_MODERATOR = "moderator";
const ROLE_OWNER = "owner";
const ROLE_RANK = { [ROLE_MEMBER]: 1, [ROLE_MODERATOR]: 2, [ROLE_OWNER]: 3 };
const DEFAULT_COLLECTION_ID = "general";

function now() {
  return Date.now();
}

function isSafeImageDataUrl(url, maxLen) {
  if (typeof url !== "string") return false;
  const s = url.trim();
  if (!s) return false;
  if (Number.isFinite(maxLen) && maxLen > 0 && s.length > maxLen) return false;
  return /^data:image\/(png|jpeg|jpg|webp|gif);base64,[a-z0-9+/=]+$/i.test(s);
}

function isSafeAudioDataUrl(url, maxLen) {
  if (typeof url !== "string") return false;
  const s = url.trim();
  if (!s) return false;
  if (Number.isFinite(maxLen) && maxLen > 0 && s.length > maxLen) return false;
  return /^data:audio\/(mpeg|mp3|wav|ogg|webm|aac|x-m4a|mp4);base64,[a-z0-9+/=]+$/i.test(s);
}

function isSafeUploadPath(url) {
  if (typeof url !== "string") return false;
  return /^\/uploads\/[a-zA-Z0-9][a-zA-Z0-9._-]{0,220}$/.test(url.trim());
}

function isSafeMediaSrc(url, kind) {
  const s = typeof url === "string" ? url.trim() : "";
  if (!s) return false;
  if (kind === "image") return isSafeImageDataUrl(s, RICH_IMAGE_MAX_DATA_URL_LEN) || isSafeUploadPath(s);
  if (kind === "audio") return isSafeAudioDataUrl(s, RICH_AUDIO_MAX_DATA_URL_LEN) || isSafeUploadPath(s);
  return false;
}

function extractUploadFilenames(str) {
  const out = new Set();
  if (typeof str !== "string" || !str) return out;
  const re = /\/uploads\/([a-zA-Z0-9][a-zA-Z0-9._-]{0,220})/g;
  let m;
  while ((m = re.exec(str))) out.add(m[1]);
  return out;
}

function keptUploadFilenamesFromProfiles() {
  const keep = new Set();
  for (const user of usersByName.values()) {
    const image = typeof user?.image === "string" ? user.image : "";
    const themeSongUrl = typeof user?.themeSongUrl === "string" ? user.themeSongUrl : "";
    const bioHtml = typeof user?.bioHtml === "string" ? user.bioHtml : "";
    for (const f of extractUploadFilenames(image)) keep.add(f);
    for (const f of extractUploadFilenames(themeSongUrl)) keep.add(f);
    for (const f of extractUploadFilenames(bioHtml)) keep.add(f);
  }
  return keep;
}

function keptUploadFilenamesFromPluginMaps() {
  const keep = new Set();
  try {
    const mapsFile = path.join(__dirname, "data", "plugin-data", "maps.json");
    if (!fs.existsSync(mapsFile)) return keep;
    const raw = fs.readFileSync(mapsFile, "utf8");
    const json = JSON.parse(raw);
    const list = Array.isArray(json?.maps) ? json.maps : [];
    for (const m of list) {
      const bg = typeof m?.backgroundUrl === "string" ? m.backgroundUrl : "";
      const thumb = typeof m?.thumbUrl === "string" ? m.thumbUrl : "";
      const sprites = Array.isArray(m?.sprites) ? m.sprites : [];
      for (const f of extractUploadFilenames(bg)) keep.add(f);
      for (const f of extractUploadFilenames(thumb)) keep.add(f);
      for (const s of sprites) {
        const url = typeof s?.url === "string" ? s.url : "";
        for (const f of extractUploadFilenames(url)) keep.add(f);
      }
    }
  } catch {
    // ignore
  }
  return keep;
}

function uploadFilenamesFromPostEntry(entry) {
  const out = new Set();
  if (!entry?.post) return out;
  for (const f of extractUploadFilenames(String(entry.post.contentHtml || ""))) out.add(f);
  for (const f of extractUploadFilenames(String(entry.post.content || ""))) out.add(f);
  for (const m of Array.isArray(entry.chat) ? entry.chat : []) {
    if (!m || typeof m !== "object") continue;
    for (const f of extractUploadFilenames(String(m.html || ""))) out.add(f);
    for (const f of extractUploadFilenames(String(m.text || ""))) out.add(f);
  }
  return out;
}

function uploadFilenamesFromAllPosts() {
  const out = new Set();
  for (const entry of posts.values()) {
    for (const f of uploadFilenamesFromPostEntry(entry)) out.add(f);
  }
  return out;
}

function safeUnlinkIfExists(filePath) {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function reschedulePostTimer(entry) {
  if (!entry?.post) return;
  if (entry.timer) clearTimeout(entry.timer);
  entry.timer = null;
  const expiresAt = Number(entry.post.expiresAt || 0) || 0;
  if (!expiresAt || expiresAt <= 0) return;
  const delay = Math.max(1, expiresAt - now());
  entry.timer = setTimeout(() => deletePost(entry.post.id, "expired"), delay);
}

function normalizeRemoteAddress(ip) {
  if (typeof ip !== "string") return "";
  return ip.replace(/^::ffff:/, "").trim();
}

function wsIdentity(ws) {
  const username = normalizeUsername(ws?.user?.username || "");
  if (username) return `u:${username}`;
  const ip = normalizeRemoteAddress(ws?.remoteAddress || "");
  if (ip) return `ip:${ip}`;
  return `c:${ws?.clientId || "unknown"}`;
}

function reqIdentity(req, fallbackUser = "") {
  const username = normalizeUsername(fallbackUser || "");
  if (username) return `u:${username}`;
  const ip = normalizeRemoteAddress(req?.socket?.remoteAddress || "");
  if (ip) return `ip:${ip}`;
  return "ip:unknown";
}

function pruneRateLimits(t = now()) {
  if (rateLimits.size <= 2000) return;
  for (const [key, record] of rateLimits.entries()) {
    if (!record || Number(record.resetAt || 0) <= t) rateLimits.delete(key);
  }
}

function takeRateLimit(bucket, subject, max, windowMs) {
  const t = now();
  pruneRateLimits(t);
  const key = `${bucket}|${subject}`;
  const current = rateLimits.get(key);
  if (!current || Number(current.resetAt || 0) <= t) {
    rateLimits.set(key, { count: 1, resetAt: t + windowMs });
    return { ok: true, retryMs: 0 };
  }
  if (current.count >= max) {
    return { ok: false, retryMs: Math.max(1, current.resetAt - t) };
  }
  current.count += 1;
  rateLimits.set(key, current);
  return { ok: true, retryMs: 0 };
}

function sanitizeProfileImage(image) {
  if (typeof image !== "string") return "";
  const s = image.trim();
  if (!s) return "";
  return isSafeImageDataUrl(s, PROFILE_IMAGE_MAX_DATA_URL_LEN) ? s : "";
}

function sanitizeRichHtml(html) {
  return sanitizeHtml(String(html || ""), {
    allowedTags: ["b", "i", "em", "strong", "u", "s", "br", "p", "ul", "ol", "li", "a", "img", "audio", "source"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      audio: ["src", "controls", "preload"],
      source: ["src", "type"]
    },
    allowedSchemes: ["http", "https", "mailto", "data"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        if (!/^(https?:|mailto:)/i.test(href)) return { tagName: "span", text: "" };
        const safe = { href };
        safe.target = "_blank";
        safe.rel = "noopener noreferrer nofollow";
        return { tagName, attribs: safe };
      },
      img: (tagName, attribs) => {
        const src = attribs.src || "";
        if (!isSafeMediaSrc(src, "image")) return { tagName: "span", text: "" };
        const safe = { src, alt: String(attribs.alt || "").slice(0, 80) };
        return { tagName: "img", attribs: safe };
      },
      audio: (tagName, attribs) => {
        const src = attribs.src || "";
        if (!isSafeMediaSrc(src, "audio")) return { tagName: "span", text: "" };
        return { tagName: "audio", attribs: { src, controls: "controls", preload: "none" } };
      },
      source: (tagName, attribs) => {
        const src = attribs.src || "";
        if (!isSafeMediaSrc(src, "audio")) return { tagName: "span", text: "" };
        const type = String(attribs.type || "").slice(0, 40);
        return { tagName: "source", attribs: type ? { src, type } : { src } };
      }
    },
    exclusiveFilter: (frame) =>
      (frame.tag === "a" && !frame.attribs.href) ||
      (frame.tag === "source" && !frame.attribs.src) ||
      (frame.tag === "audio" && !frame.attribs.src)
  });
}

function sanitizeColorHex(color) {
  if (typeof color !== "string") return "";
  const c = color.trim();
  if (!/^#[0-9a-fA-F]{6}$/.test(c)) return "";
  return c.toLowerCase();
}

function sanitizePercentInt(value, fallback) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(100, n));
}

function sanitizeInstanceText(text, maxLen) {
  if (typeof text !== "string") return "";
  const value = text.replace(/\s+/g, " ").trim();
  if (!value) return "";
  const clean = sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
  return clean.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function sanitizeInstanceBranding(raw) {
  const title = sanitizeInstanceText(raw?.title || "", INSTANCE_TITLE_MAX_LEN) || "Bzl";
  const subtitle = sanitizeInstanceText(raw?.subtitle || "", INSTANCE_SUBTITLE_MAX_LEN) || "Ephemeral hives + chat";
  const allowMemberPermanentPosts = Boolean(raw?.allowMemberPermanentPosts);
  const appearanceRaw = raw?.appearance && typeof raw.appearance === "object" ? raw.appearance : {};
  const bg = sanitizeColorHex(appearanceRaw.bg) || "#060611";
  const panel = sanitizeColorHex(appearanceRaw.panel) || "#0c0c18";
  const text = sanitizeColorHex(appearanceRaw.text) || "#f6f0ff";
  const accent = sanitizeColorHex(appearanceRaw.accent) || "#ff3ea5";
  const accent2 = sanitizeColorHex(appearanceRaw.accent2) || "#b84bff";
  const good = sanitizeColorHex(appearanceRaw.good) || "#3ddc97";
  const bad = sanitizeColorHex(appearanceRaw.bad) || "#ff4d8a";
  const fontBody = ["system", "serif", "mono"].includes(String(appearanceRaw.fontBody || "")) ? String(appearanceRaw.fontBody) : "system";
  const fontMono = ["mono", "system"].includes(String(appearanceRaw.fontMono || "")) ? String(appearanceRaw.fontMono) : "mono";
  const mutedPct = sanitizePercentInt(appearanceRaw.mutedPct, 65);
  const linePct = sanitizePercentInt(appearanceRaw.linePct, 10);
  const panel2Pct = sanitizePercentInt(appearanceRaw.panel2Pct, 2);
  const appearance = { bg, panel, text, accent, accent2, good, bad, fontBody, fontMono, mutedPct, linePct, panel2Pct };
  return { title, subtitle, allowMemberPermanentPosts, appearance };
}

function sanitizeAvatar(avatar) {
  if (typeof avatar !== "string") return "";
  const a = avatar.trim();
  if (!a) return "";
  if (a.length > 16) return "";
  return a;
}

function sanitizePronouns(pronouns) {
  if (typeof pronouns !== "string") return "";
  return pronouns.replace(/\s+/g, " ").trim().slice(0, PROFILE_PRONOUNS_MAX_LEN);
}

function sanitizeProfileBioHtml(html) {
  if (typeof html !== "string") return "";
  if (html.length > PROFILE_BIO_MAX_HTML_LEN) return "";
  return sanitizeRichHtml(html);
}

function sanitizeThemeSongUrl(url) {
  if (typeof url !== "string") return "";
  const value = url.trim();
  if (!value) return "";
  return isSafeMediaSrc(value, "audio") ? value : "";
}

function sanitizeHttpUrl(url) {
  if (typeof url !== "string") return "";
  const value = url.trim();
  if (!value || value.length > PROFILE_LINK_URL_MAX_LEN) return "";
  if (!/^https?:\/\//i.test(value)) return "";
  return value;
}

function sanitizeProfileLinks(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const label = String(item.label || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, PROFILE_LINK_LABEL_MAX_LEN);
    const url = sanitizeHttpUrl(item.url);
    if (!url) continue;
    out.push({ label: label || "Link", url });
    if (out.length >= PROFILE_LINKS_MAX) break;
  }
  return out;
}

function sanitizePostIdList(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  const seen = new Set();
  for (const item of list) {
    if (typeof item !== "string") continue;
    const id = item.trim();
    if (!id) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
    if (out.length >= 5000) break;
  }
  return out;
}

function normalizeCollectionName(name) {
  if (typeof name !== "string") return "";
  const cleaned = name.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned.slice(0, 64);
}

function slugifyCollection(name) {
  return normalizeCollectionName(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function normalizeCollectionId(id) {
  if (typeof id !== "string") return "";
  const cleaned = id.trim().toLowerCase();
  if (!cleaned) return "";
  if (!/^[a-z0-9][a-z0-9._-]{0,63}$/.test(cleaned)) return "";
  return cleaned;
}

function normalizeCustomRoleKey(key) {
  if (typeof key !== "string") return "";
  const cleaned = key.trim().toLowerCase();
  if (!cleaned) return "";
  if (!/^[a-z0-9][a-z0-9_-]{0,31}$/.test(cleaned)) return "";
  if (cleaned === ROLE_OWNER || cleaned === ROLE_MODERATOR || cleaned === ROLE_MEMBER) return "";
  return cleaned;
}

function normalizeCustomRoleLabel(label) {
  if (typeof label !== "string") return "";
  const cleaned = label.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned.slice(0, 32);
}

function sanitizeCustomRoleKeys(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  const seen = new Set();
  for (const item of list) {
    const key = normalizeCustomRoleKey(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out;
}

function customRoleToken(key) {
  const normalized = normalizeCustomRoleKey(key);
  return normalized ? `role:${normalized}` : "";
}

function sanitizeAllowedRoleTokens(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  const seen = new Set();
  for (const item of list) {
    if (typeof item !== "string") continue;
    const token = item.trim().toLowerCase();
    const isBase = token === ROLE_MEMBER || token === ROLE_MODERATOR || token === ROLE_OWNER;
    const isCustom = /^role:[a-z0-9][a-z0-9_-]{0,31}$/.test(token);
    if (!isBase && !isCustom) continue;
    if (seen.has(token)) continue;
    seen.add(token);
    out.push(token);
  }
  return out;
}

function existingCustomRoleTokenSet() {
  const set = new Set();
  for (const role of customRoles) {
    if (!role || role.archived) continue;
    const token = customRoleToken(role.key);
    if (token) set.add(token);
  }
  return set;
}

function validateAllowedRoleTokensForCurrentRoles(tokens) {
  const clean = sanitizeAllowedRoleTokens(tokens);
  const existing = existingCustomRoleTokenSet();
  const out = [];
  for (const token of clean) {
    if (token === ROLE_MEMBER || token === ROLE_MODERATOR || token === ROLE_OWNER) {
      out.push(token);
      continue;
    }
    if (token.startsWith("role:") && existing.has(token)) out.push(token);
  }
  return out;
}

function toId() {
  return crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString("hex");
}

function normalizeUsername(username) {
  if (typeof username !== "string") return "";
  const cleaned = username.trim().toLowerCase();
  if (!cleaned) return "";
  if (cleaned.length > 32) return "";
  if (!/^[a-z0-9_][a-z0-9_.-]*$/.test(cleaned)) return "";
  return cleaned;
}

function extractMentionUsernames(text) {
  const raw = typeof text === "string" ? text : "";
  if (!raw) return [];
  const out = [];
  const seen = new Set();
  const re = /@([a-z0-9_][a-z0-9_.-]{0,31})/gi;
  let match;
  while ((match = re.exec(raw))) {
    const candidate = normalizeUsername(match[1] || "");
    if (!candidate) continue;
    if (!usersByName.has(candidate)) continue;
    if (seen.has(candidate)) continue;
    seen.add(candidate);
    out.push(candidate);
    if (out.length >= 16) break;
  }
  return out;
}

function sanitizeReplyMeta(raw) {
  if (!raw || typeof raw !== "object") return null;
  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  if (!id) return null;
  const fromUser = normalizeUsername(raw.fromUser || "");
  const text = String(raw.text || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
  const createdAt = Number(raw.createdAt || 0) || 0;
  return { id, fromUser, text: text || "[media]", createdAt };
}

function normalizeRole(role) {
  if (role === ROLE_OWNER || role === ROLE_MODERATOR || role === ROLE_MEMBER) return role;
  return ROLE_MEMBER;
}

function parseUntil(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.floor(n);
}

function getUserRole(username) {
  const user = usersByName.get(normalizeUsername(username));
  return normalizeRole(user?.role);
}

function hasRole(username, minRole) {
  const rank = ROLE_RANK[getUserRole(username)] || 0;
  const need = ROLE_RANK[normalizeRole(minRole)] || 0;
  return rank >= need;
}

function userState(username) {
  const u = usersByName.get(normalizeUsername(username));
  const t = now();
  const mutedUntil = parseUntil(u?.mutedUntil);
  const suspendedUntil = parseUntil(u?.suspendedUntil);
  return {
    role: normalizeRole(u?.role),
    muted: mutedUntil > t,
    mutedUntil,
    suspended: suspendedUntil > t,
    suspendedUntil,
    banned: Boolean(u?.banned)
  };
}

function authPayloadForUser(username) {
  const state = userState(username);
  const user = usersByName.get(normalizeUsername(username));
  return {
    username,
    role: state.role,
    customRoles: sanitizeCustomRoleKeys(user?.customRoles),
    mutedUntil: state.mutedUntil,
    suspendedUntil: state.suspendedUntil,
    banned: state.banned
  };
}

function getUserPrefs(username) {
  const normalized = normalizeUsername(username);
  const user = usersByName.get(normalized);
  if (!user) return { starredPostIds: [], hiddenPostIds: [], ignoredUsers: [], blockedUsers: [] };
  const starred = sanitizePostIdList(user.starredPostIds).filter((id) => posts.has(id));
  const hidden = sanitizePostIdList(user.hiddenPostIds).filter((id) => posts.has(id));
  const ignored = sanitizeUsernameList(user.ignoredUsers);
  const blocked = sanitizeUsernameList(user.blockedUsers);
  return { starredPostIds: starred, hiddenPostIds: hidden, ignoredUsers: ignored, blockedUsers: blocked };
}

function sendUserPrefs(ws) {
  const username = ws?.user?.username;
  if (!username) return;
  ws.send(JSON.stringify({ type: "userPrefs", prefs: getUserPrefs(username) }));
}

function updateUserPrefs(username, patchFn) {
  const normalized = normalizeUsername(username);
  if (!normalized) return { ok: false, prefs: { starredPostIds: [], hiddenPostIds: [], ignoredUsers: [], blockedUsers: [] } };
  const write = writeUserPatch(normalized, (raw) => {
    const next = patchFn({
      starredPostIds: sanitizePostIdList(raw?.starredPostIds),
      hiddenPostIds: sanitizePostIdList(raw?.hiddenPostIds),
      ignoredUsers: sanitizeUsernameList(raw?.ignoredUsers),
      blockedUsers: sanitizeUsernameList(raw?.blockedUsers)
    });
    return {
      ...raw,
      starredPostIds: sanitizePostIdList(next?.starredPostIds),
      hiddenPostIds: sanitizePostIdList(next?.hiddenPostIds),
      ignoredUsers: sanitizeUsernameList(next?.ignoredUsers),
      blockedUsers: sanitizeUsernameList(next?.blockedUsers)
    };
  });
  if (!write.ok) return { ok: false, prefs: getUserPrefs(normalized) };
  return { ok: true, prefs: getUserPrefs(normalized) };
}

function sanitizeUsernameList(raw) {
  const arr = Array.isArray(raw) ? raw : [];
  const out = [];
  const seen = new Set();
  for (const item of arr) {
    const u = normalizeUsername(item);
    if (!u) continue;
    if (seen.has(u)) continue;
    seen.add(u);
    out.push(u);
    if (out.length >= 400) break;
  }
  return out;
}

function isBlockedByEitherSide(a, b) {
  const ua = normalizeUsername(a);
  const ub = normalizeUsername(b);
  if (!ua || !ub) return false;
  const userA = usersByName.get(ua);
  const userB = usersByName.get(ub);
  const aBlocked = sanitizeUsernameList(userA?.blockedUsers);
  const bBlocked = sanitizeUsernameList(userB?.blockedUsers);
  return aBlocked.includes(ub) || bBlocked.includes(ua);
}

function safeEqualHex(aHex, bHex) {
  try {
    const a = Buffer.from(aHex, "hex");
    const b = Buffer.from(bHex, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function hashPassword(password, saltHex) {
  const salt = Buffer.from(saltHex, "hex");
  const derived = crypto.scryptSync(String(password), salt, 64);
  return derived.toString("hex");
}

function hashSessionSecret(secret) {
  return crypto.createHash("sha256").update(String(secret)).digest("hex");
}

function hasPostAccess(ws, post) {
  if (!post?.protected) return true;
  const username = ws?.user?.username;
  if (username && hasRole(username, ROLE_MODERATOR)) return true;
  if (username && post.author && username === post.author) return true;
  if (ws?.unlockedPostIds?.has(post.id)) return true;
  return false;
}

function verifyPostPassword(post, password) {
  if (!post?.protected) return true;
  if (!post.lockSalt || !post.lockHash) return false;
  const computed = hashPassword(password, post.lockSalt);
  return safeEqualHex(computed, post.lockHash);
}

function serializeChatMessageForWs(message) {
  if (!message || typeof message !== "object") return null;
  return {
    id: typeof message.id === "string" ? message.id : "",
    postId: typeof message.postId === "string" ? message.postId : "",
    text: typeof message.text === "string" ? message.text : "",
    html: typeof message.html === "string" ? message.html : "",
    mentions: Array.isArray(message.mentions) ? message.mentions : [],
    replyTo: message.replyTo || null,
    deleted: Boolean(message.deleted),
    deletedAt: Number(message.deletedAt || 0) || 0,
    deletedBy: normalizeUsername(message.deletedBy || ""),
    deletedByRole: normalizeRole(message.deletedByRole || ROLE_MEMBER),
    editCount: Number(message.editCount || 0) || 0,
    editedAt: Number(message.editedAt || 0) || 0,
    reactions: message.reactions || {},
    createdAt: Number(message.createdAt || 0) || 0,
    fromClientId: typeof message.fromClientId === "string" ? message.fromClientId : "",
    fromUser: normalizeUsername(message.fromUser || "")
  };
}

function serializeChatHistoryForWs(entry) {
  if (!entry?.chat) return [];
  return entry.chat.map(serializeChatMessageForWs).filter(Boolean);
}

function serializePostForWs(ws, post) {
  const base = {
    id: post.id,
    title: post.title || "",
    content: post.content || "",
    contentHtml: post.contentHtml || "",
    author: post.author,
    mode: sanitizePostMode(post.mode),
    readOnly: Boolean(post.readOnly),
    collectionId: normalizeCollectionId(post.collectionId || "") || DEFAULT_COLLECTION_ID,
    keywords: post.keywords,
    createdAt: post.createdAt,
    expiresAt: post.expiresAt,
    lastActivityAt: post.lastActivityAt,
    boostUntil: post.boostUntil,
    protected: Boolean(post.protected),
    deleted: Boolean(post.deleted),
    deletedAt: Number(post.deletedAt || 0) || 0,
    deletedBy: normalizeUsername(post.deletedBy || ""),
    deletedByRole: normalizeRole(post.deletedByRole || ROLE_MEMBER),
    deleteReason: typeof post.deleteReason === "string" ? post.deleteReason : "",
    editCount: Number(post.editCount || 0) || 0,
    editedAt: Number(post.editedAt || 0) || 0,
    reactions: post.reactions || {}
  };

  if (ws?.user?.username && hasRole(ws.user.username, ROLE_MODERATOR)) {
    base.restoreAvailable = Boolean(post.deleted && post.deletedSnapshot);
  }

  if (!post.protected) {
    return { ...base, locked: false };
  }

  if (!hasPostAccess(ws, post)) {
    const showDeleted = Boolean(post.deleted);
    return {
      ...base,
      locked: true,
      title: showDeleted ? "Post was deleted" : "",
      content: showDeleted ? "This post was deleted." : "",
      contentHtml: "",
      keywords: [],
      reactions: {}
    };
  }

  return { ...base, locked: false };
}

function sendToSockets(filterFn, obj) {
  const payload = JSON.stringify(obj);
  for (const ws of sockets) {
    if (ws.readyState !== ws.OPEN) continue;
    if (!filterFn(ws)) continue;
    ws.send(payload);
  }
}

function loadUsersFromDisk() {
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf8");
    const data = JSON.parse(raw);
    const list = Array.isArray(data) ? data : Array.isArray(data?.users) ? data.users : [];
    const map = new Map();
    const sorted = [];
    for (const u of list) {
      const username = normalizeUsername(u?.username);
      const salt = typeof u?.salt === "string" ? u.salt : "";
      const hash = typeof u?.hash === "string" ? u.hash : "";
      if (!username || !salt || !hash) continue;
      sorted.push({
        username,
        salt,
        hash,
        createdAt: u?.createdAt,
        image: sanitizeProfileImage(u?.image),
        color: sanitizeColorHex(u?.color),
        avatar: sanitizeAvatar(u?.avatar),
        pronouns: sanitizePronouns(u?.pronouns),
        bioHtml: sanitizeProfileBioHtml(u?.bioHtml),
        themeSongUrl: sanitizeThemeSongUrl(u?.themeSongUrl),
        links: sanitizeProfileLinks(u?.links),
        role: normalizeRole(u?.role),
        customRoles: sanitizeCustomRoleKeys(u?.customRoles),
        mutedUntil: parseUntil(u?.mutedUntil),
        suspendedUntil: parseUntil(u?.suspendedUntil),
        banned: Boolean(u?.banned),
        starredPostIds: sanitizePostIdList(u?.starredPostIds),
        hiddenPostIds: sanitizePostIdList(u?.hiddenPostIds)
      });
    }
    sorted.sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
    let ownerAssigned = false;
    for (const u of sorted) {
      const role = u.role === ROLE_OWNER ? ROLE_OWNER : ownerAssigned ? u.role : ROLE_OWNER;
      if (role === ROLE_OWNER) ownerAssigned = true;
      map.set(u.username, { ...u, role });
    }
    usersByName = map;
  } catch (e) {
    if (e?.code === "ENOENT") {
      usersByName = new Map();
      return;
    }
    console.warn("Failed to load users file (keeping existing cache):", e.message || e);
  }
}

function readUsersFileForWrite() {
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf8");
    const data = JSON.parse(raw);
    const list = Array.isArray(data) ? data : Array.isArray(data?.users) ? data.users : [];
    return { version: 1, users: Array.isArray(list) ? list : [] };
  } catch (e) {
    if (e?.code === "ENOENT") return { version: 1, users: [] };
    throw e;
  }
}

function writeUsersFile(data) {
  writeFileAtomic(USERS_FILE, JSON.stringify({ version: 1, users: data.users }, null, 2) + "\n");
}

function loadModerationLogFromDisk() {
  try {
    const raw = fs.readFileSync(MOD_LOG_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.entries) ? parsed.entries : [];
    moderationLog = list
      .filter((x) => x && typeof x === "object")
      .map((x) => ({
        id: typeof x.id === "string" ? x.id : toId(),
        actionType: typeof x.actionType === "string" ? x.actionType : "unknown",
        actor: normalizeUsername(x.actor || ""),
        targetType: typeof x.targetType === "string" ? x.targetType : "system",
        targetId: typeof x.targetId === "string" ? x.targetId : "",
        reason: typeof x.reason === "string" ? x.reason.slice(0, 280) : "",
        metadata: x.metadata && typeof x.metadata === "object" ? x.metadata : {},
        createdAt: Number(x.createdAt || 0) || now()
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch (e) {
    moderationLog = [];
    if (e?.code !== "ENOENT") console.warn("Failed to load moderation log:", e.message || e);
  }
}

function persistModerationLog() {
  ensureDataDir(MOD_LOG_FILE);
  fs.writeFileSync(MOD_LOG_FILE, JSON.stringify({ version: 1, entries: moderationLog }, null, 2) + "\n", "utf8");
}

function appendModLog(entry) {
  const clean = {
    id: toId(),
    actionType: String(entry?.actionType || "unknown"),
    actor: normalizeUsername(entry?.actor || ""),
    targetType: String(entry?.targetType || "system"),
    targetId: String(entry?.targetId || ""),
    reason: String(entry?.reason || "").trim().slice(0, 280),
    metadata: entry?.metadata && typeof entry.metadata === "object" ? entry.metadata : {},
    createdAt: now()
  };
  if (!clean.actor || !clean.reason) return null;
  moderationLog.unshift(clean);
  if (moderationLog.length > 10_000) moderationLog.splice(10_000);
  persistModerationLog();
  sendToSockets((ws) => ws.user?.username && hasRole(ws.user.username, ROLE_MODERATOR), { type: "modLogAppended", entry: clean });
  return clean;
}

function safeDevLogText(value, maxLen = 800) {
  const s = typeof value === "string" ? value : value == null ? "" : String(value);
  const trimmed = s.replace(/\s+/g, " ").trim();
  return trimmed.length > maxLen ? `${trimmed.slice(0, maxLen)}…` : trimmed;
}

function safeDevLogJson(value, maxLen = 2400) {
  if (value == null) return "";
  try {
    const raw = JSON.stringify(value);
    if (!raw) return "";
    return raw.length > maxLen ? `${raw.slice(0, maxLen)}…` : raw;
  } catch (e) {
    return safeDevLogText(e?.message || e, maxLen);
  }
}

function appendDevLog(entry) {
  const clean = {
    id: devLogSeq++,
    createdAt: now(),
    level: safeDevLogText(entry?.level || "info", 16).toLowerCase(),
    scope: safeDevLogText(entry?.scope || "server", 80),
    message: safeDevLogText(entry?.message || "", 2000),
    data: safeDevLogJson(entry?.data, 8000)
  };

  devLog.unshift(clean);
  if (devLog.length > 2000) devLog.splice(2000);

  sendToSockets(
    (ws) => ws.user?.username && hasRole(ws.user.username, ROLE_MODERATOR),
    { type: "devLogAppended", entry: clean }
  );
  return clean;
}

function listDevLog(limit = 200) {
  const n = Math.max(1, Math.min(1000, Math.floor(Number(limit) || 200)));
  return devLog.slice(0, n);
}

function sendDevLogForWs(ws, limit = 200) {
  ws.send(JSON.stringify({ type: "devLogSnapshot", log: listDevLog(limit) }));
}

function writeUserPatch(username, patchFn) {
  const normalized = normalizeUsername(username);
  if (!normalized) return { ok: false, message: "User not found." };
  try {
    const data = readUsersFileForWrite();
    const idx = (data.users || []).findIndex((u) => normalizeUsername(u?.username) === normalized);
    if (idx < 0) return { ok: false, message: "User not found." };
    const current = data.users[idx] || {};
    const next = patchFn({ ...current });
    if (!next || typeof next !== "object") return { ok: false, message: "Update failed." };
    data.users[idx] = next;
    writeUsersFile(data);
    loadUsersFromDisk();
    return { ok: true, user: usersByName.get(normalized) };
  } catch (e) {
    console.warn("Failed to write user patch:", e.message || e);
    return { ok: false, message: "Failed to update user." };
  }
}

function loadReportsFromDisk() {
  try {
    const raw = fs.readFileSync(REPORTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.reports) ? parsed.reports : [];
    reports = list
      .filter((x) => x && typeof x === "object")
      .map((x) => ({
        id: typeof x.id === "string" ? x.id : toId(),
        targetType: x.targetType === "post" || x.targetType === "chat" ? x.targetType : "post",
        targetId: typeof x.targetId === "string" ? x.targetId : "",
        postId: typeof x.postId === "string" ? x.postId : "",
        reporter: normalizeUsername(x.reporter || ""),
        reason: typeof x.reason === "string" ? x.reason.slice(0, 500) : "",
        status: x.status === "resolved" || x.status === "dismissed" ? x.status : "open",
        resolutionNote: typeof x.resolutionNote === "string" ? x.resolutionNote.slice(0, 280) : "",
        createdAt: Number(x.createdAt || 0) || now(),
        resolvedAt: Number(x.resolvedAt || 0) || 0,
        resolvedBy: normalizeUsername(x.resolvedBy || "")
      }))
      .filter((x) => x.targetId && x.reporter)
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch (e) {
    reports = [];
    if (e?.code !== "ENOENT") console.warn("Failed to load reports:", e.message || e);
  }
}

function persistReports() {
  ensureDataDir(REPORTS_FILE);
  fs.writeFileSync(REPORTS_FILE, JSON.stringify({ version: 1, reports }, null, 2) + "\n", "utf8");
}

function persistSessions() {
  ensureDataDir(SESSIONS_FILE);
  const sessions = Array.from(sessionsById.values());
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify({ version: 1, sessions }, null, 2) + "\n", "utf8");
}

function loadSessionsFromDisk() {
  const data = readJsonFileOrNull(SESSIONS_FILE);
  const list = Array.isArray(data?.sessions) ? data.sessions : Array.isArray(data) ? data : [];
  const map = new Map();
  const t = now();
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const id = typeof item.id === "string" ? item.id : "";
    const username = normalizeUsername(item.username || "");
    const secretHash = typeof item.secretHash === "string" ? item.secretHash : "";
    const createdAt = Number(item.createdAt || 0) || t;
    const expiresAt = Number(item.expiresAt || 0) || 0;
    const lastSeenAt = Number(item.lastSeenAt || 0) || createdAt;
    if (!id || !username || !secretHash || expiresAt <= t) continue;
    map.set(id, { id, username, secretHash, createdAt, expiresAt, lastSeenAt });
  }
  sessionsById = map;
}

function issueSessionToken(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) return "";
  const id = toId();
  const secret = crypto.randomBytes(24).toString("hex");
  const record = {
    id,
    username: normalized,
    secretHash: hashSessionSecret(secret),
    createdAt: now(),
    lastSeenAt: now(),
    expiresAt: now() + SESSION_TTL_MS
  };
  sessionsById.set(id, record);
  persistSessions();
  return `${id}.${secret}`;
}

function validateSessionToken(token) {
  if (typeof token !== "string") return null;
  const trimmed = token.trim();
  if (!trimmed) return null;
  const dot = trimmed.indexOf(".");
  if (dot <= 0) return null;
  const id = trimmed.slice(0, dot);
  const secret = trimmed.slice(dot + 1);
  if (!id || !secret) return null;
  const rec = sessionsById.get(id);
  if (!rec) return null;
  if (Number(rec.expiresAt || 0) <= now()) {
    sessionsById.delete(id);
    persistSessions();
    return null;
  }
  const computed = hashSessionSecret(secret);
  if (!safeEqualHex(computed, rec.secretHash)) return null;
  rec.lastSeenAt = now();
  rec.expiresAt = now() + SESSION_TTL_MS;
  sessionsById.set(id, rec);
  persistSessions();
  return rec;
}

function revokeSessionId(id) {
  if (!id) return;
  if (sessionsById.delete(id)) persistSessions();
}

function revokeUserSessions(username) {
  const normalized = normalizeUsername(username);
  if (!normalized) return;
  let changed = false;
  for (const [id, rec] of sessionsById.entries()) {
    if (normalizeUsername(rec.username || "") !== normalized) continue;
    sessionsById.delete(id);
    changed = true;
  }
  if (changed) persistSessions();
}

function listReports(filter = {}) {
  const status = typeof filter.status === "string" ? filter.status : "";
  const reporter = normalizeUsername(filter.reporter || "");
  return reports.filter((r) => {
    if (status && r.status !== status) return false;
    if (reporter && r.reporter !== reporter) return false;
    return true;
  });
}

function defaultCollectionRecord() {
  return {
    id: DEFAULT_COLLECTION_ID,
    name: "General",
    slug: "general",
    description: "",
    createdBy: "system",
    createdAt: 0,
    order: 0,
    visibility: "public",
    allowedRoles: [],
    archived: false
  };
}

function sanitizeCollectionRecord(raw, index) {
  const id = normalizeCollectionId(raw?.id || "");
  const name = normalizeCollectionName(raw?.name || "");
  if (!id || !name) return null;
  const order = Number(raw?.order);
  const visibility = raw?.visibility === "gated" ? "gated" : "public";
  return {
    id,
    name,
    slug: slugifyCollection(raw?.slug || name) || id,
    description: typeof raw?.description === "string" ? raw.description.slice(0, 240) : "",
    createdBy: normalizeUsername(raw?.createdBy || "") || "system",
    createdAt: Number(raw?.createdAt || 0) || now(),
    order: Number.isFinite(order) ? order : index + 1,
    visibility,
    allowedRoles: visibility === "gated" ? sanitizeAllowedRoleTokens(raw?.allowedRoles) : [],
    archived: Boolean(raw?.archived) && id !== DEFAULT_COLLECTION_ID
  };
}

function userRoleTokens(username) {
  const normalized = normalizeUsername(username || "");
  const role = getUserRole(normalized);
  const tokens = new Set([role]);
  const user = usersByName.get(normalized);
  for (const key of sanitizeCustomRoleKeys(user?.customRoles)) {
    const token = customRoleToken(key);
    if (token) tokens.add(token);
  }
  return tokens;
}

function hasCollectionAccessForUser(username, collection) {
  if (!collection || typeof collection !== "object") return true;
  const visibility = collection.visibility === "gated" ? "gated" : "public";
  if (visibility === "public") return true;
  const normalized = normalizeUsername(username || "");
  if (!normalized) return false;
  if (hasRole(normalized, ROLE_MODERATOR)) return true;
  const allowed = sanitizeAllowedRoleTokens(collection.allowedRoles);
  if (!allowed.length) return false;
  const tokens = userRoleTokens(normalized);
  for (const token of allowed) {
    if (tokens.has(token)) return true;
  }
  return false;
}

function collectionForPost(post) {
  const id = normalizeCollectionId(post?.collectionId || "");
  const found = collections.find((c) => c.id === id);
  return found || defaultCollectionRecord();
}

function canUserSeePostByCollection(username, post) {
  return hasCollectionAccessForUser(username, collectionForPost(post));
}

function listCollectionsForClient(username = "") {
  return collections
    .slice()
    .filter((c) => !c.archived && hasCollectionAccessForUser(username, c))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || a.name.localeCompare(b.name))
    .map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || "",
      order: Number(c.order || 0),
      archived: Boolean(c.archived),
      visibility: c.visibility === "gated" ? "gated" : "public",
      allowedRoles: sanitizeAllowedRoleTokens(c.allowedRoles)
    }));
}

function getActiveCollectionById(id) {
  const normalized = normalizeCollectionId(id || "");
  if (!normalized) return null;
  const found = collections.find((c) => c.id === normalized && !c.archived);
  return found || null;
}

function persistCollections() {
  ensureDataDir(COLLECTIONS_FILE);
  fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify({ version: 1, collections }, null, 2) + "\n", "utf8");
}

function loadCollectionsFromDisk() {
  const parsed = readJsonFileOrNull(COLLECTIONS_FILE);
  const list = Array.isArray(parsed?.collections) ? parsed.collections : Array.isArray(parsed) ? parsed : [];
  const out = [];
  const seen = new Set();
  for (let i = 0; i < list.length; i += 1) {
    const clean = sanitizeCollectionRecord(list[i], i);
    if (!clean) continue;
    if (seen.has(clean.id)) continue;
    seen.add(clean.id);
    out.push(clean);
  }
  if (!seen.has(DEFAULT_COLLECTION_ID)) out.unshift(defaultCollectionRecord());
  collections = out
    .map((c, i) => ({ ...c, order: Number.isFinite(Number(c.order)) ? Number(c.order) : i }))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || a.name.localeCompare(b.name));
  for (const collection of collections) {
    if (collection.visibility !== "gated") continue;
    collection.allowedRoles = validateAllowedRoleTokensForCurrentRoles(collection.allowedRoles);
    if (!collection.allowedRoles.length) collection.visibility = "public";
  }
}

function broadcastCollections(opts = {}) {
  const includePostsSnapshot = opts.includePostsSnapshot !== false;
  for (const ws of sockets) {
    if (ws.readyState !== ws.OPEN) continue;
    ws.send(JSON.stringify({ type: "collectionsUpdated", collections: listCollectionsForClient(ws.user?.username || "") }));
    if (includePostsSnapshot) sendPostsSnapshot(ws);
  }
}

function listCustomRolesForClient() {
  return customRoles
    .filter((r) => !r.archived)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || a.label.localeCompare(b.label))
    .map((r) => ({
      key: r.key,
      label: r.label,
      color: r.color,
      order: Number(r.order || 0)
    }));
}

function broadcastCustomRoles() {
  broadcast({ type: "rolesUpdated", roles: listCustomRolesForClient() });
}

function sanitizeCustomRoleRecord(raw, index) {
  const key = normalizeCustomRoleKey(raw?.key || "");
  const label = normalizeCustomRoleLabel(raw?.label || "");
  if (!key || !label) return null;
  const color = sanitizeColorHex(raw?.color || "") || "#ff3ea5";
  const order = Number(raw?.order);
  return {
    key,
    label,
    color,
    order: Number.isFinite(order) ? order : index + 1,
    createdAt: Number(raw?.createdAt || 0) || now(),
    createdBy: normalizeUsername(raw?.createdBy || "") || "system",
    archived: Boolean(raw?.archived)
  };
}

function loadCustomRolesFromDisk() {
  const parsed = readJsonFileOrNull(ROLES_FILE);
  const list = Array.isArray(parsed?.roles) ? parsed.roles : Array.isArray(parsed) ? parsed : [];
  const out = [];
  const seen = new Set();
  for (let i = 0; i < list.length; i += 1) {
    const role = sanitizeCustomRoleRecord(list[i], i);
    if (!role) continue;
    if (seen.has(role.key)) continue;
    seen.add(role.key);
    out.push(role);
  }
  customRoles = out
    .map((r, i) => ({ ...r, order: Number.isFinite(Number(r.order)) ? Number(r.order) : i + 1 }))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || a.label.localeCompare(b.label));
}

function persistCustomRoles() {
  ensureDataDir(ROLES_FILE);
  fs.writeFileSync(ROLES_FILE, JSON.stringify({ version: 1, roles: customRoles }, null, 2) + "\n", "utf8");
}

function getPublicProfile(username) {
  const normalized = normalizeUsername(username);
  const u = usersByName.get(normalized);
  if (!u) {
    return { username: normalized || String(username || ""), image: "", color: "", pronouns: "", bioHtml: "", themeSongUrl: "", links: [] };
  }
  return {
    username: normalized,
    image: u.image || "",
    color: u.color || "",
    pronouns: sanitizePronouns(u.pronouns),
    bioHtml: sanitizeProfileBioHtml(u.bioHtml),
    themeSongUrl: sanitizeThemeSongUrl(u.themeSongUrl),
    links: sanitizeProfileLinks(u.links)
  };
}

function buildProfilesMap() {
  const out = {};
  for (const [username, u] of usersByName.entries()) {
    out[username] = { image: u.image || "", color: u.color || "" };
  }
  return out;
}

function getOnlineUsernames() {
  const out = new Set();
  for (const ws of sockets) {
    if (ws.readyState !== ws.OPEN) continue;
    const username = normalizeUsername(ws.user?.username || "");
    if (username) out.add(username);
  }
  return out;
}

function buildPeopleSnapshot() {
  const online = getOnlineUsernames();
  const members = [];
  for (const [username, u] of usersByName.entries()) {
    const state = userState(username);
    const status = state.banned
      ? "banned"
      : state.suspended
        ? "suspended"
        : state.muted
          ? "muted"
          : online.has(username)
            ? "online"
            : "offline";
    members.push({
      username,
      image: u.image || "",
      color: u.color || "",
      role: state.role,
      customRoles: sanitizeCustomRoleKeys(u.customRoles),
      online: online.has(username),
      status
    });
  }
  members.sort((a, b) => Number(b.online) - Number(a.online) || a.username.localeCompare(b.username));
  return members;
}

function broadcastPeopleSnapshot() {
  broadcast({ type: "peopleSnapshot", members: buildPeopleSnapshot() });
}

function isLoopbackAddress(remoteAddress) {
  if (!remoteAddress) return false;
  return remoteAddress === "127.0.0.1" || remoteAddress === "::1" || remoteAddress === "::ffff:127.0.0.1";
}

function canRegisterFirstUser(ws) {
  return usersByName.size === 0 && ws.isLoopback === true;
}

function registrationEnabled() {
  return Boolean(REGISTRATION_CODE && REGISTRATION_CODE.trim());
}

function validRegistrationCode(code) {
  if (!registrationEnabled()) return false;
  if (typeof code !== "string") return false;
  const a = REGISTRATION_CODE.trim().toLowerCase();
  const b = code.trim().toLowerCase();
  if (!a || !b) return false;
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function clampTtl(ttlMs) {
  if (!Number.isFinite(ttlMs)) return DEFAULT_TTL_MS;
  return Math.max(MIN_TTL_MS, Math.min(MAX_TTL_MS, Math.floor(ttlMs)));
}

function clampBoostMs(ms) {
  if (!Number.isFinite(ms)) return BOOST_MIN_MS;
  return Math.max(BOOST_MIN_MS, Math.min(BOOST_MAX_MS, Math.floor(ms)));
}

function readJsonFileOrNull(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    if (e?.code === "ENOENT") return null;
    warnFileAccessOnce({ filePath, op: "read", err: e });
    return null;
  }
}

const warnedFileAccess = new Set();
function warnFileAccessOnce({ filePath, op, err }) {
  const code = String(err?.code || "");
  const key = `${op}:${filePath}:${code}`;
  if (warnedFileAccess.has(key)) return;
  warnedFileAccess.add(key);

  console.warn(`Failed to ${op} ${filePath}:`, err?.message || err);
  if (process.platform !== "win32") return;
  if (code !== "EPERM" && code !== "EACCES") return;

  console.warn(
    [
      "[Bzl] Windows blocked file access.",
      "This is commonly caused by Windows Security 'Controlled folder access' (ransomware protection) blocking Node.js from writing to Desktop/Documents.",
      "Fix options:",
      "  - Move the Bzl folder to a non-protected location (example: C:\\dev\\Bzl), OR",
      "  - Windows Security -> Virus & threat protection -> Ransomware protection -> Controlled folder access -> Allow an app -> add node.exe",
      "If the file is open/locked by another program, close it and try again."
    ].join("\n")
  );
}

function ensureDataDir(filePath) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  } catch {
    // ignore
  }
}

function writeFileAtomic(targetPath, content) {
  try {
    ensureDataDir(targetPath);
    const dir = path.dirname(targetPath);
    const base = path.basename(targetPath);
    const tmpPath = path.join(dir, `.${base}.tmp_${process.pid}_${Date.now()}`);
    fs.writeFileSync(tmpPath, content, "utf8");
    try {
      fs.renameSync(tmpPath, targetPath);
    } catch {
      try {
        fs.rmSync(targetPath, { force: true });
      } catch {
        // ignore
      }
      fs.renameSync(tmpPath, targetPath);
    }
  } catch (e) {
    warnFileAccessOnce({ filePath: targetPath, op: "write", err: e });
    throw e;
  }
}

function readFileOrEmpty(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    if (e?.code === "ENOENT") return "";
    warnFileAccessOnce({ filePath, op: "read", err: e });
    return "";
  }
}

function normalizePluginId(raw) {
  const s = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  if (!s) return "";
  if (!/^[a-z0-9][a-z0-9_.-]{0,31}$/.test(s)) return "";
  return s;
}

function sanitizePluginManifest(raw, fallbackId) {
  const id = normalizePluginId(raw?.id) || normalizePluginId(fallbackId);
  if (!id) return null;
  const name = typeof raw?.name === "string" ? raw.name.replace(/\s+/g, " ").trim().slice(0, 64) : "";
  const version = typeof raw?.version === "string" ? raw.version.trim().slice(0, 32) : "";
  const description = typeof raw?.description === "string" ? raw.description.trim().slice(0, 240) : "";
  const entryClient = typeof raw?.entryClient === "string" ? raw.entryClient.trim() : "";
  const entryServer = typeof raw?.entryServer === "string" ? raw.entryServer.trim() : "";
  const permissions = Array.isArray(raw?.permissions)
    ? raw.permissions.filter((p) => typeof p === "string" && p.trim()).map((p) => p.trim().slice(0, 64)).slice(0, 24)
    : [];

  const isSafeEntry = (p) => typeof p === "string" && /^[a-zA-Z0-9][a-zA-Z0-9/_\.-]{0,240}$/.test(p) && !p.includes("..");
  const cleanClient = entryClient && isSafeEntry(entryClient) ? entryClient : "";
  const cleanServer = entryServer && isSafeEntry(entryServer) ? entryServer : "";

  return {
    id,
    name: name || id,
    version: version || "0.0.0",
    description,
    entryClient: cleanClient,
    entryServer: cleanServer,
    permissions
  };
}

function pluginDirForId(id) {
  const pid = normalizePluginId(id);
  if (!pid) return "";
  return path.resolve(PLUGINS_DIR, pid);
}

function readPluginManifestFromDisk(id) {
  const pid = normalizePluginId(id);
  if (!pid) return null;
  const dir = pluginDirForId(pid);
  const pluginsRoot = path.resolve(PLUGINS_DIR) + path.sep;
  if (!dir.startsWith(pluginsRoot)) return null;
  const manifestPath = path.join(dir, "plugin.json");
  const raw = readJsonFileOrNull(manifestPath);
  const safe = sanitizePluginManifest(raw || {}, pid);
  return safe;
}

function loadPluginsStateFromDisk() {
  const parsed = readJsonFileOrNull(PLUGINS_FILE);
  const list = Array.isArray(parsed?.plugins) ? parsed.plugins : [];
  const map = new Map();
  for (const p of list) {
    const id = normalizePluginId(p?.id);
    if (!id) continue;
    map.set(id, { enabled: Boolean(p?.enabled) });
  }
  pluginsStateById = map;
}

function persistPluginsStateToDisk() {
  const plugins = Array.from(pluginsStateById.entries()).map(([id, st]) => ({ id, enabled: Boolean(st?.enabled) }));
  writeFileAtomic(PLUGINS_FILE, JSON.stringify({ version: 1, plugins }, null, 2) + "\n");
}

function listPluginsForClient() {
  const out = [];
  for (const [id, manifest] of pluginManifestsById.entries()) {
    const enabled = Boolean(pluginsStateById.get(id)?.enabled);
    const runtime = pluginRuntimeById.get(id);
    out.push({
      id,
      name: manifest.name,
      version: manifest.version,
      description: manifest.description,
      enabled,
      entryClient: manifest.entryClient || "",
      entryServer: manifest.entryServer || "",
      permissions: Array.isArray(manifest.permissions) ? manifest.permissions : [],
      error: runtime?.error || ""
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

function broadcastPluginsUpdated() {
  const payload = { type: "pluginsUpdated", plugins: listPluginsForClient() };
  for (const ws of sockets) {
    if (ws.readyState !== ws.OPEN) continue;
    ws.send(JSON.stringify(payload));
  }
}

function sendPluginsForWs(ws) {
  ws.send(JSON.stringify({ type: "pluginsUpdated", plugins: listPluginsForClient() }));
}

function unloadAllPlugins() {
  pluginRuntimeById = new Map();
}

function loadPluginsFromDisk() {
  try {
    fs.mkdirSync(PLUGINS_DIR, { recursive: true });
  } catch {
    // ignore
  }
  loadPluginsStateFromDisk();
  pluginManifestsById = new Map();
  unloadAllPlugins();

  let dirs = [];
  try {
    dirs = fs.readdirSync(PLUGINS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    dirs = [];
  }

  for (const name of dirs) {
    const id = normalizePluginId(name);
    if (!id) continue;
    const manifest = readPluginManifestFromDisk(id);
    if (!manifest) continue;
    pluginManifestsById.set(id, manifest);
    if (!pluginsStateById.has(id)) pluginsStateById.set(id, { enabled: false });
      pluginRuntimeById.set(id, { wsHandlers: new Map(), httpHandlers: new Map(), onCloseHandlers: [] });
   }

  // Load enabled server plugins (optional).
  for (const [id, manifest] of pluginManifestsById.entries()) {
    const enabled = Boolean(pluginsStateById.get(id)?.enabled);
    if (!enabled) continue;
    if (!manifest.entryServer) continue;
    const dir = pluginDirForId(id);
    const entryPath = path.resolve(dir, manifest.entryServer);
    const root = dir + path.sep;
      if (!entryPath.startsWith(root)) {
        pluginRuntimeById.set(id, { wsHandlers: new Map(), httpHandlers: new Map(), onCloseHandlers: [], error: "Invalid server entry path." });
        continue;
      }

    try {
      try {
        const resolved = require.resolve(entryPath);
        if (resolved && require.cache[resolved]) delete require.cache[resolved];
      } catch {
        // ignore
      }
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const init = require(entryPath);
      if (typeof init !== "function") {
        pluginRuntimeById.set(id, { wsHandlers: new Map(), httpHandlers: new Map(), onCloseHandlers: [], error: "Server entry must export a function." });
        continue;
      }
      const runtime = pluginRuntimeById.get(id) || { wsHandlers: new Map(), httpHandlers: new Map(), onCloseHandlers: [] };
      const api = {
        id,
        log(level, message, data) {
          appendDevLog({ level: level || "info", scope: `plugin:${id}`, message, data });
          return true;
        },
        registerWs(eventName, handler) {
          const ev = typeof eventName === "string" ? eventName.trim() : "";
          if (!ev || !/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,63}$/.test(ev)) return false;
          if (typeof handler !== "function") return false;
          runtime.wsHandlers.set(ev, handler);
          return true;
        },
        registerHttp(method, routePath, handler) {
          const m = typeof method === "string" ? method.trim().toUpperCase() : "";
          if (!m || !/^(GET|POST|PUT|PATCH|DELETE)$/.test(m)) return false;
          const p = typeof routePath === "string" ? routePath.trim() : "";
          if (!p || !p.startsWith("/")) return false;
          if (p.includes("..")) return false;
          if (typeof handler !== "function") return false;
          runtime.httpHandlers.set(`${m} ${p}`, handler);
          return true;
        },
        onWsClose(handler) {
          if (typeof handler !== "function") return false;
          runtime.onCloseHandlers.push(handler);
          return true;
        },
        getProfile(username) {
          const u = normalizeUsername(username || "");
          if (!u) return null;
          return getPublicProfile(u);
        },
        sendToUsers(usernames, msg) {
          const list = Array.isArray(usernames) ? usernames : [];
          const set = new Set(list.map((u) => normalizeUsername(u)).filter(Boolean));
          if (!set.size) return 0;
          const payload = JSON.stringify(msg);
          let sent = 0;
          for (const client of sockets) {
            if (client.readyState !== client.OPEN) continue;
            const name = normalizeUsername(client.user?.username || "");
            if (!name || !set.has(name)) continue;
            client.send(payload);
            sent += 1;
          }
          return sent;
        },
        broadcast(msg) {
          // Enforce plugin-prefixed message types.
          const type = typeof msg?.type === "string" ? msg.type : "";
          if (!type.startsWith(`plugin:${id}:`)) return false;
          broadcast(msg);
          return true;
        },
        now
      };
      init(api);
      pluginRuntimeById.set(id, runtime);
    } catch (e) {
      appendDevLog({ level: "error", scope: `plugin:${id}`, message: "Failed to load server plugin", data: { error: e?.message || String(e) } });
      pluginRuntimeById.set(id, {
        wsHandlers: new Map(),
        httpHandlers: new Map(),
        onCloseHandlers: [],
        error: `Failed to load server plugin: ${e?.message || e}`
      });
    }
  }

  try {
    persistPluginsStateToDisk();
  } catch (e) {
    console.warn("Failed to persist plugins state:", e.message || e);
  }
}

function loadDmKey() {
  if (dmKey && Buffer.isBuffer(dmKey) && dmKey.length === 32) return;
  const fromEnv = typeof process.env.DM_STORE_KEY === "string" ? process.env.DM_STORE_KEY.trim() : "";
  let keyBuf = null;
  if (fromEnv) {
    try {
      const b64 = fromEnv.replace(/^base64:/i, "");
      const buf = Buffer.from(b64, "base64");
      if (buf.length === 32) keyBuf = buf;
    } catch {
      // ignore
    }
  }

  if (!keyBuf) {
    const raw = readFileOrEmpty(DM_KEY_FILE).trim();
    if (raw) {
      try {
        const buf = Buffer.from(raw, "base64");
        if (buf.length === 32) keyBuf = buf;
      } catch {
        // ignore
      }
    }
  }

  if (!keyBuf) {
    keyBuf = crypto.randomBytes(32);
    try {
      writeFileAtomic(DM_KEY_FILE, `${keyBuf.toString("base64")}\n`);
    } catch (e) {
      console.warn("Failed to persist DM key:", e.message || e);
    }
  }
  dmKey = keyBuf;
}

function dmEncryptUtf8(plainText) {
  loadDmKey();
  if (!dmKey) return "";
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", dmKey, iv);
  const buf = Buffer.concat([cipher.update(String(plainText || ""), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, buf]).toString("base64");
}

function dmDecryptUtf8(encoded) {
  loadDmKey();
  if (!dmKey) return "";
  try {
    const data = Buffer.from(String(encoded || ""), "base64");
    if (data.length < 12 + 16) return "";
    const iv = data.subarray(0, 12);
    const tag = data.subarray(12, 28);
    const buf = data.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", dmKey, iv);
    decipher.setAuthTag(tag);
    const out = Buffer.concat([decipher.update(buf), decipher.final()]).toString("utf8");
    return out;
  } catch {
    return "";
  }
}

function loadInstanceFromDisk() {
  const data = readJsonFileOrNull(INSTANCE_FILE);
  if (!data || typeof data !== "object") {
    instanceBranding = sanitizeInstanceBranding(instanceBranding);
    lastInstanceBroadcastHash = JSON.stringify(instanceBranding);
    return;
  }
  const appearance =
    data?.appearance && typeof data.appearance === "object"
      ? data.appearance
      : data?.instance?.appearance && typeof data.instance.appearance === "object"
        ? data.instance.appearance
        : {};
  instanceBranding = sanitizeInstanceBranding({
    title: typeof data.title === "string" ? data.title : data?.instance?.title,
    subtitle: typeof data.subtitle === "string" ? data.subtitle : data?.instance?.subtitle,
    allowMemberPermanentPosts: Boolean(
      Object.prototype.hasOwnProperty.call(data, "allowMemberPermanentPosts")
        ? data.allowMemberPermanentPosts
        : data?.instance?.allowMemberPermanentPosts
    ),
    appearance
  });
  lastInstanceBroadcastHash = JSON.stringify(instanceBranding);
}

function persistInstanceToDisk() {
  const clean = sanitizeInstanceBranding(instanceBranding);
  instanceBranding = clean;
  writeFileAtomic(INSTANCE_FILE, JSON.stringify({ version: 1, ...clean }, null, 2) + "\n");
}

function normalizeDmThread(raw) {
  if (!raw || typeof raw !== "object") return null;
  const id = typeof raw.id === "string" ? raw.id : toId();
  const users = Array.isArray(raw.users) ? raw.users.map((u) => normalizeUsername(u)).filter(Boolean) : [];
  if (users.length !== 2) return null;
  const a = users[0];
  const b = users[1];
  const requestedBy = normalizeUsername(raw.requestedBy || "");
  const pendingFor = normalizeUsername(raw.pendingFor || "");
  const state = raw.state === "active" || raw.state === "declined" || raw.state === "pending" ? raw.state : "pending";
  const createdAt = Number(raw.createdAt || now());
  const updatedAt = Number(raw.updatedAt || createdAt);
  const lastMessageAt = Number(raw.lastMessageAt || 0);
  const messages = Array.isArray(raw.messages)
    ? raw.messages
        .filter((m) => m && typeof m === "object")
        .map((m) => ({
          id: typeof m.id === "string" ? m.id : toId(),
          from: normalizeUsername(m.from || ""),
          createdAt: Number(m.createdAt || 0),
          enc: typeof m.enc === "string" ? m.enc : ""
        }))
        .filter((m) => m.id && m.from && m.createdAt && m.enc)
        .slice(-500)
    : [];
  return {
    id,
    users: [a, b],
    requestedBy: requestedBy || a,
    pendingFor: state === "pending" ? pendingFor : "",
    state,
    createdAt,
    updatedAt,
    lastMessageAt,
    messages
  };
}

function loadDmsFromDisk() {
  const parsed = readJsonFileOrNull(DMS_FILE);
  const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.threads) ? parsed.threads : [];
  const map = new Map();
  for (const raw of list) {
    const t = normalizeDmThread(raw);
    if (!t) continue;
    map.set(t.id, t);
  }
  dmThreadsById = map;
}

function persistDmsToDisk() {
  const threads = Array.from(dmThreadsById.values());
  writeFileAtomic(DMS_FILE, JSON.stringify({ version: 1, threads }, null, 2) + "\n");
}

function dmOtherUser(thread, username) {
  const u = normalizeUsername(username);
  if (!u) return "";
  const a = normalizeUsername(thread?.users?.[0] || "");
  const b = normalizeUsername(thread?.users?.[1] || "");
  if (a && a !== u) return a;
  if (b && b !== u) return b;
  return "";
}

function dmThreadStatusForUser(thread, username) {
  const u = normalizeUsername(username);
  if (!u) return "unknown";
  if (thread.state === "active") return "active";
  if (thread.state === "declined") return "declined";
  if (thread.state === "pending") {
    return thread.pendingFor === u ? "incoming" : "outgoing";
  }
  return "unknown";
}

function serializeDmThreadForUser(thread, username) {
  const other = dmOtherUser(thread, username);
  const status = dmThreadStatusForUser(thread, username);
  return {
    id: thread.id,
    other,
    status,
    requestedBy: thread.requestedBy,
    pendingFor: thread.pendingFor,
    createdAt: thread.createdAt,
    updatedAt: thread.updatedAt,
    lastMessageAt: thread.lastMessageAt || 0
  };
}

function listDmThreadsForUser(username) {
  const u = normalizeUsername(username);
  if (!u) return [];
  const list = [];
  for (const thread of dmThreadsById.values()) {
    if (!thread?.users?.includes(u)) continue;
    list.push(serializeDmThreadForUser(thread, u));
  }
  list.sort((a, b) => Math.max(b.updatedAt || 0, b.lastMessageAt || 0) - Math.max(a.updatedAt || 0, a.lastMessageAt || 0));
  return list.slice(0, 200);
}

function sendDmSnapshot(ws) {
  const username = ws?.user?.username;
  if (!username) return;
  ws.send(JSON.stringify({ type: "dmSnapshot", threads: listDmThreadsForUser(username) }));
}

function broadcastDmThread(thread) {
  const users = Array.isArray(thread?.users) ? thread.users : [];
  const a = normalizeUsername(users[0] || "");
  const b = normalizeUsername(users[1] || "");
  sendToSockets(
    (ws) => {
      const u = ws?.user?.username;
      return Boolean(u && (normalizeUsername(u) === a || normalizeUsername(u) === b));
    },
    { type: "dmThreadUpdated", thread: { a: serializeDmThreadForUser(thread, a), b: serializeDmThreadForUser(thread, b) } }
  );
}

function serializeDmMessageForWs(message) {
  const enc = typeof message?.enc === "string" ? message.enc : "";
  const payload = dmDecryptUtf8(enc);
  let parsed;
  try {
    parsed = JSON.parse(payload);
  } catch {
    parsed = null;
  }
  const text = typeof parsed?.text === "string" ? parsed.text : "";
  const html = typeof parsed?.html === "string" ? parsed.html : "";
  return {
    id: String(message?.id || ""),
    fromUser: String(message?.from || ""),
    createdAt: Number(message?.createdAt || 0),
    text,
    html
  };
}

function dmPurgeOld() {
  const cutoff = now() - Math.max(1, DM_RETENTION_MS);
  let changed = false;
  for (const [id, thread] of dmThreadsById.entries()) {
    const updatedAt = Number(thread.updatedAt || thread.createdAt || 0);
    const lastAt = Number(thread.lastMessageAt || 0);
    if (thread.state === "pending" && updatedAt && updatedAt < cutoff) {
      dmThreadsById.delete(id);
      changed = true;
      continue;
    }
    const before = Array.isArray(thread.messages) ? thread.messages.length : 0;
    if (before) {
      thread.messages = thread.messages.filter((m) => Number(m.createdAt || 0) >= cutoff);
      if (thread.messages.length !== before) {
        changed = true;
        thread.updatedAt = now();
      }
      thread.lastMessageAt = thread.messages.length ? Number(thread.messages[thread.messages.length - 1].createdAt || 0) : 0;
    }
    const hasMsgs = thread.messages && thread.messages.length > 0;
    if (!hasMsgs && Math.max(updatedAt, lastAt) && Math.max(updatedAt, lastAt) < cutoff) {
      dmThreadsById.delete(id);
      changed = true;
    }
  }
  if (changed) {
    try {
      persistDmsToDisk();
    } catch (e) {
      console.warn("Failed to persist DM purge:", e.message || e);
    }
  }
}

function schedulePersist() {
  if (persistTimer) return;
  persistTimer = setTimeout(() => {
    persistTimer = null;
    persistPostsToDisk();
  }, 250);
}

function mapSetsToObj(byEmoji) {
  const out = {};
  if (!byEmoji) return out;
  for (const [emoji, set] of byEmoji.entries()) {
    const arr = Array.from(set.values());
    if (arr.length) out[emoji] = arr;
  }
  return out;
}

function objToMapSets(obj) {
  const out = new Map();
  if (!obj || typeof obj !== "object") return out;
  for (const [emoji, arr] of Object.entries(obj)) {
    if (!ALLOWED_REACTIONS.includes(emoji)) continue;
    if (!Array.isArray(arr)) continue;
    const set = new Set(arr.filter((x) => typeof x === "string" && normalizeUsername(x)));
    if (set.size) out.set(emoji, set);
  }
  return out;
}

function persistPostsToDisk() {
  try {
    ensureDataDir(POSTS_FILE);
    const data = {
      version: 1,
      savedAt: now(),
      posts: Array.from(posts.values()).map((entry) => ({
        post: entry.post,
        chat: entry.chat
      })),
      postReactions: Object.fromEntries(
        Array.from(postReactionsByPostId.entries()).map(([postId, byEmoji]) => [postId, mapSetsToObj(byEmoji)])
      ),
      chatReactions: Object.fromEntries(
        Array.from(chatReactionsByMessageId.entries()).map(([messageId, byEmoji]) => [messageId, mapSetsToObj(byEmoji)])
      )
    };
    fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
  } catch (e) {
    console.warn("Failed to persist posts:", e.message || e);
  }
}

function loadPostsFromDisk() {
  const data = readJsonFileOrNull(POSTS_FILE);
  if (!data) return;
  const list = Array.isArray(data.posts) ? data.posts : [];
  const t = now();

  // Reactions maps
  postReactionsByPostId.clear();
  chatReactionsByMessageId.clear();
  if (data.postReactions && typeof data.postReactions === "object") {
    for (const [postId, obj] of Object.entries(data.postReactions)) {
      const map = objToMapSets(obj);
      if (map.size) postReactionsByPostId.set(postId, map);
    }
  }
  if (data.chatReactions && typeof data.chatReactions === "object") {
    for (const [messageId, obj] of Object.entries(data.chatReactions)) {
      const map = objToMapSets(obj);
      if (map.size) chatReactionsByMessageId.set(messageId, map);
    }
  }

  for (const item of list) {
    const p = item?.post;
    if (!p || typeof p !== "object") continue;
    const id = typeof p.id === "string" ? p.id : "";
    if (!id) continue;

    const createdAt = Number(p.createdAt || 0);
    const expiresAtRaw = Number(p.expiresAt || 0);
    if (!Number.isFinite(createdAt) || !Number.isFinite(expiresAtRaw) || createdAt <= 0) continue;
    const isPermanent = expiresAtRaw === 0;
    const expiresAt = isPermanent ? 0 : Math.min(expiresAtRaw, createdAt + MAX_TTL_MS);
    if (!isPermanent && expiresAt <= t) continue;

    const contentText = typeof p.content === "string" ? p.content.slice(0, POSTS_MAX_CONTENT_LEN) : "";
    const contentHtmlRaw = typeof p.contentHtml === "string" ? p.contentHtml.slice(0, POST_MAX_HTML_LEN) : "";
    const contentHtml = contentHtmlRaw ? sanitizeRichHtml(contentHtmlRaw) : "";
    const title = sanitizePostTitle(typeof p.title === "string" ? p.title : contentText);
    const author = normalizeUsername(p.author || "");
    const protectedPost = Boolean(p.protected);
    const lockSalt = typeof p.lockSalt === "string" ? p.lockSalt : "";
    const lockHash = typeof p.lockHash === "string" ? p.lockHash : "";

    let deletedSnapshot = null;
    const rawSnap = p.deletedSnapshot;
    if (rawSnap && typeof rawSnap === "object" && rawSnap.post && typeof rawSnap.post === "object") {
      const sp = rawSnap.post;
      const snapContentText = typeof sp.content === "string" ? sp.content.slice(0, POSTS_MAX_CONTENT_LEN) : "";
      const snapContentHtmlRaw =
        typeof sp.contentHtml === "string" ? sp.contentHtml.slice(0, POST_MAX_HTML_LEN) : "";
      const snapContentHtml = snapContentHtmlRaw ? sanitizeRichHtml(snapContentHtmlRaw) : "";
      const snapTitle = sanitizePostTitle(typeof sp.title === "string" ? sp.title : snapContentText);
      const snapAuthor = normalizeUsername(sp.author || "");
      const snapProtected = Boolean(sp.protected);
      const snapLockSalt = typeof sp.lockSalt === "string" ? sp.lockSalt : "";
      const snapLockHash = typeof sp.lockHash === "string" ? sp.lockHash : "";

      const snapChatList = Array.isArray(rawSnap.chat) ? rawSnap.chat : [];
      const snapChat = [];
      for (const m of snapChatList) {
        if (!m || typeof m !== "object") continue;
        const mid = typeof m.id === "string" ? m.id : "";
        const postId = typeof m.postId === "string" ? m.postId : id;
        const text = typeof m.text === "string" ? m.text.slice(0, CHAT_MAX_LEN) : "";
        const htmlRaw = typeof m.html === "string" ? m.html.slice(0, CHAT_MAX_HTML_LEN) : "";
        const html = htmlRaw ? sanitizeRichHtml(htmlRaw) : "";
        const createdAtMsg = Number(m.createdAt || 0) || createdAt;
        const fromUser = normalizeUsername(m.fromUser || "");
        const mentions = Array.isArray(m.mentions)
          ? m.mentions.map((x) => normalizeUsername(x)).filter(Boolean).slice(0, 16)
          : [];
        const replyTo = sanitizeReplyMeta(m.replyTo);
        const deleted = Boolean(m.deleted);
        const deletedAt = Number(m.deletedAt || 0) || 0;
        const deletedBy = normalizeUsername(m.deletedBy || "");
        const deletedByRole = normalizeRole(m.deletedByRole || ROLE_MEMBER);
        const editCount = Math.max(0, Number(m.editCount || 0) || 0);
        const editedAt = Number(m.editedAt || 0) || 0;
        if (!mid) continue;
        snapChat.push({
          id: mid,
          postId,
          text: text || (html ? "[media]" : ""),
          html,
          mentions,
          replyTo,
          deleted,
          deletedAt,
          deletedBy,
          deletedByRole,
          editCount,
          editedAt,
          reactions: {},
          createdAt: createdAtMsg,
          fromClientId: typeof m.fromClientId === "string" ? m.fromClientId : "",
          fromUser: fromUser || ""
        });
      }
      if (snapChat.length > CHAT_MAX_PER_POST) snapChat.splice(0, snapChat.length - CHAT_MAX_PER_POST);

      deletedSnapshot = {
        savedAt: Number(rawSnap.savedAt || 0) || 0,
        post: {
          id,
          title: snapTitle || "(untitled)",
          content: snapContentText || (snapContentHtml ? "[media]" : ""),
          contentHtml: snapContentHtml,
          collectionId: getActiveCollectionById(sp.collectionId)?.id || DEFAULT_COLLECTION_ID,
          keywords: normalizeKeywords(sp.keywords),
          author: snapAuthor || null,
          lastActivityAt: Number(sp.lastActivityAt || createdAt) || createdAt,
          boostUntil: Number(sp.boostUntil || 0) || 0,
          protected: snapProtected && Boolean(snapLockSalt && snapLockHash),
          lockSalt: snapProtected ? snapLockSalt : "",
          lockHash: snapProtected ? snapLockHash : "",
          createdAt,
          expiresAt,
          editCount: Math.max(0, Number(sp.editCount || 0) || 0),
          editedAt: Number(sp.editedAt || 0) || 0
        },
        chat: snapChat,
        postReactions: rawSnap.postReactions && typeof rawSnap.postReactions === "object" ? rawSnap.postReactions : {},
        chatReactions: rawSnap.chatReactions && typeof rawSnap.chatReactions === "object" ? rawSnap.chatReactions : {}
      };
    }

    const post = {
      id,
      title: title || "(untitled)",
      content: contentText || (contentHtml ? "[media]" : ""),
      contentHtml,
      mode: sanitizePostMode(p.mode),
      readOnly: Boolean(p.readOnly),
      collectionId: getActiveCollectionById(p.collectionId)?.id || DEFAULT_COLLECTION_ID,
      keywords: normalizeKeywords(p.keywords),
      author: author || null,
      lastActivityAt: Number(p.lastActivityAt || createdAt) || createdAt,
      boostUntil: Number(p.boostUntil || 0) || 0,
      reactions: {},
      deleted: Boolean(p.deleted),
      deletedAt: Number(p.deletedAt || 0) || 0,
      deletedBy: normalizeUsername(p.deletedBy || ""),
      deletedByRole: normalizeRole(p.deletedByRole || ROLE_MEMBER),
      deleteReason: typeof p.deleteReason === "string" ? p.deleteReason.slice(0, 280) : "",
      editCount: Math.max(0, Number(p.editCount || 0) || 0),
      editedAt: Number(p.editedAt || 0) || 0,
      deletedSnapshot,
      protected: protectedPost && Boolean(lockSalt && lockHash),
      lockSalt: protectedPost ? lockSalt : "",
      lockHash: protectedPost ? lockHash : "",
      createdAt,
      expiresAt
    };

    const chatList = Array.isArray(item?.chat) ? item.chat : [];
    const chat = [];
    for (const m of chatList) {
      if (!m || typeof m !== "object") continue;
      const mid = typeof m.id === "string" ? m.id : "";
      const postId = typeof m.postId === "string" ? m.postId : id;
      const text = typeof m.text === "string" ? m.text.slice(0, CHAT_MAX_LEN) : "";
      const htmlRaw = typeof m.html === "string" ? m.html.slice(0, CHAT_MAX_HTML_LEN) : "";
      const html = htmlRaw ? sanitizeRichHtml(htmlRaw) : "";
      const createdAtMsg = Number(m.createdAt || 0) || createdAt;
      const fromUser = normalizeUsername(m.fromUser || "");
      const mentions = Array.isArray(m.mentions)
        ? m.mentions.map((x) => normalizeUsername(x)).filter(Boolean).slice(0, 16)
        : [];
      const replyTo = sanitizeReplyMeta(m.replyTo);
      const deleted = Boolean(m.deleted);
      const deletedAt = Number(m.deletedAt || 0) || 0;
      const deletedBy = normalizeUsername(m.deletedBy || "");
      const deletedByRole = normalizeRole(m.deletedByRole || ROLE_MEMBER);
      const editCount = Math.max(0, Number(m.editCount || 0) || 0);
      const editedAt = Number(m.editedAt || 0) || 0;
      let deletedSnapshot = null;
      const rawMsgSnap = m.deletedSnapshot;
      if (rawMsgSnap && typeof rawMsgSnap === "object" && rawMsgSnap.message && typeof rawMsgSnap.message === "object") {
        const sm = rawMsgSnap.message;
        const snapText = typeof sm.text === "string" ? sm.text.slice(0, CHAT_MAX_LEN) : "";
        const snapHtmlRaw = typeof sm.html === "string" ? sm.html.slice(0, CHAT_MAX_HTML_LEN) : "";
        const snapHtml = snapHtmlRaw ? sanitizeRichHtml(snapHtmlRaw) : "";
        deletedSnapshot = {
          savedAt: Number(rawMsgSnap.savedAt || 0) || 0,
          message: {
            id: mid,
            postId,
            text: snapText || (snapHtml ? "[media]" : ""),
            html: snapHtml,
            mentions: Array.isArray(sm.mentions)
              ? sm.mentions.map((x) => normalizeUsername(x)).filter(Boolean).slice(0, 16)
              : [],
            replyTo: sanitizeReplyMeta(sm.replyTo),
            createdAt: createdAtMsg,
            fromClientId: typeof sm.fromClientId === "string" ? sm.fromClientId : "",
            fromUser: normalizeUsername(sm.fromUser || "") || fromUser || ""
          },
          reactions: rawMsgSnap.reactions && typeof rawMsgSnap.reactions === "object" ? rawMsgSnap.reactions : {}
        };
      }
      if (!mid) continue;
      chat.push({
        id: mid,
        postId,
        text: text || (html ? "[media]" : ""),
        html,
        mentions,
        replyTo,
        deleted,
        deletedAt,
        deletedBy,
        deletedByRole,
        editCount,
        editedAt,
        deletedSnapshot,
        reactions: {},
        createdAt: createdAtMsg,
        fromClientId: typeof m.fromClientId === "string" ? m.fromClientId : "",
        fromUser: fromUser || ""
      });
    }
    if (chat.length > CHAT_MAX_PER_POST) chat.splice(0, chat.length - CHAT_MAX_PER_POST);

    const timer = expiresAt > 0 ? setTimeout(() => deletePost(id, "expired"), Math.max(1, expiresAt - t)) : null;
    posts.set(id, { post, timer, chat });

    syncPostReactions(id);
    for (const msg of chat) syncMessageReactions(msg);
  }
}

function normalizeKeywords(keywords) {
  if (!Array.isArray(keywords)) return [];
  const cleaned = keywords
    .map((k) => (typeof k === "string" ? k.trim().toLowerCase() : ""))
    .filter(Boolean)
    .slice(0, 6);
  return [...new Set(cleaned)];
}

function sanitizePostTitle(title) {
  if (typeof title !== "string") return "";
  const cleaned = title.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned.slice(0, POST_TITLE_MAX_LEN);
}

function sanitizePostMode(mode) {
  const m = String(mode || "").trim().toLowerCase();
  return m === "walkie" ? "walkie" : "text";
}

function broadcast(obj) {
  const payload = JSON.stringify(obj);
  for (const ws of sockets) {
    if (ws.readyState === ws.OPEN) ws.send(payload);
  }
}

function setTyping(postId, username, isTyping) {
  if (!postId || !username) return;
  let byUser = typingByPostId.get(postId);
  if (!byUser) {
    byUser = new Map();
    typingByPostId.set(postId, byUser);
  }

  const entry = posts.get(postId);
  const send = (payload) => {
    if (!entry?.post) {
      broadcast(payload);
      return;
    }
    sendToSockets(
      (ws) =>
        canUserSeePostByCollection(ws.user?.username || "", entry.post) &&
        (entry.post?.protected ? hasPostAccess(ws, entry.post) : true),
      payload
    );
  };

  const existing = byUser.get(username);
  if (existing) clearTimeout(existing);

  if (!isTyping) {
    if (byUser.has(username)) {
      byUser.delete(username);
      send({ type: "typing", postId, username, isTyping: false });
    }
    if (byUser.size === 0) typingByPostId.delete(postId);
    return;
  }

  const isNew = !byUser.has(username);
  const timer = setTimeout(() => {
    const map = typingByPostId.get(postId);
    if (!map) return;
    if (!map.has(username)) return;
    map.delete(username);
    if (map.size === 0) typingByPostId.delete(postId);
    send({ type: "typing", postId, username, isTyping: false });
  }, 4500);

  byUser.set(username, timer);
  if (isNew) send({ type: "typing", postId, username, isTyping: true });
}

function deletePost(id, reason = "expired") {
  const entry = posts.get(id);
  if (!entry) return;
  clearTimeout(entry.timer);
  for (const m of entry.chat) {
    if (m?.id) chatReactionsByMessageId.delete(m.id);
  }
  posts.delete(id);
  postReactionsByPostId.delete(id);
  const typing = typingByPostId.get(id);
  if (typing) {
    for (const t of typing.values()) clearTimeout(t);
    typingByPostId.delete(id);
  }
  broadcast({ type: "deletePost", id, reason });
  schedulePersist();
}

function createPost({ content, keywords, ttl, author, lock, collectionId, mode }) {
  const createdAt = now();
  const isPermanent = Number(ttl || 0) === 0;
  const ttlMs = isPermanent ? 0 : clampTtl(ttl);
  const expiresAt = isPermanent ? 0 : createdAt + ttlMs;
  const title = sanitizePostTitle(content?.title || "");
  const post = {
    id: toId(),
    title: title || "(untitled)",
    content: title || "",
    contentHtml: "",
    mode: sanitizePostMode(mode),
    readOnly: false,
    collectionId: getActiveCollectionById(collectionId)?.id || DEFAULT_COLLECTION_ID,
    keywords: normalizeKeywords(keywords),
    author: author || null,
    lastActivityAt: createdAt,
    boostUntil: 0,
    reactions: {},
    deleted: false,
    deletedAt: 0,
    deletedBy: "",
    deletedByRole: ROLE_MEMBER,
    deleteReason: "",
    editCount: 0,
    editedAt: 0,
    protected: Boolean(lock?.hash),
    lockSalt: lock?.salt || "",
    lockHash: lock?.hash || "",
    createdAt,
    expiresAt
  };
  const timer = ttlMs > 0 ? setTimeout(() => deletePost(post.id, "expired"), ttlMs) : null;
  const chat = [];
  if (content?.bodyHtml || content?.bodyText) {
    chat.push({
      id: toId(),
      postId: post.id,
      text: content.bodyText || "[media]",
      html: content.bodyHtml || "",
      mentions: extractMentionUsernames(content.bodyText || ""),
      replyTo: null,
      deleted: false,
      deletedAt: 0,
      deletedBy: "",
      deletedByRole: ROLE_MEMBER,
      editCount: 0,
      editedAt: 0,
      reactions: {},
      createdAt,
      fromClientId: content.fromClientId || "",
      fromUser: author || ""
    });
  }
  posts.set(post.id, { post, timer, chat });
  schedulePersist();
  return post;
}

function bumpPostActivity(entry, t) {
  entry.post.lastActivityAt = t;
}

function extendBoost(entry, t, ms) {
  const next = Math.max(Number(entry.post.boostUntil || 0), t) + ms;
  entry.post.boostUntil = Math.min(next, t + BOOST_MAX_MS);
}

function appendChatMessage(postId, message) {
  const entry = posts.get(postId);
  if (!entry) return false;
  entry.chat.push(message);
  if (entry.chat.length > CHAT_MAX_PER_POST) entry.chat.splice(0, entry.chat.length - CHAT_MAX_PER_POST);
  schedulePersist();
  return true;
}

function textPreview(value, maxLen = 180) {
  const str = String(value || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!str) return "";
  return str.length > maxLen ? `${str.slice(0, maxLen)}...` : str;
}

function findMessageById(messageId) {
  if (!messageId) return null;
  for (const [postId, entry] of posts.entries()) {
    const index = entry.chat.findIndex((m) => m && m.id === messageId);
    if (index >= 0) return { postId, entry, message: entry.chat[index], index };
  }
  return null;
}

function markPostDeleted(postId, actor, reason = "", roleOverride = "") {
  const entry = posts.get(postId);
  if (!entry) return { ok: false, message: "Post not found." };
  if (entry.post.deleted) return { ok: false, message: "Post is already deleted." };
  if (!entry.post.deletedSnapshot) {
    const prePost = entry.post || {};
    const postReactions = mapSetsToObj(postReactionsByPostId.get(postId));
    const chatReactions = {};
    for (const m of entry.chat || []) {
      if (!m?.id) continue;
      chatReactions[m.id] = mapSetsToObj(chatReactionsByMessageId.get(m.id));
    }
    entry.post.deletedSnapshot = {
      savedAt: now(),
      post: {
        id: prePost.id,
        title: prePost.title || "",
        content: prePost.content || "",
        contentHtml: prePost.contentHtml || "",
        collectionId: normalizeCollectionId(prePost.collectionId) || DEFAULT_COLLECTION_ID,
        keywords: Array.isArray(prePost.keywords) ? [...prePost.keywords] : [],
        author: prePost.author || null,
        lastActivityAt: Number(prePost.lastActivityAt || 0) || 0,
        boostUntil: Number(prePost.boostUntil || 0) || 0,
        protected: Boolean(prePost.protected),
        lockSalt: typeof prePost.lockSalt === "string" ? prePost.lockSalt : "",
        lockHash: typeof prePost.lockHash === "string" ? prePost.lockHash : "",
        createdAt: Number(prePost.createdAt || 0) || 0,
        expiresAt: Number(prePost.expiresAt || 0) || 0,
        editCount: Number(prePost.editCount || 0) || 0,
        editedAt: Number(prePost.editedAt || 0) || 0
      },
      chat: Array.isArray(entry.chat) ? entry.chat.map((m) => ({ ...m })) : [],
      postReactions,
      chatReactions
    };
  }
  const t = now();
  const role = normalizeRole(roleOverride || getUserRole(actor));
  entry.post.deleted = true;
  entry.post.deletedAt = t;
  entry.post.deletedBy = normalizeUsername(actor || "");
  entry.post.deletedByRole = role;
  entry.post.deleteReason = String(reason || "").trim().slice(0, 280);
  entry.post.title = "Post was deleted";
  entry.post.content = "This post was deleted.";
  entry.post.contentHtml = "";
  entry.post.keywords = [];
  entry.post.reactions = {};
  postReactionsByPostId.delete(postId);
  for (const m of entry.chat) {
    if (m?.id) chatReactionsByMessageId.delete(m.id);
  }
  entry.chat = [];
  const typing = typingByPostId.get(postId);
  if (typing) {
    for (const timeout of typing.values()) clearTimeout(timeout);
    typingByPostId.delete(postId);
  }
  schedulePersist();
  return { ok: true, post: entry.post };
}

function markChatDeleted(messageRef, actor, roleOverride = "") {
  if (!messageRef?.message) return { ok: false, message: "Message not found." };
  const message = messageRef.message;
  if (message.deleted) return { ok: false, message: "Message is already deleted." };
  if (!message.deletedSnapshot) {
    message.deletedSnapshot = {
      savedAt: now(),
      message: {
        id: message.id,
        postId: message.postId,
        text: typeof message.text === "string" ? message.text : "",
        html: typeof message.html === "string" ? message.html : "",
        mentions: Array.isArray(message.mentions) ? [...message.mentions] : [],
        replyTo: message.replyTo || null,
        createdAt: Number(message.createdAt || 0) || 0,
        fromClientId: typeof message.fromClientId === "string" ? message.fromClientId : "",
        fromUser: normalizeUsername(message.fromUser || "")
      },
      reactions: mapSetsToObj(chatReactionsByMessageId.get(message.id))
    };
  }
  const t = now();
  message.deleted = true;
  message.deletedAt = t;
  message.deletedBy = normalizeUsername(actor || "");
  message.deletedByRole = normalizeRole(roleOverride || getUserRole(actor));
  message.editCount = Math.max(0, Number(message.editCount || 0));
  message.editedAt = 0;
  message.text = "This message was deleted.";
  message.html = "";
  message.mentions = [];
  message.replyTo = null;
  message.reactions = {};
  if (message.id) chatReactionsByMessageId.delete(message.id);
  schedulePersist();
  return { ok: true, message };
}

function restoreDeletedPost(postId) {
  const entry = posts.get(postId);
  if (!entry?.post) return { ok: false, message: "Post not found." };
  if (!entry.post.deleted) return { ok: false, message: "Post is not deleted." };
  const snap = entry.post.deletedSnapshot;
  if (!snap || typeof snap !== "object" || !snap.post) return { ok: false, message: "No restore snapshot available." };

  const p = snap.post || {};
  entry.post.title = sanitizePostTitle(typeof p.title === "string" ? p.title : entry.post.title) || entry.post.title;
  entry.post.content = typeof p.content === "string" ? p.content.slice(0, POSTS_MAX_CONTENT_LEN) : entry.post.content;
  const htmlRaw = typeof p.contentHtml === "string" ? p.contentHtml.slice(0, POST_MAX_HTML_LEN) : "";
  entry.post.contentHtml = htmlRaw ? sanitizeRichHtml(htmlRaw) : "";
  entry.post.collectionId = normalizeCollectionId(p.collectionId) || entry.post.collectionId || DEFAULT_COLLECTION_ID;
  entry.post.keywords = normalizeKeywords(p.keywords);
  entry.post.author = normalizeUsername(p.author || "") || entry.post.author || null;
  entry.post.lastActivityAt = Number(p.lastActivityAt || entry.post.lastActivityAt) || entry.post.lastActivityAt;
  entry.post.boostUntil = Number(p.boostUntil || entry.post.boostUntil) || entry.post.boostUntil;
  entry.post.editCount = Math.max(0, Number(p.editCount || 0) || 0);
  entry.post.editedAt = Number(p.editedAt || 0) || 0;
  const protectedPost = Boolean(p.protected);
  const lockSalt = typeof p.lockSalt === "string" ? p.lockSalt : "";
  const lockHash = typeof p.lockHash === "string" ? p.lockHash : "";
  entry.post.protected = protectedPost && Boolean(lockSalt && lockHash);
  entry.post.lockSalt = entry.post.protected ? lockSalt : "";
  entry.post.lockHash = entry.post.protected ? lockHash : "";

  entry.post.deleted = false;
  entry.post.deletedAt = 0;
  entry.post.deletedBy = "";
  entry.post.deletedByRole = ROLE_MEMBER;
  entry.post.deleteReason = "";
  entry.post.deletedSnapshot = null;

  entry.chat = Array.isArray(snap.chat) ? snap.chat.map((m) => ({ ...m })) : [];
  if (entry.chat.length > CHAT_MAX_PER_POST) entry.chat.splice(0, entry.chat.length - CHAT_MAX_PER_POST);

  const postReactionsMap = objToMapSets(snap.postReactions);
  if (postReactionsMap.size) postReactionsByPostId.set(postId, postReactionsMap);
  else postReactionsByPostId.delete(postId);
  if (snap.chatReactions && typeof snap.chatReactions === "object") {
    for (const msg of entry.chat) {
      if (!msg?.id) continue;
      const map = objToMapSets(snap.chatReactions[msg.id]);
      if (map.size) chatReactionsByMessageId.set(msg.id, map);
      else chatReactionsByMessageId.delete(msg.id);
    }
  }
  syncPostReactions(postId);
  for (const msg of entry.chat) syncMessageReactions(msg);
  schedulePersist();
  return { ok: true, post: entry.post, entry };
}

function restoreDeletedChatMessage(messageId) {
  const found = findMessageById(messageId);
  if (!found?.message) return { ok: false, message: "Message not found." };
  const message = found.message;
  if (!message.deleted) return { ok: false, message: "Message is not deleted." };
  const snap = message.deletedSnapshot;
  if (!snap || typeof snap !== "object" || !snap.message) return { ok: false, message: "No restore snapshot available." };

  const m = snap.message || {};
  message.text = typeof m.text === "string" ? m.text.slice(0, CHAT_MAX_LEN) : message.text;
  const htmlRaw = typeof m.html === "string" ? m.html.slice(0, CHAT_MAX_HTML_LEN) : "";
  message.html = htmlRaw ? sanitizeRichHtml(htmlRaw) : "";
  message.mentions = Array.isArray(m.mentions)
    ? m.mentions.map((x) => normalizeUsername(x)).filter(Boolean).slice(0, 16)
    : [];
  message.replyTo = sanitizeReplyMeta(m.replyTo);
  message.deleted = false;
  message.deletedAt = 0;
  message.deletedBy = "";
  message.deletedByRole = ROLE_MEMBER;
  message.deletedSnapshot = null;

  const reactionsMap = objToMapSets(snap.reactions);
  if (reactionsMap.size) chatReactionsByMessageId.set(messageId, reactionsMap);
  else chatReactionsByMessageId.delete(messageId);
  syncMessageReactions(message);
  schedulePersist();
  return { ok: true, postId: found.postId, entry: found.entry };
}

function getOrCreateReactionSet(map, id, emoji) {
  let byEmoji = map.get(id);
  if (!byEmoji) {
    byEmoji = new Map();
    map.set(id, byEmoji);
  }
  let set = byEmoji.get(emoji);
  if (!set) {
    set = new Set();
    byEmoji.set(emoji, set);
  }
  return set;
}

function buildReactionCounts(byEmojiMap) {
  const out = {};
  if (!byEmojiMap) return out;
  for (const [emoji, set] of byEmojiMap.entries()) {
    const count = set.size;
    if (count > 0) out[emoji] = count;
  }
  return out;
}

function syncPostReactions(postId) {
  const entry = posts.get(postId);
  if (!entry) return;
  entry.post.reactions = buildReactionCounts(postReactionsByPostId.get(postId));
}

function syncMessageReactions(message) {
  if (!message?.id) return;
  message.reactions = buildReactionCounts(chatReactionsByMessageId.get(message.id));
}

function listLanUrls() {
  const urls = [];
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family !== "IPv4") continue;
      if (net.internal) continue;
      urls.push(`http://${net.address}:${PORT}`);
    }
  }
  return urls.sort();
}

const IMAGE_MIME_TO_EXT = {
  "image/gif": ".gif",
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/webp": ".webp"
};

const AUDIO_MIME_TO_EXT = {
  "audio/mpeg": ".mp3",
  "audio/mp3": ".mp3",
  "audio/wav": ".wav",
  "audio/x-wav": ".wav",
  "audio/ogg": ".ogg",
  "audio/webm": ".webm",
  "audio/aac": ".aac",
  "audio/x-m4a": ".m4a",
  "audio/mp4": ".m4a"
};

const EXT_TO_MIME = {
  ".gif": "image/gif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".webm": "audio/webm",
  ".aac": "audio/aac",
  ".m4a": "audio/mp4"
};

function readRequestBodyToFile(req, filePath, maxBytes) {
  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(filePath, { flags: "wx" });
    let bytes = 0;
    let done = false;

    const finish = (err, resultBytes) => {
      if (done) return;
      done = true;
      if (err) {
        try {
          out.destroy();
        } catch {
          // ignore
        }
        reject(err);
        return;
      }
      resolve(resultBytes);
    };

    req.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > maxBytes) {
        finish(new Error("PAYLOAD_TOO_LARGE"));
        req.destroy();
        return;
      }
      out.write(chunk);
    });

    req.on("end", () => {
      out.end(() => finish(null, bytes));
    });

    req.on("error", (e) => finish(e));
    out.on("error", (e) => finish(e));
  });
}

function readRequestBodyToString(req, maxBytes) {
  return new Promise((resolve, reject) => {
    let bytes = 0;
    const chunks = [];
    let done = false;

    const finish = (err, out) => {
      if (done) return;
      done = true;
      if (err) return reject(err);
      resolve(out);
    };

    req.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > maxBytes) {
        finish(new Error("PAYLOAD_TOO_LARGE"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => finish(null, Buffer.concat(chunks).toString("utf8")));
    req.on("error", (e) => finish(e));
  });
}

async function handlePluginHttp(req, res, url, pathname) {
  const parts = pathname.split("/").filter(Boolean); // ["api", "plugins", "<id>", ...]
  const pluginId = normalizePluginId(parts[2] || "");
  if (!pluginId) {
    sendJson(res, 404, { error: "Not found." });
    return true;
  }
  const enabled = Boolean(pluginsStateById.get(pluginId)?.enabled);
  if (!enabled) {
    sendJson(res, 404, { error: "Not found." });
    return true;
  }
  const runtime = pluginRuntimeById.get(pluginId);
  if (!runtime || runtime.error) {
    sendJson(res, 500, { error: `Plugin "${pluginId}" is unavailable.` });
    return true;
  }

  const method = String(req.method || "GET").toUpperCase();
  const subPath = "/" + parts.slice(3).join("/"); // always starts with /
  const handler = runtime.httpHandlers?.get(`${method} ${subPath}`);
  if (typeof handler !== "function") {
    sendJson(res, 404, { error: "Not found." });
    return true;
  }

  const ctx = {
    id: pluginId,
    method,
    path: subPath,
    url,
    async readJsonBody({ maxBytes = 1024 * 1024 } = {}) {
      const raw = await readRequestBodyToString(req, maxBytes);
      return JSON.parse(raw || "{}");
    },
    sendJson(status, body) {
      sendJson(res, status, body);
      return true;
    }
  };

  try {
    const out = handler(req, res, ctx);
    if (out && typeof out.then === "function") await out;
  } catch (e) {
    appendDevLog({ level: "error", scope: `plugin:${pluginId}`, message: "HTTP handler failed", data: { error: e?.message || String(e) } });
    sendJson(res, 500, { error: "Plugin handler failed." });
  }
  return true;
}

function getBearerToken(req) {
  const raw = req?.headers?.authorization;
  if (typeof raw !== "string") return "";
  const m = raw.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : "";
}

function getSessionUserFromRequest(req) {
  const token = getBearerToken(req);
  if (!token) return "";
  const session = validateSessionToken(token);
  if (!session) return "";
  return normalizeUsername(session.username || "");
}

function applyCommonSecurityHeaders(res) {
  if (!res || typeof res.setHeader !== "function") return;
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  // Allow mic for walkie-talkie mode while keeping other features locked down.
  res.setHeader("Permissions-Policy", "camera=(), microphone=(self), geolocation=(), interest-cohort=()");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
}

function applyHtmlCsp(res) {
  if (!res || typeof res.setHeader !== "function") return;
  const csp = [
    "default-src 'self'",
    "base-uri 'none'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "media-src 'self' data: blob:",
    "connect-src 'self' ws: wss:",
    // Allow same-origin iframes (e.g. in-app PDF viewer) plus YouTube embeds.
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com"
  ].join("; ");
  res.setHeader("Content-Security-Policy", csp);
}

function sendJson(res, status, body) {
  applyCommonSecurityHeaders(res);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

async function handleUpload(req, res, url) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return true;
  }
  const kind = url.searchParams.get("kind") === "audio" ? "audio" : url.searchParams.get("kind") === "image" ? "image" : "";
  if (!kind) {
    sendJson(res, 400, { error: "Missing upload kind." });
    return true;
  }
  const provisionalIdentity = reqIdentity(req, "");
  const provisionalLimit = takeRateLimit(
    `upload:${kind}`,
    provisionalIdentity,
    kind === "image" ? RL_UPLOAD_IMAGE_MAX : RL_UPLOAD_AUDIO_MAX,
    RL_UPLOAD_WINDOW_MS
  );
  if (!provisionalLimit.ok) {
    sendJson(res, 429, { error: "Too many uploads. Please wait and try again.", retryMs: provisionalLimit.retryMs });
    return true;
  }
  const username = getSessionUserFromRequest(req);
  if (!username) {
    sendJson(res, 401, { error: "Sign in required for upload." });
    return true;
  }
  const state = userState(username);
  if (state.banned) {
    sendJson(res, 403, { error: "Account is banned." });
    return true;
  }
  if (state.suspended) {
    sendJson(res, 403, { error: "Account is suspended." });
    return true;
  }

  const contentType = String(req.headers["content-type"] || "").split(";")[0].trim().toLowerCase();
  const mimeMap = kind === "image" ? IMAGE_MIME_TO_EXT : AUDIO_MIME_TO_EXT;
  const ext = mimeMap[contentType];
  if (!ext) {
    sendJson(res, 415, { error: `Unsupported ${kind} type.` });
    return true;
  }

  const purpose = String(url.searchParams.get("purpose") || "").trim().toLowerCase();
  const maxBytes =
    kind === "image"
      ? purpose === "map"
        ? Math.min(IMAGE_UPLOAD_MAX_BYTES, MAP_IMAGE_UPLOAD_MAX_BYTES)
        : purpose === "sprite"
          ? Math.min(IMAGE_UPLOAD_MAX_BYTES, SPRITE_IMAGE_UPLOAD_MAX_BYTES)
        : IMAGE_UPLOAD_MAX_BYTES
      : AUDIO_UPLOAD_MAX_BYTES;
  const contentLength = Number(req.headers["content-length"] || 0);
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    sendJson(res, 413, { error: `${kind} is too large.` });
    return true;
  }

  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    const filename = `${Date.now()}-${crypto.randomBytes(10).toString("hex")}${ext}`;
    const finalPath = path.join(UPLOADS_DIR, filename);
    const tmpPath = `${finalPath}.part`;

    let bytes = 0;
    try {
      bytes = await readRequestBodyToFile(req, tmpPath, maxBytes);
      fs.renameSync(tmpPath, finalPath);
    } catch (e) {
      try {
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      } catch {
        // ignore
      }
      if (String(e?.message || "") === "PAYLOAD_TOO_LARGE") {
        sendJson(res, 413, { error: `${kind} is too large.` });
        return true;
      }
      throw e;
    }

    sendJson(res, 200, { ok: true, url: `/uploads/${filename}`, mime: contentType, bytes });
    return true;
  } catch (e) {
    console.warn("Upload failed:", e.message || e);
    sendJson(res, 500, { error: "Upload failed." });
    return true;
  }
}

async function handlePluginInstall(req, res, url) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return true;
  }
  const username = getSessionUserFromRequest(req);
  if (!username || !hasRole(username, ROLE_OWNER)) {
    sendJson(res, 403, { error: "Owner access required." });
    return true;
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (Number.isFinite(contentLength) && contentLength > PLUGIN_ZIP_MAX_BYTES) {
    sendJson(res, 413, { error: "Plugin zip is too large." });
    return true;
  }

  const contentType = String(req.headers["content-type"] || "").split(";")[0].trim().toLowerCase();
  if (contentType && contentType !== "application/zip" && contentType !== "application/octet-stream") {
    sendJson(res, 415, { error: "Upload must be a .zip file." });
    return true;
  }

  const tmpZipPath = path.join(os.tmpdir(), `bzl-plugin_${process.pid}_${Date.now()}_${crypto.randomBytes(6).toString("hex")}.zip`);
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), `bzl-plugin_extract_${process.pid}_`));
  try {
    await readRequestBodyToFile(req, tmpZipPath, PLUGIN_ZIP_MAX_BYTES);

    const zip = new AdmZip(tmpZipPath);
    const entries = zip.getEntries();
    for (const e of entries) {
      const name = String(e.entryName || "");
      if (!name) continue;
      if (name.includes("..") || name.startsWith("/") || name.startsWith("\\") || name.includes(":")) {
        sendJson(res, 400, { error: "Unsafe zip entry path." });
        return true;
      }
    }
    zip.extractAllTo(tmpDir, true);

    const exists = (p) => {
      try {
        return fs.existsSync(p);
      } catch {
        return false;
      }
    };

    let manifestPath = path.join(tmpDir, "plugin.json");
    let extractedRoot = tmpDir;
    if (!exists(manifestPath)) {
      // Try single top-level folder.
      const top = fs.readdirSync(tmpDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
      if (top.length === 1) {
        extractedRoot = path.join(tmpDir, top[0]);
        manifestPath = path.join(extractedRoot, "plugin.json");
      }
    }
    if (!exists(manifestPath)) {
      sendJson(res, 400, { error: "plugin.json not found in zip." });
      return true;
    }

    const raw = readJsonFileOrNull(manifestPath);
    const manifest = sanitizePluginManifest(raw || {}, path.basename(extractedRoot));
    if (!manifest) {
      sendJson(res, 400, { error: "Invalid plugin.json manifest." });
      return true;
    }

    fs.mkdirSync(PLUGINS_DIR, { recursive: true });
    const destDir = pluginDirForId(manifest.id);
    if (!destDir) {
      sendJson(res, 400, { error: "Invalid plugin id." });
      return true;
    }
    if (fs.existsSync(destDir)) {
      sendJson(res, 409, { error: "Plugin already installed. Uninstall it first." });
      return true;
    }

    // Move extracted plugin directory into place.
    fs.renameSync(extractedRoot, destDir);

    // Ensure state entry exists and defaults to disabled.
    if (!pluginsStateById.has(manifest.id)) pluginsStateById.set(manifest.id, { enabled: false });
    persistPluginsStateToDisk();

    loadPluginsFromDisk();
    broadcastPluginsUpdated();

    sendJson(res, 200, { ok: true, plugin: manifest });
    return true;
  } catch (e) {
    console.warn("Plugin install failed:", e?.message || e);
    sendJson(res, 500, { error: "Plugin install failed." });
    return true;
  } finally {
    try {
      if (fs.existsSync(tmpZipPath)) fs.unlinkSync(tmpZipPath);
    } catch {
      // ignore
    }
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }
}

function serveUploadFile(req, res, pathname) {
  applyCommonSecurityHeaders(res);
  // Uploads can be embedded in-app (e.g. PDF readers), so allow same-origin framing.
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  const rel = String(pathname || "").replace(/^\/uploads\/+/, "");
  if (!rel || rel.length > 260) {
    res.writeHead(400);
    res.end("Bad request");
    return true;
  }
  // Prevent path traversal and keep the surface area small.
  if (rel.includes("..") || rel.includes("\\") || !/^[a-zA-Z0-9][a-zA-Z0-9/_\.-]{0,260}$/.test(rel)) {
    res.writeHead(400);
    res.end("Bad request");
    return true;
  }

  const filePath = path.resolve(UPLOADS_DIR, rel);
  const uploadsRoot = path.resolve(UPLOADS_DIR) + path.sep;
  if (!filePath.startsWith(uploadsRoot)) {
    res.writeHead(403);
    res.end("Forbidden");
    return true;
  }
  let stat = null;
  try {
    stat = fs.statSync(filePath);
  } catch {
    res.writeHead(404);
    res.end("Not found");
    return true;
  }
  if (!stat.isFile()) {
    res.writeHead(404);
    res.end("Not found");
    return true;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = EXT_TO_MIME[ext] || "application/octet-stream";
  // Chrome's built-in PDF viewer can fetch the PDF from an extension origin;
  // `Cross-Origin-Resource-Policy: same-origin` will block it even when embedded same-origin.
  if (contentType === "application/pdf") {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  }
  const range = typeof req.headers.range === "string" ? req.headers.range : "";
  const baseName = path.basename(filePath);
  const baseHeaders = {
    "Content-Type": contentType,
    ...(contentType === "application/pdf" ? { "Content-Disposition": `inline; filename="${baseName}"` } : {}),
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=31536000, immutable"
  };

  if (range) {
    const m = range.match(/bytes=(\d*)-(\d*)/);
    if (m) {
      const total = stat.size;
      const start = m[1] ? Number(m[1]) : 0;
      const end = m[2] ? Number(m[2]) : total - 1;
      if (Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end >= start && end < total) {
        res.writeHead(206, {
          ...baseHeaders,
          "Content-Range": `bytes ${start}-${end}/${total}`,
          "Content-Length": end - start + 1
        });
        fs.createReadStream(filePath, { start, end }).pipe(res);
        return true;
      }
      res.writeHead(416, { ...baseHeaders, "Content-Range": `bytes */${total}` });
      res.end();
      return true;
    }
  }

  res.writeHead(200, { ...baseHeaders, "Content-Length": stat.size });
  fs.createReadStream(filePath).pipe(res);
  return true;
}

function servePluginFile(req, res, pathname) {
  applyCommonSecurityHeaders(res);
  const parts = pathname.split("/").filter(Boolean); // ["plugins", "<id>", ...]
  const id = normalizePluginId(parts[1] || "");
  if (!id || !pluginManifestsById.has(id)) {
    res.writeHead(404);
    res.end("Not found");
    return true;
  }
  const rel = parts.slice(2).join("/");
  if (!rel) {
    res.writeHead(404);
    res.end("Not found");
    return true;
  }
  if (!/^[a-zA-Z0-9][a-zA-Z0-9/_\.-]{0,240}$/.test(rel) || rel.includes("..")) {
    res.writeHead(400);
    res.end("Bad request");
    return true;
  }
  const dir = pluginDirForId(id);
  const filePath = path.resolve(dir, rel);
  const root = dir + path.sep;
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return true;
  }
  let stat = null;
  try {
    stat = fs.statSync(filePath);
  } catch {
    res.writeHead(404);
    res.end("Not found");
    return true;
  }
  if (!stat.isFile()) {
    res.writeHead(404);
    res.end("Not found");
    return true;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType =
    ext === ".html"
      ? "text/html; charset=utf-8"
      : ext === ".css"
        ? "text/css; charset=utf-8"
        : ext === ".js"
          ? "text/javascript; charset=utf-8"
          : ext === ".json"
            ? "application/json; charset=utf-8"
            : ext === ".png"
              ? "image/png"
              : ext === ".jpg" || ext === ".jpeg"
                ? "image/jpeg"
                : ext === ".gif"
                  ? "image/gif"
                  : ext === ".webp"
                    ? "image/webp"
                    : "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-store" });
  fs.createReadStream(filePath).pipe(res);
  return true;
}

function serveStatic(req, res) {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(url.pathname);
  applyCommonSecurityHeaders(res);

  if (pathname === "/api/upload") {
    handleUpload(req, res, url);
    return;
  }

  if (pathname === "/api/plugin-install") {
    handlePluginInstall(req, res, url);
    return;
  }

  if (pathname === "/api/info") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        port: PORT,
        host: HOST,
        serverTime: now(),
        registrationEnabled: registrationEnabled(),
        config: {
          rateLimits: {
            mod: { windowMs: RL_MOD_WINDOW_MS, max: RL_MOD_MAX },
            login: { windowMs: RL_LOGIN_WINDOW_MS, max: RL_LOGIN_MAX },
            register: { windowMs: RL_REGISTER_WINDOW_MS, max: RL_REGISTER_MAX },
            resume: { windowMs: RL_RESUME_WINDOW_MS, max: RL_RESUME_MAX },
            report: { windowMs: RL_REPORT_WINDOW_MS, max: RL_REPORT_MAX }
          }
        }
      })
    );
    return;
  }

  if (pathname === "/api/health") {
    const roleCounts = { owner: 0, moderator: 0, member: 0 };
    for (const user of usersByName.values()) {
      const role = normalizeRole(user?.role);
      roleCounts[role] = (roleCounts[role] || 0) + 1;
    }
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    res.end(
      JSON.stringify({
        ok: true,
        uptimeSec: Math.floor(process.uptime()),
        now: now(),
        stats: {
          users: usersByName.size,
          sockets: sockets.size,
          activePosts: posts.size,
          reports: reports.length,
          moderationLog: moderationLog.length,
          activeRateLimitBuckets: rateLimits.size,
          uploadsDir: UPLOADS_DIR,
          roles: roleCounts
        }
      })
    );
    return;
  }

  if (pathname.startsWith("/api/plugins/")) {
    handlePluginHttp(req, res, url, pathname);
    return;
  }

  if (pathname.startsWith("/uploads/")) {
    serveUploadFile(req, res, pathname);
    return;
  }

  if (pathname.startsWith("/plugins/")) {
    servePluginFile(req, res, pathname);
    return;
  }

  const safePath = pathname === "/" ? "/index.html" : pathname;
  const relativePath = safePath.replace(/^\/+/, "");
  const filePath = path.resolve(publicDir, relativePath);
  const publicRoot = path.resolve(publicDir) + path.sep;
  if (!(filePath + path.sep).startsWith(publicRoot) && filePath !== path.resolve(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType =
      ext === ".html"
        ? "text/html; charset=utf-8"
        : ext === ".css"
          ? "text/css; charset=utf-8"
          : ext === ".js"
            ? "text/javascript; charset=utf-8"
            : "application/octet-stream";
    if (ext === ".html") applyHtmlCsp(res);
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
}

function sendLanInfoIfModerator(ws) {
  // Intentionally disabled: don't expose LAN URLs in-app.
  return;
}

function sendCollectionsForWs(ws) {
  ws.send(JSON.stringify({ type: "collectionsUpdated", collections: listCollectionsForClient(ws.user?.username || "") }));
}

function sendRolesForWs(ws) {
  ws.send(JSON.stringify({ type: "rolesUpdated", roles: listCustomRolesForClient() }));
}

function sendPostsSnapshot(ws) {
  const visiblePosts = Array.from(posts.values())
    .filter((entry) => canUserSeePostByCollection(ws.user?.username || "", entry.post))
    .map((entry) => serializePostForWs(ws, entry.post))
    .sort((a, b) => b.createdAt - a.createdAt);
  ws.send(JSON.stringify({ type: "postsSnapshot", posts: visiblePosts }));
}

function sendLoginOk(ws, username, sessionToken) {
  const state = userState(username);
  const prefs = getUserPrefs(username);
  const user = usersByName.get(normalizeUsername(username));
  ws.send(
    JSON.stringify({
      type: "loginOk",
      username,
      role: state.role,
      customRoles: sanitizeCustomRoleKeys(user?.customRoles),
      mutedUntil: state.mutedUntil,
      suspendedUntil: state.suspendedUntil,
      banned: state.banned,
      canModerate: hasRole(username, ROLE_MODERATOR),
      sessionToken: sessionToken || "",
      profile: getPublicProfile(username),
      prefs,
      instance: instanceBranding
    })
  );
  sendDmSnapshot(ws);
  sendPluginsForWs(ws);
  if (ws?.user?.username && hasRole(ws.user.username, ROLE_MODERATOR)) {
    sendDevLogForWs(ws, 200);
  }
}

function modViewAllowed(ws) {
  const username = ws?.user?.username;
  return Boolean(username && hasRole(username, ROLE_MODERATOR));
}

function sendError(ws, message) {
  ws.send(JSON.stringify({ type: "error", message }));
}

function sendRateLimited(ws, retryMs, message = "Too many requests. Please wait and try again.") {
  ws.send(JSON.stringify({ type: "rateLimited", message, retryMs: Math.max(1, Number(retryMs || 1000)) }));
}

function enforceUserState(ws, mode) {
  const username = ws?.user?.username;
  if (!username) return { ok: false, message: "Please sign in first." };
  const state = userState(username);
  if (state.banned) return { ok: false, message: "This account is banned." };
  if (mode === "chat" && state.suspended) return { ok: false, message: "Your account is suspended." };
  if (mode === "chat" && state.muted) return { ok: false, message: "You are muted right now." };
  if (mode === "write" && state.suspended) return { ok: false, message: "Your account is suspended." };
  return { ok: true, state };
}

function listModerationLog(filters) {
  const f = filters && typeof filters === "object" ? filters : {};
  const actor = normalizeUsername(f.actor || "");
  const targetId = typeof f.targetId === "string" ? f.targetId.trim() : "";
  const actionType = typeof f.actionType === "string" ? f.actionType.trim() : "";
  const since = Number(f.since || 0) || 0;
  const until = Number(f.until || 0) || 0;
  return moderationLog.filter((entry) => {
    if (actor && entry.actor !== actor) return false;
    if (targetId && entry.targetId !== targetId) return false;
    if (actionType && entry.actionType !== actionType) return false;
    if (since && entry.createdAt < since) return false;
    if (until && entry.createdAt > until) return false;
    return true;
  });
}

function applyModerationAction(ws, msg) {
  const actor = ws?.user?.username || "";
  if (!actor || !hasRole(actor, ROLE_MODERATOR)) return { ok: false, message: "Moderator access required." };
  const actionType = typeof msg.actionType === "string" ? msg.actionType.trim() : "";
  const targetType = typeof msg.targetType === "string" ? msg.targetType.trim() : "";
  const targetId = typeof msg.targetId === "string" ? msg.targetId.trim() : "";
  const reason = typeof msg.reason === "string" ? msg.reason.trim() : "";
  const metadata = msg.metadata && typeof msg.metadata === "object" ? msg.metadata : {};

  if (!actionType || !targetType || !targetId) return { ok: false, message: "Missing moderation target." };
  if (reason.length < 8) return { ok: false, message: "Reason must be at least 8 characters." };

  const actorRole = getUserRole(actor);
  if (targetType === "user") {
    const target = normalizeUsername(targetId);
    const targetUser = usersByName.get(target);
    if (!targetUser) return { ok: false, message: "User not found." };
    if (target === actor) return { ok: false, message: "You cannot moderate yourself." };
    const targetRole = normalizeRole(targetUser.role);
    if (targetRole === ROLE_OWNER) return { ok: false, message: "Owner account cannot be moderated." };
    if (targetRole === ROLE_MODERATOR && actorRole !== ROLE_OWNER) {
      return { ok: false, message: "Only the owner can moderate moderators." };
    }

    const minutesRaw = Number(metadata.minutes || 0) || 0;
    const minutes = Math.max(1, Math.min(43_200, Math.floor(minutesRaw)));
    let writeResult = null;
    if (actionType === "user_mute") {
      const mutedUntil = now() + minutes * 60_000;
      writeResult = writeUserPatch(target, (u) => ({ ...u, mutedUntil }));
    } else if (actionType === "user_unmute") {
      writeResult = writeUserPatch(target, (u) => ({ ...u, mutedUntil: 0 }));
    } else if (actionType === "user_suspend") {
      const suspendedUntil = now() + minutes * 60_000;
      writeResult = writeUserPatch(target, (u) => ({ ...u, suspendedUntil }));
    } else if (actionType === "user_unsuspend") {
      writeResult = writeUserPatch(target, (u) => ({ ...u, suspendedUntil: 0 }));
    } else if (actionType === "user_ban") {
      writeResult = writeUserPatch(target, (u) => ({ ...u, banned: true, suspendedUntil: 0, mutedUntil: 0 }));
      revokeUserSessions(target);
    } else if (actionType === "user_unban") {
      writeResult = writeUserPatch(target, (u) => ({ ...u, banned: false }));
    } else if (actionType === "user_password_reset") {
      const newPassword = typeof metadata.newPassword === "string" ? metadata.newPassword : "";
      const pw = String(newPassword || "");
      if (pw.length < 4) return { ok: false, message: "New password must be at least 4 characters." };
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = hashPassword(pw, salt);
      writeResult = writeUserPatch(target, (u) => ({ ...u, salt, hash }));
      revokeUserSessions(target);
    } else if (actionType === "user_role_set") {
      if (actorRole !== ROLE_OWNER) return { ok: false, message: "Only owner can set roles." };
      const nextRole = normalizeRole(metadata.role);
      if (nextRole === ROLE_OWNER) return { ok: false, message: "Owner role cannot be assigned." };
      writeResult = writeUserPatch(target, (u) => ({ ...u, role: nextRole }));
    } else {
      return { ok: false, message: "Unsupported user moderation action." };
    }
    if (!writeResult?.ok) return { ok: false, message: writeResult?.message || "Action failed." };
    const safeMeta = { ...metadata };
    if (Object.prototype.hasOwnProperty.call(safeMeta, "newPassword")) delete safeMeta.newPassword;
    const logEntry = appendModLog({ actionType, actor, targetType, targetId: target, reason, metadata: safeMeta });
    if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
    broadcast({ type: "profilesUpdated", profiles: buildProfilesMap() });
    return { ok: true, action: logEntry, effects: { user: authPayloadForUser(target) } };
  }

  if (targetType === "post") {
    const entry = posts.get(targetId);
    if (!entry) return { ok: false, message: "Post not found." };
    if (actionType === "post_readonly_set") {
      const readOnly = Boolean(metadata.readOnly);
      const before = Boolean(entry.post.readOnly);
      entry.post.readOnly = readOnly;
      schedulePersist();
      const logEntry = appendModLog({
        actionType,
        actor,
        targetType,
        targetId,
        reason,
        metadata: { ...metadata, before, readOnly, setAt: now() }
      });
      if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (!canUserSeePostByCollection(client.user?.username || "", entry.post)) continue;
        client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, entry.post) }));
      }
      return { ok: true, action: logEntry, effects: { postId: targetId, readOnly } };
    }
    if (actionType === "post_protection_set") {
      const enabled = Boolean(metadata.enabled);
      const beforeProtected = Boolean(entry.post.protected);
      let afterProtected = beforeProtected;
      const safeMeta = { ...metadata };
      if (Object.prototype.hasOwnProperty.call(safeMeta, "password")) delete safeMeta.password;

      if (!enabled) {
        entry.post.protected = false;
        entry.post.lockSalt = "";
        entry.post.lockHash = "";
        afterProtected = false;
      } else {
        const password = typeof metadata.password === "string" ? metadata.password : "";
        if (!password || password.length < 4) return { ok: false, message: "Password required (min 4 chars)." };
        const salt = crypto.randomBytes(16).toString("hex");
        entry.post.protected = true;
        entry.post.lockSalt = salt;
        entry.post.lockHash = hashPassword(password, salt);
        afterProtected = true;
      }

      // Invalidate all prior unlocks for this post.
      for (const client of sockets) {
        try {
          client.unlockedPostIds?.delete?.(targetId);
        } catch {
          // ignore
        }
      }

      schedulePersist();
      const logEntry = appendModLog({
        actionType,
        actor,
        targetType,
        targetId,
        reason,
        metadata: { ...safeMeta, beforeProtected, afterProtected, setAt: now() }
      });
      if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (!canUserSeePostByCollection(client.user?.username || "", entry.post)) continue;
        client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, entry.post) }));
      }
      return { ok: true, action: logEntry, effects: { postId: targetId, protected: afterProtected } };
    }
    if (actionType === "post_ttl_set") {
      const requested = metadata && Object.prototype.hasOwnProperty.call(metadata, "ttlMinutes") ? Number(metadata.ttlMinutes) : NaN;
      if (!Number.isFinite(requested)) return { ok: false, message: "TTL minutes required." };
      const ttlMinutes = Math.max(0, Math.min(2880, Math.floor(requested)));
      const beforeExpiresAt = Number(entry.post.expiresAt || 0) || 0;
      const afterExpiresAt = ttlMinutes === 0 ? 0 : now() + ttlMinutes * 60_000;
      entry.post.expiresAt = afterExpiresAt;
      reschedulePostTimer(entry);
      schedulePersist();
      const logEntry = appendModLog({
        actionType,
        actor,
        targetType,
        targetId,
        reason,
        metadata: { ...metadata, ttlMinutes, beforeExpiresAt, afterExpiresAt }
      });
      if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (!canUserSeePostByCollection(client.user?.username || "", entry.post)) continue;
        client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, entry.post) }));
      }
      return { ok: true, action: logEntry, effects: { postId: targetId, ttlMinutes } };
    }
    if (actionType === "post_erase") {
      const beforePreview = textPreview(entry.post?.title || entry.post?.content || "");
      const erasedUploads = uploadFilenamesFromPostEntry(entry);
      deletePost(targetId, "erased");

      // Remove reports targeting this post or its messages.
      const beforeReports = reports.length;
      reports = reports.filter((r) => {
        if (!r || typeof r !== "object") return false;
        if (String(r.postId || "") === targetId) return false;
        if (String(r.targetType || "") === "post" && String(r.targetId || "") === targetId) return false;
        return true;
      });
      if (reports.length !== beforeReports) persistReports();

      // Attempt to delete uploads that are no longer referenced anywhere.
      let deletedUploads = 0;
      try {
        const keep = new Set([...keptUploadFilenamesFromProfiles().values(), ...uploadFilenamesFromAllPosts().values()]);
        for (const name of erasedUploads) {
          if (keep.has(name)) continue;
          if (safeUnlinkIfExists(path.join(UPLOADS_DIR, name))) deletedUploads += 1;
        }
      } catch {
        // ignore
      }

      const logEntry = appendModLog({
        actionType,
        actor,
        targetType,
        targetId,
        reason,
        metadata: { ...metadata, beforePreview, deletedUploads, erasedAt: now() }
      });
      if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
      return { ok: true, action: logEntry, effects: { postId: targetId, deletedUploads } };
    }
    if (actionType === "post_delete") {
      const beforePreview = textPreview(entry.post?.title || entry.post?.content || "");
      const mark = markPostDeleted(targetId, actor, reason, ROLE_MODERATOR);
      if (!mark.ok) return { ok: false, message: mark.message || "Post not found." };
      const logEntry = appendModLog({
        actionType,
        actor,
        targetType,
        targetId,
        reason,
        metadata: { ...metadata, beforePreview, deletedAt: now() }
      });
      if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (!canUserSeePostByCollection(client.user?.username || "", mark.post)) continue;
        client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, mark.post) }));
      }
      return { ok: true, action: logEntry, effects: { postId: targetId } };
    }
    if (actionType === "post_restore") {
      const beforePreview = textPreview(entry.post?.title || entry.post?.content || "");
      const restored = restoreDeletedPost(targetId);
      if (!restored.ok) return { ok: false, message: restored.message || "Restore failed." };
      const logEntry = appendModLog({
        actionType,
        actor,
        targetType,
        targetId,
        reason,
        metadata: { ...metadata, beforePreview, restoredAt: now() }
      });
      if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (!canUserSeePostByCollection(client.user?.username || "", restored.post)) continue;
        client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, restored.post) }));
      }
      sendToSockets(
        (client) =>
          canUserSeePostByCollection(client.user?.username || "", restored.post) &&
          (restored.post?.protected ? hasPostAccess(client, restored.post) : true),
        { type: "chatHistory", postId: targetId, messages: serializeChatHistoryForWs(restored.entry) }
      );
      return { ok: true, action: logEntry, effects: { postId: targetId } };
    }
    if (actionType === "message_purge_recent") {
      const requested = Number(metadata.count || 25) || 25;
      const count = Math.max(1, Math.min(200, Math.floor(requested)));
      if (!entry.chat.length) return { ok: false, message: "No chat messages to purge." };
      const removed = entry.chat.splice(Math.max(0, entry.chat.length - count), count);
      for (const m of removed) {
        if (m?.id) chatReactionsByMessageId.delete(m.id);
      }
      schedulePersist();
      const logEntry = appendModLog({
        actionType,
        actor,
        targetType,
        targetId,
        reason,
        metadata: { ...metadata, removedCount: removed.length, count }
      });
      if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
      sendToSockets(
        (client) =>
          canUserSeePostByCollection(client.user?.username || "", entry.post) &&
          (entry.post?.protected ? hasPostAccess(client, entry.post) : true),
        { type: "chatHistory", postId: targetId, messages: serializeChatHistoryForWs(entry) }
      );
      return { ok: true, action: logEntry, effects: { postId: targetId, removedCount: removed.length } };
    }
    return { ok: false, message: "Unsupported post moderation action." };
  }

  if (targetType === "chat") {
    if (actionType === "message_delete") {
      const found = findMessageById(targetId);
      if (!found) return { ok: false, message: "Message not found." };
      const beforePreview = textPreview(found.message?.text || "");
      const mark = markChatDeleted(found, actor, ROLE_MODERATOR);
      if (!mark.ok) return { ok: false, message: mark.message || "Message not found." };
      const logEntry = appendModLog({
        actionType,
        actor,
        targetType,
        targetId,
        reason,
        metadata: { ...metadata, postId: found.postId, beforePreview, deletedAt: now() }
      });
      if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
      sendToSockets(
        (client) =>
          canUserSeePostByCollection(client.user?.username || "", found.entry.post) &&
          (found.entry.post?.protected ? hasPostAccess(client, found.entry.post) : true),
        { type: "chatHistory", postId: found.postId, messages: serializeChatHistoryForWs(found.entry) }
      );
      return { ok: true, action: logEntry, effects: { postId: found.postId, messageId: targetId } };
    }
    if (actionType === "message_restore") {
      const found = findMessageById(targetId);
      if (!found) return { ok: false, message: "Message not found." };
      const beforePreview = textPreview(found.message?.text || "");
      const restored = restoreDeletedChatMessage(targetId);
      if (!restored.ok) return { ok: false, message: restored.message || "Restore failed." };
      const logEntry = appendModLog({
        actionType,
        actor,
        targetType,
        targetId,
        reason,
        metadata: { ...metadata, postId: restored.postId, beforePreview, restoredAt: now() }
      });
      if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
      sendToSockets(
        (client) =>
          canUserSeePostByCollection(client.user?.username || "", restored.entry.post) &&
          (restored.entry.post?.protected ? hasPostAccess(client, restored.entry.post) : true),
        { type: "chatHistory", postId: restored.postId, messages: serializeChatHistoryForWs(restored.entry) }
      );
      return { ok: true, action: logEntry, effects: { postId: restored.postId, messageId: targetId } };
    }
    return { ok: false, message: "Unsupported chat moderation action." };
  }

  if (targetType === "report") {
    const report = reports.find((x) => x.id === targetId);
    if (!report) return { ok: false, message: "Report not found." };
    if (actionType !== "report_resolve" && actionType !== "report_dismiss") {
      return { ok: false, message: "Unsupported report moderation action." };
    }
    report.status = actionType === "report_resolve" ? "resolved" : "dismissed";
    report.resolutionNote = reason;
    report.resolvedBy = actor;
    report.resolvedAt = now();
    persistReports();
    const logEntry = appendModLog({ actionType, actor, targetType, targetId, reason, metadata: { ...metadata } });
    if (!logEntry) return { ok: false, message: "Failed to write moderation log." };
    sendToSockets(
      (client) => client.user?.username && hasRole(client.user.username, ROLE_MODERATOR),
      { type: "reportUpdated", report }
    );
    return { ok: true, action: logEntry, effects: { reportId: targetId, status: report.status } };
  }

  return { ok: false, message: "Unsupported moderation target type." };
}

const server = http.createServer(serveStatic);

loadUsersFromDisk();
try {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
  if (fs.existsSync(USERS_FILE)) {
    fs.watch(USERS_FILE, { persistent: false }, () => loadUsersFromDisk());
  }
} catch {
  // ignore
}

loadCollectionsFromDisk();
try {
  fs.mkdirSync(path.dirname(COLLECTIONS_FILE), { recursive: true });
} catch {
  // ignore
}

loadCustomRolesFromDisk();
try {
  fs.mkdirSync(path.dirname(ROLES_FILE), { recursive: true });
} catch {
  // ignore
}

loadPostsFromDisk();
try {
  fs.mkdirSync(path.dirname(POSTS_FILE), { recursive: true });
} catch {
  // ignore
}

loadModerationLogFromDisk();
try {
  fs.mkdirSync(path.dirname(MOD_LOG_FILE), { recursive: true });
} catch {
  // ignore
}

loadReportsFromDisk();
try {
  fs.mkdirSync(path.dirname(REPORTS_FILE), { recursive: true });
} catch {
  // ignore
}

loadSessionsFromDisk();
try {
  fs.mkdirSync(path.dirname(SESSIONS_FILE), { recursive: true });
} catch {
  // ignore
}

loadInstanceFromDisk();
try {
  fs.mkdirSync(path.dirname(INSTANCE_FILE), { recursive: true });
  if (fs.existsSync(INSTANCE_FILE)) {
    let instanceWatchTimer = null;
    fs.watch(INSTANCE_FILE, { persistent: false }, () => {
      if (instanceWatchTimer) clearTimeout(instanceWatchTimer);
      instanceWatchTimer = setTimeout(() => {
        instanceWatchTimer = null;
        loadInstanceFromDisk();
        broadcastInstanceUpdated(false);
      }, 75);
    });
  }
} catch {
  // ignore
}

loadPluginsFromDisk();
appendDevLog({ level: "info", scope: "server", message: "Server started", data: { port: PORT, host: HOST } });
try {
  fs.mkdirSync(path.dirname(PLUGINS_FILE), { recursive: true });
  fs.mkdirSync(PLUGINS_DIR, { recursive: true });
  if (fs.existsSync(PLUGINS_FILE)) {
    fs.watch(PLUGINS_FILE, { persistent: false }, () => {
      loadPluginsFromDisk();
      broadcastPluginsUpdated();
    });
  }
  fs.watch(PLUGINS_DIR, { persistent: false }, () => {
    loadPluginsFromDisk();
    broadcastPluginsUpdated();
  });
} catch {
  // ignore
}

loadDmKey();
loadDmsFromDisk();
try {
  fs.mkdirSync(path.dirname(DMS_FILE), { recursive: true });
  if (fs.existsSync(DMS_FILE)) {
    fs.watch(DMS_FILE, { persistent: false }, () => loadDmsFromDisk());
  }
} catch {
  // ignore
}

setInterval(() => dmPurgeOld(), 60 * 60_000);
dmPurgeOld();

const wss = new WebSocketServer({ server, path: "/ws" });
wss.on("connection", (ws, req) => {
  ws.clientId = toId();
  ws.user = null;
  ws.sessionId = "";
  ws.unlockedPostIds = new Set();
  ws.remoteAddress =
    req?.socket?.remoteAddress && typeof req.socket.remoteAddress === "string"
      ? normalizeRemoteAddress(req.socket.remoteAddress)
      : null;
  ws.isLoopback = isLoopbackAddress(ws.remoteAddress);
  sockets.add(ws);

  for (const [pid] of posts) syncPostReactions(pid);
  const activePosts = Array.from(posts.values())
    .filter((e) => canUserSeePostByCollection(ws.user?.username || "", e.post))
    .map((e) => serializePostForWs(ws, e.post))
    .sort((a, b) => b.createdAt - a.createdAt);

  ws.send(
    JSON.stringify({
      type: "init",
      serverTime: now(),
      posts: activePosts,
      clientId: ws.clientId,
      profiles: buildProfilesMap(),
      instance: instanceBranding,
      people: { members: buildPeopleSnapshot() },
      collections: listCollectionsForClient(ws.user?.username || ""),
      roles: { custom: listCustomRolesForClient() },
      plugins: listPluginsForClient(),
      reactions: { allowed: ALLOWED_REACTIONS, allowedPost: ALLOWED_POST_REACTIONS, allowedChat: ALLOWED_CHAT_REACTIONS },
      auth: {
        loggedIn: false,
        username: null,
        role: null,
        mutedUntil: 0,
        suspendedUntil: 0,
        banned: false,
        canModerate: false,
        canRegisterFirstUser: canRegisterFirstUser(ws),
        registrationEnabled: registrationEnabled()
      }
    })
  );

  ws.on("message", (data) => {
    let msg;
    try {
      msg = JSON.parse(String(data));
    } catch {
      return;
    }

    if (!msg || typeof msg !== "object") return;

    const msgType = typeof msg.type === "string" ? msg.type : "";
    const pluginMatch = msgType.match(/^plugin:([a-z0-9_.-]{1,32}):([a-zA-Z0-9_.-]{1,64})$/);
    if (pluginMatch) {
      const pluginId = normalizePluginId(pluginMatch[1]);
      const eventName = pluginMatch[2];
      const enabled = pluginId ? Boolean(pluginsStateById.get(pluginId)?.enabled) : false;
      const runtime = pluginId ? pluginRuntimeById.get(pluginId) : null;
      const handler = enabled && runtime?.wsHandlers ? runtime.wsHandlers.get(eventName) : null;
      if (typeof handler !== "function") {
        sendError(ws, "Plugin event not available.");
        return;
      }
      try {
        handler(ws, msg);
      } catch (e) {
        console.warn(`Plugin ${pluginId} handler failed (${eventName}):`, e?.message || e);
        sendError(ws, "Plugin error.");
      }
      return;
    }

    if (msg.type === "resumeSession") {
      const limit = takeRateLimit("resume", wsIdentity(ws), RL_RESUME_MAX, RL_RESUME_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many session resume attempts. Please wait.");
        return;
      }
      const token = typeof msg.token === "string" ? msg.token : "";
      const session = validateSessionToken(token);
      if (!session) {
        ws.send(JSON.stringify({ type: "sessionInvalid" }));
        return;
      }
      const username = normalizeUsername(session.username);
      const user = usersByName.get(username);
      if (!user || userState(username).banned) {
        revokeSessionId(session.id);
        ws.send(JSON.stringify({ type: "sessionInvalid" }));
        return;
      }
      if (ws.sessionId) revokeSessionId(ws.sessionId);
      ws.user = { username, role: normalizeRole(user.role) };
      ws.sessionId = session.id;
      for (const entry of posts.values()) {
        if (entry.post?.protected && entry.post.author === username) ws.unlockedPostIds.add(entry.post.id);
      }
      const nextToken = issueSessionToken(username);
      revokeSessionId(session.id);
      sendLoginOk(ws, username, nextToken);
      ws.sessionId = nextToken.split(".")[0] || "";
      sendCollectionsForWs(ws);
      sendRolesForWs(ws);
      sendPostsSnapshot(ws);
      broadcastPeopleSnapshot();
      sendLanInfoIfModerator(ws);
      return;
    }

    if (ws.user?.username) {
      const state = userState(ws.user.username);
      if (state.banned && msg.type !== "logout") {
        const hadUser = Boolean(ws.user?.username);
        if (ws.sessionId) revokeSessionId(ws.sessionId);
        ws.user = null;
        ws.sessionId = "";
        ws.send(JSON.stringify({ type: "logoutOk" }));
        ws.send(JSON.stringify({ type: "error", message: "This account is banned." }));
        if (hadUser) broadcastPeopleSnapshot();
        return;
      }
    }

    if (msg.type === "login") {
      const limit = takeRateLimit("login", wsIdentity(ws), RL_LOGIN_MAX, RL_LOGIN_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many login attempts. Please wait.");
        return;
      }
      const username = normalizeUsername(msg.username);
      const password = typeof msg.password === "string" ? msg.password : "";
      const user = usersByName.get(username);
      if (!user) {
        ws.send(JSON.stringify({ type: "loginError", message: "Invalid username or password." }));
        return;
      }
      const computed = hashPassword(password, user.salt);
      if (!safeEqualHex(computed, user.hash)) {
        ws.send(JSON.stringify({ type: "loginError", message: "Invalid username or password." }));
        return;
      }
      if (userState(username).banned) {
        ws.send(JSON.stringify({ type: "loginError", message: "This account is banned." }));
        return;
      }
      if (ws.sessionId) revokeSessionId(ws.sessionId);
      ws.user = { username, role: normalizeRole(user.role) };
      for (const entry of posts.values()) {
        if (entry.post?.protected && entry.post.author === username) ws.unlockedPostIds.add(entry.post.id);
      }
      const sessionToken = issueSessionToken(username);
      ws.sessionId = sessionToken.split(".")[0] || "";
      sendLoginOk(ws, username, sessionToken);
      sendCollectionsForWs(ws);
      sendRolesForWs(ws);
      sendPostsSnapshot(ws);
      broadcastPeopleSnapshot();
      sendLanInfoIfModerator(ws);
      return;
    }

    if (msg.type === "logout") {
      const hadUser = Boolean(ws.user?.username);
      if (ws.sessionId) revokeSessionId(ws.sessionId);
      ws.user = null;
      ws.sessionId = "";
      ws.send(JSON.stringify({ type: "logoutOk" }));
      sendCollectionsForWs(ws);
      sendPostsSnapshot(ws);
      if (hadUser) broadcastPeopleSnapshot();
      return;
    }

    if (msg.type === "register") {
      const limit = takeRateLimit("register", wsIdentity(ws), RL_REGISTER_MAX, RL_REGISTER_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many registration attempts. Please wait.");
        return;
      }
      const isFirstUser = canRegisterFirstUser(ws);
      const providedCode =
        typeof msg.code === "string"
          ? msg.code
          : typeof msg.registrationCode === "string"
            ? msg.registrationCode
            : typeof msg.invite === "string"
              ? msg.invite
              : "";

      if (!isFirstUser) {
        if (!registrationEnabled()) {
          ws.send(JSON.stringify({ type: "error", message: "Registration is disabled on the host." }));
          return;
        }
        if (!providedCode || !providedCode.trim()) {
          ws.send(JSON.stringify({ type: "error", message: "Registration code required." }));
          return;
        }
        if (!validRegistrationCode(providedCode)) {
          ws.send(JSON.stringify({ type: "error", message: "Invalid registration code." }));
          return;
        }
      }

      const username = normalizeUsername(msg.username);
      const password = typeof msg.password === "string" ? msg.password : "";
      if (!username || password.length < 4) {
        ws.send(JSON.stringify({ type: "error", message: "Pick a valid username and a longer password." }));
        return;
      }
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = hashPassword(password, salt);
      const firstUser = usersByName.size === 0;
      const role = firstUser ? ROLE_OWNER : ROLE_MEMBER;
      const record = {
        username,
        salt,
        hash,
        role,
        customRoles: [],
        mutedUntil: 0,
        suspendedUntil: 0,
        banned: false,
        pronouns: "",
        bioHtml: "",
        themeSongUrl: "",
        links: [],
        starredPostIds: [],
        hiddenPostIds: [],
        createdAt: now()
      };
      try {
        const data = readUsersFileForWrite();
        const exists = (data.users || []).some((u) => normalizeUsername(u?.username) === username);
        if (exists) {
          ws.send(JSON.stringify({ type: "error", message: "Username is already taken." }));
          return;
        }
        data.users = Array.isArray(data.users) ? data.users : [];
        data.users.push({ ...record, image: "", color: "" });
        writeUsersFile(data);
        loadUsersFromDisk();
        if (ws.sessionId) revokeSessionId(ws.sessionId);
        ws.user = { username, role };
        broadcast({ type: "profilesUpdated", profiles: buildProfilesMap() });
        broadcastPeopleSnapshot();
        const sessionToken = issueSessionToken(username);
        ws.sessionId = sessionToken.split(".")[0] || "";
        sendLoginOk(ws, username, sessionToken);
        sendCollectionsForWs(ws);
        sendRolesForWs(ws);
        sendPostsSnapshot(ws);
        sendLanInfoIfModerator(ws);
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", message: "Failed to create user file." }));
        console.warn("Failed to write users file:", e.message || e);
      }
      return;
    }

    if (msg.type === "newPost") {
      if (!ws.user?.username) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in to post." }));
        return;
      }
      const guard = enforceUserState(ws, "write");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const title = sanitizePostTitle(typeof msg.title === "string" ? msg.title : "");
      if (!title) {
        ws.send(JSON.stringify({ type: "error", message: "A title is required." }));
        return;
      }
      const rawText = typeof msg.content === "string" ? msg.content.trim() : "";
      const rawHtmlInput = typeof msg.contentHtml === "string" ? msg.contentHtml.trim() : "";
      if (rawHtmlInput.length > POST_MAX_HTML_LEN) {
        ws.send(JSON.stringify({ type: "error", message: "Post body is too large. Try a smaller GIF/audio file." }));
        return;
      }
      const rawHtml = rawHtmlInput;
      const hasHtml = Boolean(rawHtml);
      const safeHtml = hasHtml ? sanitizeRichHtml(rawHtml) : "";
      const safeText = (hasHtml ? sanitizeHtml(safeHtml, { allowedTags: [], allowedAttributes: {} }) : rawText)
        .replace(/\s+/g, " ")
        .trim();

      const hasMedia = /<(img|audio)\b/i.test(safeHtml);
      if (!safeText && !hasMedia) return;

      const clippedText = (safeText || "[media]").slice(0, CHAT_MAX_LEN);
      const clippedHtml = safeHtml || "";
      const wantsProtected = Boolean(msg.protected);
      const postPassword = typeof msg.password === "string" ? msg.password : "";
      const requestedCollectionId = normalizeCollectionId(msg.collectionId || "");
      const selectedCollection = getActiveCollectionById(requestedCollectionId);
      if (!selectedCollection) {
        ws.send(JSON.stringify({ type: "error", message: "Please choose a valid collection." }));
        return;
      }
      if (!hasCollectionAccessForUser(ws.user.username, selectedCollection)) {
        ws.send(JSON.stringify({ type: "error", message: "You do not have access to that collection." }));
        return;
      }
      let lock = null;
      if (wantsProtected) {
        if (!postPassword || postPassword.length < 4) {
          ws.send(JSON.stringify({ type: "error", message: "Protected posts need a password (min 4 chars)." }));
          return;
        }
        const salt = crypto.randomBytes(16).toString("hex");
        lock = { salt, hash: hashPassword(postPassword, salt) };
      }
      const requestedTtl = Number(msg.ttl || 0);
      const wantsPermanent = Number.isFinite(requestedTtl) && requestedTtl === 0;
      const canMakePermanent =
        hasRole(ws.user.username, ROLE_MODERATOR) || Boolean(instanceBranding?.allowMemberPermanentPosts);
      if (wantsPermanent && !canMakePermanent) {
        ws.send(JSON.stringify({ type: "error", message: "Permanent hives are disabled on this instance." }));
        return;
      }
      const post = createPost({
        content: {
          title,
          bodyText: clippedText,
          bodyHtml: clippedHtml,
          fromClientId: ws.clientId
        },
        keywords: msg.keywords,
        ttl: wantsPermanent ? 0 : msg.ttl,
        author: ws.user.username,
        lock,
        collectionId: selectedCollection.id,
        mode: sanitizePostMode(msg.mode)
      });
      // Send per-client serialized view (protected posts are redacted unless unlocked/author)
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (!canUserSeePostByCollection(client.user?.username || "", post)) continue;
        client.send(JSON.stringify({ type: "newPost", post: serializePostForWs(client, post) }));
      }
      return;
    }

    if (msg.type === "boostPost") {
      if (!ws.user?.username) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in to boost." }));
        return;
      }
      const guard = enforceUserState(ws, "write");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const postId = typeof msg.postId === "string" ? msg.postId : "";
      const entry = posts.get(postId);
      if (!entry) {
        ws.send(JSON.stringify({ type: "error", message: "Post not found." }));
        return;
      }
      if (entry.post?.deleted) {
        ws.send(JSON.stringify({ type: "error", message: "This post was deleted." }));
        return;
      }
      if (entry.post.author && entry.post.author === ws.user.username) {
        ws.send(JSON.stringify({ type: "error", message: "You can't boost your own post." }));
        return;
      }

      const boostMs = clampBoostMs(msg.boostMs);
      const t = now();
      bumpPostActivity(entry, t);
      extendBoost(entry, t, boostMs);
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (!canUserSeePostByCollection(client.user?.username || "", entry.post)) continue;
        client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, entry.post) }));
      }
      schedulePersist();
      return;
    }

    if (msg.type === "updateProfile") {
      if (!ws.user?.username) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in to update profile." }));
        return;
      }
      const hasImage = Object.prototype.hasOwnProperty.call(msg, "image");
      const hasColor = Object.prototype.hasOwnProperty.call(msg, "color");
      const hasPronouns = Object.prototype.hasOwnProperty.call(msg, "pronouns");
      const hasBioHtml = Object.prototype.hasOwnProperty.call(msg, "bioHtml");
      const hasThemeSongUrl = Object.prototype.hasOwnProperty.call(msg, "themeSongUrl");
      const hasLinks = Object.prototype.hasOwnProperty.call(msg, "links");
      const image = hasImage ? sanitizeProfileImage(msg.image) : null;
      const color = hasColor ? sanitizeColorHex(msg.color) : null;
      const pronouns = hasPronouns ? sanitizePronouns(msg.pronouns) : null;
      const bioHtml = hasBioHtml ? sanitizeProfileBioHtml(msg.bioHtml) : null;
      const themeSongUrl = hasThemeSongUrl ? sanitizeThemeSongUrl(msg.themeSongUrl) : null;
      const links = hasLinks ? sanitizeProfileLinks(msg.links) : null;
      try {
        const username = ws.user.username;
        const write = writeUserPatch(username, (u) => ({
          ...u,
          ...(hasImage ? { image } : {}),
          ...(hasColor ? { color } : {}),
          ...(hasPronouns ? { pronouns } : {}),
          ...(hasBioHtml ? { bioHtml } : {}),
          ...(hasThemeSongUrl ? { themeSongUrl } : {}),
          ...(hasLinks ? { links } : {})
        }));
        if (!write.ok) {
          ws.send(JSON.stringify({ type: "error", message: write.message || "User not found." }));
          return;
        }
        const profile = getPublicProfile(username);
        broadcast({ type: "profilesUpdated", profiles: buildProfilesMap() });
        broadcastPeopleSnapshot();
        broadcast({ type: "userProfileUpdated", profile });
        ws.send(JSON.stringify({ type: "profileOk", profile }));
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", message: "Failed to update profile." }));
        console.warn("Failed to update profile:", e.message || e);
      }
      return;
    }

    if (msg.type === "getUserProfile") {
      const username = normalizeUsername(msg.username);
      if (!username) {
        ws.send(JSON.stringify({ type: "error", message: "Invalid username." }));
        return;
      }
      if (!usersByName.has(username)) {
        ws.send(JSON.stringify({ type: "error", message: "User not found." }));
        return;
      }
      ws.send(JSON.stringify({ type: "userProfile", profile: getPublicProfile(username) }));
      return;
    }

    if (msg.type === "getChat") {
      const postId = typeof msg.postId === "string" ? msg.postId : "";
      const entry = posts.get(postId);
      if (!entry) {
        ws.send(JSON.stringify({ type: "error", message: "Post not found." }));
        return;
      }
      if (!canUserSeePostByCollection(ws.user?.username || "", entry.post)) {
        ws.send(JSON.stringify({ type: "error", message: "You do not have access to this collection." }));
        return;
      }
      if (entry.post?.protected && !hasPostAccess(ws, entry.post)) {
        ws.send(JSON.stringify({ type: "error", message: "This post is password protected." }));
        return;
      }
      if (entry.post?.deleted) {
        ws.send(JSON.stringify({ type: "error", message: "This post was deleted." }));
        return;
      }
      for (const m of entry.chat) syncMessageReactions(m);
      ws.send(JSON.stringify({ type: "chatHistory", postId, messages: serializeChatHistoryForWs(entry) }));
      return;
    }

    if (msg.type === "editPost") {
      if (!ws.user?.username) {
        sendError(ws, "Please sign in to edit posts.");
        return;
      }
      const guard = enforceUserState(ws, "write");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const postId = typeof msg.postId === "string" ? msg.postId : "";
      const entry = posts.get(postId);
      if (!entry) {
        sendError(ws, "Post not found.");
        return;
      }
      if (!entry.post?.author || entry.post.author !== ws.user.username) {
        sendError(ws, "You can only edit your own posts.");
        return;
      }
      if (entry.post.deleted) {
        sendError(ws, "This post was deleted.");
        return;
      }
      const title = sanitizePostTitle(typeof msg.title === "string" ? msg.title : "");
      if (!title) {
        sendError(ws, "Title is required.");
        return;
      }
      const rawText = typeof msg.content === "string" ? msg.content.trim() : "";
      const rawHtmlInput = typeof msg.contentHtml === "string" ? msg.contentHtml.trim() : "";
      if (rawHtmlInput.length > POST_MAX_HTML_LEN) {
        sendError(ws, "Post body is too large.");
        return;
      }
      const safeHtml = rawHtmlInput ? sanitizeRichHtml(rawHtmlInput) : "";
      const safeText = (safeHtml ? sanitizeHtml(safeHtml, { allowedTags: [], allowedAttributes: {} }) : rawText)
        .replace(/\s+/g, " ")
        .trim();
      const hasMedia = /<(img|audio)\b/i.test(safeHtml);
      if (!safeText && !hasMedia) {
        sendError(ws, "Post body cannot be empty.");
        return;
      }
      const wantsProtected = Boolean(msg.protected);
      const password = typeof msg.password === "string" ? msg.password.trim() : "";
      const hasProtectedField = Object.prototype.hasOwnProperty.call(msg, "protected");
      const hasCollectionField = Object.prototype.hasOwnProperty.call(msg, "collectionId");
      const hasKeywordsField = Object.prototype.hasOwnProperty.call(msg, "keywords");
      const hasModeField = Object.prototype.hasOwnProperty.call(msg, "mode") || Object.prototype.hasOwnProperty.call(msg, "chatMode");

      const beforeCollectionId = normalizeCollectionId(entry.post.collectionId || "") || DEFAULT_COLLECTION_ID;
      const beforeProtected = Boolean(entry.post.protected);
      const beforeKeywords = Array.isArray(entry.post.keywords) ? [...entry.post.keywords] : [];
      const beforeTitle = entry.post.title || "";
      const beforeContent = textPreview(entry.post.content || "");
      const beforeMode = sanitizePostMode(entry.post.mode || entry.post.chatMode || "");

      if (hasCollectionField) {
        const requestedCollectionId = normalizeCollectionId(msg.collectionId || "");
        const selectedCollection = getActiveCollectionById(requestedCollectionId);
        if (!selectedCollection) {
          sendError(ws, "Please choose a valid collection.");
          return;
        }
        if (!hasCollectionAccessForUser(ws.user.username, selectedCollection)) {
          sendError(ws, "You do not have access to that collection.");
          return;
        }
        entry.post.collectionId = selectedCollection.id;
      }

      if (hasKeywordsField) {
        entry.post.keywords = normalizeKeywords(msg.keywords);
      }

      if (hasModeField) {
        entry.post.mode = sanitizePostMode(msg.mode || msg.chatMode || "");
      }

      if (hasProtectedField) {
        if (!wantsProtected) {
          entry.post.protected = false;
          entry.post.lockSalt = "";
          entry.post.lockHash = "";
        } else {
          const isAlreadyProtected = Boolean(entry.post.protected && entry.post.lockSalt && entry.post.lockHash);
          if (!isAlreadyProtected && (!password || password.length < 4)) {
            sendError(ws, "Protected posts need a password (min 4 chars).");
            return;
          }
          if (password) {
            if (password.length < 4) {
              sendError(ws, "Protected posts need a password (min 4 chars).");
              return;
            }
            const salt = crypto.randomBytes(16).toString("hex");
            entry.post.protected = true;
            entry.post.lockSalt = salt;
            entry.post.lockHash = hashPassword(password, salt);
          } else {
            entry.post.protected = true;
          }
        }
      }

      entry.post.title = title;
      entry.post.content = safeText.slice(0, POSTS_MAX_CONTENT_LEN) || (hasMedia ? "[media]" : "");
      entry.post.contentHtml = safeHtml;
      entry.post.editedAt = now();
      entry.post.editCount = Math.max(0, Number(entry.post.editCount || 0)) + 1;
      schedulePersist();
      const logEntry = appendModLog({
        actionType: "self_post_edit",
        actor: ws.user.username,
        targetType: "post",
        targetId: postId,
        reason: "Author edited their post.",
        metadata: {
          beforeTitle: textPreview(beforeTitle, 96),
          beforeContent,
          afterTitle: textPreview(entry.post.title, 96),
          beforeCollectionId,
          afterCollectionId: normalizeCollectionId(entry.post.collectionId || "") || DEFAULT_COLLECTION_ID,
          beforeProtected,
          afterProtected: Boolean(entry.post.protected),
          beforeKeywords: beforeKeywords.join(", "),
          afterKeywords: (entry.post.keywords || []).join(", "),
          beforeMode,
          afterMode: sanitizePostMode(entry.post.mode || ""),
          editCount: entry.post.editCount,
          editedAt: entry.post.editedAt
        }
      });
      if (!logEntry) {
        sendError(ws, "Failed to write edit log.");
        return;
      }
      const visibilityChanged = beforeCollectionId !== (normalizeCollectionId(entry.post.collectionId || "") || DEFAULT_COLLECTION_ID);
      const protectionChanged = beforeProtected !== Boolean(entry.post.protected);
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (visibilityChanged || protectionChanged) {
          sendPostsSnapshot(client);
          continue;
        }
        if (!canUserSeePostByCollection(client.user?.username || "", entry.post)) continue;
        client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, entry.post) }));
      }
      return;
    }

    if (msg.type === "deletePostSelf") {
      if (!ws.user?.username) {
        sendError(ws, "Please sign in to delete posts.");
        return;
      }
      const guard = enforceUserState(ws, "write");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const postId = typeof msg.postId === "string" ? msg.postId : "";
      const entry = posts.get(postId);
      if (!entry) {
        sendError(ws, "Post not found.");
        return;
      }
      if (!entry.post?.author || entry.post.author !== ws.user.username) {
        sendError(ws, "You can only delete your own posts.");
        return;
      }
      const beforePreview = textPreview(entry.post?.title || entry.post?.content || "");
      const mark = markPostDeleted(postId, ws.user.username, "");
      if (!mark.ok) {
        sendError(ws, mark.message || "Failed to delete post.");
        return;
      }
      const logEntry = appendModLog({
        actionType: "self_post_delete",
        actor: ws.user.username,
        targetType: "post",
        targetId: postId,
        reason: "Author deleted their post.",
        metadata: { beforePreview, deletedAt: now() }
      });
      if (!logEntry) {
        sendError(ws, "Failed to write deletion log.");
        return;
      }
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (!canUserSeePostByCollection(client.user?.username || "", mark.post)) continue;
        client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, mark.post) }));
      }
      return;
    }

    if (msg.type === "chatMessage") {
      if (!ws.user?.username) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in to chat." }));
        return;
      }
      const guard = enforceUserState(ws, "chat");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const postId = typeof msg.postId === "string" ? msg.postId : "";
      const rawText = typeof msg.text === "string" ? msg.text.trim() : "";
      const rawHtmlInput = typeof msg.html === "string" ? msg.html.trim() : "";
      const replyToId = typeof msg.replyToId === "string" ? msg.replyToId.trim() : "";
      if (rawHtmlInput.length > CHAT_MAX_HTML_LEN) {
        ws.send(JSON.stringify({ type: "error", message: "Chat message is too large. Try a smaller GIF/audio file." }));
        return;
      }
      const rawHtml = rawHtmlInput;
      const hasHtml = Boolean(rawHtml);
      const safeHtml = hasHtml ? sanitizeRichHtml(rawHtml) : "";
      const safeText = (hasHtml ? sanitizeHtml(safeHtml, { allowedTags: [], allowedAttributes: {} }) : rawText)
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, CHAT_MAX_LEN);

      const hasMedia = /<(img|audio)\b/i.test(safeHtml);
      if (!postId || (!safeText && !hasMedia)) return;

      const entry = posts.get(postId);
      if (!entry) {
        ws.send(JSON.stringify({ type: "error", message: "Post expired." }));
        return;
      }
      if (!canUserSeePostByCollection(ws.user?.username || "", entry.post)) {
        ws.send(JSON.stringify({ type: "error", message: "You do not have access to this collection." }));
        return;
      }
      if (entry.post?.protected && !hasPostAccess(ws, entry.post)) {
        ws.send(JSON.stringify({ type: "error", message: "This post is password protected." }));
        return;
      }
      if (entry.post?.deleted) {
        ws.send(JSON.stringify({ type: "error", message: "This post was deleted." }));
        return;
      }
      if (entry.post?.readOnly && !hasRole(ws.user.username, ROLE_MODERATOR)) {
        ws.send(JSON.stringify({ type: "error", message: "This hive is read-only." }));
        return;
      }
      if (sanitizePostMode(entry.post?.mode) === "walkie") {
        const hasAudio = /<audio\b/i.test(safeHtml);
        const hasImg = /<img\b/i.test(safeHtml);
        if (!hasAudio || hasImg) {
          ws.send(JSON.stringify({ type: "error", message: "Walkie Talkie hives only accept audio clips." }));
          return;
        }
        if (replyToId) {
          ws.send(JSON.stringify({ type: "error", message: "Walkie Talkie hives do not support replies." }));
          return;
        }
      }
      const replyTarget = replyToId ? entry.chat.find((m) => m && m.id === replyToId) : null;
      const replyTo = replyTarget
        ? {
            id: replyTarget.id,
            fromUser: normalizeUsername(replyTarget.fromUser || ""),
            text: String(replyTarget.text || "[media]").replace(/\s+/g, " ").trim().slice(0, 140),
            createdAt: Number(replyTarget.createdAt || now())
          }
        : null;
      const mentions = extractMentionUsernames(safeText);

      const message = {
        id: toId(),
        postId,
        text: safeText || "[media]",
        html: safeHtml,
        mentions: sanitizePostMode(entry.post?.mode) === "walkie" ? [] : mentions,
        replyTo,
        reactions: {},
        createdAt: now(),
        fromClientId: ws.clientId,
        fromUser: ws.user.username
      };
      appendChatMessage(postId, message);
      const t = message.createdAt;
      bumpPostActivity(entry, t);
      extendBoost(entry, t, CHAT_BOOST_MS);
      setTyping(postId, ws.user.username, false);
      const protectedPost = Boolean(entry.post?.protected);
      for (const client of sockets) {
        if (client.readyState !== client.OPEN) continue;
        if (!canUserSeePostByCollection(client.user?.username || "", entry.post)) continue;
        if (protectedPost && !hasPostAccess(client, entry.post)) continue;
        client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, entry.post) }));
        client.send(JSON.stringify({ type: "chatMessage", postId, message }));
      }
      return;
    }

    if (msg.type === "editChatMessage") {
      if (!ws.user?.username) {
        sendError(ws, "Please sign in to edit messages.");
        return;
      }
      const guard = enforceUserState(ws, "chat");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const messageId = typeof msg.messageId === "string" ? msg.messageId : "";
      const found = findMessageById(messageId);
      if (!found) {
        sendError(ws, "Message not found.");
        return;
      }
      if (sanitizePostMode(found.entry?.post?.mode) === "walkie") {
        sendError(ws, "Walkie Talkie messages cannot be edited.");
        return;
      }
      if (found.message.fromUser !== ws.user.username) {
        sendError(ws, "You can only edit your own messages.");
        return;
      }
      if (found.message.deleted) {
        sendError(ws, "This message was deleted.");
        return;
      }
      const rawText = typeof msg.text === "string" ? msg.text.trim() : "";
      const rawHtmlInput = typeof msg.html === "string" ? msg.html.trim() : "";
      if (rawHtmlInput.length > CHAT_MAX_HTML_LEN) {
        sendError(ws, "Message is too large.");
        return;
      }
      const safeHtml = rawHtmlInput ? sanitizeRichHtml(rawHtmlInput) : "";
      const safeText = (safeHtml ? sanitizeHtml(safeHtml, { allowedTags: [], allowedAttributes: {} }) : rawText)
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, CHAT_MAX_LEN);
      const hasMedia = /<(img|audio)\b/i.test(safeHtml);
      if (!safeText && !hasMedia) {
        sendError(ws, "Message cannot be empty.");
        return;
      }
      const beforeText = textPreview(found.message.text || "", 140);
      found.message.text = safeText || "[media]";
      found.message.html = safeHtml;
      found.message.mentions = extractMentionUsernames(safeText);
      found.message.editedAt = now();
      found.message.editCount = Math.max(0, Number(found.message.editCount || 0)) + 1;
      schedulePersist();
      const logEntry = appendModLog({
        actionType: "self_message_edit",
        actor: ws.user.username,
        targetType: "chat",
        targetId: messageId,
        reason: "Author edited their message.",
        metadata: { postId: found.postId, beforeText, editCount: found.message.editCount, editedAt: found.message.editedAt }
      });
      if (!logEntry) {
        sendError(ws, "Failed to write edit log.");
        return;
      }
      sendToSockets(
        (client) =>
          canUserSeePostByCollection(client.user?.username || "", found.entry.post) &&
          (found.entry.post?.protected ? hasPostAccess(client, found.entry.post) : true),
        { type: "chatHistory", postId: found.postId, messages: serializeChatHistoryForWs(found.entry) }
      );
      return;
    }

    if (msg.type === "deleteChatMessageSelf") {
      if (!ws.user?.username) {
        sendError(ws, "Please sign in to delete messages.");
        return;
      }
      const guard = enforceUserState(ws, "chat");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const messageId = typeof msg.messageId === "string" ? msg.messageId : "";
      const found = findMessageById(messageId);
      if (!found) {
        sendError(ws, "Message not found.");
        return;
      }
      if (found.message.fromUser !== ws.user.username) {
        sendError(ws, "You can only delete your own messages.");
        return;
      }
      const beforeText = textPreview(found.message.text || "", 140);
      const mark = markChatDeleted(found, ws.user.username);
      if (!mark.ok) {
        sendError(ws, mark.message || "Failed to delete message.");
        return;
      }
      const logEntry = appendModLog({
        actionType: "self_message_delete",
        actor: ws.user.username,
        targetType: "chat",
        targetId: messageId,
        reason: "Author deleted their message.",
        metadata: { postId: found.postId, beforeText, deletedAt: now() }
      });
      if (!logEntry) {
        sendError(ws, "Failed to write deletion log.");
        return;
      }
      sendToSockets(
        (client) =>
          canUserSeePostByCollection(client.user?.username || "", found.entry.post) &&
          (found.entry.post?.protected ? hasPostAccess(client, found.entry.post) : true),
        { type: "chatHistory", postId: found.postId, messages: serializeChatHistoryForWs(found.entry) }
      );
      return;
    }

    if (msg.type === "react") {
      if (!ws.user?.username) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in to react." }));
        return;
      }
      const guard = enforceUserState(ws, "write");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const emoji = typeof msg.emoji === "string" ? msg.emoji : "";
      const targetType = msg.targetType === "post" || msg.targetType === "chat" ? msg.targetType : "";
      const username = ws.user.username;

      if (targetType === "post") {
        if (!ALLOWED_POST_REACTIONS.includes(emoji)) return;
        const postId = typeof msg.postId === "string" ? msg.postId : "";
        const entry = posts.get(postId);
        if (!entry) return;
        if (!canUserSeePostByCollection(ws.user?.username || "", entry.post)) {
          ws.send(JSON.stringify({ type: "error", message: "You do not have access to this collection." }));
          return;
        }
        if (entry.post?.protected && !hasPostAccess(ws, entry.post)) {
          ws.send(JSON.stringify({ type: "error", message: "This post is password protected." }));
          return;
        }
        if (entry.post?.deleted) {
          ws.send(JSON.stringify({ type: "error", message: "This post was deleted." }));
          return;
        }
        const set = getOrCreateReactionSet(postReactionsByPostId, postId, emoji);
        const didAdd = !set.has(username);
        if (didAdd) set.add(username);
        else set.delete(username);
        syncPostReactions(postId);
        if (emoji === "⭐") {
          const result = updateUserPrefs(username, (prefs) => {
            const starred = new Set(sanitizePostIdList(prefs.starredPostIds));
            if (didAdd) starred.add(postId);
            else starred.delete(postId);
            return { ...prefs, starredPostIds: Array.from(starred.values()) };
          });
          if (result.ok) sendUserPrefs(ws);
        }
        for (const client of sockets) {
          if (client.readyState !== client.OPEN) continue;
          if (!canUserSeePostByCollection(client.user?.username || "", entry.post)) continue;
          client.send(JSON.stringify({ type: "postUpdated", post: serializePostForWs(client, entry.post) }));
        }
        schedulePersist();
        return;
      }

      if (targetType === "chat") {
        if (!ALLOWED_CHAT_REACTIONS.includes(emoji)) return;
        const messageId = typeof msg.messageId === "string" ? msg.messageId : "";
        if (!messageId) return;

        // Find the message to update
        let foundMessage = null;
        let foundPostId = "";
        for (const [pid, entry] of posts.entries()) {
          const m = entry.chat.find((x) => x && x.id === messageId);
          if (m) {
            foundMessage = m;
            foundPostId = pid;
            break;
          }
        }
        if (!foundMessage) return;
        const entry = posts.get(foundPostId);
        if (entry && !canUserSeePostByCollection(ws.user?.username || "", entry.post)) {
          ws.send(JSON.stringify({ type: "error", message: "You do not have access to this collection." }));
          return;
        }
        if (entry?.post?.protected && !hasPostAccess(ws, entry.post)) {
          ws.send(JSON.stringify({ type: "error", message: "This post is password protected." }));
          return;
        }
        if (entry?.post?.deleted || foundMessage?.deleted) {
          ws.send(JSON.stringify({ type: "error", message: "This message was deleted." }));
          return;
        }

        const set = getOrCreateReactionSet(chatReactionsByMessageId, messageId, emoji);
        if (set.has(username)) set.delete(username);
        else set.add(username);

        syncMessageReactions(foundMessage);
        sendToSockets(
          (client) =>
            (entry ? canUserSeePostByCollection(client.user?.username || "", entry.post) : true) &&
            (entry?.post?.protected ? hasPostAccess(client, entry.post) : true),
          { type: "reactionUpdated", targetType: "chat", postId: foundPostId, messageId, reactions: foundMessage.reactions }
        );
        schedulePersist();
      }
      return;
    }

    if (msg.type === "hidePost" || msg.type === "unhidePost") {
      if (!ws.user?.username) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in first." }));
        return;
      }
      const postId = typeof msg.postId === "string" ? msg.postId.trim() : "";
      if (!postId) return;
      if (!posts.has(postId)) {
        ws.send(JSON.stringify({ type: "error", message: "Post not found." }));
        return;
      }
      const hide = msg.type === "hidePost";
      const result = updateUserPrefs(ws.user.username, (prefs) => {
        const hidden = new Set(sanitizePostIdList(prefs.hiddenPostIds));
        if (hide) hidden.add(postId);
        else hidden.delete(postId);
        return { ...prefs, hiddenPostIds: Array.from(hidden.values()) };
      });
      if (!result.ok) {
        ws.send(JSON.stringify({ type: "error", message: "Failed to update hidden hives." }));
        return;
      }
      ws.send(JSON.stringify({ type: "userPrefs", prefs: result.prefs }));
      return;
    }

    if (msg.type === "ignoreUser" || msg.type === "unignoreUser") {
      const actor = ws.user?.username;
      if (!actor) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in first." }));
        return;
      }
      const guard = enforceUserState(ws, "write");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const target = normalizeUsername(msg.username || msg.target || "");
      if (!target || target === normalizeUsername(actor)) {
        sendError(ws, "Pick a valid user.");
        return;
      }
      if (!usersByName.has(target)) {
        sendError(ws, "User not found.");
        return;
      }
      if (hasRole(target, ROLE_MODERATOR)) {
        sendError(ws, "You can't ignore moderators or the owner.");
        return;
      }
      const ignore = msg.type === "ignoreUser";
      const result = updateUserPrefs(actor, (prefs) => {
        const ignored = new Set(sanitizeUsernameList(prefs.ignoredUsers));
        if (ignore) ignored.add(target);
        else ignored.delete(target);
        return { ...prefs, ignoredUsers: Array.from(ignored.values()) };
      });
      if (!result.ok) {
        sendError(ws, "Failed to update ignore list.");
        return;
      }
      ws.send(JSON.stringify({ type: "userPrefs", prefs: result.prefs }));
      return;
    }

    if (msg.type === "blockUser" || msg.type === "unblockUser") {
      const actor = ws.user?.username;
      if (!actor) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in first." }));
        return;
      }
      const guard = enforceUserState(ws, "write");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const target = normalizeUsername(msg.username || msg.target || "");
      if (!target || target === normalizeUsername(actor)) {
        sendError(ws, "Pick a valid user.");
        return;
      }
      if (!usersByName.has(target)) {
        sendError(ws, "User not found.");
        return;
      }
      if (hasRole(target, ROLE_MODERATOR)) {
        sendError(ws, "You can't block moderators or the owner.");
        return;
      }
      const block = msg.type === "blockUser";
      const result = updateUserPrefs(actor, (prefs) => {
        const blocked = new Set(sanitizeUsernameList(prefs.blockedUsers));
        const ignored = new Set(sanitizeUsernameList(prefs.ignoredUsers));
        if (block) {
          blocked.add(target);
          ignored.add(target);
        } else {
          blocked.delete(target);
        }
        return { ...prefs, blockedUsers: Array.from(blocked.values()), ignoredUsers: Array.from(ignored.values()) };
      });
      if (!result.ok) {
        sendError(ws, "Failed to update block list.");
        return;
      }

      if (block) {
        // If a DM exists, shut it down and purge its messages.
        for (const t of dmThreadsById.values()) {
          const users = Array.isArray(t?.users) ? t.users.map((u) => normalizeUsername(u)) : [];
          if (users.includes(normalizeUsername(actor)) && users.includes(target)) {
            t.state = "declined";
            t.pendingFor = "";
            t.messages = [];
            t.lastMessageAt = 0;
            t.updatedAt = now();
            dmThreadsById.set(t.id, t);
            try {
              persistDmsToDisk();
            } catch {
              // ignore
            }
            broadcastDmThread(t);
            break;
          }
        }
      }

      ws.send(JSON.stringify({ type: "userPrefs", prefs: result.prefs }));
      return;
    }

    if (msg.type === "nukeBoard") {
      const actor = ws.user?.username;
      if (!actor || !hasRole(actor, ROLE_OWNER)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Owner access required." }));
        return;
      }
      const guard = enforceUserState(ws, "write");
      if (!guard.ok) {
        sendError(ws, guard.message);
        return;
      }
      const confirmToggle = Boolean(msg.confirm);
      const confirmText = String(msg.confirmText || "").trim().toUpperCase();
      if (!confirmToggle || confirmText !== "ARE YOU SURE?") {
        sendError(ws, "Confirmation required.");
        return;
      }

      let deletedUploads = 0;
      let keptUploads = 0;
      let deletedPosts = 0;
      try {
        // Cancel all post timers
        for (const entry of posts.values()) {
          if (entry?.timer) clearTimeout(entry.timer);
        }
        deletedPosts = posts.size;

        // Clear in-memory state
        posts.clear();
        typingByPostId.clear();
        postReactionsByPostId.clear();
        chatReactionsByMessageId.clear();
        reports = [];
        moderationLog = [];

        // Persist cleared state
        if (persistTimer) {
          clearTimeout(persistTimer);
          persistTimer = null;
        }
        persistPostsToDisk();
        persistReports();
        persistModerationLog();

        // Delete uploads not referenced by any profile fields (or plugin map assets).
        const keep = new Set([...keptUploadFilenamesFromProfiles().values(), ...keptUploadFilenamesFromPluginMaps().values()]);
        try {
          const names = fs.existsSync(UPLOADS_DIR) ? fs.readdirSync(UPLOADS_DIR) : [];
          for (const name of names) {
            const full = path.join(UPLOADS_DIR, name);
            let stat = null;
            try {
              stat = fs.statSync(full);
            } catch {
              continue;
            }
            if (!stat || !stat.isFile()) continue;
            if (keep.has(name)) {
              keptUploads += 1;
              continue;
            }
            try {
              fs.unlinkSync(full);
              deletedUploads += 1;
            } catch {
              // ignore
            }
          }
        } catch (e) {
          console.warn("Failed to clear uploads:", e?.message || e);
        }
      } catch (e) {
        console.warn("NUKE failed:", e?.message || e);
        sendError(ws, "NUKE failed. Check server logs.");
        return;
      }

      // Tell clients to clear their local state.
      broadcast({ type: "boardReset" });
      broadcast({ type: "postsSnapshot", posts: [] });

      ws.send(JSON.stringify({ type: "nukeOk", deletedPosts, deletedUploads, keptUploads }));
      return;
    }

    if (msg.type === "modListLog") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const requestedLimit = Number(msg.limit || 100);
      const limit = Math.max(1, Math.min(500, Math.floor(requestedLimit)));
      const list = listModerationLog(msg.filters).slice(0, limit);
      ws.send(JSON.stringify({ type: "modSnapshot", log: list, cursor: null }));
      return;
    }

    if (msg.type === "devLogList") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      sendDevLogForWs(ws, msg.limit || 200);
      return;
    }

    if (msg.type === "devLogClear") {
      const actor = ws?.user?.username;
      if (!actor || !hasRole(actor, ROLE_OWNER)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Owner access required." }));
        return;
      }
      devLog = [];
      devLogSeq = 1;
      sendToSockets(
        (client) => client.user?.username && hasRole(client.user.username, ROLE_MODERATOR),
        { type: "devLogSnapshot", log: [] }
      );
      ws.send(JSON.stringify({ type: "devLogOk", cleared: true }));
      appendDevLog({ level: "warn", scope: "server", message: "Dev log cleared", data: { by: actor } });
      return;
    }

    if (msg.type === "devLogClient") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const actor = normalizeUsername(ws.user?.username || "") || "unknown";
      appendDevLog({
        level: msg.level || "info",
        scope: `client:${actor}${msg.scope ? `:${safeDevLogText(msg.scope, 80)}` : ""}`,
        message: msg.message || "",
        data: msg.data
      });
      ws.send(JSON.stringify({ type: "devLogOk" }));
      return;
    }

    if (msg.type === "collectionList") {
      sendCollectionsForWs(ws);
      return;
    }

    if (msg.type === "pluginSetEnabled") {
      const actor = ws?.user?.username;
      if (!actor || !hasRole(actor, ROLE_OWNER)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Owner access required." }));
        return;
      }
      const id = normalizePluginId(msg.id || msg.pluginId || "");
      if (!id || !pluginManifestsById.has(id)) {
        sendError(ws, "Plugin not found.");
        return;
      }
      const enabled = Boolean(msg.enabled);
      pluginsStateById.set(id, { enabled });
      try {
        persistPluginsStateToDisk();
      } catch (e) {
        sendError(ws, e?.message || "Failed to save plugin state.");
        return;
      }
      loadPluginsFromDisk();
      broadcastPluginsUpdated();
      ws.send(JSON.stringify({ type: "pluginOk", id, enabled }));
      return;
    }

    if (msg.type === "pluginUninstall") {
      const actor = ws?.user?.username;
      if (!actor || !hasRole(actor, ROLE_OWNER)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Owner access required." }));
        return;
      }
      const id = normalizePluginId(msg.id || msg.pluginId || "");
      if (!id || !pluginManifestsById.has(id)) {
        sendError(ws, "Plugin not found.");
        return;
      }
      const dir = pluginDirForId(id);
      try {
        fs.rmSync(dir, { recursive: true, force: true });
      } catch (e) {
        sendError(ws, e?.message || "Failed to remove plugin files.");
        return;
      }
      pluginsStateById.delete(id);
      try {
        persistPluginsStateToDisk();
      } catch {
        // ignore
      }
      loadPluginsFromDisk();
      broadcastPluginsUpdated();
      ws.send(JSON.stringify({ type: "pluginOk", id, uninstalled: true }));
      return;
    }

    if (msg.type === "pluginReload") {
      const actor = ws?.user?.username;
      if (!actor || !hasRole(actor, ROLE_OWNER)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Owner access required." }));
        return;
      }
      loadPluginsFromDisk();
      broadcastPluginsUpdated();
      ws.send(JSON.stringify({ type: "pluginOk", reloaded: true }));
      return;
    }

    if (msg.type === "instanceSetBranding") {
      const actor = ws?.user?.username;
      if (!actor || !hasRole(actor, ROLE_OWNER)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Owner access required." }));
        return;
      }
      const title = sanitizeInstanceText(msg.title || "", INSTANCE_TITLE_MAX_LEN);
      if (!title) {
        ws.send(JSON.stringify({ type: "error", message: "Title is required." }));
        return;
      }
      const subtitle = sanitizeInstanceText(msg.subtitle || "", INSTANCE_SUBTITLE_MAX_LEN);
      const allowMemberPermanentPosts = Boolean(msg.allowMemberPermanentPosts);
      const appearance =
        msg?.appearance && typeof msg.appearance === "object"
          ? msg.appearance
          : {
              accent: msg.accent,
              accent2: msg.accent2,
              fontBody: msg.fontBody,
              fontMono: msg.fontMono
            };
      instanceBranding = sanitizeInstanceBranding({ title, subtitle, allowMemberPermanentPosts, appearance });
      try {
        persistInstanceToDisk();
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", message: e?.message || "Failed to save instance settings." }));
        return;
      }
      broadcastInstanceUpdated(true);
      ws.send(JSON.stringify({ type: "instanceOk", instance: instanceBranding }));
      appendModLog({
        actionType: "instance_branding_set",
        actor,
        targetType: "system",
        targetId: "instance",
        reason: "Updated instance branding",
        metadata: {
          title: instanceBranding.title,
          subtitle: instanceBranding.subtitle,
          allowMemberPermanentPosts: Boolean(instanceBranding.allowMemberPermanentPosts),
          appearance: instanceBranding.appearance
        }
      });
      return;
    }

    if (msg.type === "instanceSetAppearance") {
      const actor = ws?.user?.username;
      if (!actor || !hasRole(actor, ROLE_MODERATOR)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const appearance =
        msg?.appearance && typeof msg.appearance === "object"
          ? msg.appearance
          : {
              bg: msg.bg,
              panel: msg.panel,
              text: msg.text,
              accent: msg.accent,
              accent2: msg.accent2,
              good: msg.good,
              bad: msg.bad,
              fontBody: msg.fontBody,
              fontMono: msg.fontMono,
              mutedPct: msg.mutedPct,
              linePct: msg.linePct,
              panel2Pct: msg.panel2Pct
            };
      instanceBranding = sanitizeInstanceBranding({ ...instanceBranding, appearance });
      try {
        persistInstanceToDisk();
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", message: e?.message || "Failed to save instance appearance." }));
        return;
      }
      broadcastInstanceUpdated(true);
      ws.send(JSON.stringify({ type: "instanceOk", instance: instanceBranding }));
      appendModLog({
        actionType: "instance_appearance_set",
        actor,
        targetType: "system",
        targetId: "instance",
        reason: "Updated instance appearance",
        metadata: { appearance: instanceBranding.appearance }
      });
      return;
    }

    if (msg.type === "collectionCreate") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const limit = takeRateLimit("modAction", wsIdentity(ws), RL_MOD_MAX, RL_MOD_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many moderation actions. Please wait.");
        return;
      }
      const name = normalizeCollectionName(msg.name || "");
      if (!name) {
        ws.send(JSON.stringify({ type: "error", message: "Collection name is required." }));
        return;
      }
      const existingName = collections.find((c) => c.name.toLowerCase() === name.toLowerCase() && !c.archived);
      if (existingName) {
        ws.send(JSON.stringify({ type: "error", message: "Collection already exists." }));
        return;
      }
      const baseSlug = slugifyCollection(name) || "collection";
      let slug = baseSlug;
      let counter = 2;
      while (collections.some((c) => c.slug === slug)) {
        slug = `${baseSlug}-${counter}`;
        counter += 1;
      }
      const nextOrder = collections.reduce((max, c) => Math.max(max, Number(c.order || 0)), 0) + 1;
      collections.push({
        id: toId(),
        name,
        slug,
        description: "",
        createdBy: ws.user?.username || "system",
        createdAt: now(),
        order: nextOrder,
        visibility: "public",
        allowedRoles: [],
        archived: false
      });
      try {
        persistCollections();
      } catch (e) {
        // Roll back in-memory mutation so the UI doesn't "ghost create".
        collections = collections.filter((c) => c && c.name !== name);
        sendError(ws, e?.message || "Failed to save collections.");
        return;
      }
      appendModLog({
        actionType: "collection_create",
        actor: ws.user?.username || "unknown",
        targetType: "system",
        targetId: name,
        reason: "Created collection",
        metadata: { name }
      });
      // Creating an empty collection does not change post visibility; avoid expensive post snapshots.
      ws.send(JSON.stringify({ type: "collectionOk", name }));
      broadcastCollections({ includePostsSnapshot: false });
      return;
    }

    if (msg.type === "collectionArchive") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const limit = takeRateLimit("modAction", wsIdentity(ws), RL_MOD_MAX, RL_MOD_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many moderation actions. Please wait.");
        return;
      }
      const id = normalizeCollectionId(msg.collectionId || "");
      if (!id) return;
      if (id === DEFAULT_COLLECTION_ID) {
        ws.send(JSON.stringify({ type: "error", message: "Default collection cannot be archived." }));
        return;
      }
      const target = collections.find((c) => c.id === id);
      if (!target) {
        ws.send(JSON.stringify({ type: "error", message: "Collection not found." }));
        return;
      }
      target.archived = true;
      persistCollections();
      appendModLog({
        actionType: "collection_archive",
        actor: ws.user?.username || "unknown",
        targetType: "system",
        targetId: id,
        reason: "Archived collection",
        metadata: { collectionId: id }
      });
      // Archiving a collection should not change post visibility; keep this lightweight.
      broadcastCollections({ includePostsSnapshot: false });
      return;
    }

    if (msg.type === "collectionSetGate") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const limit = takeRateLimit("modAction", wsIdentity(ws), RL_MOD_MAX, RL_MOD_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many moderation actions. Please wait.");
        return;
      }
      const id = normalizeCollectionId(msg.collectionId || "");
      const target = collections.find((c) => c.id === id && !c.archived);
      if (!target) {
        ws.send(JSON.stringify({ type: "error", message: "Collection not found." }));
        return;
      }
      const visibility = msg.visibility === "gated" ? "gated" : "public";
      const allowedRoles = visibility === "gated" ? validateAllowedRoleTokensForCurrentRoles(msg.allowedRoles) : [];
      if (visibility === "gated" && !allowedRoles.length) {
        ws.send(JSON.stringify({ type: "error", message: "Pick at least one allowed role for gated collection." }));
        return;
      }
      target.visibility = visibility;
      target.allowedRoles = allowedRoles;
      persistCollections();
      appendModLog({
        actionType: "collection_gate_set",
        actor: ws.user?.username || "unknown",
        targetType: "system",
        targetId: id,
        reason: "Updated collection visibility",
        metadata: { visibility, allowedRoles }
      });
      broadcastCollections();
      return;
    }

    if (msg.type === "roleCreate") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const limit = takeRateLimit("modAction", wsIdentity(ws), RL_MOD_MAX, RL_MOD_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many moderation actions. Please wait.");
        return;
      }
      const key = normalizeCustomRoleKey(msg.key || "");
      const label = normalizeCustomRoleLabel(msg.label || "");
      const color = sanitizeColorHex(msg.color || "") || "#ff3ea5";
      if (!key || !label) {
        ws.send(JSON.stringify({ type: "error", message: "Role key and label are required." }));
        return;
      }
      if (customRoles.some((r) => r.key === key && !r.archived)) {
        ws.send(JSON.stringify({ type: "error", message: "Role key already exists." }));
        return;
      }
      const nextOrder = customRoles.reduce((max, r) => Math.max(max, Number(r.order || 0)), 0) + 1;
      customRoles.push({
        key,
        label,
        color,
        order: nextOrder,
        createdAt: now(),
        createdBy: ws.user?.username || "system",
        archived: false
      });
      try {
        persistCustomRoles();
      } catch (e) {
        customRoles = customRoles.filter((r) => r && r.key !== key);
        sendError(ws, e?.message || "Failed to save roles.");
        return;
      }
      appendModLog({
        actionType: "custom_role_create",
        actor: ws.user?.username || "unknown",
        targetType: "system",
        targetId: key,
        reason: "Created custom role",
        metadata: { key, label, color }
      });
      ws.send(JSON.stringify({ type: "roleOk", key }));
      broadcastCustomRoles();
      // Creating a role does not change post visibility; avoid expensive post snapshots.
      broadcastCollections({ includePostsSnapshot: false });
      broadcastPeopleSnapshot();
      return;
    }

    if (msg.type === "roleArchive") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const limit = takeRateLimit("modAction", wsIdentity(ws), RL_MOD_MAX, RL_MOD_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many moderation actions. Please wait.");
        return;
      }
      const key = normalizeCustomRoleKey(msg.key || "");
      const role = customRoles.find((r) => r.key === key && !r.archived);
      if (!role) {
        ws.send(JSON.stringify({ type: "error", message: "Role not found." }));
        return;
      }
      role.archived = true;
      persistCustomRoles();
      try {
        const data = readUsersFileForWrite();
        data.users = (Array.isArray(data.users) ? data.users : []).map((u) => ({
          ...u,
          customRoles: sanitizeCustomRoleKeys(u?.customRoles).filter((x) => x !== key)
        }));
        writeUsersFile(data);
        loadUsersFromDisk();
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", message: "Failed to update users for archived role." }));
        return;
      }
      for (const collection of collections) {
        collection.allowedRoles = sanitizeAllowedRoleTokens(collection.allowedRoles).filter((token) => token !== customRoleToken(key));
        if (collection.visibility === "gated" && !collection.allowedRoles.length) {
          collection.visibility = "public";
        }
      }
      persistCollections();
      appendModLog({
        actionType: "custom_role_archive",
        actor: ws.user?.username || "unknown",
        targetType: "system",
        targetId: key,
        reason: "Archived custom role",
        metadata: { key }
      });
      broadcastCustomRoles();
      broadcastCollections();
      broadcastPeopleSnapshot();
      return;
    }

    if (msg.type === "userCustomRoleSet") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const limit = takeRateLimit("modAction", wsIdentity(ws), RL_MOD_MAX, RL_MOD_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many moderation actions. Please wait.");
        return;
      }
      const targetId = normalizeUsername(msg.targetId || "");
      const key = normalizeCustomRoleKey(msg.key || "");
      const enabled = Boolean(msg.enabled);
      if (!targetId || !key) {
        ws.send(JSON.stringify({ type: "error", message: "Target user and role key are required." }));
        return;
      }
      if (!usersByName.has(targetId)) {
        ws.send(JSON.stringify({ type: "error", message: "User not found." }));
        return;
      }
      const roleExists = customRoles.some((r) => r.key === key && !r.archived);
      if (!roleExists) {
        ws.send(JSON.stringify({ type: "error", message: "Role key not found." }));
        return;
      }
      const write = writeUserPatch(targetId, (u) => {
        const existing = new Set(sanitizeCustomRoleKeys(u?.customRoles));
        if (enabled) existing.add(key);
        else existing.delete(key);
        return { ...u, customRoles: Array.from(existing.values()) };
      });
      if (!write.ok) {
        ws.send(JSON.stringify({ type: "error", message: "Failed to update user roles." }));
        return;
      }
      appendModLog({
        actionType: enabled ? "custom_role_assign" : "custom_role_remove",
        actor: ws.user?.username || "unknown",
        targetType: "user",
        targetId,
        reason: enabled ? "Assigned custom role" : "Removed custom role",
        metadata: { key }
      });
      broadcastPeopleSnapshot();
      return;
    }

    if (msg.type === "reportCreate") {
      if (!ws.user?.username) {
        sendError(ws, "Please sign in to report.");
        return;
      }
      const limit = takeRateLimit("reportCreate", wsIdentity(ws), RL_REPORT_MAX, RL_REPORT_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "You are sending reports too quickly. Please wait.");
        return;
      }
      const targetType = msg.targetType === "post" || msg.targetType === "chat" ? msg.targetType : "";
      const targetId = typeof msg.targetId === "string" ? msg.targetId.trim() : "";
      const reason = typeof msg.reason === "string" ? msg.reason.trim().slice(0, 500) : "";
      let postId = typeof msg.postId === "string" ? msg.postId.trim() : "";
      if (!targetType || !targetId) {
        sendError(ws, "Invalid report target.");
        return;
      }
      if (reason.length < 8) {
        sendError(ws, "Report reason must be at least 8 characters.");
        return;
      }

      if (targetType === "post") {
        const entry = posts.get(targetId);
        if (!entry) {
          sendError(ws, "Post not found.");
          return;
        }
        if (!canUserSeePostByCollection(ws.user?.username || "", entry.post)) {
          sendError(ws, "You do not have access to this collection.");
          return;
        }
        if (entry.post?.deleted) {
          sendError(ws, "This post was deleted.");
          return;
        }
        postId = targetId;
      } else {
        let found = false;
        for (const [pid, entry] of posts.entries()) {
          if (entry.chat.some((m) => m && m.id === targetId && !m.deleted)) {
            if (!canUserSeePostByCollection(ws.user?.username || "", entry.post)) {
              sendError(ws, "You do not have access to this collection.");
              return;
            }
            if (entry.post?.deleted) {
              sendError(ws, "This post was deleted.");
              return;
            }
            found = true;
            postId = pid;
            break;
          }
        }
        if (!found) {
          sendError(ws, "Message not found.");
          return;
        }
      }

      const dupe = reports.find(
        (r) => r.status === "open" && r.targetType === targetType && r.targetId === targetId && r.reporter === ws.user.username
      );
      if (dupe) {
        sendError(ws, "You already have an open report for this item.");
        return;
      }

      const report = {
        id: toId(),
        targetType,
        targetId,
        postId,
        reporter: ws.user.username,
        reason,
        status: "open",
        resolutionNote: "",
        createdAt: now(),
        resolvedAt: 0,
        resolvedBy: ""
      };
      reports.unshift(report);
      if (reports.length > 10_000) reports.splice(10_000);
      persistReports();
      appendModLog({
        actionType: "report_create",
        actor: ws.user.username,
        targetType,
        targetId,
        reason,
        metadata: { reportId: report.id, postId }
      });
      ws.send(JSON.stringify({ type: "reportCreated", report }));
      sendToSockets(
        (client) => client.user?.username && hasRole(client.user.username, ROLE_MODERATOR),
        { type: "reportCreated", report }
      );
      return;
    }

    if (msg.type === "modListReports") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const requestedLimit = Number(msg.limit || 100);
      const limit = Math.max(1, Math.min(500, Math.floor(requestedLimit)));
      const status = typeof msg.status === "string" ? msg.status : "open";
      const list = listReports({ status }).slice(0, limit);
      ws.send(JSON.stringify({ type: "modSnapshot", reports: list, cursor: null }));
      return;
    }

    if (msg.type === "modListUsers") {
      if (!modViewAllowed(ws)) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: "Moderator access required." }));
        return;
      }
      const query = normalizeUsername(msg.query || "");
      const users = [];
      for (const [username] of usersByName.entries()) {
        if (query && !username.includes(query)) continue;
        users.push(authPayloadForUser(username));
      }
      users.sort((a, b) => a.username.localeCompare(b.username));
      ws.send(JSON.stringify({ type: "modSnapshot", users, cursor: null }));
      return;
    }

    if (msg.type === "modAction") {
      const limit = takeRateLimit("modAction", wsIdentity(ws), RL_MOD_MAX, RL_MOD_WINDOW_MS);
      if (!limit.ok) {
        sendRateLimited(ws, limit.retryMs, "Too many moderation actions. Please wait.");
        return;
      }
      const result = applyModerationAction(ws, msg);
      if (!result.ok) {
        ws.send(JSON.stringify({ type: "permissionDenied", message: result.message || "Action failed." }));
        return;
      }
      sendToSockets(
        (client) => client.user?.username && hasRole(client.user.username, ROLE_MODERATOR),
        { type: "modActionApplied", action: result.action, effects: result.effects || {} }
      );

      if (result.effects?.user?.username) {
        const targetName = normalizeUsername(result.effects.user.username);
        for (const client of sockets) {
          if (!client.user?.username) continue;
          if (normalizeUsername(client.user.username) !== targetName) continue;
          const state = userState(targetName);
          client.send(
            JSON.stringify({
              type: "authState",
              username: targetName,
              role: state.role,
              customRoles: sanitizeCustomRoleKeys(usersByName.get(targetName)?.customRoles),
              mutedUntil: state.mutedUntil,
              suspendedUntil: state.suspendedUntil,
              banned: state.banned,
              canModerate: hasRole(targetName, ROLE_MODERATOR),
              prefs: getUserPrefs(targetName)
            })
          );
          sendLanInfoIfModerator(client);
          if (state.banned) {
            revokeUserSessions(targetName);
            if (client.sessionId) revokeSessionId(client.sessionId);
            client.user = null;
            client.sessionId = "";
            client.send(JSON.stringify({ type: "logoutOk" }));
          }
        }
        broadcastPeopleSnapshot();
      }
      return;
    }

    if (msg.type === "unlockPost") {
      if (!ws.user?.username) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in to unlock." }));
        return;
      }
      const postId = typeof msg.postId === "string" ? msg.postId : "";
      const password = typeof msg.password === "string" ? msg.password : "";
      const entry = posts.get(postId);
      if (!entry) {
        ws.send(JSON.stringify({ type: "error", message: "Post not found." }));
        return;
      }
      if (!canUserSeePostByCollection(ws.user?.username || "", entry.post)) {
        ws.send(JSON.stringify({ type: "error", message: "You do not have access to this collection." }));
        return;
      }
      if (!entry.post?.protected) {
        ws.send(
          JSON.stringify({
            type: "postUnlocked",
            postId,
            post: serializePostForWs(ws, entry.post),
            messages: serializeChatHistoryForWs(entry)
          })
        );
        return;
      }
      if (!password) {
        ws.send(JSON.stringify({ type: "error", message: "Password required." }));
        return;
      }
      if (!verifyPostPassword(entry.post, password)) {
        ws.send(JSON.stringify({ type: "error", message: "Wrong password." }));
        return;
      }
      ws.unlockedPostIds.add(postId);
      for (const m of entry.chat) syncMessageReactions(m);
      ws.send(
        JSON.stringify({
          type: "postUnlocked",
          postId,
          post: serializePostForWs(ws, entry.post),
          messages: serializeChatHistoryForWs(entry)
        })
      );
      return;
    }

    if (msg.type === "typing") {
      if (!ws.user?.username) return;
      const guard = enforceUserState(ws, "chat");
      if (!guard.ok) return;
      const postId = typeof msg.postId === "string" ? msg.postId : "";
      if (!postId || !posts.has(postId)) return;
      const entry = posts.get(postId);
      if (entry && !canUserSeePostByCollection(ws.user?.username || "", entry.post)) return;
      if (entry?.post?.protected && !hasPostAccess(ws, entry.post)) return;
      const isTyping = Boolean(msg.isTyping);
      setTyping(postId, ws.user.username, isTyping);
      return;
    }

    if (msg.type === "peopleList") {
      ws.send(JSON.stringify({ type: "peopleSnapshot", members: buildPeopleSnapshot() }));
      return;
    }

    if (msg.type === "dmList") {
      if (!ws.user?.username) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in first." }));
        return;
      }
      sendDmSnapshot(ws);
      return;
    }

    if (msg.type === "dmRequestCreate") {
      const fromUser = ws.user?.username;
      if (!fromUser) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in first." }));
        return;
      }
      const guard = enforceUserState(ws, "write");
      if (!guard.ok) {
        ws.send(JSON.stringify({ type: "error", message: guard.message }));
        return;
      }
      const toUser = normalizeUsername(msg.to || "");
      if (!toUser || toUser === normalizeUsername(fromUser)) {
        ws.send(JSON.stringify({ type: "error", message: "Pick a valid user." }));
        return;
      }
      if (!usersByName.has(toUser)) {
        ws.send(JSON.stringify({ type: "error", message: "User not found." }));
        return;
      }
      if (isBlockedByEitherSide(fromUser, toUser)) {
        ws.send(JSON.stringify({ type: "error", message: "DMs are blocked between these users." }));
        return;
      }

      // Reuse existing thread between the two if it exists.
      let existing = null;
      for (const t of dmThreadsById.values()) {
        if (!t?.users) continue;
        const users = t.users.map((u) => normalizeUsername(u));
        if (users.includes(normalizeUsername(fromUser)) && users.includes(toUser)) {
          existing = t;
          break;
        }
      }

      if (existing && existing.state === "active") {
        ws.send(JSON.stringify({ type: "dmThreadOk", thread: serializeDmThreadForUser(existing, fromUser) }));
        return;
      }

      const thread =
        existing && existing.state !== "active"
          ? existing
          : {
              id: toId(),
              users: [normalizeUsername(fromUser), toUser],
              requestedBy: normalizeUsername(fromUser),
              pendingFor: toUser,
              state: "pending",
              createdAt: now(),
              updatedAt: now(),
              lastMessageAt: 0,
              messages: []
            };

      thread.requestedBy = normalizeUsername(fromUser);
      thread.pendingFor = toUser;
      thread.state = "pending";
      thread.updatedAt = now();
      thread.lastMessageAt = 0;
      thread.messages = [];

      dmThreadsById.set(thread.id, thread);
      persistDmsToDisk();
      broadcastDmThread(thread);
      ws.send(JSON.stringify({ type: "dmThreadOk", thread: serializeDmThreadForUser(thread, fromUser) }));
      return;
    }

    if (msg.type === "dmRequestRespond") {
      const actor = ws.user?.username;
      if (!actor) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in first." }));
        return;
      }
      const threadId = typeof msg.threadId === "string" ? msg.threadId : "";
      const accept = Boolean(msg.accept);
      const thread = dmThreadsById.get(threadId);
      if (!thread) {
        ws.send(JSON.stringify({ type: "error", message: "DM not found." }));
        return;
      }
      const u = normalizeUsername(actor);
      if (!thread.users.includes(u)) {
        ws.send(JSON.stringify({ type: "error", message: "DM not found." }));
        return;
      }
      if (thread.state !== "pending" || thread.pendingFor !== u) {
        ws.send(JSON.stringify({ type: "error", message: "No pending request for you." }));
        return;
      }
      const other = dmOtherUser(thread, actor);
      if (accept && other && isBlockedByEitherSide(actor, other)) {
        ws.send(JSON.stringify({ type: "error", message: "You can't accept this DM because one of you has blocked the other." }));
        return;
      }
      thread.state = accept ? "active" : "declined";
      thread.pendingFor = "";
      thread.updatedAt = now();
      if (!accept) {
        thread.messages = [];
        thread.lastMessageAt = 0;
      }
      dmThreadsById.set(thread.id, thread);
      persistDmsToDisk();
      broadcastDmThread(thread);
      return;
    }

    if (msg.type === "dmHistory") {
      const actor = ws.user?.username;
      if (!actor) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in first." }));
        return;
      }
      const threadId = typeof msg.threadId === "string" ? msg.threadId : "";
      const thread = dmThreadsById.get(threadId);
      if (!thread) {
        ws.send(JSON.stringify({ type: "error", message: "DM not found." }));
        return;
      }
      const u = normalizeUsername(actor);
      if (!thread.users.includes(u)) {
        ws.send(JSON.stringify({ type: "error", message: "DM not found." }));
        return;
      }
      if (thread.state !== "active") {
        ws.send(JSON.stringify({ type: "error", message: "DM not active." }));
        return;
      }
      const other = dmOtherUser(thread, actor);
      if (other && isBlockedByEitherSide(actor, other)) {
        ws.send(JSON.stringify({ type: "error", message: "DMs are blocked between these users." }));
        return;
      }
      const messages = (thread.messages || []).slice(-200).map(serializeDmMessageForWs);
      ws.send(JSON.stringify({ type: "dmHistory", threadId, messages }));
      return;
    }

    if (msg.type === "dmSend") {
      const fromUser = ws.user?.username;
      if (!fromUser) {
        ws.send(JSON.stringify({ type: "error", message: "Please sign in first." }));
        return;
      }
      const guard = enforceUserState(ws, "chat");
      if (!guard.ok) {
        ws.send(JSON.stringify({ type: "error", message: guard.message }));
        return;
      }
      const threadId = typeof msg.threadId === "string" ? msg.threadId : "";
      const thread = dmThreadsById.get(threadId);
      if (!thread) {
        ws.send(JSON.stringify({ type: "error", message: "DM not found." }));
        return;
      }
      const u = normalizeUsername(fromUser);
      if (!thread.users.includes(u) || thread.state !== "active") {
        ws.send(JSON.stringify({ type: "error", message: "DM not active." }));
        return;
      }
      const other = dmOtherUser(thread, fromUser);
      if (other && isBlockedByEitherSide(fromUser, other)) {
        ws.send(JSON.stringify({ type: "error", message: "DMs are blocked between these users." }));
        return;
      }
      const rawText = typeof msg.text === "string" ? msg.text : "";
      const rawHtml = typeof msg.html === "string" ? msg.html : "";
      const hasHtml = rawHtml && rawHtml.trim().length > 0;
      const safeHtml = hasHtml ? sanitizeRichHtml(rawHtml) : "";
      const safeText = (hasHtml ? sanitizeHtml(safeHtml, { allowedTags: [], allowedAttributes: {} }) : rawText)
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, CHAT_MAX_LEN);
      if (!safeText && !safeHtml) {
        ws.send(JSON.stringify({ type: "error", message: "Message is empty." }));
        return;
      }
      const payload = JSON.stringify({ text: safeText, html: safeHtml });
      const enc = dmEncryptUtf8(payload);
      if (!enc) {
        ws.send(JSON.stringify({ type: "error", message: "Failed to store DM message." }));
        return;
      }
      const message = { id: toId(), from: u, createdAt: now(), enc };
      thread.messages = Array.isArray(thread.messages) ? thread.messages : [];
      thread.messages.push(message);
      if (thread.messages.length > 500) thread.messages.splice(0, thread.messages.length - 500);
      thread.lastMessageAt = message.createdAt;
      thread.updatedAt = now();
      dmThreadsById.set(thread.id, thread);
      persistDmsToDisk();

      const wsMsg = { type: "dmMessage", threadId, message: serializeDmMessageForWs(message) };
      sendToSockets(
        (client) => {
          const name = client?.user?.username;
          if (!name) return false;
          const n = normalizeUsername(name);
          return thread.users.includes(n);
        },
        wsMsg
      );
      broadcastDmThread(thread);
      return;
    }
  });

  ws.on("close", () => {
    const hadUser = Boolean(ws.user?.username);
    if (ws.user?.username) {
      for (const [postId, byUser] of typingByPostId.entries()) {
        if (byUser.has(ws.user.username)) setTyping(postId, ws.user.username, false);
      }
    }

    // Plugin cleanup hooks.
    try {
      for (const [id, runtime] of pluginRuntimeById.entries()) {
        if (!pluginsStateById.get(id)?.enabled) continue;
        const handlers = Array.isArray(runtime?.onCloseHandlers) ? runtime.onCloseHandlers : [];
        for (const h of handlers) {
          try {
            h(ws);
          } catch (e) {
            console.warn(`Plugin ${id} onWsClose failed:`, e?.message || e);
          }
        }
      }
    } catch {
      // ignore
    }

    sockets.delete(ws);
    if (hadUser) broadcastPeopleSnapshot();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Bzl listening on http://localhost:${PORT}`);
  for (const url of listLanUrls()) console.log(`LAN: ${url}`);
  console.log(`WebSocket endpoint: ws://<host>:${PORT}/ws`);
});

function shutdown() {
  try {
    persistPostsToDisk();
  } catch {
    // ignore
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
