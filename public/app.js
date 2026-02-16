const connBadge = document.getElementById("connBadge");
const lanHint = document.getElementById("lanHint");

const appRoot = document.querySelector(".app");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const showSidebarBtn = document.getElementById("showSidebar");
const togglePeopleBtn = document.getElementById("togglePeople");
const peopleDrawerEl = document.getElementById("peopleDrawer");
const closePeopleBtn = document.getElementById("closePeople");
const instanceTitleEl = document.getElementById("instanceTitle");
const instanceSubtitleEl = document.getElementById("instanceSubtitle");
const peopleMembersTabBtn = document.getElementById("peopleMembersTab");
const peopleDmsTabBtn = document.getElementById("peopleDmsTab");
const peopleMembersViewEl = document.getElementById("peopleMembersView");
const peopleDmsViewEl = document.getElementById("peopleDmsView");
const peopleSearchEl = document.getElementById("peopleSearch");
const peopleListEl = document.getElementById("peopleList");
const mobilePagerEl = document.getElementById("mobilePager");
const mobileModBtn = document.getElementById("mobileModBtn");
const enableNotifsBtn = document.getElementById("enableNotifs");
const notifStatus = document.getElementById("notifStatus");

const authHint = document.getElementById("authHint");
const userLabel = document.getElementById("userLabel");
const authForm = document.getElementById("authForm");
const authUser = document.getElementById("authUser");
const authPass = document.getElementById("authPass");
const codeRow = document.getElementById("codeRow");
const authCode = document.getElementById("authCode");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

const profileImageInput = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");
const removeProfileImageBtn = document.getElementById("removeProfileImage");
const nameColorInput = document.getElementById("nameColor");
const saveProfileBtn = document.getElementById("saveProfile");
const profileStatus = document.getElementById("profileStatus");
// Instance + plugin admin UI lives in Moderation → Server tab (rendered dynamically).
const modPanelEl = document.getElementById("modPanel");
const modBodyEl = document.getElementById("modBody");
const modRefreshBtn = document.getElementById("modRefresh");
const modReportStatusEl = document.getElementById("modReportStatus");
const modModal = document.getElementById("modModal");
const modModalTitle = document.getElementById("modModalTitle");
const modModalBody = document.getElementById("modModalBody");
const modModalPrimary = document.getElementById("modModalPrimary");
const modModalCancel = document.getElementById("modModalCancel");
const modModalClose = document.getElementById("modModalClose");
const modModalStatus = document.getElementById("modModalStatus");

const newPostForm = document.getElementById("newPostForm");
const pollinatePanel = document.getElementById("pollinatePanel");
const toggleComposerBtn = document.getElementById("toggleComposer");
const toggleComposerInlineBtn = document.getElementById("toggleComposerInline");
const postTitleInput = document.getElementById("postTitle");
const postImageInput = document.getElementById("postImage");
const postAudioInput = document.getElementById("postAudio");
const editor = document.getElementById("editor");
const postCollectionEl = document.getElementById("postCollection");
const keywordsEl = document.getElementById("keywords");
const ttlMinutesEl = document.getElementById("ttlMinutes");
const isProtectedEl = document.getElementById("isProtected");
const isWalkieEl = document.getElementById("isWalkie");
const postPasswordEl = document.getElementById("postPassword");

const filterKeywordsEl = document.getElementById("filterKeywords");
const filterAuthorEl = document.getElementById("filterAuthor");
const sortByEl = document.getElementById("sortBy");
const clearFilterBtn = document.getElementById("clearFilter");
const feedEl = document.getElementById("feed");
const hiveTabsEl = document.getElementById("hiveTabs");
const profileViewPanel = document.getElementById("profileViewPanel");
const profileViewTitle = document.getElementById("profileViewTitle");
const profileViewMeta = document.getElementById("profileViewMeta");
const profileCard = document.getElementById("profileCard");
const profileBackBtn = document.getElementById("profileBackBtn");
const profileEditToggleBtn = document.getElementById("profileEditToggleBtn");
const profileEditPanel = document.getElementById("profileEditPanel");
const profilePronounsInput = document.getElementById("profilePronouns");
const profileThemeSongUrlInput = document.getElementById("profileThemeSongUrl");
const profileThemeSongUploadBtn = document.getElementById("profileThemeSongUploadBtn");
const profileThemeSongClearBtn = document.getElementById("profileThemeSongClearBtn");
const profileThemeSongFileInput = document.getElementById("profileThemeSongFile");
const profileThemeSongPreview = document.getElementById("profileThemeSongPreview");
const profileBioToolbar = document.getElementById("profileBioToolbar");
const profileBioEditor = document.getElementById("profileBioEditor");
const profileBioImageFileInput = document.getElementById("profileBioImageFile");
const profileBioAudioFileInput = document.getElementById("profileBioAudioFile");
const profileAddLinkBtn = document.getElementById("profileAddLinkBtn");
const profileLinksEditor = document.getElementById("profileLinksEditor");
const profileSaveBtn = document.getElementById("profileSaveBtn");
const profileCancelBtn = document.getElementById("profileCancelBtn");

const chatTitle = document.getElementById("chatTitle");
const chatMeta = document.getElementById("chatMeta");
const chatMessagesEl = document.getElementById("chatMessages");
const typingIndicator = document.getElementById("typingIndicator");
const chatForm = document.getElementById("chatForm");
const chatReplyBanner = document.getElementById("chatReplyBanner");
const chatReplyWho = document.getElementById("chatReplyWho");
const chatReplyText = document.getElementById("chatReplyText");
const chatReplyCancelBtn = document.getElementById("chatReplyCancel");
const chatEditor = document.getElementById("chatEditor");
const mentionMenuEl = document.getElementById("mentionMenu");
const chatImageInput = document.getElementById("chatImage");
const chatAudioInput = document.getElementById("chatAudio");
const walkieBarEl = document.getElementById("walkieBar");
const walkieRecordBtn = document.getElementById("walkieRecordBtn");
const walkieStatusEl = document.getElementById("walkieStatus");
const sidebarPanelEl = document.querySelector(".sidebar");
const chatResizeHandle = document.getElementById("chatResizeHandle");
const sidebarResizeHandle = document.getElementById("sidebarResizeHandle");
const mainResizeHandle = document.getElementById("mainResizeHandle");
const chatPanelEl = document.querySelector(".chat");
const peopleResizeHandle = document.getElementById("peopleResizeHandle");
const editModal = document.getElementById("editModal");
const editModalTitle = document.getElementById("editModalTitle");
const editModalCloseBtn = document.getElementById("editModalClose");
const editModalCancelBtn = document.getElementById("editModalCancel");
const editModalSaveBtn = document.getElementById("editModalSave");
const editModalStatus = document.getElementById("editModalStatus");
const editModalPostTitleRow = document.getElementById("editModalPostTitleRow");
const editModalPostTitleInput = document.getElementById("editModalPostTitle");
const editModalPostMeta = document.getElementById("editModalPostMeta");
const editModalKeywordsInput = document.getElementById("editModalKeywords");
const editModalCollectionSelect = document.getElementById("editModalCollection");
const editModalProtectedToggle = document.getElementById("editModalProtected");
const editModalWalkieToggle = document.getElementById("editModalWalkie");
const editModalPasswordRow = document.getElementById("editModalPasswordRow");
const editModalPasswordInput = document.getElementById("editModalPassword");
const editModalToolbar = document.getElementById("editModalToolbar");
const editModalEditor = document.getElementById("editModalEditor");
const editModalImageInput = document.getElementById("editModalImage");
const editModalAudioInput = document.getElementById("editModalAudio");

/** @type {Map<string, any>} */
const posts = new Map();
/** @type {Record<string, {image?: string, color?: string}>} */
let profiles = {};

/** @type {Map<string, any[]>} */
const chatByPost = new Map();
/** @type {Map<string, number>} */
const unreadByPostId = new Map();
/** @type {Map<string, Set<string>>} */
const typingUsersByPostId = new Map();
/** @type {Set<string>} */
const myReacts = new Set();
/** @type {Map<string, number>} */
const reactPulseByKey = new Map();
let allowedReactions = ["👍", "❤️", "😡", "😭", "🥺", "😂"];

let clientId = null;
let loggedInUser = null;
let loggedInRole = "member";
let canModerate = false;
let canRegisterFirstUser = false;
let registrationEnabled = false;
let activeChatPostId = null;
let pendingProfileImage = "";
let windowFocused = true;
let typingStopTimer = null;
let lastTypingSentAt = 0;
let modTab = "reports";
let modReports = [];
let modUsers = [];
let modLog = [];
let devLog = [];
let modLogView = localStorage.getItem("bzl_modLogView") || "dev"; // "dev" | "moderation"
let devLogAutoScroll = localStorage.getItem("bzl_devLogAutoScroll") !== "0";
let modModalContext = null;
let lanUrls = [];
let mobilePanel = "main";
let composerOpen = false;
let touchStartX = 0;
let touchStartY = 0;
let touchTracking = false;
let peopleOpen = false;
let peopleTab = "members";
let peopleMembers = [];
let openPostMenuId = "";
let dmThreads = [];
/** @type {Map<string, any>} */
let dmThreadsById = new Map();
/** @type {Map<string, any[]>} */
const dmMessagesByThreadId = new Map();
let activeDmThreadId = null;
let walkieRecording = false;
let walkieStartAt = 0;
let walkieRecorder = null;
let walkieChunks = [];
let walkieCtx = null;
let walkieMicStream = null;
let walkieMixNode = null;
let walkieDestNode = null;
let walkieDispatchBuffer = null;
const SESSION_TOKEN_KEY = "bzl_session_token";
const CLIENT_IMAGE_UPLOAD_MAX_BYTES = 100 * 1024 * 1024;
const CLIENT_AUDIO_UPLOAD_MAX_BYTES = 150 * 1024 * 1024;
let allowedPostReactions = ["👍", "❤️", "😡", "😭", "🥺", "😂", "⭐"];
let allowedChatReactions = ["👍", "❤️", "😡", "😭", "🥺", "😂"];
let userPrefs = { starredPostIds: [], hiddenPostIds: [], ignoredUsers: [], blockedUsers: [] };
let activeHiveView = "all";
let collections = [];
let customRoles = [];
let plugins = [];
const loadedPluginClientVersionById = new Map(); // pluginId -> version string
let centerView = "hives";
let activeProfileUsername = "";
let activeProfile = null;
let isEditingProfile = false;
let replyToMessage = null;
let chatResizeDragging = false;
let chatResizeStartX = 0;
let chatResizeStartWidth = 0;
const CHAT_WIDTH_KEY = "bzl_chatWidth";
const CHAT_WIDTH_DEFAULT = 640;
let sidebarResizeDragging = false;
let sidebarResizeStartX = 0;
let sidebarResizeStartWidth = 0;
const SIDEBAR_WIDTH_KEY = "bzl_sidebarWidth";
const SIDEBAR_WIDTH_DEFAULT = 320;
let modResizeDragging = false;
let modResizeStartX = 0;
let modResizeStartWidth = 0;
const MOD_WIDTH_KEY = "bzl_modWidth";
const MOD_WIDTH_DEFAULT = 360;
let peopleResizeDragging = false;
let peopleResizeStartX = 0;
let peopleResizeStartWidth = 0;
const PEOPLE_WIDTH_KEY = "bzl_peopleWidth";
const PEOPLE_WIDTH_DEFAULT = 360;
let editContext = null;
let mentionState = { open: false, query: "", selected: 0, items: [], anchorRect: null };

let instanceBranding = { title: "Bzl", subtitle: "Ephemeral hives + chat", allowMemberPermanentPosts: false, appearance: {} };
let serverInfo = null;
let serverHealth = null;
let serverInfoStatus = { loading: false, at: 0, error: "" };
let pluginAdminStatus = "";
let pluginAdminBusy = false;
const pluginEnableInFlight = new Set();

const THEME_PRESETS = [
  {
    id: "bzl_original",
    name: "Bzl (Original)",
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
  },
  {
    id: "midnight_cyan",
    name: "Midnight Cyan",
    appearance: {
      bg: "#060a12",
      panel: "#0a1220",
      text: "#eaf4ff",
      accent: "#2bf5d6",
      accent2: "#4aa0ff",
      good: "#2bf5d6",
      bad: "#ff4d8a",
      fontBody: "system",
      fontMono: "mono",
      mutedPct: 64,
      linePct: 10,
      panel2Pct: 2
    }
  },
  {
    id: "warm_amber",
    name: "Warm Amber",
    appearance: {
      bg: "#0b0706",
      panel: "#17100e",
      text: "#fff2ea",
      accent: "#ffb020",
      accent2: "#ff3ea5",
      good: "#3ddc97",
      bad: "#ff4d8a",
      fontBody: "serif",
      fontMono: "mono",
      mutedPct: 66,
      linePct: 11,
      panel2Pct: 3
    }
  },
  {
    id: "slate_violet",
    name: "Slate Violet",
    appearance: {
      bg: "#080a10",
      panel: "#101522",
      text: "#eef0ff",
      accent: "#9b8cff",
      accent2: "#ff3ea5",
      good: "#3ddc97",
      bad: "#ff4d8a",
      fontBody: "system",
      fontMono: "mono",
      mutedPct: 62,
      linePct: 9,
      panel2Pct: 2
    }
  },
  {
    id: "terminal_green",
    name: "Terminal Green",
    appearance: {
      bg: "#040805",
      panel: "#070f08",
      text: "#d7ffe6",
      accent: "#2bff88",
      accent2: "#20d3ff",
      good: "#2bff88",
      bad: "#ff4d8a",
      fontBody: "mono",
      fontMono: "mono",
      mutedPct: 58,
      linePct: 12,
      panel2Pct: 2
    }
  },
  {
    id: "high_contrast",
    name: "High Contrast",
    appearance: {
      bg: "#000000",
      panel: "#0a0a0a",
      text: "#ffffff",
      accent: "#ffd300",
      accent2: "#00d3ff",
      good: "#00ff85",
      bad: "#ff2d55",
      fontBody: "system",
      fontMono: "mono",
      mutedPct: 70,
      linePct: 16,
      panel2Pct: 3
    }
  },
  {
    id: "lavender_mist",
    name: "Lavender Mist",
    appearance: {
      bg: "#070611",
      panel: "#120c1b",
      text: "#f7f3ff",
      accent: "#c9a3ff",
      accent2: "#ff79c6",
      good: "#3ddc97",
      bad: "#ff4d8a",
      fontBody: "system",
      fontMono: "mono",
      mutedPct: 68,
      linePct: 10,
      panel2Pct: 3
    }
  }
];

const SFX = {
  open: "/assets/sfx/Select_B7.wav",
  post: "/assets/sfx/Select_B7.wav",
  ping: "/assets/sfx/Select_C3.wav",
};
const sfxCache = new Map();
let pendingOpenSfx = true;
let lastSfxAt = 0;

function getSfx(url) {
  const key = String(url || "");
  if (!key) return null;
  if (sfxCache.has(key)) return sfxCache.get(key);
  const a = new Audio(key);
  a.preload = "auto";
  sfxCache.set(key, a);
  return a;
}

async function playSfx(name, { volume = 0.32 } = {}) {
  const url = SFX[name];
  if (!url) return false;
  const now = Date.now();
  if (now - lastSfxAt < 120) return false;
  lastSfxAt = now;

  const a = getSfx(url);
  if (!a) return false;
  try {
    a.pause();
    a.currentTime = 0;
    a.volume = Math.max(0, Math.min(1, Number(volume) || 0.32));
    await a.play();
    return true;
  } catch {
    return false;
  }
}

function normalizeInstanceBranding(raw) {
  const title = String(raw?.title || "").replace(/\s+/g, " ").trim().slice(0, 32);
  const subtitle = String(raw?.subtitle || "").replace(/\s+/g, " ").trim().slice(0, 80);
  const allowMemberPermanentPosts = Boolean(raw?.allowMemberPermanentPosts);
  const appearanceRaw = raw?.appearance && typeof raw.appearance === "object" ? raw.appearance : {};
  const bg = /^#[0-9a-f]{6}$/i.test(String(appearanceRaw.bg || "")) ? String(appearanceRaw.bg).toLowerCase() : "#060611";
  const panel = /^#[0-9a-f]{6}$/i.test(String(appearanceRaw.panel || "")) ? String(appearanceRaw.panel).toLowerCase() : "#0c0c18";
  const text = /^#[0-9a-f]{6}$/i.test(String(appearanceRaw.text || "")) ? String(appearanceRaw.text).toLowerCase() : "#f6f0ff";
  const accent = /^#[0-9a-f]{6}$/i.test(String(appearanceRaw.accent || "")) ? String(appearanceRaw.accent).toLowerCase() : "#ff3ea5";
  const accent2 = /^#[0-9a-f]{6}$/i.test(String(appearanceRaw.accent2 || "")) ? String(appearanceRaw.accent2).toLowerCase() : "#b84bff";
  const good = /^#[0-9a-f]{6}$/i.test(String(appearanceRaw.good || "")) ? String(appearanceRaw.good).toLowerCase() : "#3ddc97";
  const bad = /^#[0-9a-f]{6}$/i.test(String(appearanceRaw.bad || "")) ? String(appearanceRaw.bad).toLowerCase() : "#ff4d8a";
  const fontBody = ["system", "serif", "mono"].includes(String(appearanceRaw.fontBody || "")) ? String(appearanceRaw.fontBody) : "system";
  const fontMono = ["mono", "system"].includes(String(appearanceRaw.fontMono || "")) ? String(appearanceRaw.fontMono) : "mono";
  const clampPct = (n, fallback) => {
    const v = Math.floor(Number(n));
    if (!Number.isFinite(v)) return fallback;
    return Math.max(0, Math.min(100, v));
  };
  const mutedPct = clampPct(appearanceRaw.mutedPct, 65);
  const linePct = clampPct(appearanceRaw.linePct, 10);
  const panel2Pct = clampPct(appearanceRaw.panel2Pct, 2);
  return {
    title: title || "Bzl",
    subtitle: subtitle || "Ephemeral hives + chat",
    allowMemberPermanentPosts,
    appearance: { bg, panel, text, accent, accent2, good, bad, fontBody, fontMono, mutedPct, linePct, panel2Pct },
  };
}

function applyInstanceAppearance(appearanceOverride = null) {
  const b = normalizeInstanceBranding(appearanceOverride ? { ...instanceBranding, appearance: appearanceOverride } : instanceBranding);
  const a = b.appearance || {};
  const fontStacks = {
    system:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  };
  const fontBodyStack = fontStacks[a.fontBody] || fontStacks.system;
  const fontMonoStack = fontStacks[a.fontMono] || fontStacks.mono;
  document.documentElement.style.setProperty("--bg", a.bg || "#060611");
  document.documentElement.style.setProperty("--panel", a.panel || "#0c0c18");
  document.documentElement.style.setProperty("--text", a.text || "#f6f0ff");
  document.documentElement.style.setProperty("--accent", a.accent || "#ff3ea5");
  document.documentElement.style.setProperty("--accent2", a.accent2 || "#b84bff");
  document.documentElement.style.setProperty("--good", a.good || "#3ddc97");
  document.documentElement.style.setProperty("--bad", a.bad || "#ff4d8a");
  document.documentElement.style.setProperty("--font-body", fontBodyStack);
  document.documentElement.style.setProperty("--font-mono", fontMonoStack);
  document.documentElement.style.setProperty("--muted-pct", String(Number(a.mutedPct ?? 65)));
  document.documentElement.style.setProperty("--line-pct", String(Number(a.linePct ?? 10)));
  document.documentElement.style.setProperty("--panel2-pct", String(Number(a.panel2Pct ?? 2)));
}

function renderInstanceBranding() {
  const b = normalizeInstanceBranding(instanceBranding);
  if (instanceTitleEl) instanceTitleEl.textContent = b.title;
  if (instanceSubtitleEl) instanceSubtitleEl.textContent = b.subtitle;
}

function formatLocalTime(ts) {
  const n = Number(ts || 0);
  if (!n) return "";
  try {
    return new Date(n).toLocaleString();
  } catch {
    return "";
  }
}

async function requestServerInfo() {
  if (serverInfoStatus.loading) return;
  serverInfoStatus = { loading: true, at: Date.now(), error: "" };
  renderModPanel();
  try {
    const [infoRes, healthRes] = await Promise.all([
      fetch("/api/info", { cache: "no-store" }),
      fetch("/api/health", { cache: "no-store" })
    ]);
    if (!infoRes.ok) throw new Error(`Failed to load /api/info (${infoRes.status})`);
    if (!healthRes.ok) throw new Error(`Failed to load /api/health (${healthRes.status})`);
    serverInfo = await infoRes.json();
    serverHealth = await healthRes.json();
    serverInfoStatus = { loading: false, at: Date.now(), error: "" };
    renderModPanel();
  } catch (e) {
    serverInfoStatus = { loading: false, at: Date.now(), error: e?.message || "Failed to load server info." };
    renderModPanel();
  }
}

function normalizeDmThread(raw) {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id || "").trim();
  const other = String(raw.other || "").trim().toLowerCase();
  const status = String(raw.status || "").trim();
  if (!id || !other) return null;
  return {
    id,
    other,
    status: status || "unknown",
    requestedBy: String(raw.requestedBy || ""),
    pendingFor: String(raw.pendingFor || ""),
    createdAt: Number(raw.createdAt || 0),
    updatedAt: Number(raw.updatedAt || 0),
    lastMessageAt: Number(raw.lastMessageAt || 0),
  };
}

function normalizeDmMessage(raw) {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id || "").trim();
  if (!id) return null;
  return {
    id,
    fromUser: String(raw.fromUser || raw.from || "").trim().toLowerCase(),
    createdAt: Number(raw.createdAt || 0),
    text: typeof raw.text === "string" ? raw.text : "",
    html: typeof raw.html === "string" ? raw.html : "",
  };
}

function dmActivityAt(thread) {
  if (!thread) return 0;
  return Math.max(Number(thread.lastMessageAt || 0), Number(thread.updatedAt || 0), Number(thread.createdAt || 0));
}

function setDmThreads(list) {
  dmThreads = Array.isArray(list) ? list.map(normalizeDmThread).filter(Boolean) : [];
  dmThreadsById = new Map(dmThreads.map((t) => [t.id, t]));
  if (activeDmThreadId && !dmThreadsById.has(activeDmThreadId)) {
    activeDmThreadId = null;
  }
  renderPeoplePanel();
  renderChatPanel();
}

function upsertDmThread(rawThread) {
  const t = normalizeDmThread(rawThread);
  if (!t) return;
  dmThreadsById.set(t.id, t);
  dmThreads = dmThreads.filter((x) => x.id !== t.id);
  dmThreads.push(t);
  dmThreads.sort((a, b) => dmActivityAt(b) - dmActivityAt(a));
  renderPeoplePanel();
  renderChatPanel();
}

function setModModalOpen(open) {
  if (!modModal) return;
  modModal.classList.toggle("hidden", !open);
  if (!open) {
    modModalContext = null;
    if (modModalBody) modModalBody.innerHTML = "";
    if (modModalStatus) modModalStatus.textContent = "";
    if (modModalPrimary) modModalPrimary.classList.remove("hidden");
  }
}

function gateTokenLabel(token) {
  const t = String(token || "").trim().toLowerCase();
  if (!t) return { label: "", color: "" };
  if (t === "owner" || t === "moderator" || t === "member") return { label: t, color: "" };
  if (t.startsWith("role:")) {
    const key = t.slice("role:".length);
    const def = roleDefByKey(key);
    if (def) return { label: def.label || `role:${key}`, color: def.color || "" };
    return { label: `role:${key}`, color: "" };
  }
  return { label: t, color: "" };
}

function openCollectionGateModal(collectionId) {
  if (!canModerate) return;
  const id = String(collectionId || "");
  const col = collections.find((c) => c.id === id);
  if (!col) {
    toast("Collections", "Collection not found.");
    return;
  }
  modModalContext = { kind: "collectionGate", collectionId: id };
  if (modModalTitle) modModalTitle.textContent = `Gate /${col.name || col.id}`;
  if (modModalStatus) modModalStatus.textContent = "";
  if (modModalPrimary) modModalPrimary.textContent = "Save";

  const visibility = col.visibility === "gated" ? "gated" : "public";
  const allowed = new Set(Array.isArray(col.allowedRoles) ? col.allowedRoles : []);
  const tokens = availableGateTokens();

  const optionsHtml = tokens
    .map((token) => {
      const meta = gateTokenLabel(token);
      const swatch = meta.color ? `<span class="roleSwatch" style="background:${escapeHtml(meta.color)}"></span>` : "";
      const checked = allowed.has(token) ? "checked" : "";
      return `<label class="gateOption">
        <span class="gateOptionLeft">${swatch}<span>${escapeHtml(meta.label)}</span></span>
        <input type="checkbox" data-gatetoken="${escapeHtml(token)}" ${checked} />
      </label>`;
    })
    .join("");

  if (modModalBody) {
    modModalBody.innerHTML = `
      <div class="row" style="gap:12px;align-items:center">
        <label class="gateOption" style="flex:1">
          <span>Public</span>
          <input type="radio" name="gateVisibility" value="public" ${visibility === "public" ? "checked" : ""} />
        </label>
        <label class="gateOption" style="flex:1">
          <span>Gated</span>
          <input type="radio" name="gateVisibility" value="gated" ${visibility === "gated" ? "checked" : ""} />
        </label>
      </div>
      <div class="small muted">If gated, pick one or more roles that can view this collection.</div>
      <div class="gateList" id="gateListWrap">${optionsHtml || `<div class="muted">No roles available.</div>`}</div>
    `;
  }
  setModModalOpen(true);
  updateGateModalVisibility();
}

function openUserRolesModal(username) {
  if (!canModerate) return;
  const target = String(username || "").toLowerCase();
  if (!target) return;
  const member = (peopleMembers || []).find((m) => m && m.username === target);
  const assigned = new Set(Array.isArray(member?.customRoles) ? member.customRoles : []);
  modModalContext = { kind: "userRoles", username: target };
  if (modModalTitle) modModalTitle.textContent = `Custom roles for @${target}`;
  if (modModalPrimary) modModalPrimary.classList.add("hidden");
  if (modModalStatus) modModalStatus.textContent = "Toggles apply immediately.";

  const rows = customRoles.length
    ? customRoles
        .map((r) => {
          const checked = assigned.has(r.key) ? "checked" : "";
          const swatch = r.color ? `<span class="roleSwatch" style="background:${escapeHtml(r.color)}"></span>` : "";
          return `<label class="gateOption">
            <span class="gateOptionLeft">${swatch}<span>${escapeHtml(r.label)}</span> <span class="roleKey">${escapeHtml(
              r.key
            )}</span></span>
            <input type="checkbox" data-userrolekey="${escapeHtml(r.key)}" ${checked} />
          </label>`;
        })
        .join("")
    : `<div class="muted">No custom roles created yet.</div>`;

  if (modModalBody) modModalBody.innerHTML = `<div class="gateList">${rows}</div>`;
  setModModalOpen(true);
}

function openCollectionCreateModal() {
  if (!canModerate) return;
  modModalContext = { kind: "collectionCreate" };
  if (modModalTitle) modModalTitle.textContent = "Create collection";
  if (modModalPrimary) modModalPrimary.textContent = "Create";
  if (modModalStatus) modModalStatus.textContent = "";
  if (modModalBody) {
    modModalBody.innerHTML = `
      <label>
        <span>Name</span>
        <input id="modModalCollectionName" maxlength="40" placeholder="Example: music" />
      </label>
      <div class="small muted">Collections appear as tabs and can be gated.</div>
    `;
  }
  setModModalOpen(true);
  setTimeout(() => document.getElementById("modModalCollectionName")?.focus(), 0);
}

function updateGateModalVisibility() {
  const listWrap = document.getElementById("gateListWrap");
  if (!listWrap) return;
  const v = String(modModalBody?.querySelector("input[name='gateVisibility']:checked")?.value || "public");
  listWrap.classList.toggle("hidden", v !== "gated");
}

function getSessionToken() {
  try {
    return localStorage.getItem(SESSION_TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

function setSessionToken(token) {
  try {
    if (!token) localStorage.removeItem(SESSION_TOKEN_KEY);
    else localStorage.setItem(SESSION_TOKEN_KEY, token);
  } catch {
    // ignore
  }
}

function fallbackPeopleFromProfiles() {
  const out = [];
  for (const [username, p] of Object.entries(profiles || {})) {
    if (!username) continue;
    out.push({
      username,
      image: typeof p?.image === "string" ? p.image : "",
      color: typeof p?.color === "string" ? p.color : "",
      role: "member",
      online: false,
      status: "offline"
    });
  }
  if (loggedInUser && !out.some((m) => m.username === loggedInUser)) {
    const me = getProfile(loggedInUser);
    out.push({
      username: loggedInUser,
      image: me.image || "",
      color: me.color || "",
      role: loggedInRole || "member",
      online: true,
      status: "online"
    });
  }
  out.sort((a, b) => a.username.localeCompare(b.username));
  return out;
}

function ensurePeopleFallback() {
  if (Array.isArray(peopleMembers) && peopleMembers.length > 0) return;
  peopleMembers = fallbackPeopleFromProfiles();
}

const toastHost = (() => {
  const el = document.createElement("div");
  el.className = "toastHost";
  document.body.appendChild(el);
  return el;
})();

/** @type {Set<string>} */
const newPostAnimIds = new Set();
/** @type {Map<string, number>} */
const buzzTimers = new Map();

function syncProtectedUi() {
  if (!isProtectedEl || !postPasswordEl) return;
  const on = Boolean(isProtectedEl.checked);
  postPasswordEl.disabled = !on;
  if (!on) postPasswordEl.value = "";
}

syncProtectedUi();
isProtectedEl?.addEventListener("change", () => {
  syncProtectedUi();
  if (isProtectedEl?.checked) postPasswordEl?.focus();
});

function setSidebarHidden(hidden) {
  if (!appRoot) return;
  appRoot.classList.toggle("sidebarHidden", hidden);
  if (toggleSidebarBtn) {
    toggleSidebarBtn.textContent = "Hide";
    toggleSidebarBtn.title = "Hide sidebar";
  }
  if (showSidebarBtn) {
    showSidebarBtn.classList.toggle("hidden", !hidden);
    showSidebarBtn.textContent = "Show";
    showSidebarBtn.title = "Show sidebar";
  }
  try {
    localStorage.setItem("bzl_sidebarHidden", hidden ? "1" : "0");
  } catch {
    // ignore
  }
}

function getSidebarHidden() {
  try {
    return localStorage.getItem("bzl_sidebarHidden") === "1";
  } catch {
    return false;
  }
}

function setPeopleOpen(open) {
  peopleOpen = Boolean(open);
  if (!peopleDrawerEl || !togglePeopleBtn) return;
  peopleDrawerEl.classList.toggle("hidden", !peopleOpen);
  togglePeopleBtn.textContent = peopleOpen ? "Hide people" : "People";
  togglePeopleBtn.title = peopleOpen ? "Hide people" : "Show people";
  if (peopleOpen && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "peopleList" }));
  }
  try {
    localStorage.setItem("bzl_peopleOpen", peopleOpen ? "1" : "0");
  } catch {
    // ignore
  }
}

function getPeopleOpen() {
  try {
    return localStorage.getItem("bzl_peopleOpen") === "1";
  } catch {
    return false;
  }
}

function setComposerOpen(open) {
  composerOpen = Boolean(open);
  if (pollinatePanel) pollinatePanel.classList.toggle("composerCollapsed", !composerOpen);
  if (toggleComposerBtn) {
    toggleComposerBtn.textContent = composerOpen ? "Hide Creator" : "New Hive";
    toggleComposerBtn.title = composerOpen ? "Hide hive creator" : "Open hive creator";
  }
  renderCenterPanels();
  try {
    localStorage.setItem("bzl_composerOpen", composerOpen ? "1" : "0");
  } catch {
    // ignore
  }
}

function getComposerOpen() {
  try {
    return localStorage.getItem("bzl_composerOpen") === "1";
  } catch {
    return false;
  }
}

function readStoredChatWidth() {
  try {
    const raw = Number(localStorage.getItem(CHAT_WIDTH_KEY) || 0);
    return Number.isFinite(raw) && raw > 0 ? raw : CHAT_WIDTH_DEFAULT;
  } catch {
    return CHAT_WIDTH_DEFAULT;
  }
}

function readStoredSidebarWidth() {
  try {
    const raw = Number(localStorage.getItem(SIDEBAR_WIDTH_KEY) || 0);
    return Number.isFinite(raw) && raw > 0 ? raw : SIDEBAR_WIDTH_DEFAULT;
  } catch {
    return SIDEBAR_WIDTH_DEFAULT;
  }
}

function readStoredModWidth() {
  try {
    const raw = Number(localStorage.getItem(MOD_WIDTH_KEY) || 0);
    return Number.isFinite(raw) && raw > 0 ? raw : MOD_WIDTH_DEFAULT;
  } catch {
    return MOD_WIDTH_DEFAULT;
  }
}

function readStoredPeopleWidth() {
  try {
    const raw = Number(localStorage.getItem(PEOPLE_WIDTH_KEY) || 0);
    return Number.isFinite(raw) && raw > 0 ? raw : PEOPLE_WIDTH_DEFAULT;
  } catch {
    return PEOPLE_WIDTH_DEFAULT;
  }
}

function clampChatWidth(px) {
  const maxByViewport = Math.floor(window.innerWidth * 0.72);
  return Math.max(380, Math.min(maxByViewport, Math.floor(Number(px || CHAT_WIDTH_DEFAULT))));
}

function clampSidebarWidth(px) {
  const maxByViewport = Math.floor(window.innerWidth * 0.42);
  return Math.max(240, Math.min(maxByViewport, Math.floor(Number(px || SIDEBAR_WIDTH_DEFAULT))));
}

function clampModWidth(px) {
  const maxByViewport = Math.floor(window.innerWidth * 0.44);
  return Math.max(280, Math.min(maxByViewport, Math.floor(Number(px || MOD_WIDTH_DEFAULT))));
}

function clampPeopleWidth(px) {
  const maxByViewport = Math.floor(window.innerWidth * 0.62);
  return Math.max(320, Math.min(maxByViewport, Math.floor(Number(px || PEOPLE_WIDTH_DEFAULT))));
}

function applyChatWidth(px, persist = true) {
  if (!appRoot) return;
  const next = clampChatWidth(px);
  appRoot.style.setProperty("--chat-width", `${next}px`);
  if (persist) {
    try {
      localStorage.setItem(CHAT_WIDTH_KEY, String(next));
    } catch {
      // ignore
    }
  }
}

function applySidebarWidth(px, persist = true) {
  if (!appRoot) return;
  const next = clampSidebarWidth(px);
  appRoot.style.setProperty("--sidebar-width", `${next}px`);
  if (persist) {
    try {
      localStorage.setItem(SIDEBAR_WIDTH_KEY, String(next));
    } catch {
      // ignore
    }
  }
}

function applyModWidth(px, persist = true) {
  if (!appRoot) return;
  const next = clampModWidth(px);
  appRoot.style.setProperty("--mod-width", `${next}px`);
  if (persist) {
    try {
      localStorage.setItem(MOD_WIDTH_KEY, String(next));
    } catch {
      // ignore
    }
  }
}

function applyPeopleWidth(px, persist = true) {
  const next = clampPeopleWidth(px);
  document.documentElement.style.setProperty("--people-width", `${next}px`);
  if (persist) {
    try {
      localStorage.setItem(PEOPLE_WIDTH_KEY, String(next));
    } catch {
      // ignore
    }
  }
}

function canResizeChatNow() {
  return !isMobileSwipeMode();
}

function canResizeSidebarNow() {
  return !isMobileSwipeMode();
}

function canResizeModNow() {
  return !isMobileSwipeMode() && canModerate;
}

function canResizePeopleNow() {
  return !isMobileSwipeMode();
}

function stopAnyPanelResize() {
  if (!chatResizeDragging && !sidebarResizeDragging && !modResizeDragging && !peopleResizeDragging) return;
  chatResizeDragging = false;
  sidebarResizeDragging = false;
  modResizeDragging = false;
  peopleResizeDragging = false;
  appRoot?.classList.remove("isResizing");
}

function startChatResize(clientX) {
  if (!canResizeChatNow() || !chatPanelEl) return false;
  chatResizeDragging = true;
  chatResizeStartX = clientX;
  chatResizeStartWidth = chatPanelEl.getBoundingClientRect().width || readStoredChatWidth();
  appRoot?.classList.add("isResizing");
  return true;
}

function startSidebarResize(clientX) {
  if (!canResizeSidebarNow() || !sidebarPanelEl || appRoot?.classList.contains("sidebarHidden")) return false;
  sidebarResizeDragging = true;
  sidebarResizeStartX = clientX;
  sidebarResizeStartWidth = sidebarPanelEl.getBoundingClientRect().width || readStoredSidebarWidth();
  appRoot?.classList.add("isResizing");
  return true;
}

function startModResize(clientX) {
  if (!canResizeModNow() || !modPanelEl || modPanelEl.classList.contains("hidden")) return false;
  modResizeDragging = true;
  modResizeStartX = clientX;
  modResizeStartWidth = modPanelEl.getBoundingClientRect().width || readStoredModWidth();
  appRoot?.classList.add("isResizing");
  return true;
}

function startPeopleResize(clientX) {
  if (!canResizePeopleNow() || !peopleDrawerEl || peopleDrawerEl.classList.contains("hidden")) return false;
  peopleResizeDragging = true;
  peopleResizeStartX = clientX;
  peopleResizeStartWidth = peopleDrawerEl.getBoundingClientRect().width || readStoredPeopleWidth();
  appRoot?.classList.add("isResizing");
  return true;
}

function setEditModalOpen(open) {
  if (!editModal) return;
  editModal.classList.toggle("hidden", !open);
  if (editModalStatus) editModalStatus.textContent = "";
  if (!open) {
    editContext = null;
    if (editModalEditor) editModalEditor.innerHTML = "";
    if (editModalPostTitleInput) editModalPostTitleInput.value = "";
    if (editModalPostMeta) editModalPostMeta.classList.add("hidden");
    if (editModalKeywordsInput) editModalKeywordsInput.value = "";
    if (editModalCollectionSelect) editModalCollectionSelect.innerHTML = "";
    if (editModalProtectedToggle) editModalProtectedToggle.checked = false;
    if (editModalWalkieToggle) editModalWalkieToggle.checked = false;
    if (editModalPasswordInput) editModalPasswordInput.value = "";
    if (editModalPasswordRow) editModalPasswordRow.classList.add("hidden");
  }
}

function parseKeywordsInput(value) {
  const raw = String(value || "")
    .split(",")
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);
  const out = [];
  for (const k of raw) {
    const cleaned = k.replace(/[^a-z0-9_-]/g, "").slice(0, 20);
    if (!cleaned) continue;
    if (!out.includes(cleaned)) out.push(cleaned);
    if (out.length >= 6) break;
  }
  return out;
}

function fillCollectionSelect(selectEl, currentId) {
  if (!selectEl) return;
  const active = activeCollections();
  const current = String(currentId || "") || "general";
  const list = active.length ? active : [{ id: "general", name: "General" }];
  const hasCurrent = list.some((c) => c.id === current);
  selectEl.innerHTML =
    (hasCurrent ? "" : `<option value="${escapeHtml(current)}">${escapeHtml(current)}</option>`) +
    list.map((c) => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name || c.id)}</option>`).join("");
  selectEl.value = current;
}

function openEditModalForPost(post) {
  if (!post || post.deleted || post.locked) return;
  if (!loggedInUser || post.author !== loggedInUser) return;
  editContext = { kind: "post", postId: post.id };
  if (editModalTitle) editModalTitle.textContent = "Edit post";
  if (editModalPostTitleRow) editModalPostTitleRow.classList.remove("hidden");
  if (editModalPostMeta) editModalPostMeta.classList.remove("hidden");
  if (editModalPostTitleInput) editModalPostTitleInput.value = String(post.title || "").slice(0, 96);
  if (editModalKeywordsInput) editModalKeywordsInput.value = (post.keywords || []).join(", ");
  fillCollectionSelect(editModalCollectionSelect, String(post.collectionId || "general"));
  if (editModalProtectedToggle) editModalProtectedToggle.checked = Boolean(post.protected);
  if (editModalWalkieToggle) editModalWalkieToggle.checked = String(post.mode || post.chatMode || "").toLowerCase() === "walkie";
  if (editModalPasswordRow) editModalPasswordRow.classList.toggle("hidden", !Boolean(post.protected));
  if (editModalPasswordInput) editModalPasswordInput.value = "";
  if (editModalEditor) editModalEditor.innerHTML = String(post.contentHtml || "").trim() || escapeHtml(post.content || "");
  setEditModalOpen(true);
  setTimeout(() => editModalEditor?.focus(), 0);
}

function openEditModalForChatMessage(message, postId) {
  if (!message || message.deleted) return;
  if (!loggedInUser || message.fromUser !== loggedInUser) return;
  editContext = { kind: "chat", messageId: message.id, postId };
  if (editModalTitle) editModalTitle.textContent = "Edit message";
  if (editModalPostTitleRow) editModalPostTitleRow.classList.add("hidden");
  if (editModalPostTitleInput) editModalPostTitleInput.value = "";
  if (editModalPostMeta) editModalPostMeta.classList.add("hidden");
  if (editModalKeywordsInput) editModalKeywordsInput.value = "";
  if (editModalCollectionSelect) editModalCollectionSelect.innerHTML = "";
  if (editModalProtectedToggle) editModalProtectedToggle.checked = false;
  if (editModalWalkieToggle) editModalWalkieToggle.checked = false;
  if (editModalPasswordInput) editModalPasswordInput.value = "";
  if (editModalPasswordRow) editModalPasswordRow.classList.add("hidden");
  if (editModalEditor) editModalEditor.innerHTML = String(message.html || "").trim() || escapeHtml(message.text || "");
  setEditModalOpen(true);
  setTimeout(() => editModalEditor?.focus(), 0);
}

editModalProtectedToggle?.addEventListener("change", () => {
  const on = Boolean(editModalProtectedToggle?.checked);
  if (editModalPasswordRow) editModalPasswordRow.classList.toggle("hidden", !on);
  if (!on && editModalPasswordInput) editModalPasswordInput.value = "";
});

function collectEditorPayload(targetEditor) {
  const html = String(targetEditor?.innerHTML || "").trim();
  const text = String(targetEditor?.innerText || "")
    .replace(/\s+/g, " ")
    .trim();
  const hasImg = Boolean(targetEditor?.querySelector?.("img"));
  const hasAudio = Boolean(targetEditor?.querySelector?.("audio"));
  return { html, text, hasImg, hasAudio };
}

function syncProfileSongPreview(url) {
  if (!profileThemeSongPreview || !profileThemeSongUrlInput) return;
  const safe = asProfileLink(url) || (String(url || "").startsWith("/uploads/") ? String(url || "") : "");
  if (!safe) {
    profileThemeSongPreview.classList.add("hidden");
    profileThemeSongPreview.removeAttribute("src");
    profileThemeSongUrlInput.value = "";
    return;
  }
  profileThemeSongPreview.classList.remove("hidden");
  profileThemeSongPreview.src = safe;
  profileThemeSongPreview.load();
  profileThemeSongUrlInput.value = safe;
}

function renderProfileLinksEditor(links) {
  if (!profileLinksEditor) return;
  const list = normalizeProfileLinks(links);
  if (!list.length) {
    profileLinksEditor.innerHTML = `<div class="small muted">No links yet.</div>`;
    return;
  }
  profileLinksEditor.innerHTML = list
    .map(
      (entry, index) => `<div class="profileLinkEditRow">
      <input data-linklabel="${index}" value="${escapeHtml(entry.label)}" maxlength="40" placeholder="Label" />
      <input data-linkurl="${index}" value="${escapeHtml(entry.url)}" maxlength="280" placeholder="https://..." />
      <button type="button" class="ghost smallBtn" data-linkremove="${index}">Remove</button>
    </div>`
    )
    .join("");
}

function profileLinksFromEditor() {
  if (!profileLinksEditor) return [];
  const rows = Array.from(profileLinksEditor.querySelectorAll(".profileLinkEditRow"));
  if (!rows.length) return [];
  const out = [];
  for (const row of rows) {
    const label = String(row.querySelector("[data-linklabel]")?.value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 40);
    const url = asProfileLink(row.querySelector("[data-linkurl]")?.value || "");
    if (!url) continue;
    out.push({ label: label || "Link", url });
    if (out.length >= 8) break;
  }
  return out;
}

function renderProfileCard() {
  if (!profileCard) return;
  if (!activeProfile || !activeProfile.username) {
    profileCard.innerHTML = `<div class="small muted">Profile unavailable.</div>`;
    return;
  }
  const p = normalizeProfileData(activeProfile);
  const headerStyle = p.color ? ` style="--profile-accent:${escapeHtml(p.color)}"` : "";
  const pronouns = p.pronouns ? `<div class="small muted pronouns">${escapeHtml(p.pronouns)}</div>` : "";
  const usernameLower = String(p.username || "").toLowerCase();
  const selfLower = String(loggedInUser || "").toLowerCase();
  const canDm = Boolean(loggedInUser && usernameLower && usernameLower !== selfLower);
  const ignored = prefSet("ignoredUsers").has(usernameLower);
  const blocked = prefSet("blockedUsers").has(usernameLower);
  const dmBtn = canDm
    ? `<button type="button" class="primary smallBtn" data-dmrequest="${escapeHtml(p.username)}" ${blocked ? "disabled" : ""}>DM</button>`
    : "";
  const member = peopleMembers.find((m) => String(m.username || "").toLowerCase() === usernameLower) || null;
  const role = roleLabel(member?.role);
  const isStaff = role === "owner" || role === "moderator";
  const canMuteUser = Boolean(loggedInUser && usernameLower && usernameLower !== selfLower && !isStaff);
  const ignoreBtn = canMuteUser
    ? ignored
      ? `<button type="button" class="ghost smallBtn" data-unignoreuser="${escapeHtml(p.username)}">Unignore</button>`
      : `<button type="button" class="ghost smallBtn" data-ignoreuser="${escapeHtml(p.username)}">Ignore</button>`
    : "";
  const blockBtn = canMuteUser
    ? blocked
      ? `<button type="button" class="ghost smallBtn" data-unblockuser="${escapeHtml(p.username)}">Unblock</button>`
      : `<button type="button" class="ghost smallBtn" data-blockuser="${escapeHtml(p.username)}">Block</button>`
    : "";
  const blockNote = canDm && blocked ? `<div class="small muted">Blocked: DMs + content hidden.</div>` : "";
  const bio = p.bioHtml ? `<div class="profileBio">${p.bioHtml}</div>` : `<div class="small muted">No bio yet.</div>`;
  const theme = p.themeSongUrl ? `<audio controls preload="none" src="${escapeHtml(p.themeSongUrl)}"></audio>` : `<div class="small muted">No theme song set.</div>`;
  const links = p.links.length
    ? p.links
        .map(
          (entry) =>
            `<a class="tag profileLinkTag" href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(entry.label)}</a>`
        )
        .join("")
    : `<div class="small muted">No links yet.</div>`;
  profileCard.innerHTML = `<div class="profileHeader"${headerStyle}>
    <span class="pfp profileHeroPfp">${p.image ? `<img alt="" src="${escapeHtml(p.image)}" />` : ""}</span>
    <div class="profileIdentity">
      <div class="profileHandle" ${p.color ? `style="color:${escapeHtml(safeTextColorFromHex(p.color))}"` : ""}>@${escapeHtml(p.username)}</div>
      ${pronouns}
    </div>
    ${dmBtn || ignoreBtn || blockBtn ? `<div class="profileActions">${dmBtn}${ignoreBtn}${blockBtn}</div>` : ""}
  </div>
  ${blockNote}
  <div class="profileSection">
    <div class="small muted">Bio</div>
    ${bio}
  </div>
  <div class="profileSection">
    <div class="small muted">Theme song</div>
    ${theme}
  </div>
  <div class="profileSection">
    <div class="small muted">Links</div>
    <div class="profileLinksWrap">${links}</div>
  </div>`;
  const bioEl = profileCard.querySelector(".profileBio");
  if (bioEl) decorateYouTubeEmbedsInElement(bioEl);
}

function renderProfileEditor() {
  const canEdit = Boolean(loggedInUser && activeProfile && activeProfile.username === loggedInUser);
  if (profileEditToggleBtn) profileEditToggleBtn.classList.toggle("hidden", !canEdit);
  if (!profileEditPanel || !profilePronounsInput || !profileBioEditor) return;
  profileEditPanel.classList.toggle("hidden", !(canEdit && isEditingProfile));
  if (!canEdit || !activeProfile) return;
  profilePronounsInput.value = String(activeProfile.pronouns || "");
  profileBioEditor.innerHTML = String(activeProfile.bioHtml || "");
  renderProfileLinksEditor(activeProfile.links);
  syncProfileSongPreview(activeProfile.themeSongUrl || "");
}

function renderCenterPanels() {
  const profileMode = centerView === "profile";
  if (profileViewPanel) profileViewPanel.classList.toggle("hidden", !profileMode);
  if (feedEl?.closest("section")) feedEl.closest("section").classList.toggle("hidden", profileMode);
  if (pollinatePanel) {
    if (profileMode) pollinatePanel.classList.add("hidden");
    else pollinatePanel.classList.toggle("hidden", !composerOpen);
  }
  if (!profileMode) return;
  const username = activeProfile?.username || activeProfileUsername || "";
  if (profileViewTitle) profileViewTitle.textContent = username ? `@${username}` : "Profile";
  if (profileViewMeta) profileViewMeta.textContent = username === loggedInUser ? "Your profile" : "Community profile";
  renderProfileCard();
  renderProfileEditor();
}

function setCenterView(next, username = "") {
  centerView = next === "profile" ? "profile" : "hives";
  if (centerView === "hives") {
    activeProfileUsername = "";
    activeProfile = null;
    isEditingProfile = false;
    if (profileEditToggleBtn) profileEditToggleBtn.textContent = "Edit profile";
  } else {
    activeProfileUsername = String(username || activeProfileUsername || "")
      .trim()
      .toLowerCase();
    isEditingProfile = false;
    if (profileEditToggleBtn) profileEditToggleBtn.textContent = "Edit profile";
  }
  renderCenterPanels();
}

function openUserProfile(username) {
  const normalized = String(username || "")
    .trim()
    .toLowerCase();
  if (!normalized) return;
  const basic = getProfile(normalized);
  activeProfile = normalizeProfileData({ username: normalized, image: basic.image || "", color: basic.color || "" });
  setCenterView("profile", normalized);
  ws.send(JSON.stringify({ type: "getUserProfile", username: normalized }));
  if (isMobileSwipeMode()) setMobilePanel("main");
}

function isMobileSwipeMode() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function setMobilePanel(next) {
  if (!appRoot) return;
  const allowMod = canModerate;
  const panel =
    next === "sidebar" || next === "chat" || next === "people" || (allowMod && next === "moderation") ? next : "main";
  mobilePanel = panel;
  appRoot.setAttribute("data-mobile-panel", panel);
  const buttons = mobilePagerEl ? Array.from(mobilePagerEl.querySelectorAll("[data-mobilepanel]")) : [];
  for (const btn of buttons) {
    const on = btn.getAttribute("data-mobilepanel") === panel;
    btn.classList.toggle("primary", on);
    btn.classList.toggle("ghost", !on);
  }

  if (isMobileSwipeMode()) {
    if (panel === "people") setPeopleOpen(true);
    else setPeopleOpen(false);
  }
}

function applyMobileMode() {
  if (!appRoot) return;
  const mobile = isMobileSwipeMode();
  appRoot.classList.toggle("mobileSwipe", mobile);
  if (mobilePagerEl) mobilePagerEl.classList.toggle("hidden", !mobile);
  if (mobileModBtn) mobileModBtn.classList.toggle("hidden", !canModerate);
  if (!canModerate && mobilePanel === "moderation") mobilePanel = "main";
  if (mobile) stopAnyPanelResize();
  if (mobile) setMobilePanel(mobilePanel);
  if (canResizeSidebarNow()) applySidebarWidth(readStoredSidebarWidth(), false);
  if (canResizeChatNow()) applyChatWidth(readStoredChatWidth(), false);
  if (canResizeModNow()) applyModWidth(readStoredModWidth(), false);
  if (canResizePeopleNow()) applyPeopleWidth(readStoredPeopleWidth(), false);
  setComposerOpen(composerOpen);
}

function shiftMobilePanel(delta) {
  if (!isMobileSwipeMode()) return;
  const order = canModerate ? ["sidebar", "main", "chat", "people", "moderation"] : ["sidebar", "main", "chat", "people"];
  const idx = order.indexOf(mobilePanel);
  const current = idx >= 0 ? idx : 1;
  const nextIdx = Math.max(0, Math.min(order.length - 1, current + delta));
  setMobilePanel(order[nextIdx]);
}

function toast(title, body, timeoutMs = 2800) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<div class="toastTitle">${escapeHtml(title)}</div><div class="toastBody">${escapeHtml(body)}</div>`;
  toastHost.appendChild(el);
  setTimeout(() => el.remove(), timeoutMs);
}

function sendDevLog(level, scope, message, data) {
  try {
    if (!canModerate) return false;
    const wsRef = window.__bzlWs;
    if (!wsRef || wsRef.readyState !== WebSocket.OPEN) return false;
    wsRef.send(JSON.stringify({ type: "devLogClient", level, scope, message, data }));
    return true;
  } catch {
    return false;
  }
}

window.bzlDevLog = sendDevLog;

// Minimal plugin host (client-side). Plugins are trusted by the owner who installs them.
// Plugin scripts can call `window.BzlPluginHost.register("pluginId", (ctx) => { ... })`.
if (!window.BzlPluginHost) {
  const pluginInits = new Map();
  window.BzlPluginHost = {
    apiVersion: 1,
    register(pluginId, initFn) {
      const id = String(pluginId || "").trim().toLowerCase();
      if (!/^[a-z0-9][a-z0-9_.-]{0,31}$/.test(id)) throw new Error("Invalid plugin id");
      if (typeof initFn !== "function") throw new Error("init must be a function");
      if (pluginInits.has(id)) return false;
      pluginInits.set(id, initFn);
      try {
        initFn({
          id,
          toast,
          getUser: () => loggedInUser,
          getRole: () => loggedInRole,
          devLog: (level, message, data) => sendDevLog(level, `plugin:${id}`, message, data),
          send(eventName, payload) {
            const ev = String(eventName || "").trim();
            if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,63}$/.test(ev)) return false;
            const wsRef = window.__bzlWs;
            if (!wsRef || wsRef.readyState !== WebSocket.OPEN) return false;
            const msg = payload && typeof payload === "object" ? payload : {};
            wsRef.send(JSON.stringify({ ...msg, type: `plugin:${id}:${ev}` }));
            return true;
          },
        });
      } catch (e) {
        console.warn(`Plugin ${id} init failed:`, e?.message || e);
        toast("Plugin error", `Failed to init "${id}".`);
      }
      return true;
    },
  };
}

function renderTypingIndicator() {
  if (!typingIndicator) return;
  if (!activeChatPostId) {
    typingIndicator.textContent = "";
    return;
  }
  const set = typingUsersByPostId.get(activeChatPostId);
  if (!set || set.size === 0) {
    typingIndicator.textContent = "";
    return;
  }
  const names = Array.from(set.values());
  let text = "";
  if (names.length === 1) text = `@${names[0]} is typing`;
  else if (names.length === 2) text = `@${names[0]} and @${names[1]} are typing`;
  else text = `@${names[0]}, @${names[1]} and ${names.length - 2} others are typing`;
  typingIndicator.innerHTML = `${escapeHtml(text)} <span class="typingDots"><span>.</span><span>.</span><span>.</span></span>`;
}

function highlightMentionsInText(text) {
  const escaped = escapeHtml(text || "");
  if (!escaped) return "";
  return escaped.replace(/(^|[\s(>])@([a-z0-9][a-z0-9_.-]{0,31})/gi, (full, lead, name) => {
    const normalized = String(name || "").toLowerCase();
    const mine = loggedInUser && normalized === loggedInUser ? " mentionTokenMe" : "";
    return `${lead}<span class="mentionToken${mine}">@${escapeHtml(name)}</span>`;
  });
}

function decorateMentionNodesInElement(rootEl) {
  if (!rootEl) return;
  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
  const targets = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent) continue;
    if (parent.closest(".mentionToken")) continue;
    if (parent.closest("a")) continue;
    const text = String(node.nodeValue || "");
    if (!/@[a-z0-9_][a-z0-9_.-]{0,31}/i.test(text)) continue;
    targets.push(node);
  }
  for (const node of targets) {
    const text = String(node.nodeValue || "");
    const re = /(^|[\s(>])@([a-z0-9_][a-z0-9_.-]{0,31})/gi;
    let match;
    let last = 0;
    const frag = document.createDocumentFragment();
    let changed = false;
    while ((match = re.exec(text))) {
      const start = match.index;
      const lead = match[1] || "";
      const rawName = match[2] || "";
      const mentionStart = start + lead.length;
      if (mentionStart > last) {
        frag.appendChild(document.createTextNode(text.slice(last, mentionStart)));
      }
      const normalized = String(rawName).toLowerCase();
      const span = document.createElement("span");
      span.className = `mentionToken${loggedInUser && normalized === loggedInUser ? " mentionTokenMe" : ""}`;
      span.textContent = `@${rawName}`;
      frag.appendChild(span);
      last = mentionStart + 1 + rawName.length;
      changed = true;
    }
    if (!changed) continue;
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode?.replaceChild(frag, node);
  }
}

function youtubeVideoIdFromUrl(rawUrl) {
  const raw = String(rawUrl || "").trim();
  if (!raw) return "";
  const urlText = /^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/^\/+/, "")}`;
  let url;
  try {
    url = new URL(urlText);
  } catch {
    return "";
  }

  const host = String(url.hostname || "").toLowerCase();
  const path = String(url.pathname || "");
  const isYouTube =
    host === "youtu.be" ||
    host.endsWith(".youtu.be") ||
    host === "youtube.com" ||
    host.endsWith(".youtube.com") ||
    host === "youtube-nocookie.com" ||
    host.endsWith(".youtube-nocookie.com");
  if (!isYouTube) return "";

  let id = "";
  if (host.includes("youtu.be")) {
    id = path.split("/").filter(Boolean)[0] || "";
  } else {
    const v = url.searchParams.get("v");
    if (v) id = v;
    if (!id) {
      const parts = path.split("/").filter(Boolean);
      if (parts[0] === "shorts") id = parts[1] || "";
      if (!id && parts[0] === "embed") id = parts[1] || "";
    }
  }

  id = String(id || "").trim();
  if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return "";
  return id;
}

function buildYouTubeEmbedEl(videoId) {
  const id = String(videoId || "").trim();
  if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;
  const wrap = document.createElement("div");
  wrap.className = "ytEmbed";
  const iframe = document.createElement("iframe");
  iframe.setAttribute("title", "YouTube video");
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("allowfullscreen", "true");
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-presentation allow-popups");
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}`;
  wrap.appendChild(iframe);
  return wrap;
}

function decorateYouTubeEmbedsInElement(rootEl) {
  if (!rootEl) return;
  const existing = rootEl.querySelectorAll(".ytEmbed iframe[src*=\"youtube-nocookie.com/embed/\"]");
  if (existing && existing.length) return;

  const anchors = Array.from(rootEl.querySelectorAll("a[href]"));
  for (const a of anchors) {
    const href = a.getAttribute("href") || "";
    const id = youtubeVideoIdFromUrl(href);
    if (!id) continue;
    const next = a.nextElementSibling;
    if (next && next.classList.contains("ytEmbed")) continue;
    const embed = buildYouTubeEmbedEl(id);
    if (!embed) continue;
    a.insertAdjacentElement("afterend", embed);
  }

  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
  const nodes = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent) continue;
    if (parent.closest("a")) continue;
    if (parent.closest(".ytEmbed")) continue;
    const text = String(node.nodeValue || "");
    if (!/(youtu\.be\/|youtube\.com\/|youtube-nocookie\.com\/)/i.test(text)) continue;
    nodes.push(node);
  }

  for (const node of nodes) {
    const text = String(node.nodeValue || "");
    const re = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;
    let match;
    let last = 0;
    const frag = document.createDocumentFragment();
    let changed = false;
    while ((match = re.exec(text))) {
      const urlToken = String(match[0] || "");
      const start = match.index;
      if (start > last) frag.appendChild(document.createTextNode(text.slice(last, start)));
      const id = youtubeVideoIdFromUrl(urlToken);
      if (!id) {
        frag.appendChild(document.createTextNode(urlToken));
        last = start + urlToken.length;
        continue;
      }
      changed = true;
      const a = document.createElement("a");
      const href = /^https?:\/\//i.test(urlToken) ? urlToken : `https://${urlToken}`;
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer nofollow";
      a.textContent = urlToken;
      frag.appendChild(a);
      frag.appendChild(buildYouTubeEmbedEl(id));
      last = start + urlToken.length;
    }
    if (!changed) continue;
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode?.replaceChild(frag, node);
  }
}

function findChatMessage(postId, messageId) {
  const list = chatByPost.get(postId) || [];
  return list.find((m) => m && m.id === messageId) || null;
}

function setReplyToMessage(message) {
  replyToMessage = message || null;
  if (!chatReplyBanner || !chatReplyWho || !chatReplyText) return;
  if (!replyToMessage) {
    chatReplyBanner.classList.add("hidden");
    chatReplyWho.textContent = "";
    chatReplyText.textContent = "";
    return;
  }
  chatReplyBanner.classList.remove("hidden");
  const who = replyToMessage.fromUser ? `@${replyToMessage.fromUser}` : "unknown";
  chatReplyWho.textContent = who;
  const text = String(replyToMessage.text || "").replace(/\s+/g, " ").trim();
  chatReplyText.textContent = text ? `- ${text.slice(0, 96)}` : "- [media]";
}

function listMentionCandidates(query) {
  const q = String(query || "")
    .trim()
    .toLowerCase()
    .replace(/^@+/, "");
  const list = Array.isArray(peopleMembers) && peopleMembers.length ? peopleMembers : fallbackPeopleFromProfiles();
  const filtered = list
    .map((m) => String(m.username || "").toLowerCase())
    .filter(Boolean)
    .filter((u) => (q ? u.includes(q) : true))
    .slice(0, 8);
  return Array.from(new Set(filtered));
}

function getCaretRect() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0).cloneRange();
  range.collapse(true);
  const rects = range.getClientRects();
  if (rects && rects.length) return rects[0];
  const node = range.startContainer && range.startContainer.parentElement ? range.startContainer.parentElement : null;
  return node ? node.getBoundingClientRect() : null;
}

function renderMentionMenu() {
  if (!mentionMenuEl) return;
  const open = Boolean(mentionState.open && mentionState.items.length);
  mentionMenuEl.classList.toggle("hidden", !open);
  if (!open) {
    mentionMenuEl.innerHTML = "";
    return;
  }
  const rect = mentionState.anchorRect || getCaretRect();
  if (rect) {
    const top = Math.min(window.innerHeight - 180, rect.bottom + 6);
    const left = Math.min(window.innerWidth - 220, rect.left);
    mentionMenuEl.style.top = `${Math.max(10, top)}px`;
    mentionMenuEl.style.left = `${Math.max(10, left)}px`;
  }
  mentionMenuEl.innerHTML = mentionState.items
    .map((u, idx) => {
      const on = idx === mentionState.selected;
      return `<div class="mentionItem ${on ? "isOn" : ""}" role="option" data-mentionpick="${escapeHtml(u)}">@${escapeHtml(u)}</div>`;
    })
    .join("");
}

mentionMenuEl?.addEventListener("mousedown", (e) => {
  const item = e.target.closest("[data-mentionpick]");
  if (!item) return;
  e.preventDefault(); // keep focus in editor
  const picked = item.getAttribute("data-mentionpick") || "";
  if (!picked) return;
  replaceCurrentMentionToken(picked);
  closeMentionMenu();
  chatEditor?.focus();
});

function closeMentionMenu() {
  mentionState = { open: false, query: "", selected: 0, items: [], anchorRect: null };
  renderMentionMenu();
}

function replaceCurrentMentionToken(username) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  if (!range.collapsed) return;
  const node = range.startContainer;
  if (!node || node.nodeType !== Node.TEXT_NODE) return;
  const text = String(node.nodeValue || "");
  const caret = range.startOffset;
  const before = text.slice(0, caret);
  const after = text.slice(caret);
  const atIndex = before.lastIndexOf("@");
  if (atIndex < 0) return;
  const prefix = before.slice(0, atIndex);
  const next = `${prefix}@${username} ${after}`;
  node.nodeValue = next;
  const newOffset = (prefix + `@${username} `).length;
  const newRange = document.createRange();
  newRange.setStart(node, Math.min(newOffset, node.nodeValue.length));
  newRange.collapse(true);
  sel.removeAllRanges();
  sel.addRange(newRange);
}

function wsUrl() {
  const isHttps = location.protocol === "https:";
  const proto = isHttps ? "wss:" : "ws:";
  return `${proto}//${location.host}/ws`;
}

function setConn(state) {
  if (state === "open") {
    connBadge.textContent = "Connected";
    connBadge.className = "badge badge-good";
  } else if (state === "closed") {
    connBadge.textContent = "Disconnected";
    connBadge.className = "badge badge-bad";
  } else {
    connBadge.textContent = "Connecting...";
    connBadge.className = "badge badge-warn";
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cssEscape(str) {
  const raw = String(str ?? "");
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(raw);
  return raw.replace(/[^a-zA-Z0-9_-]/g, (m) => `\\${m}`);
}

function parseKeywords(str) {
  if (!str) return [];
  const parts = str
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return Array.from(new Set(parts)).slice(0, 6);
}

function formatCountdown(expiresAt) {
  if (!Number(expiresAt || 0) || Number(expiresAt) <= 0) return "permanent";
  const ms = expiresAt - Date.now();
  if (ms <= 0) return "expired";
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function formatBoostRemaining(boostUntil) {
  const ms = boostUntil - Date.now();
  if (ms <= 0) return "";
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function rankTime(post) {
  return Math.max(Number(post.lastActivityAt || post.createdAt || 0), Number(post.boostUntil || 0));
}

function normalizePrefs(raw) {
  const starred = Array.isArray(raw?.starredPostIds) ? raw.starredPostIds.filter((x) => typeof x === "string" && x) : [];
  const hidden = Array.isArray(raw?.hiddenPostIds) ? raw.hiddenPostIds.filter((x) => typeof x === "string" && x) : [];
  const ignored = Array.isArray(raw?.ignoredUsers) ? raw.ignoredUsers.filter((x) => typeof x === "string" && x) : [];
  const blocked = Array.isArray(raw?.blockedUsers) ? raw.blockedUsers.filter((x) => typeof x === "string" && x) : [];
  const cleanUsers = (list) =>
    [...new Set(list.map((u) => String(u).trim().toLowerCase().replace(/^@+/, "")).filter(Boolean))].slice(0, 400);
  return {
    starredPostIds: [...new Set(starred)],
    hiddenPostIds: [...new Set(hidden)],
    ignoredUsers: cleanUsers(ignored),
    blockedUsers: cleanUsers(blocked),
  };
}

function setUserPrefs(raw) {
  userPrefs = normalizePrefs(raw || {});
  if (!loggedInUser && activeHiveView !== "all") activeHiveView = "all";
}

function normalizeCollections(rawList) {
  const list = Array.isArray(rawList) ? rawList : [];
  const out = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const id = String(item.id || "").trim();
    const name = String(item.name || "").trim();
    if (!id || !name) continue;
    out.push({
      id,
      name,
      order: Number(item.order || 0) || 0,
      archived: Boolean(item.archived),
      visibility: item.visibility === "gated" ? "gated" : "public",
      allowedRoles: Array.isArray(item.allowedRoles) ? item.allowedRoles.map((x) => String(x || "").toLowerCase()).filter(Boolean) : []
    });
  }
  out.sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || a.name.localeCompare(b.name));
  return out;
}

function activeCollections() {
  return collections.filter((c) => !c.archived);
}

function ensureActiveCollectionView() {
  if (!String(activeHiveView).startsWith("collection:")) return;
  const id = String(activeHiveView).slice("collection:".length);
  if (!activeCollections().some((c) => c.id === id)) activeHiveView = "all";
}

function renderCollectionSelect() {
  if (!postCollectionEl) return;
  const list = activeCollections();
  const opts = list.map((c) => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)}</option>`).join("");
  postCollectionEl.innerHTML = opts;
  if (!postCollectionEl.value && list.length) postCollectionEl.value = list[0].id;
}

function normalizeRoleDefs(rawList) {
  const list = Array.isArray(rawList) ? rawList : [];
  const out = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const key = String(item.key || "").trim().toLowerCase();
    const label = String(item.label || "").trim();
    if (!key || !label) continue;
    out.push({
      key,
      label,
      color: /^#[0-9a-f]{6}$/i.test(String(item.color || "")) ? String(item.color).toLowerCase() : "",
      order: Number(item.order || 0) || 0
    });
  }
  out.sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || a.label.localeCompare(b.label));
  return out;
}

function normalizePlugins(rawList) {
  const list = Array.isArray(rawList) ? rawList : [];
  const out = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const id = String(item.id || "").trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9_.-]{0,31}$/.test(id)) continue;
    out.push({
      id,
      name: String(item.name || id).trim().slice(0, 64) || id,
      version: String(item.version || "0.0.0").trim().slice(0, 32),
      description: String(item.description || "").trim().slice(0, 240),
      enabled: Boolean(item.enabled),
      entryClient: String(item.entryClient || "").trim(),
      entryServer: String(item.entryServer || "").trim(),
      permissions: Array.isArray(item.permissions)
        ? item.permissions.filter((p) => typeof p === "string" && p.trim()).map((p) => p.trim().slice(0, 64)).slice(0, 24)
        : [],
      error: String(item.error || "").trim().slice(0, 280),
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

function isOwnerUser() {
  return Boolean(loggedInUser && loggedInRole === "owner");
}

function renderPluginsAdminHtml() {
  if (!isOwnerUser()) return `<div class="muted small">Owner only.</div>`;
  const status = pluginAdminStatus ? `<div class="small muted">${escapeHtml(pluginAdminStatus)}</div>` : "";
  const busyLine = pluginAdminBusy ? `<div class="small muted">Working…</div>` : "";
  const listHtml = !plugins.length
    ? `<div class="muted small">No plugins installed yet.</div>`
    : plugins
    .map((p) => {
      const badges = [];
      if (p.entryClient) badges.push(`<span class="pluginBadge">client</span>`);
      if (p.entryServer) badges.push(`<span class="pluginBadge">server</span>`);
      for (const perm of p.permissions || []) badges.push(`<span class="pluginBadge">${escapeHtml(perm)}</span>`);
      const err = p.error ? `<div class="pluginError">${escapeHtml(p.error)}</div>` : "";
      return `<div class="pluginRow">
        <div class="pluginLeft">
          <div class="pluginName">${escapeHtml(p.name)} <span class="muted small">v${escapeHtml(p.version)}</span></div>
          ${p.description ? `<div class="pluginDesc">${escapeHtml(p.description)}</div>` : ""}
          ${badges.length ? `<div class="pluginBadges">${badges.join("")}</div>` : ""}
          ${err}
        </div>
        <div class="pluginRight">
          <label class="checkRow" style="justify-content:flex-end; gap:10px">
            <span>Enabled</span>
            <input type="checkbox" data-pluginenable="${escapeHtml(p.id)}" ${p.enabled ? "checked" : ""} ${
              pluginEnableInFlight.has(p.id) || pluginAdminBusy ? "disabled" : ""
            } />
          </label>
          <button type="button" class="danger smallBtn" data-pluginuninstall="${escapeHtml(p.id)}">Uninstall</button>
        </div>
      </div>`;
    })
    .join("");
  return `
    <div class="small muted">Owner-only. Install optional plugins to extend your instance.</div>
    <div class="pluginInstallRow" style="margin-top:10px">
      <input data-pluginzip="1" type="file" accept=".zip,application/zip" />
      <button data-plugininstall="1" class="ghost" type="button">Install</button>
      <button data-pluginreload="1" class="ghost" type="button">Reload</button>
    </div>
    ${busyLine}
    ${status}
    <div class="pluginsList">${listHtml}</div>
  `;
}

function ensureEnabledPluginClientScripts() {
  if (!Array.isArray(plugins) || !plugins.length) return;
  for (const p of plugins) {
    if (!p || !p.enabled) continue;
    if (!p.entryClient) continue;
    const wantVersion = String(p.version || "0");
    const loadedVersion = loadedPluginClientVersionById.get(p.id) || "";
    if (loadedVersion && loadedVersion === wantVersion) continue;
    const src = `/plugins/${encodeURIComponent(p.id)}/${p.entryClient}?v=${encodeURIComponent(p.version || "0")}`;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.onload = () => {
      loadedPluginClientVersionById.set(p.id, wantVersion);
    };
    script.onerror = () => {
      pluginAdminStatus = `Failed to load plugin "${p.id}".`;
      toast("Plugins", pluginAdminStatus);
      renderModPanel();
    };
    document.head.appendChild(script);
  }
}

function setPlugins(rawList) {
  plugins = normalizePlugins(rawList);
  ensureEnabledPluginClientScripts();
  if (canModerate && modTab === "server") renderModPanel();
}

function roleDefByKey(key) {
  return customRoles.find((r) => r.key === key) || null;
}

function roleTokenLabel(token) {
  const t = String(token || "");
  if (t === "owner" || t === "moderator" || t === "member") return t;
  if (t.startsWith("role:")) {
    const key = t.slice("role:".length);
    const found = roleDefByKey(key);
    return found ? found.label : key;
  }
  return t;
}

function userCustomRoleKeys(username) {
  const member = (peopleMembers || []).find((m) => m && m.username === username);
  const keys = Array.isArray(member?.customRoles) ? member.customRoles : [];
  return keys.filter((x) => typeof x === "string" && x);
}

function renderCustomRoleBadges(username) {
  const keys = userCustomRoleKeys(username);
  if (!keys.length) return "";
  const parts = keys
    .map((key) => {
      const def = roleDefByKey(key);
      if (!def) return `<span class="modStatus">${escapeHtml(key)}</span>`;
      const style = def.color ? ` style="border-color:${escapeHtml(def.color)}66;color:${escapeHtml(def.color)}"` : "";
      return `<span class="modStatus"${style}>${escapeHtml(def.label)}</span>`;
    })
    .join(" ");
  return `<span class="customRoleRow">${parts}</span>`;
}

function availableGateTokens() {
  const base = ["member", "moderator", "owner"];
  const custom = customRoles.map((r) => `role:${r.key}`);
  return [...base, ...custom];
}

function prefSet(key) {
  return new Set(Array.isArray(userPrefs?.[key]) ? userPrefs[key] : []);
}

function totalReactions(post) {
  const reactions = post?.reactions && typeof post.reactions === "object" ? post.reactions : {};
  let total = 0;
  for (const count of Object.values(reactions)) total += Number(count || 0);
  return total;
}

function sortPosts(list) {
  const mode = String(sortByEl?.value || "activity");
  if (mode === "popular") {
    return list.sort((a, b) => totalReactions(b) - totalReactions(a) || rankTime(b) - rankTime(a) || b.createdAt - a.createdAt);
  }
  if (mode === "expiring") {
    const exp = (p) => {
      const t = Number(p?.expiresAt || 0) || 0;
      return t > 0 ? t : Number.MAX_SAFE_INTEGER;
    };
    return list.sort((a, b) => exp(a) - exp(b) || rankTime(b) - rankTime(a));
  }
  return list.sort((a, b) => rankTime(b) - rankTime(a) || b.createdAt - a.createdAt);
}

function getProfile(username) {
  if (!username) return { image: "", color: "" };
  const p = profiles[username] || {};
  return { image: p.image || "", color: p.color || "" };
}

function normalizeProfileLinks(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const label = String(item.label || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 40);
    const url = String(item.url || "").trim().slice(0, 280);
    if (!/^https?:\/\//i.test(url)) continue;
    out.push({ label: label || "Link", url });
    if (out.length >= 8) break;
  }
  return out;
}

function normalizeProfileData(raw, fallbackUsername = "") {
  const username = String(raw?.username || fallbackUsername || "")
    .trim()
    .toLowerCase();
  const image = typeof raw?.image === "string" ? raw.image : getProfile(username).image || "";
  const colorRaw = typeof raw?.color === "string" ? raw.color : getProfile(username).color || "";
  const color = /^#[0-9a-f]{6}$/i.test(colorRaw) ? colorRaw.toLowerCase() : "";
  const pronouns = String(raw?.pronouns || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
  const bioHtml = typeof raw?.bioHtml === "string" ? raw.bioHtml : "";
  const themeSongUrl = typeof raw?.themeSongUrl === "string" ? raw.themeSongUrl.trim() : "";
  const links = normalizeProfileLinks(raw?.links);
  return { username, image, color, pronouns, bioHtml, themeSongUrl, links };
}

function asProfileLink(url) {
  const value = String(url || "").trim();
  if (!/^https?:\/\//i.test(value)) return "";
  return value;
}

function renderUserPill(username) {
  if (!username) return `<span class="muted small">anon</span>`;
  const p = getProfile(username);
  const image = typeof p.image === "string" ? p.image : "";
  const color = p.color && /^#[0-9a-f]{6}$/i.test(p.color) ? p.color : "";
  const safeTextColor = color ? safeTextColorFromHex(color) : "";
  const style = safeTextColor ? `style="color:${escapeHtml(safeTextColor)}"` : "";
  const img = image ? `<img alt="" src="${escapeHtml(image)}" />` : "";
  const extra = renderCustomRoleBadges(username);
  const normalized = String(username || "").trim().toLowerCase();
  return `<button type="button" class="userPill userPillLink" data-viewprofile="${escapeHtml(
    normalized
  )}" title="View profile"><span class="pfp">${img}</span><span ${style}>@${escapeHtml(username)}</span>${extra}</button>`;
}

function hexToRgb(hex) {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex || "");
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function srgbToLinear(x) {
  const c = x / 255;
  if (c <= 0.04045) return c / 12.92;
  return Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminanceFromRgb(rgb) {
  if (!rgb) return 1;
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function rgbToHex(rgb) {
  const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
  const to2 = (n) => clamp(n).toString(16).padStart(2, "0");
  return `#${to2(rgb.r)}${to2(rgb.g)}${to2(rgb.b)}`;
}

function mixRgb(a, b, t) {
  const k = Math.max(0, Math.min(1, Number(t) || 0));
  return {
    r: a.r + (b.r - a.r) * k,
    g: a.g + (b.g - a.g) * k,
    b: a.b + (b.b - a.b) * k,
  };
}

function safeTextColorFromHex(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "";
  const baseLum = relativeLuminanceFromRgb(rgb);
  if (baseLum >= 0.38) return rgbToHex(rgb);
  const white = { r: 255, g: 255, b: 255 };
  let best = rgb;
  for (let t = 0.10; t <= 0.85; t += 0.08) {
    const mixed = mixRgb(rgb, white, t);
    if (relativeLuminanceFromRgb(mixed) >= 0.42) {
      best = mixed;
      break;
    }
    best = mixed;
  }
  return rgbToHex(best);
}

function tintStylesFromHex(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "";
  const bg = `rgba(${rgb.r},${rgb.g},${rgb.b},0.10)`;
  const border = `rgba(${rgb.r},${rgb.g},${rgb.b},0.22)`;
  return `style="background:${bg};border-color:${border}"`;
}

function cardTintStylesFromHex(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "";
  const bg = `linear-gradient(180deg, rgba(${rgb.r},${rgb.g},${rgb.b},0.11), rgba(${rgb.r},${rgb.g},${rgb.b},0.03) 48%), var(--panel2)`;
  const border = `rgba(${rgb.r},${rgb.g},${rgb.b},0.34)`;
  const glow = `0 10px 24px rgba(${rgb.r},${rgb.g},${rgb.b},0.14)`;
  return `style="background:${bg};border-color:${border};box-shadow:${glow}"`;
}

function matchesFilter(post, filterSet, authorQuery, hiddenSet, starredSet, ignoreUserSet, visibleCollectionIds) {
  if (visibleCollectionIds && !visibleCollectionIds.has(String(post.collectionId || ""))) return false;
  if (hiddenSet.has(post.id) && activeHiveView !== "hidden") return false;
  if (activeHiveView === "starred" && !starredSet.has(post.id)) return false;
  if (activeHiveView === "hidden" && !hiddenSet.has(post.id)) return false;
  const author = String(post.author || "").toLowerCase();
  if (author && ignoreUserSet && ignoreUserSet.has(author) && (!loggedInUser || author !== String(loggedInUser).toLowerCase())) return false;
  if (String(activeHiveView).startsWith("collection:")) {
    const collectionId = String(activeHiveView).slice("collection:".length);
    if ((post.collectionId || "") !== collectionId) return false;
  }
  if (filterSet.size > 0) {
    let matched = false;
    for (const kw of post.keywords || []) {
      if (filterSet.has(kw)) {
        matched = true;
        break;
      }
    }
    if (!matched) return false;
  }
  if (authorQuery && !author.includes(authorQuery)) return false;
  return true;
}

function postTitle(post) {
  if (post.locked) return "Protected post";
  const text = String(post.title || post.content || "").replace(/\s+/g, " ").trim();
  if (!text) return "(untitled)";
  return text.length > 96 ? `${text.slice(0, 96)}...` : text;
}

function myReactKey(kind, id, emoji) {
  return `${kind}:${id}:${emoji}`;
}

function toggleMyReact(kind, id, emoji) {
  const key = myReactKey(kind, id, emoji);
  if (myReacts.has(key)) myReacts.delete(key);
  else myReacts.add(key);
}

function markReactPulse(kind, id, emoji) {
  const key = myReactKey(kind, id, emoji);
  reactPulseByKey.set(key, Date.now());
}

function renderReactionButtons({ kind, id, reactions, postId }) {
  const r = reactions && typeof reactions === "object" ? reactions : {};
  const emojis = kind === "post" ? allowedPostReactions : allowedChatReactions;
  return `<div class="reactionsRow">
    ${emojis
      .map((emoji) => {
        const count = Number(r[emoji] || 0);
        const key = myReactKey(kind, id, emoji);
        const isOn = myReacts.has(key);
        const pulseAt = reactPulseByKey.get(key) || 0;
        const pulse = pulseAt && Date.now() - pulseAt < 650;
        if (pulseAt && !pulse) reactPulseByKey.delete(key);
        const cls = `${isOn ? "reactBtn isOn" : "reactBtn"}${pulse ? " pulse" : ""}`;
        const attrs =
          kind === "post"
            ? `data-react="1" data-kind="post" data-postid="${escapeHtml(id)}" data-emoji="${escapeHtml(emoji)}"`
            : `data-react="1" data-kind="chat" data-postid="${escapeHtml(postId || "")}" data-msgid="${escapeHtml(
                id
              )}" data-emoji="${escapeHtml(emoji)}"`;
        return `<span class="${cls}" ${attrs}>${escapeHtml(emoji)} <span class="count">${count || ""}</span></span>`;
      })
      .join("")}
  </div>`;
}

function markRead(postId) {
  if (!postId) return;
  unreadByPostId.delete(postId);
}

function bumpUnread(postId) {
  const current = unreadByPostId.get(postId) || 0;
  unreadByPostId.set(postId, Math.min(99, current + 1));
}

function notifSupported() {
  return typeof window.Notification !== "undefined";
}

function notifState() {
  if (!notifSupported()) return "unsupported";
  return Notification.permission; // default | denied | granted
}

function updateNotifUi() {
  if (!enableNotifsBtn || !notifStatus) return;
  const state = notifState();
  const secure = location.protocol === "https:";
  const hint = secure ? "" : " (requires HTTPS: use tunnel)";

  if (state === "unsupported") {
    enableNotifsBtn.classList.add("hidden");
    notifStatus.textContent = "Notifications not supported in this browser.";
    return;
  }

  enableNotifsBtn.classList.remove("hidden");
  if (!secure) {
    enableNotifsBtn.disabled = true;
    notifStatus.textContent = `Notifications disabled on HTTP${hint}.`;
    return;
  }

  enableNotifsBtn.disabled = state === "granted";
  enableNotifsBtn.textContent = state === "granted" ? "Notifications enabled" : "Enable notifications";
  notifStatus.textContent =
    state === "granted" ? "You'll get pings when activity happens." : state === "denied" ? "Blocked in browser settings." : "";
}

function maybeNotify(title, body, data) {
  if (notifState() !== "granted") return;
  if (windowFocused && !document.hidden) return;
  try {
    const n = new Notification(title, { body, data });
    n.onclick = () => {
      window.focus();
      if (data?.postId) openChat(data.postId);
      if (data?.threadId) openDmThread(data.threadId);
      n.close();
    };
  } catch {
    // ignore
  }
}

function renderLanHint() {
  if (!lanHint) return;
  if (!canModerate || !Array.isArray(lanUrls) || lanUrls.length === 0) {
    lanHint.textContent = "";
    return;
  }
  lanHint.innerHTML = `LAN: <span class="muted">${lanUrls.map(escapeHtml).join(" | ")}</span>`;
}

function renderFeed() {
  const filter = parseKeywords(filterKeywordsEl.value);
  const filterSet = new Set(filter);
  const authorQuery = String(filterAuthorEl?.value || "")
    .trim()
    .replace(/^@+/, "")
    .toLowerCase();
  ensureActiveCollectionView();
  const hiddenSet = prefSet("hiddenPostIds");
  const starredSet = prefSet("starredPostIds");
  const ignoreUserSet = new Set([...prefSet("ignoredUsers").values(), ...prefSet("blockedUsers").values()].map((u) => String(u).toLowerCase()));
  const visibleCollectionIds = new Set(activeCollections().map((c) => c.id));
  if (!loggedInUser && activeHiveView !== "all") activeHiveView = "all";
  if (hiveTabsEl) {
    const collectionTabs = activeCollections()
      .map((c) => {
        const view = `collection:${c.id}`;
        const on = view === activeHiveView;
        const cls = on ? "primary" : "ghost";
        return `<button type="button" data-hiveview="${escapeHtml(view)}" class="${cls}">${escapeHtml(c.name)}</button>`;
      })
      .join("");
    const allOn = activeHiveView === "all";
    const starredOn = activeHiveView === "starred";
    const hiddenOn = activeHiveView === "hidden";
    hiveTabsEl.innerHTML = `
      <button type="button" data-hiveview="all" class="${allOn ? "primary" : "ghost"}">All</button>
      ${collectionTabs}
      <button type="button" data-hiveview="starred" class="${starredOn ? "primary" : "ghost"}" ${loggedInUser ? "" : "disabled"}>Starred</button>
      <button type="button" data-hiveview="hidden" class="${hiddenOn ? "primary" : "ghost"}" ${loggedInUser ? "" : "disabled"}>Hidden</button>
    `;
  }

  const list = sortPosts(Array.from(posts.values())).filter((p) =>
    matchesFilter(p, filterSet, authorQuery, hiddenSet, starredSet, ignoreUserSet, visibleCollectionIds)
  );

  if (list.length === 0) {
    feedEl.innerHTML = `<div class="small muted">No active posts in this view/filter.</div>`;
    return;
  }

  feedEl.innerHTML = list
    .map((p) => {
      const tags = (p.keywords || []).map((k) => `<span class="tag">#${escapeHtml(k)}</span>`).join("");
      const collectionName = activeCollections().find((c) => c.id === p.collectionId)?.name || "General";
      const collectionTag = `<span class="tag">/${escapeHtml(collectionName)}</span>`;
      const postedLine = `<div class="small muted">posted ${escapeHtml(new Date(p.createdAt).toLocaleString())}</div>`;
      const editedLine =
        Number(p.editCount || 0) > 0
          ? `<div class="small muted">edited (${Number(p.editCount || 0)}) at ${escapeHtml(
              new Date(Number(p.editedAt || p.createdAt)).toLocaleString()
            )}</div>`
          : "";
      const deletedLine = p.deleted
        ? `<div class="small muted">Post was deleted${
            p.deletedBy ? ` by @${escapeHtml(p.deletedBy)}` : ""
          } at ${escapeHtml(new Date(Number(p.deletedAt || Date.now())).toLocaleString())}${
            p.deleteReason ? ` (${escapeHtml(p.deleteReason)})` : ""
          }</div>`
        : "";
      const authorLine = p.author ? `<div class="small postAuthor">${renderUserPill(p.author)}</div>` : "";
      const boostText = formatBoostRemaining(Number(p.boostUntil || 0));
      const boostLine = boostText ? `<div class="countdown boost" data-boost="${p.id}">boost ${boostText}</div>` : "";

      const canBoost = Boolean(loggedInUser && !p.locked && !p.deleted && p.author && loggedInUser !== p.author);
      const canManageOwnPost = Boolean(loggedInUser && !p.locked && !p.deleted && p.author && loggedInUser === p.author);
      const boostControls = canBoost
        ? `<div class="boostRow">
             <select data-boostsel="${p.id}">
               <option value="300000">+5m</option>
               <option value="900000">+15m</option>
               <option value="1800000">+30m</option>
               <option value="3600000" selected>+1h</option>
               <option value="7200000">+2h</option>
             </select>
             <button type="button" data-boostbtn="${p.id}">Boost</button>
           </div>`
        : "";

      const reactionsHtml = p.locked || p.deleted ? "" : renderReactionButtons({ kind: "post", id: p.id, reactions: p.reactions || {} });
      const isHidden = hiddenSet.has(p.id);
      const menuItems = `
        ${canManageOwnPost ? `<button type="button" class="ghost" data-editpost="${p.id}">Edit</button>` : ""}
        ${canManageOwnPost ? `<button type="button" class="ghost danger" data-deletepost="${p.id}">Delete</button>` : ""}
        ${loggedInUser ? `<button type="button" class="ghost" data-hidepost="${p.id}">${isHidden ? "Unhide" : "Hide"}</button>` : ""}
        ${loggedInUser && !p.deleted ? `<button type="button" class="ghost" data-reportpost="${p.id}">Report</button>` : ""}
      `.trim();
      const hasMenu = Boolean(menuItems);
      const kebabBtn = hasMenu
        ? `<button type="button" class="ghost smallBtn kebabBtn" data-postmenu="${p.id}" aria-haspopup="menu" aria-expanded="false" title="More">â‹¯</button>`
        : "";
      const postMenu = hasMenu
        ? `<div class="postMenu hidden" role="menu" data-postmenu-panel="${p.id}">${menuItems}</div>`
        : "";

      const unread = unreadByPostId.get(p.id) || 0;
      const unreadDot = unread ? `<span class="badgeDot" title="${unread} unread"></span>` : "";
      const unreadClass = unread ? " isUnread" : "";
      const newClass = newPostAnimIds.has(p.id) ? " isNew" : "";
      const buzzClass = buzzTimers.has(p.id) ? " isBuzz" : "";
      const lockLine = p.locked ? `<div class="small muted">🔒 password protected</div>` : "";
      const cardTint = p.author ? cardTintStylesFromHex(getProfile(p.author).color) : "";

      return `
      <article class="post${unreadClass}${newClass}${buzzClass}" data-id="${p.id}" ${cardTint}>
        <div class="postTop">
          <div class="postTitleRow">
            <div class="postTitle">${escapeHtml(postTitle(p))}</div>
            ${postedLine}
            ${authorLine}
            ${lockLine}
          </div>
          <div class="rightCol">
            ${unreadDot}
            <div class="countdown" data-countdown="${p.id}">${formatCountdown(p.expiresAt)}</div>
            ${boostLine}
            ${boostControls}
            <div class="postActionsRow">
              <button type="button" data-chat="${p.id}">${p.locked ? "Unlock" : p.deleted ? "View" : "Chat"}</button>
              ${kebabBtn}
              ${postMenu}
            </div>
          </div>
        </div>
        ${deletedLine}
        ${editedLine}
        <div class="postMeta">${collectionTag}${tags ? ` ${tags}` : ""}</div>
        ${reactionsHtml}
      </article>`;
    })
    .join("");
}

function setAuthUi() {
  if (loggedInUser) {
    userLabel.innerHTML = renderUserPill(loggedInUser);
    logoutBtn.classList.remove("hidden");
    const roleText = loggedInRole && loggedInRole !== "member" ? ` (${loggedInRole})` : "";
    authHint.textContent = `Signed in${roleText}. You can post, chat, and boost others.`;
  } else {
    userLabel.textContent = "Signed out";
    logoutBtn.classList.add("hidden");
    authHint.textContent = registrationEnabled
      ? "Sign in or create an account with the registration code."
      : canRegisterFirstUser
        ? "No users exist yet. Create the first user from this computer."
        : "Sign in to post, chat, and boost.";
  }
  applyInstanceAppearance();

  const canMakePermanent =
    Boolean(loggedInUser) &&
    (loggedInRole === "owner" || loggedInRole === "moderator" || Boolean(normalizeInstanceBranding(instanceBranding).allowMemberPermanentPosts));
  if (ttlMinutesEl) {
    ttlMinutesEl.min = canMakePermanent ? "0" : "1";
    if (!canMakePermanent && Number(ttlMinutesEl.value || 0) <= 0) ttlMinutesEl.value = "60";
  }

  codeRow.classList.toggle("hidden", !registrationEnabled);
  registerBtn.classList.toggle("hidden", !(registrationEnabled || canRegisterFirstUser));
  renderModPanel();
}

function roleLabel(role) {
  const r = String(role || "member");
  return r === "owner" || r === "moderator" ? r : "member";
}

function peopleOnlineCardStyle(member) {
  if (!member?.online) return "";
  const rgb = hexToRgb(member.color || "");
  if (!rgb) {
    return `style="border-color:rgba(255,62,165,0.35);box-shadow:0 10px 24px rgba(255,62,165,0.12);"`;
  }
  return `style="border-color:rgba(${rgb.r},${rgb.g},${rgb.b},0.45);background:linear-gradient(180deg, rgba(${rgb.r},${rgb.g},${rgb.b},0.13), rgba(${rgb.r},${rgb.g},${rgb.b},0.04) 55%), rgba(255,255,255,0.02);box-shadow:0 10px 24px rgba(${rgb.r},${rgb.g},${rgb.b},0.17);"`;
}

function renderPeoplePanel() {
  if (!peopleDrawerEl || !peopleListEl) return;
  ensurePeopleFallback();
  const membersTabOn = peopleTab === "members";
  peopleMembersTabBtn?.classList.toggle("primary", membersTabOn);
  peopleMembersTabBtn?.classList.toggle("ghost", !membersTabOn);
  peopleDmsTabBtn?.classList.toggle("primary", !membersTabOn);
  peopleDmsTabBtn?.classList.toggle("ghost", membersTabOn);
  peopleMembersViewEl?.classList.toggle("hidden", !membersTabOn);
  peopleDmsViewEl?.classList.toggle("hidden", membersTabOn);
  if (!membersTabOn) {
    if (!peopleDmsViewEl) return;
    if (!loggedInUser) {
      peopleDmsViewEl.innerHTML = `<div class="muted">Sign in to use DMs.</div>`;
      return;
    }

    const blockedSet = prefSet("blockedUsers");
    const eligibleMembers = peopleMembers
      .filter((m) => m?.username && String(m.username).toLowerCase() !== String(loggedInUser).toLowerCase())
      .filter((m) => !blockedSet.has(String(m.username || "").toLowerCase()))
      .map((m) => String(m.username))
      .sort((a, b) => a.localeCompare(b))
      .slice(0, 250);

    const picker =
      eligibleMembers.length > 0
        ? `<div class="dmNewRow">
            <select class="dmToSelect" data-dmto="1">
              <option value="">New DM…</option>
              ${eligibleMembers.map((u) => `<option value="${escapeHtml(u)}">@${escapeHtml(u)}</option>`).join("")}
            </select>
            <button type="button" class="primary" data-dmrequestfromselect="1">Request</button>
          </div>`
        : `<div class="muted">No other members yet.</div>`;

    const threads = Array.isArray(dmThreads) ? [...dmThreads].sort((a, b) => dmActivityAt(b) - dmActivityAt(a)) : [];
    const listHtml = threads.length
      ? threads
          .map((t) => {
            const other = String(t.other || "");
            const isBlocked = blockedSet.has(other.toLowerCase());
            const status = String(t.status || "unknown");
            const when = dmActivityAt(t);
            const whenTxt = when ? new Date(when).toLocaleString() : "";
            const statusBadge =
              status === "incoming"
                ? `<span class="tag dmTag dmTagIncoming">request</span>`
                : status === "outgoing"
                  ? `<span class="tag dmTag dmTagPending">pending</span>`
                  : status === "active"
                    ? `<span class="tag dmTag dmTagActive">active</span>`
                    : status === "declined"
                      ? `<span class="tag dmTag dmTagDeclined">declined</span>`
                      : `<span class="tag dmTag">unknown</span>`;

            const blockedBadge = isBlocked ? `<span class="tag dmTag dmTagDeclined">blocked</span>` : "";

            let actions =
              status === "incoming"
                ? `<div class="row" style="gap:8px;justify-content:flex-end">
                    <button type="button" class="primary smallBtn" data-dmaccept="${escapeHtml(t.id)}">Accept</button>
                    <button type="button" class="ghost smallBtn" data-dmdecline="${escapeHtml(t.id)}">Decline</button>
                  </div>`
                : status === "active"
                  ? `<button type="button" class="primary smallBtn" data-dmopen="${escapeHtml(t.id)}">Open</button>`
                  : status === "declined"
                    ? `<button type="button" class="ghost smallBtn" data-dmrequest="${escapeHtml(other)}">Request again</button>`
                    : `<span class="muted small">Waiting…</span>`;

            if (isBlocked) {
              actions =
                status === "active"
                  ? `<button type="button" class="primary smallBtn" data-dmopen="${escapeHtml(t.id)}" disabled>Open</button>`
                  : `<span class="muted small">Blocked</span>`;
            }

            return `<div class="dmThreadCard">
              <div class="dmThreadTop">
                <div class="dmThreadLeft">
                  ${renderUserPill(other)}
                  ${statusBadge}
                  ${blockedBadge}
                </div>
                <div class="dmThreadRight">${actions}</div>
              </div>
              <div class="small muted">${whenTxt ? `Last activity: ${escapeHtml(whenTxt)}` : "No messages yet."} <span class="muted">•</span> DMs purge daily.</div>
            </div>`;
          })
          .join("")
      : `<div class="muted">No DMs yet. Start one from the Members tab or a profile.</div>`;

    peopleDmsViewEl.innerHTML = `
      <div class="dmHeader">
        <div class="small muted">Private 1:1 chats (encrypted at rest). Incoming requests must be accepted.</div>
        ${picker}
      </div>
      <div class="dmThreadList">${listHtml}</div>
    `;
    return;
  }

  const q = (peopleSearchEl?.value || "").trim().toLowerCase();
  const list = peopleMembers
    .filter((m) => (q ? String(m.username || "").toLowerCase().includes(q) : true))
    .sort((a, b) => Number(Boolean(b.online)) - Number(Boolean(a.online)) || String(a.username).localeCompare(String(b.username)));

  if (!list.length) {
    peopleListEl.innerHTML = `<div class="muted">No members found.</div>`;
    return;
  }
  peopleListEl.innerHTML = list
    .map((m) => {
      const username = String(m.username || "");
      const status = String(m.status || (m.online ? "online" : "offline"));
      const role = roleLabel(m.role);
      const statusText = `${status}${m.online ? "" : ""}`;
      const cardStyle = peopleOnlineCardStyle(m);
      const canDm = Boolean(loggedInUser && username && String(username).toLowerCase() !== String(loggedInUser).toLowerCase());
      return `<div class="peopleCard" data-viewprofile="${escapeHtml(username)}" ${cardStyle}>
        <div class="peopleCardTop">
          <div>${renderUserPill(username)} <span class="modStatus">${escapeHtml(role)}</span></div>
          <div class="peopleStatus">${escapeHtml(statusText)}</div>
        </div>
        <div class="peopleCardActions">
          <button type="button" class="ghost smallBtn" data-viewprofile="${escapeHtml(username)}">Profile</button>
          <button type="button" class="ghost smallBtn" data-dmrequest="${escapeHtml(username)}" ${canDm ? "" : "disabled"}>DM</button>
        </div>
      </div>`;
    })
    .join("");
}

function statusBadge(status) {
  const s = String(status || "");
  if (!s) return `<span class="muted">-</span>`;
  return `<span class="modStatus">${escapeHtml(s)}</span>`;
}

function userStateText(user) {
  const t = Date.now();
  if (user.banned) return "banned";
  if (Number(user.suspendedUntil || 0) > t) return `suspended until ${new Date(user.suspendedUntil).toLocaleString()}`;
  if (Number(user.mutedUntil || 0) > t) return `muted until ${new Date(user.mutedUntil).toLocaleString()}`;
  return "active";
}

function promptReason(actionLabel) {
  const value = prompt(`Reason for ${actionLabel}:`);
  if (!value) return "";
  return value.trim();
}

function requestModData() {
  if (!canModerate) return;
  ws.send(JSON.stringify({ type: "modListUsers", limit: 200 }));
  ws.send(JSON.stringify({ type: "modListLog", limit: 200 }));
  ws.send(JSON.stringify({ type: "devLogList", limit: 300 }));
  const status = modReportStatusEl ? modReportStatusEl.value : "open";
  ws.send(JSON.stringify({ type: "modListReports", status, limit: 200 }));
}

function renderModPanel() {
  if (!modPanelEl || !modBodyEl) return;
  modPanelEl.classList.toggle("hidden", !canModerate);
  if (appRoot) appRoot.classList.toggle("hasMod", canModerate);
  if (mobileModBtn) mobileModBtn.classList.toggle("hidden", !canModerate);
  if (!canModerate) {
    modBodyEl.innerHTML = "";
    if (mobilePanel === "moderation") setMobilePanel("main");
    return;
  }
  if (modReportStatusEl) modReportStatusEl.classList.toggle("hidden", modTab !== "reports");

  const tabs = Array.from(modPanelEl.querySelectorAll("[data-modtab]"));
  for (const btn of tabs) {
    const on = btn.getAttribute("data-modtab") === modTab;
    btn.classList.toggle("primary", on);
    btn.classList.toggle("ghost", !on);
  }

  if (modTab === "server") {
    const isOwner = loggedInRole === "owner";
    const canEditAppearance = loggedInRole === "owner" || loggedInRole === "moderator";
    const b = normalizeInstanceBranding(instanceBranding);
    const a = b.appearance || {};
    const loading = Boolean(serverInfoStatus.loading);
    const err = String(serverInfoStatus.error || "");
    const info = serverInfo && typeof serverInfo === "object" ? serverInfo : null;
    const health = serverHealth && typeof serverHealth === "object" ? serverHealth : null;
    const stats = health?.stats && typeof health.stats === "object" ? health.stats : null;
    const rl = info?.config?.rateLimits && typeof info.config.rateLimits === "object" ? info.config.rateLimits : null;
    const updatedAt = serverInfoStatus.at ? formatLocalTime(serverInfoStatus.at) : "";

    const statusLine = loading
      ? `<span class="muted">Loading…</span>`
      : err
        ? `<span class="bad">${escapeHtml(err)}</span>`
        : updatedAt
          ? `<span class="muted">Updated: ${escapeHtml(updatedAt)}</span>`
          : `<span class="muted">Not loaded yet.</span>`;

    const fontBodyOptions = [
      { value: "system", label: "System (sans)" },
      { value: "serif", label: "Serif" },
      { value: "mono", label: "Monospace" },
    ]
      .map((o) => `<option value="${o.value}" ${a.fontBody === o.value ? "selected" : ""}>${escapeHtml(o.label)}</option>`)
      .join("");
    const fontMonoOptions = [
      { value: "mono", label: "Monospace" },
      { value: "system", label: "System" },
    ]
      .map((o) => `<option value="${o.value}" ${a.fontMono === o.value ? "selected" : ""}>${escapeHtml(o.label)}</option>`)
      .join("");

    const instanceOwnerControls = `<label>
           <span>Title</span>
           <input data-instance-title maxlength="32" value="${escapeHtml(b.title)}" />
         </label>
         <label>
           <span>Subtitle</span>
           <input data-instance-subtitle maxlength="80" value="${escapeHtml(b.subtitle)}" />
         </label>
         <label class="row" style="gap:10px; align-items:center">
           <input data-instance-allowpermanent type="checkbox" ${b.allowMemberPermanentPosts ? "checked" : ""} />
           <span>Allow members to create permanent hives</span>
         </label>`;

    const themePresetRow = `
         <div class="row" style="gap:10px">
           <label style="flex:1">
             <span>Theme preset</span>
             <select data-theme-preset>
               <option value="">(choose…)</option>
               ${THEME_PRESETS.map((p) => `<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)}</option>`).join("")}
             </select>
           </label>
           <div class="row" style="align-items:flex-end">
             <button type="button" class="ghost" data-theme-reset="1">Reset</button>
           </div>
         </div>
    `;

    const appearanceControls = `
         ${themePresetRow}
         <div class="row" style="gap:10px">
           <label style="flex:1">
             <span>Background</span>
             <input data-instance-bg type="color" value="${escapeHtml(a.bg || "#060611")}" />
           </label>
           <label style="flex:1">
             <span>Panel</span>
             <input data-instance-panel type="color" value="${escapeHtml(a.panel || "#0c0c18")}" />
           </label>
         </div>
         <div class="row" style="gap:10px">
           <label style="flex:1">
             <span>Text</span>
             <input data-instance-text type="color" value="${escapeHtml(a.text || "#f6f0ff")}" />
           </label>
           <label style="flex:1">
             <span>Success / Danger</span>
             <div class="row" style="gap:10px">
               <input data-instance-good type="color" value="${escapeHtml(a.good || "#3ddc97")}" />
               <input data-instance-bad type="color" value="${escapeHtml(a.bad || "#ff4d8a")}" />
             </div>
           </label>
         </div>
         <div class="row" style="gap:10px">
           <label style="flex:1">
             <span>Accent</span>
             <input data-instance-accent type="color" value="${escapeHtml(a.accent || "#ff3ea5")}" />
           </label>
           <label style="flex:1">
             <span>Accent 2</span>
             <input data-instance-accent2 type="color" value="${escapeHtml(a.accent2 || "#b84bff")}" />
           </label>
         </div>
         <div class="row" style="gap:10px">
           <label style="flex:1">
             <span>Muted %</span>
             <input data-instance-mutedpct type="number" min="0" max="100" value="${escapeHtml(String(a.mutedPct ?? 65))}" />
           </label>
           <label style="flex:1">
             <span>Divider %</span>
             <input data-instance-linepct type="number" min="0" max="100" value="${escapeHtml(String(a.linePct ?? 10))}" />
           </label>
           <label style="flex:1">
             <span>Panel tint %</span>
             <input data-instance-panel2pct type="number" min="0" max="100" value="${escapeHtml(String(a.panel2Pct ?? 2))}" />
           </label>
         </div>
         <div class="row" style="gap:10px">
           <label style="flex:1">
             <span>Body font</span>
             <select data-instance-fontbody>${fontBodyOptions}</select>
           </label>
           <label style="flex:1">
             <span>Mono font</span>
             <select data-instance-fontmono>${fontMonoOptions}</select>
           </label>
         </div>
    `;

    const instanceControls = isOwner
      ? `${instanceOwnerControls}
         ${appearanceControls}
         <div class="row" style="gap:8px">
           <button type="button" class="primary" data-instance-save="1">Save</button>
           <button type="button" class="ghost" data-server-refresh="1">Refresh server</button>
         </div>`
      : canEditAppearance
        ? `<div class="small muted">Owner-only: title/subtitle and permanent-hive setting.</div>
           <div class="small">Title: <b>${escapeHtml(b.title)}</b></div>
           <div class="small">Subtitle: <b>${escapeHtml(b.subtitle)}</b></div>
           <div class="small">Members can create permanent hives: <b>${b.allowMemberPermanentPosts ? "yes" : "no"}</b></div>
           <div class="panelDivider"></div>
           ${appearanceControls}
           <div class="row" style="gap:8px">
             <button type="button" class="primary" data-instance-saveappearance="1">Save theme</button>
             <button type="button" class="ghost" data-server-refresh="1">Refresh server</button>
           </div>`
        : `<div class="small muted">Only moderators can edit appearance. Only the owner can edit core instance settings.</div>
           <div class="small">Title: <b>${escapeHtml(b.title)}</b></div>
           <div class="small">Subtitle: <b>${escapeHtml(b.subtitle)}</b></div>
           <div class="small">Members can create permanent hives: <b>${b.allowMemberPermanentPosts ? "yes" : "no"}</b></div>
           <div class="row" style="gap:8px; margin-top:8px">
             <button type="button" class="ghost" data-server-refresh="1">Refresh server</button>
           </div>`;

    const serverLines = [
      info?.port ? `Port: ${Number(info.port)}` : "",
      typeof info?.registrationEnabled === "boolean" ? `Registration enabled: ${info.registrationEnabled ? "yes" : "no"}` : "",
      typeof health?.uptimeSec === "number" ? `Uptime: ${Math.floor(health.uptimeSec)}s` : "",
      typeof stats?.sockets === "number" ? `Sockets: ${Math.floor(stats.sockets)}` : "",
      typeof stats?.activePosts === "number" ? `Active hives: ${Math.floor(stats.activePosts)}` : "",
      typeof stats?.users === "number" ? `Users: ${Math.floor(stats.users)}` : "",
      typeof stats?.activeRateLimitBuckets === "number" ? `Active rate limit buckets: ${Math.floor(stats.activeRateLimitBuckets)}` : "",
    ].filter(Boolean);

    const rlLines = rl
      ? [
          `Mod actions: ${rl.mod?.max ?? "?"} / ${rl.mod?.windowMs ?? "?"}ms`,
          `Login: ${rl.login?.max ?? "?"} / ${rl.login?.windowMs ?? "?"}ms`,
          `Register: ${rl.register?.max ?? "?"} / ${rl.register?.windowMs ?? "?"}ms`,
          `Resume: ${rl.resume?.max ?? "?"} / ${rl.resume?.windowMs ?? "?"}ms`,
          `Reports: ${rl.report?.max ?? "?"} / ${rl.report?.windowMs ?? "?"}ms`,
        ]
      : [];

    modBodyEl.innerHTML = `
      <div class="modCard">
        <div class="modRowTop">
          <div><b>Server</b></div>
          <div class="small">${statusLine}</div>
        </div>
        <div class="small muted">Server status, appearance, and plugins.</div>
      </div>
      <div class="modCard">
        <div class="modRowTop"><div><b>Instance settings</b></div></div>
        <div class="modActions">${instanceControls}</div>
      </div>
      <div class="modCard">
        <div class="modRowTop"><div><b>Plugins</b></div></div>
        <div class="modActions">${renderPluginsAdminHtml()}</div>
      </div>
      <div class="modCard">
        <div class="modRowTop"><div><b>Runtime</b></div></div>
        <div class="small">${serverLines.length ? serverLines.map((x) => `<div>${escapeHtml(x)}</div>`).join("") : `<div class="muted">No data yet.</div>`}</div>
        ${
          rlLines.length
            ? `<div class="small muted" style="margin-top:10px">Rate limits</div>
               <div class="small">${rlLines.map((x) => `<div>${escapeHtml(x)}</div>`).join("")}</div>`
            : ""
        }
      </div>
    `;
    return;
  }

  if (modTab === "users") {
    const roleList = customRoles.length
      ? customRoles
          .map((r) => {
            const swatch = r.color ? `<span class="roleSwatch" style="background:${escapeHtml(r.color)}"></span>` : "";
            return `<div class="roleRow">
              <div class="roleRowLeft">
                ${swatch}
                <div class="roleMeta">
                  <div><b>${escapeHtml(r.label)}</b></div>
                  <div class="roleKey">${escapeHtml(r.key)}</div>
                </div>
              </div>
              <div class="row" style="gap:8px">
                <button type="button" class="ghost smallBtn" data-rolearchive="${escapeHtml(r.key)}">Archive</button>
              </div>
            </div>`;
          })
          .join("")
      : `<div class="muted">No custom roles yet.</div>`;

    const roleAdminCard = `<div class="modCard">
      <div class="modRowTop">
        <div><b>Custom roles</b></div>
      </div>
      <div class="roleCreateRow" style="margin-bottom:10px">
        <label>
          <span>Key</span>
          <input data-rolekey maxlength="18" placeholder="vip" />
        </label>
        <label>
          <span>Label</span>
          <input data-rolelabel maxlength="24" placeholder="VIP" />
        </label>
        <label>
          <span>Color</span>
          <input data-rolecolor type="color" value="#ff3ea5" />
        </label>
        <button type="button" data-rolecreate="1">Create</button>
      </div>
      <div class="small muted" style="margin-bottom:8px">Tip: gate collections with <span class="tag">member</span>, <span class="tag">moderator</span>, <span class="tag">owner</span>, or <span class="tag">role:yourkey</span>.</div>
      <div class="gateList">${roleList}</div>
    </div>`;
    if (!modUsers.length) {
      modBodyEl.innerHTML = `${roleAdminCard}<div class="muted">No users found.</div>`;
      return;
    }
    modBodyEl.innerHTML =
      roleAdminCard +
      modUsers
      .map((u) => {
        const role = u.role || "member";
        const status = userStateText(u);
        const canPromote = loggedInRole === "owner" && u.username !== loggedInUser;
        const canManageCustomRoles = canModerate && u.username !== loggedInUser;
        const canResetPassword =
          canModerate &&
          u.username !== loggedInUser &&
          role !== "owner" &&
          (role !== "moderator" || loggedInRole === "owner");
        const customBadges = renderCustomRoleBadges(u.username);
        return `<div class="modCard">
          <div class="modRowTop">
            <div><b>@${escapeHtml(u.username)}</b> ${statusBadge(role)}</div>
            <div class="muted">${escapeHtml(status)}</div>
          </div>
          <div class="small muted">custom roles: ${customBadges || `<span class="muted">(none)</span>`}</div>
          <div class="modActions">
            <button type="button" data-modaction="user_mute" data-targettype="user" data-targetid="${escapeHtml(u.username)}" data-minutes="30">Mute 30m</button>
            <button type="button" data-modaction="user_unmute" data-targettype="user" data-targetid="${escapeHtml(u.username)}">Unmute</button>
            <button type="button" data-modaction="user_suspend" data-targettype="user" data-targetid="${escapeHtml(u.username)}" data-minutes="120">Suspend 2h</button>
            <button type="button" data-modaction="user_unsuspend" data-targettype="user" data-targetid="${escapeHtml(u.username)}">Unsuspend</button>
            <button type="button" data-modaction="user_ban" data-targettype="user" data-targetid="${escapeHtml(u.username)}">Ban</button>
            <button type="button" data-modaction="user_unban" data-targettype="user" data-targetid="${escapeHtml(u.username)}">Unban</button>
            ${canResetPassword ? `<button type="button" data-modaction="user_password_reset" data-targettype="user" data-targetid="${escapeHtml(u.username)}">Reset password</button>` : ""}
            ${
              canPromote && role === "member"
                ? `<button type="button" data-modaction="user_role_set" data-targettype="user" data-targetid="${escapeHtml(
                    u.username
                  )}" data-role="moderator">Make mod</button>`
                : ""
            }
            ${
              canPromote && role === "moderator"
                ? `<button type="button" class="danger" data-modaction="user_role_set" data-targettype="user" data-targetid="${escapeHtml(
                    u.username
                  )}" data-role="member">Remove mod</button>`
                : ""
            }
            ${
              canManageCustomRoles
                ? `<button type="button" data-usermanageroles="${escapeHtml(u.username)}">Manage custom roles</button>`
                : ""
            }
          </div>
        </div>`;
      })
      .join("");
    return;
  }

  if (modTab === "hives") {
    const hives = Array.from(posts.values()).sort((a, b) => rankTime(b) - rankTime(a) || b.createdAt - a.createdAt);
    const collectionControls = canModerate
      ? `<div class="modCard">
           <div class="modRowTop">
             <div><b>Collections</b></div>
             <button type="button" data-createcollection="1">Create collection</button>
           </div>
           <div class="modActions">
             ${activeCollections()
               .map((c) => {
                 const canArchive = c.id !== "general";
                  const gateLabel =
                    c.visibility === "gated"
                      ? `gated: ${(c.allowedRoles || []).map((t) => roleTokenLabel(t)).join(", ") || "(none)"}`
                      : "public";
                  return `<span class="tag">/${escapeHtml(c.name)}</span>${
                    c.id !== "general"
                      ? `<button type="button" data-collectiongate="${escapeHtml(c.id)}">Gate…</button>
                         <button type="button" data-collectionpublic="${escapeHtml(c.id)}">Make public</button>`
                      : ""
                  }
                  <span class="small muted">${escapeHtml(gateLabel)}</span>${
                   canArchive
                     ? `<button type="button" data-archivecollection="${escapeHtml(c.id)}">Archive ${escapeHtml(c.name)}</button>`
                     : ""
                 }`;
               })
               .join(" ")}
           </div>
         </div>`
      : "";
    if (!hives.length) {
      modBodyEl.innerHTML = `${collectionControls}<div class="muted">No active hives.</div>`;
      return;
    }
    modBodyEl.innerHTML =
      collectionControls +
      hives
      .map((p) => {
        const title = postTitle(p);
        const author = p.author ? `@${p.author}` : "unknown";
        const collection = activeCollections().find((c) => c.id === p.collectionId)?.name || "General";
        const openReports = modReports.filter(
          (r) => r && r.status === "open" && (r.postId === p.id || (r.targetType === "post" && r.targetId === p.id))
        ).length;
        return `<div class="modCard">
          <div class="modRowTop">
            <div><b>${escapeHtml(title)}</b></div>
            <div class="muted">${formatCountdown(p.expiresAt)}</div>
          </div>
          <div class="small">author: ${escapeHtml(author)} | collection: /${escapeHtml(collection)} | id: ${escapeHtml(p.id)}</div>
          <div class="small muted">open reports: ${openReports}</div>
          <div class="modActions">
            <button type="button" data-chat="${p.id}">Open chat</button>
            <button type="button" data-modaction="post_ttl_set" data-targettype="post" data-targetid="${escapeHtml(
              p.id
            )}" data-ttl="0">Permanent</button>
            <button type="button" data-modaction="post_ttl_set" data-targettype="post" data-targetid="${escapeHtml(
              p.id
            )}" data-ttl="60">TTL 1h</button>
            <button type="button" data-modaction="post_ttl_set" data-targettype="post" data-targetid="${escapeHtml(
              p.id
            )}" data-ttl="1440">TTL 1d</button>
            <button type="button" data-modaction="post_ttl_set" data-targettype="post" data-targetid="${escapeHtml(
              p.id
            )}" data-ttlprompt="1">Set TTL…</button>
            ${
              p.readOnly
                ? `<button type="button" data-modaction="post_readonly_set" data-targettype="post" data-targetid="${escapeHtml(
                    p.id
                  )}" data-readonly="0">Make writable</button>`
                : `<button type="button" data-modaction="post_readonly_set" data-targettype="post" data-targetid="${escapeHtml(
                    p.id
                  )}" data-readonly="1">Read-only</button>`
            }
            ${
              p.protected
                ? `<button type="button" data-modaction="post_protection_set" data-targettype="post" data-targetid="${escapeHtml(
                    p.id
                  )}" data-unprotect="1">Unprotect</button>
                   <button type="button" data-modaction="post_protection_set" data-targettype="post" data-targetid="${escapeHtml(
                     p.id
                   )}" data-protect="1">Change password…</button>`
                : `<button type="button" data-modaction="post_protection_set" data-targettype="post" data-targetid="${escapeHtml(
                    p.id
                  )}" data-protect="1">Protect…</button>`
            }
            <button type="button" data-modaction="message_purge_recent" data-targettype="post" data-targetid="${escapeHtml(
              p.id
            )}" data-count="25">Purge 25 msgs</button>
            <button type="button" data-modaction="message_purge_recent" data-targettype="post" data-targetid="${escapeHtml(
              p.id
            )}" data-count="50">Purge 50 msgs</button>
            ${
              p.deleted
                ? `<button type="button" data-modaction="post_restore" data-targettype="post" data-targetid="${escapeHtml(
                    p.id
                  )}" ${p.restoreAvailable ? "" : "disabled"}>${p.restoreAvailable ? "Restore hive" : "No restore snapshot"}</button>`
                : `<button type="button" data-modaction="post_delete" data-targettype="post" data-targetid="${escapeHtml(
                    p.id
                  )}">Delete hive</button>`
            }
            <button type="button" class="danger" data-modaction="post_erase" data-targettype="post" data-targetid="${escapeHtml(
              p.id
            )}">Erase</button>
          </div>
        </div>`;
      })
      .join("");
    return;
  }

  if (modTab === "log") {
    const isOwner = loggedInRole === "owner";
    const viewTabs = `
      <div class="row" style="gap:10px; flex-wrap:wrap; margin-bottom:10px;">
        <button type="button" class="${modLogView === "dev" ? "primary" : "ghost"} smallBtn" data-modlogview="dev">Server dev log</button>
        <button type="button" class="${modLogView === "moderation" ? "primary" : "ghost"} smallBtn" data-modlogview="moderation">Moderation log</button>
      </div>
    `;
    const nukeCard = isOwner
      ? `<div class="modCard">
           <div class="modRowTop">
             <div><b>NUKE</b></div>
             <button type="button" class="danger" data-nuke="1" disabled>NUKE</button>
           </div>
           <div class="small muted" style="margin-bottom:10px">Clears all hives, reports, moderation log, and hive media uploads. Keeps users + profiles.</div>
           <label class="row small" style="gap:10px;align-items:center;justify-content:flex-start">
             <input type="checkbox" data-nukeconfirm="1" />
             <span>ARE YOU SURE?</span>
           </label>
          </div>`
      : "";

    if (modLogView === "dev") {
      const lines = devLog
        .slice(0, 300)
        .reverse()
        .map((e) => {
          const ts = e?.createdAt ? new Date(e.createdAt).toLocaleString() : "";
          const lvl = String(e?.level || "info").toUpperCase();
          const scope = String(e?.scope || "server");
          const msg = String(e?.message || "");
          const data = String(e?.data || "");
          const extra = data ? ` ${data}` : "";
          return `[${ts}] ${lvl} ${scope}: ${msg}${extra}`;
        })
        .join("\n");

      modBodyEl.innerHTML = `
        ${viewTabs}
        <div class="modCard">
          <div class="modRowTop">
            <div><b>Dev log</b></div>
            <div class="row" style="gap:10px; flex-wrap:wrap; justify-content:flex-end">
              <button type="button" class="ghost smallBtn" data-devlogrefresh="1">Refresh</button>
              <button type="button" class="ghost smallBtn" data-devlogcopy="1">Copy</button>
              ${isOwner ? `<button type="button" class="danger smallBtn" data-devlogclear="1">Clear</button>` : ""}
            </div>
          </div>
          <label class="row small muted" style="gap:10px; align-items:center; justify-content:flex-start; margin-bottom:10px;">
            <input type="checkbox" data-devlogautoscroll="1" ${devLogAutoScroll ? "checked" : ""} />
            <span>Auto-scroll</span>
            <button type="button" class="ghost smallBtn" data-devlogtest="1" style="margin-left:auto;">Test log</button>
          </label>
          <pre class="devLogPre" id="devLogPre">${escapeHtml(lines || "(empty)")}</pre>
        </div>
      `;

      const pre = document.getElementById("devLogPre");
      if (pre && devLogAutoScroll) pre.scrollTop = pre.scrollHeight;
      return;
    }

    if (!modLog.length) {
      modBodyEl.innerHTML = `${viewTabs}${nukeCard}<div class="muted">No moderation log entries yet.</div>`;
      return;
    }
    modBodyEl.innerHTML =
      viewTabs +
      nukeCard +
      modLog
        .map(
          (entry) => `<div class="modCard">
        <div class="modRowTop">
          <div><b>${escapeHtml(entry.actionType || "action")}</b> ${statusBadge(entry.targetType || "")}</div>
          <div class="muted">${new Date(entry.createdAt).toLocaleString()}</div>
        </div>
        <div class="small">by @${escapeHtml(entry.actor || "unknown")} on ${escapeHtml(entry.targetId || "(none)")}</div>
        <div class="small muted">${escapeHtml(entry.reason || "")}</div>
        ${
          entry?.metadata?.beforePreview || entry?.metadata?.beforeText
            ? `<div class="small muted">content: ${escapeHtml(entry.metadata.beforePreview || entry.metadata.beforeText || "")}</div>`
            : ""
        }
        ${
          entry?.metadata?.editCount
            ? `<div class="small muted">edits: ${escapeHtml(String(entry.metadata.editCount))}</div>`
            : ""
        }
        ${
          entry?.targetType === "post" && (entry?.actionType === "post_delete" || entry?.actionType === "self_post_delete")
            ? `<div class="modActions">
                 <button type="button" data-modaction="post_restore" data-targettype="post" data-targetid="${escapeHtml(
                   entry.targetId || ""
                 )}">Restore hive</button>
               </div>`
            : ""
        }
        ${
          entry?.targetType === "chat" &&
          (entry?.actionType === "message_delete" || entry?.actionType === "self_message_delete")
            ? `<div class="modActions">
                 <button type="button" data-modaction="message_restore" data-targettype="chat" data-targetid="${escapeHtml(
                   entry.targetId || ""
                 )}">Restore message</button>
               </div>`
            : ""
        }
      </div>`
        )
        .join("");
    return;
  }

  if (!modReports.length) {
    modBodyEl.innerHTML = `<div class="muted">No reports for this filter.</div>`;
    return;
  }
  modBodyEl.innerHTML = modReports
    .map((r) => {
      const status = r.status || "open";
      const canAct = status === "open";
      return `<div class="modCard">
        <div class="modRowTop">
          <div><b>${escapeHtml(r.targetType || "target")}</b> ${statusBadge(status)}</div>
          <div class="muted">${new Date(r.createdAt).toLocaleString()}</div>
        </div>
        <div class="small">target: ${escapeHtml(r.targetId || "")}</div>
        <div class="small">reporter: @${escapeHtml(r.reporter || "")}</div>
        <div class="small muted">${escapeHtml(r.reason || "")}</div>
        ${
          canAct
            ? `<div class="modActions">
                <button type="button" data-modaction="report_resolve" data-targettype="report" data-targetid="${escapeHtml(r.id)}">Resolve</button>
                <button type="button" data-modaction="report_dismiss" data-targettype="report" data-targetid="${escapeHtml(r.id)}">Dismiss</button>
              </div>`
            : ""
        }
      </div>`;
    })
    .join("");
}

function renderChatPanel(forceScroll = false) {
  if (activeDmThreadId) {
    const thread = dmThreadsById.get(activeDmThreadId) || null;
    if (!thread) {
      activeDmThreadId = null;
    } else {
      const atBottomBefore =
        chatMessagesEl.scrollHeight - chatMessagesEl.scrollTop - chatMessagesEl.clientHeight < 24;
      chatTitle.textContent = "DM";
      const status = String(thread.status || "unknown");
      const statusTxt =
        status === "incoming"
          ? "DM request (accept to chat)"
          : status === "outgoing"
            ? "DM request pending"
            : status === "declined"
              ? "DM request declined"
              : "Private chat";
      chatMeta.textContent = `with @${thread.other} | ${statusTxt} | purged daily`;

      const messages = dmMessagesByThreadId.get(activeDmThreadId) || [];
      if (status !== "active" && messages.length === 0) {
        const promptHtml =
          status === "incoming"
            ? `<div class="row" style="gap:8px;justify-content:flex-start">
                <button type="button" class="primary smallBtn" data-dmaccept="${escapeHtml(thread.id)}">Accept</button>
                <button type="button" class="ghost smallBtn" data-dmdecline="${escapeHtml(thread.id)}">Decline</button>
              </div>`
            : status === "declined"
              ? `<button type="button" class="ghost smallBtn" data-dmrequest="${escapeHtml(thread.other)}">Request again</button>`
              : `<div class="muted">Waiting for @${escapeHtml(thread.other)}…</div>`;
        chatMessagesEl.innerHTML = `<div class="small muted">${promptHtml}</div>`;
        setReplyToMessage(null);
        return;
      }

      chatMessagesEl.innerHTML = messages
        .map((m, index) => {
          const from = m.fromUser || "";
          const isYou = loggedInUser && from && from === loggedInUser;
          const prev = index > 0 ? messages[index - 1] : null;
          const sameAuthorAsPrev = Boolean(prev && String(prev.fromUser || "") === from);
          const who = isYou ? `<span>you</span>` : renderUserPill(from || "");
          const time = new Date(m.createdAt).toLocaleTimeString();
          const tint = tintStylesFromHex(getProfile(from).color);
          const html = typeof m.html === "string" && m.html.trim() ? m.html : "";
          const content = html ? html : highlightMentionsInText(m.text || "");
          return `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""}" data-msgid="${escapeHtml(m.id)}" ${tint}>
            <div class="meta"><span class="chatHeaderInline">${who}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
            <div class="content">${content}</div>
          </div>`;
        })
        .join("");
      for (const contentEl of chatMessagesEl.querySelectorAll(".chatMsg .content")) {
        decorateMentionNodesInElement(contentEl);
        decorateYouTubeEmbedsInElement(contentEl);
      }
      if (forceScroll || atBottomBefore) chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
      return;
    }
  }

  const post = activeChatPostId ? posts.get(activeChatPostId) : null;
  if (!post) {
    chatTitle.textContent = "Chat";
    chatMeta.textContent = "Select a post to chat.";
    if (chatPanelEl) chatPanelEl.classList.remove("walkie");
    if (walkieBarEl) walkieBarEl.classList.add("hidden");
    if (chatForm) chatForm.classList.remove("hidden");
    chatMessagesEl.innerHTML = `<div class="small muted">No chat selected.</div>`;
    setReplyToMessage(null);
    return;
  }

  const isWalkie = String(post.mode || post.chatMode || "").toLowerCase() === "walkie";
  if (chatPanelEl) chatPanelEl.classList.toggle("walkie", isWalkie);
  if (walkieBarEl) walkieBarEl.classList.toggle("hidden", !isWalkie);
  if (chatForm) chatForm.classList.toggle("hidden", isWalkie);
  if (walkieRecordBtn) walkieRecordBtn.disabled = !(isWalkie && loggedInUser);
  if (isWalkie && walkieStatusEl && !loggedInUser) walkieStatusEl.textContent = "Sign in to talk.";
  if (!isWalkie && walkieStatusEl) walkieStatusEl.textContent = "";

  const atBottomBefore =
    chatMessagesEl.scrollHeight - chatMessagesEl.scrollTop - chatMessagesEl.clientHeight < 24;
  chatTitle.textContent = "Chat";
  const tags = (post.keywords || []).map((k) => `#${k}`).join(" ");
  const author = post.author ? `by @${post.author}` : "";
  const exp = formatCountdown(post.expiresAt);
  const ro = post.readOnly ? " | read-only" : "";
  chatMeta.textContent = `${author}${isWalkie ? " | walkie talkie" : ""}${ro} | ${exp === "permanent" ? "permanent" : `expires in ${exp}`} | ${tags}`.trim();
  const canChatWrite = Boolean(loggedInRole === "owner" || loggedInRole === "moderator" || !post.readOnly);
  if (chatEditor) chatEditor.contentEditable = String(Boolean(canChatWrite && !isWalkie));
  const chatSendBtn = chatForm?.querySelector?.("button[type='submit']") || null;
  if (chatSendBtn) chatSendBtn.disabled = !(loggedInUser && canChatWrite && !isWalkie);
  if (post.deleted) {
    chatMessagesEl.innerHTML = `<div class="small muted">Post was deleted.</div>`;
    setReplyToMessage(null);
    return;
  }

  const messages = chatByPost.get(post.id) || [];
  const ignoreUserSet = new Set(
    [...prefSet("ignoredUsers").values(), ...prefSet("blockedUsers").values()].map((u) => String(u).toLowerCase())
  );
  const selfLower = String(loggedInUser || "").toLowerCase();
  const visibleMessages = messages.filter((m) => {
    const fromLower = String(m?.fromUser || "").toLowerCase();
    if (!fromLower || fromLower === selfLower) return true;
    return !ignoreUserSet.has(fromLower);
  });

  chatMessagesEl.innerHTML = visibleMessages
    .map((m, index) => {
      const from = m.fromUser || "";
      const isYou = loggedInUser && from && from === loggedInUser;
      const prev = index > 0 ? visibleMessages[index - 1] : null;
      const sameAuthorAsPrev = Boolean(prev && String(prev.fromUser || "") === from);
      const mentions = Array.isArray(m.mentions) ? m.mentions.map((u) => String(u || "").toLowerCase()) : [];
      const mentionMe = Boolean(loggedInUser && mentions.includes(loggedInUser));
      const who = isYou ? `<span>you</span>` : renderUserPill(from || "");
      const time = new Date(m.createdAt).toLocaleTimeString();
      const tint = tintStylesFromHex(getProfile(from).color);
      const html = typeof m.html === "string" && m.html.trim() ? m.html : "";
      const content = html ? html : highlightMentionsInText(m.text || "");
      const replyMeta = m.replyTo && typeof m.replyTo === "object" ? m.replyTo : null;
      const replyBlock = replyMeta
        ? `<div class="chatReplyRef"><span class="small muted">@${escapeHtml(replyMeta.fromUser || "unknown")}</span><div class="small">${escapeHtml(
            String(replyMeta.text || "[media]").slice(0, 120)
          )}</div></div>`
        : "";
      const reacts = renderReactionButtons({ kind: "chat", id: m.id, reactions: m.reactions || {}, postId: post.id });
      const deletedLine = m.deleted
        ? `<div class="small muted">message deleted${
            m.deletedBy ? ` by @${escapeHtml(m.deletedBy)}` : ""
          } at ${escapeHtml(new Date(Number(m.deletedAt || m.createdAt || Date.now())).toLocaleString())}</div>`
        : "";
      const editedLine =
        !m.deleted && Number(m.editCount || 0) > 0
          ? `<div class="small muted">edited (${Number(m.editCount || 0)}) at ${escapeHtml(
              new Date(Number(m.editedAt || m.createdAt || Date.now())).toLocaleTimeString()
            )}</div>`
          : "";
      const reportAction = loggedInUser && !m.deleted
        ? `<button type="button" class="ghost smallBtn" data-reportchat="${escapeHtml(m.id)}" data-postid="${escapeHtml(
            post.id
          )}">Report</button>`
        : "";
      const canManageOwnMessage = Boolean(loggedInUser && m.fromUser && m.fromUser === loggedInUser && !m.deleted);
      const replyAction = loggedInUser && !m.deleted
        ? `<button type="button" class="ghost smallBtn" data-replymsg="${escapeHtml(m.id)}" data-postid="${escapeHtml(post.id)}">Reply</button>`
        : "";
      const ownEditAction = canManageOwnMessage
        ? `<button type="button" class="ghost smallBtn" data-editmsg="${escapeHtml(m.id)}" data-postid="${escapeHtml(post.id)}">Edit</button>`
        : "";
      const ownDeleteAction = canManageOwnMessage
        ? `<button type="button" class="ghost smallBtn" data-deletemsg="${escapeHtml(m.id)}" data-postid="${escapeHtml(post.id)}">Delete</button>`
        : "";
      return `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""} ${mentionMe ? "mentionMe" : ""}" data-msgid="${escapeHtml(m.id)}" ${tint}>
        <div class="meta"><span class="chatHeaderInline">${who}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
        ${replyBlock}
        ${deletedLine}
        ${editedLine}
        <div class="content">${content}</div>
        <div class="chatActionsRow">
          <div class="chatReactions">${m.deleted ? "" : reacts}</div>
          <div class="chatTools">${replyAction}${ownEditAction}${ownDeleteAction}${reportAction}</div>
        </div>
      </div>`;
    })
    .join("");
  for (const contentEl of chatMessagesEl.querySelectorAll(".chatMsg .content")) {
    decorateMentionNodesInElement(contentEl);
    decorateYouTubeEmbedsInElement(contentEl);
  }
  if (forceScroll || atBottomBefore) chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function appendChatHtmlAndDecorate(html, atBottomBefore) {
  if (!chatMessagesEl) return null;
  chatMessagesEl.insertAdjacentHTML("beforeend", html);
  const last = chatMessagesEl.lastElementChild;
  if (last && last.classList && last.classList.contains("chatMsg")) {
    const contentEl = last.querySelector(".content");
    if (contentEl) {
      decorateMentionNodesInElement(contentEl);
      decorateYouTubeEmbedsInElement(contentEl);
    }
  }
  if (atBottomBefore) chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  return last;
}

function appendPostChatMessageToDom(postId, message) {
  if (!chatMessagesEl) return false;
  const post = postId ? posts.get(postId) : null;
  if (!post || post.deleted) return false;
  if (!activeChatPostId || activeChatPostId !== postId) return false;
  if (activeDmThreadId) return false;
  if (!chatMessagesEl.querySelector(".chatMsg")) return false;

  const atBottomBefore =
    chatMessagesEl.scrollHeight - chatMessagesEl.scrollTop - chatMessagesEl.clientHeight < 24;

  const ignoreUserSet = new Set(
    [...prefSet("ignoredUsers").values(), ...prefSet("blockedUsers").values()].map((u) => String(u).toLowerCase())
  );
  const selfLower = String(loggedInUser || "").toLowerCase();

  const messages = chatByPost.get(postId) || [];
  let prevVisible = null;
  for (let i = messages.length - 2; i >= 0; i -= 1) {
    const pm = messages[i];
    const fromLower = String(pm?.fromUser || "").toLowerCase();
    if (!fromLower || fromLower === selfLower || !ignoreUserSet.has(fromLower)) {
      prevVisible = pm;
      break;
    }
  }

  const m = message;
  const from = m?.fromUser || "";
  const isYou = loggedInUser && from && from === loggedInUser;
  const sameAuthorAsPrev = Boolean(prevVisible && String(prevVisible.fromUser || "") === from);
  const mentions = Array.isArray(m?.mentions) ? m.mentions.map((u) => String(u || "").toLowerCase()) : [];
  const mentionMe = Boolean(loggedInUser && mentions.includes(loggedInUser));
  const who = isYou ? `<span>you</span>` : renderUserPill(from || "");
  const time = new Date(m.createdAt).toLocaleTimeString();
  const tint = tintStylesFromHex(getProfile(from).color);
  const html = typeof m.html === "string" && m.html.trim() ? m.html : "";
  const content = html ? html : highlightMentionsInText(m.text || "");
  const replyMeta = m.replyTo && typeof m.replyTo === "object" ? m.replyTo : null;
  const replyBlock = replyMeta
    ? `<div class="chatReplyRef"><span class="small muted">@${escapeHtml(replyMeta.fromUser || "unknown")}</span><div class="small">${escapeHtml(
        String(replyMeta.text || "[media]").slice(0, 120)
      )}</div></div>`
    : "";
  const reacts = renderReactionButtons({ kind: "chat", id: m.id, reactions: m.reactions || {}, postId });
  const deletedLine = m.deleted
    ? `<div class="small muted">message deleted${m.deletedBy ? ` by @${escapeHtml(m.deletedBy)}` : ""} at ${escapeHtml(
        new Date(Number(m.deletedAt || m.createdAt || Date.now())).toLocaleString()
      )}</div>`
    : "";
  const editedLine =
    !m.deleted && Number(m.editCount || 0) > 0
      ? `<div class="small muted">edited (${Number(m.editCount || 0)}) at ${escapeHtml(
          new Date(Number(m.editedAt || m.createdAt || Date.now())).toLocaleTimeString()
        )}</div>`
      : "";
  const reportAction =
    loggedInUser && !m.deleted
      ? `<button type="button" class="ghost smallBtn" data-reportchat="${escapeHtml(m.id)}" data-postid="${escapeHtml(postId)}">Report</button>`
      : "";
  const canManageOwnMessage = Boolean(loggedInUser && m.fromUser && m.fromUser === loggedInUser && !m.deleted);
  const replyAction =
    loggedInUser && !m.deleted
      ? `<button type="button" class="ghost smallBtn" data-replymsg="${escapeHtml(m.id)}" data-postid="${escapeHtml(postId)}">Reply</button>`
      : "";
  const ownEditAction = canManageOwnMessage
    ? `<button type="button" class="ghost smallBtn" data-editmsg="${escapeHtml(m.id)}" data-postid="${escapeHtml(postId)}">Edit</button>`
    : "";
  const ownDeleteAction = canManageOwnMessage
    ? `<button type="button" class="ghost smallBtn" data-deletemsg="${escapeHtml(m.id)}" data-postid="${escapeHtml(postId)}">Delete</button>`
    : "";

  const msgHtml = `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""} ${mentionMe ? "mentionMe" : ""}" data-msgid="${escapeHtml(
    m.id
  )}" ${tint}>
        <div class="meta"><span class="chatHeaderInline">${who}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
        ${replyBlock}
        ${deletedLine}
        ${editedLine}
        <div class="content">${content}</div>
        <div class="chatActionsRow">
          <div class="chatReactions">${m.deleted ? "" : reacts}</div>
          <div class="chatTools">${replyAction}${ownEditAction}${ownDeleteAction}${reportAction}</div>
        </div>
      </div>`;

  appendChatHtmlAndDecorate(msgHtml, atBottomBefore);
  return true;
}

function appendDmMessageToDom(threadId, message) {
  if (!chatMessagesEl) return false;
  if (!activeDmThreadId || activeDmThreadId !== threadId) return false;
  if (!chatMessagesEl.querySelector(".chatMsg")) return false;
  const thread = dmThreadsById.get(threadId) || null;
  if (!thread || String(thread.status || "unknown") !== "active") return false;

  const atBottomBefore =
    chatMessagesEl.scrollHeight - chatMessagesEl.scrollTop - chatMessagesEl.clientHeight < 24;

  const messages = dmMessagesByThreadId.get(threadId) || [];
  const prev = messages.length >= 2 ? messages[messages.length - 2] : null;

  const m = message;
  const from = m.fromUser || "";
  const isYou = loggedInUser && from && from === loggedInUser;
  const sameAuthorAsPrev = Boolean(prev && String(prev.fromUser || "") === from);
  const who = isYou ? `<span>you</span>` : renderUserPill(from || "");
  const time = new Date(m.createdAt).toLocaleTimeString();
  const tint = tintStylesFromHex(getProfile(from).color);
  const html = typeof m.html === "string" && m.html.trim() ? m.html : "";
  const content = html ? html : highlightMentionsInText(m.text || "");

  const msgHtml = `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""}" data-msgid="${escapeHtml(m.id)}" ${tint}>
            <div class="meta"><span class="chatHeaderInline">${who}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
            <div class="content">${content}</div>
          </div>`;

  appendChatHtmlAndDecorate(msgHtml, atBottomBefore);
  return true;
}

function pulseChatMessage(messageId) {
  if (!chatMessagesEl) return;
  const id = String(messageId || "");
  if (!id) return;
  const el = chatMessagesEl.querySelector(`[data-msgid="${cssEscape(id)}"]`);
  if (!el) return;
  el.classList.add("isNewMsg");
  window.setTimeout(() => el.classList.remove("isNewMsg"), 720);
}

function updateActiveChatMeta() {
  if (activeDmThreadId) return;
  const post = activeChatPostId ? posts.get(activeChatPostId) : null;
  if (!post) return;
  const tags = (post.keywords || []).map((k) => `#${k}`).join(" ");
  const author = post.author ? `by @${post.author}` : "";
  const exp = formatCountdown(post.expiresAt);
  chatMeta.textContent = `${author} | ${exp === "permanent" ? "permanent" : `expires in ${exp}`} | ${tags}`.trim();
}

function openDmThread(threadId) {
  const id = String(threadId || "").trim();
  if (!id) return;
  const thread = dmThreadsById.get(id) || null;
  if (!thread) {
    toast("DMs", "Thread not found.");
    return;
  }
  if (activeChatPostId) ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
  activeChatPostId = null;
  activeDmThreadId = id;
  setReplyToMessage(null);
  ws.send(JSON.stringify({ type: "dmHistory", threadId: id }));
  renderChatPanel(true);
  if (isMobileSwipeMode()) setMobilePanel("chat");
  chatEditor.focus();
}

function openChat(postId) {
  activeDmThreadId = null;
  stopWalkieRecording();
  const post = posts.get(postId);
  if (!post) return;
  if (post.deleted) {
    activeChatPostId = postId;
    renderChatPanel(true);
    if (isMobileSwipeMode()) setMobilePanel("chat");
    return;
  }
  if (post.locked) {
    unlockPostFlow(postId, true);
    return;
  }
  if (activeChatPostId && activeChatPostId !== postId) {
    ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
    setReplyToMessage(null);
  }
  activeChatPostId = postId;
  markRead(postId);
  renderFeed();
  ws.send(JSON.stringify({ type: "getChat", postId }));
  renderChatPanel(true);
  renderTypingIndicator();
  if (isMobileSwipeMode()) setMobilePanel("chat");
  chatEditor.focus();
}

let pendingOpenChatAfterUnlock = null;
function unlockPostFlow(postId, openChatAfter) {
  const pw = prompt("Password for this post:");
  if (!pw) return;
  pendingOpenChatAfterUnlock = openChatAfter ? postId : null;
  ws.send(JSON.stringify({ type: "unlockPost", postId, password: pw }));
}

function runCmd(target, cmd) {
  target.focus();
  document.execCommand(cmd);
}

function runLink(target) {
  target.focus();
  const url = prompt("Link URL (https://...)");
  if (!url) return;
  document.execCommand("createLink", false, url);
}

function runEmoji(target) {
  target.focus();
  const raw = prompt("Emoji to insert (example: 😀🔥💖)");
  const emoji = String(raw || "").trim();
  if (!emoji) return;
  document.execCommand("insertText", false, emoji);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function resizeImageToSquareDataUrl(file, sizePx) {
  const dataUrl = await readFileAsDataUrl(file);
  const img = new Image();
  img.src = dataUrl;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = sizePx;
  canvas.height = sizePx;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const side = Math.min(img.width, img.height);
  const sx = Math.floor((img.width - side) / 2);
  const sy = Math.floor((img.height - side) / 2);
  ctx.drawImage(img, sx, sy, side, side, 0, 0, sizePx, sizePx);
  // Preserve transparency for avatars (JPEG strips alpha).
  const webp = canvas.toDataURL("image/webp", 0.9);
  if (typeof webp === "string" && webp.startsWith("data:image/webp")) return webp;
  return canvas.toDataURL("image/png");
}

async function uploadMediaFile(file, kind) {
  if (!file) return "";
  const maxBytes = kind === "audio" ? CLIENT_AUDIO_UPLOAD_MAX_BYTES : CLIENT_IMAGE_UPLOAD_MAX_BYTES;
  if (file.size > maxBytes) {
    toast("File too large", `${kind === "audio" ? "Audio" : "Image"} is too large for this server.`);
    return "";
  }
  const token = getSessionToken();
  if (!token) {
    toast("Sign in required", "Please sign in before uploading files.");
    return "";
  }
  const loweredName = String(file.name || "").toLowerCase();
  let contentType = (file.type || "").toLowerCase();
  if (!contentType) {
    if (kind === "image") {
      if (loweredName.endsWith(".gif")) contentType = "image/gif";
      else if (loweredName.endsWith(".png")) contentType = "image/png";
      else if (loweredName.endsWith(".webp")) contentType = "image/webp";
      else if (loweredName.endsWith(".jpg") || loweredName.endsWith(".jpeg")) contentType = "image/jpeg";
    } else if (kind === "audio") {
      if (loweredName.endsWith(".mp3")) contentType = "audio/mpeg";
      else if (loweredName.endsWith(".wav")) contentType = "audio/wav";
      else if (loweredName.endsWith(".ogg")) contentType = "audio/ogg";
      else if (loweredName.endsWith(".webm")) contentType = "audio/webm";
      else if (loweredName.endsWith(".aac")) contentType = "audio/aac";
      else if (loweredName.endsWith(".m4a") || loweredName.endsWith(".mp4")) contentType = "audio/mp4";
    }
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": contentType || "application/octet-stream"
  };
  try {
    const res = await fetch(`/api/upload?kind=${encodeURIComponent(kind)}`, {
      method: "POST",
      headers,
      body: file
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast("Upload failed", payload?.error || "Upload failed.");
      return "";
    }
    if (!payload?.url) {
      toast("Upload failed", "Server did not return a media URL.");
      return "";
    }
    return String(payload.url);
  } catch {
    toast("Upload failed", "Network error while uploading file.");
    return "";
  }
}

async function ensureWalkieContext() {
  if (walkieCtx) return walkieCtx;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  walkieCtx = ctx;
  return ctx;
}

async function ensureWalkieDispatchBuffer() {
  if (walkieDispatchBuffer) return walkieDispatchBuffer;
  const ctx = await ensureWalkieContext();
  try {
    const res = await fetch("/assets/walkie/dispatch.mp3");
    const arr = await res.arrayBuffer();
    walkieDispatchBuffer = await ctx.decodeAudioData(arr);
    return walkieDispatchBuffer;
  } catch {
    walkieDispatchBuffer = null;
    return null;
  }
}

async function ensureWalkieGraph() {
  const ctx = await ensureWalkieContext();
  if (walkieMixNode && walkieDestNode) return { ctx, mix: walkieMixNode, dest: walkieDestNode };

  if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== "function") {
    throw new Error("Microphone is not supported in this browser.");
  }
  const host = String(location.hostname || "").toLowerCase();
  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.startsWith("192.168.") ||
    host.startsWith("10.") ||
    host.startsWith("172.16.") ||
    host.startsWith("172.17.") ||
    host.startsWith("172.18.") ||
    host.startsWith("172.19.") ||
    host.startsWith("172.20.") ||
    host.startsWith("172.21.") ||
    host.startsWith("172.22.") ||
    host.startsWith("172.23.") ||
    host.startsWith("172.24.") ||
    host.startsWith("172.25.") ||
    host.startsWith("172.26.") ||
    host.startsWith("172.27.") ||
    host.startsWith("172.28.") ||
    host.startsWith("172.29.") ||
    host.startsWith("172.30.") ||
    host.startsWith("172.31.");
  if (!window.isSecureContext && !isLocal) {
    throw new Error("Microphone requires HTTPS (or localhost). Use your Cloudflare tunnel URL.");
  }

  if (!walkieMicStream) {
    walkieMicStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
  }

  const micSource = new MediaStreamAudioSourceNode(ctx, { mediaStream: walkieMicStream });
  const mix = new GainNode(ctx, { gain: 1 });
  micSource.connect(mix);

  let head = mix;
  let tail = null;
  let usedWorklet = false;

  if (ctx.audioWorklet) {
    try {
      await ctx.audioWorklet.addModule("/assets/walkie/transmission-processor.js");
      const pre = new AudioWorkletNode(ctx, "transmission-sat", { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [1] });
      const hp1 = new BiquadFilterNode(ctx, { type: "highpass", Q: 0.9, frequency: 420 });
      const hp2 = new BiquadFilterNode(ctx, { type: "highpass", Q: 0.9, frequency: 420 });
      const lp1 = new BiquadFilterNode(ctx, { type: "lowpass", Q: 0.9, frequency: 4200 });
      const lp2 = new BiquadFilterNode(ctx, { type: "lowpass", Q: 0.9, frequency: 4200 });
      const dip = new BiquadFilterNode(ctx, { type: "peaking", frequency: 680, Q: 0.8, gain: -1.1 });
      const mid = new BiquadFilterNode(ctx, { type: "peaking", frequency: 1550, Q: 1.25, gain: 2.0 });
      const post = new AudioWorkletNode(ctx, "transmission-post", { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [1] });

      head.connect(pre);
      pre.connect(hp1);
      hp1.connect(hp2);
      hp2.connect(lp1);
      lp1.connect(lp2);
      lp2.connect(dip);
      dip.connect(mid);
      mid.connect(post);
      tail = post;

      pre.parameters.get("drive")?.setValueAtTime(0.32, ctx.currentTime);
      pre.parameters.get("asym")?.setValueAtTime(0.12, ctx.currentTime);
      pre.parameters.get("mix")?.setValueAtTime(1, ctx.currentTime);

      post.parameters.get("drive")?.setValueAtTime(0.42, ctx.currentTime);
      post.parameters.get("asym")?.setValueAtTime(0.12, ctx.currentTime);
      post.parameters.get("comp")?.setValueAtTime(0.38, ctx.currentTime);
      post.parameters.get("crush")?.setValueAtTime(0.04, ctx.currentTime);
      post.parameters.get("badAmount")?.setValueAtTime(0.22, ctx.currentTime);
      post.parameters.get("wowDepth")?.setValueAtTime(0.18, ctx.currentTime);
      post.parameters.get("dropRate")?.setValueAtTime(0.18, ctx.currentTime);
      post.parameters.get("dropDepth")?.setValueAtTime(0.25, ctx.currentTime);
      post.parameters.get("crackle")?.setValueAtTime(0.22, ctx.currentTime);
      post.parameters.get("lfoRate")?.setValueAtTime(0.75, ctx.currentTime);
      post.parameters.get("noise")?.setValueAtTime(0.18, ctx.currentTime);
      post.parameters.get("hiss")?.setValueAtTime(0.16, ctx.currentTime);
      post.parameters.get("noiseColor")?.setValueAtTime(0.15, ctx.currentTime);
      post.parameters.get("outGain")?.setValueAtTime(0.92, ctx.currentTime);

      usedWorklet = true;
    } catch {
      usedWorklet = false;
    }
  }

  if (!usedWorklet) {
    const hp = new BiquadFilterNode(ctx, { type: "highpass", Q: 0.85, frequency: 420 });
    const lp = new BiquadFilterNode(ctx, { type: "lowpass", Q: 0.85, frequency: 4200 });
    const comp = new DynamicsCompressorNode(ctx, { threshold: -22, knee: 28, ratio: 5.2, attack: 0.004, release: 0.18 });
    const shaper = new WaveShaperNode(ctx, {
      curve: (() => {
        const n = 512;
        const c = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          const x = (i / (n - 1)) * 2 - 1;
          c[i] = Math.tanh(x * 2.4);
        }
        return c;
      })(),
      oversample: "2x",
    });
    head.connect(hp);
    hp.connect(lp);
    lp.connect(comp);
    comp.connect(shaper);
    tail = shaper;
  }

  const dest = new MediaStreamAudioDestinationNode(ctx);
  tail.connect(dest);

  walkieMixNode = mix;
  walkieDestNode = dest;
  return { ctx, mix, dest };
}

function shouldHandleWalkieHotkey(evt) {
  if (!evt) return false;
  if (evt.repeat) return false;
  if (evt.code !== "Backquote") return false;
  const tag = String(document.activeElement?.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea") return false;
  if (document.activeElement?.isContentEditable) {
    const el = document.activeElement;
    if (el && el === chatEditor && canWalkieTalkNow()) return true;
    return false;
  }
  return true;
}

function canWalkieTalkNow() {
  if (!loggedInUser || !ws || ws.readyState !== WebSocket.OPEN) return false;
  if (!activeChatPostId) return false;
  const post = posts.get(activeChatPostId);
  if (!post || post.deleted) return false;
  return String(post.mode || post.chatMode || "").toLowerCase() === "walkie";
}

async function startWalkieRecording() {
  if (walkieRecording) return;
  if (!canWalkieTalkNow()) return;
  try {
    if (walkieStatusEl) walkieStatusEl.textContent = "Requesting microphone…";
    const { ctx, mix, dest } = await ensureWalkieGraph();
    if (ctx.state === "suspended") await ctx.resume();

    walkieChunks = [];
    const stream = dest.stream;
    const preferred = [
      "audio/webm;codecs=opus",
      "audio/ogg;codecs=opus",
      "audio/webm",
      "audio/ogg",
    ];
    let mimeType = "";
    for (const t of preferred) {
      if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) {
        mimeType = t;
        break;
      }
    }
    const rec = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    walkieRecorder = rec;
    walkieStartAt = Date.now();
    walkieRecording = true;
    if (walkieBarEl) walkieBarEl.classList.add("isRecording");
    if (walkieStatusEl) walkieStatusEl.textContent = "Recording… release to send.";

    const dispatch = await ensureWalkieDispatchBuffer();
    if (dispatch) {
      const src = new AudioBufferSourceNode(ctx, { buffer: dispatch });
      const g = new GainNode(ctx, { gain: 0.75 });
      src.connect(g);
      g.connect(mix);
      src.start();
      // Local feedback so user hears the click (quiet).
      const mon = new GainNode(ctx, { gain: 0.10 });
      g.connect(mon);
      mon.connect(ctx.destination);
    }

    rec.addEventListener("dataavailable", (e) => {
      if (e.data && e.data.size > 0) walkieChunks.push(e.data);
    });
    rec.addEventListener("stop", async () => {
      const tookMs = Date.now() - walkieStartAt;
      walkieRecording = false;
      if (walkieBarEl) walkieBarEl.classList.remove("isRecording");
      if (walkieStatusEl) walkieStatusEl.textContent = "Processing…";

      // Give some browsers a tick to deliver the final dataavailable.
      await new Promise((r) => window.setTimeout(r, 0));
      const blob = new Blob(walkieChunks, { type: rec.mimeType || "audio/webm" });
      walkieChunks = [];
      if (!blob || blob.size < 800 || tookMs < 160) {
        if (walkieStatusEl) walkieStatusEl.textContent = "";
        toast("Walkie Talkie", "No audio captured. Check mic permissions/input and try again.");
        return;
      }

      const ext = (rec.mimeType || "").includes("ogg") ? "ogg" : "webm";
      const file = new File([blob], `walkie-${Date.now()}.${ext}`, { type: rec.mimeType || blob.type || "audio/webm" });
      if (walkieStatusEl) walkieStatusEl.textContent = "Uploading…";
      const url = await uploadMediaFile(file, "audio");
      if (!url) {
        if (walkieStatusEl) walkieStatusEl.textContent = "";
        return;
      }
      const post = posts.get(activeChatPostId);
      if (!post || post.deleted) {
        if (walkieStatusEl) walkieStatusEl.textContent = "";
        return;
      }
      ws.send(JSON.stringify({ type: "chatMessage", postId: activeChatPostId, text: "", html: `<audio controls preload=\"none\" src=\"${escapeHtml(url)}\"></audio>` }));
      if (walkieStatusEl) walkieStatusEl.textContent = "Sent.";
      window.setTimeout(() => {
        if (walkieStatusEl && walkieStatusEl.textContent === "Sent.") walkieStatusEl.textContent = "";
      }, 900);
      playSfx("ping", { volume: 0.22 });
    });

    // Timeslice helps avoid empty blobs in some browsers.
    rec.start(250);
  } catch (e) {
    walkieRecording = false;
    if (walkieBarEl) walkieBarEl.classList.remove("isRecording");
    const name = String(e?.name || "");
    const msg = String(e?.message || "");
    const pretty =
      name === "NotAllowedError"
        ? "Microphone permission denied. Allow mic access in your browser settings."
        : name === "NotFoundError"
          ? "No microphone device found."
          : name === "NotReadableError"
            ? "Microphone is in use by another app."
            : msg || "Microphone recording failed.";
    if (walkieStatusEl) walkieStatusEl.textContent = "";
    toast("Walkie Talkie", pretty);
  }
}

async function stopWalkieRecording() {
  if (!walkieRecorder || !walkieRecording) return;
  try {
    const { ctx, mix } = await ensureWalkieGraph();
    const dispatch = await ensureWalkieDispatchBuffer();
    if (dispatch) {
      const src = new AudioBufferSourceNode(ctx, { buffer: dispatch });
      const g = new GainNode(ctx, { gain: 0.55 });
      src.connect(g);
      g.connect(mix);
      src.start();
      const mon = new GainNode(ctx, { gain: 0.08 });
      g.connect(mon);
      mon.connect(ctx.destination);
      window.setTimeout(() => {
        try {
          if (walkieRecorder && walkieRecorder.state !== "inactive") walkieRecorder.stop();
        } catch {
          // ignore
        }
        walkieRecorder = null;
      }, 160);
      return;
    }
  } catch {
    // ignore
  }
  try {
    if (walkieRecorder && walkieRecorder.state !== "inactive") walkieRecorder.stop();
  } catch {
    // ignore
  }
  walkieRecorder = null;
}

function insertAudioTag(target, srcUrl) {
  if (!srcUrl) return;
  target.focus();
  const safe = escapeHtml(srcUrl);
  document.execCommand("insertHTML", false, `<audio controls preload="none" src="${safe}"></audio>`);
}

document.querySelector(".editorShell .toolbar")?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const cmd = btn.getAttribute("data-cmd");
  if (cmd) {
    runCmd(editor, cmd);
    return;
  }
  if (btn.getAttribute("data-link")) {
    runLink(editor);
    return;
  }
  if (btn.getAttribute("data-postimg")) {
    postImageInput?.click();
    return;
  }
  if (btn.getAttribute("data-postaudio")) {
    postAudioInput?.click();
    return;
  }
  if (btn.getAttribute("data-postemoji")) runEmoji(editor);
});

document.querySelector(".chatComposer .toolbar")?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const cmd = btn.getAttribute("data-chatcmd");
  if (cmd) {
    runCmd(chatEditor, cmd);
    return;
  }
  if (btn.getAttribute("data-chatlink")) {
    runLink(chatEditor);
    return;
  }
  if (btn.getAttribute("data-chatimg")) {
    chatImageInput.click();
    return;
  }
  if (btn.getAttribute("data-chataudio")) {
    chatAudioInput?.click();
    return;
  }
  if (btn.getAttribute("data-chatemoji")) runEmoji(chatEditor);
});

profileBioToolbar?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const cmd = btn.getAttribute("data-profilecmd");
  if (cmd) {
    runCmd(profileBioEditor, cmd);
    return;
  }
  if (btn.getAttribute("data-profilelink")) {
    runLink(profileBioEditor);
    return;
  }
  if (btn.getAttribute("data-profileimg")) {
    profileBioImageFileInput?.click();
    return;
  }
  if (btn.getAttribute("data-profileaudio")) {
    profileBioAudioFileInput?.click();
    return;
  }
  if (btn.getAttribute("data-profileemoji")) runEmoji(profileBioEditor);
});

editModalToolbar?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const cmd = btn.getAttribute("data-editcmd");
  if (cmd) {
    runCmd(editModalEditor, cmd);
    return;
  }
  if (btn.getAttribute("data-editlink")) {
    runLink(editModalEditor);
    return;
  }
  if (btn.getAttribute("data-editimg")) {
    editModalImageInput?.click();
    return;
  }
  if (btn.getAttribute("data-editaudio")) {
    editModalAudioInput?.click();
    return;
  }
  if (btn.getAttribute("data-editemoji")) runEmoji(editModalEditor);
});

editModalImageInput?.addEventListener("change", async () => {
  const file = editModalImageInput.files && editModalImageInput.files[0] ? editModalImageInput.files[0] : null;
  editModalImageInput.value = "";
  if (!file) return;
  const url = await uploadMediaFile(file, "image");
  if (!url) return;
  editModalEditor?.focus();
  document.execCommand("insertImage", false, url);
});

editModalAudioInput?.addEventListener("change", async () => {
  const file = editModalAudioInput.files && editModalAudioInput.files[0] ? editModalAudioInput.files[0] : null;
  editModalAudioInput.value = "";
  if (!file) return;
  const url = await uploadMediaFile(file, "audio");
  if (!url) return;
  insertAudioTag(editModalEditor, url);
});

editModal?.addEventListener("click", (e) => {
  if (e.target?.getAttribute?.("data-modalclose")) setEditModalOpen(false);
});

editModalCloseBtn?.addEventListener("click", () => setEditModalOpen(false));
editModalCancelBtn?.addEventListener("click", () => setEditModalOpen(false));

editModalSaveBtn?.addEventListener("click", () => {
  if (!editContext) return;
  if (!editModalEditor) return;
  const { html, text, hasImg, hasAudio } = collectEditorPayload(editModalEditor);
  if (!text && !hasImg && !hasAudio) {
    if (editModalStatus) editModalStatus.textContent = "Please add text, an image, or audio.";
    editModalEditor.focus();
    return;
  }
  if (editContext.kind === "post") {
    const title = String(editModalPostTitleInput?.value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 96);
    if (!title) {
      if (editModalStatus) editModalStatus.textContent = "Title is required.";
      editModalPostTitleInput?.focus();
      return;
    }
    const post = posts.get(editContext.postId);
    const wasProtected = Boolean(post?.protected);
    const wantsProtected = Boolean(editModalProtectedToggle?.checked);
    const password = String(editModalPasswordInput?.value || "");
    if (wantsProtected && !wasProtected && password.trim().length < 4) {
      if (editModalStatus) editModalStatus.textContent = "Set a password (min 4 chars) to protect this post.";
      editModalPasswordInput?.focus();
      return;
    }
    const keywords = parseKeywordsInput(editModalKeywordsInput?.value || "");
    const collectionId = String(editModalCollectionSelect?.value || post?.collectionId || "general");
    const mode = Boolean(editModalWalkieToggle?.checked) ? "walkie" : "text";
    ws.send(
      JSON.stringify({
        type: "editPost",
        postId: editContext.postId,
        title,
        content: text,
        contentHtml: html,
        keywords,
        collectionId,
        protected: wantsProtected,
        password: password.trim(),
        mode
      })
    );
    setEditModalOpen(false);
    return;
  }
  if (editContext.kind === "chat") {
    ws.send(JSON.stringify({ type: "editChatMessage", postId: editContext.postId, messageId: editContext.messageId, text, html }));
    setEditModalOpen(false);
  }
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = authUser.value.trim();
  const password = authPass.value;
  ws.send(JSON.stringify({ type: "login", username, password }));
});

registerBtn.addEventListener("click", () => {
  const username = authUser.value.trim();
  const password = authPass.value;
  const code = authCode.value.trim();
  ws.send(JSON.stringify({ type: "register", username, password, code }));
});

logoutBtn.addEventListener("click", () => ws.send(JSON.stringify({ type: "logout" })));

profileImageInput.addEventListener("change", async () => {
  profileStatus.textContent = "";
  const file = profileImageInput.files && profileImageInput.files[0] ? profileImageInput.files[0] : null;
  if (!file) return;
  try {
    pendingProfileImage = await resizeImageToSquareDataUrl(file, 96);
    if (pendingProfileImage) {
      profilePreview.src = pendingProfileImage;
      profilePreview.classList.add("hasImg");
    }
  } catch {
    profileStatus.textContent = "Failed to load image.";
  }
});

removeProfileImageBtn.addEventListener("click", () => {
  pendingProfileImage = "";
  profilePreview.removeAttribute("src");
  profilePreview.classList.remove("hasImg");
});

saveProfileBtn.addEventListener("click", () => {
  profileStatus.textContent = "";
  const color = nameColorInput.value;
  ws.send(JSON.stringify({ type: "updateProfile", image: pendingProfileImage, color }));
});

profileBackBtn?.addEventListener("click", () => setCenterView("hives"));

profileEditToggleBtn?.addEventListener("click", () => {
  isEditingProfile = !isEditingProfile;
  if (profileEditToggleBtn) profileEditToggleBtn.textContent = isEditingProfile ? "Close editor" : "Edit profile";
  renderCenterPanels();
});

profileCancelBtn?.addEventListener("click", () => {
  isEditingProfile = false;
  if (profileEditToggleBtn) profileEditToggleBtn.textContent = "Edit profile";
  renderCenterPanels();
});

profileAddLinkBtn?.addEventListener("click", () => {
  const links = profileLinksFromEditor();
  links.push({ label: "Link", url: "https://" });
  renderProfileLinksEditor(links);
});

profileLinksEditor?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-linkremove]");
  if (!btn) return;
  const idx = Number(btn.getAttribute("data-linkremove") || -1);
  const links = profileLinksFromEditor();
  if (idx < 0 || idx >= links.length) return;
  links.splice(idx, 1);
  renderProfileLinksEditor(links);
});

profileThemeSongUploadBtn?.addEventListener("click", () => profileThemeSongFileInput?.click());

profileThemeSongClearBtn?.addEventListener("click", () => syncProfileSongPreview(""));

profileThemeSongFileInput?.addEventListener("change", async () => {
  const file = profileThemeSongFileInput.files && profileThemeSongFileInput.files[0] ? profileThemeSongFileInput.files[0] : null;
  profileThemeSongFileInput.value = "";
  if (!file) return;
  const url = await uploadMediaFile(file, "audio");
  if (!url) return;
  syncProfileSongPreview(url);
});

profileBioImageFileInput?.addEventListener("change", async () => {
  const file = profileBioImageFileInput.files && profileBioImageFileInput.files[0] ? profileBioImageFileInput.files[0] : null;
  profileBioImageFileInput.value = "";
  if (!file) return;
  const url = await uploadMediaFile(file, "image");
  if (!url) return;
  profileBioEditor?.focus();
  document.execCommand("insertImage", false, url);
});

profileBioAudioFileInput?.addEventListener("change", async () => {
  const file = profileBioAudioFileInput.files && profileBioAudioFileInput.files[0] ? profileBioAudioFileInput.files[0] : null;
  profileBioAudioFileInput.value = "";
  if (!file) return;
  const url = await uploadMediaFile(file, "audio");
  if (!url) return;
  insertAudioTag(profileBioEditor, url);
});

profileSaveBtn?.addEventListener("click", () => {
  if (!loggedInUser || !activeProfile || activeProfile.username !== loggedInUser) return;
  const pronouns = String(profilePronounsInput?.value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
  const bioHtml = String(profileBioEditor?.innerHTML || "");
  const themeSongUrl = String(profileThemeSongUrlInput?.value || "").trim();
  const links = profileLinksFromEditor();
  ws.send(JSON.stringify({ type: "updateProfile", pronouns, bioHtml, themeSongUrl, links }));
});

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = String(postTitleInput?.value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 96);
  if (!title) {
    toast("Post title", "Please add a short title.");
    postTitleInput?.focus();
    return;
  }
  const html = editor.innerHTML.trim();
  const text = editor.innerText.trim();
  const hasImg = Boolean(editor.querySelector("img"));
  const hasAudio = Boolean(editor.querySelector("audio"));
  if (!text && !hasImg && !hasAudio) {
    toast("Post body", "Please add body text, image, or audio.");
    editor.focus();
    return;
  }

  const keywords = parseKeywords(keywordsEl.value);
  const collectionId = String(postCollectionEl?.value || "").trim();
  if (!collectionId) {
    toast("Collection", "Please choose a collection.");
    return;
  }
  const ttlMinutes = Number(ttlMinutesEl.value || 60);
  const canMakePermanent =
    loggedInRole === "owner" || loggedInRole === "moderator" || Boolean(normalizeInstanceBranding(instanceBranding).allowMemberPermanentPosts);
  const minMinutes = canMakePermanent ? 0 : 1;
  const ttl = Math.max(minMinutes, Math.min(2880, Math.floor(ttlMinutes))) * 60_000;

  const isProtected = Boolean(isProtectedEl?.checked);
  const password = typeof postPasswordEl?.value === "string" ? postPasswordEl.value : "";
  if (isProtected && password.trim().length < 4) {
    toast("Protected post", "Password must be at least 4 characters.");
    return;
  }
  const mode = Boolean(isWalkieEl?.checked) ? "walkie" : "text";
  ws.send(
    JSON.stringify({ type: "newPost", title, collectionId, contentHtml: html, content: text, keywords, ttl, protected: isProtected, password, mode })
  );
  if (postTitleInput) postTitleInput.value = "";
  editor.innerHTML = "";
  if (postPasswordEl) postPasswordEl.value = "";
  if (isProtectedEl) isProtectedEl.checked = false;
  if (isWalkieEl) isWalkieEl.checked = false;
  if (isMobileSwipeMode()) setComposerOpen(false);
});

toggleComposerBtn?.addEventListener("click", () => {
  setComposerOpen(!composerOpen);
  if (composerOpen) (postTitleInput || editor)?.focus();
});
toggleComposerInlineBtn?.addEventListener("click", () => setComposerOpen(false));

function submitChat() {
  const html = chatEditor.innerHTML.trim();
  const text = chatEditor.innerText.trim();
  const hasImg = Boolean(chatEditor.querySelector("img"));
  const hasAudio = Boolean(chatEditor.querySelector("audio"));
  if (activeDmThreadId) {
    if (!text && !hasImg && !hasAudio) return;
    if (!loggedInUser) {
      toast("Sign in required", "Sign in to send DMs.");
      return;
    }
    const thread = dmThreadsById.get(activeDmThreadId) || null;
    if (!thread) {
      toast("DMs", "This DM thread is unavailable.");
      return;
    }
    if (String(thread.status || "") !== "active") {
      toast("DMs", "You can only send messages after the DM is accepted.");
      return;
    }
    ws.send(JSON.stringify({ type: "dmSend", threadId: activeDmThreadId, text, html }));
    chatEditor.innerHTML = "";
    return;
  }

  if (!activeChatPostId || (!text && !hasImg && !hasAudio)) return;
  const post = posts.get(activeChatPostId);
  if (post && String(post.mode || post.chatMode || "").toLowerCase() === "walkie") {
    toast("Walkie Talkie", "This hive is walkie-only. Hold ~ to talk.");
    return;
  }
  if (post?.readOnly && !(loggedInRole === "owner" || loggedInRole === "moderator")) {
    toast("Read-only", "This hive is read-only.");
    return;
  }
  if (post?.deleted) {
    toast("Unavailable", "This post was deleted.");
    return;
  }
  const replyToId = replyToMessage?.id ? String(replyToMessage.id) : "";
  ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
  ws.send(JSON.stringify({ type: "chatMessage", postId: activeChatPostId, text, html, replyToId }));
  chatEditor.innerHTML = "";
  setReplyToMessage(null);
}

filterKeywordsEl.addEventListener("input", () => renderFeed());
filterAuthorEl?.addEventListener("input", () => renderFeed());
sortByEl?.addEventListener("change", () => renderFeed());
hiveTabsEl?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-hiveview]");
  if (!btn) return;
  const next = btn.getAttribute("data-hiveview") || "all";
  if (!loggedInUser && next !== "all") {
    toast("Sign in required", "Sign in to use Starred and Hidden views.");
    return;
  }
  activeHiveView = next;
  renderFeed();
});
clearFilterBtn.addEventListener("click", () => {
  filterKeywordsEl.value = "";
  if (filterAuthorEl) filterAuthorEl.value = "";
  if (sortByEl) sortByEl.value = "activity";
  activeHiveView = "all";
  renderFeed();
});

feedEl.addEventListener("click", (e) => {
  const profileLink = e.target.closest("[data-viewprofile]");
  if (profileLink) {
    const username = profileLink.getAttribute("data-viewprofile") || "";
    if (username) openUserProfile(username);
    return;
  }

  const menuBtn = e.target.closest("button[data-postmenu]");
  if (menuBtn) {
    const postId = menuBtn.getAttribute("data-postmenu") || "";
    if (!postId) return;
    const wasOpen = openPostMenuId === postId;

    for (const panel of feedEl.querySelectorAll(".postMenu")) panel.classList.add("hidden");
    for (const btn of feedEl.querySelectorAll("button[data-postmenu]")) btn.setAttribute("aria-expanded", "false");

    if (!wasOpen) {
      const panel = feedEl.querySelector(`[data-postmenu-panel="${cssEscape(postId)}"]`);
      if (panel) panel.classList.remove("hidden");
      menuBtn.setAttribute("aria-expanded", "true");
      openPostMenuId = postId;
    } else {
      openPostMenuId = "";
    }
    return;
  }

  const chatBtn = e.target.closest("button[data-chat]");
  if (chatBtn) {
    if (openPostMenuId) {
      for (const panel of feedEl.querySelectorAll(".postMenu")) panel.classList.add("hidden");
      for (const btn of feedEl.querySelectorAll("button[data-postmenu]")) btn.setAttribute("aria-expanded", "false");
      openPostMenuId = "";
    }
    const postId = chatBtn.getAttribute("data-chat");
    const post = postId ? posts.get(postId) : null;
    if (post?.locked) unlockPostFlow(postId, true);
    else openChat(postId);
    return;
  }

  const boostBtn = e.target.closest("button[data-boostbtn]");
  if (boostBtn) {
    const postId = boostBtn.getAttribute("data-boostbtn");
    const card = boostBtn.closest(".post");
    const sel = card ? card.querySelector("select[data-boostsel]") : null;
    const boostMs = sel ? Number(sel.value) : 3_600_000;
    ws.send(JSON.stringify({ type: "boostPost", postId, boostMs }));
    return;
  }

  const reportPostBtn = e.target.closest("button[data-reportpost]");
  if (reportPostBtn) {
    if (openPostMenuId) {
      for (const panel of feedEl.querySelectorAll(".postMenu")) panel.classList.add("hidden");
      for (const btn of feedEl.querySelectorAll("button[data-postmenu]")) btn.setAttribute("aria-expanded", "false");
      openPostMenuId = "";
    }
    const postId = reportPostBtn.getAttribute("data-reportpost") || "";
    if (!postId) return;
    const post = posts.get(postId);
    if (post?.deleted) {
      toast("Unavailable", "This post was deleted.");
      return;
    }
    const reason = promptReason("post report");
    if (!reason) return;
    ws.send(JSON.stringify({ type: "reportCreate", targetType: "post", targetId: postId, postId, reason }));
    return;
  }

  const hideBtn = e.target.closest("button[data-hidepost]");
  if (hideBtn) {
    if (openPostMenuId) {
      for (const panel of feedEl.querySelectorAll(".postMenu")) panel.classList.add("hidden");
      for (const btn of feedEl.querySelectorAll("button[data-postmenu]")) btn.setAttribute("aria-expanded", "false");
      openPostMenuId = "";
    }
    const postId = hideBtn.getAttribute("data-hidepost") || "";
    if (!postId) return;
    const hidden = prefSet("hiddenPostIds").has(postId);
    ws.send(JSON.stringify({ type: hidden ? "unhidePost" : "hidePost", postId }));
    return;
  }

  const react = e.target.closest("[data-react]");
  if (react && react.getAttribute("data-kind") === "post") {
    if (openPostMenuId) {
      for (const panel of feedEl.querySelectorAll(".postMenu")) panel.classList.add("hidden");
      for (const btn of feedEl.querySelectorAll("button[data-postmenu]")) btn.setAttribute("aria-expanded", "false");
      openPostMenuId = "";
    }
    const postId = react.getAttribute("data-postid") || "";
    const emoji = react.getAttribute("data-emoji") || "";
    if (!postId || !emoji) return;
    const post = posts.get(postId);
    if (post?.deleted) {
      toast("Unavailable", "This post was deleted.");
      return;
    }
    markReactPulse("post", postId, emoji);
    toggleMyReact("post", postId, emoji);
    ws.send(JSON.stringify({ type: "react", targetType: "post", postId, emoji }));
    renderFeed();
    return;
  }

  const editPostBtn = e.target.closest("button[data-editpost]");
  if (editPostBtn) {
    if (openPostMenuId) {
      for (const panel of feedEl.querySelectorAll(".postMenu")) panel.classList.add("hidden");
      for (const btn of feedEl.querySelectorAll("button[data-postmenu]")) btn.setAttribute("aria-expanded", "false");
      openPostMenuId = "";
    }
    const postId = editPostBtn.getAttribute("data-editpost") || "";
  const post = postId ? posts.get(postId) : null;
  if (!post || post.deleted || post.locked) return;
  openEditModalForPost(post);
  return;
}

  const deletePostBtn = e.target.closest("button[data-deletepost]");
  if (deletePostBtn) {
    if (openPostMenuId) {
      for (const panel of feedEl.querySelectorAll(".postMenu")) panel.classList.add("hidden");
      for (const btn of feedEl.querySelectorAll("button[data-postmenu]")) btn.setAttribute("aria-expanded", "false");
      openPostMenuId = "";
    }
    const postId = deletePostBtn.getAttribute("data-deletepost") || "";
    if (!postId) return;
    const ok = confirm("Delete this post? It will show as deleted.");
    if (!ok) return;
    ws.send(JSON.stringify({ type: "deletePostSelf", postId }));
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!openPostMenuId) return;
  for (const panel of feedEl.querySelectorAll(".postMenu")) panel.classList.add("hidden");
  for (const btn of feedEl.querySelectorAll("button[data-postmenu]")) btn.setAttribute("aria-expanded", "false");
  openPostMenuId = "";
});

window.addEventListener("click", (e) => {
  if (!openPostMenuId) return;
  const esc = cssEscape(openPostMenuId);
  const inside = e.target?.closest?.(`[data-postmenu-panel="${esc}"], button[data-postmenu="${esc}"]`);
  if (inside) return;
  for (const panel of feedEl.querySelectorAll(".postMenu")) panel.classList.add("hidden");
  for (const btn of feedEl.querySelectorAll("button[data-postmenu]")) btn.setAttribute("aria-expanded", "false");
  openPostMenuId = "";
});

chatMessagesEl.addEventListener("click", (e) => {
  const dmAcceptBtn = e.target.closest("button[data-dmaccept]");
  if (dmAcceptBtn) {
    const threadId = dmAcceptBtn.getAttribute("data-dmaccept") || "";
    if (threadId) ws.send(JSON.stringify({ type: "dmRequestRespond", threadId, accept: true }));
    return;
  }
  const dmDeclineBtn = e.target.closest("button[data-dmdecline]");
  if (dmDeclineBtn) {
    const threadId = dmDeclineBtn.getAttribute("data-dmdecline") || "";
    if (threadId) ws.send(JSON.stringify({ type: "dmRequestRespond", threadId, accept: false }));
    return;
  }
  const dmOpenBtn = e.target.closest("button[data-dmopen]");
  if (dmOpenBtn) {
    const threadId = dmOpenBtn.getAttribute("data-dmopen") || "";
    if (threadId) openDmThread(threadId);
    return;
  }
  const dmRequestBtn = e.target.closest("button[data-dmrequest]");
  if (dmRequestBtn && activeDmThreadId) {
    const to = String(dmRequestBtn.getAttribute("data-dmrequest") || "")
      .trim()
      .replace(/^@+/, "")
      .toLowerCase();
    if (to) ws.send(JSON.stringify({ type: "dmRequestCreate", to }));
    return;
  }

  const profileLink = e.target.closest("[data-viewprofile]");
  if (profileLink) {
    const username = profileLink.getAttribute("data-viewprofile") || "";
    if (username) openUserProfile(username);
    return;
  }

  const mention = e.target.closest(".mentionToken");
  if (mention) {
    const raw = String(mention.textContent || "").trim();
    const username = raw.replace(/^@+/, "").toLowerCase();
    if (username) openUserProfile(username);
    return;
  }

  const editBtn = e.target.closest("button[data-editmsg]");
  if (editBtn) {
    const messageId = editBtn.getAttribute("data-editmsg") || "";
    const postId = editBtn.getAttribute("data-postid") || activeChatPostId || "";
    if (!messageId || !postId) return;
    const message = findChatMessage(postId, messageId);
    if (!message || message.deleted) return;
    openEditModalForChatMessage(message, postId);
    return;
  }

  const deleteBtn = e.target.closest("button[data-deletemsg]");
  if (deleteBtn) {
    const messageId = deleteBtn.getAttribute("data-deletemsg") || "";
    if (!messageId) return;
    const ok = confirm("Delete this message?");
    if (!ok) return;
    ws.send(JSON.stringify({ type: "deleteChatMessageSelf", messageId }));
    return;
  }

  const replyBtn = e.target.closest("button[data-replymsg]");
  if (replyBtn) {
    const messageId = replyBtn.getAttribute("data-replymsg") || "";
    const postId = replyBtn.getAttribute("data-postid") || activeChatPostId || "";
    if (!messageId || !postId) return;
    const message = findChatMessage(postId, messageId);
    if (!message) return;
    setReplyToMessage(message);
    chatEditor?.focus();
    return;
  }

  const reportChatBtn = e.target.closest("button[data-reportchat]");
  if (reportChatBtn) {
    const messageId = reportChatBtn.getAttribute("data-reportchat") || "";
    const postId = reportChatBtn.getAttribute("data-postid") || activeChatPostId || "";
    if (!messageId || !postId) return;
    const message = findChatMessage(postId, messageId);
    if (!message || message.deleted) {
      toast("Unavailable", "That message was deleted.");
      return;
    }
    const reason = promptReason("message report");
    if (!reason) return;
    ws.send(JSON.stringify({ type: "reportCreate", targetType: "chat", targetId: messageId, postId, reason }));
    return;
  }

  const react = e.target.closest("[data-react]");
  if (!react || react.getAttribute("data-kind") !== "chat") return;
  const postId = react.getAttribute("data-postid") || "";
  const messageId = react.getAttribute("data-msgid") || "";
  const emoji = react.getAttribute("data-emoji") || "";
  if (!postId || !messageId || !emoji) return;
  markReactPulse("chat", messageId, emoji);
  toggleMyReact("chat", messageId, emoji);
  ws.send(JSON.stringify({ type: "react", targetType: "chat", postId, messageId, emoji }));
  renderChatPanel();
});

chatReplyCancelBtn?.addEventListener("click", () => setReplyToMessage(null));

modPanelEl?.addEventListener("click", (e) => {
  const tabBtn = e.target.closest("[data-modtab]");
  if (tabBtn) {
    modTab = tabBtn.getAttribute("data-modtab") || "reports";
    if (modTab === "server") requestServerInfo();
    renderModPanel();
    return;
  }
});

modRefreshBtn?.addEventListener("click", () => {
  if (!canModerate) return;
  if (modTab === "server") requestServerInfo();
  else requestModData();
});
modReportStatusEl?.addEventListener("change", () => {
  if (!canModerate) return;
  ws.send(JSON.stringify({ type: "modListReports", status: modReportStatusEl.value || "open", limit: 200 }));
});

modModal?.addEventListener("click", (e) => {
  if (e.target?.getAttribute?.("data-modmodalclose")) setModModalOpen(false);
});
modModalClose?.addEventListener("click", () => setModModalOpen(false));
modModalCancel?.addEventListener("click", () => setModModalOpen(false));

modModalBody?.addEventListener("change", (e) => {
  if (!modModalContext) return;
  if (modModalContext.kind === "collectionGate") {
    if (e.target?.name === "gateVisibility") updateGateModalVisibility();
    return;
  }
  if (modModalContext.kind !== "userRoles") return;
  const checkbox = e.target?.closest?.("input[type='checkbox'][data-userrolekey]");
  if (!checkbox) return;
  const key = checkbox.getAttribute("data-userrolekey") || "";
  const enabled = Boolean(checkbox.checked);
  if (!key) return;
  ws.send(JSON.stringify({ type: "userCustomRoleSet", targetId: modModalContext.username, key, enabled }));
});

modModalPrimary?.addEventListener("click", () => {
  if (!modModalContext) return;
  if (modModalStatus) modModalStatus.textContent = "";
  if (modModalContext.kind === "collectionCreate") {
    const name = String(document.getElementById("modModalCollectionName")?.value || "").trim();
    if (!name) {
      if (modModalStatus) modModalStatus.textContent = "Name is required.";
      return;
    }
    ws.send(JSON.stringify({ type: "collectionCreate", name }));
    setModModalOpen(false);
    return;
  }
  if (modModalContext.kind === "collectionGate") {
    const collectionId = String(modModalContext.collectionId || "");
    const visibility = String(modModalBody?.querySelector("input[name='gateVisibility']:checked")?.value || "public");
    if (visibility !== "gated") {
      ws.send(JSON.stringify({ type: "collectionSetGate", collectionId, visibility: "public", allowedRoles: [] }));
      setModModalOpen(false);
      return;
    }
    const allowedRoles = Array.from(modModalBody?.querySelectorAll("input[data-gatetoken]:checked") || []).map((el) =>
      String(el.getAttribute("data-gatetoken") || "")
    );
    if (!allowedRoles.length) {
      if (modModalStatus) modModalStatus.textContent = "Pick at least one allowed role for gated collections.";
      return;
    }
    ws.send(JSON.stringify({ type: "collectionSetGate", collectionId, visibility: "gated", allowedRoles }));
    setModModalOpen(false);
  }
});

modBodyEl?.addEventListener("click", (e) => {
  const modLogViewBtn = e.target.closest("button[data-modlogview]");
  if (modLogViewBtn) {
    const next = String(modLogViewBtn.getAttribute("data-modlogview") || "dev");
    modLogView = next === "moderation" ? "moderation" : "dev";
    localStorage.setItem("bzl_modLogView", modLogView);
    if (modLogView === "dev" && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "devLogList", limit: 300 }));
    }
    renderModPanel();
    return;
  }

  const devLogRefreshBtn = e.target.closest("button[data-devlogrefresh]");
  if (devLogRefreshBtn) {
    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "devLogList", limit: 300 }));
    return;
  }

  const devLogCopyBtn = e.target.closest("button[data-devlogcopy]");
  if (devLogCopyBtn) {
    const text = String(document.getElementById("devLogPre")?.textContent || "").trim();
    if (!text) {
      toast("Dev log", "Nothing to copy.");
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Dev log", "Copied."))
      .catch(() => toast("Dev log", "Copy failed."));
    return;
  }

  const devLogClearBtn = e.target.closest("button[data-devlogclear]");
  if (devLogClearBtn) {
    if (!(canModerate && loggedInRole === "owner")) return;
    const ok = confirm("Clear the server dev log?");
    if (!ok) return;
    ws.send(JSON.stringify({ type: "devLogClear" }));
    return;
  }

  const devLogTestBtn = e.target.closest("button[data-devlogtest]");
  if (devLogTestBtn) {
    sendDevLog("info", "ui", "Dev log test", { at: Date.now() });
    return;
  }

  const devLogAutoScrollToggle = e.target.closest("input[data-devlogautoscroll]");
  if (devLogAutoScrollToggle) {
    devLogAutoScroll = Boolean(devLogAutoScrollToggle.checked);
    localStorage.setItem("bzl_devLogAutoScroll", devLogAutoScroll ? "1" : "0");
    renderModPanel();
    return;
  }

  const serverRefreshBtn = e.target.closest("button[data-server-refresh]");
  if (serverRefreshBtn) {
    requestServerInfo();
    return;
  }

  const instanceSaveBtn = e.target.closest("button[data-instance-save]");
  if (instanceSaveBtn) {
    if (!(canModerate && loggedInRole === "owner")) return;
    const title = String(modBodyEl.querySelector("input[data-instance-title]")?.value || "").replace(/\s+/g, " ").trim().slice(0, 32);
    const subtitle = String(modBodyEl.querySelector("input[data-instance-subtitle]")?.value || "").replace(/\s+/g, " ").trim().slice(0, 80);
    const allowMemberPermanentPosts = Boolean(modBodyEl.querySelector("input[data-instance-allowpermanent]")?.checked);
    const bg = String(modBodyEl.querySelector("input[data-instance-bg]")?.value || "").trim();
    const panel = String(modBodyEl.querySelector("input[data-instance-panel]")?.value || "").trim();
    const text = String(modBodyEl.querySelector("input[data-instance-text]")?.value || "").trim();
    const good = String(modBodyEl.querySelector("input[data-instance-good]")?.value || "").trim();
    const bad = String(modBodyEl.querySelector("input[data-instance-bad]")?.value || "").trim();
    const accent = String(modBodyEl.querySelector("input[data-instance-accent]")?.value || "").trim();
    const accent2 = String(modBodyEl.querySelector("input[data-instance-accent2]")?.value || "").trim();
    const fontBody = String(modBodyEl.querySelector("select[data-instance-fontbody]")?.value || "").trim();
    const fontMono = String(modBodyEl.querySelector("select[data-instance-fontmono]")?.value || "").trim();
    const mutedPct = String(modBodyEl.querySelector("input[data-instance-mutedpct]")?.value || "").trim();
    const linePct = String(modBodyEl.querySelector("input[data-instance-linepct]")?.value || "").trim();
    const panel2Pct = String(modBodyEl.querySelector("input[data-instance-panel2pct]")?.value || "").trim();
    if (!title) {
      toast("Instance", "Title is required.");
      return;
    }
    ws.send(
      JSON.stringify({
        type: "instanceSetBranding",
        title,
        subtitle,
        allowMemberPermanentPosts,
        appearance: { bg, panel, text, accent, accent2, good, bad, fontBody, fontMono, mutedPct, linePct, panel2Pct }
      })
    );
    toast("Instance", "Saving…");
    return;
  }

  const instanceSaveAppearanceBtn = e.target.closest("button[data-instance-saveappearance]");
  if (instanceSaveAppearanceBtn) {
    if (!(canModerate && (loggedInRole === "owner" || loggedInRole === "moderator"))) return;
    const bg = String(modBodyEl.querySelector("input[data-instance-bg]")?.value || "").trim();
    const panel = String(modBodyEl.querySelector("input[data-instance-panel]")?.value || "").trim();
    const text = String(modBodyEl.querySelector("input[data-instance-text]")?.value || "").trim();
    const good = String(modBodyEl.querySelector("input[data-instance-good]")?.value || "").trim();
    const bad = String(modBodyEl.querySelector("input[data-instance-bad]")?.value || "").trim();
    const accent = String(modBodyEl.querySelector("input[data-instance-accent]")?.value || "").trim();
    const accent2 = String(modBodyEl.querySelector("input[data-instance-accent2]")?.value || "").trim();
    const fontBody = String(modBodyEl.querySelector("select[data-instance-fontbody]")?.value || "").trim();
    const fontMono = String(modBodyEl.querySelector("select[data-instance-fontmono]")?.value || "").trim();
    const mutedPct = String(modBodyEl.querySelector("input[data-instance-mutedpct]")?.value || "").trim();
    const linePct = String(modBodyEl.querySelector("input[data-instance-linepct]")?.value || "").trim();
    const panel2Pct = String(modBodyEl.querySelector("input[data-instance-panel2pct]")?.value || "").trim();
    ws.send(
      JSON.stringify({
        type: "instanceSetAppearance",
        appearance: { bg, panel, text, accent, accent2, good, bad, fontBody, fontMono, mutedPct, linePct, panel2Pct }
      })
    );
    toast("Theme", "Saving…");
    return;
  }

  const themeResetBtn = e.target.closest("button[data-theme-reset]");
  if (themeResetBtn) {
    if (!(canModerate && (loggedInRole === "owner" || loggedInRole === "moderator"))) return;
    applyInstanceAppearance();
    renderModPanel();
    toast("Theme", "Reset to saved theme.");
    return;
  }

  const pluginReloadBtn = e.target.closest("button[data-pluginreload]");
  if (pluginReloadBtn) {
    if (!isOwnerUser()) return;
    pluginAdminBusy = true;
    pluginAdminStatus = "Reloading plugins…";
    renderModPanel();
    ws.send(JSON.stringify({ type: "pluginReload" }));
    return;
  }

  const pluginUninstallBtn = e.target.closest("button[data-pluginuninstall]");
  if (pluginUninstallBtn) {
    if (!isOwnerUser()) return;
    const id = String(pluginUninstallBtn.getAttribute("data-pluginuninstall") || "").trim().toLowerCase();
    if (!id) return;
    const ok = confirm(`Uninstall "${id}"? This deletes the plugin files from this server.`);
    if (!ok) return;
    pluginAdminBusy = true;
    pluginAdminStatus = `Uninstalling "${id}"…`;
    renderModPanel();
    ws.send(JSON.stringify({ type: "pluginUninstall", id }));
    return;
  }

  const pluginInstallBtn = e.target.closest("button[data-plugininstall]");
  if (pluginInstallBtn) {
    if (!isOwnerUser()) return;
    const input = modBodyEl.querySelector("input[type='file'][data-pluginzip]") || null;
    const file = input?.files && input.files[0] ? input.files[0] : null;
    if (!file) {
      pluginAdminStatus = "Choose a .zip file first.";
      renderModPanel();
      return;
    }
    const token = getSessionToken();
    if (!token) {
      pluginAdminStatus = "Session missing. Please sign out/in and try again.";
      renderModPanel();
      return;
    }
    pluginAdminBusy = true;
    pluginAdminStatus = "Uploading plugin…";
    renderModPanel();
    (async () => {
      try {
        const res = await fetch("/api/plugin-install", {
          method: "POST",
          headers: { "Content-Type": "application/zip", Authorization: `Bearer ${token}` },
          body: file,
          credentials: "same-origin",
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json || !json.ok) {
          pluginAdminBusy = false;
          pluginAdminStatus = String(json?.error || `Install failed (${res.status}).`);
          renderModPanel();
          return;
        }
        if (input) input.value = "";
        pluginAdminBusy = false;
        pluginAdminStatus = `Installed "${json.plugin?.id || "plugin"}". Enable it below.`;
        toast("Plugins", "Installed. Enable it to activate.");
        renderModPanel();
      } catch (err) {
        pluginAdminBusy = false;
        pluginAdminStatus = "Install failed.";
        renderModPanel();
      }
    })();
    return;
  }

  const nukeBtn = e.target.closest("button[data-nuke]");
  if (nukeBtn) {
    if (!(canModerate && loggedInRole === "owner")) return;
    const confirmEl = modBodyEl.querySelector("input[data-nukeconfirm]");
    const okToggle = Boolean(confirmEl?.checked);
    if (!okToggle) {
      toast("NUKE", "Toggle ARE YOU SURE? first.");
      return;
    }
    const ok = confirm("NUKE the board? This clears all hives, reports, moderation log, and hive media uploads.");
    if (!ok) return;
    ws.send(JSON.stringify({ type: "nukeBoard", confirm: true, confirmText: "ARE YOU SURE?" }));
    toast("NUKE", "Working…");
    return;
  }

  const openChatBtn = e.target.closest("button[data-chat]");
  if (openChatBtn) {
    const postId = openChatBtn.getAttribute("data-chat") || "";
    if (postId) openChat(postId);
    return;
  }

  const createCollectionBtn = e.target.closest("button[data-createcollection]");
  if (createCollectionBtn) {
    openCollectionCreateModal();
    return;
  }

  const archiveCollectionBtn = e.target.closest("button[data-archivecollection]");
  if (archiveCollectionBtn) {
    const collectionId = archiveCollectionBtn.getAttribute("data-archivecollection") || "";
    if (!collectionId) return;
    const ok = confirm("Archive this collection? Existing hives stay visible in All.");
    if (!ok) return;
    ws.send(JSON.stringify({ type: "collectionArchive", collectionId }));
    return;
  }

  const collectionGateBtn = e.target.closest("button[data-collectiongate]");
  if (collectionGateBtn) {
    const collectionId = collectionGateBtn.getAttribute("data-collectiongate") || "";
    if (!collectionId) return;
    openCollectionGateModal(collectionId);
    return;
  }

  const collectionPublicBtn = e.target.closest("button[data-collectionpublic]");
  if (collectionPublicBtn) {
    const collectionId = collectionPublicBtn.getAttribute("data-collectionpublic") || "";
    if (!collectionId) return;
    ws.send(JSON.stringify({ type: "collectionSetGate", collectionId, visibility: "public", allowedRoles: [] }));
    return;
  }

  const roleCreateBtn = e.target.closest("button[data-rolecreate]");
  if (roleCreateBtn) {
    const card = roleCreateBtn.closest(".modCard");
    const label = String(card?.querySelector("input[data-rolelabel]")?.value || "").trim();
    let key = String(card?.querySelector("input[data-rolekey]")?.value || "")
      .trim()
      .toLowerCase();
    if (!key && label) {
      key = label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .slice(0, 18);
      const keyEl = card?.querySelector("input[data-rolekey]");
      if (keyEl && key) keyEl.value = key;
    }
    const color = String(card?.querySelector("input[data-rolecolor]")?.value || "#ff3ea5").trim();
    if (!key || !label) {
      toast("Roles", "Key and label are required.");
      return;
    }
    ws.send(JSON.stringify({ type: "roleCreate", key, label, color }));
    return;
  }

  const roleArchiveBtn = e.target.closest("button[data-rolearchive]");
  if (roleArchiveBtn) {
    const key = roleArchiveBtn.getAttribute("data-rolearchive") || "";
    if (!key) return;
    const ok = confirm(`Archive role "${key}"?`);
    if (!ok) return;
    ws.send(JSON.stringify({ type: "roleArchive", key }));
    return;
  }

  const userManageRolesBtn = e.target.closest("button[data-usermanageroles]");
  if (userManageRolesBtn) {
    const targetId = userManageRolesBtn.getAttribute("data-usermanageroles") || "";
    if (!targetId) return;
    openUserRolesModal(targetId);
    return;
  }

  const actionBtn = e.target.closest("button[data-modaction]");
  if (!actionBtn) return;
  const actionType = actionBtn.getAttribute("data-modaction") || "";
  const targetType = actionBtn.getAttribute("data-targettype") || "";
  const targetId = actionBtn.getAttribute("data-targetid") || "";
  if (!actionType || !targetType || !targetId) return;

  const metadata = {};

  if (actionType === "user_password_reset") {
    const pw = prompt("Set a new password (min 4 chars):");
    if (pw === null) return;
    const next = String(pw || "");
    if (next.length < 4) {
      toast("Password reset", "Password must be at least 4 characters.");
      return;
    }
    const ok = confirm("Reset this user's password to the value you entered?");
    if (!ok) return;
    metadata.newPassword = next;
  }

  if (actionType === "post_erase") {
    const ok = confirm("Erase this hive permanently? This cannot be restored.");
    if (!ok) return;
  }

  if (actionType === "post_readonly_set") {
    metadata.readOnly = actionBtn.getAttribute("data-readonly") === "1";
  }

  if (actionType === "post_protection_set") {
    if (actionBtn.hasAttribute("data-unprotect")) {
      metadata.enabled = false;
    } else {
      const pw = prompt("Set post password (min 4 chars):");
      if (pw === null) return;
      const next = String(pw || "");
      if (next.length < 4) {
        toast("Protected post", "Password must be at least 4 characters.");
        return;
      }
      metadata.enabled = true;
      metadata.password = next;
    }
  }

  const reason = promptReason(actionType);
  if (!reason) return;
  const minutesAttr = actionBtn.getAttribute("data-minutes");
  const roleAttr = actionBtn.getAttribute("data-role");
  const countAttr = actionBtn.getAttribute("data-count");
  const ttlAttr = actionBtn.getAttribute("data-ttl");
  const ttlPrompt = actionBtn.hasAttribute("data-ttlprompt");
  if (minutesAttr) metadata.minutes = Number(minutesAttr);
  if (roleAttr) metadata.role = roleAttr;
  if (countAttr) metadata.count = Number(countAttr);
  if (ttlAttr) metadata.ttlMinutes = Number(ttlAttr);
  if (ttlPrompt && actionType === "post_ttl_set") {
    const raw = prompt("Set TTL minutes (0 = permanent):", "60");
    if (raw === null) return;
    const n = Math.max(0, Math.min(2880, Math.floor(Number(raw))));
    if (!Number.isFinite(n)) {
      toast("TTL", "Enter a valid number.");
      return;
    }
    metadata.ttlMinutes = n;
  }
  ws.send(JSON.stringify({ type: "modAction", actionType, targetType, targetId, reason, metadata }));
});

modBodyEl?.addEventListener("change", (e) => {
  const presetSelect = e.target?.closest?.("select[data-theme-preset]");
  if (presetSelect) {
    if (!(canModerate && (loggedInRole === "owner" || loggedInRole === "moderator"))) return;
    const id = String(presetSelect.value || "").trim();
    if (!id) return;
    const preset = THEME_PRESETS.find((p) => p.id === id) || null;
    if (!preset) return;
    const a = preset.appearance || {};
    const setValue = (selector, value) => {
      const el = modBodyEl.querySelector(selector);
      if (!el) return;
      el.value = String(value ?? "");
    };
    setValue("input[data-instance-bg]", a.bg);
    setValue("input[data-instance-panel]", a.panel);
    setValue("input[data-instance-text]", a.text);
    setValue("input[data-instance-good]", a.good);
    setValue("input[data-instance-bad]", a.bad);
    setValue("input[data-instance-accent]", a.accent);
    setValue("input[data-instance-accent2]", a.accent2);
    setValue("input[data-instance-mutedpct]", a.mutedPct);
    setValue("input[data-instance-linepct]", a.linePct);
    setValue("input[data-instance-panel2pct]", a.panel2Pct);
    setValue("select[data-instance-fontbody]", a.fontBody);
    setValue("select[data-instance-fontmono]", a.fontMono);
    applyInstanceAppearance(a);
    toast("Theme", `Preset "${preset.name}" applied (preview). Click Save to persist.`);
    return;
  }

  const toggle = e.target?.closest?.("input[type='checkbox'][data-pluginenable]");
  if (toggle) {
    if (!isOwnerUser()) return;
    const id = String(toggle.getAttribute("data-pluginenable") || "").trim().toLowerCase();
    if (!id) return;
    const enabled = Boolean(toggle.checked);
    if (pluginEnableInFlight.has(id)) return;
    const wsRef = window.__bzlWs;
    if (!wsRef || wsRef.readyState !== WebSocket.OPEN) {
      toast("Plugins", "Not connected.");
      return;
    }
    pluginEnableInFlight.add(id);
    // Optimistic UI update to avoid flicker/repeated toggles.
    for (const p of plugins) {
      if (p && String(p.id || "").toLowerCase() === id) p.enabled = enabled;
    }
    pluginAdminStatus = enabled ? "Enabling…" : "Disabling…";
    renderModPanel();
    wsRef.send(JSON.stringify({ type: "pluginSetEnabled", id, enabled }));
    return;
  }
});

modBodyEl?.addEventListener("change", (e) => {
  const toggle = e.target?.closest?.("input[data-nukeconfirm]");
  if (!toggle) return;
  const btn = modBodyEl.querySelector("button[data-nuke]");
  if (!btn) return;
  btn.disabled = !Boolean(toggle.checked);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitChat();
});

chatEditor.addEventListener("keydown", (e) => {
  if (mentionState.open) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      mentionState.selected = Math.min(mentionState.items.length - 1, mentionState.selected + 1);
      renderMentionMenu();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      mentionState.selected = Math.max(0, mentionState.selected - 1);
      renderMentionMenu();
      return;
    }
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      const picked = mentionState.items[mentionState.selected];
      if (picked) replaceCurrentMentionToken(picked);
      closeMentionMenu();
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeMentionMenu();
      return;
    }
  }
  if (e.key !== "Enter") return;
  if (!(e.ctrlKey || e.metaKey)) return;
  e.preventDefault();
  submitChat();
});

chatEditor.addEventListener("input", () => {
  if (!activeChatPostId || !loggedInUser) return;
  const textTail = String(chatEditor.innerText || "").slice(-80);
  const m = /@([a-z0-9_.-]{0,31})$/i.exec(textTail);
  if (m) {
    const query = String(m[1] || "");
    mentionState.open = true;
    mentionState.query = query;
    mentionState.items = listMentionCandidates(query);
    mentionState.selected = 0;
    mentionState.anchorRect = getCaretRect();
    renderMentionMenu();
  } else {
    closeMentionMenu();
  }

  const t = Date.now();
  if (t - lastTypingSentAt > 900) {
    ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: true }));
    lastTypingSentAt = t;
  }
  if (typingStopTimer) clearTimeout(typingStopTimer);
  typingStopTimer = setTimeout(() => {
    if (!activeChatPostId) return;
    ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
  }, 1800);
});

chatEditor.addEventListener("blur", () => {
  if (!activeChatPostId || !loggedInUser) return;
  ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
  setTimeout(() => closeMentionMenu(), 0);
});

editor.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (!(e.ctrlKey || e.metaKey)) return;
  e.preventDefault();
  newPostForm.requestSubmit();
});

chatImageInput.addEventListener("change", async () => {
  const file = chatImageInput.files && chatImageInput.files[0] ? chatImageInput.files[0] : null;
  chatImageInput.value = "";
  if (!file) return;
  try {
    const url = await uploadMediaFile(file, "image");
    if (!url) return;
    chatEditor.focus();
    document.execCommand("insertImage", false, url);
  } catch {
    // ignore
  }
});

postImageInput?.addEventListener("change", async () => {
  const file = postImageInput.files && postImageInput.files[0] ? postImageInput.files[0] : null;
  postImageInput.value = "";
  if (!file) return;
  try {
    const url = await uploadMediaFile(file, "image");
    if (!url) return;
    editor.focus();
    document.execCommand("insertImage", false, url);
  } catch {
    // ignore
  }
});

chatAudioInput?.addEventListener("change", async () => {
  const file = chatAudioInput.files && chatAudioInput.files[0] ? chatAudioInput.files[0] : null;
  chatAudioInput.value = "";
  if (!file) return;
  try {
    const url = await uploadMediaFile(file, "audio");
    if (!url) return;
    insertAudioTag(chatEditor, url);
  } catch {
    // ignore
  }
});

postAudioInput?.addEventListener("change", async () => {
  const file = postAudioInput.files && postAudioInput.files[0] ? postAudioInput.files[0] : null;
  postAudioInput.value = "";
  if (!file) return;
  try {
    const url = await uploadMediaFile(file, "audio");
    if (!url) return;
    insertAudioTag(editor, url);
  } catch {
    // ignore
  }
});

setInterval(() => {
  for (const el of document.querySelectorAll("[data-countdown]")) {
    const id = el.getAttribute("data-countdown");
    const post = posts.get(id);
    if (!post) continue;
    el.textContent = formatCountdown(post.expiresAt);
  }
  for (const el of document.querySelectorAll("[data-boost]")) {
    const id = el.getAttribute("data-boost");
    const post = posts.get(id);
    if (!post) continue;
    const txt = formatBoostRemaining(Number(post.boostUntil || 0));
    if (!txt) {
      el.remove();
      continue;
    }
    el.textContent = `boost ${txt}`;
  }
  if (activeChatPostId) updateActiveChatMeta();
}, 1000);

function unlockSfxOnce() {
  if (!pendingOpenSfx) return;
  playSfx("open", { volume: 0.34 }).then((ok) => {
    if (ok) pendingOpenSfx = false;
  });
}

window.addEventListener("pointerdown", unlockSfxOnce, { once: true, capture: true });
window.addEventListener("keydown", unlockSfxOnce, { once: true, capture: true });

playSfx("open", { volume: 0.34 }).then((ok) => {
  if (ok) pendingOpenSfx = false;
});

setConn("connecting");
const ws = new WebSocket(wsUrl());
window.__bzlWs = ws;
ws.addEventListener("open", () => {
  setConn("open");
  const token = getSessionToken();
  if (token) ws.send(JSON.stringify({ type: "resumeSession", token }));
});
ws.addEventListener("close", () => setConn("closed"));
ws.addEventListener("error", () => setConn("closed"));

ws.addEventListener("message", (evt) => {
  let msg;
  try {
    msg = JSON.parse(evt.data);
  } catch {
    return;
  }
  if (!msg || typeof msg !== "object") return;

  if (msg.type === "init") {
    clientId = msg.clientId || null;
    canRegisterFirstUser = Boolean(msg.auth?.canRegisterFirstUser);
    registrationEnabled = Boolean(msg.auth?.registrationEnabled);
    loggedInRole = "member";
    canModerate = false;
    dmThreads = [];
    dmThreadsById = new Map();
    dmMessagesByThreadId.clear();
    activeDmThreadId = null;
    lanUrls = [];
    modReports = [];
    modUsers = [];
    modLog = [];
    devLog = [];
    profiles = msg.profiles && typeof msg.profiles === "object" ? msg.profiles : {};
    instanceBranding = normalizeInstanceBranding(msg.instance || {});
    renderInstanceBranding();
    collections = normalizeCollections(msg.collections);
    customRoles = normalizeRoleDefs(msg.roles?.custom);
    setPlugins(msg.plugins);
    renderCollectionSelect();
    peopleMembers = Array.isArray(msg.people?.members) ? msg.people.members : [];
    if (!peopleMembers.length && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "peopleList" }));
    }
    if (msg.reactions?.allowed && Array.isArray(msg.reactions.allowed)) allowedReactions = msg.reactions.allowed;
    if (msg.reactions?.allowedPost && Array.isArray(msg.reactions.allowedPost)) allowedPostReactions = msg.reactions.allowedPost;
    if (msg.reactions?.allowedChat && Array.isArray(msg.reactions.allowedChat)) allowedChatReactions = msg.reactions.allowedChat;
    setUserPrefs({ starredPostIds: [], hiddenPostIds: [] });
    unreadByPostId.clear();
    posts.clear();
    for (const p of msg.posts || []) posts.set(p.id, p);
    setAuthUi();
    renderFeed();
    renderChatPanel();
    renderLanHint();
    renderPeoplePanel();
    renderCenterPanels();
    return;
  }

  if (msg.type === "collectionsUpdated") {
    const prevView = activeHiveView;
    collections = normalizeCollections(msg.collections);
    renderCollectionSelect();
    ensureActiveCollectionView();
    if (activeHiveView !== prevView) renderFeed();
    renderModPanel();
    return;
  }

  if (msg.type === "instanceUpdated" && msg.instance && typeof msg.instance === "object") {
    instanceBranding = normalizeInstanceBranding(msg.instance);
    renderInstanceBranding();
    applyInstanceAppearance();
    setAuthUi();
    return;
  }

  if (msg.type === "instanceOk" && msg.instance && typeof msg.instance === "object") {
    instanceBranding = normalizeInstanceBranding(msg.instance);
    renderInstanceBranding();
    applyInstanceAppearance();
    setAuthUi();
    toast("Instance", "Saved.");
    return;
  }

  if (msg.type === "postsSnapshot") {
    posts.clear();
    for (const post of Array.isArray(msg.posts) ? msg.posts : []) posts.set(post.id, post);
    if (activeChatPostId && !posts.has(activeChatPostId)) {
      activeChatPostId = null;
    }
    renderFeed();
    renderChatPanel();
    return;
  }

  if (msg.type === "boardReset") {
    posts.clear();
    chatByPost.clear();
    unreadByPostId.clear();
    typingUsersByPostId.clear();
    newPostAnimIds.clear();
    if (buzzTimers.size) {
      for (const t of buzzTimers.values()) clearTimeout(t);
      buzzTimers.clear();
    }
    activeChatPostId = null;
    renderFeed();
    renderChatPanel(true);
    renderTypingIndicator();
    renderModPanel();
    if (canModerate) requestModData();
    toast("Board reset", "All hives, reports, and logs were cleared.");
    return;
  }

  if (msg.type === "rolesUpdated") {
    customRoles = normalizeRoleDefs(msg.roles);
    renderPeoplePanel();
    renderModPanel();
    return;
  }

  if (msg.type === "pluginsUpdated") {
    setPlugins(msg.plugins);
    return;
  }

  if (msg.type === "profilesUpdated" && msg.profiles && typeof msg.profiles === "object") {
    const nextProfiles = msg.profiles;
    const nextKeys = Object.keys(nextProfiles);
    const currentKeys = Object.keys(profiles || {});
    if (nextKeys.length === 0 && currentKeys.length > 0) {
      return;
    }
    profiles = nextProfiles;
    setAuthUi();
    renderFeed();
    renderChatPanel();
    renderPeoplePanel();
    if (centerView === "profile") renderCenterPanels();
    return;
  }

  if (msg.type === "userProfile" && msg.profile) {
    const profile = normalizeProfileData(msg.profile);
    if (!profile.username) return;
    if (activeProfileUsername && profile.username !== activeProfileUsername) return;
    activeProfile = profile;
    setCenterView("profile", profile.username);
    return;
  }

  if (msg.type === "userProfileUpdated" && msg.profile) {
    const profile = normalizeProfileData(msg.profile);
    if (!profile.username) return;
    if (centerView === "profile" && activeProfileUsername === profile.username) {
      activeProfile = profile;
      renderCenterPanels();
    }
    return;
  }

  if (msg.type === "newPost" && msg.post) {
    const isNewId = !posts.has(msg.post.id);
    posts.set(msg.post.id, msg.post);
    renderFeed();
    if (isNewId) {
      newPostAnimIds.add(msg.post.id);
      setTimeout(() => {
        newPostAnimIds.delete(msg.post.id);
        renderFeed();
      }, 950);
    }
    const author = msg.post.author || "";
    const title = postTitle(msg.post);
    const authorLower = String(author || "").toLowerCase();
    const selfLower = String(loggedInUser || "").toLowerCase();
    const ignoreUserSet = new Set(
      [...prefSet("ignoredUsers").values(), ...prefSet("blockedUsers").values()].map((u) => String(u).toLowerCase())
    );
    if (author && loggedInUser && author === loggedInUser) {
      playSfx("post", { volume: 0.36 });
    }
    if (author && author !== loggedInUser && !(authorLower && authorLower !== selfLower && ignoreUserSet.has(authorLower))) {
      if (!windowFocused || document.hidden) {
        maybeNotify(`Bzl: ${title}`, `New post by @${author}`, { postId: msg.post.id });
      } else {
        toast("New post", `${author ? `@${author}: ` : ""}${title}`);
      }
    }
    return;
  }

  if (msg.type === "postUpdated" && msg.post) {
    posts.set(msg.post.id, msg.post);
    renderFeed();
    renderChatPanel();
    return;
  }

  if (msg.type === "deletePost") {
    if (userPrefs?.starredPostIds) userPrefs.starredPostIds = userPrefs.starredPostIds.filter((id) => id !== msg.id);
    if (userPrefs?.hiddenPostIds) userPrefs.hiddenPostIds = userPrefs.hiddenPostIds.filter((id) => id !== msg.id);
    posts.delete(msg.id);
    chatByPost.delete(msg.id);
    unreadByPostId.delete(msg.id);
    typingUsersByPostId.delete(msg.id);
    if (buzzTimers.has(msg.id)) {
      clearTimeout(buzzTimers.get(msg.id));
      buzzTimers.delete(msg.id);
    }
    if (activeChatPostId === msg.id) activeChatPostId = null;
    renderFeed();
    renderChatPanel();
    renderTypingIndicator();
    return;
  }

  if (msg.type === "loginOk") {
    loggedInUser = msg.username || null;
    loggedInRole = typeof msg.role === "string" ? msg.role : "member";
    canModerate = Boolean(msg.canModerate);
    if (typeof msg.sessionToken === "string" && msg.sessionToken) setSessionToken(msg.sessionToken);
    const profile = msg.profile || {};
    pendingProfileImage = typeof profile.image === "string" ? profile.image : "";
    if (pendingProfileImage) {
      profilePreview.src = pendingProfileImage;
      profilePreview.classList.add("hasImg");
    } else {
      profilePreview.removeAttribute("src");
      profilePreview.classList.remove("hasImg");
    }
    if (profile.color) nameColorInput.value = profile.color;
    setUserPrefs(msg.prefs || {});
    authPass.value = "";
    profileStatus.textContent = "";
    setAuthUi();
    renderFeed();
    renderLanHint();
    if (centerView === "profile" && activeProfileUsername === loggedInUser) {
      ws.send(JSON.stringify({ type: "getUserProfile", username: loggedInUser }));
    } else {
      renderCenterPanels();
    }
    if (canModerate) requestModData();
    return;
  }

  if (msg.type === "logoutOk") {
    setSessionToken("");
    loggedInUser = null;
    loggedInRole = "member";
    canModerate = false;
    dmThreads = [];
    dmThreadsById = new Map();
    dmMessagesByThreadId.clear();
    activeDmThreadId = null;
    stopWalkieRecording();
    lanUrls = [];
    modReports = [];
    modUsers = [];
    modLog = [];
    setUserPrefs({ starredPostIds: [], hiddenPostIds: [] });
    activeHiveView = "all";
    setAuthUi();
    renderFeed();
    renderLanHint();
    renderPeoplePanel();
    renderCenterPanels();
    return;
  }

  if (msg.type === "authState") {
    if (!loggedInUser || msg.username !== loggedInUser) return;
    loggedInRole = typeof msg.role === "string" ? msg.role : loggedInRole;
    canModerate = Boolean(msg.canModerate);
    if (!canModerate) lanUrls = [];
    if (msg.prefs && typeof msg.prefs === "object") setUserPrefs(msg.prefs);
    setAuthUi();
    renderLanHint();
    renderPeoplePanel();
    if (canModerate) requestModData();
    return;
  }

  if (msg.type === "sessionInvalid") {
    setSessionToken("");
    setUserPrefs({ starredPostIds: [], hiddenPostIds: [] });
    dmThreads = [];
    dmThreadsById = new Map();
    dmMessagesByThreadId.clear();
    activeDmThreadId = null;
    return;
  }

  if (msg.type === "userPrefs") {
    setUserPrefs(msg.prefs || {});
    renderFeed();
    return;
  }

  if (msg.type === "peopleSnapshot") {
    peopleMembers = Array.isArray(msg.members) ? msg.members : [];
    renderPeoplePanel();
    return;
  }

  if (msg.type === "dmSnapshot") {
    setDmThreads(Array.isArray(msg.threads) ? msg.threads : []);
    return;
  }

  if (msg.type === "dmThreadOk" && msg.thread) {
    upsertDmThread(msg.thread);
    return;
  }

  if (msg.type === "dmThreadUpdated" && msg.thread) {
    const me = String(loggedInUser || "").trim().toLowerCase();
    const a = msg.thread?.a ? normalizeDmThread(msg.thread.a) : null;
    const b = msg.thread?.b ? normalizeDmThread(msg.thread.b) : null;
    const mine = me ? [a, b].find((t) => t && String(t.other || "").toLowerCase() !== me) : a || b;
    if (mine) {
      upsertDmThread(mine);
      if (activeDmThreadId && mine.id === activeDmThreadId) {
        const current = dmMessagesByThreadId.get(activeDmThreadId) || null;
        if (!current || current.length === 0) ws.send(JSON.stringify({ type: "dmHistory", threadId: activeDmThreadId }));
      }
    }
    return;
  }

  if (msg.type === "dmHistory") {
    const threadId = String(msg.threadId || "").trim();
    if (!threadId) return;
    const messages = Array.isArray(msg.messages) ? msg.messages.map(normalizeDmMessage).filter(Boolean) : [];
    dmMessagesByThreadId.set(threadId, messages);
    if (activeDmThreadId === threadId) renderChatPanel(true);
    return;
  }

  if (msg.type === "dmMessage" && msg.threadId && msg.message) {
    const threadId = String(msg.threadId || "").trim();
    const message = normalizeDmMessage(msg.message);
    if (!threadId || !message) return;
    const existing = dmMessagesByThreadId.get(threadId) || [];
    if (!existing.some((m) => m.id === message.id)) {
      existing.push(message);
      dmMessagesByThreadId.set(threadId, existing);
    }
    const sender = String(message.fromUser || "");
    const isFromYou = Boolean(sender && loggedInUser && sender === loggedInUser);
    if (activeDmThreadId === threadId && windowFocused && !document.hidden) {
      if (!appendDmMessageToDom(threadId, message)) renderChatPanel();
      pulseChatMessage(message.id);
    } else {
      if (!isFromYou) {
        const title = `DM from @${sender || "unknown"}`;
        const body = String(message.text || "").slice(0, 160) || "New message";
        if (!windowFocused || document.hidden) maybeNotify(`Bzl: ${title}`, body, { threadId });
        else toast("DM", `${sender ? `@${sender}: ` : ""}${body}`);
        playSfx("ping", { volume: 0.38 });
      }
      renderPeoplePanel();
    }
    return;
  }

  if (msg.type === "lanInfo") {
    lanUrls = Array.isArray(msg.lanUrls) ? msg.lanUrls : [];
    renderLanHint();
    return;
  }

  if (msg.type === "loginError") {
    authHint.textContent = msg.message || "Login failed.";
    return;
  }

  if (msg.type === "profileOk") {
    const profile = msg.profile || {};
    pendingProfileImage = typeof profile.image === "string" ? profile.image : pendingProfileImage;
    if (pendingProfileImage) {
      profilePreview.src = pendingProfileImage;
      profilePreview.classList.add("hasImg");
    } else {
      profilePreview.removeAttribute("src");
      profilePreview.classList.remove("hasImg");
    }
    if (profile.color) nameColorInput.value = profile.color;
    profileStatus.textContent = "Saved.";
    const normalized = normalizeProfileData(profile, loggedInUser || "");
    if (loggedInUser && normalized.username === loggedInUser) {
      activeProfile = normalized;
      activeProfileUsername = loggedInUser;
      if (centerView === "profile") {
        isEditingProfile = false;
        if (profileEditToggleBtn) profileEditToggleBtn.textContent = "Edit profile";
        renderCenterPanels();
      }
    }
    return;
  }

  if (msg.type === "error") {
    const m = msg.message || "Error";
    authHint.textContent = m;
    profileStatus.textContent = m;
    toast("Error", m);
    return;
  }

  if (msg.type === "rateLimited") {
    const m = msg.message || "Too many requests. Please wait and try again.";
    toast("Rate limit", m);
    return;
  }

  if (msg.type === "permissionDenied") {
    const m = msg.message || "Permission denied.";
    if (/owner access required/i.test(m)) {
      pluginAdminStatus = m;
      pluginAdminBusy = false;
      pluginEnableInFlight.clear();
      renderModPanel();
    }
    toast("Moderation", m);
    return;
  }

  if (msg.type === "collectionOk") {
    toast("Collections", "Collection created.");
    return;
  }

  if (msg.type === "roleOk") {
    toast("Roles", "Role created.");
    return;
  }

  if (msg.type === "pluginOk") {
    if (msg.uninstalled) pluginAdminStatus = "Plugin uninstalled.";
    else if (typeof msg.enabled === "boolean") pluginAdminStatus = msg.enabled ? "Plugin enabled." : "Plugin disabled.";
    else if (msg.reloaded) pluginAdminStatus = "Plugins reloaded.";
    else pluginAdminStatus = "Plugin updated.";
    pluginAdminBusy = false;
    if (msg.id) pluginEnableInFlight.delete(String(msg.id || "").trim().toLowerCase());
    if (modTab === "server") renderModPanel();
    return;
  }

  if (msg.type === "postUnlocked") {
    const postId = msg.postId || "";
    if (!postId || !msg.post) return;
    posts.set(postId, msg.post);
    if (Array.isArray(msg.messages)) chatByPost.set(postId, msg.messages);
    renderFeed();
    renderChatPanel();
    renderTypingIndicator();
    if (pendingOpenChatAfterUnlock === postId) {
      pendingOpenChatAfterUnlock = null;
      openChat(postId);
    } else {
      toast("Unlocked", "You can view and chat in this post.");
    }
    return;
  }

  if (msg.type === "chatHistory") {
    chatByPost.set(msg.postId, Array.isArray(msg.messages) ? msg.messages : []);
    markRead(msg.postId);
    renderChatPanel(true);
    renderTypingIndicator();
    return;
  }

  if (msg.type === "modSnapshot") {
    if (Array.isArray(msg.reports)) modReports = msg.reports;
    if (Array.isArray(msg.users)) modUsers = msg.users;
    if (Array.isArray(msg.log)) modLog = msg.log;
    renderModPanel();
    return;
  }

  if (msg.type === "devLogSnapshot") {
    if (Array.isArray(msg.log)) devLog = msg.log;
    if (canModerate && modTab === "log" && modLogView === "dev") renderModPanel();
    return;
  }

  if (msg.type === "devLogAppended" && msg.entry) {
    devLog.unshift(msg.entry);
    if (devLog.length > 300) devLog.splice(300);
    if (canModerate && modTab === "log" && modLogView === "dev") renderModPanel();
    return;
  }

  if (msg.type === "modLogAppended" && msg.entry) {
    modLog.unshift(msg.entry);
    if (modLog.length > 200) modLog.splice(200);
    renderModPanel();
    return;
  }

  if (msg.type === "modActionApplied") {
    requestModData();
    renderFeed();
    renderChatPanel();
    renderModPanel();
    return;
  }

  if (msg.type === "nukeOk") {
    toast(
      "NUKE complete",
      `Cleared ${Number(msg.deletedPosts || 0)} hives and deleted ${Number(msg.deletedUploads || 0)} uploads (kept ${Number(msg.keptUploads || 0)} profile files).`
    );
    return;
  }

  if (msg.type === "reportCreated" && msg.report) {
    if (canModerate) {
      const idx = modReports.findIndex((r) => r.id === msg.report.id);
      if (idx >= 0) modReports[idx] = msg.report;
      else modReports.unshift(msg.report);
      if (modReports.length > 200) modReports.splice(200);
      renderModPanel();
    } else if (msg.report.reporter === loggedInUser) {
      toast("Report submitted", "Thanks. A moderator will review it.");
    }
    return;
  }

  if (msg.type === "reportUpdated" && msg.report) {
    const idx = modReports.findIndex((r) => r.id === msg.report.id);
    if (idx >= 0) modReports[idx] = msg.report;
    else modReports.unshift(msg.report);
    if (modReports.length > 200) modReports.splice(200);
    renderModPanel();
    return;
  }

  if (msg.type === "reactionUpdated" && msg.targetType === "chat") {
    const postId = msg.postId || "";
    const messageId = msg.messageId || "";
    const reactions = msg.reactions && typeof msg.reactions === "object" ? msg.reactions : {};
    const arr = chatByPost.get(postId) || [];
    const m = arr.find((x) => x && x.id === messageId);
    if (m) m.reactions = reactions;
    if (activeChatPostId === postId) renderChatPanel();
    return;
  }

  if (msg.type === "typing") {
    const postId = msg.postId || "";
    const username = msg.username || "";
    if (!postId || !username) return;
    if (loggedInUser && username === loggedInUser) return;
    const ignoreUserSet = new Set(
      [...prefSet("ignoredUsers").values(), ...prefSet("blockedUsers").values()].map((u) => String(u).toLowerCase())
    );
    const usernameLower = String(username || "").toLowerCase();
    const selfLower = String(loggedInUser || "").toLowerCase();
    if (usernameLower && usernameLower !== selfLower && ignoreUserSet.has(usernameLower)) return;
    const isTyping = Boolean(msg.isTyping);
    const set = typingUsersByPostId.get(postId) || new Set();
    if (isTyping) set.add(username);
    else set.delete(username);
    if (set.size === 0) typingUsersByPostId.delete(postId);
    else typingUsersByPostId.set(postId, set);
    if (activeChatPostId === postId) renderTypingIndicator();
    return;
  }

  if (msg.type === "chatMessage") {
    const arr = chatByPost.get(msg.postId) || [];
    arr.push(msg.message);
    if (arr.length > 200) arr.splice(0, arr.length - 200);
    chatByPost.set(msg.postId, arr);
    const sender = msg.message?.fromUser || "";
    if (sender) {
      const set = typingUsersByPostId.get(msg.postId);
      if (set && set.has(sender)) {
        set.delete(sender);
        if (set.size === 0) typingUsersByPostId.delete(msg.postId);
      }
    }
    const isFromYou = Boolean(sender && loggedInUser && sender === loggedInUser);
    const senderLower = String(sender || "").toLowerCase();
    const selfLower = String(loggedInUser || "").toLowerCase();
    const ignoreUserSet = new Set(
      [...prefSet("ignoredUsers").values(), ...prefSet("blockedUsers").values()].map((u) => String(u).toLowerCase())
    );
    if (!isFromYou && senderLower && senderLower !== selfLower && ignoreUserSet.has(senderLower)) {
      if (activeChatPostId === msg.postId) renderChatPanel();
      return;
    }
    const mentions = Array.isArray(msg.message?.mentions) ? msg.message.mentions.map((u) => String(u || "").toLowerCase()) : [];
    const mentionsYou = Boolean(loggedInUser && mentions.includes(loggedInUser) && !isFromYou);
    if (mentionsYou) playSfx("ping", { volume: 0.42 });
    if (activeChatPostId === msg.postId && windowFocused && !document.hidden) {
      markRead(msg.postId);
      if (!appendPostChatMessageToDom(msg.postId, msg.message)) renderChatPanel();
      pulseChatMessage(msg.message?.id);
      renderTypingIndicator();
      if (mentionsYou) toast("Mentioned", `@${sender} mentioned you.`);
    } else {
      if (!buzzTimers.has(msg.postId)) {
        const t = window.setTimeout(() => {
          buzzTimers.delete(msg.postId);
          renderFeed();
        }, 750);
        buzzTimers.set(msg.postId, t);
      } else {
        clearTimeout(buzzTimers.get(msg.postId));
        const t = window.setTimeout(() => {
          buzzTimers.delete(msg.postId);
          renderFeed();
        }, 750);
        buzzTimers.set(msg.postId, t);
      }
      bumpUnread(msg.postId);
      renderFeed();
      const p = posts.get(msg.postId);
      const title = p ? postTitle(p) : "Chat";
      const body = sender ? `@${sender}: ${msg.message?.text || ""}` : msg.message?.text || "";
      if (!isFromYou) {
        if (!windowFocused || document.hidden) {
          const notifyTitle = mentionsYou ? `Bzl: Mention in ${title}` : `Bzl: ${title}`;
          maybeNotify(notifyTitle, body.slice(0, 160), { postId: msg.postId });
        } else {
          const toastTitle = mentionsYou ? "Mentioned" : title;
          const toastBody = mentionsYou ? `@${sender} mentioned you` : body.slice(0, 120);
          toast(toastTitle, toastBody);
        }
      }
    }
  }
});

renderLanHint();
renderPeoplePanel();
setPeopleOpen(getPeopleOpen());
composerOpen = getComposerOpen();
setComposerOpen(composerOpen);
applySidebarWidth(readStoredSidebarWidth(), false);
applyChatWidth(readStoredChatWidth(), false);
applyModWidth(readStoredModWidth(), false);
applyPeopleWidth(readStoredPeopleWidth(), false);

setSidebarHidden(getSidebarHidden());
toggleSidebarBtn?.addEventListener("click", () => setSidebarHidden(true));
showSidebarBtn?.addEventListener("click", () => setSidebarHidden(false));
togglePeopleBtn?.addEventListener("click", () => setPeopleOpen(!peopleOpen));
closePeopleBtn?.addEventListener("click", () => setPeopleOpen(false));
peopleMembersTabBtn?.addEventListener("click", () => {
  peopleTab = "members";
  renderPeoplePanel();
});
peopleDmsTabBtn?.addEventListener("click", () => {
  peopleTab = "dms";
  renderPeoplePanel();
});
peopleSearchEl?.addEventListener("input", () => renderPeoplePanel());
peopleListEl?.addEventListener("click", (e) => {
  const dmBtn = e.target.closest("button[data-dmrequest]");
  if (dmBtn) {
    const to = String(dmBtn.getAttribute("data-dmrequest") || "")
      .trim()
      .replace(/^@+/, "")
      .toLowerCase();
    if (!to) return;
    if (!loggedInUser) {
      toast("Sign in required", "Sign in to start a DM.");
      return;
    }
    if (to === String(loggedInUser).toLowerCase()) return;
    ws.send(JSON.stringify({ type: "dmRequestCreate", to }));
    peopleTab = "dms";
    renderPeoplePanel();
    return;
  }
  const btn = e.target.closest("[data-viewprofile]");
  if (!btn) return;
  const username = btn.getAttribute("data-viewprofile") || "";
  openUserProfile(username);
});

peopleDmsViewEl?.addEventListener("click", (e) => {
  const profileLink = e.target.closest("[data-viewprofile]");
  if (profileLink) {
    const username = profileLink.getAttribute("data-viewprofile") || "";
    if (username) openUserProfile(username);
    return;
  }

  const openBtn = e.target.closest("button[data-dmopen]");
  if (openBtn) {
    const threadId = openBtn.getAttribute("data-dmopen") || "";
    if (!threadId) return;
    openDmThread(threadId);
    return;
  }

  const acceptBtn = e.target.closest("button[data-dmaccept]");
  if (acceptBtn) {
    const threadId = acceptBtn.getAttribute("data-dmaccept") || "";
    if (!threadId) return;
    ws.send(JSON.stringify({ type: "dmRequestRespond", threadId, accept: true }));
    return;
  }

  const declineBtn = e.target.closest("button[data-dmdecline]");
  if (declineBtn) {
    const threadId = declineBtn.getAttribute("data-dmdecline") || "";
    if (!threadId) return;
    ws.send(JSON.stringify({ type: "dmRequestRespond", threadId, accept: false }));
    return;
  }

  const requestAgainBtn = e.target.closest("button[data-dmrequest]");
  if (requestAgainBtn) {
    const to = String(requestAgainBtn.getAttribute("data-dmrequest") || "")
      .trim()
      .replace(/^@+/, "")
      .toLowerCase();
    if (!to || !loggedInUser) return;
    if (to === String(loggedInUser).toLowerCase()) return;
    ws.send(JSON.stringify({ type: "dmRequestCreate", to }));
    return;
  }

  const requestFromSelectBtn = e.target.closest("button[data-dmrequestfromselect]");
  if (requestFromSelectBtn) {
    const sel = peopleDmsViewEl.querySelector("select[data-dmto]");
    const to = String(sel?.value || "")
      .trim()
      .replace(/^@+/, "")
      .toLowerCase();
    if (!to) return;
    if (!loggedInUser) {
      toast("Sign in required", "Sign in to start a DM.");
      return;
    }
    if (to === String(loggedInUser).toLowerCase()) return;
    ws.send(JSON.stringify({ type: "dmRequestCreate", to }));
    if (sel) sel.value = "";
    return;
  }
});

profileCard?.addEventListener("click", (e) => {
  const dmBtn = e.target.closest("button[data-dmrequest]");
  if (!dmBtn) return;
  const to = String(dmBtn.getAttribute("data-dmrequest") || "")
    .trim()
    .replace(/^@+/, "")
    .toLowerCase();
  if (!to) return;
  if (!loggedInUser) {
    toast("Sign in required", "Sign in to start a DM.");
    return;
  }
  if (to === String(loggedInUser).toLowerCase()) return;
  ws.send(JSON.stringify({ type: "dmRequestCreate", to }));
  peopleTab = "dms";
  setPeopleOpen(true);
  renderPeoplePanel();
});
profileCard?.addEventListener("click", (e) => {
  const ignoreBtn = e.target.closest("button[data-ignoreuser],button[data-unignoreuser],button[data-blockuser],button[data-unblockuser]");
  if (!ignoreBtn) return;
  const raw =
    ignoreBtn.getAttribute("data-ignoreuser") ||
    ignoreBtn.getAttribute("data-unignoreuser") ||
    ignoreBtn.getAttribute("data-blockuser") ||
    ignoreBtn.getAttribute("data-unblockuser") ||
    "";
  const username = String(raw).trim().replace(/^@+/, "").toLowerCase();
  if (!username || !loggedInUser) return;
  if (username === String(loggedInUser).toLowerCase()) return;
  if (ignoreBtn.hasAttribute("data-ignoreuser")) ws.send(JSON.stringify({ type: "ignoreUser", username }));
  else if (ignoreBtn.hasAttribute("data-unignoreuser")) ws.send(JSON.stringify({ type: "unignoreUser", username }));
  else if (ignoreBtn.hasAttribute("data-blockuser")) ws.send(JSON.stringify({ type: "blockUser", username }));
  else if (ignoreBtn.hasAttribute("data-unblockuser")) ws.send(JSON.stringify({ type: "unblockUser", username }));
});
chatResizeHandle?.addEventListener("mousedown", (e) => {
  e.preventDefault();
  startChatResize(e.clientX);
});
chatResizeHandle?.addEventListener("dblclick", () => applyChatWidth(CHAT_WIDTH_DEFAULT));
sidebarResizeHandle?.addEventListener("mousedown", (e) => {
  e.preventDefault();
  startSidebarResize(e.clientX);
});
sidebarResizeHandle?.addEventListener("dblclick", () => applySidebarWidth(SIDEBAR_WIDTH_DEFAULT));
mainResizeHandle?.addEventListener("mousedown", (e) => {
  e.preventDefault();
  startModResize(e.clientX);
});
mainResizeHandle?.addEventListener("dblclick", () => applyModWidth(MOD_WIDTH_DEFAULT));
peopleResizeHandle?.addEventListener("mousedown", (e) => {
  e.preventDefault();
  startPeopleResize(e.clientX);
});
peopleResizeHandle?.addEventListener("dblclick", () => applyPeopleWidth(PEOPLE_WIDTH_DEFAULT));
sidebarPanelEl?.addEventListener("mousedown", (e) => {
  if (e.button !== 0 || isMobileSwipeMode()) return;
  const rect = sidebarPanelEl.getBoundingClientRect();
  if (Math.abs(e.clientX - rect.right) > 12) return;
  e.preventDefault();
  startSidebarResize(e.clientX);
});
chatPanelEl?.addEventListener("mousedown", (e) => {
  if (e.button !== 0 || isMobileSwipeMode()) return;
  const rect = chatPanelEl.getBoundingClientRect();
  if (Math.abs(e.clientX - rect.right) > 12) return;
  e.preventDefault();
  startChatResize(e.clientX);
});
modPanelEl?.addEventListener("mousedown", (e) => {
  if (e.button !== 0 || isMobileSwipeMode() || modPanelEl.classList.contains("hidden")) return;
  const rect = modPanelEl.getBoundingClientRect();
  if (Math.abs(e.clientX - rect.left) > 12) return;
  e.preventDefault();
  startModResize(e.clientX);
});
peopleDrawerEl?.addEventListener("mousedown", (e) => {
  if (e.button !== 0 || isMobileSwipeMode() || peopleDrawerEl.classList.contains("hidden")) return;
  const rect = peopleDrawerEl.getBoundingClientRect();
  if (Math.abs(e.clientX - rect.left) > 12) return;
  e.preventDefault();
  startPeopleResize(e.clientX);
});
mobilePagerEl?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-mobilepanel]");
  if (!btn) return;
  setMobilePanel(btn.getAttribute("data-mobilepanel") || "main");
});

walkieRecordBtn?.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  startWalkieRecording();
});
walkieRecordBtn?.addEventListener("pointerup", (e) => {
  e.preventDefault();
  stopWalkieRecording();
});
walkieRecordBtn?.addEventListener("pointerleave", () => stopWalkieRecording());
walkieRecordBtn?.addEventListener("mousedown", (e) => {
  e.preventDefault();
  startWalkieRecording();
});
walkieRecordBtn?.addEventListener("mouseup", (e) => {
  e.preventDefault();
  stopWalkieRecording();
});
walkieRecordBtn?.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    startWalkieRecording();
  },
  { passive: false }
);
walkieRecordBtn?.addEventListener(
  "touchend",
  (e) => {
    e.preventDefault();
    stopWalkieRecording();
  },
  { passive: false }
);

window.addEventListener("keydown", (e) => {
  if (!shouldHandleWalkieHotkey(e)) return;
  if (!canWalkieTalkNow()) return;
  e.preventDefault();
  startWalkieRecording();
});
window.addEventListener("keyup", (e) => {
  if (!shouldHandleWalkieHotkey(e)) return;
  if (!canWalkieTalkNow()) return;
  e.preventDefault();
  stopWalkieRecording();
});
window.addEventListener("pointerup", () => stopWalkieRecording());
window.addEventListener("mouseup", () => stopWalkieRecording());
window.addEventListener("mousemove", (e) => {
  if (chatResizeDragging) {
    const next = chatResizeStartWidth + (e.clientX - chatResizeStartX);
    applyChatWidth(next, false);
    return;
  }
  if (sidebarResizeDragging) {
    const next = sidebarResizeStartWidth + (e.clientX - sidebarResizeStartX);
    applySidebarWidth(next, false);
    return;
  }
  if (modResizeDragging) {
    const next = modResizeStartWidth - (e.clientX - modResizeStartX);
    applyModWidth(next, false);
    return;
  }
  if (peopleResizeDragging) {
    const next = peopleResizeStartWidth - (e.clientX - peopleResizeStartX);
    applyPeopleWidth(next, false);
  }
});
window.addEventListener("mouseup", () => {
  if (chatResizeDragging && chatPanelEl) {
    applyChatWidth(chatPanelEl.getBoundingClientRect().width || readStoredChatWidth());
  }
  if (sidebarResizeDragging && sidebarPanelEl) {
    applySidebarWidth(sidebarPanelEl.getBoundingClientRect().width || readStoredSidebarWidth());
  }
  if (modResizeDragging && modPanelEl) {
    applyModWidth(modPanelEl.getBoundingClientRect().width || readStoredModWidth());
  }
  if (peopleResizeDragging && peopleDrawerEl) {
    applyPeopleWidth(peopleDrawerEl.getBoundingClientRect().width || readStoredPeopleWidth());
  }
  stopAnyPanelResize();
});

appRoot?.addEventListener(
  "touchstart",
  (e) => {
    if (!isMobileSwipeMode()) return;
    if (!e.touches || e.touches.length !== 1) return;
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    touchTracking = true;
  },
  { passive: true }
);

appRoot?.addEventListener(
  "touchend",
  (e) => {
    if (!isMobileSwipeMode() || !touchTracking) return;
    touchTracking = false;
    if (!e.changedTouches || e.changedTouches.length !== 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    if (Math.abs(dx) < 60) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx < 0) shiftMobilePanel(1);
    else shiftMobilePanel(-1);
  },
  { passive: true }
);

window.addEventListener("resize", applyMobileMode);
applyMobileMode();

window.addEventListener("focus", () => {
  windowFocused = true;
  updateNotifUi();
});
window.addEventListener("blur", () => {
  windowFocused = false;
  stopAnyPanelResize();
});
document.addEventListener("visibilitychange", () => updateNotifUi());

enableNotifsBtn?.addEventListener("click", async () => {
  if (!notifSupported()) return;
  try {
    const res = await Notification.requestPermission();
    if (res === "granted") toast("Notifications", "Enabled.");
  } catch {
    // ignore
  }
  updateNotifUi();
});

updateNotifUi();
