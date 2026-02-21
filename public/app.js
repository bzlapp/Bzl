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
const mobileNavEl = document.getElementById("mobileNav");
const mobileFourthBtn = document.getElementById("mobileFourthBtn");
const mobileMoreSheetEl = document.getElementById("mobileMoreSheet");
const mobileMoreCloseBtn = document.getElementById("mobileMoreClose");
const mobileMoreSearchEl = document.getElementById("mobileMoreSearch");
const mobileMoreListEl = document.getElementById("mobileMoreList");
const mobileScreenHostEl = document.getElementById("mobileScreenHost");
const enableNotifsBtn = document.getElementById("enableNotifs");
const notifStatus = document.getElementById("notifStatus");
const toggleReactionsEl = document.getElementById("toggleReactions");
const hivesViewModeEl = document.getElementById("hivesViewMode");
const toggleRackLayoutEl = document.getElementById("toggleRackLayout");
const toggleSideRackEl = document.getElementById("toggleSideRack");
const toggleRightRackEl = document.getElementById("toggleRightRack");
const layoutPresetEl = document.getElementById("layoutPreset");
const uiScaleEl = document.getElementById("uiScale");
const deviceLayoutEl = document.getElementById("deviceLayout");
const stayConnectedEl = document.getElementById("stayConnected");
const enableHintsEl = document.getElementById("enableHints");
const chatEnterModeEl = document.getElementById("chatEnterMode");
const openShortcutHelpBtn = document.getElementById("openShortcutHelp");
const resetCurrentLayoutBtn = document.getElementById("resetCurrentLayout");
const dockHotbarEl = document.getElementById("dockHotbar");
const showSideRackBtn = document.getElementById("showSideRack");
const showRightRackBtn = document.getElementById("showRightRack");
const chatModToggleWrapEl = document.getElementById("chatModToggleWrap");
const chatModToggleEl = document.getElementById("chatModToggle");

const authHint = document.getElementById("authHint");
const onboardingCard = document.getElementById("onboardingCard");
const onboardingBody = document.getElementById("onboardingBody");
const onboardingAcceptBtn = document.getElementById("onboardingAccept");
const onboardingRefreshBtn = document.getElementById("onboardingRefresh");
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
// Instance + plugin admin UI lives in Moderation -> Server tab (rendered dynamically).
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
const mediaModal = document.getElementById("mediaModal");
const mediaModalTitle = document.getElementById("mediaModalTitle");
const mediaModalImg = document.getElementById("mediaModalImg");
const mediaModalOpenLink = document.getElementById("mediaModalOpenLink");
const mediaModalCopyLink = document.getElementById("mediaModalCopyLink");
const mediaModalClose = document.getElementById("mediaModalClose");
const mediaModalStatus = document.getElementById("mediaModalStatus");
const shortcutHelpModal = document.getElementById("shortcutHelpModal");
const shortcutHelpCloseBtn = document.getElementById("shortcutHelpClose");

const newPostForm = document.getElementById("newPostForm");
const pollinatePanel = document.getElementById("pollinatePanel");
const toggleComposerBtn = document.getElementById("toggleComposer");
const toggleComposerInlineBtn = document.getElementById("toggleComposerInline");
const mainRackEl = document.getElementById("mainRack");
const mainWorkspaceRackEl = document.getElementById("mainWorkspaceRack");
const mainSideRackEl = document.getElementById("mainSideRack");
const hivesPanelEl = document.getElementById("hivesPanel");
const postTitleInput = document.getElementById("postTitle");
const postImageInput = document.getElementById("postImage");
const postAudioInput = document.getElementById("postAudio");
const editor = document.getElementById("editor");
const postCollectionEl = document.getElementById("postCollection");
const keywordsEl = document.getElementById("keywords");
const ttlMinutesEl = document.getElementById("ttlMinutes");
const isProtectedEl = document.getElementById("isProtected");
const postModeEl = document.getElementById("postMode");
const streamKindRowEl = document.getElementById("streamKindRow");
const streamKindEl = document.getElementById("streamKind");
const postPasswordEl = document.getElementById("postPassword");

const filterKeywordsEl = document.getElementById("filterKeywords");
const filterAuthorEl = document.getElementById("filterAuthor");
const sortByEl = document.getElementById("sortBy");
const mobileHiveSearchBtn = document.getElementById("mobileHiveSearch");
const mobileSortCycleBtn = document.getElementById("mobileSortCycle");
const clearFilterBtn = document.getElementById("clearFilter");
const feedEl = document.getElementById("feed");
const hiveTabsEl = document.getElementById("hiveTabs");
const onboardingPanelEl = document.getElementById("onboardingPanel");
const onboardingPanelBodyEl = document.getElementById("onboardingPanelBody");
const onboardingPanelAcceptBtn = document.getElementById("onboardingPanelAccept");
const onboardingPanelRefreshBtn = document.getElementById("onboardingPanelRefresh");
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
const chatContextSelectEl = document.getElementById("chatContextSelect");
const chatBackToListBtn = document.getElementById("chatBackToList");
const streamStageEl = document.getElementById("streamStage");
const streamStageTitleEl = document.getElementById("streamStageTitle");
const streamStageStatusEl = document.getElementById("streamStageStatus");
const streamStagePrimaryBtn = document.getElementById("streamStagePrimary");
const streamStageVideoEl = document.getElementById("streamStageVideo");
const streamStageAudioEl = document.getElementById("streamStageAudio");
const streamStagePlaceholderEl = document.getElementById("streamStagePlaceholder");
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

// When selecting images/audio for chat, route the insertion to the most-recently focused rich editor
// (main chat panel or a chat instance panel).
let chatUploadTargetEditor = chatEditor;
const walkieBarEl = document.getElementById("walkieBar");
const walkieRecordBtn = document.getElementById("walkieRecordBtn");
const walkieStatusEl = document.getElementById("walkieStatus");
const sidebarPanelEl = document.querySelector(".sidebar");
const chatResizeHandle = document.getElementById("chatResizeHandle");
const sidebarResizeHandle = document.getElementById("sidebarResizeHandle");
const mainResizeHandle = document.getElementById("mainResizeHandle");
const chatPanelEl = document.querySelector(".chat");
const peopleResizeHandle = document.getElementById("peopleResizeHandle");
const chatHeaderEl = chatPanelEl ? chatPanelEl.querySelector(".panelHeader") : null;
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
const editModalModeSelect = document.getElementById("editModalMode");
const editModalStreamKindRow = document.getElementById("editModalStreamKindRow");
const editModalStreamKindSelect = document.getElementById("editModalStreamKind");
const editModalPasswordRow = document.getElementById("editModalPasswordRow");
const editModalPasswordInput = document.getElementById("editModalPassword");
const editModalToolbar = document.getElementById("editModalToolbar");
const editModalEditor = document.getElementById("editModalEditor");
const editModalImageInput = document.getElementById("editModalImage");
const editModalAudioInput = document.getElementById("editModalAudio");

// Temporarily force rack mode on (hide toggle) while the feature stabilizes.
const FORCE_RACK_MODE = true;

// Display prefs (device layout + text scale)
const UI_SCALE_KEY = "bzl_uiScale"; // "auto" | "xs" | "sm" | "md" | "lg"
const DEVICE_LAYOUT_KEY = "bzl_deviceLayout"; // "auto" | "widescreen" | "fourThree" | "threeTwo" | "ultrawide" | "portrait"

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
let activeMapsRoomId = "";
let activeMapsRoomTitle = "";
let activeMapsChatScope = "local"; // "local" | "global"
/** @type {Map<string, any[]>} */
const mapsChatGlobalByMapId = new Map();
/** @type {Map<string, any[]>} */
const mapsChatLocalByMapId = new Map();
let pendingProfileImage = "";
let windowFocused = true;
let typingStopTimer = null;
let lastTypingSentAt = 0;
let modTab = "reports";
let onboardingViewerTab = "about";
let onboardingAdminTab = "about";
let onboardingAdminDraft = {
  enabled: true,
  aboutContent: "",
  requireAcceptance: false,
  blockReadUntilAccepted: false,
  roleSelectEnabled: true,
  selfAssignableRoleIds: [],
  rules: [],
};
let onboardingAdminDraftStamp = "";
const onboardingAdminExpandedRuleIds = new Set();
let modReports = [];
let modUsers = [];
let modLog = [];
let devLog = [];
let modLogView = localStorage.getItem("bzl_modLogView") || "dev"; // "dev" | "moderation"
let devLogAutoScroll = localStorage.getItem("bzl_devLogAutoScroll") !== "0";
let modModalContext = null;
let lanUrls = [];
const MOBILE_LAYOUT_KEY = "bzl_mobile_layout_v1";
let mobilePanel = "hives"; // Back-compat: used by older call sites (maps to mobile "screen" now).
let mobileMoreOpen = false;
let mobileHostPanelId = "";
const mobileHostRestoreParentByPanelId = new Map();
const mobileHostedPanelIds = new Set();
const mobileHostEphemeralPanelIds = new Set();
let composerOpen = false;
let touchStartX = 0;
let touchStartY = 0;
let touchTracking = false;
let peopleOpen = false;
let peopleTab = "members";
let peopleMembers = [];
let openPostMenuId = "";

// Multi-instance chat panels (MVP: per-hive/post chat panels).
/** @type {Map<string, {postId:string}>} */
const chatPanelInstances = new Map();

function isChatInstancePanelId(panelId) {
  const id = String(panelId || "");
  return id.startsWith("chat:post:");
}

function chatInstancePanelIdForPost(postId) {
  const pid = String(postId || "").trim();
  if (!pid) return "";
  return `chat:post:${pid}`;
}
let dmThreads = [];
/** @type {Map<string, any>} */
let dmThreadsById = new Map();
/** @type {Map<string, any[]>} */
const dmMessagesByThreadId = new Map();
let activeDmThreadId = null;
let pendingOpenDmThreadId = "";
const CHAT_RECENTS_LIMIT = 24;
let recentHiveChatIds = [];
let recentDmChatThreadIds = [];
let syncingChatContextSelect = false;
let walkieRecording = false;
let walkieStartAt = 0;
let walkieRecorder = null;
let walkieChunks = [];
let walkieCtx = null;
let walkieMicStream = null;
let walkieMixNode = null;
let walkieDestNode = null;
let walkieDispatchBuffer = null;
let streamEnabled = false;
let streamIceServers = [{ urls: ["stun:stun.l.google.com:19302"] }];
const streamLiveByPostId = new Map();
let streamCurrentPostId = "";
let streamCurrentRole = "idle"; // "idle" | "viewer" | "host"
let streamCurrentHostClientId = "";
let streamRemoteHostClientId = "";
let streamLocalMedia = null;
let streamRemoteMedia = null;
let streamRemoteKind = "webcam";
const streamPeerByClientId = new Map();
const SESSION_TOKEN_KEY = "bzl_session_token";
const CLIENT_IMAGE_UPLOAD_MAX_BYTES = 100 * 1024 * 1024;
const CLIENT_AUDIO_UPLOAD_MAX_BYTES = 150 * 1024 * 1024;
let allowedPostReactions = ["👍", "❤️", "😡", "😭", "🥺", "😂", "⭐"];
let allowedChatReactions = ["👍", "❤️", "😡", "😭", "🥺", "😂"];
let userPrefs = { starredPostIds: [], hiddenPostIds: [], ignoredUsers: [], blockedUsers: [] };
let showReactions = localStorage.getItem("bzl_showReactions") !== "0";
let chatDock = localStorage.getItem("bzl_chatDock") === "right" ? "right" : "left";
let activeHiveView = "all";
let collections = [];
let customRoles = [];
let plugins = [];
const loadedPluginClientVersionById = new Map(); // pluginId -> version string
let centerView = "hives";
const HIVES_VIEW_MODE_KEY = "bzl_hivesViewMode";
const HIVES_LIST_AUTO_THRESHOLD_PX = 520;
let lastHivesWidthPx = 0;
let hivesResizeObserver = null;

// --- Rack layout (experimental) ------------------------------------------------

const RACK_LAYOUT_ENABLED_KEY = "bzl_rackLayout_enabled";
const RACK_LAYOUT_STATE_KEY = "bzl_rackLayout_state_v2";
const RACK_SIDE_COLLAPSED_KEY = "bzl_rackLayout_sideCollapsed";
const RACK_RIGHT_COLLAPSED_KEY = "bzl_rackLayout_rightCollapsed";
const WORKSPACE_EXPANDED_PRIMARY_KEY = "bzl_workspace_expandedPrimary";
const WORKSPACE_EXPANDED_DISPLACED_KEY = "bzl_workspace_expandedDisplaced";

/**
 * @typedef {{
 *   version: 2,
 *   presetId: string,
 *   docked: { bottom: string[] },
 *   racks?: { workspaceLeft?: string[], workspaceRight?: string[], side?: string[], right?: string[] },
 * }} RackLayoutState
 */

/** @type {RackLayoutState} */
let rackLayoutState = {
  version: 2,
  presetId: "onboardingDefault",
  docked: { bottom: [] },
  racks: { workspaceLeft: [], workspaceRight: [], side: [], right: [] },
};
let rackLayoutEnabled = false;
let rightRackEl = null;
let mainRack = null;
let mainSideRack = null;
const WORKSPACE_ACTIVE_PRIMARY_KEY = "bzl_workspace_activePrimary";

function readBoolPref(key, fallback = false) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return raw === "1" || raw === "true";
  } catch {
    return fallback;
  }
}

function writeBoolPref(key, value) {
  try {
    localStorage.setItem(key, value ? "1" : "0");
  } catch {
    // ignore
  }
}

function readWorkspaceExpandedPrimary() {
  return readStringPref(WORKSPACE_EXPANDED_PRIMARY_KEY, "").trim();
}

function writeWorkspaceExpandedPrimary(panelId) {
  writeStringPref(WORKSPACE_EXPANDED_PRIMARY_KEY, String(panelId || "").trim());
}

function readWorkspaceExpandedDisplaced() {
  return readStringPref(WORKSPACE_EXPANDED_DISPLACED_KEY, "").trim();
}

function writeWorkspaceExpandedDisplaced(panelId) {
  writeStringPref(WORKSPACE_EXPANDED_DISPLACED_KEY, String(panelId || "").trim());
}

function clearWorkspaceExpandedState() {
  writeWorkspaceExpandedPrimary("");
  writeWorkspaceExpandedDisplaced("");
}

function togglePrimaryExpand(panelId) {
  if (!rackLayoutEnabled) return;
  const id = String(panelId || "").trim();
  if (!id) return;
  if (!panelCanExpand(id)) return;

  const current = readWorkspaceExpandedPrimary();
  const left = ensureWorkspaceLeftRack();
  const right = ensureWorkspaceRightRack();
  if (!left || !right) return;

  // If the panel isn't in a workspace slot, pull it into the workspace first.
  const panelEl = getPanelElement(id);
  if (panelEl) {
    const inWorkspace = panelEl.parentElement === left || panelEl.parentElement === right;
    if (!inWorkspace) {
      const leftExisting = left.querySelector?.(":scope > .rackPanel:not(.hidden)");
      const rightExisting = right.querySelector?.(":scope > .rackPanel:not(.hidden)");
      const leftEmpty = !leftExisting;
      const rightEmpty = !rightExisting;
      // Prefer the right slot for "aux" expandables like Moderation/Composer.
      const target = rightEmpty ? right : leftEmpty ? left : right;
      const existing = target === left ? leftExisting : rightExisting;
      if (existing instanceof HTMLElement && existing !== panelEl) {
        const existingId = String(existing.dataset?.panelId || "").trim();
        if (existingId) dockPanel(existingId);
      }
      target.appendChild(panelEl);
      syncRackStateFromDom();
      enforceWorkspaceRules();
    }
  }

  const leftPanel = left.querySelector?.(":scope > .rackPanel");
  const rightPanel = right.querySelector?.(":scope > .rackPanel");
  const leftId = String(leftPanel?.dataset?.panelId || "").trim();
  const rightId = String(rightPanel?.dataset?.panelId || "").trim();

  if (current && current === id) {
    // Collapse: try to restore the displaced panel (if any) back into the now-visible other slot.
    const displaced = readWorkspaceExpandedDisplaced();
    clearWorkspaceExpandedState();
    if (displaced && isDocked(displaced)) {
      undockPanel(displaced);
      const el = getPanelElement(displaced);
      if (el) {
        if (leftId === id && !rightId) right.appendChild(el);
        else if (rightId === id && !leftId) left.appendChild(el);
      }
    }
    enforceWorkspaceRules();
    return;
  }

  // Expand: if the other slot is occupied, dock it so it stays accessible via hotbar.
  writeWorkspaceExpandedPrimary(id);
  let displaced = "";
  if (leftId === id && rightId) displaced = rightId;
  if (rightId === id && leftId) displaced = leftId;
  if (displaced && displaced !== id) {
    writeWorkspaceExpandedDisplaced(displaced);
    dockPanel(displaced);
  } else {
    writeWorkspaceExpandedDisplaced("");
  }
  enforceWorkspaceRules();
}

function readStringPref(key, fallback = "") {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return String(raw);
  } catch {
    return fallback;
  }
}

function normalizeUiScale(raw) {
  const v = String(raw || "").trim().toLowerCase();
  if (v === "auto") return "auto";
  if (v === "xs" || v === "compact") return "xs";
  if (v === "sm" || v === "small") return "sm";
  if (v === "lg" || v === "large") return "lg";
  return "md";
}

function normalizeDeviceLayout(raw) {
  const v = String(raw || "").trim().toLowerCase();
  if (v === "widescreen") return "widescreen";
  if (v === "fourthree" || v === "fourThree".toLowerCase() || v === "4:3" || v === "4x3") return "fourThree";
  if (v === "threetwo" || v === "threeTwo".toLowerCase() || v === "3:2" || v === "3x2") return "threeTwo";
  if (v === "ultrawide") return "ultrawide";
  if (v === "portrait") return "portrait";
  return "auto";
}

function detectViewportSize() {
  const w = Math.max(1, Number(window.innerWidth) || 1);
  const h = Math.max(1, Number(window.innerHeight) || 1);
  // Keep this intentionally simple: we mostly care about "can we fit columns sanely?"
  // Consider both width and height so low-res (ex: 1280x720) can auto-compact.
  if (w <= 1100 || h <= 720) return "xs";
  if (w <= 1400 || h <= 820) return "sm";
  if (w <= 1800) return "md";
  return "lg";
}

function detectAspectLayout() {
  const w = Math.max(1, Number(window.innerWidth) || 1);
  const h = Math.max(1, Number(window.innerHeight) || 1);
  const ratio = w / h;
  // Heuristics:
  // - Portrait: <= ~1.25
  // - 4:3-ish: 1.25..1.38
  // - 3:2-ish: 1.38..1.62 (covers 3:2 and nearby)
  // - Widescreen: 1.62..1.95 (16:10..~2:1)
  // - Ultrawide: >= 1.95
  if (ratio <= 1.25) return "portrait";
  if (ratio < 1.38) return "fourThree";
  if (ratio >= 1.38 && ratio < 1.62) return "threeTwo";
  if (ratio >= 1.95) return "ultrawide";
  return "widescreen";
}

function applyDisplayPrefs() {
  const root = document.documentElement;
  if (!root) return;
  const scalePref = normalizeUiScale(readStringPref(UI_SCALE_KEY, "auto"));
  const layoutPref = normalizeDeviceLayout(readStringPref(DEVICE_LAYOUT_KEY, "auto"));
  const layout = layoutPref === "auto" ? detectAspectLayout() : layoutPref;
  const viewport = detectViewportSize();
  const scale =
    scalePref === "auto" ? (viewport === "xs" ? "xs" : viewport === "sm" ? "sm" : "md") : scalePref;

  root.dataset.uiScale = scale;
  root.dataset.uiScalePref = scalePref;
  root.dataset.deviceLayout = layoutPref;
  root.dataset.aspect = layout;
  root.dataset.viewport = viewport;

  if (uiScaleEl) uiScaleEl.value = scalePref;
  if (deviceLayoutEl) deviceLayoutEl.value = layoutPref;
}

function initDisplayPrefsUi() {
  applyDisplayPrefs();
  if (uiScaleEl) {
    uiScaleEl.value = normalizeUiScale(readStringPref(UI_SCALE_KEY, "auto"));
    uiScaleEl.addEventListener("change", () => {
      const next = normalizeUiScale(uiScaleEl.value);
      try {
        localStorage.setItem(UI_SCALE_KEY, next);
      } catch {
        // ignore
      }
      applyDisplayPrefs();
    });
  }
  if (deviceLayoutEl) {
    deviceLayoutEl.value = normalizeDeviceLayout(readStringPref(DEVICE_LAYOUT_KEY, "auto"));
    deviceLayoutEl.addEventListener("change", () => {
      const next = normalizeDeviceLayout(deviceLayoutEl.value);
      try {
        localStorage.setItem(DEVICE_LAYOUT_KEY, next);
      } catch {
        // ignore
      }
      applyDisplayPrefs();
    });
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resizeTimer = null;
      // Always re-apply (viewport changes matter even when layout is manually pinned).
      applyDisplayPrefs();
    }, 90);
  });
}

function writeStringPref(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // ignore
  }
}

function resolveHivesViewMode() {
  const pref = readStringPref(HIVES_VIEW_MODE_KEY, "list");
  const normalized = String(pref || "auto").toLowerCase();
  if (normalized === "list") return "list";
  if (normalized === "cards") return "cards";
  // auto (currently treated as list by default; we can reintroduce responsive modes later)
  return "list";
}

function applyHivesViewMode() {
  const mode = resolveHivesViewMode();
  const list = mode === "list";
  feedEl?.classList.toggle("hivesListView", list);
  hivesPanelEl?.classList.toggle("hivesListView", list);
}

function installHivesAutoViewMode() {
  if (!hivesPanelEl) return;
  if (typeof ResizeObserver === "undefined") {
    window.addEventListener("resize", () => applyHivesViewMode());
    return;
  }
  if (hivesResizeObserver) return;
  hivesResizeObserver = new ResizeObserver((entries) => {
    const entry = entries && entries[0];
    const w = Number(entry?.contentRect?.width || 0);
    if (!w) return;
    const rounded = Math.round(w);
    if (rounded === lastHivesWidthPx) return;
    lastHivesWidthPx = rounded;
    applyHivesViewMode();
  });
  try {
    hivesResizeObserver.observe(hivesPanelEl);
  } catch {
    // ignore
  }
}

function setSideCollapsed(collapsed, opts) {
  const options = opts && typeof opts === "object" ? opts : {};
  const persist = options.persist !== false;
  const updateControls = options.updateControls !== false;
  if (!appRoot) return;
  appRoot.classList.toggle("sideCollapsed", Boolean(collapsed));
  if (persist) writeBoolPref(RACK_SIDE_COLLAPSED_KEY, Boolean(collapsed));
  if (updateControls && toggleSideRackEl) toggleSideRackEl.checked = !Boolean(collapsed);
  updateSideRackEmptyState();
}

function setRightCollapsed(collapsed, opts) {
  const options = opts && typeof opts === "object" ? opts : {};
  const persist = options.persist !== false;
  const updateControls = options.updateControls !== false;
  if (!appRoot) return;
  appRoot.classList.toggle("rightCollapsed", Boolean(collapsed));
  if (persist) writeBoolPref(RACK_RIGHT_COLLAPSED_KEY, Boolean(collapsed));
  if (updateControls && toggleRightRackEl) toggleRightRackEl.checked = !Boolean(collapsed);
}

function updateSideRackEmptyState() {
  if (!appRoot) return;
  const side = mainSideRackEl || mainSideRack || document.getElementById("mainSideRack");
  if (!(side instanceof HTMLElement)) return;
  const hasVisible = Boolean(side.querySelector?.(".rackPanel:not(.hidden)"));
  appRoot.classList.toggle("sideRackEmpty", !hasVisible);
}

// Panel registry (skeleton): this will become the primary way core + plugins register UI panels.
// For now, it powers rack mode (docking + ordering + workspace rules) and plugin panel shells.
/** @type {Map<string, {id:string,title:string,icon?:string,source:string,role:string,defaultRack:string,element?:HTMLElement|null}>} */
const panelRegistry = new Map();

function registerCorePanel(def) {
  const id = String(def?.id || "").trim();
  if (!id) return;
  const title = String(def?.title || id).trim();
  const icon = typeof def?.icon === "string" ? def.icon : "";
  const role = typeof def?.role === "string" ? def.role : "aux";
  const defaultRack = typeof def?.defaultRack === "string" ? def.defaultRack : "right";
  const element = def?.element instanceof HTMLElement ? def.element : null;
  panelRegistry.set(id, { id, title, icon, source: "core", role, defaultRack, element });
}

function togglePanelSkinny(panelId) {
  if (!rackLayoutEnabled) return;
  const id = String(panelId || "").trim();
  if (!id) return;
  if (!panelIsSkinnyCapable(id)) return;
  const panelEl = getPanelElement(id);
  if (!panelEl) return;

  const left = ensureWorkspaceLeftRack();
  const right = ensureWorkspaceRightRack();
  const side = ensureMainSideRack();
  if (!left || !right || !side) return;

  const parentId = rackIdForPanelElement(panelEl);
  const inSkinny = parentId === "mainSideRack" || parentId === "rightRack";

  if (inSkinny) {
    // Move to workspace (prefer an empty slot; otherwise prefer right).
    const leftExisting = left.querySelector?.(":scope > .rackPanel:not(.hidden)");
    const rightExisting = right.querySelector?.(":scope > .rackPanel:not(.hidden)");
    const target = !rightExisting ? right : !leftExisting ? left : right;
    const existing = target === left ? leftExisting : rightExisting;
    if (existing instanceof HTMLElement && existing !== panelEl) {
      const existingId = String(existing.dataset?.panelId || "").trim();
      if (existingId) dockPanel(existingId);
    }
    target.appendChild(panelEl);
    rememberPanelLastRack(id, target.id);
    saveRackLayoutState();
    syncRackStateFromDom();
    enforceWorkspaceRules();
    return;
  }

  // Move to side rack (skinny).
  setSideCollapsed(false);
  side.prepend(panelEl);
  rememberPanelLastRack(id, side.id);
  saveRackLayoutState();
  syncRackStateFromDom();
  enforceWorkspaceRules();
}

registerCorePanel({ id: "chat", title: "Chat", icon: "💬", role: "primary", defaultRack: "main", element: chatPanelEl });
registerCorePanel({ id: "hives", title: "Hives", icon: "🐝", role: "primary", defaultRack: "main", element: hivesPanelEl });
registerCorePanel({ id: "onboarding", title: "Onboarding", icon: "🧭", role: "primary", defaultRack: "main", element: onboardingPanelEl });
registerCorePanel({ id: "people", title: "People", icon: "👥", role: "aux", defaultRack: "right", element: peopleDrawerEl });
registerCorePanel({ id: "moderation", title: "Moderation", icon: "🛡️", role: "aux", defaultRack: "right", element: modPanelEl });
registerCorePanel({ id: "profile", title: "Profile", icon: "👤", role: "transient", defaultRack: "main", element: profileViewPanel });
registerCorePanel({ id: "composer", title: "New Hive", icon: "✍️", role: "aux", defaultRack: "main", element: pollinatePanel });

let pluginRackPanelEl = null;
let pluginRackWidgetsRackEl = null;
let pluginRackAddMenuEl = null;

function closePluginRackAddMenu() {
  if (!pluginRackAddMenuEl) return;
  try {
    pluginRackAddMenuEl.remove();
  } catch {
    // ignore
  }
  pluginRackAddMenuEl = null;
}

function panelIsPluginOwned(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return false;
  if (id.startsWith("chat:")) return false;
  const entry = panelRegistry.get(id);
  const src = typeof entry?.source === "string" ? entry.source : "";
  return src.startsWith("plugin:");
}

function panelIsHostableInPluginRack(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return false;
  if (id === "pluginRack") return false;
  if (!panelIsPluginOwned(id)) return false;
  // Widgets should be small, stackable tools (not full workspace surfaces like Maps).
  if (panelRole(id) === "primary") return false;
  return true;
}

function ensurePluginRackPanel() {
  if (pluginRackPanelEl instanceof HTMLElement && pluginRackPanelEl.isConnected) return pluginRackPanelEl;

  if (!(pluginRackPanelEl instanceof HTMLElement)) {
    const shell = document.createElement("section");
    shell.className = "panel panelFill pluginRackPanel rackPanel";
    shell.dataset.panelId = "pluginRack";
    shell.innerHTML = `
      <div class="panelHeader">
        <div class="panelTitle">${escapeHtml("Plugin Rack")}</div>
        <div class="row"></div>
      </div>
      <div class="panelBody pluginRackBody">
        <div class="pluginRackToolbar">
          <button type="button" class="ghost smallBtn" data-pluginrackadd="1">+ Add widget</button>
          <div class="small muted pluginRackHint">Drop plugin panels here to stack them.</div>
        </div>
        <div id="pluginRackWidgetsRack" class="pluginRackWidgets" aria-label="Plugin widgets"></div>
      </div>
    `;
    pluginRackPanelEl = shell;
    pluginRackWidgetsRackEl = shell.querySelector("#pluginRackWidgetsRack");

    shell.querySelector("[data-pluginrackadd]")?.addEventListener("click", (e) => {
      const anchor = e.currentTarget;
      if (pluginRackAddMenuEl) closePluginRackAddMenu();
      else openPluginRackAddMenu(anchor);
    });
  }

  // Ensure it's registered as a core panel for docking + layout state.
  registerCorePanel({ id: "pluginRack", title: "Plugin Rack", icon: "🧩", role: "aux", defaultRack: "main", element: pluginRackPanelEl });

  // Append into the DOM so it can be docked/restored. (It will typically live in the hotbar.)
  const side = ensureMainSideRack();
  if (side && pluginRackPanelEl.parentElement !== side) side.appendChild(pluginRackPanelEl);

  return pluginRackPanelEl;
}

function ensurePluginRackWidgetsRack() {
  ensurePluginRackPanel();
  return pluginRackWidgetsRackEl instanceof HTMLElement ? pluginRackWidgetsRackEl : null;
}

function readPluginRackWidgetsOrder() {
  const rack = ensurePluginRackWidgetsRack();
  return rack ? readRackOrder(rack) : [];
}

function removePanelFromPluginRack(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return;
  rackLayoutState.pluginRackWidgets = Array.isArray(rackLayoutState.pluginRackWidgets)
    ? rackLayoutState.pluginRackWidgets.filter((x) => x !== id)
    : [];
  const el = getPanelElement(id);
  if (el) el.classList.remove("pluginRackWidget");
  const rack = ensurePluginRackWidgetsRack();
  if (rack && el && el.parentElement === rack) rack.removeChild(el);
  const side = ensureMainSideRack();
  if (side && el && !el.parentElement) side.appendChild(el);
}

function hostPanelInPluginRack(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return;
  if (!rackLayoutEnabled) return;
  if (!panelIsHostableInPluginRack(id)) {
    toast("Can't add widget", `${panelTitle(id)} can't be hosted in Plugin Rack.`);
    return;
  }

  const rack = ensurePluginRackWidgetsRack();
  const el = getPanelElement(id);
  if (!rack || !el) return;

  // Hosting implies it should be visible in the rack, not docked.
  if (isDocked(id)) undockPanel(id);

  const lastRack = rackIdForPanelElement(el);
  if (lastRack) rememberPanelLastRack(id, lastRack);

  el.classList.add("pluginRackWidget");
  if (el.parentElement !== rack) rack.appendChild(el);

  const next = new Set(Array.isArray(rackLayoutState.pluginRackWidgets) ? rackLayoutState.pluginRackWidgets : []);
  next.add(id);
  rackLayoutState.pluginRackWidgets = Array.from(next);
  saveRackLayoutState();
  syncRackStateFromDom();
  enforceWorkspaceRules();
}

function openPluginRackAddMenu(anchorEl) {
  closePluginRackAddMenu();
  if (!(anchorEl instanceof HTMLElement)) return;
  if (!rackLayoutEnabled) return;

  const hosted = new Set(Array.isArray(rackLayoutState.pluginRackWidgets) ? rackLayoutState.pluginRackWidgets : []);
  const candidates = Array.from(panelRegistry.keys())
    .filter((id) => panelIsHostableInPluginRack(id) && !hosted.has(id))
    .sort((a, b) => panelTitle(a).localeCompare(panelTitle(b)));

  const items = candidates
    .map((id) => `<button type="button" class="ghost smallBtn" data-pluginrackhost="${escapeHtml(id)}">${escapeHtml(panelTitle(id))}</button>`)
    .join("");

  const menu = document.createElement("div");
  menu.className = "hotbarAddMenu pluginRackAddMenu";
  menu.innerHTML = `
    <div class="small muted" style="padding:6px 8px 4px;">Add widget</div>
    <div class="hotbarAddMenuList">${items || `<div class="small muted" style="padding:6px 8px;">No plugin widgets available.</div>`}</div>
  `;

  const rect = anchorEl.getBoundingClientRect();
  const left = Math.max(12, Math.min(window.innerWidth - 260, rect.left));
  const top = Math.max(12, Math.min(window.innerHeight - 320, rect.bottom + 8));
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;

  menu.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-pluginrackhost]");
    if (!btn) return;
    const id = String(btn.getAttribute("data-pluginrackhost") || "").trim();
    if (!id) return;
    hostPanelInPluginRack(id);
    closePluginRackAddMenu();
  });

  document.body.appendChild(menu);
  pluginRackAddMenuEl = menu;
}

// Rack mode: Profile should behave like a normal dockable panel (not a flow that replaces Hives).
// Override the role after the initial core registration (Map#set will replace the previous entry).
panelRegistry.set("profile", { ...(panelRegistry.get("profile") || { id: "profile", source: "core" }), role: "aux" });

// Expose for quick inspection in the browser console while iterating.
window.__bzlPanels = { panelRegistry };

const PRESET_DEFS = {
  // Presets are hard-applied (exact placement). Anything not explicitly placed starts in the hotbar.
  // Workspace uses two full-height primary slots (left + right). No vertical splits.
  onboardingDefault: {
    presetId: "onboardingDefault",
    label: "Onboarding (Default)",
    group: "user",
    workspaceLeftOrder: ["onboarding"],
    workspaceRightOrder: ["hives"],
    sideOrder: ["chat", "profile", "composer"],
    sideCollapsed: false,
    rightOrder: ["people"],
    dockBottom: ["pluginRack", "maps", "library-browser", "library-shelf", "library-reader"],
  },
  social: {
    presetId: "social",
    label: "Default (Social)",
    group: "user",
    workspaceLeftOrder: ["hives"],
    workspaceRightOrder: ["chat"],
    sideOrder: ["profile", "composer"],
    sideCollapsed: true,
    rightOrder: ["people"],
    dockBottom: ["pluginRack", "maps", "library-browser", "library-shelf", "library-reader"],
  },
  chatFocus: {
    presetId: "chatFocus",
    label: "Chat Focus",
    group: "user",
    workspaceLeftOrder: ["chat"],
    workspaceRightOrder: [],
    expandedPrimary: "chat",
    sideOrder: ["profile"],
    sideCollapsed: true,
    rightOrder: ["people"],
    dockBottom: ["pluginRack", "hives", "composer", "maps", "library-browser", "library-shelf", "library-reader"],
  },
  browse: {
    presetId: "browse",
    label: "Browse",
    group: "user",
    workspaceLeftOrder: ["hives"],
    workspaceRightOrder: [],
    expandedPrimary: "hives",
    sideOrder: ["chat"],
    sideCollapsed: true,
    rightOrder: ["profile"],
    dockBottom: ["pluginRack", "people", "composer", "maps", "library-browser", "library-shelf", "library-reader"],
  },
  creator: {
    presetId: "creator",
    label: "Creator",
    group: "user",
    workspaceLeftOrder: ["hives"],
    workspaceRightOrder: ["composer"],
    composerOpen: true,
    sideOrder: ["people"],
    sideCollapsed: true,
    rightOrder: ["profile"],
    dockBottom: ["pluginRack", "chat", "maps", "library-browser", "library-shelf", "library-reader"],
  },
  mapsSession: {
    presetId: "mapsSession",
    label: "Maps Session",
    group: "user",
    workspaceLeftOrder: ["maps"], // if installed
    workspaceRightOrder: ["chat"],
    sideOrder: ["hives"],
    sideCollapsed: true,
    rightOrder: ["people"],
    dockBottom: ["pluginRack", "profile", "composer", "library-browser", "library-shelf", "library-reader"],
  },
  quiet: {
    presetId: "quiet",
    label: "Quiet (No People)",
    group: "user",
    workspaceLeftOrder: ["hives"],
    workspaceRightOrder: ["profile"],
    sideOrder: ["composer"],
    sideCollapsed: true,
    rightOrder: [],
    rightCollapsed: true,
    dockBottom: ["pluginRack", "chat", "people", "maps", "library-browser", "library-shelf", "library-reader"],
  },
  readingNook: {
    presetId: "readingNook",
    label: "Reading Nook",
    group: "user",
    workspaceLeftOrder: ["library-reader"],
    workspaceRightOrder: ["library-shelf"],
    sideOrder: ["profile"],
    sideCollapsed: true,
    rightOrder: ["people"],
    dockBottom: ["pluginRack", "hives", "chat", "composer", "maps", "library-browser"],
  },
  libraryCurator: {
    presetId: "libraryCurator",
    label: "Library Curator",
    group: "user",
    workspaceLeftOrder: ["library-browser"],
    workspaceRightOrder: ["library-shelf"],
    sideOrder: ["profile"],
    sideCollapsed: true,
    rightOrder: ["people"],
    dockBottom: ["pluginRack", "hives", "chat", "composer", "maps", "library-reader"],
  },
  ops: {
    presetId: "ops",
    label: "Ops",
    group: "mod",
    modOnly: true,
    workspaceLeftOrder: ["moderation"],
    workspaceRightOrder: ["chat"],
    sideOrder: ["hives"],
    sideCollapsed: true,
    rightOrder: ["people"],
    dockBottom: ["pluginRack", "profile", "composer", "maps", "library-browser", "library-shelf", "library-reader"],
  },
  reportsFocus: {
    presetId: "reportsFocus",
    label: "Reports Focus",
    group: "mod",
    modOnly: true,
    workspaceLeftOrder: ["moderation"],
    workspaceRightOrder: [],
    expandedPrimary: "moderation",
    sideOrder: ["people"],
    sideCollapsed: true,
    rightOrder: ["chat"],
    dockBottom: ["pluginRack", "hives", "profile", "composer", "maps", "library-browser", "library-shelf", "library-reader"],
  },
  communityWatch: {
    presetId: "communityWatch",
    label: "Community Watch",
    group: "mod",
    modOnly: true,
    workspaceLeftOrder: ["hives"],
    workspaceRightOrder: ["moderation"],
    sideOrder: ["chat"],
    sideCollapsed: true,
    rightOrder: ["people"],
    dockBottom: ["pluginRack", "profile", "composer", "maps", "library-browser", "library-shelf", "library-reader"],
  },
  serverAdmin: {
    presetId: "serverAdmin",
    label: "Server Admin",
    group: "mod",
    modOnly: true,
    workspaceLeftOrder: ["moderation"],
    workspaceRightOrder: ["hives"],
    sideOrder: ["chat"],
    sideCollapsed: true,
    rightOrder: ["people"],
    dockBottom: ["pluginRack", "profile", "composer", "maps", "library-browser", "library-shelf", "library-reader"],
  },
};

const PRESET_ALIASES = {
  // Back-compat for older preset ids.
  discordLike: "social",
  onboarding: "onboardingDefault",
  chat: "chatFocus",
  browsing: "browse",
  maps: "mapsSession",
  focus: "quiet",
  clean: "social",
  moderation: "ops",
  reading: "readingNook",
  library: "libraryCurator",
};

function resolvePresetKey(presetId) {
  const raw = String(presetId || "").trim();
  const mapped = Object.prototype.hasOwnProperty.call(PRESET_ALIASES, raw) ? PRESET_ALIASES[raw] : raw;
  return Object.prototype.hasOwnProperty.call(PRESET_DEFS, mapped) ? mapped : "onboardingDefault";
}

function updateLayoutPresetOptions() {
  if (!layoutPresetEl) return;
  const current = resolvePresetKey(rackLayoutState?.presetId || layoutPresetEl.value || "onboardingDefault");

  const defs = Object.values(PRESET_DEFS).filter((d) => d && typeof d === "object");
  const userDefs = defs.filter((d) => d.group === "user");
  const modDefs = defs.filter((d) => d.group === "mod");

  const makeOpt = (def) => {
    const opt = document.createElement("option");
    opt.value = String(def.presetId || "");
    opt.textContent = String(def.label || def.presetId || "Preset");
    return opt;
  };

  layoutPresetEl.innerHTML = "";

  const userGroup = document.createElement("optgroup");
  userGroup.label = "Presets";
  for (const def of userDefs) userGroup.appendChild(makeOpt(def));
  layoutPresetEl.appendChild(userGroup);

  if (canModerate) {
    const modGroup = document.createElement("optgroup");
    modGroup.label = "Moderation (mods)";
    for (const def of modDefs) modGroup.appendChild(makeOpt(def));
    layoutPresetEl.appendChild(modGroup);
  }

  const nextValue = canModerate ? current : (PRESET_DEFS[current]?.modOnly ? "onboardingDefault" : current);
  layoutPresetEl.value = Object.prototype.hasOwnProperty.call(PRESET_DEFS, nextValue) ? nextValue : "onboardingDefault";
}

function readRackLayoutEnabled() {
  if (FORCE_RACK_MODE) return true;
  try {
    return localStorage.getItem(RACK_LAYOUT_ENABLED_KEY) === "1";
  } catch {
    return false;
  }
}

function writeRackLayoutEnabled(enabled) {
  if (FORCE_RACK_MODE) {
    rackLayoutEnabled = true;
    try {
      localStorage.setItem(RACK_LAYOUT_ENABLED_KEY, "1");
    } catch {
      // ignore
    }
    return;
  }
  rackLayoutEnabled = Boolean(enabled);
  try {
    localStorage.setItem(RACK_LAYOUT_ENABLED_KEY, rackLayoutEnabled ? "1" : "0");
  } catch {
    // ignore
  }
}

/** @returns {RackLayoutState} */
function loadRackLayoutState() {
  try {
    const raw = localStorage.getItem(RACK_LAYOUT_STATE_KEY);
    if (!raw)
      return {
        version: 2,
        presetId: "onboardingDefault",
        docked: { bottom: [] },
        racks: { workspaceLeft: [], workspaceRight: [], side: [], right: [] },
        pluginRackWidgets: [],
        lastRackByPanelId: {},
      };
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 2)
      return {
        version: 2,
        presetId: "onboardingDefault",
        docked: { bottom: [] },
        racks: { workspaceLeft: [], workspaceRight: [], side: [], right: [] },
        pluginRackWidgets: [],
        lastRackByPanelId: {},
      };
    const bottom = Array.isArray(parsed?.docked?.bottom) ? parsed.docked.bottom.map((x) => String(x || "")).filter(Boolean) : [];
    const pluginRackWidgets = Array.isArray(parsed?.pluginRackWidgets)
      ? parsed.pluginRackWidgets.map((x) => String(x || "")).filter(Boolean)
      : [];
    const presetId = typeof parsed?.presetId === "string" ? parsed.presetId : "onboardingDefault";
    const workspaceLeft = Array.isArray(parsed?.racks?.workspaceLeft) ? parsed.racks.workspaceLeft.map((x) => String(x || "")).filter(Boolean) : [];
    const workspaceRight = Array.isArray(parsed?.racks?.workspaceRight) ? parsed.racks.workspaceRight.map((x) => String(x || "")).filter(Boolean) : [];
    const side = Array.isArray(parsed?.racks?.side) ? parsed.racks.side.map((x) => String(x || "")).filter(Boolean) : [];
    const right = Array.isArray(parsed?.racks?.right) ? parsed.racks.right.map((x) => String(x || "")).filter(Boolean) : [];
    const lastRackByPanelIdRaw = parsed?.lastRackByPanelId && typeof parsed.lastRackByPanelId === "object" ? parsed.lastRackByPanelId : {};
    const lastRackByPanelId = {};
    for (const [k, v] of Object.entries(lastRackByPanelIdRaw)) {
      const id = String(k || "").trim();
      const rackId = typeof v === "string" ? v.trim() : "";
      if (!id || !rackId) continue;
      lastRackByPanelId[id] = rackId;
    }
    return { version: 2, presetId, docked: { bottom }, racks: { workspaceLeft, workspaceRight, side, right }, pluginRackWidgets, lastRackByPanelId };
  } catch {
    return {
      version: 2,
      presetId: "onboardingDefault",
      docked: { bottom: [] },
      racks: { workspaceLeft: [], workspaceRight: [], side: [], right: [] },
      pluginRackWidgets: [],
      lastRackByPanelId: {},
    };
  }
}

function saveRackLayoutState() {
  try {
    localStorage.setItem(RACK_LAYOUT_STATE_KEY, JSON.stringify(rackLayoutState));
  } catch {
    // ignore
  }
}

function ensureWorkspaceSlots() {
  const workspace = mainWorkspaceRackEl || document.getElementById("mainWorkspaceRack");
  if (!workspace) return { left: null, right: null };

  let left = workspace.querySelector?.("#workspaceLeftSlot");
  let right = workspace.querySelector?.("#workspaceRightSlot");

  if (!left) {
    left = document.createElement("div");
    left.id = "workspaceLeftSlot";
    left.className = "workspaceSlot workspaceSlotLeft";
    left.setAttribute("aria-label", "Workspace left");
    workspace.prepend(left);
  }
  if (!right) {
    right = document.createElement("div");
    right.id = "workspaceRightSlot";
    right.className = "workspaceSlot workspaceSlotRight";
    right.setAttribute("aria-label", "Workspace right");
    const afterLeft = workspace.querySelector?.("#workspaceLeftSlot");
    if (afterLeft && afterLeft.nextSibling) workspace.insertBefore(right, afterLeft.nextSibling);
    else workspace.appendChild(right);
  }
  return { left, right };
}

function panelTitle(panelId) {
  const entry = panelRegistry.get(panelId);
  if (entry?.title) return entry.title;
  if (panelId === "maps") return "Maps";
  if (panelId === "library") return "Library";
  return String(panelId || "");
}

function chatRailClass({ fromUser, isModMessage }) {
  const from = String(fromUser || "").trim();
  const isSystem = !from || from.toLowerCase() === "system";
  const isModMsg = Boolean(isModMessage);
  const isYou = Boolean(loggedInUser && from && from === loggedInUser);
  if (isSystem || isModMsg) return "railLeft";
  if (isYou) return "railRight";
  return "railCenter";
}

function updateChatModToggleVisibility() {
  if (!chatModToggleWrapEl) return;
  const canUse = Boolean(canModerate && activeChatPostId && !activeDmThreadId && !isMapChatActive());
  chatModToggleWrapEl.classList.toggle("hidden", !canUse);
  if (!canUse && chatModToggleEl) chatModToggleEl.checked = false;
}

function panelIcon(panelId) {
  const entry = panelRegistry.get(panelId);
  if (entry?.icon) return entry.icon;
  if (panelId === "maps") return "🗺️";
  if (panelId === "library") return "📚";
  return "•";
}

function panelRole(panelId) {
  const entry = panelRegistry.get(panelId);
  return typeof entry?.role === "string" ? entry.role : "aux";
}

function panelCanExpand(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return false;
  if (id.startsWith("chat:")) return true;
  if (panelRole(id) === "primary") return true;
  // Allow a few core panels to take over the workspace even though they aren't "primary" by default.
  return id === "moderation" || id === "composer" || id === "pluginRack";
}

// Panels that are allowed to live in "skinny" columns (side rack / right rack).
// These panels should be able to render in a narrow width without breaking layout.
const SKINNY_CAPABLE_PANELS = new Set(["people", "profile", "composer", "chat", "pluginRack", "dice"]);

function panelIsSkinnyCapable(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return false;
  if (id.startsWith("chat:")) return true;
  return SKINNY_CAPABLE_PANELS.has(id);
}

function isDocked(panelId) {
  return rackLayoutState.docked.bottom.includes(panelId);
}

function getPanelElement(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return null;
  const entry = panelRegistry.get(id);
  const el = entry?.element;
  return el instanceof HTMLElement ? el : null;
}

function rackIdForPanelElement(panelEl) {
  const el = panelEl instanceof HTMLElement ? panelEl : null;
  if (!el) return "";
  const parent = el.parentElement;
  const id = parent && typeof parent.id === "string" ? parent.id : "";
  if (id === "workspaceLeftSlot" || id === "workspaceRightSlot" || id === "mainSideRack" || id === "rightRack") return id;
  return "";
}

function updateSkinnyChatPanels() {
  const applySkinnyState = (panelEl) => {
    if (!(panelEl instanceof HTMLElement)) return;
    const rackId = rackIdForPanelElement(panelEl);
    const inSkinnyRack = rackId === "mainSideRack" || rackId === "rightRack";
    panelEl.classList.toggle("isSkinnyChat", Boolean(rackLayoutEnabled && inSkinnyRack));
  };

  applySkinnyState(chatPanelEl);
  for (const panelId of chatPanelInstances.keys()) {
    applySkinnyState(getPanelElement(panelId));
  }
}

function rememberPanelLastRack(panelId, rackId) {
  const id = String(panelId || "").trim();
  const rack = String(rackId || "").trim();
  if (!id || !rack) return;
  if (!rackLayoutState.lastRackByPanelId || typeof rackLayoutState.lastRackByPanelId !== "object") rackLayoutState.lastRackByPanelId = {};
  rackLayoutState.lastRackByPanelId[id] = rack;
}

function dockPanel(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return;
  // Docking a hosted widget should implicitly un-host it.
  removePanelFromPluginRack(id);
  const el = getPanelElement(id);
  const lastRack = rackIdForPanelElement(el);
  if (lastRack) rememberPanelLastRack(id, lastRack);
  if (!isDocked(id)) rackLayoutState.docked.bottom.push(id);
  saveRackLayoutState();
  applyDockState();
}

function undockPanel(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return;
  rackLayoutState.docked.bottom = rackLayoutState.docked.bottom.filter((x) => x !== id);
  saveRackLayoutState();
  applyDockState();
}

function restorePanelFromHotbar(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return;
  if (!rackLayoutEnabled) return;

  const panelEl = getPanelElement(id);
  if (!panelEl) return;

  // Decide where to restore the panel.
  const lastRackId =
    rackLayoutState?.lastRackByPanelId && typeof rackLayoutState.lastRackByPanelId === "object"
      ? String(rackLayoutState.lastRackByPanelId[id] || "")
      : "";
  const lastRack = lastRackId ? document.getElementById(lastRackId) : null;

  const leftSlot = ensureWorkspaceLeftRack();
  const rightSlot = ensureWorkspaceRightRack();
  const sideRack = ensureMainSideRack();
  const rightRack = ensureRightRack();

  const pickWorkspaceSlot = () => {
    const leftEmpty = leftSlot ? leftSlot.querySelectorAll(":scope > .rackPanel:not(.hidden)").length === 0 : false;
    const rightEmpty = rightSlot ? rightSlot.querySelectorAll(":scope > .rackPanel:not(.hidden)").length === 0 : false;
    return leftEmpty ? leftSlot : rightEmpty ? rightSlot : leftSlot;
  };

  let targetRack = null;
  if (lastRack instanceof HTMLElement) {
    targetRack = lastRack;
  } else if (panelIsSkinnyCapable(id)) {
    // Heuristic: aux-like panels default to side rack; "right" defaults to the right rack.
    const defRack = String(panelRegistry.get(id)?.defaultRack || "");
    targetRack = defRack === "right" ? rightRack : sideRack;
  } else {
    targetRack = pickWorkspaceSlot();
  }

  // If restoring into a collapsed rack, uncollapse it (hotbar acts like a summonable launcher).
  if (targetRack && targetRack.id === "mainSideRack") setSideCollapsed(false);
  if (targetRack && targetRack.id === "rightRack") setRightCollapsed(false);

  // If the panel already lives in a rack, keep its place and just reveal it.
  const currentRackId = rackIdForPanelElement(panelEl);
  const currentRack = currentRackId ? document.getElementById(currentRackId) : null;

  undockPanel(id);

  if (!(currentRack instanceof HTMLElement)) {
    const rack = targetRack instanceof HTMLElement ? targetRack : null;
    if (rack) {
      // Right rack + workspace slots are single-slot: docking the existing occupant is the least surprising behavior.
      const isWorkspaceSlot = rack.id === "workspaceLeftSlot" || rack.id === "workspaceRightSlot";
      const isRightRackSlot = rack.id === "rightRack";
      if (isWorkspaceSlot || isRightRackSlot) {
        const existing = rack.querySelector?.(":scope > .rackPanel:not(.hidden)");
        if (existing instanceof HTMLElement && existing !== panelEl) {
          const existingId = String(existing.dataset.panelId || "").trim();
          if (existingId) dockPanel(existingId);
        }
      }
      rack.appendChild(panelEl);
      rememberPanelLastRack(id, rack.id);
      saveRackLayoutState();
    }
  } else {
    // Ensure the rack is visible if we restored into it.
    if (currentRack.id === "mainSideRack") setSideCollapsed(false);
    if (currentRack.id === "rightRack") setRightCollapsed(false);
  }

  syncRackStateFromDom();
  enforceWorkspaceRules();
}

function showHotbar(show) {
  if (!dockHotbarEl) return;
  if (!show && dockHotbarEl.dataset.lockVisible === "1") return;
  dockHotbarEl.classList.toggle("hidden", !show);
  dockHotbarEl.classList.toggle("show", Boolean(show));
  if (appRoot) appRoot.classList.toggle("hotbarVisible", Boolean(show));
}

function renderHotbar() {
  if (!dockHotbarEl) return;
  const items = rackLayoutState.docked.bottom.slice().filter((id) => getPanelElement(id));
  const includePlus = Boolean(rackLayoutEnabled);
  if (!items.length && !includePlus) {
    dockHotbarEl.classList.add("hidden");
    dockHotbarEl.classList.remove("show");
    dockHotbarEl.innerHTML = "";
    if (appRoot) appRoot.classList.remove("hotbarVisible");
    return;
  }

  const orbsHtml = items
    .map(
      (id) => `
    <button type="button" class="dockOrb" data-undock="${escapeHtml(id)}" title="Restore ${escapeHtml(panelTitle(id))}">
      <span class="dockOrbIcon" aria-hidden="true">${escapeHtml(panelIcon(id))}</span>
      <span>${escapeHtml(panelTitle(id))}</span>
    </button>
  `
    )
    .join("");

  const plusHtml = includePlus
    ? `
    <button type="button" class="dockOrb dockOrbPlus" data-hotbarplus="1" title="Add panel">
      <span class="dockOrbIcon" aria-hidden="true">+</span>
      <span>Add</span>
    </button>
  `
    : "";

  dockHotbarEl.innerHTML = `${orbsHtml}${plusHtml}`;
  dockHotbarEl.classList.remove("hidden");
  requestAnimationFrame(() => showHotbar(true));
}

let hotbarPlusMenuEl = null;
let workspaceAddMenuEl = null;

function closeHotbarPlusMenu() {
  if (!hotbarPlusMenuEl) return;
  try {
    hotbarPlusMenuEl.remove();
  } catch {
    // ignore
  }
  hotbarPlusMenuEl = null;
}

function closeWorkspaceAddMenu() {
  if (!workspaceAddMenuEl) return;
  try {
    workspaceAddMenuEl.remove();
  } catch {
    // ignore
  }
  workspaceAddMenuEl = null;
}

function workspaceAddCandidates() {
  return Array.from(panelRegistry.keys())
    .filter((id) => Boolean(getPanelElement(id)))
    .filter((id) => !id.startsWith("chat:post:"))
    .filter((id) => id !== "profile")
    .filter((id) => !(id === "moderation" && !canModerate))
    .map((id) => ({
      id,
      title: panelTitle(id),
      icon: panelIcon(id),
      docked: isDocked(id),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

function restorePanelToWorkspaceSlot(panelId, slotId) {
  const id = String(panelId || "").trim();
  const slot = String(slotId || "").trim();
  if (!id || !slot) return;
  const target = slot === "workspaceRightSlot" ? ensureWorkspaceRightRack() : ensureWorkspaceLeftRack();
  if (!(target instanceof HTMLElement)) return;
  const panelEl = getPanelElement(id);
  if (!(panelEl instanceof HTMLElement)) return;
  if (isDocked(id)) undockPanel(id);
  const existing = target.querySelector?.(":scope > .rackPanel:not(.hidden)");
  if (existing instanceof HTMLElement && existing !== panelEl) {
    const existingId = String(existing.dataset.panelId || "").trim();
    if (existingId) dockPanel(existingId);
  }
  target.appendChild(panelEl);
  rememberPanelLastRack(id, target.id);
  saveRackLayoutState();
  applyDockState();
  syncRackStateFromDom();
  enforceWorkspaceRules();
}

function openWorkspaceAddMenu(anchorEl, slotId) {
  closeWorkspaceAddMenu();
  if (!(anchorEl instanceof HTMLElement)) return;
  const slot = String(slotId || "").trim();
  if (!slot) return;
  const items = workspaceAddCandidates()
    .map(
      (p) => `<button type="button" class="ghost smallBtn" data-workspaceaddpanel="${escapeHtml(p.id)}" data-workspaceaddslot="${escapeHtml(slot)}">
        ${escapeHtml(p.icon)} ${escapeHtml(p.title)}${p.docked ? " (docked)" : ""}
      </button>`
    )
    .join("");
  const menu = document.createElement("div");
  menu.className = "hotbarAddMenu";
  menu.innerHTML = `<div class="hotbarAddMenuList">${items || `<div class="small muted" style="padding:6px 8px;">No panels available.</div>`}</div>`;
  const rect = anchorEl.getBoundingClientRect();
  menu.style.left = `${Math.max(12, Math.min(window.innerWidth - 272, rect.left - 10))}px`;
  menu.style.top = `${Math.max(12, rect.bottom + 8)}px`;
  menu.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-workspaceaddpanel][data-workspaceaddslot]");
    if (!btn) return;
    const id = String(btn.getAttribute("data-workspaceaddpanel") || "").trim();
    const slotIdNext = String(btn.getAttribute("data-workspaceaddslot") || "").trim();
    if (!id || !slotIdNext) return;
    restorePanelToWorkspaceSlot(id, slotIdNext);
    closeWorkspaceAddMenu();
  });
  document.body.appendChild(menu);
  workspaceAddMenuEl = menu;
}

function openHotbarPlusMenu(anchorEl) {
  closeHotbarPlusMenu();
  if (!dockHotbarEl) return;
  if (!(anchorEl instanceof HTMLElement)) return;

  const list = sortPosts(Array.from(posts.values())).slice(0, 8);
  const items = list
    .map((p) => {
      const id = String(p?.id || "").trim();
      if (!id) return "";
      const title = postTitle(p);
      return `<button type="button" class="ghost smallBtn" data-addchatpost="${escapeHtml(id)}">${escapeHtml(title)}</button>`;
    })
    .filter(Boolean)
    .join("");

  const menu = document.createElement("div");
  menu.className = "hotbarAddMenu";
  menu.innerHTML = `
    <div class="small muted" style="padding:6px 8px 4px;">New chat panel for...</div>
    <div class="hotbarAddMenuList">${items || `<div class="small muted" style="padding:6px 8px;">No hives yet.</div>`}</div>
  `;

  const rect = anchorEl.getBoundingClientRect();
  const left = Math.max(12, Math.min(window.innerWidth - 260, rect.left - 200));
  const top = Math.max(12, rect.top - 260);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;

  menu.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-addchatpost]");
    if (!btn) return;
    const postId = String(btn.getAttribute("data-addchatpost") || "").trim();
    if (!postId) return;
    ensureChatPostPanelInstance(postId, { docked: true });
    try {
      ws.send(JSON.stringify({ type: "getChat", postId }));
    } catch {
      // ignore
    }
    closeHotbarPlusMenu();
    renderHotbar();
  });

  document.body.appendChild(menu);
  hotbarPlusMenuEl = menu;
}

function applyDockState() {
  // For the first implementation phase, we support docking any registered panel that has a DOM element.
  for (const [id, p] of panelRegistry.entries()) {
    const el = p?.element;
    if (!(el instanceof HTMLElement)) continue;
    if (id === "moderation" && !canModerate) {
      el.classList.add("hidden");
      continue;
    }
    el.classList.toggle("hidden", isDocked(id));
  }

  renderHotbar();
  updateSideRackEmptyState();
  updateSkinnyChatPanels();
  renderWorkspaceSlotAffordances();
}

function renderWorkspaceSlotAffordances() {
  if (!rackLayoutEnabled) return;
  const left = ensureWorkspaceLeftRack();
  const right = ensureWorkspaceRightRack();
  for (const slot of [left, right]) {
    if (!(slot instanceof HTMLElement)) continue;
    const hasVisible = Boolean(slot.querySelector?.(":scope > .rackPanel:not(.hidden)"));
    slot.classList.toggle("workspaceSlotEmpty", !hasVisible);
    const existing = slot.querySelector?.(":scope > .workspaceEmptyAdd");
    if (hasVisible) {
      if (existing) existing.remove();
      continue;
    }
    if (existing) continue;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "workspaceEmptyAdd ghost";
    btn.setAttribute("data-workspaceadd", slot.id || "");
    btn.innerHTML = `<span class="workspaceEmptyAddPlus">+</span><span>Add panel</span>`;
    slot.appendChild(btn);
  }
}

function readRackOrder(rackEl) {
  if (!(rackEl instanceof HTMLElement)) return [];
  return Array.from(rackEl.querySelectorAll(".rackPanel"))
    .filter((el) => el instanceof HTMLElement && !el.classList.contains("hidden"))
    .map((el) => String(el?.dataset?.panelId || "").trim())
    .filter(Boolean);
}

function applyRackStateToDom() {
  if (!rackLayoutEnabled) return;
  // Ensure core "virtual" panels exist before we try to place them.
  ensurePluginRackPanel();
  const left = ensureWorkspaceLeftRack();
  const rightWorkspace = ensureWorkspaceRightRack();
  const side = ensureMainSideRack();
  const right = ensureRightRack();
  if (!left || !rightWorkspace || !side || !right) return;
  const leftOrder = Array.isArray(rackLayoutState?.racks?.workspaceLeft) ? rackLayoutState.racks.workspaceLeft : [];
  const rightOrderW = Array.isArray(rackLayoutState?.racks?.workspaceRight) ? rackLayoutState.racks.workspaceRight : [];
  const sideOrder = Array.isArray(rackLayoutState?.racks?.side) ? rackLayoutState.racks.side : [];
  const rightOrder = Array.isArray(rackLayoutState?.racks?.right) ? rackLayoutState.racks.right : [];

  for (const panelId of leftOrder) {
    const el = getPanelElement(panelId);
    if (el) left.appendChild(el);
  }
  for (const panelId of rightOrderW) {
    const el = getPanelElement(panelId);
    if (el) rightWorkspace.appendChild(el);
  }
  for (const panelId of sideOrder) {
    const el = getPanelElement(panelId);
    if (el) side.appendChild(el);
  }
  for (const panelId of rightOrder) {
    const el = getPanelElement(panelId);
    if (el) right.appendChild(el);
  }

  // Hosted plugin widgets live inside Plugin Rack, not a top-level rack.
  const widgetsOrder = Array.isArray(rackLayoutState?.pluginRackWidgets) ? rackLayoutState.pluginRackWidgets : [];
  const widgetsRack = ensurePluginRackWidgetsRack();
  if (widgetsRack) {
    for (const panelId of widgetsOrder) {
      const el = getPanelElement(panelId);
      if (!el) continue;
      el.classList.add("pluginRackWidget");
      widgetsRack.appendChild(el);
    }
  }
}

function readWorkspaceActivePrimary() {
  try {
    const raw = localStorage.getItem(WORKSPACE_ACTIVE_PRIMARY_KEY);
    return raw ? String(raw) : "";
  } catch {
    return "";
  }
}

function writeWorkspaceActivePrimary(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return;
  try {
    localStorage.setItem(WORKSPACE_ACTIVE_PRIMARY_KEY, id);
  } catch {
    // ignore
  }
}

function enforceWorkspaceRules() {
  if (!rackLayoutEnabled) return;
  const left = ensureWorkspaceLeftRack();
  const rightWorkspace = ensureWorkspaceRightRack();
  const side = ensureMainSideRack();
  const rightRack = ensureRightRack();
  if (!left || !rightWorkspace || !side || !rightRack) return;

  // Primary panels: allow up to 2 visible (one per workspace slot). Enforce max 1 per slot.
  const cleanupSlot = (slotEl) => {
    const kids = Array.from(slotEl.querySelectorAll(":scope > .rackPanel:not(.hidden)"));
    if (kids.length <= 1) return;
    for (const extra of kids.slice(1)) side.appendChild(extra);
  };
  cleanupSlot(left);
  cleanupSlot(rightWorkspace);

  // Side rack and right rack are "skinny columns": only allow skinny-capable panels.
  const enforceSkinny = (rackEl) => {
    const kids = Array.from(rackEl.querySelectorAll(":scope > .rackPanel:not(.hidden)"));
    for (const kid of kids) {
      const id = String(kid?.dataset?.panelId || "").trim();
      if (!id) continue;
      if (!panelIsSkinnyCapable(id)) dockPanel(id);
    }
  };
  enforceSkinny(side);
  enforceSkinny(rightRack);

  // Side rack can stack, but keep it compact: at most 2 visible panels.
  const sideKids = Array.from(side.querySelectorAll(":scope > .rackPanel:not(.hidden)"));
  if (sideKids.length > 2) {
    for (const extra of sideKids.slice(2)) {
      const id = String(extra?.dataset?.panelId || "").trim();
      if (id) dockPanel(id);
    }
  }

  // Right rack is single-slot: keep at most one visible panel.
  const rightKids = Array.from(rightRack.querySelectorAll(":scope > .rackPanel:not(.hidden)"));
  if (rightKids.length > 1) {
    for (const extra of rightKids.slice(1)) {
      const id = String(extra?.dataset?.panelId || "").trim();
      if (id) dockPanel(id);
    }
  }

  // Panels that live in the workspace slots should be "full" by default (especially primaries).
  for (const slot of [left, rightWorkspace]) {
    const panel = slot.querySelector?.(":scope > .rackPanel:not(.hidden)");
    if (!(panel instanceof HTMLElement)) continue;
    const id = String(panel.dataset.panelId || "").trim();
    if (!id) continue;
    panel.classList.remove("panelCollapsed");
    panel.dataset.panelDisplay = "full";
  }

  // If only one workspace slot is occupied, allow it to expand to full width to avoid blank space.
  // (We temporarily disable this during drag so the empty slot remains a visible drop target.)
  const leftPanel = left.querySelector?.(":scope > .rackPanel:not(.hidden)");
  const rightPanel = rightWorkspace.querySelector?.(":scope > .rackPanel:not(.hidden)");
  const leftId = String(leftPanel?.dataset?.panelId || "").trim();
  const rightId = String(rightPanel?.dataset?.panelId || "").trim();

  // Workspace expansion (explicit maximize for primaries).
  const expandedId = readWorkspaceExpandedPrimary();
  const expandedInLeft = Boolean(expandedId && expandedId === leftId);
  const expandedInRight = Boolean(expandedId && expandedId === rightId);
  const expandedValid = expandedInLeft || expandedInRight;
  if (appRoot) {
    appRoot.classList.toggle("workspaceExpandedLeft", expandedInLeft);
    appRoot.classList.toggle("workspaceExpandedRight", expandedInRight);
    if (!expandedValid) appRoot.classList.remove("workspaceExpandedLeft", "workspaceExpandedRight");
  }
  if (expandedId && !expandedValid) clearWorkspaceExpandedState();

  // If expanded and the other slot is occupied, keep it accessible via hotbar.
  if (expandedInLeft && rightId && rightId !== expandedId) {
    if (!readWorkspaceExpandedDisplaced()) writeWorkspaceExpandedDisplaced(rightId);
    dockPanel(rightId);
  }
  if (expandedInRight && leftId && leftId !== expandedId) {
    if (!readWorkspaceExpandedDisplaced()) writeWorkspaceExpandedDisplaced(leftId);
    dockPanel(leftId);
  }

  // Auto-expand single-primary only when not explicitly expanded.
  if (appRoot && !appRoot.classList.contains("rackIsDragging") && !expandedValid) {
    const leftOnly = Boolean(leftPanel && !rightPanel);
    const rightOnly = Boolean(!leftPanel && rightPanel);
    appRoot.classList.toggle("workspaceSingleLeft", leftOnly);
    appRoot.classList.toggle("workspaceSingleRight", rightOnly);
  } else if (appRoot) {
    appRoot.classList.remove("workspaceSingleLeft", "workspaceSingleRight");
  }

  // Transient panels should live in the side column and be collapsed by default.
  for (const el of Array.from(appRoot.querySelectorAll("#mainWorkspaceRack .rackPanel, #mainSideRack .rackPanel"))) {
    const id = String(el?.dataset?.panelId || "").trim();
    if (!id) continue;
    if (panelRole(id) !== "transient") continue;
    if (el.parentElement !== side) side.appendChild(el);
    el.classList.add("panelCollapsed");
    el.dataset.panelDisplay = "collapsed";
  }

  updateSkinnyChatPanels();
  renderWorkspaceSlotAffordances();
  syncRackStateFromDom();
}

function installWorkspaceInteractions() {
  if (!rackLayoutEnabled) return;
  if (!appRoot) return;
  if (appRoot.dataset.workspaceClicks === "1") return;
  appRoot.dataset.workspaceClicks = "1";

  appRoot.addEventListener("click", (e) => {
    if (!rackLayoutEnabled) return;
    const target = e.target;
    const addBtn = target?.closest?.("[data-workspaceadd]");
    if (addBtn instanceof HTMLElement) {
      const slotId = String(addBtn.getAttribute("data-workspaceadd") || "").trim();
      if (!slotId) return;
      if (workspaceAddMenuEl) closeWorkspaceAddMenu();
      else openWorkspaceAddMenu(addBtn, slotId);
      return;
    }
    const interactive = target?.closest?.("button,a,input,select,textarea,label");
    if (interactive) return;
    const panel = target?.closest?.(".rackPanel");
    if (!panel) return;
    if (!(panel instanceof HTMLElement)) return;
    if (!panel.closest?.("#mainRack")) return;
    const panelId = String(panel.dataset.panelId || "").trim();
    if (!panelId) return;
    if (panelRole(panelId) !== "primary") return;
    writeWorkspaceActivePrimary(panelId);
    enforceWorkspaceRules();
  });
}

function syncRackStateFromDom() {
  if (!rackLayoutEnabled) return;
  const left = ensureWorkspaceLeftRack();
  const rightWorkspace = ensureWorkspaceRightRack();
  const side = ensureMainSideRack();
  const right = ensureRightRack();
  if (!left || !rightWorkspace || !side || !right) return;
  rackLayoutState.racks = {
    workspaceLeft: readRackOrder(left),
    workspaceRight: readRackOrder(rightWorkspace),
    side: readRackOrder(side),
    right: readRackOrder(right),
  };
  rackLayoutState.pluginRackWidgets = readPluginRackWidgetsOrder();
  const hosted = new Set(Array.isArray(rackLayoutState.pluginRackWidgets) ? rackLayoutState.pluginRackWidgets : []);
  for (const [id, entry] of panelRegistry.entries()) {
    const el = entry?.element;
    if (!(el instanceof HTMLElement)) continue;
    if (!el.classList.contains("pluginRackWidget") && hosted.has(id)) el.classList.add("pluginRackWidget");
    if (el.classList.contains("pluginRackWidget") && !hosted.has(id)) el.classList.remove("pluginRackWidget");
  }
  saveRackLayoutState();
}

function ensureRightRack() {
  if (!appRoot) return null;
  if (rightRackEl && rightRackEl.isConnected) return rightRackEl;
  const el = document.createElement("aside");
  el.id = "rightRack";
  el.className = "rightRack";
  appRoot.appendChild(el);
  rightRackEl = el;
  return el;
}

function ensureMainRack() {
  // In rack mode, "main rack" is the workspace column inside #mainRack.
  if (mainRack && mainRack.isConnected) return mainRack;
  if (mainWorkspaceRackEl) {
    mainRack = mainWorkspaceRackEl;
    return mainRack;
  }

  const wrapper = mainRackEl || document.querySelector("#mainRack") || document.querySelector("main.main");
  if (!wrapper) return null;

  let workspace = wrapper.querySelector?.("#mainWorkspaceRack");
  let side = wrapper.querySelector?.("#mainSideRack");
  if (!workspace) {
    const w = document.createElement("div");
    w.id = "mainWorkspaceRack";
    w.className = "workspaceRack";
    w.setAttribute("aria-label", "Workspace");
    wrapper.appendChild(w);
    workspace = w;
  }
  if (!side) {
    const s = document.createElement("div");
    s.id = "mainSideRack";
    s.className = "sideRack";
    s.setAttribute("aria-label", "Side panels");
    wrapper.appendChild(s);
    side = s;
  }
  mainSideRack = side;
  mainRack = workspace;
  return mainRack;
}

function ensureMainSideRack() {
  if (mainSideRack && mainSideRack.isConnected) return mainSideRack;
  if (mainSideRackEl) {
    mainSideRack = mainSideRackEl;
    return mainSideRack;
  }
  // Ensure the workspace rack exists too (creates both columns if missing).
  ensureMainRack();
  return mainSideRack instanceof HTMLElement ? mainSideRack : null;
}

function ensureWorkspaceLeftRack() {
  const { left } = ensureWorkspaceSlots();
  return left instanceof HTMLElement ? left : null;
}

function ensureWorkspaceRightRack() {
  const { right } = ensureWorkspaceSlots();
  return right instanceof HTMLElement ? right : null;
}

function enableRackLayoutDom() {
  if (!appRoot) return;
  appRoot.classList.add("rackMode");
  const rack = ensureRightRack();
  if (!rack) return;
  const main = ensureMainRack();
  const left = ensureWorkspaceLeftRack();
  const rightWorkspace = ensureWorkspaceRightRack();
  const side = ensureMainSideRack();

  const mark = (el, panelId) => {
    if (!el) return;
    el.classList.add("rackPanel");
    el.dataset.panelId = panelId;
  };

  // Move right-side panels into the rack so they become stackable.
  // (This is a stepping stone toward full dockable panels.)
  if (chatPanelEl) {
    mark(chatPanelEl, "chat");
    // Chat is a workspace primary in rack mode by default; enforceWorkspaceRules will manage if moved.
    if (rightWorkspace && chatPanelEl.parentElement !== rightWorkspace) rightWorkspace.appendChild(chatPanelEl);
  }
  if (peopleDrawerEl) {
    mark(peopleDrawerEl, "people");
    if (peopleDrawerEl.parentElement !== rack) rack.appendChild(peopleDrawerEl);
  }
  if (modPanelEl) {
    mark(modPanelEl, "moderation");
    if (modPanelEl.parentElement !== rack) rack.appendChild(modPanelEl);
  }

  // Mark center panels as rack panels too (they already live in mainRack in normal DOM).
  if (main) {
    if (onboardingPanelEl) {
      mark(onboardingPanelEl, "onboarding");
      if (left && onboardingPanelEl.parentElement !== left) left.appendChild(onboardingPanelEl);
      onboardingPanelEl.classList.remove("hidden");
    }
    if (hivesPanelEl) {
      mark(hivesPanelEl, "hives");
      if (left && hivesPanelEl.parentElement !== left) left.appendChild(hivesPanelEl);
    }
    if (profileViewPanel) {
      mark(profileViewPanel, "profile");
      if (side && profileViewPanel.parentElement !== side) side.appendChild(profileViewPanel);
      // In rack mode, profile is its own panel; don't keep it hidden behind the legacy center-view toggle.
      profileViewPanel.classList.remove("hidden");
    }
    if (pollinatePanel) {
      mark(pollinatePanel, "composer");
      if (side && pollinatePanel.parentElement !== side) side.appendChild(pollinatePanel);
    }
  }

  // Hide old resizers in rack mode (we'll replace with rack-aware resizing later).
  chatResizeHandle?.classList.add("hidden");
  peopleResizeHandle?.classList.add("hidden");

  // People drawer chrome: hide the close button (panel is now a rack item).
  closePeopleBtn?.classList.add("hidden");
  // People drawer toggle button is obsolete in rack mode.
  togglePeopleBtn?.classList.add("hidden");
  // Ensure people panel isn't hidden by legacy state.
  peopleDrawerEl?.classList.remove("hidden");
  peopleOpen = true;

  // Profile panel no longer "replaces" the feed in rack mode, so the back button is confusing.
  profileBackBtn?.classList.add("hidden");
}

function disableRackLayoutDom() {
  if (!appRoot) return;
  appRoot.classList.remove("rackMode");
  // No attempt to move elements back (yet). Disable is meant for page reload use.
}

function applyPreset(presetId) {
  const key = resolvePresetKey(presetId);
  const def = PRESET_DEFS[key];
  if (!def) return;
  if (def.modOnly && !canModerate) {
    applyPreset("onboardingDefault");
    return;
  }

  // Presets are hard-applied: clear any hosted widgets so placement remains deterministic.
  closePluginRackAddMenu();
  for (const id of readPluginRackWidgetsOrder()) removePanelFromPluginRack(id);
  rackLayoutState.pluginRackWidgets = [];

  rackLayoutState.presetId = def.presetId || key;

  const workspaceLeftOrder = Array.isArray(def.workspaceLeftOrder) ? def.workspaceLeftOrder.map((x) => String(x || "")).filter(Boolean) : [];
  const workspaceRightOrder = Array.isArray(def.workspaceRightOrder) ? def.workspaceRightOrder.map((x) => String(x || "")).filter(Boolean) : [];
  const sideOrder = Array.isArray(def.sideOrder) ? def.sideOrder.map((x) => String(x || "")).filter(Boolean) : [];
  const rightOrderRaw = Array.isArray(def.rightOrder) ? def.rightOrder.map((x) => String(x || "")).filter(Boolean) : [];
  // Right rack is a single skinny-capable panel.
  const rightOrder = rightOrderRaw.length ? [rightOrderRaw[0]] : [];

  // Applying a preset should be deterministic even after the user has rearranged panels.
  clearWorkspaceExpandedState();
  const expandedPrimary = typeof def.expandedPrimary === "string" ? def.expandedPrimary.trim() : "";
  if (expandedPrimary) writeWorkspaceExpandedPrimary(expandedPrimary);

  if (typeof def.composerOpen === "boolean") setComposerOpen(def.composerOpen);
  setSideCollapsed(Boolean(def.sideCollapsed), { persist: true });
  setRightCollapsed(Boolean(def.rightCollapsed), { persist: true });

  const leftRack = ensureWorkspaceLeftRack();
  const rightWorkspaceRack = ensureWorkspaceRightRack();
  const sideRack = ensureMainSideRack();
  const rightRack = ensureRightRack();
  if (!leftRack || !rightWorkspaceRack || !sideRack || !rightRack) return;

  const placed = new Set([...workspaceLeftOrder, ...workspaceRightOrder, ...sideOrder, ...rightOrder]);
  const docked = new Set(Array.isArray(def.dockBottom) ? def.dockBottom.map((x) => String(x || "")).filter(Boolean) : []);
  for (const id of placed) docked.delete(id);

  // Default: anything not explicitly placed by the preset goes to the hotbar.
  for (const id of Array.from(panelRegistry.keys())) {
    if (!placed.has(id)) docked.add(id);
  }

  // Moderation panel should not be forced visible for non-mods.
  if (!canModerate) {
    docked.add("moderation");
    // Also ensure moderation isn't placed anywhere.
    workspaceLeftOrder.splice(0, workspaceLeftOrder.length, ...workspaceLeftOrder.filter((x) => x !== "moderation"));
    workspaceRightOrder.splice(0, workspaceRightOrder.length, ...workspaceRightOrder.filter((x) => x !== "moderation"));
    sideOrder.splice(0, sideOrder.length, ...sideOrder.filter((x) => x !== "moderation"));
  }

  rackLayoutState.docked.bottom = Array.from(docked);

  saveRackLayoutState();
  applyDockState();

  // Detach all known panels before re-placing, so we don't end up with "stale" panels sticking in old racks.
  const elsById = new Map();
  for (const id of Array.from(panelRegistry.keys())) {
    const el = getPanelElement(id);
    if (el) elsById.set(id, el);
  }
  for (const el of elsById.values()) {
    if (el.parentElement) el.parentElement.removeChild(el);
  }

  if (leftRack) {
    for (const panelId of workspaceLeftOrder) {
      if (docked.has(panelId)) continue;
      const el = elsById.get(panelId) || getPanelElement(panelId);
      if (el) leftRack.appendChild(el);
    }
  }
  if (rightWorkspaceRack) {
    for (const panelId of workspaceRightOrder) {
      if (docked.has(panelId)) continue;
      const el = elsById.get(panelId) || getPanelElement(panelId);
      if (el) rightWorkspaceRack.appendChild(el);
    }
  }
  if (sideRack) {
    for (const panelId of sideOrder) {
      if (docked.has(panelId)) continue;
      const el = elsById.get(panelId) || getPanelElement(panelId);
      if (el) sideRack.appendChild(el);
    }
  }
  if (rightRack) {
    for (const panelId of rightOrder) {
      if (docked.has(panelId)) continue;
      const el = elsById.get(panelId) || getPanelElement(panelId);
      if (el) rightRack.appendChild(el);
    }
  }

  syncRackStateFromDom();
  enforceWorkspaceRules();
  updateLayoutPresetOptions();
}

function installPanelMinimizeButtons() {
  const addMinBtn = (headerEl, panelId) => {
    if (!headerEl) return;
    const row = headerEl.querySelector(".row") || headerEl.querySelector(".filters") || headerEl;

    if (!headerEl.querySelector(`[data-rackdrag="${panelId}"]`)) {
      const drag = document.createElement("button");
      drag.type = "button";
      drag.className = "ghost smallBtn rackDragHandle";
      drag.textContent = "≡";
      drag.title = "Drag to reorder";
      drag.setAttribute("data-rackdrag", panelId);
      row.appendChild(drag);
    }

    if (panelIsSkinnyCapable(panelId) && !headerEl.querySelector(`[data-skinny="${panelId}"]`)) {
      const skinny = document.createElement("button");
      skinny.type = "button";
      skinny.className = "ghost smallBtn";
      skinny.textContent = "↔";
      skinny.title = "Toggle skinny/full";
      skinny.setAttribute("data-skinny", panelId);
      skinny.onclick = () => togglePanelSkinny(panelId);
      row.appendChild(skinny);
    }
    if (!panelIsSkinnyCapable(panelId)) {
      headerEl.querySelector(`[data-skinny="${cssEscape(panelId)}"]`)?.remove();
    }

    if (panelCanExpand(panelId) && !headerEl.querySelector(`[data-expand="${panelId}"]`)) {
      const expand = document.createElement("button");
      expand.type = "button";
      expand.className = "ghost smallBtn";
      expand.textContent = "□";
      expand.title = "Expand workspace";
      expand.setAttribute("data-expand", panelId);
      expand.onclick = () => togglePrimaryExpand(panelId);
      row.appendChild(expand);
    }

    if (!headerEl.querySelector(`[data-minimize="${panelId}"]`)) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ghost smallBtn";
      btn.textContent = "-";
      btn.title = "Minimize to hotbar";
      btn.setAttribute("data-minimize", panelId);
      btn.onclick = () => dockPanel(panelId);
      row.appendChild(btn);
    }
  };

  addMinBtn(chatHeaderEl, "chat");
  addMinBtn(modPanelEl?.querySelector(".panelHeader"), "moderation");
  addMinBtn(peopleDrawerEl?.querySelector(".panelHeader"), "people");
  addMinBtn(hivesPanelEl?.querySelector(".panelHeader"), "hives");
  addMinBtn(profileViewPanel?.querySelector(".panelHeader"), "profile");
  addMinBtn(pollinatePanel?.querySelector(".panelHeader"), "composer");
  ensurePluginRackPanel();
  addMinBtn(pluginRackPanelEl?.querySelector(".panelHeader"), "pluginRack");
}

function ensurePluginPanelShell(panelId, title, icon, defaultRack, role) {
  const wantsMain = String(defaultRack || "").toLowerCase() === "main";
  const isPrimary = String(role || "").toLowerCase() === "primary";
  let preferred = null;
  if (wantsMain && isPrimary) {
    // Primary panels should live inside a workspace slot, not as loose items in the workspace grid.
    const left = ensureWorkspaceLeftRack();
    const right = ensureWorkspaceRightRack();
    const side = ensureMainSideRack();
    const leftEmpty = left ? left.querySelectorAll(":scope > .rackPanel").length === 0 : false;
    const rightEmpty = right ? right.querySelectorAll(":scope > .rackPanel").length === 0 : false;
    preferred = leftEmpty ? left : rightEmpty ? right : side;
  } else if (wantsMain) {
    preferred = ensureMainSideRack();
  } else {
    preferred = ensureRightRack();
  }
  const rack = preferred || ensureRightRack() || ensureMainSideRack() || ensureWorkspaceLeftRack() || ensureWorkspaceRightRack() || ensureMainRack();
  if (!rack) return null;

  const existing = document.querySelector?.(`.panel.pluginPanel[data-panel-id="${CSS.escape(panelId)}"]`);
  if (existing instanceof HTMLElement) {
    if (existing.parentElement !== rack) rack.appendChild(existing);
    return existing;
  }

  const shell = document.createElement("section");
  shell.className = "panel panelFill pluginPanel rackPanel";
  shell.dataset.panelId = panelId;
  shell.innerHTML = `
    <div class="panelHeader">
      <div class="panelTitle">${escapeHtml(title || panelId)}</div>
      <div class="row">
        <button type="button" class="ghost smallBtn rackDragHandle" data-rackdrag="${escapeHtml(panelId)}" title="Drag to reorder">≡</button>
        <button type="button" class="ghost smallBtn" data-minimize="${escapeHtml(panelId)}" title="Minimize to hotbar">-</button>
      </div>
    </div>
    <div class="panelBody" data-pluginmount="1"></div>
  `;

  const minBtn = shell.querySelector(`[data-minimize="${panelId}"]`);
  if (isPrimary || panelCanExpand(panelId)) {
    const headerRow = shell.querySelector(".panelHeader .row");
    if (headerRow && !headerRow.querySelector(`[data-expand="${panelId}"]`)) {
      const expand = document.createElement("button");
      expand.type = "button";
      expand.className = "ghost smallBtn";
      expand.textContent = "□";
      expand.title = "Expand workspace";
      expand.setAttribute("data-expand", panelId);
      expand.addEventListener("click", () => togglePrimaryExpand(panelId));
      if (minBtn && minBtn.parentElement === headerRow) headerRow.insertBefore(expand, minBtn);
      else headerRow.appendChild(expand);
    }
  }
  if (minBtn) minBtn.addEventListener("click", () => dockPanel(panelId));

  rack.appendChild(shell);
  return shell;
}

function ensureChatPostPanelInstance(postId, opts) {
  if (!rackLayoutEnabled) return "";
  const pid = String(postId || "").trim();
  if (!pid) return "";
  const post = posts.get(pid) || null;
  const panelId = chatInstancePanelIdForPost(pid);
  if (!panelId) return "";

  if (panelRegistry.has(panelId)) return panelId;

  const title = post?.title ? `Chat: ${String(post.title).slice(0, 32)}` : "Chat";
  const shell = document.createElement("section");
  shell.className = "panel panelFill rackPanel chat chatInstance";
  shell.dataset.panelId = panelId;
  shell.innerHTML = `
    <div class="panelHeader">
      <div>
        <div class="panelTitle">${escapeHtml(title)}</div>
        <div class="small muted chatMeta"></div>
      </div>
      <div class="row">
        <button type="button" class="ghost smallBtn rackDragHandle" data-rackdrag="${escapeHtml(panelId)}" title="Drag to reorder">≡</button>
        <button type="button" class="ghost smallBtn" data-skinny="${escapeHtml(panelId)}" title="Toggle skinny/full">↔</button>
        <button type="button" class="ghost smallBtn" data-expand="${escapeHtml(panelId)}" title="Expand workspace">□</button>
        <button type="button" class="ghost smallBtn" data-minimize="${escapeHtml(panelId)}" title="Minimize to hotbar">-</button>
      </div>
    </div>
    <div class="chatMessages"></div>
    <div class="typingIndicator small muted"></div>
    <form class="chatForm">
      <div class="chatComposer">
        <div class="toolbar" role="toolbar" aria-label="Chat formatting">
          <button type="button" data-chatcmd="bold"><b>B</b></button>
          <button type="button" data-chatcmd="italic"><i>I</i></button>
          <button type="button" data-chatcmd="underline"><u>U</u></button>
          <button type="button" data-chatcmd="strikeThrough"><s>S</s></button>
          <span class="sep"></span>
          <button type="button" data-chatcmd="insertUnorderedList">List</button>
          <button type="button" data-chatcmd="insertOrderedList">1. List</button>
          <button type="button" data-chatlink="1">Link</button>
          <button type="button" data-chatimg="1">GIF/Image</button>
          <button type="button" data-chataudio="1">Audio</button>
          <button type="button" data-chatemoji="1">Emoji</button>
          <button type="button" data-chatcmd="removeFormat">Clear</button>
        </div>
        <div class="chatInstanceTools">
          <label class="checkRow chatModToggle chatInstModToggle hidden" title="Send as moderator/system message (left rail)">
            <span>Mod</span>
            <input class="chatInstModToggleInput" type="checkbox" />
          </label>
        </div>
        <div class="editor chatEditor" contenteditable="true" aria-label="Chat editor"></div>
      </div>
      <button class="primary" type="submit">Send</button>
    </form>
  `;

  const metaEl = shell.querySelector(".chatMeta");
  const messagesEl = shell.querySelector(".chatMessages");
  const typingEl = shell.querySelector(".typingIndicator");
  const formEl = shell.querySelector("form.chatForm");
  const editorEl = shell.querySelector(".chatEditor");
  const modToggleWrapEl = shell.querySelector(".chatInstModToggle");
  const modToggleEl = shell.querySelector(".chatInstModToggleInput");

  shell.querySelector(`[data-minimize="${cssEscape(panelId)}"]`)?.addEventListener("click", () => dockPanel(panelId));
  shell.querySelector(`[data-expand="${cssEscape(panelId)}"]`)?.addEventListener("click", () => togglePrimaryExpand(panelId));
  shell.querySelector(`[data-skinny="${cssEscape(panelId)}"]`)?.addEventListener("click", () => togglePanelSkinny(panelId));

  if (formEl && editorEl) {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const html = String(editorEl.innerHTML || "").trim();
      const text = String(editorEl.innerText || "").trim();
      const hasImg = Boolean(editorEl.querySelector("img"));
      const hasAudio = Boolean(editorEl.querySelector("audio"));
      if (!text && !hasImg && !hasAudio) return;
      if (!loggedInUser) {
        toast("Sign in required", "Sign in to chat.");
        return;
      }
      const currentPost = posts.get(pid) || null;
      if (currentPost && String(currentPost.mode || currentPost.chatMode || "").toLowerCase() === "walkie") {
        toast("Walkie Talkie", "This hive is walkie-only. Hold ~ to talk.");
        return;
      }
      if (currentPost?.readOnly && !(loggedInRole === "owner" || loggedInRole === "moderator")) {
        toast("Read-only", "This hive is read-only.");
        return;
      }
      if (currentPost?.deleted) {
        toast("Unavailable", "This post was deleted.");
        return;
      }
      const wantsMod = Boolean(canModerate && modToggleEl instanceof HTMLInputElement && modToggleEl.checked);
      ws.send(JSON.stringify({ type: "typing", postId: pid, isTyping: false }));
      ws.send(JSON.stringify({ type: "chatMessage", postId: pid, text, html, replyToId: "", asMod: wantsMod }));
      editorEl.innerHTML = "";
      // Leave global reply-to state alone; this instance panel is independent (MVP).
    });

    editorEl.addEventListener("focus", () => {
      chatUploadTargetEditor = editorEl;
    });

    editorEl.addEventListener("keydown", (e) => {
      if (!shouldSubmitChatOnEnter(e)) return;
      e.preventDefault();
      formEl.requestSubmit();
    });

    // Allow drag/drop uploads in instance chats too.
    try {
      installDropUpload(editorEl, { allowImages: true, allowAudio: true });
    } catch {
      // ignore
    }
  }

  if (modToggleWrapEl) modToggleWrapEl.classList.toggle("hidden", !canModerate);

  // Register + insert.
  panelRegistry.set(panelId, {
    id: panelId,
    title,
    icon: "💬",
    source: "core",
    role: "aux",
    defaultRack: "main",
    element: shell,
  });
  chatPanelInstances.set(panelId, { postId: pid });

  const options = opts && typeof opts === "object" ? opts : {};
  const docked = Boolean(options.docked);
  const sideRack = ensureMainSideRack();
  if (docked) {
    // Keep it out of layout; show as orb.
    if (sideRack) sideRack.appendChild(shell);
    dockPanel(panelId);
  } else {
    setSideCollapsed(false);
    if (sideRack) sideRack.prepend(shell);
    rememberPanelLastRack(panelId, "mainSideRack");
    saveRackLayoutState();
    applyDockState();
    syncRackStateFromDom();
    enforceWorkspaceRules();
  }

  renderChatPostPanelInstance(panelId, true);
  return panelId;
}

function renderTypingIndicatorForPost(postId, targetEl) {
  if (!(targetEl instanceof HTMLElement)) return;
  const id = String(postId || "").trim();
  if (!id) {
    targetEl.textContent = "";
    return;
  }
  const set = typingUsersByPostId.get(id);
  if (!set || set.size === 0) {
    targetEl.textContent = "";
    return;
  }
  const names = Array.from(set.values()).slice(0, 3);
  const more = set.size > names.length ? ` +${set.size - names.length}` : "";
  targetEl.textContent = `${names.map((u) => `@${u}`).join(", ")}${more} typing...`;
}

function renderChatPostPanelInstance(panelId, forceScroll) {
  const id = String(panelId || "").trim();
  if (!id) return;
  const inst = chatPanelInstances.get(id);
  if (!inst) return;
  const postId = String(inst.postId || "").trim();
  const post = postId ? posts.get(postId) : null;
  const root = getPanelElement(id);
  if (!(root instanceof HTMLElement)) return;
  const metaEl = root.querySelector(".chatMeta");
  const messagesEl = root.querySelector(".chatMessages");
  const typingEl = root.querySelector(".typingIndicator");
  const editorEl = root.querySelector(".chatEditor");
  const sendBtn = root.querySelector("form.chatForm button[type='submit']");

  if (metaEl) {
    if (!post) metaEl.textContent = "Hive not found.";
    else {
      const tags = (post.keywords || []).map((k) => `#${k}`).join(" ");
      const author = post.author ? `by @${post.author}` : "";
      const exp = formatCountdown(post.expiresAt);
      const ro = post.readOnly ? " | read-only" : "";
      const mode = normalizePostMode(post.mode || post.chatMode || "");
      const modeMeta =
        mode === "walkie"
          ? " | walkie talkie"
          : mode === "stream"
            ? ` | stream (${streamKindLabel(post.streamKind || "webcam")})`
            : "";
      metaEl.textContent = `${author}${modeMeta}${ro} | ${exp === "permanent" ? "permanent" : `expires in ${exp}`} | ${tags}`.trim();
    }
  }

  if (!(messagesEl instanceof HTMLElement)) return;
  const atBottomBefore = messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 24;

  if (!post) {
    messagesEl.innerHTML = `<div class="small muted">Hive not found.</div>`;
    if (typingEl) typingEl.textContent = "";
    return;
  }
  if (post.deleted) {
    messagesEl.innerHTML = `<div class="small muted">Post was deleted.</div>`;
    if (typingEl) typingEl.textContent = "";
    return;
  }

  const isWalkie = String(post.mode || post.chatMode || "").toLowerCase() === "walkie";
  const canChatWrite = Boolean(loggedInRole === "owner" || loggedInRole === "moderator" || !post.readOnly);
  if (editorEl) editorEl.contentEditable = String(Boolean(canChatWrite && !isWalkie));
  if (sendBtn instanceof HTMLButtonElement) sendBtn.disabled = !(loggedInUser && canChatWrite && !isWalkie);

  const modToggleWrapEl = root.querySelector(".chatInstModToggle");
  const modToggleEl = root.querySelector(".chatInstModToggleInput");
  if (modToggleWrapEl) modToggleWrapEl.classList.toggle("hidden", !canModerate);
  if (!canModerate && modToggleEl instanceof HTMLInputElement) modToggleEl.checked = false;

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

  messagesEl.innerHTML = visibleMessages
    .map((m, index) => {
      const isModMsg = Boolean(m?.asMod) || String(m?.fromUser || "").trim().toLowerCase() === "mod";
      const from = isModMsg ? "MOD" : m.fromUser || "";
      const isYou = loggedInUser && from && from === loggedInUser;
      const rail = chatRailClass({ fromUser: from, isModMessage: isModMsg });
      const prev = index > 0 ? visibleMessages[index - 1] : null;
      const sameAuthorAsPrev = Boolean(prev && String(prev.fromUser || "") === from);
      const mentions = Array.isArray(m.mentions) ? m.mentions.map((u) => String(u || "").toLowerCase()) : [];
      const mentionMe = Boolean(loggedInUser && mentions.includes(loggedInUser));
      const who = isModMsg ? `<span class="modPill">MOD</span>` : renderUserPill(from || "");
      const youTag = !isModMsg && isYou ? `<span class="muted">(you)</span>` : "";
      const time = new Date(m.createdAt).toLocaleTimeString();
      const tint = isModMsg ? "" : tintStylesFromHex(getProfile(from).color);
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
      const reportAction =
        loggedInUser && !m.deleted
          ? `<button type="button" class="ghost smallBtn" data-reportchat="${escapeHtml(m.id)}" data-postid="${escapeHtml(
              post.id
            )}">Report</button>`
          : "";
      const deleteAction =
        loggedInUser && !m.deleted && (loggedInRole === "owner" || loggedInRole === "moderator" || from === loggedInUser)
          ? `<button type="button" class="ghost smallBtn" data-delchat="${escapeHtml(m.id)}" data-postid="${escapeHtml(
              post.id
            )}">Delete</button>`
          : "";
      const actions =
        reportAction || deleteAction
          ? `<div class="chatTools">${reportAction}${deleteAction}</div>`
          : "";
      return `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""} ${mentionMe ? "mentionMe" : ""} ${rail} ${isModMsg ? "isModMsg" : ""}" data-msgid="${escapeHtml(
        m.id
      )}" ${tint}>
        <div class="meta"><span class="chatHeaderInline">${who}${youTag}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
        ${replyBlock}
        <div class="content">${content}</div>
        ${deletedLine}${editedLine}
        <div class="chatActionsRow">${reacts}${actions}</div>
      </div>`;
    })
    .join("");

  for (const contentEl of messagesEl.querySelectorAll(".chatMsg .content")) {
    decorateMentionNodesInElement(contentEl);
    decorateYouTubeEmbedsInElement(contentEl);
  }

  renderTypingIndicatorForPost(post.id, typingEl);

  if (forceScroll || atBottomBefore) messagesEl.scrollTop = messagesEl.scrollHeight;
}

function renderChatInstancesForPost(postId) {
  const pid = String(postId || "").trim();
  if (!pid) return;
  for (const [panelId, inst] of chatPanelInstances.entries()) {
    if (String(inst?.postId || "") !== pid) continue;
    renderChatPostPanelInstance(panelId);
  }
}

function setChatInstancePanelPost(panelId, postId, forceScroll = true) {
  const pid = String(postId || "").trim();
  const id = String(panelId || "").trim();
  if (!pid || !id) return false;
  const inst = chatPanelInstances.get(id);
  if (!inst) return false;
  const post = posts.get(pid);
  if (!post) return false;
  inst.postId = pid;
  chatPanelInstances.set(id, inst);
  const root = getPanelElement(id);
  const titleEl = root?.querySelector?.(".panelTitle");
  if (titleEl) titleEl.textContent = post?.title ? `Chat: ${String(post.title).slice(0, 32)}` : "Chat";
  renderChatPostPanelInstance(id, forceScroll);
  return true;
}

function nearestVisibleChatInstancePanelId(sourceEl) {
  const anchor = sourceEl instanceof HTMLElement ? sourceEl : null;
  if (!anchor) return "";
  const anchorRect = anchor.getBoundingClientRect();
  const ax = anchorRect.left + anchorRect.width / 2;
  const ay = anchorRect.top + anchorRect.height / 2;
  let bestId = "";
  let bestDist = Number.POSITIVE_INFINITY;
  for (const [panelId] of chatPanelInstances.entries()) {
    const root = getPanelElement(panelId);
    if (!(root instanceof HTMLElement)) continue;
    if (root.classList.contains("hidden")) continue;
    const rect = root.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1) continue;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(cx - ax, cy - ay);
    if (dist < bestDist) {
      bestDist = dist;
      bestId = panelId;
    }
  }
  return bestId;
}

function applyPluginPresetHint(panelDef) {
  if (!rackLayoutEnabled) return;
  const id = String(panelDef?.id || "").trim();
  if (!id) return;
  if (isDocked(id)) return;
  const presetId = rackLayoutState?.presetId || "";
  const hint = panelDef?.presetHints && typeof panelDef.presetHints === "object" ? panelDef.presetHints[presetId] : null;
  const place = hint && typeof hint === "object" ? String(hint.place || "") : "";
  if (place === "docked.bottom") {
    dockPanel(id);
    return;
  }
  if (place === "main" || place === "right") {
    const rack = place === "main" ? ensureMainSideRack() : ensureRightRack();
    const el = getPanelElement(id);
    if (rack && el) rack.appendChild(el);
  }
}

function enableRackDnD() {
  if (!rackLayoutEnabled) return;
  const right = ensureRightRack();
  const left = ensureWorkspaceLeftRack();
  const rightWorkspace = ensureWorkspaceRightRack();
  const side = ensureMainSideRack();
  if (!right || !left || !rightWorkspace || !side) return;
  const pluginWidgets = ensurePluginRackWidgetsRack();
  const racks = [left, rightWorkspace, side, right, pluginWidgets].filter((x) => x instanceof HTMLElement);

  // Guard against double-install if initRackLayout is called more than once.
  if (appRoot?.dataset?.rackDnd === "1") return;
  if (appRoot) appRoot.dataset.rackDnd = "1";

  let draggingEl = null;
  let placeholderEl = null;
  let pointerId = null;
  let dragOffset = { x: 0, y: 0 };
  let draggingPanelId = "";
  let activeRack = null;
  let originRack = null;
  let originBefore = null;

  const cancelDrag = () => {
    if (!draggingEl) return;
    cleanup();
    enforceWorkspaceRules();
  };

  const cleanup = () => {
    if (appRoot) appRoot.classList.remove("rackIsDragging");
    if (draggingEl) {
      draggingEl.classList.remove("rackDragging");
      draggingEl.style.position = "";
      draggingEl.style.left = "";
      draggingEl.style.top = "";
      draggingEl.style.width = "";
      draggingEl.style.zIndex = "";
      draggingEl.style.pointerEvents = "";
    }
    if (dockHotbarEl) dockHotbarEl.classList.remove("dockTarget");
    if (placeholderEl && placeholderEl.parentElement) placeholderEl.parentElement.removeChild(placeholderEl);
    draggingEl = null;
    placeholderEl = null;
    pointerId = null;
    draggingPanelId = "";
    activeRack = null;
    originRack = null;
    originBefore = null;
  };

  const siblings = (rack) => Array.from(rack.querySelectorAll(".rackPanel")).filter((el) => el !== draggingEl && el !== placeholderEl);

  const insertPlaceholderAt = (rack, y) => {
    const items = siblings(rack);
    for (const el of items) {
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      if (y < mid) {
        rack.insertBefore(placeholderEl, el);
        return;
      }
    }
    rack.appendChild(placeholderEl);
  };

  const rackAtPoint = (x, y) => {
    for (const r of racks) {
      const rect = r.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return r;
    }
    return null;
  };

  const onMove = (e) => {
    if (!draggingEl || e.pointerId !== pointerId) return;
    e.preventDefault();
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    draggingEl.style.left = `${x}px`;
    draggingEl.style.top = `${y}px`;

    const targetRack = rackAtPoint(e.clientX, e.clientY) || activeRack;
    if (targetRack && placeholderEl && placeholderEl.parentElement !== targetRack) {
      targetRack.appendChild(placeholderEl);
    }
    if (targetRack) {
      activeRack = targetRack;
      insertPlaceholderAt(targetRack, e.clientY);
    }

    if (dockHotbarEl) {
      const nearBottom = e.clientY > window.innerHeight - 90;
      dockHotbarEl.classList.toggle("dockTarget", Boolean(nearBottom));
      if (nearBottom) showHotbar(true);
    }
  };

    const onUp = (e) => {
      if (!draggingEl || e.pointerId !== pointerId) return;
      e.preventDefault();
      const targetRack = placeholderEl?.parentElement || activeRack;
      if (targetRack && placeholderEl && placeholderEl.parentElement === targetRack) {
        const isWorkspaceSlot = targetRack.id === "workspaceLeftSlot" || targetRack.id === "workspaceRightSlot";
        const isRightRackSlot = targetRack.id === "rightRack";
        const isSideRackSlot = targetRack.id === "mainSideRack";
        const isPluginRackWidgets = targetRack.id === "pluginRackWidgetsRack";
        const isSkinnyRackSlot = isRightRackSlot || isSideRackSlot;
        const skinnyOk = panelIsSkinnyCapable(draggingPanelId);

        if (isPluginRackWidgets && !panelIsHostableInPluginRack(draggingPanelId)) {
          toast("Can't place there", `${panelTitle(draggingPanelId)} can't be hosted in Plugin Rack.`);
          if (originRack) {
            if (originBefore && originBefore.parentElement === originRack) originRack.insertBefore(draggingEl, originBefore);
            else originRack.appendChild(draggingEl);
          }
          cleanup();
          syncRackStateFromDom();
          enforceWorkspaceRules();
          return;
        }

        // Only skinny-capable panels may live in skinny columns (side / right racks).
        if (isSkinnyRackSlot && !skinnyOk) {
          toast("Can't place there", `${panelTitle(draggingPanelId)} can't be placed in a skinny rack.`);
          if (originRack) {
            if (originBefore && originBefore.parentElement === originRack) originRack.insertBefore(draggingEl, originBefore);
            else originRack.appendChild(draggingEl);
          }
          cleanup();
          syncRackStateFromDom();
          enforceWorkspaceRules();
          return;
        }

        if (isWorkspaceSlot || isRightRackSlot) {
          const existing = Array.from(targetRack.querySelectorAll(":scope > .rackPanel")).find((x) => x !== draggingEl);
          targetRack.insertBefore(draggingEl, placeholderEl);
          // Swap if occupied: send the previous occupant back to the origin rack position.
          if (existing && originRack) {
            if (originBefore && originBefore.parentElement === originRack) originRack.insertBefore(existing, originBefore);
            else originRack.appendChild(existing);
          }
        } else {
          targetRack.insertBefore(draggingEl, placeholderEl);
        }
        if (isPluginRackWidgets) draggingEl.classList.add("pluginRackWidget");
      }
    const shouldDock = Boolean(dockHotbarEl && e.clientY > window.innerHeight - 90);
    const dockId = draggingPanelId;
    cleanup();
    if (shouldDock && dockId) dockPanel(dockId);
    syncRackStateFromDom();
    enforceWorkspaceRules();
  };

  // Use window-level listeners so cross-rack dragging stays responsive even when the cursor passes over gaps/resizers.
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
  // Extra safety: pointer events can fail to deliver pointerup if the mouse is released outside the window.
  window.addEventListener("blur", cancelDrag);
  window.addEventListener("mouseup", cancelDrag);
  window.addEventListener("touchend", cancelDrag, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") cancelDrag();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cancelDrag();
  });

  const onDown = (e) => {
    const btn = e.target.closest?.("[data-rackdrag]");
    if (!btn) return;
    const el = btn.closest?.(".rackPanel");
    if (!(el instanceof HTMLElement)) return;
    if (el.classList.contains("hidden")) return;

    e.preventDefault();
    // If a drag somehow got stuck, start clean.
    cleanup();
    if (appRoot) appRoot.classList.add("rackIsDragging");
    draggingEl = el;
    draggingPanelId = String(el.dataset.panelId || "");
    pointerId = e.pointerId;
    draggingEl.setPointerCapture?.(pointerId);

    activeRack = el.parentElement;
    originRack = activeRack;
    originBefore = draggingEl.nextSibling;
    const rect = draggingEl.getBoundingClientRect();
    dragOffset = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    placeholderEl = document.createElement("div");
    placeholderEl.className = "rackPlaceholder";
    placeholderEl.style.height = `${Math.max(40, Math.round(rect.height))}px`;

    (activeRack || main).insertBefore(placeholderEl, draggingEl.nextSibling);

    draggingEl.classList.add("rackDragging");
    draggingEl.style.position = "fixed";
    draggingEl.style.left = `${rect.left}px`;
    draggingEl.style.top = `${rect.top}px`;
    draggingEl.style.width = `${rect.width}px`;
    draggingEl.style.zIndex = "80";
    draggingEl.style.pointerEvents = "none";
  };

  // Delegate to the app root so panels can be dragged regardless of which rack they're currently in.
  (appRoot || document).addEventListener("pointerdown", onDown);
}

function initRackLayout() {
  rackLayoutEnabled = readRackLayoutEnabled();
  let hadState = false;
  try {
    hadState = Boolean(localStorage.getItem(RACK_LAYOUT_STATE_KEY));
  } catch {
    hadState = false;
  }
  rackLayoutState = loadRackLayoutState();
  // Normalize older preset ids in persisted state.
  rackLayoutState.presetId = resolvePresetKey(rackLayoutState.presetId);

  if (toggleRackLayoutEl) {
    toggleRackLayoutEl.checked = rackLayoutEnabled;
    // Hide/disable the toggle while rack mode is forced on.
    if (FORCE_RACK_MODE) {
      toggleRackLayoutEl.checked = true;
      toggleRackLayoutEl.disabled = true;
      const row = toggleRackLayoutEl.closest?.("label");
      if (row) row.classList.add("hidden");
      const toggleBtn = document.getElementById("toggleRackLayoutBtn");
      if (toggleBtn) toggleBtn.classList.add("hidden");
    } else {
      toggleRackLayoutEl.onchange = () => {
        writeRackLayoutEnabled(Boolean(toggleRackLayoutEl.checked));
        // Reload is the simplest safe path while the feature is in flux.
        location.reload();
      };
    }
  }

  if (layoutPresetEl) {
    updateLayoutPresetOptions();
    layoutPresetEl.value = resolvePresetKey(rackLayoutState.presetId || "onboardingDefault");
    layoutPresetEl.disabled = !rackLayoutEnabled;
    layoutPresetEl.onchange = () => {
      if (!rackLayoutEnabled) return;
      const next = String(layoutPresetEl.value || "onboardingDefault");
      applyPreset(next);
    };
  }

  if (!rackLayoutEnabled) {
    disableRackLayoutDom();
    setSideCollapsed(false, { persist: false, updateControls: false });
    setRightCollapsed(false, { persist: false, updateControls: false });
    toggleSideRackEl && (toggleSideRackEl.disabled = true);
    toggleRightRackEl && (toggleRightRackEl.disabled = true);
    showSideRackBtn?.classList.add("hidden");
    showRightRackBtn?.classList.add("hidden");
    showHotbar(false);
    return;
  }

  enableRackLayoutDom();

  // Ensure Plugin Rack exists and is accessible (defaults to hotbar unless explicitly placed).
  ensurePluginRackPanel();
  const pluginRackPlaced =
    isDocked("pluginRack") ||
    ["workspaceLeft", "workspaceRight", "side", "right"].some((k) => Array.isArray(rackLayoutState?.racks?.[k]) && rackLayoutState.racks[k].includes("pluginRack"));
  if (!pluginRackPlaced) {
    rackLayoutState.docked.bottom = Array.isArray(rackLayoutState?.docked?.bottom) ? rackLayoutState.docked.bottom : [];
    if (!rackLayoutState.docked.bottom.includes("pluginRack")) rackLayoutState.docked.bottom.push("pluginRack");
    saveRackLayoutState();
  }

  // Side racks behave like summonable hotbars: hide/show without changing panel layout state.
  toggleSideRackEl && (toggleSideRackEl.disabled = false);
  toggleRightRackEl && (toggleRightRackEl.disabled = false);

  if (showSideRackBtn) {
    showSideRackBtn.classList.remove("hidden");
    showSideRackBtn.onclick = () => setSideCollapsed(false);
  }
  if (showRightRackBtn) {
    showRightRackBtn.classList.remove("hidden");
    showRightRackBtn.onclick = () => setRightCollapsed(false);
  }

  if (toggleSideRackEl) {
    toggleSideRackEl.onchange = () => {
      if (!rackLayoutEnabled) return;
      setSideCollapsed(!Boolean(toggleSideRackEl.checked));
    };
  }
  if (toggleRightRackEl) {
    toggleRightRackEl.onchange = () => {
      if (!rackLayoutEnabled) return;
      setRightCollapsed(!Boolean(toggleRightRackEl.checked));
    };
  }

  setSideCollapsed(readBoolPref(RACK_SIDE_COLLAPSED_KEY, false), { persist: false });
  setRightCollapsed(readBoolPref(RACK_RIGHT_COLLAPSED_KEY, false), { persist: false });

  applyRackStateToDom();
  const hasOnboardingPlacement =
    (Array.isArray(rackLayoutState?.racks?.workspaceLeft) && rackLayoutState.racks.workspaceLeft.includes("onboarding")) ||
    (Array.isArray(rackLayoutState?.racks?.workspaceRight) && rackLayoutState.racks.workspaceRight.includes("onboarding")) ||
    (Array.isArray(rackLayoutState?.racks?.side) && rackLayoutState.racks.side.includes("onboarding")) ||
    (Array.isArray(rackLayoutState?.racks?.right) && rackLayoutState.racks.right.includes("onboarding")) ||
    (Array.isArray(rackLayoutState?.docked?.bottom) && rackLayoutState.docked.bottom.includes("onboarding"));
  if ((rackLayoutState?.presetId || "") === "onboardingDefault" && !hasOnboardingPlacement) {
    applyPreset("onboardingDefault");
  }
  installPanelMinimizeButtons();
  enableRackDnD();
  installWorkspaceInteractions();
  enforceWorkspaceRules();
  renderProfilePanel();

  // Hotbar interactions
  if (dockHotbarEl) {
    dockHotbarEl.onmouseenter = () => showHotbar(true);
    dockHotbarEl.onmouseleave = () => showHotbar(false);
    // Docked items must be restored via drag-and-drop (click does nothing), but the "+" orb is clickable.
    dockHotbarEl.onclick = (e) => {
      if (dockHotbarEl.dataset.dragging === "1") return;
      const plus = e.target.closest?.("[data-hotbarplus]");
      if (!plus) return;
      if (hotbarPlusMenuEl) closeHotbarPlusMenu();
      else openHotbarPlusMenu(plus);
    };
  }

  // Close the "+" menu when clicking elsewhere.
  if (appRoot && appRoot.dataset.hotbarPlusClose !== "1") {
    appRoot.dataset.hotbarPlusClose = "1";
    document.addEventListener("pointerdown", (e) => {
      if (!hotbarPlusMenuEl && !pluginRackAddMenuEl && !workspaceAddMenuEl) return;
      const t = e.target;
      if (t) {
        if (hotbarPlusMenuEl && hotbarPlusMenuEl.contains(t)) return;
        if (pluginRackAddMenuEl && pluginRackAddMenuEl.contains(t)) return;
        if (workspaceAddMenuEl && workspaceAddMenuEl.contains(t)) return;
        if (dockHotbarEl && dockHotbarEl.contains(t)) return;
        if (t.closest?.("[data-workspaceadd]")) return;
      }
      closeHotbarPlusMenu();
      closePluginRackAddMenu();
      closeWorkspaceAddMenu();
    });
  }

  // Drag orbs back into the rack to restore (MVP: restore to end of rack).
  if (dockHotbarEl) {
    let orbDragId = "";
    let orbPointer = null;
    let orbStart = null;
    let orbMoved = false;
    let orbPlaceholder = null;
    let orbActiveRack = null;

    const lockHotbarVisible = (lock) => {
      dockHotbarEl.dataset.lockVisible = lock ? "1" : "0";
      dockHotbarEl.dataset.dragging = lock ? "1" : "0";
      // While dragging an orb, keep both workspace slots visible as drop targets.
      if (appRoot) {
        if (lock) {
          appRoot.classList.add("rackIsDragging");
          appRoot.dataset.orbDragging = "1";
        } else if (appRoot.dataset.orbDragging === "1") {
          delete appRoot.dataset.orbDragging;
          appRoot.classList.remove("rackIsDragging");
        }
      }
      if (lock) showHotbar(true);
    };

    const resolveOrbDropRack = (panelId, rackEl) => {
      const id = String(panelId || "").trim();
      if (!id) return rackEl;
      if (rackEl && rackEl.id === "pluginRackWidgetsRack") {
        if (panelIsHostableInPluginRack(id)) return rackEl;
        const left = ensureWorkspaceLeftRack();
        const right = ensureWorkspaceRightRack();
        const leftEmpty = left ? left.querySelectorAll(":scope > .rackPanel:not(.hidden)").length === 0 : false;
        const rightEmpty = right ? right.querySelectorAll(":scope > .rackPanel:not(.hidden)").length === 0 : false;
        return leftEmpty ? left : rightEmpty ? right : left;
      }
      // Skinny racks (side/right) only allow skinny-capable panels.
      if (rackEl && (rackEl.id === "mainSideRack" || rackEl.id === "rightRack")) {
        if (panelIsSkinnyCapable(id)) return rackEl;
        const left = ensureWorkspaceLeftRack();
        const right = ensureWorkspaceRightRack();
        const leftEmpty = left ? left.querySelectorAll(":scope > .rackPanel:not(.hidden)").length === 0 : false;
        const rightEmpty = right ? right.querySelectorAll(":scope > .rackPanel:not(.hidden)").length === 0 : false;
        return leftEmpty ? left : rightEmpty ? right : left;
      }
      if (panelRole(id) !== "primary") return rackEl;
      const isWorkspaceSlot = rackEl && (rackEl.id === "workspaceLeftSlot" || rackEl.id === "workspaceRightSlot");
      if (isWorkspaceSlot) return rackEl;
      const left = ensureWorkspaceLeftRack();
      const right = ensureWorkspaceRightRack();
      const leftEmpty = left ? left.querySelectorAll(":scope > .rackPanel:not(.hidden)").length === 0 : false;
      const rightEmpty = right ? right.querySelectorAll(":scope > .rackPanel:not(.hidden)").length === 0 : false;
      return leftEmpty ? left : rightEmpty ? right : left;
    };

    const insertOrbPlaceholderAt = (rack, y) => {
      if (!(rack instanceof HTMLElement) || !(orbPlaceholder instanceof HTMLElement)) return;
      const items = Array.from(rack.querySelectorAll(":scope > .rackPanel")).filter((el) => el !== orbPlaceholder);
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        if (y < mid) {
          rack.insertBefore(orbPlaceholder, el);
          return;
        }
      }
      rack.appendChild(orbPlaceholder);
    };

    const orbRacks = () => {
      const leftRack = ensureWorkspaceLeftRack();
      const rightWorkspaceRack = ensureWorkspaceRightRack();
      const sideRack = ensureMainSideRack();
      const rightRack = ensureRightRack();
      const pluginWidgetsRack = ensurePluginRackWidgetsRack();
      return [leftRack, rightWorkspaceRack, sideRack, rightRack, pluginWidgetsRack].filter((x) => x instanceof HTMLElement);
    };

    const rackAtPoint = (x, y) => {
      for (const r of orbRacks()) {
        const rect = r.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return r;
      }
      return null;
    };

      const dropOrbIntoRack = (panelId, targetRack, beforeEl) => {
        const id = String(panelId || "").trim();
        if (!id) return;
        const rack = resolveOrbDropRack(id, targetRack);
        if (!(rack instanceof HTMLElement)) return;
        const panelEl = getPanelElement(id);
        if (!panelEl) return;

        // Restoring into a collapsed rack should uncollapse it (hotbar is a summonable launcher).
        if (rack.id === "mainSideRack") setSideCollapsed(false);
        if (rack.id === "rightRack") setRightCollapsed(false);

        undockPanel(id);

        const isWorkspaceSlot = rack.id === "workspaceLeftSlot" || rack.id === "workspaceRightSlot";
        const isRightRackSlot = rack.id === "rightRack";
        if (isWorkspaceSlot) {
          const existing = rack.querySelector?.(":scope > .rackPanel:not(.hidden)");
          if (existing instanceof HTMLElement && existing !== panelEl) {
            const existingId = String(existing.dataset.panelId || "").trim();
            if (existingId) dockPanel(existingId);
          }
        }
        if (isRightRackSlot) {
          const existing = rack.querySelector?.(":scope > .rackPanel:not(.hidden)");
          if (existing instanceof HTMLElement && existing !== panelEl) {
            const existingId = String(existing.dataset.panelId || "").trim();
            if (existingId) dockPanel(existingId);
          }
        }

        const insertBefore =
          beforeEl instanceof HTMLElement && beforeEl.parentElement === rack && beforeEl.classList.contains("rackPanel")
            ? beforeEl
            : null;
        if (panelEl.parentElement !== rack) {
          if (insertBefore) rack.insertBefore(panelEl, insertBefore);
          else rack.appendChild(panelEl);
        }
        if (rack.id === "pluginRackWidgetsRack") panelEl.classList.add("pluginRackWidget");
        rememberPanelLastRack(id, rack.id);
        saveRackLayoutState();
        syncRackStateFromDom();
        enforceWorkspaceRules();
      };

    dockHotbarEl.addEventListener("pointerdown", (e) => {
      const orb = e.target.closest?.("[data-undock]");
      if (!orb) return;
      orbDragId = String(orb.getAttribute("data-undock") || "");
      if (!orbDragId) return;
      orbPointer = e.pointerId;
      orbStart = { x: e.clientX, y: e.clientY };
      orbMoved = false;
      orbActiveRack = null;
      orb.classList.add("dragging");
      orb.setPointerCapture?.(orbPointer);
      lockHotbarVisible(true);
      e.preventDefault();

      // Placeholder shows drop position while dragging.
      orbPlaceholder = document.createElement("div");
      orbPlaceholder.className = "rackPlaceholder";
      orbPlaceholder.style.height = "52px";
    });
    window.addEventListener("pointermove", (e) => {
      if (!orbDragId || e.pointerId !== orbPointer) return;
      if (!orbStart) return;
      const dx = Math.abs(e.clientX - orbStart.x);
      const dy = Math.abs(e.clientY - orbStart.y);
      if (dx + dy > 6) orbMoved = true;

      if (orbMoved && orbPlaceholder) {
        const r = rackAtPoint(e.clientX, e.clientY) || orbActiveRack;
        if (r && orbPlaceholder.parentElement !== r) r.appendChild(orbPlaceholder);
        if (r) {
          orbActiveRack = r;
          insertOrbPlaceholderAt(r, e.clientY);
        }
      }
    });
    dockHotbarEl.addEventListener("pointerup", (e) => {
      if (!orbDragId || e.pointerId !== orbPointer) return;
      const orb = dockHotbarEl.querySelector(`[data-undock="${CSS.escape(orbDragId)}"]`);
      if (orb) orb.classList.remove("dragging");
      const targetRack = orbMoved ? (rackAtPoint(e.clientX, e.clientY) || orbActiveRack) : null;
      const beforeEl =
        orbMoved && orbPlaceholder && targetRack instanceof HTMLElement && orbPlaceholder.parentElement === targetRack
          ? orbPlaceholder.nextSibling
          : null;
      if (orbMoved && targetRack) dropOrbIntoRack(orbDragId, targetRack, beforeEl);
      orbDragId = "";
      orbPointer = null;
      orbStart = null;
      orbMoved = false;
      orbActiveRack = null;
      if (orbPlaceholder && orbPlaceholder.parentElement) orbPlaceholder.parentElement.removeChild(orbPlaceholder);
      orbPlaceholder = null;
      lockHotbarVisible(false);
    });
    dockHotbarEl.addEventListener("pointercancel", () => {
      orbDragId = "";
      orbPointer = null;
      orbStart = null;
      orbMoved = false;
      orbActiveRack = null;
      if (orbPlaceholder && orbPlaceholder.parentElement) orbPlaceholder.parentElement.removeChild(orbPlaceholder);
      orbPlaceholder = null;
      lockHotbarVisible(false);
      dockHotbarEl.querySelectorAll(".dockOrb.dragging").forEach((x) => x.classList.remove("dragging"));
    });
  }

  // Reveal hotbar when cursor is near bottom if there are docked items.
  window.addEventListener("mousemove", (e) => {
    if (!dockHotbarEl) return;
    if (!rackLayoutEnabled) return;
    const nearBottom = e.clientY > window.innerHeight - 80;
    showHotbar(Boolean(nearBottom));
  });

  // First enable: seed state from the selected preset so users immediately get a sensible layout.
  if (!hadState) {
    const preset = resolvePresetKey(rackLayoutState.presetId || (layoutPresetEl ? String(layoutPresetEl.value || "") : "") || "onboardingDefault");
    applyPreset(preset);
  }

  applyDockState();
  enforceWorkspaceRules();
}
let activeProfileUsername = "";
let activeProfile = null;
let lastRequestedProfileUsername = "";
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

const STAY_CONNECTED_KEY = "bzl_stayConnected";
function readStayConnectedPref() {
  return readBoolPref(STAY_CONNECTED_KEY, false);
}
function writeStayConnectedPref(on) {
  writeBoolPref(STAY_CONNECTED_KEY, Boolean(on));
}
const ENABLE_HINTS_KEY = "bzl_enableHints";
const CHAT_ENTER_MODE_KEY = "bzl_chatEnterMode"; // "ctrlEnter" | "enter"
function readHintsEnabledPref() {
  const raw = localStorage.getItem(ENABLE_HINTS_KEY);
  if (raw == null) return true;
  return raw !== "0";
}
function writeHintsEnabledPref(on) {
  const enabled = Boolean(on);
  localStorage.setItem(ENABLE_HINTS_KEY, enabled ? "1" : "0");
  appRoot?.classList.toggle("hintsEnabled", enabled);
}

function readChatEnterModePref() {
  const raw = readStringPref(CHAT_ENTER_MODE_KEY, "ctrlEnter");
  return raw === "enter" ? "enter" : "ctrlEnter";
}

function writeChatEnterModePref(mode) {
  const next = String(mode || "").trim().toLowerCase();
  writeStringPref(CHAT_ENTER_MODE_KEY, next === "enter" ? "enter" : "ctrlEnter");
}

let instanceBranding = { title: "Bzl", subtitle: "Ephemeral hives + chat", allowMemberPermanentPosts: false, appearance: {} };
let onboardingState = {
  enabled: true,
  rulesVersion: 1,
  requireAcceptance: false,
  blockReadUntilAccepted: false,
  acceptedRulesVersion: 0,
  acceptedAt: 0,
  tutorialVersion: 1,
  tutorialCompletedVersion: 0,
  selectedRoleIds: [],
  needsAcceptance: false,
};
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
  const onboardingRaw = raw?.onboarding && typeof raw.onboarding === "object" ? raw.onboarding : {};
  const aboutRaw = onboardingRaw.about && typeof onboardingRaw.about === "object" ? onboardingRaw.about : {};
  const rulesRaw = onboardingRaw.rules && typeof onboardingRaw.rules === "object" ? onboardingRaw.rules : {};
  const roleSelectRaw = onboardingRaw.roleSelect && typeof onboardingRaw.roleSelect === "object" ? onboardingRaw.roleSelect : {};
  const tutorialRaw = onboardingRaw.tutorial && typeof onboardingRaw.tutorial === "object" ? onboardingRaw.tutorial : {};
  const ruleItems = Array.isArray(rulesRaw.items)
    ? rulesRaw.items
        .map((r, idx) => ({
          id: String(r?.id || `r${idx + 1}`).trim().slice(0, 40),
          order: Number.isFinite(Number(r?.order)) ? Math.max(1, Math.floor(Number(r.order))) : idx + 1,
          name: String(r?.name || "").trim().slice(0, 60),
          shortDescription: String(r?.shortDescription || "").trim().slice(0, 180),
          description: typeof r?.description === "string" ? r.description : "",
          severity: ["info", "warn", "critical"].includes(String(r?.severity || "").trim().toLowerCase())
            ? String(r.severity).trim().toLowerCase()
            : "info",
        }))
        .filter((r) => r.id)
        .slice(0, 200)
        .sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || String(a.id || "").localeCompare(String(b.id || "")))
    : [];
  return {
    title: title || "Bzl",
    subtitle: subtitle || "Ephemeral hives + chat",
    allowMemberPermanentPosts,
    onboarding: {
      enabled: Object.prototype.hasOwnProperty.call(onboardingRaw, "enabled") ? Boolean(onboardingRaw.enabled) : true,
      about: {
        content: typeof aboutRaw.content === "string" ? aboutRaw.content : "",
        updatedAt: Number(aboutRaw.updatedAt || 0) || 0,
        updatedBy: String(aboutRaw.updatedBy || "").trim().toLowerCase(),
      },
      rules: {
        version: Math.max(1, Math.floor(Number(rulesRaw.version || 1))),
        requireAcceptance: Boolean(rulesRaw.requireAcceptance),
        blockReadUntilAccepted: Boolean(rulesRaw.blockReadUntilAccepted),
        items: ruleItems,
      },
      roleSelect: {
        enabled: Object.prototype.hasOwnProperty.call(roleSelectRaw, "enabled") ? Boolean(roleSelectRaw.enabled) : true,
        selfAssignableRoleIds: Array.isArray(roleSelectRaw.selfAssignableRoleIds)
          ? roleSelectRaw.selfAssignableRoleIds.map((x) => String(x || "").trim().toLowerCase()).filter(Boolean).slice(0, 64)
          : [],
      },
      tutorial: {
        enabled: Object.prototype.hasOwnProperty.call(tutorialRaw, "enabled") ? Boolean(tutorialRaw.enabled) : true,
        version: Math.max(1, Math.floor(Number(tutorialRaw.version || 1))),
      },
    },
    appearance: { bg, panel, text, accent, accent2, good, bad, fontBody, fontMono, mutedPct, linePct, panel2Pct },
  };
}

function normalizeOnboardingState(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  return {
    enabled: Object.prototype.hasOwnProperty.call(src, "enabled") ? Boolean(src.enabled) : Boolean(normalizeInstanceBranding(instanceBranding).onboarding?.enabled),
    rulesVersion: Math.max(1, Math.floor(Number(src.rulesVersion || normalizeInstanceBranding(instanceBranding).onboarding?.rules?.version || 1))),
    requireAcceptance: Object.prototype.hasOwnProperty.call(src, "requireAcceptance")
      ? Boolean(src.requireAcceptance)
      : Boolean(normalizeInstanceBranding(instanceBranding).onboarding?.rules?.requireAcceptance),
    blockReadUntilAccepted: Object.prototype.hasOwnProperty.call(src, "blockReadUntilAccepted")
      ? Boolean(src.blockReadUntilAccepted)
      : Boolean(normalizeInstanceBranding(instanceBranding).onboarding?.rules?.blockReadUntilAccepted),
    acceptedRulesVersion: Math.max(0, Math.floor(Number(src.acceptedRulesVersion || 0))),
    acceptedAt: Number(src.acceptedAt || 0) || 0,
    tutorialVersion: Math.max(1, Math.floor(Number(src.tutorialVersion || normalizeInstanceBranding(instanceBranding).onboarding?.tutorial?.version || 1))),
    tutorialCompletedVersion: Math.max(0, Math.floor(Number(src.tutorialCompletedVersion || 0))),
    selectedRoleIds: Array.isArray(src.selectedRoleIds) ? src.selectedRoleIds.map((x) => String(x || "").trim().toLowerCase()).filter(Boolean).slice(0, 64) : [],
    needsAcceptance: Boolean(src.needsAcceptance),
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
    asMod: Boolean(raw.asMod) || String(raw.fromUser || raw.from || "").trim().toLowerCase() === "mod",
    createdAt: Number(raw.createdAt || 0),
    text: typeof raw.text === "string" ? raw.text : "",
    html: typeof raw.html === "string" ? raw.html : "",
  };
}

function dmActivityAt(thread) {
  if (!thread) return 0;
  return Math.max(Number(thread.lastMessageAt || 0), Number(thread.updatedAt || 0), Number(thread.createdAt || 0));
}

function shortTimeAgo(ts) {
  const t = Number(ts || 0);
  if (!Number.isFinite(t) || t <= 0) return "";
  const deltaMs = Math.max(0, Date.now() - t);
  const mins = Math.floor(deltaMs / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function postChatActivityAt(postId, post) {
  const id = String(postId || "").trim();
  const list = id ? chatByPost.get(id) : null;
  const lastChatAt =
    Array.isArray(list) && list.length
      ? Math.max(
          ...list.map((m) => Math.max(Number(m?.createdAt || 0), Number(m?.editedAt || 0), Number(m?.deletedAt || 0)))
        )
      : 0;
  return Math.max(lastChatAt, Number(post?.createdAt || 0), Number(post?.updatedAt || 0));
}

function pushRecentUnique(list, id, limit = CHAT_RECENTS_LIMIT) {
  const value = String(id || "").trim();
  if (!value) return list;
  const next = [value, ...list.filter((x) => x !== value)];
  if (next.length > limit) next.length = limit;
  return next;
}

function touchRecentHiveChat(postId) {
  const id = String(postId || "").trim();
  if (!id) return;
  recentHiveChatIds = pushRecentUnique(recentHiveChatIds, id);
}

function touchRecentDmChat(threadId) {
  const id = String(threadId || "").trim();
  if (!id) return;
  recentDmChatThreadIds = pushRecentUnique(recentDmChatThreadIds, id);
}

function activeDmThreadsSorted() {
  return dmThreads
    .filter((t) => t && String(t.status || "") === "active")
    .sort((a, b) => dmActivityAt(b) - dmActivityAt(a));
}

function blurFocusedChatComposer() {
  const activeEl = document.activeElement;
  if (!(activeEl instanceof HTMLElement)) return;
  if (activeEl === chatEditor || activeEl.closest?.(".chatEditor")) activeEl.blur();
}

function openChatContextValue(rawValue, opts = null) {
  const raw = String(rawValue || "").trim();
  if (!raw) return false;
  const options = opts && typeof opts === "object" ? opts : {};
  const preserveFocus = Boolean(options.preserveFocus);
  if (raw.startsWith("dm:")) {
    const id = raw.slice(3);
    if (!id) return false;
    openDmThread(id, { preserveFocus });
    return true;
  }
  if (raw.startsWith("post:")) {
    const id = raw.slice(5);
    if (!id) return false;
    openChat(id, { preserveFocus });
    return true;
  }
  return false;
}

function renderChatContextSelect() {
  if (!(chatContextSelectEl instanceof HTMLSelectElement)) return;
  const prevValue = String(chatContextSelectEl.value || "").trim();
  const dmThreadsActive = activeDmThreadsSorted();
  const dmById = new Map(dmThreadsActive.map((t) => [t.id, t]));
  recentDmChatThreadIds = recentDmChatThreadIds.filter((id) => dmById.has(id));
  const dmRecent = [activeDmThreadId, ...recentDmChatThreadIds]
    .map((id) => dmById.get(String(id || "")))
    .filter(Boolean)
    .filter((t, i, arr) => arr.findIndex((x) => x.id === t.id) === i);

  const postsById = new Map(Array.from(posts.values()).map((p) => [String(p.id), p]));
  const openPanelPostIds = Array.from(chatPanelInstances.values())
    .map((inst) => String(inst?.postId || "").trim())
    .filter(Boolean);
  recentHiveChatIds = recentHiveChatIds.filter((id) => {
    const p = postsById.get(String(id));
    return Boolean(p && !p.deleted);
  });
  const knownChatPostIds = Array.from(chatByPost.keys()).map((id) => String(id || "").trim()).filter(Boolean);
  const postRecent = [activeChatPostId, ...openPanelPostIds, ...recentHiveChatIds, ...knownChatPostIds]
    .map((id) => postsById.get(String(id || "")))
    .filter((p) => p && !p.deleted)
    .filter((p, i, arr) => arr.findIndex((x) => String(x.id) === String(p.id)) === i);

  const hasAny = Boolean(dmRecent.length || postRecent.length || activeDmThreadId || activeChatPostId);
  if (!hasAny) {
    chatContextSelectEl.classList.add("hidden");
    chatContextSelectEl.innerHTML = "";
    return;
  }

  const activeDmValue = activeDmThreadId ? `dm:${activeDmThreadId}` : "";
  const activePostValue = activeChatPostId ? `post:${activeChatPostId}` : "";
  const selected = activeDmValue || activePostValue || prevValue;

  syncingChatContextSelect = true;
  chatContextSelectEl.classList.remove("hidden");
  chatContextSelectEl.replaceChildren();
  const topPlaceholder = document.createElement("option");
  topPlaceholder.value = "";
  topPlaceholder.textContent = "Open chats...";
  chatContextSelectEl.appendChild(topPlaceholder);

  if (dmRecent.length) {
    const dmGroup = document.createElement("optgroup");
    dmGroup.label = "DMs";
    for (const thread of dmRecent) {
      const opt = document.createElement("option");
      opt.value = `dm:${String(thread.id || "").trim()}`;
      const when = shortTimeAgo(dmActivityAt(thread));
      opt.textContent = `@${String(thread.other || "unknown")}${when ? ` • ${when}` : ""}`;
      dmGroup.appendChild(opt);
    }
    chatContextSelectEl.appendChild(dmGroup);
  }

  if (postRecent.length) {
    const postGroup = document.createElement("optgroup");
    postGroup.label = "Hive Chats";
    for (const post of postRecent) {
      const postId = String(post.id || "").trim();
      if (!postId) continue;
      const opt = document.createElement("option");
      opt.value = `post:${postId}`;
      const unread = Number(unreadByPostId.get(postId) || 0);
      const unreadLabel = unread > 0 ? ` (${unread})` : "";
      const when = shortTimeAgo(postChatActivityAt(postId, post));
      const mode = normalizePostMode(post.mode || post.chatMode || "");
      const streamLabel = mode === "stream" ? " [stream]" : "";
      opt.textContent = `${postTitle(post)}${streamLabel}${unreadLabel}${when ? ` • ${when}` : ""}${post.author ? ` - @${String(post.author || "")}` : ""}`;
      postGroup.appendChild(opt);
    }
    chatContextSelectEl.appendChild(postGroup);
  }

  chatContextSelectEl.value =
    selected && chatContextSelectEl.querySelector(`option[value="${cssEscape(selected)}"]`) ? selected : "";
  syncingChatContextSelect = false;
}

function setDmThreads(list) {
  dmThreads = Array.isArray(list) ? list.map(normalizeDmThread).filter(Boolean) : [];
  dmThreadsById = new Map(dmThreads.map((t) => [t.id, t]));
  if (pendingOpenDmThreadId) {
    const pending = dmThreadsById.get(pendingOpenDmThreadId) || null;
    if (pending && String(pending.status || "") === "active") {
      openDmThread(pending.id);
    }
  }
  if (activeDmThreadId && !dmThreadsById.has(activeDmThreadId)) {
    activeDmThreadId = null;
  }
  renderPeoplePanel();
  renderChatPanel();
}

function applyChatDock() {
  if (!appRoot) return;
  appRoot.classList.toggle("chatRight", chatDock === "right");
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

function setMediaModalOpen(open) {
  if (!mediaModal) return;
  mediaModal.classList.toggle("hidden", !open);
  if (!open) {
    if (mediaModalImg) mediaModalImg.src = "";
    if (mediaModalOpenLink) mediaModalOpenLink.href = "#";
    if (mediaModalStatus) mediaModalStatus.textContent = "";
    if (mediaModalTitle) mediaModalTitle.textContent = "Media";
  }
}

function setShortcutHelpOpen(open) {
  if (!shortcutHelpModal) return;
  shortcutHelpModal.classList.toggle("hidden", !open);
}

function openMediaModal(url) {
  const src = String(url || "").trim();
  if (!src) return;
  if (!mediaModalImg) return;
  mediaModalImg.src = src;
  if (mediaModalOpenLink) mediaModalOpenLink.href = src;
  if (mediaModalStatus) mediaModalStatus.textContent = "";
  setMediaModalOpen(true);
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

function syncComposerModeUi() {
  const mode = normalizePostMode(postModeEl?.value || "text");
  if (postModeEl && postModeEl.value !== mode) postModeEl.value = mode;
  const showStreamKind = mode === "stream";
  if (streamKindRowEl) streamKindRowEl.classList.toggle("hidden", !showStreamKind);
  if (streamKindEl) streamKindEl.value = normalizeStreamKind(streamKindEl.value || "webcam");
}

syncProtectedUi();
isProtectedEl?.addEventListener("change", () => {
  syncProtectedUi();
  if (isProtectedEl?.checked) postPasswordEl?.focus();
});
syncComposerModeUi();
postModeEl?.addEventListener("change", () => syncComposerModeUi());

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
  const inRackMode = Boolean(appRoot?.classList.contains("rackMode"));
  peopleOpen = inRackMode ? true : Boolean(open);
  if (!peopleDrawerEl) return;
  // In rack mode, "People" is a normal dockable panel; don't hide it behind a special toggle.
  peopleDrawerEl.classList.toggle("hidden", !peopleOpen && !inRackMode);
  if (togglePeopleBtn) {
    if (inRackMode) {
      togglePeopleBtn.classList.add("hidden");
    } else {
      togglePeopleBtn.classList.remove("hidden");
      togglePeopleBtn.textContent = peopleOpen ? "Hide people" : "People";
      togglePeopleBtn.title = peopleOpen ? "Hide people" : "Show people";
    }
  }
  if (peopleOpen && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "peopleList" }));
  }
  if (inRackMode) return;
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
  updateSideRackEmptyState();
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
    if (editModalModeSelect) editModalModeSelect.value = "text";
    if (editModalStreamKindSelect) editModalStreamKindSelect.value = "webcam";
    if (editModalStreamKindRow) editModalStreamKindRow.classList.add("hidden");
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

function syncEditModalModeUi() {
  const mode = normalizePostMode(editModalModeSelect?.value || "text");
  if (editModalModeSelect && editModalModeSelect.value !== mode) editModalModeSelect.value = mode;
  if (editModalStreamKindRow) editModalStreamKindRow.classList.toggle("hidden", mode !== "stream");
  if (editModalStreamKindSelect) editModalStreamKindSelect.value = normalizeStreamKind(editModalStreamKindSelect.value || "webcam");
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
  if (editModalModeSelect) editModalModeSelect.value = normalizePostMode(post.mode || post.chatMode || "");
  if (editModalStreamKindSelect) editModalStreamKindSelect.value = normalizeStreamKind(post.streamKind || "webcam");
  syncEditModalModeUi();
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
  if (editModalModeSelect) editModalModeSelect.value = "text";
  if (editModalStreamKindSelect) editModalStreamKindSelect.value = "webcam";
  syncEditModalModeUi();
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
editModalModeSelect?.addEventListener("change", () => syncEditModalModeUi());

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
  const modDmBtn = canModerate && canDm
    ? `<button type="button" class="ghost smallBtn" data-moddm="${escapeHtml(p.username)}">Mod DM</button>`
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
    ${dmBtn || modDmBtn || ignoreBtn || blockBtn ? `<div class="profileActions">${dmBtn}${modDmBtn}${ignoreBtn}${blockBtn}</div>` : ""}
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
  // In rack mode, panels are independent. Profile shouldn't "replace" the Hives panel.
  if (rackLayoutEnabled) {
    if (pollinatePanel) {
      pollinatePanel.classList.remove("hidden");
      pollinatePanel.classList.toggle("panelCollapsed", !composerOpen);
      pollinatePanel.dataset.panelDisplay = composerOpen ? "full" : "collapsed";
    }
    renderProfilePanel();
    updateSideRackEmptyState();
    return;
  }

  const profileMode = centerView === "profile";
  if (profileViewPanel) profileViewPanel.classList.toggle("hidden", !profileMode);
  if (feedEl?.closest("section")) feedEl.closest("section").classList.toggle("hidden", profileMode);
  if (pollinatePanel) {
    if (profileMode) pollinatePanel.classList.add("hidden");
    else pollinatePanel.classList.toggle("hidden", !composerOpen);
  }
  if (!profileMode) return;
  renderProfilePanel();
}

function renderProfilePanel() {
  if (!profileViewPanel) return;
  if (!activeProfileUsername && !activeProfile && loggedInUser) {
    activeProfileUsername = String(loggedInUser || "").trim().toLowerCase();
  }

  const username = String(activeProfile?.username || activeProfileUsername || "")
    .trim()
    .toLowerCase();

  if (username) {
    // Ensure we always have *some* profile data to show immediately.
    if (!activeProfile || String(activeProfile.username || "").toLowerCase() !== username) {
      const basic = getProfile(username);
      activeProfile = normalizeProfileData({ username, image: basic.image || "", color: basic.color || "" });
    }

    // Pull the full profile from the server (bio/links/song) once per username selection.
    try {
      if (ws?.readyState === WebSocket.OPEN && lastRequestedProfileUsername !== username) {
        lastRequestedProfileUsername = username;
        ws.send(JSON.stringify({ type: "getUserProfile", username }));
      }
    } catch {
      // ignore
    }
  }

  if (profileViewTitle) profileViewTitle.textContent = username ? `@${username}` : "Profile";
  if (profileViewMeta) profileViewMeta.textContent = username === loggedInUser ? "Your profile" : "Community profile";
  renderProfileCard();
  renderProfileEditor();
}

function setCenterView(next, username = "") {
  if (rackLayoutEnabled) {
    // Keep the legacy centerView on "hives" in rack mode; just update profile context.
    const wantsProfile = next === "profile";
    if (wantsProfile) {
      activeProfileUsername = String(username || activeProfileUsername || "")
        .trim()
        .toLowerCase();
      isEditingProfile = false;
      if (profileEditToggleBtn) profileEditToggleBtn.textContent = "Edit profile";

      // Make sure the profile panel is actually visible as its own panel.
      undockPanel("profile");
      profileViewPanel.classList.remove("panelCollapsed");
      profileViewPanel.dataset.panelDisplay = "full";
      enforceWorkspaceRules();
      renderProfilePanel();
    } else {
      activeProfileUsername = "";
      activeProfile = null;
      isEditingProfile = false;
      if (profileEditToggleBtn) profileEditToggleBtn.textContent = "Edit profile";
      renderProfilePanel();
    }
    return;
  }

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
  if (isMobileSwipeMode()) setMobileScreen("profile");
}

function isMobileSwipeMode() {
  // Mobile UX should kick in for touch-first devices, including landscape phones.
  // (Many phones exceed 760px in landscape, so max-width alone is not sufficient.)
  const mqNarrow = "(max-width: 760px)";
  const mqPortrait = "(hover: none) and (pointer: coarse) and (max-width: 900px)";
  const mqLandscape = "(hover: none) and (pointer: coarse) and (max-height: 520px)";
  return window.matchMedia(mqNarrow).matches || window.matchMedia(mqPortrait).matches || window.matchMedia(mqLandscape).matches;
}

function isMobileScreenMode() {
  // Keep this consistent with CSS mobile screen media queries.
  const mqNarrow = "(max-width: 760px)";
  const mqPortrait = "(hover: none) and (pointer: coarse) and (max-width: 900px)";
  const mqLandscape = "(hover: none) and (pointer: coarse) and (max-height: 520px)";
  return window.matchMedia(mqNarrow).matches || window.matchMedia(mqPortrait).matches || window.matchMedia(mqLandscape).matches;
}

function loadMobileLayout() {
  const defaults = () => {
    const pinned = ["account", "hives", "chat", "people", "profile"];
    const onboardingEnabled = Boolean(normalizeInstanceBranding(instanceBranding).onboarding?.enabled);
    const active = onboardingEnabled ? "onboarding" : pinned[0] || "account";
    return { version: 1, pinned, active, history: [], tools: { composerOpen: false, profileOpen: false, pluginRackOpen: false } };
  };
  const sanitizeId = (id) => {
    const raw = String(id || "")
      .trim()
      .toLowerCase();
    if (!raw) return "";
    if (raw === "maps" || raw === "library") return "";
    if (raw === "mod") return canModerate ? "moderation" : "";
    if (raw === "sidebar") return "account";
    if (raw === "main" || raw === "workspace") return "hives";
    if (raw === "account" || raw === "hives" || raw === "chat" || raw === "people" || raw === "profile" || raw === "onboarding") return raw;
    if (raw === "moderation") return canModerate ? "moderation" : "";
    if (panelRegistry.has(raw)) return raw;
    return "";
  };
  try {
    const raw = localStorage.getItem(MOBILE_LAYOUT_KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw);
    const pinned = Array.isArray(parsed?.pinned) ? parsed.pinned.map((x) => sanitizeId(x)).filter(Boolean) : null;
    const active = sanitizeId(parsed?.active);
    const history = Array.isArray(parsed?.history) ? parsed.history.map((x) => sanitizeId(x)).filter(Boolean) : [];
    const base = defaults();
    if (pinned && pinned.length) base.pinned = pinned.slice(0, 5);
    if (active) base.active = active;
    base.history = history.slice(0, 12);
    return base;
  } catch {
    return defaults();
  }
}

function saveMobileLayout(layout) {
  try {
    localStorage.setItem(MOBILE_LAYOUT_KEY, JSON.stringify(layout));
  } catch {
    // ignore
  }
}

function availableMobileScreens() {
  const out = [];
  out.push({ id: "account", title: "Account", core: true });
  if (Boolean(normalizeInstanceBranding(instanceBranding).onboarding?.enabled)) out.push({ id: "onboarding", title: "Onboarding", core: true });
  out.push({ id: "hives", title: "Hives", core: true });
  out.push({ id: "chat", title: "Chat", core: true });
  out.push({ id: "people", title: "People", core: true });
  out.push({ id: "profile", title: "Profile", core: true });
  if (canModerate) out.push({ id: "moderation", title: "Moderation", core: true });

  // Plugin screens: include primary-ish panels that exist.
  for (const [id, entry] of panelRegistry.entries()) {
    if (!id || typeof id !== "string") continue;
    if (id === "maps" || id === "library") continue;
    if (id === "hives" || id === "chat" || id === "people" || id === "moderation" || id === "profile" || id === "composer" || id === "pluginRack") continue;
    const role = typeof entry?.role === "string" ? entry.role : "";
    if (role && role !== "primary") continue;
    const hasElement = entry?.element instanceof HTMLElement;
    const canRender = typeof pluginPanelDefsByPanelId.get(id)?.render === "function";
    if (!hasElement && !canRender) continue;
    out.push({ id, title: panelTitle(id), core: false });
  }

  // Prefer stable ordering.
  const byTitle = (a, b) => String(a.title || "").localeCompare(String(b.title || ""));
  const core = out.filter((x) => x.core).sort(byTitle);
  const plugins = out.filter((x) => !x.core).sort(byTitle);
  return { core, plugins };
}

function mobileScreenFromLegacyPanel(next) {
  const raw = String(next || "").trim();
  if (!raw) return "hives";
  if (raw === "maps" || raw === "library") return "hives";
  if (raw === "sidebar") return "account";
  if (raw === "main" || raw === "workspace") return "hives";
  if (raw === "chat") return "chat";
  if (raw === "people") return "people";
  if (raw === "profile") return "profile";
  if (raw === "onboarding") return "onboarding";
  if (raw === "moderation" || raw === "mod") return canModerate ? "moderation" : "hives";
  if (raw === "hives" || raw === "account" || raw === "people" || raw === "profile" || raw === "onboarding" || raw === "moderation") return raw;
  // Plugin panel id can be treated as a screen.
  if (panelRegistry.has(raw)) return raw;
  return "hives";
}

function setMobileMoreOpen(open) {
  mobileMoreOpen = Boolean(open);
  if (mobileMoreSheetEl) mobileMoreSheetEl.classList.toggle("hidden", !mobileMoreOpen);
  if (mobileNavEl) {
    const moreBtn = mobileNavEl.querySelector?.('[data-mobilescreen="more"]');
    if (moreBtn instanceof HTMLElement) {
      moreBtn.classList.toggle("primary", mobileMoreOpen);
      moreBtn.classList.toggle("ghost", !mobileMoreOpen);
    }
  }
}

function restoreHostedPanelIfAny() {
  const ids = Array.from(mobileHostedPanelIds);
  if (mobileHostPanelId && !ids.includes(mobileHostPanelId)) ids.push(mobileHostPanelId);
  if (!ids.length) return;
  mobileHostedPanelIds.clear();
  mobileHostPanelId = "";
  for (const id of ids) {
    const el = getPanelElement(id);
    const parent = mobileHostRestoreParentByPanelId.get(id) || null;
    mobileHostRestoreParentByPanelId.delete(id);
    if (!(el instanceof HTMLElement)) continue;
    if (!parent && mobileHostEphemeralPanelIds.has(id)) {
      mobileHostEphemeralPanelIds.delete(id);
      try {
        el.remove();
      } catch {
        // ignore
      }
      const prev = panelRegistry.get(id);
      if (prev) panelRegistry.set(id, { ...prev, element: null });
      continue;
    }
    if (parent instanceof HTMLElement && parent.isConnected) {
      parent.appendChild(el);
      continue;
    }
    const def = panelRegistry.get(id);
    const wantsMain = String(def?.defaultRack || "").toLowerCase() === "main";
    const rack = wantsMain ? ensureMainSideRack() : ensureRightRack();
    if (rack) rack.appendChild(el);
  }
}

function ensureMobileHostedPluginPanel(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return null;
  const existing = getPanelElement(id);
  if (existing instanceof HTMLElement) return existing;
  const entry = panelRegistry.get(id);
  const src = typeof entry?.source === "string" ? entry.source : "";
  if (!src.startsWith("plugin:")) return null;
  const def = pluginPanelDefsByPanelId.get(id);
  const render = def?.render;
  if (typeof render !== "function") return null;

  const shell = document.createElement("section");
  shell.className = "panel panelFill pluginPanel mobileHostedPluginPanel";
  shell.dataset.panelId = id;
  shell.innerHTML = `
    <div class="panelHeader">
      <div class="panelTitle">${escapeHtml(def?.title || id)}</div>
      <div class="row"></div>
    </div>
    <div class="panelBody" data-pluginmount="1"></div>
  `;

  const mount = shell.querySelector("[data-pluginmount]");
  if (mount instanceof HTMLElement) {
    const pluginId = String(def?.pluginId || "").trim();
    const api = {
      toast,
      send: (eventName, payload) => {
        const ev = String(eventName || "").trim();
        if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,63}$/.test(ev)) return false;
        const wsRef = window.__bzlWs;
        if (!wsRef || wsRef.readyState !== WebSocket.OPEN) return false;
        const msg = payload && typeof payload === "object" ? payload : {};
        wsRef.send(JSON.stringify({ ...msg, type: `plugin:${pluginId}:${ev}` }));
        return true;
      },
      getUser: () => loggedInUser,
      getRole: () => loggedInRole,
      storage: {
        get(key) {
          try {
            return localStorage.getItem(`bzl_panel_${id}_${String(key || "")}`);
          } catch {
            return null;
          }
        },
        set(key, value) {
          try {
            localStorage.setItem(`bzl_panel_${id}_${String(key || "")}`, String(value ?? ""));
            return true;
          } catch {
            return false;
          }
        }
      }
    };
    try {
      const cleanup = render(mount, api);
      if (typeof cleanup === "function") shell.__panelCleanup = cleanup;
    } catch (e) {
      console.warn(`Plugin ${pluginId} panel render failed:`, e?.message || e);
      mount.textContent = `Failed to render panel "${id}".`;
    }
  }

  panelRegistry.set(id, {
    ...(entry || { id, title: def?.title || id, icon: def?.icon || "", source: `plugin:${def?.pluginId || ""}`, role: def?.role || "aux", defaultRack: def?.defaultRack || "right" }),
    title: def?.title || (entry?.title || id),
    icon: def?.icon || (entry?.icon || ""),
    role: def?.role || (entry?.role || "aux"),
    defaultRack: def?.defaultRack || (entry?.defaultRack || "right"),
    element: shell
  });
  mobileHostEphemeralPanelIds.add(id);
  return shell;
}

function hostPanelInMobileScreen(panelId) {
  const id = String(panelId || "").trim();
  if (!id) return false;
  if (!(mobileScreenHostEl instanceof HTMLElement)) return false;
  if (rackLayoutEnabled && isDocked(id)) {
    undockPanel(id);
    applyDockState();
  }
  let el = getPanelElement(id);
  if (!(el instanceof HTMLElement)) el = ensureMobileHostedPluginPanel(id);
  if (!(el instanceof HTMLElement)) return false;
  el.classList.remove("hidden");

  restoreHostedPanelIfAny();
  const parent = el.parentElement;
  if (parent instanceof HTMLElement) mobileHostRestoreParentByPanelId.set(id, parent);
  mobileHostPanelId = id;
  mobileHostedPanelIds.clear();
  mobileHostedPanelIds.add(id);
  mobileScreenHostEl.innerHTML = "";
  mobileScreenHostEl.appendChild(el);
  return true;
}

function hostHivesInMobileScreen() {
  if (!(mobileScreenHostEl instanceof HTMLElement)) return false;
  if (rackLayoutEnabled) {
    if (isDocked("hives")) undockPanel("hives");
    applyDockState();
  }
  const hivesEl = getPanelElement("hives");
  if (!(hivesEl instanceof HTMLElement)) return false;

  restoreHostedPanelIfAny();

  const hivesParent = hivesEl.parentElement;
  if (hivesParent instanceof HTMLElement) mobileHostRestoreParentByPanelId.set("hives", hivesParent);

  mobileScreenHostEl.innerHTML = "";
  hivesEl.classList.remove("hidden");
  mobileScreenHostEl.appendChild(hivesEl);

  mobileHostedPanelIds.clear();
  mobileHostedPanelIds.add("hives");
  mobileHostPanelId = "hives";

  return true;
}

function setMobileScreen(screenId, { pushHistory = true } = {}) {
  if (!appRoot) return;
  const screen = mobileScreenFromLegacyPanel(screenId);
  if (onboardingNeedsAcceptanceNow() && screen !== "onboarding" && screen !== "account") {
    setMobileScreen("onboarding", { pushHistory: false });
    return;
  }
  const nextIsMore = screen === "more";
  if (nextIsMore) {
    setMobileMoreOpen(true);
    return;
  }

  if (pushHistory) {
    const current = String(appRoot.getAttribute("data-mobile-screen") || "").trim();
    if (current && current !== "more" && current !== screen) {
      const layout = loadMobileLayout();
      layout.history = [current, ...(layout.history || [])].filter((x, idx, arr) => x && arr.indexOf(x) === idx).slice(0, 12);
      saveMobileLayout(layout);
    }
  }

  setMobileMoreOpen(false);

  // Core screens map directly.
  if (screen === "people") {
    setPeopleOpen(true);
    peopleDrawerEl?.classList.remove("hidden");
    renderPeoplePanel();
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "peopleList" }));
  } else {
    setPeopleOpen(false);
  }

  if (screen === "moderation" && !canModerate) {
    appRoot.setAttribute("data-mobile-screen", "hives");
    return;
  }

  if (screen === "account") {
    restoreHostedPanelIfAny();
    appRoot.setAttribute("data-mobile-screen", screen);
    return;
  }

  if (screen === "people") {
    const hosted = hostPanelInMobileScreen("people");
    appRoot.setAttribute("data-mobile-screen", hosted ? "host" : "people");
    return;
  }

  if (screen === "profile") {
    const target = String(activeProfileUsername || loggedInUser || "").trim().toLowerCase();
    if (target) setCenterView("profile", target);
    else renderProfilePanel();
    const hosted = hostPanelInMobileScreen("profile");
    appRoot.setAttribute("data-mobile-screen", hosted ? "host" : "hives");
    return;
  }

  if (screen === "onboarding") {
    const hosted = hostPanelInMobileScreen("onboarding");
    appRoot.setAttribute("data-mobile-screen", hosted ? "host" : "hives");
    return;
  }

  if (screen === "hives") {
    const hosted = hostHivesInMobileScreen();
    appRoot.setAttribute("data-mobile-screen", hosted ? "host" : "hives");
    return;
  }

  const hostableCorePanelId = screen === "chat" ? "chat" : screen === "moderation" ? "moderation" : "";
  if (hostableCorePanelId) {
    const hosted = hostPanelInMobileScreen(hostableCorePanelId);
    appRoot.setAttribute("data-mobile-screen", hosted ? "host" : "hives");
    return;
  }

  // Plugin screen: host it.
  const hosted = hostPanelInMobileScreen(screen);
  appRoot.setAttribute("data-mobile-screen", hosted ? "host" : "hives");
}

function setMobilePanel(next) {
  if (!appRoot) return;
  // Back-compat shim: old callers still call setMobilePanel("chat"/"main"/etc).
  if (!isMobileScreenMode()) return;
  mobilePanel = mobileScreenFromLegacyPanel(next);
  setMobileScreen(mobilePanel, { pushHistory: true });
}

function applyMobileMode() {
  if (!appRoot) return;
  const wasMobile = appRoot.classList.contains("mobileScreens");
  const mobile = isMobileScreenMode();
  appRoot.classList.toggle("mobileScreens", mobile);
  if (mobileNavEl) mobileNavEl.classList.toggle("hidden", !mobile);
  if (mobile) stopAnyPanelResize();

  if (!mobile) {
    setMobileMoreOpen(false);
    restoreHostedPanelIfAny();
    return;
  }

  if (mobileFourthBtn instanceof HTMLElement) {
    mobileFourthBtn.textContent = "People";
    mobileFourthBtn.setAttribute("data-mobilescreen", "people");
  }

  // Apply persisted layout only when entering mobile mode (avoid resetting state on keyboard/URL-bar resizes).
  const current = String(appRoot.getAttribute("data-mobile-screen") || "").trim();
  if (!wasMobile || !current) {
    const layout = loadMobileLayout();
    const desired = onboardingNeedsAcceptanceNow() ? "onboarding" : mobileScreenFromLegacyPanel(layout.active || "hives");
    setMobileScreen(desired, { pushHistory: false });
  }
  renderMobileNav();
  if (mobileMoreOpen) renderMobileMoreList();

  if (!wasMobile) {
    if (canResizeSidebarNow()) applySidebarWidth(readStoredSidebarWidth(), false);
    if (canResizeChatNow()) applyChatWidth(readStoredChatWidth(), false);
    if (canResizeModNow()) applyModWidth(readStoredModWidth(), false);
    if (canResizePeopleNow()) applyPeopleWidth(readStoredPeopleWidth(), false);
    setComposerOpen(composerOpen);
  }
}

function shiftMobilePanel(delta) {
  if (!isMobileScreenMode()) return;
  const order = canModerate
    ? ["account", "onboarding", "hives", "chat", "people", "profile", "moderation"]
    : ["account", "onboarding", "hives", "chat", "people", "profile"];
  const current = mobileScreenFromLegacyPanel(appRoot?.getAttribute("data-mobile-screen") || "hives");
  const idx = order.indexOf(current);
  const at = idx >= 0 ? idx : 0;
  const nextIdx = Math.max(0, Math.min(order.length - 1, at + delta));
  setMobileScreen(order[nextIdx]);
  const layout = loadMobileLayout();
  layout.active = order[nextIdx];
  saveMobileLayout(layout);
  renderMobileNav();
}

function renderMobileNav() {
  if (!(mobileNavEl instanceof HTMLElement)) return;
  if (!appRoot) return;
  const active = String(appRoot.getAttribute("data-mobile-screen") || "hives").trim();
  const buttons = Array.from(mobileNavEl.querySelectorAll("[data-mobilescreen]"));
  for (const btn of buttons) {
    const id = String(btn.getAttribute("data-mobilescreen") || "").trim();
    const on = id !== "more" && (active === id || (active === "host" && id === mobileHostPanelId));
    btn.classList.toggle("primary", on);
    btn.classList.toggle("ghost", !on);
  }
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

// Plugin event handlers: pluginId -> eventName -> Set<fn(msg)>
const pluginClientHandlers = new Map();
// Moderation plugin tabs: fullTabId -> { title, ownerOnly, render(mount, api), pluginId }
const modPluginTabs = new Map();
// Plugin panels by panelId (so mobile can render plugin screens even when rack layout is off).
const pluginPanelDefsByPanelId = new Map();

// Minimal plugin host (client-side). Plugins are trusted by the owner who installs them.
// Plugin scripts can call `window.BzlPluginHost.register("pluginId", (ctx) => { ... })`.
if (!window.BzlPluginHost) {
  const pluginInits = new Map();
  window.BzlPluginHost = {
    apiVersion: 3,
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
          on(eventName, handler) {
            const ev = String(eventName || "").trim();
            if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,63}$/.test(ev)) throw new Error("Invalid event name");
            if (typeof handler !== "function") throw new Error("handler must be a function");
            let byEvent = pluginClientHandlers.get(id);
            if (!byEvent) {
              byEvent = new Map();
              pluginClientHandlers.set(id, byEvent);
            }
            let set = byEvent.get(ev);
            if (!set) {
              set = new Set();
              byEvent.set(ev, set);
            }
            set.add(handler);
            return () => {
              try {
                set.delete(handler);
              } catch {
                // ignore
              }
            };
          },
          ui: {
            registerModTab(tabDef) {
              const tabId = String(tabDef?.id || id).trim().toLowerCase();
              if (!/^[a-z0-9][a-z0-9_.-]{0,31}$/.test(tabId)) throw new Error("Invalid tab id");
              const title = typeof tabDef?.title === "string" ? tabDef.title.trim().slice(0, 22) : tabId;
              const ownerOnly = Boolean(tabDef?.ownerOnly);
              const render = tabDef?.render;
              if (typeof render !== "function") throw new Error("render must be a function");

              const fullId = `plugin:${id}:${tabId}`;
              modPluginTabs.set(fullId, { title, ownerOnly, render, pluginId: id });

              const tabsEl = modPanelEl?.querySelector?.(".modTabs");
              if (tabsEl && !tabsEl.querySelector(`[data-modtab="${CSS.escape(fullId)}"]`)) {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "ghost";
                btn.textContent = title;
                btn.setAttribute("data-modtab", fullId);
                btn.dataset.ownerOnly = ownerOnly ? "1" : "0";
                tabsEl.appendChild(btn);
              }

              // If the tab isn't visible for this user, don't allow it to become active.
              if (ownerOnly && loggedInRole !== "owner" && modTab === fullId) {
                modTab = "server";
                renderModPanel();
              }
              return true;
            },
            registerPanel(panelDef) {
              const panelId = String(panelDef?.id || id).trim().toLowerCase();
              if (!/^[a-z0-9][a-z0-9_.-]{0,31}$/.test(panelId)) throw new Error("Invalid panel id");
              const title = typeof panelDef?.title === "string" ? panelDef.title.trim().slice(0, 40) : panelId;
              const icon = typeof panelDef?.icon === "string" ? panelDef.icon.trim().slice(0, 10) : "";
              const defaultRack =
                typeof panelDef?.defaultRack === "string" && /^(main|right)$/i.test(panelDef.defaultRack)
                  ? panelDef.defaultRack.toLowerCase()
                  : "right";
              const role =
                typeof panelDef?.role === "string" && /^(primary|aux|transient|utility)$/i.test(panelDef.role)
                  ? panelDef.role.toLowerCase()
                  : "aux";
              const source = `plugin:${id}`;
              const render = typeof panelDef?.render === "function" ? panelDef.render : null;

              pluginPanelDefsByPanelId.set(panelId, { pluginId: id, panelId, title, icon, defaultRack, role, render });

              // Create a visible shell only when rack layout is enabled (for now).
              // Otherwise, plugins should continue using their existing DOM hooks.
              let element = null;
              if (rackLayoutEnabled) {
                const shell = ensurePluginPanelShell(panelId, title, icon, defaultRack, role);
                element = shell;
                const mount = shell ? shell.querySelector("[data-pluginmount]") : null;
                if (mount) {
                  mount.innerHTML = "";
                  const api = {
                    toast,
                    send: (eventName, payload) => {
                      const ev = String(eventName || "").trim();
                      if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,63}$/.test(ev)) return false;
                      const wsRef = window.__bzlWs;
                      if (!wsRef || wsRef.readyState !== WebSocket.OPEN) return false;
                      const msg = payload && typeof payload === "object" ? payload : {};
                      wsRef.send(JSON.stringify({ ...msg, type: `plugin:${id}:${ev}` }));
                      return true;
                    },
                    getUser: () => loggedInUser,
                    getRole: () => loggedInRole,
                    storage: {
                      get(key) {
                        try {
                          return localStorage.getItem(`bzl_panel_${panelId}_${String(key || "")}`);
                        } catch {
                          return null;
                        }
                      },
                      set(key, value) {
                        try {
                          localStorage.setItem(`bzl_panel_${panelId}_${String(key || "")}`, String(value ?? ""));
                          return true;
                        } catch {
                          return false;
                        }
                      },
                    },
                  };
                  try {
                    const cleanup = render ? render(mount, api) : null;
                    if (typeof cleanup === "function") {
                      // Store cleanup on the shell so future hot-reload / uninstall can call it.
                      shell.__panelCleanup = cleanup;
                    }
                  } catch (e) {
                    console.warn(`Plugin ${id} panel render failed:`, e?.message || e);
                    mount.textContent = `Failed to render panel "${panelId}".`;
                  }
                }

                enableRackDnD();
              }

              panelRegistry.set(panelId, { id: panelId, title, icon, source, role, defaultRack, element });
              applyPluginPresetHint(panelDef);
              applyDockState();
              syncRackStateFromDom();
              return true;
            },
          },
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

function normalizePostMode(mode) {
  const m = String(mode || "").trim().toLowerCase();
  if (m === "walkie") return "walkie";
  if (m === "stream") return "stream";
  return "text";
}

function normalizeStreamKind(kind) {
  const k = String(kind || "").trim().toLowerCase();
  if (k === "screen" || k === "audio") return k;
  return "webcam";
}

function streamKindLabel(kind) {
  const k = normalizeStreamKind(kind);
  if (k === "screen") return "Screen share";
  if (k === "audio") return "Audio only";
  return "Webcam";
}

function isStreamPost(post) {
  return normalizePostMode(post?.mode || post?.chatMode || "") === "stream";
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

function canManagePlugins() {
  return Boolean(loggedInUser && (loggedInRole === "owner" || loggedInRole === "moderator"));
}

function renderPluginsAdminHtml() {
  if (!canManagePlugins()) return `<div class="muted small">Moderator/owner only.</div>`;
  const status = pluginAdminStatus ? `<div class="small muted">${escapeHtml(pluginAdminStatus)}</div>` : "";
  const busyLine = pluginAdminBusy ? `<div class="small muted">Working...</div>` : "";
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
    <div class="small muted">Moderator/owner only. Install optional plugins to extend your instance.</div>
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

function currentSortMode() {
  return String(sortByEl?.value || "activity");
}

function updateMobileSortCycleLabel() {
  if (!(mobileSortCycleBtn instanceof HTMLElement)) return;
  const mode = currentSortMode();
  const label = mode === "popular" ? "Popular" : mode === "expiring" ? "Ending" : "Recent";
  mobileSortCycleBtn.textContent = label;
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
  if (!showReactions) return "";
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
    feedEl.innerHTML = `<div class="small muted">No active posts in this view/filter.</div><div class="uiHint">Tap <b>New Hive</b> to create one, or clear filters to widen results.</div>`;
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
      const streamMode = normalizePostMode(p.mode || p.chatMode || "");
      const isStream = streamMode === "stream";
      const streamLive = Boolean(streamLiveByPostId.get(p.id) ?? p.streamLive);
      const streamKind = normalizeStreamKind(p.streamKind || "webcam");
      const streamLine = isStream
        ? `<div class="small muted postStreamLine">Stream · ${escapeHtml(streamKindLabel(streamKind))}${streamLive ? " · live now" : ""}</div>`
        : "";
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
        ? `<button type="button" class="ghost smallBtn kebabBtn" data-postmenu="${p.id}" aria-haspopup="menu" aria-expanded="false" title="More">&#8942;</button>`
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
      const contentHtml = typeof p.contentHtml === "string" && p.contentHtml.trim() ? p.contentHtml : "";
      const contentText = typeof p.content === "string" && p.content.trim() ? escapeHtml(p.content) : "";
      const content = contentHtml ? contentHtml : contentText ? `<div class="muted">${contentText}</div>` : "";
      const contentBlock = content ? `<div class="postContent">${content}</div>` : "";
      const lastChat = (chatByPost.get(p.id) || []).filter((m) => !m?.deleted).slice(-1)[0] || null;
      const lastChatFrom = lastChat ? String(lastChat.fromUser || "").trim() : "";
      const lastChatText = lastChat ? String(lastChat.text || "").replace(/\s+/g, " ").trim().slice(0, 92) : "";
      const lastChatWho = lastChat
        ? (lastChatFrom && lastChatFrom.toLowerCase() === "mod" ? "MOD" : `@${escapeHtml(lastChatFrom || "unknown")}`)
        : "";
      const lastChatLine = lastChat
        ? `<div class="small muted postLastChat">Last chat: ${lastChatWho}${lastChatText ? ` — ${escapeHtml(lastChatText)}` : ""}</div>`
        : "";
      const typersSet = typingUsersByPostId.get(p.id);
      const typingUsers = typersSet ? Array.from(typersSet.values()).slice(0, 2) : [];
      const typingMore = typersSet && typersSet.size > typingUsers.length ? ` +${typersSet.size - typingUsers.length}` : "";
      const typingLine = typingUsers.length
        ? `<div class="small muted postTypingLine">${typingUsers.map((u) => `@${escapeHtml(u)}`).join(", ")}${typingMore} typing...</div>`
        : "";

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
              <button type="button" data-chat="${p.id}">${p.locked ? "Unlock" : p.deleted ? "View" : isStream ? "Watch" : "Chat"}</button>
              ${kebabBtn}
              ${postMenu}
            </div>
          </div>
        </div>
        ${deletedLine}
        ${editedLine}
        ${streamLine}
        ${contentBlock}
        ${typingLine}
        ${lastChatLine}
        <div class="postMeta">${collectionTag}${tags ? ` ${tags}` : ""}</div>
        ${reactionsHtml}
      </article>`;
    })
    .join("");

  try {
    feedEl.querySelectorAll?.(".postContent").forEach((el) => decorateYouTubeEmbedsInElement(el));
  } catch {
    // ignore
  }
}

function isMobileChatScreenActive() {
  if (!isMobileScreenMode() || !appRoot) return false;
  const screen = String(appRoot.getAttribute("data-mobile-screen") || "").trim();
  return screen === "chat" || (screen === "host" && mobileHostPanelId === "chat");
}

function renderMobileChatListHtml() {
  const dmActive = activeDmThreadsSorted().slice(0, 30);
  const recentPostIds = recentHiveChatIds.slice(0, 24);
  const recentPosts = recentPostIds.map((id) => posts.get(id)).filter((p) => p && !p.deleted);
  const recentPostIdSet = new Set(recentPosts.map((p) => String(p.id)));
  const availablePosts = sortPosts(Array.from(posts.values()))
    .filter((p) => p && !p.deleted && !recentPostIdSet.has(String(p.id)))
    .slice(0, 60);

  if (!dmActive.length && !recentPosts.length && !availablePosts.length) {
    return `<div class="small muted">No active hives available for chat.</div><div class="uiHint">Create a hive in Hives first, then return here to chat.</div>`;
  }

  const dmSection = dmActive.length
    ? `<div class="mobileChatSection">
        <div class="small muted">DMs</div>
        ${dmActive
          .map((t) => {
            const who = `@${escapeHtml(String(t.other || "unknown"))}`;
            const when = dmActivityAt(t) ? new Date(dmActivityAt(t)).toLocaleTimeString() : "active";
            return `<button type="button" class="ghost mobileChatListItem" data-dmopen="${escapeHtml(t.id)}">
              <span class="mobileChatListTop">${who}</span>
              <span class="mobileChatListMeta">private chat · ${escapeHtml(when)}</span>
            </button>`;
          })
          .join("")}
      </div>`
    : "";

  const postItem = (p) => {
    const title = escapeHtml(postTitle(p));
    const author = p.author ? `@${escapeHtml(String(p.author || ""))}` : "anon";
    const exp = formatCountdown(p.expiresAt);
    const lock = p.locked ? " · locked" : "";
    const mode = normalizePostMode(p.mode || p.chatMode || "");
    const streamLive = mode === "stream" && Boolean(streamLiveByPostId.get(p.id) ?? p.streamLive);
    const streamTag = mode === "stream" ? ` · stream${streamLive ? " live" : ""}` : "";
    return `<button type="button" class="ghost mobileChatListItem" data-mobilechatopen="${escapeHtml(p.id)}">
      <span class="mobileChatListTop">${title}</span>
      <span class="mobileChatListMeta">${author} · ${escapeHtml(exp)}${lock}${streamTag}</span>
    </button>`;
  };

  const recentSection = recentPosts.length
    ? `<div class="mobileChatSection">
        <div class="small muted">Recent Hive Chats</div>
        ${recentPosts.map(postItem).join("")}
      </div>`
    : "";

  const hivesSection = availablePosts.length
    ? `<div class="mobileChatSection">
        <div class="small muted">Available Hives</div>
        ${availablePosts.map(postItem).join("")}
      </div>`
    : "";

  return `<div class="mobileChatList">${dmSection}${recentSection}${hivesSection}</div>`;
}

function onboardingRequiresAcceptance() {
  return Boolean(onboardingState.enabled && onboardingState.requireAcceptance);
}

function onboardingNeedsAcceptanceNow() {
  if (!onboardingRequiresAcceptance()) return false;
  return Boolean(onboardingState.needsAcceptance || Number(onboardingState.acceptedRulesVersion || 0) < Number(onboardingState.rulesVersion || 1));
}

function onboardingSeverityLabel(severity) {
  const s = String(severity || "").toLowerCase();
  if (s === "critical") return "Critical";
  if (s === "warn") return "Warn";
  return "Info";
}

function onboardingSeverityBadge(severity) {
  const s = String(severity || "info").toLowerCase();
  const cls = s === "critical" ? "onbSeverityCritical" : s === "warn" ? "onbSeverityWarn" : "onbSeverityInfo";
  return `<span class="tag ${cls}">${escapeHtml(onboardingSeverityLabel(s))}</span>`;
}

function onboardingRuleListFromConfig(cfg) {
  const list = Array.isArray(cfg?.rules?.items) ? cfg.rules.items : [];
  return list
    .map((r, index) => ({
      id: String(r?.id || `r${index + 1}`).trim().slice(0, 40) || `r${index + 1}`,
      order: Number.isFinite(Number(r?.order)) ? Math.max(1, Math.floor(Number(r.order))) : index + 1,
      name: String(r?.name || "").trim().slice(0, 60) || `Rule ${index + 1}`,
      shortDescription: String(r?.shortDescription || "").trim().slice(0, 180),
      description: String(r?.description || "").slice(0, 6000),
      severity: ["info", "warn", "critical"].includes(String(r?.severity || "").toLowerCase())
        ? String(r.severity).toLowerCase()
        : "info",
    }))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || String(a.id || "").localeCompare(String(b.id || "")));
}

function onboardingDraftStampFromConfig(cfg) {
  return JSON.stringify({
    enabled: Boolean(cfg?.enabled),
    aboutUpdatedAt: Number(cfg?.about?.updatedAt || 0),
    rulesVersion: Number(cfg?.rules?.version || 1),
    itemCount: Array.isArray(cfg?.rules?.items) ? cfg.rules.items.length : 0,
    roleSelectEnabled: Boolean(cfg?.roleSelect?.enabled),
    selfAssignableCount: Array.isArray(cfg?.roleSelect?.selfAssignableRoleIds) ? cfg.roleSelect.selfAssignableRoleIds.length : 0,
  });
}

function syncOnboardingAdminDraft(force = false) {
  const cfg = normalizeInstanceBranding(instanceBranding).onboarding || {};
  const stamp = onboardingDraftStampFromConfig(cfg);
  if (!force && stamp === onboardingAdminDraftStamp) return;
  onboardingAdminDraft = {
    enabled: Boolean(cfg?.enabled),
    aboutContent: String(cfg?.about?.content || ""),
    requireAcceptance: Boolean(cfg?.rules?.requireAcceptance),
    blockReadUntilAccepted: Boolean(cfg?.rules?.blockReadUntilAccepted),
    roleSelectEnabled: Boolean(cfg?.roleSelect?.enabled),
    selfAssignableRoleIds: Array.isArray(cfg?.roleSelect?.selfAssignableRoleIds)
      ? cfg.roleSelect.selfAssignableRoleIds.map((x) => String(x || "").trim().toLowerCase()).filter(Boolean)
      : [],
    rules: onboardingRuleListFromConfig(cfg),
  };
  onboardingAdminDraftStamp = stamp;
  onboardingAdminExpandedRuleIds.clear();
  if (onboardingAdminDraft.rules[0]?.id) onboardingAdminExpandedRuleIds.add(onboardingAdminDraft.rules[0].id);
}

function normalizeOnboardingDraftRules() {
  onboardingAdminDraft.rules = (Array.isArray(onboardingAdminDraft.rules) ? onboardingAdminDraft.rules : [])
    .map((r, index) => ({
      id: String(r?.id || `r${index + 1}`).trim().slice(0, 40) || `r${index + 1}`,
      order: index + 1,
      name: String(r?.name || "").trim().slice(0, 60) || `Rule ${index + 1}`,
      shortDescription: String(r?.shortDescription || "").trim().slice(0, 180),
      description: String(r?.description || "").slice(0, 6000),
      severity: ["info", "warn", "critical"].includes(String(r?.severity || "").toLowerCase())
        ? String(r.severity).toLowerCase()
        : "info",
    }))
    .slice(0, 200);
}

function renderOnboardingPanel() {
  if (!(onboardingPanelEl instanceof HTMLElement) || !(onboardingPanelBodyEl instanceof HTMLElement)) return;
  const cfg = normalizeInstanceBranding(instanceBranding).onboarding || {};
  if (!cfg.enabled) {
    onboardingPanelEl.classList.add("hidden");
    onboardingPanelBodyEl.innerHTML = `<div class="small muted">Onboarding is disabled for this server.</div>`;
    if (onboardingPanelAcceptBtn instanceof HTMLButtonElement) onboardingPanelAcceptBtn.classList.add("hidden");
    return;
  }

  onboardingPanelEl.classList.remove("hidden");
  const needs = onboardingNeedsAcceptanceNow();
  const rules = onboardingRuleListFromConfig(cfg);
  const about = typeof cfg?.about?.content === "string" ? cfg.about.content.trim() : "";
  const roleIds = Array.isArray(cfg?.roleSelect?.selfAssignableRoleIds) ? cfg.roleSelect.selfAssignableRoleIds : [];
  const roleItems = roleIds
    .map((key) => customRoles.find((r) => String(r?.key || "") === String(key)))
    .filter(Boolean)
    .map((r) => `<span class="tag">${escapeHtml(String(r.label || r.key || ""))}</span>`)
    .join(" ");

  onboardingPanelBodyEl.innerHTML = `
    <div class="onbTabs">
      <button type="button" class="${onboardingViewerTab === "about" ? "primary" : "ghost"} smallBtn" data-onbtab="about">About</button>
      <button type="button" class="${onboardingViewerTab === "rules" ? "primary" : "ghost"} smallBtn" data-onbtab="rules">Rules</button>
      <button type="button" class="${onboardingViewerTab === "roles" ? "primary" : "ghost"} smallBtn" data-onbtab="roles">Roles</button>
    </div>
    ${
      onboardingViewerTab === "about"
        ? about
          ? `<div class="onboardingAbout">${about}</div>`
          : `<div class="small muted">No About content published yet.</div>`
        : onboardingViewerTab === "rules"
          ? rules.length
            ? `<div class="onbRuleList">${rules
                .map(
                  (r) => `<article class="onbRuleViewerCard">
                      <div class="row" style="justify-content:space-between;align-items:center;">
                        <b>${escapeHtml(r.name || "Rule")}</b>
                        ${onboardingSeverityBadge(r.severity)}
                      </div>
                      ${r.shortDescription ? `<div class="small muted">${escapeHtml(r.shortDescription)}</div>` : ""}
                      ${r.description ? `<div class="small">${r.description}</div>` : ""}
                    </article>`
                )
                .join("")}</div>`
            : `<div class="small muted">No rules configured.</div>`
          : cfg?.roleSelect?.enabled
            ? roleItems
              ? `<div class="row" style="flex-wrap:wrap;gap:8px;">${roleItems}</div>`
              : `<div class="small muted">No self-assignable roles configured.</div>`
            : `<div class="small muted">Role select is disabled.</div>`
    }
    <div class="small ${needs ? "badText" : "goodText"}" style="margin-top:10px;">
      ${
        onboardingRequiresAcceptance()
          ? needs
            ? "Rules acceptance required before posting/chat."
            : `Rules accepted${onboardingState.acceptedAt ? ` at ${escapeHtml(formatLocalTime(onboardingState.acceptedAt))}` : "."}`
          : "Rules acceptance is optional on this server."
      }
    </div>`;

  if (onboardingPanelAcceptBtn instanceof HTMLButtonElement) {
    onboardingPanelAcceptBtn.classList.toggle("hidden", !onboardingRequiresAcceptance());
    onboardingPanelAcceptBtn.disabled = !loggedInUser || !needs;
    onboardingPanelAcceptBtn.textContent = needs ? "Accept and continue" : "Accepted";
  }
}

function renderOnboardingCard() {
  if (!(onboardingCard instanceof HTMLElement) || !(onboardingBody instanceof HTMLElement)) return;
  // Onboarding now lives as a first-class workspace panel; keep the old account card hidden.
  onboardingCard.classList.add("hidden");
  onboardingBody.innerHTML = "";
  if (onboardingAcceptBtn instanceof HTMLButtonElement) {
    onboardingAcceptBtn.classList.add("hidden");
    onboardingAcceptBtn.disabled = true;
  }
  renderOnboardingPanel();
  return;

  const cfg = normalizeInstanceBranding(instanceBranding).onboarding || {};
  if (!cfg.enabled) {
    onboardingCard.classList.add("hidden");
    onboardingBody.innerHTML = "";
    return;
  }
  onboardingCard.classList.remove("hidden");
  const needs = onboardingNeedsAcceptanceNow();
  const rules = onboardingRuleListFromConfig(cfg).slice(0, 6);
  const about = typeof cfg?.about?.content === "string" ? cfg.about.content.trim() : "";
  const aboutBlock = about ? `<div class="onboardingAbout">${about}</div>` : `<div class="small muted">No About text set yet.</div>`;
  const rulesBlock = rules.length
    ? `<ol class="onboardingRules">${rules
        .map(
          (r) =>
            `<li><b>${escapeHtml(r.name || "Rule")}</b>${r.shortDescription ? `<div class="small muted">${escapeHtml(r.shortDescription)}</div>` : ""}</li>`
        )
        .join("")}</ol>`
    : `<div class="small muted">No rules published yet.</div>`;
  onboardingBody.innerHTML = `
    ${aboutBlock}
    <div class="small" style="margin-top:10px;"><b>Rules</b></div>
    ${rulesBlock}
    ${
      onboardingRequiresAcceptance()
        ? `<div class="small ${needs ? "badText" : "goodText"}" style="margin-top:10px;">
             ${needs ? "Rules acceptance required before posting/chat." : `Rules accepted${onboardingState.acceptedAt ? ` at ${escapeHtml(formatLocalTime(onboardingState.acceptedAt))}` : "."}`}
           </div>`
        : `<div class="small muted" style="margin-top:10px;">Rules acceptance is optional on this server.</div>`
    }
  `;
  if (onboardingAcceptBtn instanceof HTMLButtonElement) {
    onboardingAcceptBtn.classList.toggle("hidden", !onboardingRequiresAcceptance());
    onboardingAcceptBtn.disabled = !loggedInUser || !needs;
    onboardingAcceptBtn.textContent = needs ? "Accept and continue" : "Accepted";
  }
  renderOnboardingPanel();
}

function setAuthUi() {
  if (loggedInUser) {
    userLabel.innerHTML = renderUserPill(loggedInUser);
    logoutBtn.classList.remove("hidden");
    const roleText = loggedInRole && loggedInRole !== "member" ? ` (${loggedInRole})` : "";
    authHint.textContent = onboardingNeedsAcceptanceNow()
      ? `Signed in${roleText}. Accept server rules to unlock posting/chat.`
      : `Signed in${roleText}. You can post, chat, and boost others.`;
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
  renderOnboardingCard();
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
      peopleDmsViewEl.innerHTML = `<div class="muted">Sign in to use DMs.</div><div class="uiHint">After signing in, open a DM request and accept it to start chatting.</div>`;
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
              <option value="">New DM...</option>
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
                    : `<span class="muted small">Waiting...</span>`;

            if (isBlocked) {
              actions =
                status === "active"
                  ? `<button type="button" class="primary smallBtn" data-dmopen="${escapeHtml(t.id)}" disabled>Open</button>`
                  : `<span class="muted small">Blocked</span>`;
            }
            if (canModerate && other) {
              actions += ` <button type="button" class="ghost smallBtn" data-moddm="${escapeHtml(other)}">Mod DM</button>`;
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
    peopleListEl.innerHTML = `<div class="muted">No members found.</div><div class="uiHint">Try clearing the search filter or check back when more members are online.</div>`;
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
      const canModDm = Boolean(canModerate && username && String(username).toLowerCase() !== String(loggedInUser || "").toLowerCase());
      return `<div class="peopleCard" data-viewprofile="${escapeHtml(username)}" ${cardStyle}>
        <div class="peopleCardTop">
          <div>${renderUserPill(username)} <span class="modStatus">${escapeHtml(role)}</span></div>
          <div class="peopleStatus">${escapeHtml(statusText)}</div>
        </div>
        <div class="peopleCardActions">
          <button type="button" class="ghost smallBtn" data-viewprofile="${escapeHtml(username)}">Profile</button>
          <button type="button" class="ghost smallBtn" data-dmrequest="${escapeHtml(username)}" ${canDm ? "" : "disabled"}>DM</button>
          ${canModDm ? `<button type="button" class="ghost smallBtn" data-moddm="${escapeHtml(username)}">Mod DM</button>` : ""}
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
  if (!canModerate) {
    modBodyEl.innerHTML = "";
    if (isMobileScreenMode() && appRoot?.getAttribute("data-mobile-screen") === "moderation") setMobileScreen("hives", { pushHistory: false });
    return;
  }
  if (modReportStatusEl) modReportStatusEl.classList.toggle("hidden", modTab !== "reports");

  const tabs = Array.from(modPanelEl.querySelectorAll("[data-modtab]"));
  for (const btn of tabs) {
    const on = btn.getAttribute("data-modtab") === modTab;
    btn.classList.toggle("primary", on);
    btn.classList.toggle("ghost", !on);
    // Owner-only plugin tabs should not show for non-owners.
    const ownerOnly = btn.dataset.ownerOnly === "1";
    btn.classList.toggle("hidden", Boolean(ownerOnly && loggedInRole !== "owner"));
  }

  // Plugin-provided moderation tabs (render into modBody).
  if (modPluginTabs.has(modTab)) {
    const def = modPluginTabs.get(modTab);
    if (def?.ownerOnly && loggedInRole !== "owner") {
      modTab = "server";
      renderModPanel();
      return;
    }
    modBodyEl.innerHTML = `
      <div class="modCard">
        <div class="modRowTop"><div><b>${escapeHtml(def?.title || "Plugin")}</b></div></div>
        <div id="modPluginMount" class="modActions"></div>
      </div>
    `;
    const mount = modBodyEl.querySelector("#modPluginMount");
    if (mount) {
      const api = {
        toast,
        send: (eventName, payload) => {
          const ev = String(eventName || "").trim();
          if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,63}$/.test(ev)) return false;
          const wsRef = window.__bzlWs;
          if (!wsRef || wsRef.readyState !== WebSocket.OPEN) return false;
          const msg = payload && typeof payload === "object" ? payload : {};
          wsRef.send(JSON.stringify({ ...msg, type: `plugin:${def.pluginId}:${ev}` }));
          return true;
        },
        getUser: () => loggedInUser,
        getRole: () => loggedInRole,
      };
      try {
        def.render(mount, api);
      } catch (e) {
        mount.textContent = "Failed to render plugin tab.";
        console.warn(`Plugin tab render failed (${modTab}):`, e?.message || e);
      }
    }
    return;
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
      ? `<span class="muted">Loading...</span>`
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
               <option value="">(choose...)</option>
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

  if (modTab === "onboarding") {
    const isOwner = loggedInRole === "owner";
    const canEdit = loggedInRole === "owner" || loggedInRole === "moderator";
    syncOnboardingAdminDraft(false);
    normalizeOnboardingDraftRules();
    const roleOptions = customRoles
      .map(
        (r) =>
          `<label class="checkRow">
            <span>${escapeHtml(String(r.label || r.key || ""))}</span>
            <input type="checkbox" data-onboarding-rolecheck="${escapeHtml(String(r.key || ""))}" ${
              onboardingAdminDraft.selfAssignableRoleIds.includes(String(r.key || "")) ? "checked" : ""
            } />
          </label>`
      )
      .join("");
    const rulesCards = onboardingAdminDraft.rules.length
      ? onboardingAdminDraft.rules
          .map((r, idx) => {
            const expanded = onboardingAdminExpandedRuleIds.has(r.id);
            return `<article class="onbRuleEditorCard" data-onb-ruleid="${escapeHtml(r.id)}">
                <div class="row" style="justify-content:space-between;align-items:center;">
                  <button type="button" class="ghost smallBtn" data-onb-ruletoggle="${escapeHtml(r.id)}">${expanded ? "▾" : "▸"} Rule ${idx + 1}</button>
                  <div class="row" style="gap:6px;">
                    <button type="button" class="ghost smallBtn" data-onb-ruleup="${escapeHtml(r.id)}" ${idx <= 0 ? "disabled" : ""}>↑</button>
                    <button type="button" class="ghost smallBtn" data-onb-ruledown="${escapeHtml(r.id)}" ${
                      idx >= onboardingAdminDraft.rules.length - 1 ? "disabled" : ""
                    }>↓</button>
                    <button type="button" class="ghost smallBtn" data-onb-ruledelete="${escapeHtml(r.id)}">Delete</button>
                  </div>
                </div>
                ${
                  expanded
                    ? `<div class="onbRuleEditorBody">
                         <label><span>Name</span><input data-onb-rulefield="name" data-onb-ruleid="${escapeHtml(r.id)}" value="${escapeHtml(
                           r.name
                         )}" maxlength="60" /></label>
                         <label><span>Short description</span><input data-onb-rulefield="shortDescription" data-onb-ruleid="${escapeHtml(
                           r.id
                         )}" value="${escapeHtml(r.shortDescription)}" maxlength="180" /></label>
                         <label><span>Full description</span><textarea data-onb-rulefield="description" data-onb-ruleid="${escapeHtml(
                           r.id
                         )}" rows="4">${escapeHtml(r.description)}</textarea></label>
                         <label><span>Severity</span>
                           <select data-onb-rulefield="severity" data-onb-ruleid="${escapeHtml(r.id)}">
                             <option value="info" ${r.severity === "info" ? "selected" : ""}>Info</option>
                             <option value="warn" ${r.severity === "warn" ? "selected" : ""}>Warn</option>
                             <option value="critical" ${r.severity === "critical" ? "selected" : ""}>Critical</option>
                           </select>
                         </label>
                       </div>`
                    : ""
                }
              </article>`;
          })
          .join("")
      : `<div class="small muted">No rules yet. Add your first rule.</div>`;

    modBodyEl.innerHTML = `
      <div class="modCard">
        <div class="modRowTop"><div><b>Onboarding</b></div></div>
        <div class="small muted">Configure About, Rules, and Role Select.</div>
        <div class="onbTabs" style="margin-top:8px;">
          <button type="button" class="${onboardingAdminTab === "about" ? "primary" : "ghost"} smallBtn" data-onb-admin-tab="about">About</button>
          <button type="button" class="${onboardingAdminTab === "rules" ? "primary" : "ghost"} smallBtn" data-onb-admin-tab="rules">Rules</button>
          <button type="button" class="${onboardingAdminTab === "roles" ? "primary" : "ghost"} smallBtn" data-onb-admin-tab="roles">Roles</button>
        </div>
      </div>
      <div class="modCard">
        ${
          onboardingAdminTab === "about"
            ? `<label class="checkRow">
                 <span>Enable onboarding panel</span>
                 <input type="checkbox" data-onboarding-enabled ${onboardingAdminDraft.enabled ? "checked" : ""} ${canEdit ? "" : "disabled"} />
               </label>
               <label>
                 <span>About (rich text allowed)</span>
                 <textarea data-onboarding-about rows="10" ${canEdit ? "" : "disabled"}>${escapeHtml(onboardingAdminDraft.aboutContent)}</textarea>
               </label>
               <div class="small muted">Updated by: ${escapeHtml(String(normalizeInstanceBranding(instanceBranding).onboarding?.about?.updatedBy || "n/a"))}</div>
               <div class="small muted">Updated at: ${escapeHtml(
                 formatLocalTime(normalizeInstanceBranding(instanceBranding).onboarding?.about?.updatedAt || 0) || "n/a"
               )}</div>`
            : onboardingAdminTab === "rules"
              ? `<label class="checkRow">
                   <span>Require rules acceptance before posting/chat</span>
                   <input type="checkbox" data-onboarding-require ${onboardingAdminDraft.requireAcceptance ? "checked" : ""} ${
                  canEdit ? "" : "disabled"
                } />
                 </label>
                 <label class="checkRow">
                   <span>Block reading hives until accepted ${isOwner ? "" : "(owner only)"}</span>
                   <input type="checkbox" data-onboarding-blockread ${onboardingAdminDraft.blockReadUntilAccepted ? "checked" : ""} ${
                  canEdit && isOwner ? "" : "disabled"
                } />
                 </label>
                 <div class="row" style="justify-content:space-between;align-items:center;margin:8px 0;">
                   <div><b>Rules</b></div>
                   <button type="button" class="primary smallBtn" data-onb-ruleadd="1" ${canEdit ? "" : "disabled"}>+ Add Rule</button>
                 </div>
                 <div class="onbRuleEditorList">${rulesCards}</div>`
              : `<label class="checkRow">
                   <span>Enable custom role select in onboarding</span>
                   <input type="checkbox" data-onboarding-roleenabled ${onboardingAdminDraft.roleSelectEnabled ? "checked" : ""} ${
                  canEdit ? "" : "disabled"
                } />
                 </label>
                 <div class="small muted">Choose self-assignable roles:</div>
                 <div class="onbRoleGrid">${roleOptions || `<div class="small muted">No custom roles defined.</div>`}</div>`
        }
      </div>
      <div class="modCard">
        <div class="row" style="gap:8px;">
          <button type="button" class="primary" data-onboarding-save="1" ${canEdit ? "" : "disabled"}>Save</button>
          <button type="button" class="ghost" data-onboarding-publish="1" ${canEdit ? "" : "disabled"}>Publish</button>
          <button type="button" class="ghost" data-onboarding-refresh="1">Reload</button>
        </div>
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
                      ? `<button type="button" data-collectiongate="${escapeHtml(c.id)}">Gate...</button>
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
            )}" data-ttlprompt="1">Set TTL...</button>
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
                   )}" data-protect="1">Change password...</button>`
                : `<button type="button" data-modaction="post_protection_set" data-targettype="post" data-targetid="${escapeHtml(
                    p.id
                  )}" data-protect="1">Protect...</button>`
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

function isMapChatActive() {
  return Boolean(!activeDmThreadId && !activeChatPostId && activeMapsRoomId);
}

function normalizeMapChatScope(scope) {
  const s = String(scope || "").trim().toLowerCase();
  return s === "global" ? "global" : "local";
}

function mapChatListFor(mapId, scope) {
  const mid = String(mapId || "").trim().toLowerCase();
  if (!mid) return [];
  const sc = normalizeMapChatScope(scope);
  const store = sc === "global" ? mapsChatGlobalByMapId : mapsChatLocalByMapId;
  const arr = store.get(mid);
  return Array.isArray(arr) ? arr : [];
}

function pushMapChatMessage(mapId, scope, message) {
  const mid = String(mapId || "").trim().toLowerCase();
  if (!mid) return;
  const sc = normalizeMapChatScope(scope);
  const store = sc === "global" ? mapsChatGlobalByMapId : mapsChatLocalByMapId;
  const prev = store.get(mid);
  const arr = Array.isArray(prev) ? prev.slice() : [];
  arr.push(message);
  if (arr.length > 240) arr.splice(0, arr.length - 240);
  store.set(mid, arr);
}

function renderChatPanel(forceScroll = false) {
  updateChatModToggleVisibility();
  renderChatContextSelect();
  const mobileChatScreen = isMobileChatScreenActive();
  const mediaState = captureMediaState(chatMessagesEl);
  const activePost = activeChatPostId ? posts.get(activeChatPostId) : null;
  if (
    streamCurrentPostId &&
    (activeDmThreadId || !activePost || !isStreamPost(activePost) || String(activePost.id || "") !== String(streamCurrentPostId))
  ) {
    leaveActiveStream(true);
  }
  if (activeDmThreadId) {
    renderStreamStage(null);
    const thread = dmThreadsById.get(activeDmThreadId) || null;
    if (!thread) {
      activeDmThreadId = null;
    } else {
      const atBottomBefore =
        chatMessagesEl.scrollHeight - chatMessagesEl.scrollTop - chatMessagesEl.clientHeight < 24;
      chatTitle.textContent = `@${thread.other}`;
      if (chatBackToListBtn) chatBackToListBtn.classList.toggle("hidden", !mobileChatScreen);
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
              : `<div class="muted">Waiting for @${escapeHtml(thread.other)}...</div>`;
        chatMessagesEl.innerHTML = `<div class="small muted">${promptHtml}</div>`;
        restoreMediaState(chatMessagesEl, mediaState);
        setReplyToMessage(null);
        return;
      }

      chatMessagesEl.innerHTML = messages
        .map((m, index) => {
          const from = m.fromUser || "";
          const isYou = loggedInUser && from && from === loggedInUser;
          const isModMsg = Boolean(m?.asMod) || String(from || "").toLowerCase() === "mod";
          const rail = chatRailClass({
            fromUser: from,
            isModMessage: isModMsg
          });
          const prev = index > 0 ? messages[index - 1] : null;
          const sameAuthorAsPrev = Boolean(prev && String(prev.fromUser || "") === from);
          const who = isModMsg ? `<span class="modPill">MOD</span>` : renderUserPill(from || "");
          const youTag = isModMsg ? "" : isYou ? `<span class="muted">(you)</span>` : "";
          const time = new Date(m.createdAt).toLocaleTimeString();
          const tint = tintStylesFromHex(getProfile(from).color);
          const html = typeof m.html === "string" && m.html.trim() ? m.html : "";
          const content = html ? html : highlightMentionsInText(m.text || "");
          return `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""} ${rail}" data-msgid="${escapeHtml(m.id)}" ${tint}>
            <div class="meta"><span class="chatHeaderInline">${who}${youTag}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
            <div class="content">${content}</div>
          </div>`;
        })
        .join("");
      for (const contentEl of chatMessagesEl.querySelectorAll(".chatMsg .content")) {
        decorateMentionNodesInElement(contentEl);
        decorateYouTubeEmbedsInElement(contentEl);
      }
      restoreMediaState(chatMessagesEl, mediaState);
      if (forceScroll || atBottomBefore) chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
      return;
    }
  }

  const post = activePost;
  if (!post) {
    renderStreamStage(null);
    if (isMapChatActive()) {
      const mapId = String(activeMapsRoomId || "").trim().toLowerCase();
      const scope = normalizeMapChatScope(activeMapsChatScope);
      const atBottomBefore =
        chatMessagesEl.scrollHeight - chatMessagesEl.scrollTop - chatMessagesEl.clientHeight < 24;

      const title = activeMapsRoomTitle ? `Map: ${activeMapsRoomTitle}` : `Map: ${mapId}`;
      chatTitle.textContent = activeMapsRoomTitle ? `Map: ${activeMapsRoomTitle}` : "Map chat";
      if (chatBackToListBtn) chatBackToListBtn.classList.toggle("hidden", !mobileChatScreen);
      chatMeta.innerHTML = `
        <span class="muted">${escapeHtml(title)}</span>
        <span class="muted">|</span>
        <span class="mapChatToggle">
          <button type="button" class="${scope === "local" ? "primary" : "ghost"} smallBtn" data-mapchatscope="local" title="Local chat (nearby)">Local</button>
          <button type="button" class="${scope === "global" ? "primary" : "ghost"} smallBtn" data-mapchatscope="global" title="Global chat (entire map)">Global</button>
        </span>
      `;

      if (chatPanelEl) chatPanelEl.classList.remove("walkie");
      if (walkieBarEl) walkieBarEl.classList.add("hidden");
      if (chatForm) chatForm.classList.remove("hidden");

      const messages = mapChatListFor(mapId, scope);
      if (!messages.length) {
        chatMessagesEl.innerHTML = `<div class="small muted">${
          scope === "local" ? "Local chat is proximity-based. Say something nearby." : "No messages yet. Say hello!"
        }</div>`;
        restoreMediaState(chatMessagesEl, mediaState);
        setReplyToMessage(null);
        return;
      }

      chatMessagesEl.innerHTML = messages
        .map((m, index) => {
          const from = String(m.fromUser || "");
          const isYou = loggedInUser && from && from === loggedInUser;
          const rail = chatRailClass({
            fromUser: from,
            isModMessage: Boolean(m?.asMod) || String(m?.fromUser || "").trim().toLowerCase() === "mod"
          });
          const prev = index > 0 ? messages[index - 1] : null;
          const sameAuthorAsPrev = Boolean(prev && String(prev.fromUser || "") === from);
          const who = renderUserPill(from || "");
          const youTag = isYou ? `<span class="muted">(you)</span>` : "";
          const time = new Date(Number(m.createdAt || 0) || Date.now()).toLocaleTimeString();
          const tint = tintStylesFromHex(getProfile(from).color);
          const content = highlightMentionsInText(String(m.text || ""));
          return `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""} ${rail}" data-msgid="${escapeHtml(String(m.id || ""))}" ${tint}>
            <div class="meta"><span class="chatHeaderInline">${who}${youTag}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
            <div class="content">${content}</div>
          </div>`;
        })
        .join("");
      for (const contentEl of chatMessagesEl.querySelectorAll(".chatMsg .content")) {
        decorateMentionNodesInElement(contentEl);
        decorateYouTubeEmbedsInElement(contentEl);
      }
      restoreMediaState(chatMessagesEl, mediaState);
      if (forceScroll || atBottomBefore) chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
      setReplyToMessage(null);
      return;
    }

    if (chatBackToListBtn) chatBackToListBtn.classList.add("hidden");
    if (mobileChatScreen) {
      chatTitle.textContent = "Chats";
      chatMeta.textContent = "Select a hive chat.";
      if (chatPanelEl) chatPanelEl.classList.remove("walkie");
      if (walkieBarEl) walkieBarEl.classList.add("hidden");
      if (chatForm) chatForm.classList.add("hidden");
      chatMessagesEl.innerHTML = renderMobileChatListHtml();
      restoreMediaState(chatMessagesEl, mediaState);
      setReplyToMessage(null);
      return;
    }
    chatTitle.textContent = "Chat";
    chatMeta.textContent = "Select a post to chat.";
    if (chatPanelEl) chatPanelEl.classList.remove("walkie");
    if (walkieBarEl) walkieBarEl.classList.add("hidden");
    if (chatForm) chatForm.classList.remove("hidden");
    chatMessagesEl.innerHTML = `<div class="small muted">No chat selected.</div>
      <div class="uiHint">Open a hive and press <b>Chat</b>, or use People -> DMs to open a private thread.</div>
      <div class="row" style="gap:8px;justify-content:flex-start;margin-top:8px;">
        <button type="button" class="ghost smallBtn" data-chatemptyopen="hives">Open Hives</button>
        <button type="button" class="ghost smallBtn" data-chatemptyopen="people">Open People</button>
      </div>`;
    restoreMediaState(chatMessagesEl, mediaState);
    setReplyToMessage(null);
    return;
  }

  updateChatModToggleVisibility();
  renderStreamStage(post);
  const mode = normalizePostMode(post.mode || post.chatMode || "");
  const isWalkie = mode === "walkie";
  const isStream = mode === "stream";
  if (chatPanelEl) chatPanelEl.classList.toggle("walkie", isWalkie);
  if (walkieBarEl) walkieBarEl.classList.toggle("hidden", !isWalkie);
  if (chatForm) chatForm.classList.toggle("hidden", isWalkie);
  if (walkieRecordBtn) walkieRecordBtn.disabled = !(isWalkie && loggedInUser);
  if (isWalkie && walkieStatusEl && !loggedInUser) walkieStatusEl.textContent = "Sign in to talk.";
  if (!isWalkie && walkieStatusEl) walkieStatusEl.textContent = "";

  const atBottomBefore =
    chatMessagesEl.scrollHeight - chatMessagesEl.scrollTop - chatMessagesEl.clientHeight < 24;
  chatTitle.textContent = postTitle(post);
  if (chatBackToListBtn) chatBackToListBtn.classList.toggle("hidden", !mobileChatScreen);
  const tags = (post.keywords || []).map((k) => `#${k}`).join(" ");
  const author = post.author ? `by @${post.author}` : "";
  const exp = formatCountdown(post.expiresAt);
  const ro = post.readOnly ? " | read-only" : "";
  const streamMeta = isStream ? ` | stream (${streamKindLabel(post.streamKind || "webcam")})` : "";
  chatMeta.textContent = `${author}${isWalkie ? " | walkie talkie" : ""}${streamMeta}${ro} | ${
    exp === "permanent" ? "permanent" : `expires in ${exp}`
  } | ${tags}`.trim();
  const canChatWrite = Boolean(loggedInRole === "owner" || loggedInRole === "moderator" || !post.readOnly);
  if (chatEditor) chatEditor.contentEditable = String(Boolean(canChatWrite && !isWalkie));
  const chatSendBtn = chatForm?.querySelector?.("button[type='submit']") || null;
  if (chatSendBtn) chatSendBtn.disabled = !(loggedInUser && canChatWrite && !isWalkie);
  if (post.deleted) {
    chatMessagesEl.innerHTML = `<div class="small muted">Post was deleted.</div>`;
    restoreMediaState(chatMessagesEl, mediaState);
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
      const isModMsg = Boolean(m?.asMod) || String(m?.fromUser || "").trim().toLowerCase() === "mod";
      const from = isModMsg ? "MOD" : m.fromUser || "";
      const rail = chatRailClass({ fromUser: from, isModMessage: isModMsg });
      const prev = index > 0 ? visibleMessages[index - 1] : null;
      const sameAuthorAsPrev = Boolean(prev && String(prev.fromUser || "") === from);
      const mentions = Array.isArray(m.mentions) ? m.mentions.map((u) => String(u || "").toLowerCase()) : [];
      const mentionMe = Boolean(loggedInUser && mentions.includes(loggedInUser));
      const who = isModMsg ? `<span class="modPill">MOD</span>` : renderUserPill(from || "");
      const youTag = !isModMsg && loggedInUser && from && from === loggedInUser ? `<span class="muted">(you)</span>` : "";
      const time = new Date(m.createdAt).toLocaleTimeString();
      const tint = isModMsg ? "" : tintStylesFromHex(getProfile(from).color);
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
      return `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""} ${mentionMe ? "mentionMe" : ""} ${rail} ${isModMsg ? "isModMsg" : ""}" data-msgid="${escapeHtml(m.id)}" ${tint}>
        <div class="meta"><span class="chatHeaderInline">${who}${youTag}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
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
  restoreMediaState(chatMessagesEl, mediaState);
  if (forceScroll || atBottomBefore) chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function captureMediaState(containerEl) {
  if (!containerEl) return [];
  const list = [];
  for (const el of containerEl.querySelectorAll("audio, video")) {
    try {
      const src = el.currentSrc || el.getAttribute("src") || "";
      if (!src) continue;
      list.push({
        src,
        currentTime: Number(el.currentTime || 0),
        paused: Boolean(el.paused),
        volume: Number.isFinite(el.volume) ? el.volume : 1,
        playbackRate: Number.isFinite(el.playbackRate) ? el.playbackRate : 1
      });
    } catch {
      // ignore
    }
  }
  return list;
}

function restoreMediaState(containerEl, mediaState) {
  if (!containerEl || !Array.isArray(mediaState) || mediaState.length === 0) return;
  const els = Array.from(containerEl.querySelectorAll("audio, video"));
  for (const s of mediaState) {
    const src = String(s?.src || "");
    if (!src) continue;
    const el = els.find((x) => (x.currentSrc || x.getAttribute("src") || "") === src);
    if (!el) continue;
    try {
      if (Number.isFinite(s.volume)) el.volume = s.volume;
      if (Number.isFinite(s.playbackRate)) el.playbackRate = s.playbackRate;
      if (Number.isFinite(s.currentTime)) el.currentTime = s.currentTime;
      if (!s.paused) el.play().catch(() => {});
    } catch {
      // ignore
    }
  }
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
  const isModMsg = Boolean(m?.asMod) || String(m?.fromUser || "").trim().toLowerCase() === "mod";
  const from = isModMsg ? "MOD" : m?.fromUser || "";
  const isYou = loggedInUser && from && from === loggedInUser;
  const rail = chatRailClass({ fromUser: from, isModMessage: isModMsg });
  const sameAuthorAsPrev = Boolean(prevVisible && String(prevVisible.fromUser || "") === from);
  const mentions = Array.isArray(m?.mentions) ? m.mentions.map((u) => String(u || "").toLowerCase()) : [];
  const mentionMe = Boolean(loggedInUser && mentions.includes(loggedInUser));
  const who = isModMsg ? `<span class="modPill">MOD</span>` : renderUserPill(from || "");
  const youTag = !isModMsg && isYou ? `<span class="muted">(you)</span>` : "";
  const time = new Date(m.createdAt).toLocaleTimeString();
  const tint = isModMsg ? "" : tintStylesFromHex(getProfile(from).color);
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

  const msgHtml = `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""} ${mentionMe ? "mentionMe" : ""} ${rail} ${isModMsg ? "isModMsg" : ""}" data-msgid="${escapeHtml(
    m.id
  )}" ${tint}>
        <div class="meta"><span class="chatHeaderInline">${who}${youTag}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
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
  const rail = chatRailClass({ fromUser: from, isModMessage: false });
  const sameAuthorAsPrev = Boolean(prev && String(prev.fromUser || "") === from);
  const who = renderUserPill(from || "");
  const youTag = isYou ? `<span class="muted">(you)</span>` : "";
  const time = new Date(m.createdAt).toLocaleTimeString();
  const tint = tintStylesFromHex(getProfile(from).color);
  const html = typeof m.html === "string" && m.html.trim() ? m.html : "";
  const content = html ? html : highlightMentionsInText(m.text || "");

  const msgHtml = `<div class="chatMsg ${sameAuthorAsPrev ? "isStacked" : ""} ${rail}" data-msgid="${escapeHtml(m.id)}" ${tint}>
             <div class="meta"><span class="chatHeaderInline">${who}${youTag}<span class="muted">|</span><span>${escapeHtml(time)}</span></span></div>
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
  const mode = normalizePostMode(post.mode || post.chatMode || "");
  const modeMeta =
    mode === "walkie" ? " | walkie talkie" : mode === "stream" ? ` | stream (${streamKindLabel(post.streamKind || "webcam")})` : "";
  chatMeta.textContent = `${author}${modeMeta} | ${exp === "permanent" ? "permanent" : `expires in ${exp}`} | ${tags}`.trim();
}

function openDmThread(threadId, opts = null) {
  const id = String(threadId || "").trim();
  if (!id) return;
  const options = opts && typeof opts === "object" ? opts : {};
  if (!options.preserveFocus) blurFocusedChatComposer();
  const thread = dmThreadsById.get(id) || null;
  if (!thread) {
    pendingOpenDmThreadId = id;
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "dmList" }));
    toast("DMs", "Thread not found yet. Refreshing DM list.");
    return;
  }
  if (String(thread.status || "") !== "active") {
    pendingOpenDmThreadId = id;
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "dmList" }));
    toast("DMs", "DM is not active yet.");
    return;
  }
  pendingOpenDmThreadId = "";
  if (activeChatPostId) ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
  activeChatPostId = null;
  activeDmThreadId = id;
  touchRecentDmChat(id);
  setReplyToMessage(null);
  ws.send(JSON.stringify({ type: "dmHistory", threadId: id }));
  renderChatPanel(true);
  if (isMobileSwipeMode()) {
    setMobileScreen("chat");
    renderMobileNav();
  }
}

function sendModDmPrompt(rawUsername) {
  const to = String(rawUsername || "")
    .trim()
    .replace(/^@+/, "")
    .toLowerCase();
  if (!to) return;
  if (!loggedInUser) {
    toast("Sign in required", "Sign in to send moderator DMs.");
    return;
  }
  if (!canModerate) {
    toast("Moderator only", "You need moderator permissions.");
    return;
  }
  if (to === String(loggedInUser).toLowerCase()) {
    toast("Unavailable", "Can't send a moderator DM to yourself.");
    return;
  }
  const text = String(prompt(`Send moderator DM to @${to}:`) || "").trim();
  if (!text) return;
  ws.send(JSON.stringify({ type: "dmSendMod", to, text }));
  toast("Moderator DM", `Sent to @${to}.`);
}

function openChat(postId, opts = null) {
  activeDmThreadId = null;
  stopWalkieRecording();
  const options = opts && typeof opts === "object" ? opts : {};
  if (!options.preserveFocus) blurFocusedChatComposer();
  const sourceEl = options.sourceEl instanceof HTMLElement ? options.sourceEl : null;
  const post = posts.get(postId);
  if (!post) return;
  if (post.deleted) {
    activeChatPostId = postId;
    touchRecentHiveChat(postId);
    renderChatPanel(true);
    if (isMobileSwipeMode()) setMobilePanel("chat");
    return;
  }
  if (post.locked) {
    unlockPostFlow(postId, true);
    return;
  }

  // Rack mode: switch the nearest visible chat panel when possible; otherwise use main chat.
  if (rackLayoutEnabled && !isStreamPost(post)) {
    const nearestInstanceId = nearestVisibleChatInstancePanelId(sourceEl);
    if (nearestInstanceId) {
      touchRecentHiveChat(postId);
      markRead(postId);
      renderFeed();
      ws.send(JSON.stringify({ type: "getChat", postId }));
      setChatInstancePanelPost(nearestInstanceId, postId, true);
      renderChatContextSelect();
      return;
    }
    if (chatPanelEl && typeof isDocked === "function" && !isDocked("chat")) {
      activeChatPostId = postId;
      touchRecentHiveChat(postId);
      markRead(postId);
      renderFeed();
      ws.send(JSON.stringify({ type: "getChat", postId }));
      renderChatPanel(true);
      renderTypingIndicator();
      if (isMobileSwipeMode()) setMobilePanel("chat");
      return;
    }
  }
  if (activeChatPostId && activeChatPostId !== postId) {
    ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
    setReplyToMessage(null);
  }
  activeChatPostId = postId;
  touchRecentHiveChat(postId);
  markRead(postId);
  renderFeed();
  ws.send(JSON.stringify({ type: "getChat", postId }));
  renderChatPanel(true);
  renderTypingIndicator();
  if (isMobileSwipeMode()) setMobilePanel("chat");
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

function isTextEntryFocused() {
  const el = document.activeElement;
  if (!el) return false;
  const tag = String(el.tagName || "").toLowerCase();
  if (tag === "textarea") return true;
  if (tag === "input") {
    const type = String(el.getAttribute?.("type") || "text").toLowerCase();
    return !["button", "checkbox", "color", "file", "hidden", "radio", "range", "reset", "submit"].includes(type);
  }
  return Boolean(el.isContentEditable);
}

function shouldSubmitChatOnEnter(evt) {
  if (!evt || evt.key !== "Enter") return false;
  const mode = readChatEnterModePref();
  if (mode === "enter") return !(evt.shiftKey || evt.altKey || evt.ctrlKey || evt.metaKey);
  return Boolean(evt.ctrlKey || evt.metaKey);
}

function cycleLayoutPresetBy(step) {
  if (!layoutPresetEl || !rackLayoutEnabled || layoutPresetEl.disabled) return;
  const options = Array.from(layoutPresetEl.options || [])
    .map((opt) => String(opt.value || "").trim())
    .filter((v) => v);
  if (!options.length) return;
  const current = resolvePresetKey(String(layoutPresetEl.value || rackLayoutState?.presetId || "onboardingDefault"));
  let idx = options.indexOf(current);
  if (idx < 0) idx = 0;
  const len = options.length;
  const next = options[(idx + step + len) % len];
  if (!next) return;
  layoutPresetEl.value = next;
  applyPreset(next);
}

let hotkeyPanelContext = "";
function updateHotkeyPanelContextFromTarget(target) {
  const el = target instanceof HTMLElement ? target : null;
  if (!el) return;
  if (el.closest("#hivesPanel")) {
    hotkeyPanelContext = "hives";
    return;
  }
  if (el.closest("aside.chat") || el.closest(".chatInstance") || el.closest("[data-panel-id^='chat:post:']")) {
    hotkeyPanelContext = "chat";
  }
}

function activePanelContextForHotkeys() {
  if (isMobileScreenMode() && appRoot) {
    const mobile = String(appRoot.getAttribute("data-mobile-screen") || "").trim();
    if (mobile === "hives") return "hives";
    if (mobile === "chat" || (mobile === "host" && mobileHostPanelId === "chat")) return "chat";
  }
  const ae = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  if (ae) {
    if (ae.closest("#hivesPanel")) return "hives";
    if (ae.closest("aside.chat") || ae.closest(".chatInstance") || ae.closest("[data-panel-id^='chat:post:']")) return "chat";
  }
  return hotkeyPanelContext || "";
}

function cycleHiveViewBy(step) {
  if (!hiveTabsEl) return false;
  const views = Array.from(hiveTabsEl.querySelectorAll("button[data-hiveview]:not([disabled])"))
    .map((b) => String(b.getAttribute("data-hiveview") || "").trim())
    .filter(Boolean);
  if (!views.length) return false;
  let idx = views.indexOf(String(activeHiveView || "all"));
  if (idx < 0) idx = 0;
  const len = views.length;
  const next = views[(idx + step + len) % len];
  if (!next || next === activeHiveView) return false;
  activeHiveView = next;
  renderFeed();
  return true;
}

function cycleChatContextBy(step) {
  renderChatContextSelect();
  if (!(chatContextSelectEl instanceof HTMLSelectElement)) return false;
  const items = [
    "__list__",
    ...Array.from(chatContextSelectEl.options || [])
      .map((o) => String(o.value || "").trim())
      .filter((v) => v && (v.startsWith("dm:") || v.startsWith("post:"))),
  ];
  if (items.length <= 1) return false;
  const current = activeDmThreadId ? `dm:${activeDmThreadId}` : activeChatPostId ? `post:${activeChatPostId}` : "__list__";
  let idx = items.indexOf(current);
  if (idx < 0) idx = 0;
  const len = items.length;
  const next = items[(idx + step + len) % len];
  if (!next || next === current) return false;
  if (next === "__list__") {
    if (activeChatPostId && ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
    activeChatPostId = null;
    activeDmThreadId = null;
    activeMapsRoomId = "";
    activeMapsRoomTitle = "";
    setReplyToMessage(null);
    renderChatPanel(true);
    return true;
  }
  if (next.startsWith("dm:")) {
    return openChatContextValue(next, { preserveFocus: false });
  }
  if (next.startsWith("post:")) {
    return openChatContextValue(next, { preserveFocus: false });
  }
  return false;
}

function streamIceConfig() {
  if (!Array.isArray(streamIceServers) || !streamIceServers.length) return [];
  return streamIceServers.map((row) => {
    const urls = Array.isArray(row?.urls)
      ? row.urls.map((x) => String(x || "").trim()).filter(Boolean)
      : typeof row?.urls === "string" && row.urls.trim()
        ? [row.urls.trim()]
        : [];
    const out = { urls };
    if (typeof row?.username === "string" && row.username.trim()) out.username = row.username.trim();
    if (typeof row?.credential === "string" && row.credential.trim()) out.credential = row.credential.trim();
    return out;
  });
}

function stopStreamTracks(stream) {
  const tracks = stream && typeof stream.getTracks === "function" ? stream.getTracks() : [];
  for (const track of tracks) {
    try {
      track.onended = null;
      track.stop();
    } catch {
      // ignore
    }
  }
}

function closeStreamPeer(clientId) {
  const id = String(clientId || "").trim();
  if (!id) return;
  const pc = streamPeerByClientId.get(id);
  if (!pc) return;
  streamPeerByClientId.delete(id);
  try {
    pc.onicecandidate = null;
    pc.onconnectionstatechange = null;
    pc.ontrack = null;
    pc.close();
  } catch {
    // ignore
  }
}

function closeAllStreamPeers() {
  for (const id of Array.from(streamPeerByClientId.keys())) closeStreamPeer(id);
}

function clearStreamMediaPreview() {
  if (streamStageVideoEl) {
    try {
      streamStageVideoEl.pause();
    } catch {
      // ignore
    }
    streamStageVideoEl.srcObject = null;
    streamStageVideoEl.classList.add("hidden");
    streamStageVideoEl.muted = false;
  }
  if (streamStageAudioEl) {
    try {
      streamStageAudioEl.pause();
    } catch {
      // ignore
    }
    streamStageAudioEl.srcObject = null;
    streamStageAudioEl.classList.add("hidden");
    streamStageAudioEl.muted = false;
  }
  streamRemoteMedia = null;
}

function attachStreamPreview(stream, kind, local = false) {
  const streamObj = stream && typeof stream.getTracks === "function" ? stream : null;
  if (!streamObj) {
    clearStreamMediaPreview();
    return;
  }
  const k = normalizeStreamKind(kind);
  const hasVideo = streamObj.getVideoTracks().length > 0;
  if (k === "audio" || !hasVideo) {
    if (streamStageVideoEl) {
      streamStageVideoEl.srcObject = null;
      streamStageVideoEl.classList.add("hidden");
    }
    if (streamStageAudioEl) {
      streamStageAudioEl.srcObject = streamObj;
      streamStageAudioEl.classList.remove("hidden");
      streamStageAudioEl.muted = Boolean(local);
      streamStageAudioEl.play?.().catch(() => {});
    }
    return;
  }
  if (streamStageAudioEl) {
    streamStageAudioEl.srcObject = null;
    streamStageAudioEl.classList.add("hidden");
  }
  if (streamStageVideoEl) {
    streamStageVideoEl.srcObject = streamObj;
    streamStageVideoEl.classList.remove("hidden");
    streamStageVideoEl.muted = Boolean(local);
    streamStageVideoEl.play?.().catch(() => {});
  }
}

function streamCanHostPost(post) {
  if (!post || !loggedInUser) return false;
  if (String(post.author || "") === String(loggedInUser || "")) return true;
  return loggedInRole === "owner" || loggedInRole === "moderator";
}

function streamResetState(keepPostId = false) {
  closeAllStreamPeers();
  stopStreamTracks(streamLocalMedia);
  streamLocalMedia = null;
  streamRemoteMedia = null;
  streamRemoteHostClientId = "";
  streamCurrentHostClientId = "";
  streamCurrentRole = "idle";
  if (!keepPostId) streamCurrentPostId = "";
  clearStreamMediaPreview();
}

function leaveActiveStream(sendSignal = true) {
  const postId = String(streamCurrentPostId || "").trim();
  const wasRole = streamCurrentRole;
  if (sendSignal && ws?.readyState === WebSocket.OPEN && postId) {
    if (wasRole === "host") ws.send(JSON.stringify({ type: "streamHostStop", postId }));
    else if (wasRole === "viewer") ws.send(JSON.stringify({ type: "streamLeave", postId }));
  }
  streamResetState(false);
}

function streamStageCurrentPost() {
  if (activeDmThreadId) return null;
  const post = activeChatPostId ? posts.get(activeChatPostId) : null;
  if (!post || post.deleted || !isStreamPost(post)) return null;
  return post;
}

function createStreamPeer(targetClientId) {
  const target = String(targetClientId || "").trim();
  if (!target) return null;
  if (typeof RTCPeerConnection !== "function") {
    toast("Stream", "WebRTC is not available in this browser.");
    return null;
  }
  const existing = streamPeerByClientId.get(target);
  if (existing) return existing;
  const pc = new RTCPeerConnection({ iceServers: streamIceConfig() });
  streamPeerByClientId.set(target, pc);
  pc.onicecandidate = (evt) => {
    if (!evt.candidate || !ws || ws.readyState !== WebSocket.OPEN || !streamCurrentPostId) return;
    ws.send(
      JSON.stringify({
        type: "streamSignal",
        postId: streamCurrentPostId,
        targetClientId: target,
        signal: { type: "candidate", candidate: evt.candidate },
      })
    );
  };
  pc.ontrack = (evt) => {
    if (streamCurrentRole !== "viewer") return;
    const remote = evt.streams && evt.streams[0] ? evt.streams[0] : null;
    if (!remote) return;
    streamRemoteMedia = remote;
    attachStreamPreview(remote, streamRemoteKind, false);
    if (streamStagePlaceholderEl) streamStagePlaceholderEl.classList.add("hidden");
  };
  pc.onconnectionstatechange = () => {
    const state = String(pc.connectionState || "");
    if (state === "failed" || state === "closed" || state === "disconnected") closeStreamPeer(target);
  };
  if (streamCurrentRole === "host" && streamLocalMedia) {
    for (const track of streamLocalMedia.getTracks()) {
      try {
        pc.addTrack(track, streamLocalMedia);
      } catch {
        // ignore
      }
    }
  }
  return pc;
}

async function handleStreamSignalMessage(msg) {
  const postId = String(msg.postId || "").trim();
  const fromClientId = String(msg.fromClientId || "").trim();
  const signal = msg.signal && typeof msg.signal === "object" ? msg.signal : null;
  if (!postId || !fromClientId || !signal) return;
  if (!streamCurrentPostId || streamCurrentPostId !== postId) return;
  const type = String(signal.type || "").trim().toLowerCase();
  if (!type) return;
  const pc = createStreamPeer(fromClientId);
  if (!pc) return;
  try {
    if (type === "offer") {
      await pc.setRemoteDescription(new RTCSessionDescription({ type: "offer", sdp: String(signal.sdp || "") }));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      ws?.send(
        JSON.stringify({
          type: "streamSignal",
          postId,
          targetClientId: fromClientId,
          signal: { type: "answer", sdp: String(answer.sdp || "") },
        })
      );
      return;
    }
    if (type === "answer") {
      await pc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: String(signal.sdp || "") }));
      return;
    }
    if (type === "candidate" && signal.candidate) {
      await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
    }
  } catch (e) {
    console.warn("stream signal failed:", e?.message || e);
  }
}

async function handleStreamViewerJoinMessage(msg) {
  const postId = String(msg.postId || "").trim();
  const viewerClientId = String(msg.viewerClientId || "").trim();
  if (!postId || !viewerClientId) return;
  if (streamCurrentRole !== "host" || streamCurrentPostId !== postId) return;
  const pc = createStreamPeer(viewerClientId);
  if (!pc) return;
  try {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    ws?.send(
      JSON.stringify({
        type: "streamSignal",
        postId,
        targetClientId: viewerClientId,
        signal: { type: "offer", sdp: String(offer.sdp || "") },
      })
    );
  } catch (e) {
    console.warn("stream offer failed:", e?.message || e);
    closeStreamPeer(viewerClientId);
  }
}

async function startStreamHost(post) {
  if (!post || !isStreamPost(post)) return;
  if (!streamEnabled) {
    toast("Stream", "Streaming is disabled on this instance.");
    return;
  }
  if (!loggedInUser) {
    toast("Stream", "Sign in to start a stream.");
    return;
  }
  if (!streamCanHostPost(post)) {
    toast("Stream", "Only the hive owner or a moderator can host this stream.");
    return;
  }
  const kind = normalizeStreamKind(post.streamKind || "webcam");
  try {
    if (!navigator.mediaDevices) throw new Error("Media devices are unavailable in this browser.");
    let media = null;
    if (kind === "screen") {
      media = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    } else if (kind === "audio") {
      media = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } else {
      media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    }
    if (!media) throw new Error("No stream media available.");

    leaveActiveStream(false);
    streamCurrentPostId = String(post.id || "");
    streamCurrentRole = "host";
    streamRemoteKind = kind;
    streamCurrentHostClientId = String(clientId || "");
    streamLocalMedia = media;
    for (const track of media.getTracks()) {
      track.onended = () => {
        if (streamCurrentRole === "host" && streamCurrentPostId === String(post.id || "")) leaveActiveStream(true);
      };
    }
    attachStreamPreview(media, kind, true);
    if (streamStagePlaceholderEl) streamStagePlaceholderEl.classList.add("hidden");
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "streamHostStart", postId: post.id, streamKind: kind }));
    }
    renderChatPanel(false);
  } catch (e) {
    toast("Stream", String(e?.message || "Unable to start stream."));
  }
}

function joinStream(post) {
  if (!post || !isStreamPost(post)) return;
  if (!streamEnabled) {
    toast("Stream", "Streaming is disabled on this instance.");
    return;
  }
  if (typeof RTCPeerConnection !== "function") {
    toast("Stream", "WebRTC is not available in this browser.");
    return;
  }
  leaveActiveStream(false);
  streamCurrentPostId = String(post.id || "");
  streamCurrentRole = "viewer";
  streamRemoteKind = normalizeStreamKind(post.streamKind || "webcam");
  streamCurrentHostClientId = "";
  streamRemoteHostClientId = "";
  if (streamStagePlaceholderEl) {
    streamStagePlaceholderEl.classList.remove("hidden");
    streamStagePlaceholderEl.textContent = "Connecting to stream...";
  }
  if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "streamJoin", postId: post.id }));
  renderChatPanel(false);
}

function renderStreamStage(post) {
  const streamPost = post && isStreamPost(post) ? post : null;
  if (!streamPost) {
    if (streamStageEl) streamStageEl.classList.add("hidden");
    return;
  }
  if (streamStageEl) streamStageEl.classList.remove("hidden");
  const postId = String(streamPost.id || "");
  const live = Boolean(streamLiveByPostId.get(postId) ?? streamPost.streamLive);
  const kind = normalizeStreamKind(streamPost.streamKind || "webcam");
  const canHost = streamCanHostPost(streamPost);
  const isHosting = streamCurrentRole === "host" && streamCurrentPostId === postId;
  const isViewing = streamCurrentRole === "viewer" && streamCurrentPostId === postId;
  if (streamStageTitleEl) {
    streamStageTitleEl.textContent = `${streamKindLabel(kind)} stream`;
  }
  if (streamStageStatusEl) {
    if (isHosting) streamStageStatusEl.textContent = "You are live.";
    else if (isViewing) streamStageStatusEl.textContent = streamRemoteMedia ? "Watching live stream." : "Connecting...";
    else if (live) streamStageStatusEl.textContent = "Live now. Join to watch.";
    else if (canHost) streamStageStatusEl.textContent = "Offline. Start a stream for this hive.";
    else streamStageStatusEl.textContent = "Stream is offline.";
  }
  if (streamStagePrimaryBtn) {
    let label = "Join stream";
    let disabled = false;
    if (isHosting) label = "Stop stream";
    else if (isViewing) label = "Leave stream";
    else if (!live && canHost) label = `Go live (${streamKindLabel(kind)})`;
    else if (!live && !canHost) {
      label = "Offline";
      disabled = true;
    }
    streamStagePrimaryBtn.textContent = label;
    streamStagePrimaryBtn.disabled = disabled;
  }
  if (streamStagePlaceholderEl && !isHosting && !isViewing) {
    streamStagePlaceholderEl.classList.remove("hidden");
    streamStagePlaceholderEl.textContent = live
      ? "Join this stream to watch live with chat."
      : canHost
        ? "Tap Go live to start screen share, webcam, or audio stream."
        : "Waiting for the stream owner to go live.";
  }
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
    if (walkieStatusEl) walkieStatusEl.textContent = "Requesting microphone...";
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
    if (walkieStatusEl) walkieStatusEl.textContent = "Recording... release to send.";

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
      if (walkieStatusEl) walkieStatusEl.textContent = "Processing...";

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
      if (walkieStatusEl) walkieStatusEl.textContent = "Uploading...";
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

function installDropUpload(targetEl, { allowImages = true, allowAudio = true } = {}) {
  if (!targetEl) return;
  const setActive = (on) => {
    try {
      targetEl.classList.toggle("isDropActive", Boolean(on));
    } catch {
      // ignore
    }
  };
  targetEl.addEventListener("dragover", (e) => {
    if (!e.dataTransfer) return;
    if (!e.dataTransfer.types || !Array.from(e.dataTransfer.types).includes("Files")) return;
    e.preventDefault();
    setActive(true);
  });
  targetEl.addEventListener("dragleave", () => setActive(false));
  targetEl.addEventListener("drop", async (e) => {
    setActive(false);
    const files = e.dataTransfer?.files ? Array.from(e.dataTransfer.files) : [];
    if (!files.length) return;
    e.preventDefault();
    e.stopPropagation();

    for (const file of files.slice(0, 4)) {
      const type = String(file.type || "").toLowerCase();
      const name = String(file.name || "").toLowerCase();
      const isImg = type.startsWith("image/") || /\.(gif|png|jpe?g|webp)$/.test(name);
      const isAud = type.startsWith("audio/") || /\.(mp3|wav|ogg|m4a|aac|webm)$/.test(name);
      if (isImg && allowImages) {
        const url = await uploadMediaFile(file, "image");
        if (!url) continue;
        targetEl.focus();
        document.execCommand("insertImage", false, url);
      } else if (isAud && allowAudio) {
        const url = await uploadMediaFile(file, "audio");
        if (!url) continue;
        insertAudioTag(targetEl, url);
      }
    }
  });
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

document.addEventListener("click", (e) => {
  const btn = e.target.closest?.("button");
  if (!btn) return;
  const toolbar = btn.closest?.(".chatComposer .toolbar");
  if (!toolbar) return;
  const composer = toolbar.closest?.(".chatComposer");
  if (!composer) return;
  const targetEditor = composer.querySelector?.(".chatEditor") || chatEditor;
  if (!(targetEditor instanceof HTMLElement)) return;
  chatUploadTargetEditor = targetEditor;

  const cmd = btn.getAttribute("data-chatcmd");
  if (cmd) {
    runCmd(targetEditor, cmd);
    return;
  }
  if (btn.getAttribute("data-chatlink")) {
    runLink(targetEditor);
    return;
  }
  if (btn.getAttribute("data-chatimg")) {
    chatImageInput?.click();
    return;
  }
  if (btn.getAttribute("data-chataudio")) {
    chatAudioInput?.click();
    return;
  }
  if (btn.getAttribute("data-chatemoji")) runEmoji(targetEditor);
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
    const mode = normalizePostMode(editModalModeSelect?.value || post?.mode || "text");
    const streamKind = normalizeStreamKind(editModalStreamKindSelect?.value || post?.streamKind || "webcam");
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
        mode,
        streamKind
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
  if (onboardingNeedsAcceptanceNow()) {
    toast("Onboarding", "Accept server rules in Account before creating hives.");
    return;
  }
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
  const mode = normalizePostMode(postModeEl?.value || "text");
  const streamKind = normalizeStreamKind(streamKindEl?.value || "webcam");
  ws.send(
    JSON.stringify({
      type: "newPost",
      title,
      collectionId,
      contentHtml: html,
      content: text,
      keywords,
      ttl,
      protected: isProtected,
      password,
      mode,
      streamKind,
    })
  );
  if (postTitleInput) postTitleInput.value = "";
  editor.innerHTML = "";
  if (postPasswordEl) postPasswordEl.value = "";
  if (isProtectedEl) isProtectedEl.checked = false;
  if (postModeEl) postModeEl.value = "text";
  if (streamKindEl) streamKindEl.value = "webcam";
  syncComposerModeUi();
  if (isMobileSwipeMode()) setComposerOpen(false);
});

toggleComposerBtn?.addEventListener("click", () => {
  if (isMobileScreenMode()) {
    setComposerOpen(true);
    const layout = loadMobileLayout();
    layout.active = "composer";
    saveMobileLayout(layout);
    setMobileScreen("composer");
    renderMobileNav();
    if (composerOpen) (postTitleInput || editor)?.focus();
    return;
  }
  setComposerOpen(!composerOpen);
  if (composerOpen) (postTitleInput || editor)?.focus();
});
toggleComposerInlineBtn?.addEventListener("click", () => setComposerOpen(false));

function submitChat() {
  if (onboardingNeedsAcceptanceNow()) {
    toast("Onboarding", "Accept server rules in Account before chatting.");
    return;
  }
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

  if (isMapChatActive()) {
    if (!text && !hasImg && !hasAudio) return;
    if (hasImg || hasAudio) {
      toast("Maps chat", "Maps chat is text-only for now.");
      return;
    }
    if (!loggedInUser) {
      toast("Sign in required", "Sign in to chat in maps.");
      return;
    }
    try {
      ws.send(JSON.stringify({ type: "plugin:maps:chatSend", mapId: activeMapsRoomId, scope: normalizeMapChatScope(activeMapsChatScope), text }));
      // Optimistic add so it feels instant (server will also echo back).
      pushMapChatMessage(activeMapsRoomId, activeMapsChatScope, {
        id: `local_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        fromUser: loggedInUser,
        text,
        createdAt: Date.now(),
      });
    } catch {
      // ignore
    }
    chatEditor.innerHTML = "";
    setReplyToMessage(null);
    renderChatPanel(true);
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
  const wantsMod = Boolean(canModerate && chatModToggleEl instanceof HTMLInputElement && chatModToggleEl.checked);
  ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
  ws.send(JSON.stringify({ type: "chatMessage", postId: activeChatPostId, text, html, replyToId, asMod: wantsMod }));
  chatEditor.innerHTML = "";
  setReplyToMessage(null);
}

filterKeywordsEl.addEventListener("input", () => renderFeed());
filterAuthorEl?.addEventListener("input", () => renderFeed());
sortByEl?.addEventListener("change", () => {
  updateMobileSortCycleLabel();
  renderFeed();
});
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
  updateMobileSortCycleLabel();
  activeHiveView = "all";
  renderFeed();
});

mobileHiveSearchBtn?.addEventListener("click", () => {
  const initial = String(filterAuthorEl?.value || "").trim()
    ? `@${String(filterAuthorEl?.value || "").trim()}`
    : String(filterKeywordsEl?.value || "").trim();
  const raw = prompt("Search hives by @author or keywords:", initial);
  if (raw === null) return;
  const q = String(raw || "").trim();
  if (!q) {
    if (filterAuthorEl) filterAuthorEl.value = "";
    if (filterKeywordsEl) filterKeywordsEl.value = "";
    renderFeed();
    return;
  }
  const parts = q.split(/\s+/).filter(Boolean);
  const authorPart = parts.find((part) => part.startsWith("@")) || (q.startsWith("@") ? q : "");
  const author = authorPart.replace(/^@+/, "").trim();
  const keywordParts = authorPart ? parts.filter((part) => part !== authorPart) : parts;
  if (filterAuthorEl) filterAuthorEl.value = author || "";
  if (filterKeywordsEl) filterKeywordsEl.value = keywordParts.join(", ");
  renderFeed();
});

mobileSortCycleBtn?.addEventListener("click", () => {
  if (!sortByEl) return;
  const order = ["activity", "popular", "expiring"];
  const current = String(sortByEl.value || "activity");
  const at = Math.max(0, order.indexOf(current));
  const next = order[(at + 1) % order.length];
  sortByEl.value = next;
  updateMobileSortCycleLabel();
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
    else openChat(postId, { sourceEl: chatBtn });
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

window.addEventListener("keydown", (e) => {
  if (e.defaultPrevented) return;
  if (e.repeat) return;
  if (e.key === "?" && !isTextEntryFocused()) {
    e.preventDefault();
    setShortcutHelpOpen(true);
    return;
  }
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (isTextEntryFocused()) return;
  const ctx = activePanelContextForHotkeys();
  const plus = e.key === "=" || e.code === "NumpadAdd";
  const minus = e.key === "-" || e.code === "NumpadSubtract";
  if (ctx === "hives" && (plus || minus)) {
    e.preventDefault();
    cycleHiveViewBy(plus ? 1 : -1);
    return;
  }
  if (ctx === "chat" && (plus || minus)) {
    e.preventDefault();
    cycleChatContextBy(plus ? 1 : -1);
    return;
  }
  if (e.key === "[") {
    e.preventDefault();
    cycleLayoutPresetBy(-1);
    return;
  }
  if (e.key === "]") {
    e.preventDefault();
    cycleLayoutPresetBy(1);
  }
});

window.addEventListener(
  "pointerdown",
  (e) => {
    updateHotkeyPanelContextFromTarget(e.target);
  },
  true
);

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
  const emptyActionBtn = e.target.closest("button[data-chatemptyopen]");
  if (emptyActionBtn) {
    const target = String(emptyActionBtn.getAttribute("data-chatemptyopen") || "").trim().toLowerCase();
    if (target === "hives") {
      if (isMobileSwipeMode()) {
        setMobilePanel("hives");
      } else {
        const hivesHeader = hivesPanelEl?.querySelector?.(".panelHeader");
        hivesHeader?.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
      }
      return;
    }
    if (target === "people") {
      const peopleEl = getPanelElement("people") || peopleDrawerEl;
      if (peopleEl && typeof undockPanel === "function" && isDocked("people")) undockPanel("people");
      peopleEl?.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
      return;
    }
  }

  const mobileChatOpenBtn = e.target.closest("button[data-mobilechatopen]");
  if (mobileChatOpenBtn) {
    const postId = mobileChatOpenBtn.getAttribute("data-mobilechatopen") || "";
    if (postId) openChat(postId);
    return;
  }

  const dmAcceptBtn = e.target.closest("button[data-dmaccept]");
  if (dmAcceptBtn) {
    const threadId = dmAcceptBtn.getAttribute("data-dmaccept") || "";
    if (threadId) {
      pendingOpenDmThreadId = threadId;
      ws.send(JSON.stringify({ type: "dmRequestRespond", threadId, accept: true }));
    }
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

chatBackToListBtn?.addEventListener("click", () => {
  if (activeChatPostId && ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "typing", postId: activeChatPostId, isTyping: false }));
  }
  activeChatPostId = null;
  activeDmThreadId = null;
  activeMapsRoomId = "";
  activeMapsRoomTitle = "";
  setReplyToMessage(null);
  renderChatPanel(true);
});

chatContextSelectEl?.addEventListener("change", () => {
  if (syncingChatContextSelect) return;
  const raw = String(chatContextSelectEl.value || "").trim();
  if (!raw) return;
  openChatContextValue(raw, { preserveFocus: false });
});

modPanelEl?.addEventListener("click", (e) => {
  const tabBtn = e.target.closest("[data-modtab]");
  if (tabBtn) {
    modTab = tabBtn.getAttribute("data-modtab") || "reports";
    if (modTab === "server") requestServerInfo();
    if (modTab === "onboarding") syncOnboardingAdminDraft(true);
    renderModPanel();
    return;
  }
});

modRefreshBtn?.addEventListener("click", () => {
  if (!canModerate) return;
  if (modTab === "server") requestServerInfo();
  else if (modTab === "onboarding") {
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "onboardingGet" }));
    syncOnboardingAdminDraft(true);
    renderModPanel();
  }
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
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "onboardingGet" }));
    return;
  }

  const onboardingRefreshBtn = e.target.closest("button[data-onboarding-refresh]");
  if (onboardingRefreshBtn) {
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "onboardingGet" }));
    syncOnboardingAdminDraft(true);
    renderModPanel();
    return;
  }

  const onbAdminTabBtn = e.target.closest("button[data-onb-admin-tab]");
  if (onbAdminTabBtn) {
    const tab = String(onbAdminTabBtn.getAttribute("data-onb-admin-tab") || "about").trim();
    if (!["about", "rules", "roles"].includes(tab)) return;
    onboardingAdminTab = tab;
    renderModPanel();
    return;
  }

  const onbRuleAddBtn = e.target.closest("button[data-onb-ruleadd]");
  if (onbRuleAddBtn) {
    if (!(canModerate && (loggedInRole === "owner" || loggedInRole === "moderator"))) return;
    normalizeOnboardingDraftRules();
    const nextIndex = onboardingAdminDraft.rules.length + 1;
    const id = `r${Date.now()}_${nextIndex}`;
    onboardingAdminDraft.rules.push({
      id,
      order: nextIndex,
      name: `Rule ${nextIndex}`,
      shortDescription: "",
      description: "",
      severity: "info",
    });
    normalizeOnboardingDraftRules();
    onboardingAdminExpandedRuleIds.add(id);
    onboardingAdminTab = "rules";
    renderModPanel();
    return;
  }

  const onbRuleToggleBtn = e.target.closest("button[data-onb-ruletoggle]");
  if (onbRuleToggleBtn) {
    const id = String(onbRuleToggleBtn.getAttribute("data-onb-ruletoggle") || "").trim();
    if (!id) return;
    if (onboardingAdminExpandedRuleIds.has(id)) onboardingAdminExpandedRuleIds.delete(id);
    else onboardingAdminExpandedRuleIds.add(id);
    renderModPanel();
    return;
  }

  const onbRuleDeleteBtn = e.target.closest("button[data-onb-ruledelete]");
  if (onbRuleDeleteBtn) {
    if (!(canModerate && (loggedInRole === "owner" || loggedInRole === "moderator"))) return;
    const id = String(onbRuleDeleteBtn.getAttribute("data-onb-ruledelete") || "").trim();
    onboardingAdminDraft.rules = onboardingAdminDraft.rules.filter((r) => r.id !== id);
    onboardingAdminExpandedRuleIds.delete(id);
    normalizeOnboardingDraftRules();
    renderModPanel();
    return;
  }

  const onbRuleUpBtn = e.target.closest("button[data-onb-ruleup]");
  if (onbRuleUpBtn) {
    if (!(canModerate && (loggedInRole === "owner" || loggedInRole === "moderator"))) return;
    const id = String(onbRuleUpBtn.getAttribute("data-onb-ruleup") || "").trim();
    const idx = onboardingAdminDraft.rules.findIndex((r) => r.id === id);
    if (idx <= 0) return;
    const tmp = onboardingAdminDraft.rules[idx - 1];
    onboardingAdminDraft.rules[idx - 1] = onboardingAdminDraft.rules[idx];
    onboardingAdminDraft.rules[idx] = tmp;
    normalizeOnboardingDraftRules();
    renderModPanel();
    return;
  }

  const onbRuleDownBtn = e.target.closest("button[data-onb-ruledown]");
  if (onbRuleDownBtn) {
    if (!(canModerate && (loggedInRole === "owner" || loggedInRole === "moderator"))) return;
    const id = String(onbRuleDownBtn.getAttribute("data-onb-ruledown") || "").trim();
    const idx = onboardingAdminDraft.rules.findIndex((r) => r.id === id);
    if (idx < 0 || idx >= onboardingAdminDraft.rules.length - 1) return;
    const tmp = onboardingAdminDraft.rules[idx + 1];
    onboardingAdminDraft.rules[idx + 1] = onboardingAdminDraft.rules[idx];
    onboardingAdminDraft.rules[idx] = tmp;
    normalizeOnboardingDraftRules();
    renderModPanel();
    return;
  }

  const onboardingSaveBtn = e.target.closest("button[data-onboarding-save],button[data-onboarding-publish]");
  if (onboardingSaveBtn) {
    if (!(canModerate && (loggedInRole === "owner" || loggedInRole === "moderator"))) return;
    const publish = onboardingSaveBtn.hasAttribute("data-onboarding-publish");
    normalizeOnboardingDraftRules();
    ws.send(
      JSON.stringify({
        type: "instanceSetOnboarding",
        publish,
        enabled: Boolean(onboardingAdminDraft.enabled),
        about: { content: String(onboardingAdminDraft.aboutContent || "") },
        rules: {
          requireAcceptance: Boolean(onboardingAdminDraft.requireAcceptance),
          blockReadUntilAccepted: Boolean(onboardingAdminDraft.blockReadUntilAccepted),
          items: onboardingAdminDraft.rules,
        },
        roleSelect: {
          enabled: Boolean(onboardingAdminDraft.roleSelectEnabled),
          selfAssignableRoleIds: onboardingAdminDraft.selfAssignableRoleIds,
        }
      })
    );
    toast("Onboarding", publish ? "Publishing..." : "Saving...");
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
    toast("Instance", "Saving...");
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
    toast("Theme", "Saving...");
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
    if (!canManagePlugins()) return;
    pluginAdminBusy = true;
    pluginAdminStatus = "Reloading plugins...";
    renderModPanel();
    ws.send(JSON.stringify({ type: "pluginReload" }));
    return;
  }

  const pluginUninstallBtn = e.target.closest("button[data-pluginuninstall]");
  if (pluginUninstallBtn) {
    if (!canManagePlugins()) return;
    const id = String(pluginUninstallBtn.getAttribute("data-pluginuninstall") || "").trim().toLowerCase();
    if (!id) return;
    const ok = confirm(`Uninstall "${id}"? This deletes the plugin files from this server.`);
    if (!ok) return;
    pluginAdminBusy = true;
    pluginAdminStatus = `Uninstalling "${id}"...`;
    renderModPanel();
    ws.send(JSON.stringify({ type: "pluginUninstall", id }));
    return;
  }

  const pluginInstallBtn = e.target.closest("button[data-plugininstall]");
  if (pluginInstallBtn) {
    if (!canManagePlugins()) return;
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
    pluginAdminStatus = "Uploading plugin...";
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
    toast("NUKE", "Working...");
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
  const onbEnabled = e.target?.closest?.("input[data-onboarding-enabled]");
  if (onbEnabled) {
    onboardingAdminDraft.enabled = Boolean(onbEnabled.checked);
    return;
  }
  const onbRequire = e.target?.closest?.("input[data-onboarding-require]");
  if (onbRequire) {
    onboardingAdminDraft.requireAcceptance = Boolean(onbRequire.checked);
    return;
  }
  const onbBlockRead = e.target?.closest?.("input[data-onboarding-blockread]");
  if (onbBlockRead) {
    onboardingAdminDraft.blockReadUntilAccepted = Boolean(onbBlockRead.checked);
    return;
  }
  const onbRoleEnabled = e.target?.closest?.("input[data-onboarding-roleenabled]");
  if (onbRoleEnabled) {
    onboardingAdminDraft.roleSelectEnabled = Boolean(onbRoleEnabled.checked);
    return;
  }
  const onbRoleCheck = e.target?.closest?.("input[data-onboarding-rolecheck]");
  if (onbRoleCheck) {
    const key = String(onbRoleCheck.getAttribute("data-onboarding-rolecheck") || "").trim().toLowerCase();
    if (!key) return;
    const set = new Set(onboardingAdminDraft.selfAssignableRoleIds || []);
    if (onbRoleCheck.checked) set.add(key);
    else set.delete(key);
    onboardingAdminDraft.selfAssignableRoleIds = Array.from(set);
    return;
  }
  const onbRuleField = e.target?.closest?.("[data-onb-rulefield]");
  if (onbRuleField) {
    const id = String(onbRuleField.getAttribute("data-onb-ruleid") || "").trim();
    const field = String(onbRuleField.getAttribute("data-onb-rulefield") || "").trim();
    if (!id || !field) return;
    const rule = onboardingAdminDraft.rules.find((r) => r.id === id);
    if (!rule) return;
    if (field === "severity") {
      rule.severity = ["info", "warn", "critical"].includes(String(onbRuleField.value || "").toLowerCase())
        ? String(onbRuleField.value || "").toLowerCase()
        : "info";
      return;
    }
    rule[field] = String(onbRuleField.value || "");
    return;
  }

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
    if (!canManagePlugins()) return;
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
    pluginAdminStatus = enabled ? "Enabling..." : "Disabling...";
    renderModPanel();
    wsRef.send(JSON.stringify({ type: "pluginSetEnabled", id, enabled }));
    return;
  }
});

modBodyEl?.addEventListener("input", (e) => {
  const aboutEl = e.target?.closest?.("textarea[data-onboarding-about]");
  if (aboutEl) {
    onboardingAdminDraft.aboutContent = String(aboutEl.value || "");
    return;
  }
  const onbRuleField = e.target?.closest?.("input[data-onb-rulefield],textarea[data-onb-rulefield]");
  if (!onbRuleField) return;
  const id = String(onbRuleField.getAttribute("data-onb-ruleid") || "").trim();
  const field = String(onbRuleField.getAttribute("data-onb-rulefield") || "").trim();
  if (!id || !field) return;
  const rule = onboardingAdminDraft.rules.find((r) => r.id === id);
  if (!rule) return;
  rule[field] = String(onbRuleField.value || "");
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

chatMeta?.addEventListener("click", (e) => {
  const btn = e.target?.closest?.("button[data-mapchatscope]");
  if (!btn) return;
  const scope = normalizeMapChatScope(btn.getAttribute("data-mapchatscope") || "local");
  activeMapsChatScope = scope;
  // Fetch global history on-demand when switching to global.
  if (scope === "global" && activeMapsRoomId) {
    try {
      const wsRef = window.__bzlWs;
      if (wsRef && wsRef.readyState === WebSocket.OPEN) {
        wsRef.send(JSON.stringify({ type: "plugin:maps:chatHistoryReq", mapId: activeMapsRoomId }));
      }
    } catch {
      // ignore
    }
  }
  renderChatPanel(true);
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
  if (!shouldSubmitChatOnEnter(e)) return;
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

chatEditor.addEventListener("focus", () => {
  chatUploadTargetEditor = chatEditor;
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
    const target = chatUploadTargetEditor instanceof HTMLElement ? chatUploadTargetEditor : chatEditor;
    target.focus();
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
    const target = chatUploadTargetEditor instanceof HTMLElement ? chatUploadTargetEditor : chatEditor;
    insertAudioTag(target, url);
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

let ws = null;
let wsKeepaliveTimer = null;
let wsReconnectTimer = null;
let wsReconnectAttempt = 0;

function clearWsKeepalive() {
  if (!wsKeepaliveTimer) return;
  try {
    clearInterval(wsKeepaliveTimer);
  } catch {
    // ignore
  }
  wsKeepaliveTimer = null;
}

function clearWsReconnect() {
  if (!wsReconnectTimer) return;
  try {
    clearTimeout(wsReconnectTimer);
  } catch {
    // ignore
  }
  wsReconnectTimer = null;
}

function startWsKeepalive(sock) {
  clearWsKeepalive();
  if (!readStayConnectedPref()) return;
  wsKeepaliveTimer = setInterval(() => {
    if (!sock || sock !== ws) return;
    if (sock.readyState !== WebSocket.OPEN) return;
    try {
      sock.send(JSON.stringify({ type: "ping" }));
    } catch {
      // ignore
    }
  }, 25_000);
}

function scheduleWsReconnect() {
  clearWsReconnect();
  if (!readStayConnectedPref()) return;
  const attempt = Math.min(6, Math.max(0, wsReconnectAttempt));
  const base = 1000 * Math.pow(2, attempt);
  const jitter = Math.floor(Math.random() * 250);
  const delay = Math.min(15_000, base) + jitter;
  wsReconnectAttempt += 1;
  setConn("connecting");
  wsReconnectTimer = setTimeout(() => {
    wsReconnectTimer = null;
    connectWs();
  }, delay);
}

function connectWs() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;
  clearWsKeepalive();
  setConn("connecting");
  const sock = new WebSocket(wsUrl());
  ws = sock;
  window.__bzlWs = sock;

  sock.addEventListener("open", () => {
    if (sock !== ws) return;
    setConn("open");
    wsReconnectAttempt = 0;
    clearWsReconnect();
    startWsKeepalive(sock);
    const token = getSessionToken();
    if (token) {
      try {
        sock.send(JSON.stringify({ type: "resumeSession", token }));
      } catch {
        // ignore
      }
    }
  });

  sock.addEventListener("close", () => {
    if (sock !== ws) return;
    leaveActiveStream(false);
    setConn("closed");
    clearWsKeepalive();
    scheduleWsReconnect();
  });

  sock.addEventListener("error", () => {
    if (sock !== ws) return;
    setConn("closed");
  });

  sock.addEventListener("message", onWsMessage);
}

function onWsMessage(evt) {
  let msg;
  try {
    msg = JSON.parse(evt.data);
  } catch {
    return;
  }
  if (!msg || typeof msg !== "object") return;

  if (msg.type === "init") {
    leaveActiveStream(false);
    clientId = msg.clientId || null;
    canRegisterFirstUser = Boolean(msg.auth?.canRegisterFirstUser);
    registrationEnabled = Boolean(msg.auth?.registrationEnabled);
    loggedInRole = "member";
    canModerate = false;
    dmThreads = [];
    dmThreadsById = new Map();
    dmMessagesByThreadId.clear();
    activeDmThreadId = null;
    pendingOpenDmThreadId = "";
    lanUrls = [];
    modReports = [];
    modUsers = [];
    modLog = [];
    devLog = [];
    profiles = msg.profiles && typeof msg.profiles === "object" ? msg.profiles : {};
    instanceBranding = normalizeInstanceBranding(msg.instance || {});
    onboardingState = normalizeOnboardingState(msg.auth?.onboarding || {});
    renderInstanceBranding();
    collections = normalizeCollections(msg.collections);
    customRoles = normalizeRoleDefs(msg.roles?.custom);
    setPlugins(msg.plugins);
    streamEnabled = Boolean(msg.stream?.enabled);
    streamIceServers = Array.isArray(msg.stream?.iceServers) && msg.stream.iceServers.length ? msg.stream.iceServers : streamIceServers;
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
    streamLiveByPostId.clear();
    posts.clear();
    for (const p of msg.posts || []) {
      posts.set(p.id, p);
      if (p && typeof p.id === "string") streamLiveByPostId.set(p.id, Boolean(p.streamLive));
    }
    setAuthUi();
    renderFeed();
    renderChatPanel();
    renderLanHint();
    renderPeoplePanel();
    renderCenterPanels();
    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "onboardingGet" }));
    return;
  }

  // Generic plugin event dispatch: `plugin:<pluginId>:<eventName>`
  // (Maps has some core-handled messages below; for other plugins, dispatch + stop.)
  if (typeof msg.type === "string") {
    const m = msg.type.match(/^plugin:([a-z0-9][a-z0-9_.-]{0,31}):([a-zA-Z0-9][a-zA-Z0-9_.-]{0,63})$/);
    if (m) {
      const pluginId = String(m[1] || "").toLowerCase();
      const ev = String(m[2] || "");
      const byEvent = pluginClientHandlers.get(pluginId);
      const set = byEvent ? byEvent.get(ev) : null;
      if (set && set.size) {
        for (const fn of Array.from(set)) {
          try {
            fn(msg);
          } catch (e) {
            console.warn(`Plugin handler failed (${pluginId}:${ev}):`, e?.message || e);
          }
        }
      }
      if (pluginId !== "maps") return;
    }
  }

  if (msg.type === "plugin:maps:joinOk") {
    const map = msg.map && typeof msg.map === "object" ? msg.map : null;
    const mapId = map && typeof map.id === "string" ? map.id.trim().toLowerCase() : "";
    if (mapId) {
      activeMapsRoomId = mapId;
      activeMapsRoomTitle = map && typeof map.title === "string" ? map.title.trim().slice(0, 64) : mapId;
      activeMapsChatScope = "local";
      try {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "plugin:maps:chatHistoryReq", mapId }));
        }
      } catch {
        // ignore
      }
      if (isMapChatActive()) renderChatPanel(true);
    }
    return;
  }

  if (msg.type === "plugin:maps:left") {
    const wasActive = Boolean(activeMapsRoomId);
    activeMapsRoomId = "";
    activeMapsRoomTitle = "";
    activeMapsChatScope = "local";
    if (wasActive && !activeDmThreadId && !activeChatPostId) renderChatPanel(true);
    return;
  }

  if (msg.type === "plugin:maps:chatHistory") {
    const mapId = typeof msg.mapId === "string" ? msg.mapId.trim().toLowerCase() : "";
    const scope = normalizeMapChatScope(msg.scope || "global");
    const messages = Array.isArray(msg.messages) ? msg.messages : [];
    if (mapId && scope === "global") {
      mapsChatGlobalByMapId.set(
        mapId,
        messages
          .map((m) => ({
            id: String(m?.id || ""),
            fromUser: String(m?.fromUser || m?.username || ""),
            text: String(m?.text || ""),
            createdAt: Number(m?.createdAt || 0) || Date.now(),
          }))
          .filter((m) => m.id && m.fromUser && m.text)
          .slice(-240)
      );
      if (isMapChatActive()) renderChatPanel(false);
    }
    return;
  }

  if (msg.type === "plugin:maps:chatMessage") {
    const mapId = typeof msg.mapId === "string" ? msg.mapId.trim().toLowerCase() : "";
    const scope = normalizeMapChatScope(msg.scope || "local");
    const m = msg.message && typeof msg.message === "object" ? msg.message : null;
    if (mapId && m) {
      pushMapChatMessage(mapId, scope, {
        id: String(m.id || ""),
        fromUser: String(m.fromUser || m.username || ""),
        text: String(m.text || ""),
        createdAt: Number(m.createdAt || 0) || Date.now(),
      });
      if (isMapChatActive()) renderChatPanel(false);
    }
    return;
  }

  if (msg.type === "streamState") {
    const postId = String(msg.postId || "").trim();
    if (!postId) return;
    const live = Boolean(msg.live);
    streamLiveByPostId.set(postId, live);
    const post = posts.get(postId);
    if (post) {
      post.streamLive = live;
      post.streamKind = normalizeStreamKind(msg.kind || post.streamKind || "webcam");
      post.streamHost = String(msg.host || "");
      post.streamHostClientId = String(msg.hostClientId || "");
      post.streamViewerCount = Math.max(0, Number(msg.viewerCount || 0) || 0);
    }
    if (live && streamCurrentRole === "viewer" && streamCurrentPostId === postId && !streamCurrentHostClientId) {
      streamCurrentHostClientId = String(msg.hostClientId || "");
      streamRemoteHostClientId = streamCurrentHostClientId;
    }
    if (!live && streamCurrentPostId === postId && streamCurrentRole !== "idle") {
      leaveActiveStream(false);
    }
    renderFeed();
    if (activeChatPostId === postId || streamCurrentPostId === postId) renderChatPanel(false);
    return;
  }

  if (msg.type === "streamEnded") {
    const postId = String(msg.postId || "").trim();
    if (!postId) return;
    streamLiveByPostId.set(postId, false);
    const post = posts.get(postId);
    if (post) post.streamLive = false;
    if (streamCurrentPostId === postId && streamCurrentRole !== "idle") {
      leaveActiveStream(false);
      if (activeChatPostId === postId) toast("Stream", "Live stream ended.");
    }
    renderFeed();
    if (activeChatPostId === postId) renderChatPanel(false);
    return;
  }

  if (msg.type === "streamJoinAck") {
    const postId = String(msg.postId || "").trim();
    if (!postId || streamCurrentRole !== "viewer" || streamCurrentPostId !== postId) return;
    if (!Boolean(msg.live)) {
      leaveActiveStream(false);
      toast("Stream", "This stream is offline.");
      renderChatPanel(false);
      return;
    }
    streamCurrentHostClientId = String(msg.hostClientId || "");
    streamRemoteHostClientId = streamCurrentHostClientId;
    streamRemoteKind = normalizeStreamKind(msg.kind || "webcam");
    renderChatPanel(false);
    return;
  }

  if (msg.type === "streamViewerJoin") {
    handleStreamViewerJoinMessage(msg);
    return;
  }

  if (msg.type === "streamViewerLeave") {
    const postId = String(msg.postId || "").trim();
    const viewerClientId = String(msg.viewerClientId || "").trim();
    if (!postId || !viewerClientId) return;
    if (streamCurrentRole === "host" && streamCurrentPostId === postId) closeStreamPeer(viewerClientId);
    return;
  }

  if (msg.type === "streamSignal") {
    handleStreamSignalMessage(msg);
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
    onboardingState = normalizeOnboardingState(onboardingState);
    if (modTab === "onboarding") syncOnboardingAdminDraft(true);
    renderInstanceBranding();
    applyInstanceAppearance();
    setAuthUi();
    return;
  }

  if (msg.type === "instanceOk" && msg.instance && typeof msg.instance === "object") {
    instanceBranding = normalizeInstanceBranding(msg.instance);
    onboardingState = normalizeOnboardingState(onboardingState);
    if (modTab === "onboarding") syncOnboardingAdminDraft(true);
    renderInstanceBranding();
    applyInstanceAppearance();
    setAuthUi();
    toast("Instance", "Saved.");
    return;
  }

  if (msg.type === "postsSnapshot") {
    streamLiveByPostId.clear();
    posts.clear();
    for (const post of Array.isArray(msg.posts) ? msg.posts : []) {
      posts.set(post.id, post);
      if (post && typeof post.id === "string") streamLiveByPostId.set(post.id, Boolean(post.streamLive));
    }
    if (activeChatPostId && !posts.has(activeChatPostId)) {
      activeChatPostId = null;
    }
    renderFeed();
    renderChatPanel();
    return;
  }

  if (msg.type === "boardReset") {
    posts.clear();
    streamLiveByPostId.clear();
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
    streamLiveByPostId.set(msg.post.id, Boolean(msg.post.streamLive));
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
    streamLiveByPostId.set(msg.post.id, Boolean(msg.post.streamLive));
    renderFeed();
    renderChatPanel();
    return;
  }

  if (msg.type === "deletePost") {
    if (userPrefs?.starredPostIds) userPrefs.starredPostIds = userPrefs.starredPostIds.filter((id) => id !== msg.id);
    if (userPrefs?.hiddenPostIds) userPrefs.hiddenPostIds = userPrefs.hiddenPostIds.filter((id) => id !== msg.id);
    if (streamCurrentPostId && String(streamCurrentPostId) === String(msg.id || "")) leaveActiveStream(false);
    posts.delete(msg.id);
    streamLiveByPostId.delete(msg.id);
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
    onboardingState = normalizeOnboardingState(msg.onboarding || onboardingState);
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
    if (rackLayoutEnabled) applyDockState();
    updateLayoutPresetOptions();
    renderOnboardingCard();
    return;
  }

  if (msg.type === "logoutOk") {
    setSessionToken("");
    leaveActiveStream(false);
    loggedInUser = null;
    loggedInRole = "member";
    canModerate = false;
    onboardingState = normalizeOnboardingState({ acceptedRulesVersion: 0, acceptedAt: 0, needsAcceptance: false });
    dmThreads = [];
    dmThreadsById = new Map();
    dmMessagesByThreadId.clear();
    activeDmThreadId = null;
    pendingOpenDmThreadId = "";
    stopWalkieRecording();
    streamLiveByPostId.clear();
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
    if (rackLayoutEnabled) applyDockState();
    updateLayoutPresetOptions();
    renderOnboardingCard();
    return;
  }

  if (msg.type === "authState") {
    if (!loggedInUser || msg.username !== loggedInUser) return;
    loggedInRole = typeof msg.role === "string" ? msg.role : loggedInRole;
    canModerate = Boolean(msg.canModerate);
    onboardingState = normalizeOnboardingState(msg.onboarding || onboardingState);
    if (!canModerate) lanUrls = [];
    if (msg.prefs && typeof msg.prefs === "object") setUserPrefs(msg.prefs);
    setAuthUi();
    renderLanHint();
    if (rackLayoutEnabled) applyDockState();
    renderPeoplePanel();
    if (canModerate) requestModData();
    updateLayoutPresetOptions();
    renderOnboardingCard();
    return;
  }

  if (msg.type === "onboardingState" && msg.onboarding && typeof msg.onboarding === "object") {
    onboardingState = normalizeOnboardingState(msg.onboarding);
    setAuthUi();
    renderOnboardingCard();
    return;
  }

  if (msg.type === "sessionInvalid") {
    setSessionToken("");
    setUserPrefs({ starredPostIds: [], hiddenPostIds: [] });
    dmThreads = [];
    dmThreadsById = new Map();
    dmMessagesByThreadId.clear();
    activeDmThreadId = null;
    pendingOpenDmThreadId = "";
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
    const t = normalizeDmThread(msg.thread);
    if (!t) return;
    upsertDmThread(t);
    if (pendingOpenDmThreadId && pendingOpenDmThreadId === t.id && String(t.status || "") === "active") {
      openDmThread(t.id);
    }
    return;
  }

  if (msg.type === "dmThreadUpdated" && msg.thread) {
    const me = String(loggedInUser || "").trim().toLowerCase();
    const a = msg.thread?.a ? normalizeDmThread(msg.thread.a) : null;
    const b = msg.thread?.b ? normalizeDmThread(msg.thread.b) : null;
    const mine = me ? [a, b].find((t) => t && String(t.other || "").toLowerCase() !== me) : a || b;
    if (mine) {
      upsertDmThread(mine);
      if (pendingOpenDmThreadId && pendingOpenDmThreadId === mine.id && String(mine.status || "") === "active") {
        openDmThread(mine.id);
      }
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

  if (msg.type === "dmModMessageReceived") {
    const threadId = String(msg.threadId || "").trim();
    if (!threadId) return;
    if (!dmThreadsById.has(threadId) && ws?.readyState === WebSocket.OPEN) {
      pendingOpenDmThreadId = threadId;
      ws.send(JSON.stringify({ type: "dmList" }));
    }
    if (isMobileScreenMode()) {
      const layout = loadMobileLayout();
      layout.active = "chat";
      saveMobileLayout(layout);
      setMobileScreen("chat");
      renderMobileNav();
    }
    if (dmThreadsById.has(threadId)) openDmThread(threadId);
    toast("Moderator message", "Opened priority moderator DM.");
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
    if (/(owner|moderator) access required/i.test(m)) {
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
    streamLiveByPostId.set(postId, Boolean(msg.post.streamLive));
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
    renderChatInstancesForPost(msg.postId);
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
    renderChatInstancesForPost(postId);
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
    renderChatInstancesForPost(postId);
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
      renderChatInstancesForPost(msg.postId);
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
    renderChatInstancesForPost(msg.postId);
  }
}

setConn("connecting");
connectWs();

renderLanHint();
writeHintsEnabledPref(readHintsEnabledPref());
initDisplayPrefsUi();
if (stayConnectedEl) {
  stayConnectedEl.checked = readStayConnectedPref();
  stayConnectedEl.addEventListener("change", () => {
    const on = Boolean(stayConnectedEl.checked);
    writeStayConnectedPref(on);
    if (on) {
      if (!ws || ws.readyState === WebSocket.CLOSED) connectWs();
      startWsKeepalive(ws);
    } else {
      clearWsReconnect();
      clearWsKeepalive();
    }
  });
}
if (enableHintsEl) {
  enableHintsEl.checked = readHintsEnabledPref();
  enableHintsEl.addEventListener("change", () => {
    writeHintsEnabledPref(Boolean(enableHintsEl.checked));
  });
}
if (chatEnterModeEl) {
  chatEnterModeEl.value = readChatEnterModePref();
  chatEnterModeEl.addEventListener("change", () => {
    writeChatEnterModePref(chatEnterModeEl.value);
  });
}
if (resetCurrentLayoutBtn) {
  resetCurrentLayoutBtn.addEventListener("click", () => {
    if (!rackLayoutEnabled) return;
    const currentPreset = String(rackLayoutState?.presetId || layoutPresetEl?.value || "defaultSocial");
    applyPreset(currentPreset);
    toast("Layout", "Current preset layout reset.");
  });
}
renderPeoplePanel();
setPeopleOpen(getPeopleOpen());
composerOpen = getComposerOpen();
setComposerOpen(composerOpen);
applySidebarWidth(readStoredSidebarWidth(), false);
applyChatWidth(readStoredChatWidth(), false);
applyModWidth(readStoredModWidth(), false);
applyPeopleWidth(readStoredPeopleWidth(), false);
applyChatDock();

if (toggleReactionsEl) {
  toggleReactionsEl.checked = showReactions;
  toggleReactionsEl.addEventListener("change", () => {
    showReactions = Boolean(toggleReactionsEl.checked);
    localStorage.setItem("bzl_showReactions", showReactions ? "1" : "0");
    renderFeed();
    renderChatPanel();
  });
}

if (hivesViewModeEl) {
  const pref = readStringPref(HIVES_VIEW_MODE_KEY, "auto");
  hivesViewModeEl.value = pref === "cards" || pref === "list" ? pref : "auto";
  hivesViewModeEl.addEventListener("change", () => {
    const next = String(hivesViewModeEl.value || "auto").toLowerCase();
    writeStringPref(HIVES_VIEW_MODE_KEY, next === "cards" || next === "list" ? next : "auto");
    applyHivesViewMode();
  });
}
installHivesAutoViewMode();
applyHivesViewMode();
updateMobileSortCycleLabel();

if (chatHeaderEl && appRoot) {
  chatHeaderEl.setAttribute("draggable", "true");
  chatHeaderEl.title = "Drag left/right to dock chat";
  chatHeaderEl.addEventListener("dragstart", (e) => {
    try {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", "bzl:dock:chat");
    } catch {
      // ignore
    }
    appRoot.classList.add("isDocking");
  });
  chatHeaderEl.addEventListener("dragend", () => {
    appRoot.classList.remove("isDocking");
  });
  appRoot.addEventListener("dragover", (e) => {
    if (!appRoot.classList.contains("isDocking")) return;
    e.preventDefault();
    try {
      e.dataTransfer.dropEffect = "move";
    } catch {
      // ignore
    }
  });
  appRoot.addEventListener("drop", (e) => {
    if (!appRoot.classList.contains("isDocking")) return;
    e.preventDefault();
    appRoot.classList.remove("isDocking");
    const next = e.clientX > window.innerWidth * 0.58 ? "right" : "left";
    if (next === chatDock) return;
    chatDock = next;
    localStorage.setItem("bzl_chatDock", chatDock);
    applyChatDock();
  });
}

installDropUpload(editor, { allowImages: true, allowAudio: true });
installDropUpload(chatEditor, { allowImages: true, allowAudio: true });
installDropUpload(profileBioEditor, { allowImages: true, allowAudio: true });
installDropUpload(editModalEditor, { allowImages: true, allowAudio: true });

mediaModal?.addEventListener("click", (e) => {
  if (e.target?.getAttribute?.("data-mediamodalclose")) setMediaModalOpen(false);
});
mediaModalClose?.addEventListener("click", () => setMediaModalOpen(false));
mediaModalCopyLink?.addEventListener("click", async () => {
  const url = String(mediaModalOpenLink?.href || "").trim();
  if (!url || url === "#") return;
  try {
    await navigator.clipboard.writeText(url);
    if (mediaModalStatus) mediaModalStatus.textContent = "Copied.";
  } catch {
    if (mediaModalStatus) mediaModalStatus.textContent = "Copy failed (clipboard blocked).";
  }
});
shortcutHelpModal?.addEventListener("click", (e) => {
  if (e.target?.getAttribute?.("data-shortcutclose")) setShortcutHelpOpen(false);
});
shortcutHelpCloseBtn?.addEventListener("click", () => setShortcutHelpOpen(false));
openShortcutHelpBtn?.addEventListener("click", () => setShortcutHelpOpen(true));
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (mediaModal && !mediaModal.classList.contains("hidden")) {
    setMediaModalOpen(false);
    return;
  }
  if (shortcutHelpModal && !shortcutHelpModal.classList.contains("hidden")) setShortcutHelpOpen(false);
});
document.body.addEventListener("click", (e) => {
  const img = e.target?.closest?.("img");
  if (!img) return;
  if (img.id === "profilePreview") return;
  if (img.closest("#mediaModal")) return;
  const inAllowed =
    img.closest(".chatMsg .content") ||
    img.closest(".profileBio") ||
    img.closest(".profileCard") ||
    img.closest(".editor") ||
    img.closest("#editModalEditor");
  if (!inAllowed) return;
  const src = img.getAttribute("src") || "";
  if (!src) return;
  openMediaModal(src);
});

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
  const modDmBtn = e.target.closest("button[data-moddm]");
  if (modDmBtn) {
    sendModDmPrompt(modDmBtn.getAttribute("data-moddm") || "");
    return;
  }
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
  const modDmBtn = e.target.closest("button[data-moddm]");
  if (modDmBtn) {
    sendModDmPrompt(modDmBtn.getAttribute("data-moddm") || "");
    return;
  }
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
    pendingOpenDmThreadId = threadId;
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

onboardingAcceptBtn?.addEventListener("click", () => {
  if (!loggedInUser) {
    toast("Sign in required", "Sign in to accept server rules.");
    return;
  }
  ws.send(JSON.stringify({ type: "onboardingAcceptRules" }));
});

onboardingRefreshBtn?.addEventListener("click", () => {
  if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "onboardingGet" }));
});

onboardingPanelAcceptBtn?.addEventListener("click", () => {
  if (!loggedInUser) {
    toast("Sign in required", "Sign in to accept server rules.");
    return;
  }
  ws.send(JSON.stringify({ type: "onboardingAcceptRules" }));
});

onboardingPanelRefreshBtn?.addEventListener("click", () => {
  if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "onboardingGet" }));
});

onboardingPanelBodyEl?.addEventListener("click", (e) => {
  const tabBtn = e.target.closest?.("button[data-onbtab]");
  if (!tabBtn) return;
  const tab = String(tabBtn.getAttribute("data-onbtab") || "about").trim();
  if (!["about", "rules", "roles"].includes(tab)) return;
  onboardingViewerTab = tab;
  renderOnboardingPanel();
});

profileCard?.addEventListener("click", (e) => {
  const modDmBtn = e.target.closest("button[data-moddm]");
  if (modDmBtn) {
    sendModDmPrompt(modDmBtn.getAttribute("data-moddm") || "");
    return;
  }
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
mobileNavEl?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-mobilescreen]");
  if (!btn) return;
  const id = String(btn.getAttribute("data-mobilescreen") || "").trim();
  if (!id) return;
  if (id === "more") {
    renderMobileMoreList();
    setMobileMoreOpen(true);
    return;
  }
  const layout = loadMobileLayout();
  layout.active = id;
  saveMobileLayout(layout);
  setMobileScreen(id);
  renderMobileNav();
});

function renderMobileMoreList() {
  if (!(mobileMoreListEl instanceof HTMLElement)) return;
  const q = String(mobileMoreSearchEl?.value || "").trim().toLowerCase();
  const { core, plugins } = availableMobileScreens();

  const filter = (item) => {
    if (!q) return true;
    return String(item.title || "").toLowerCase().includes(q) || String(item.id || "").toLowerCase().includes(q);
  };

  const section = (title, items) => {
    const wrap = document.createElement("div");
    const head = document.createElement("div");
    head.className = "muted small";
    head.textContent = title;
    head.style.margin = "6px 0 6px 2px";
    wrap.appendChild(head);
    const list = document.createElement("div");
    list.style.display = "flex";
    list.style.flexDirection = "column";
    list.style.gap = "10px";
    for (const it of items.filter(filter)) {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "mobileMoreItem";
      row.innerHTML = `<span>${escapeHtml(it.title || it.id)}</span><span class="muted small">${escapeHtml(it.core ? "core" : "plugin")}</span>`;
      row.onclick = () => {
        const layout = loadMobileLayout();
        layout.active = it.id;
        saveMobileLayout(layout);
        setMobileScreen(it.id);
        renderMobileNav();
        setMobileMoreOpen(false);
      };
      list.appendChild(row);
    }
    wrap.appendChild(list);
    return wrap;
  };

  mobileMoreListEl.innerHTML = "";
  mobileMoreListEl.appendChild(section("Core", core));
  if (plugins.length) mobileMoreListEl.appendChild(section("Plugins", plugins));
}

mobileMoreSearchEl?.addEventListener("input", () => {
  if (!mobileMoreOpen) return;
  renderMobileMoreList();
});

mobileMoreCloseBtn?.addEventListener("click", () => setMobileMoreOpen(false));
mobileMoreSheetEl?.addEventListener("click", (e) => {
  const target = e.target;
  if (!target) return;
  if (target.closest?.("[data-mobilemoreclose]")) setMobileMoreOpen(false);
});

streamStagePrimaryBtn?.addEventListener("click", () => {
  const post = streamStageCurrentPost();
  if (!post) return;
  const postId = String(post.id || "");
  if (!postId) return;
  if (streamCurrentRole === "host" && streamCurrentPostId === postId) {
    leaveActiveStream(true);
    renderChatPanel(false);
    return;
  }
  if (streamCurrentRole === "viewer" && streamCurrentPostId === postId) {
    leaveActiveStream(true);
    renderChatPanel(false);
    return;
  }
  const live = Boolean(streamLiveByPostId.get(postId) ?? post.streamLive);
  if (live) joinStream(post);
  else startStreamHost(post);
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

// Initialize experimental rack layout (safe no-op when disabled).
initRackLayout();

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
