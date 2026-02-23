(() => {
  if (!window?.BzlPluginHost?.register) return;

  const BRIDGE_VERSION = "bzl.godot.v1";
  const STORAGE_SOURCE_KEY = "source_path";
  const FALLBACK_PLUGIN_ID = "godot";

  function detectPluginIdFromScript() {
    try {
      const src = String(document.currentScript?.src || "");
      if (!src) return FALLBACK_PLUGIN_ID;
      const url = new URL(src, window.location.origin);
      const m = url.pathname.match(/^\/plugins\/([a-z0-9][a-z0-9_.-]{0,31})\//i);
      if (m && m[1]) return String(m[1]).toLowerCase();
    } catch {
      // ignore
    }
    return FALLBACK_PLUGIN_ID;
  }

  const PLUGIN_ID = detectPluginIdFromScript();

  function defaultBundledPath(pluginId) {
    const id = String(pluginId || FALLBACK_PLUGIN_ID).toLowerCase();
    return `/plugins/${id}/godotapp/index.html`;
  }

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function ensureStyles() {
    if (document.getElementById("bzlGodotPanelStyle")) return;
    const style = document.createElement("style");
    style.id = "bzlGodotPanelStyle";
    style.textContent = `
      .godotWrap { display:flex; flex-direction:column; gap:10px; min-height:0; height:100%; }
      .godotControls { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
      .godotControls input[type="text"] { flex:1 1 340px; min-width:220px; }
      .godotHint { font-size:12px; color: rgba(246,240,255,0.72); }
      .godotStatus { font-size:12px; color: rgba(246,240,255,0.85); }
      .godotStatus[data-kind="bad"] { color: var(--bad, #ff4d8a); }
      .godotStatus[data-kind="good"] { color: var(--good, #3ddc97); }
      .godotViewport {
        position: relative;
        min-height: 360px;
        height: 100%;
        flex: 1 1 auto;
        border: 1px solid rgba(246,240,255,0.14);
        border-radius: 14px;
        background: linear-gradient(180deg, rgba(0,0,0,0.34), rgba(0,0,0,0.22));
        overflow: hidden;
      }
      .godotFrame {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
      }
      .godotEmpty {
        position:absolute;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:16px;
        text-align:center;
        color: rgba(246,240,255,0.7);
        font-size:13px;
      }
      .godotMeta { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
      .godotChip {
        border:1px solid rgba(246,240,255,0.16);
        border-radius:999px;
        padding:3px 9px;
        font-size:11px;
        color: rgba(246,240,255,0.78);
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeLocalPath(rawPath) {
    const raw = String(rawPath || "").trim();
    if (!raw) return { ok: false, error: "Enter a Godot export path." };
    if (/^https?:\/\//i.test(raw)) {
      return { ok: false, error: "Use a same-origin path (for example: /uploads/godot/my-game/index.html)." };
    }
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/i.test(raw)) {
      return { ok: false, error: "Only same-origin relative paths are allowed in MVP." };
    }
    const normalized = raw.startsWith("/") ? raw : `/${raw.replace(/^\/+/, "")}`;
    let url;
    try {
      url = new URL(normalized, window.location.origin);
    } catch {
      return { ok: false, error: "Invalid path." };
    }
    if (url.origin !== window.location.origin) {
      return { ok: false, error: "Only same-origin paths are allowed." };
    }
    return { ok: true, path: `${url.pathname}${url.search}${url.hash}` };
  }

  window.BzlPluginHost.register(PLUGIN_ID, (ctx) => {
    ensureStyles();
    const bundledPath = defaultBundledPath(ctx?.id || PLUGIN_ID);

    let mountEl = null;
    let panelEl = null;
    let viewportEl = null;
    let frameEl = null;
    let sourceInputEl = null;
    let statusEl = null;
    let lastEventEl = null;
    let lastVisibility = null;
    let visibilityTimer = 0;
    let visibilityObserver = null;
    let resizeObserver = null;
    let onVisibilityChange = null;
    let onWindowResize = null;
    let onMessage = null;
    let loadId = 0;
    let currentPath = "";
    let lastBridgeEvent = "";

    function setStatus(kind, message) {
      if (!statusEl) return;
      statusEl.dataset.kind = kind || "";
      statusEl.textContent = String(message || "");
    }

    function setLastEvent(text) {
      lastBridgeEvent = String(text || "");
      if (!lastEventEl) return;
      lastEventEl.textContent = lastBridgeEvent || "none";
    }

    function panelIsVisible() {
      if (!(panelEl instanceof HTMLElement)) return false;
      if (!panelEl.isConnected) return false;
      if (panelEl.classList.contains("hidden")) return false;
      if (document.visibilityState === "hidden") return false;
      const style = window.getComputedStyle(panelEl);
      if (style.display === "none" || style.visibility === "hidden") return false;
      return true;
    }

    function postBridge(eventName, payload) {
      if (!(frameEl instanceof HTMLIFrameElement)) return false;
      if (!frameEl.contentWindow) return false;
      const message = {
        type: BRIDGE_VERSION,
        event: String(eventName || ""),
        payload: payload && typeof payload === "object" ? payload : {},
        sentAt: Date.now()
      };
      frameEl.contentWindow.postMessage(message, "*");
      setLastEvent(`host->game ${message.event}`);
      return true;
    }

    function postResize() {
      if (!(viewportEl instanceof HTMLElement)) return;
      const rect = viewportEl.getBoundingClientRect();
      postBridge("host:resize", {
        width: Math.max(0, Math.round(rect.width)),
        height: Math.max(0, Math.round(rect.height))
      });
    }

    function syncLifecycle() {
      const visible = panelIsVisible();
      if (visible === lastVisibility) return;
      lastVisibility = visible;
      if (visible) {
        postBridge("host:resume", { reason: "visible" });
        setStatus("good", frameEl ? "Running." : "Ready.");
      } else {
        postBridge("host:pause", { reason: "hidden" });
        setStatus("", frameEl ? "Paused while panel is hidden." : "Ready.");
      }
    }

    function unloadFrame(reason) {
      loadId += 1;
      if (frameEl) {
        try {
          frameEl.remove();
        } catch {
          // ignore
        }
      }
      frameEl = null;
      if (viewportEl) {
        viewportEl.innerHTML = `<div class="godotEmpty">No export loaded.</div>`;
      }
      if (reason) setStatus("", reason);
      setLastEvent("none");
    }

    function loadFrame(path) {
      const targetPath = String(path || "").trim();
      if (!targetPath) {
        setStatus("bad", "Provide a path first.");
        return;
      }
      loadId += 1;
      const id = loadId;
      if (viewportEl) viewportEl.innerHTML = "";
      const frame = document.createElement("iframe");
      frame.className = "godotFrame";
      frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-pointer-lock allow-downloads");
      frame.setAttribute("allow", "fullscreen; gamepad");
      frame.setAttribute("referrerpolicy", "no-referrer");
      frame.src = targetPath;
      frame.addEventListener("load", () => {
        if (id !== loadId) return;
        setStatus("good", `Loaded ${targetPath}`);
        postBridge("host:ready", {
          user: String(ctx.getUser?.() || ""),
          role: String(ctx.getRole?.() || ""),
          plugin: PLUGIN_ID,
          bridge: BRIDGE_VERSION
        });
        postResize();
        syncLifecycle();
      });
      frame.addEventListener("error", () => {
        if (id !== loadId) return;
        setStatus("bad", "Failed to load export.");
      });
      frameEl = frame;
      viewportEl?.appendChild(frame);
      setStatus("", `Loading ${targetPath} ...`);
    }

    function buildUi(api) {
      const savedPath = String(api?.storage?.get(STORAGE_SOURCE_KEY) || "").trim();
      currentPath = savedPath || bundledPath;

      mountEl.innerHTML = `
        <div class="godotWrap">
          <div class="godotControls">
            <input type="text" data-godot-source="1" maxlength="300" placeholder="${bundledPath}" value="${esc(currentPath)}" />
            <button type="button" class="primary smallBtn" data-godot-loadbundled="1">Load Bundled App</button>
            <button type="button" class="primary smallBtn" data-godot-load="1">Load</button>
            <button type="button" class="ghost smallBtn" data-godot-reload="1">Reload</button>
            <button type="button" class="ghost smallBtn" data-godot-unload="1">Unload</button>
          </div>
          <div class="godotHint">Template mode: put your Godot HTML5 export files in <code>godotapp/</code> inside this plugin zip. Default entry: <code>${bundledPath}</code></div>
          <div class="godotMeta">
            <div class="godotStatus" data-godot-status="1">Ready.</div>
            <div class="godotChip">bridge: ${BRIDGE_VERSION}</div>
            <div class="godotChip">last event: <span data-godot-last="1">none</span></div>
          </div>
          <div class="godotViewport" data-godot-viewport="1">
            <div class="godotEmpty">No export loaded.</div>
          </div>
        </div>
      `;

      sourceInputEl = mountEl.querySelector("[data-godot-source='1']");
      statusEl = mountEl.querySelector("[data-godot-status='1']");
      lastEventEl = mountEl.querySelector("[data-godot-last='1']");
      viewportEl = mountEl.querySelector("[data-godot-viewport='1']");
      panelEl = mountEl.closest(".panel");

      const loadNow = () => {
        const normalized = normalizeLocalPath(sourceInputEl?.value);
        if (!normalized.ok) {
          setStatus("bad", normalized.error);
          return;
        }
        currentPath = normalized.path;
        api?.storage?.set(STORAGE_SOURCE_KEY, currentPath);
        loadFrame(currentPath);
      };

      mountEl.querySelector("[data-godot-load='1']")?.addEventListener("click", loadNow);
      mountEl.querySelector("[data-godot-loadbundled='1']")?.addEventListener("click", () => {
        currentPath = bundledPath;
        if (sourceInputEl) sourceInputEl.value = currentPath;
        api?.storage?.set(STORAGE_SOURCE_KEY, currentPath);
        loadFrame(currentPath);
      });
      mountEl.querySelector("[data-godot-reload='1']")?.addEventListener("click", () => {
        if (!currentPath) {
          setStatus("bad", "Load a source first.");
          return;
        }
        loadFrame(currentPath);
      });
      mountEl.querySelector("[data-godot-unload='1']")?.addEventListener("click", () => {
        unloadFrame("Unloaded.");
      });
      sourceInputEl?.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        loadNow();
      });
    }

    function bindLifecycleObservers() {
      if (!panelEl) return;
      lastVisibility = null;
      syncLifecycle();

      visibilityObserver = new MutationObserver(() => syncLifecycle());
      visibilityObserver.observe(panelEl, { attributes: true, attributeFilter: ["class", "style"] });

      onVisibilityChange = () => syncLifecycle();
      document.addEventListener("visibilitychange", onVisibilityChange);

      onWindowResize = () => {
        postResize();
        syncLifecycle();
      };
      window.addEventListener("resize", onWindowResize);

      if (window.ResizeObserver && viewportEl) {
        resizeObserver = new ResizeObserver(() => postResize());
        resizeObserver.observe(viewportEl);
      }

      visibilityTimer = window.setInterval(syncLifecycle, 900);
    }

    function bindMessageBridge() {
      onMessage = (evt) => {
        if (!(frameEl instanceof HTMLIFrameElement)) return;
        if (evt.source !== frameEl.contentWindow) return;
        const msg = evt.data;
        if (!msg || typeof msg !== "object") return;
        if (String(msg.type || "") !== BRIDGE_VERSION) return;
        const ev = String(msg.event || "");
        const payload = msg.payload && typeof msg.payload === "object" ? msg.payload : {};
        setLastEvent(`game->host ${ev || "unknown"}`);

        if (ev === "ready") {
          setStatus("good", "Game reported ready.");
          postResize();
          return;
        }
        if (ev === "error") {
          const detail = String(payload.message || payload.code || "unknown error");
          setStatus("bad", `Game error: ${detail}`);
          return;
        }
        if (ev === "state") {
          const status = String(payload.status || "state");
          setStatus("", `State: ${status}`);
          return;
        }
      };
      window.addEventListener("message", onMessage);
    }

    ctx.ui?.registerPanel?.({
      id: "godot",
      title: "Godot",
      icon: "G",
      defaultRack: "main",
      role: "primary",
      presetHints: {
        defaultSocial: { place: "docked.bottom" },
        mapsSession: { place: "docked.bottom" }
      },
      render(mount, api) {
        mountEl = mount;
        buildUi(api);
        bindLifecycleObservers();
        bindMessageBridge();

        loadFrame(currentPath || bundledPath);

        return () => {
          if (visibilityTimer) window.clearInterval(visibilityTimer);
          visibilityTimer = 0;
          try {
            visibilityObserver?.disconnect();
          } catch {
            // ignore
          }
          try {
            resizeObserver?.disconnect();
          } catch {
            // ignore
          }
          if (onVisibilityChange) document.removeEventListener("visibilitychange", onVisibilityChange);
          if (onWindowResize) window.removeEventListener("resize", onWindowResize);
          if (onMessage) window.removeEventListener("message", onMessage);
          unloadFrame("");
          mountEl = null;
          panelEl = null;
          viewportEl = null;
          sourceInputEl = null;
          statusEl = null;
          lastEventEl = null;
          visibilityObserver = null;
          resizeObserver = null;
          onVisibilityChange = null;
          onWindowResize = null;
          onMessage = null;
        };
      }
    });
  });
})();
