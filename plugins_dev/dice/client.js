(() => {
  if (!window?.BzlPluginHost?.register) return;

  const PLUGIN_ID = "dice";

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeJsonParse(str) {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  }

  function fmtTime(t) {
    try {
      return new Date(Number(t || Date.now())).toLocaleTimeString();
    } catch {
      return "";
    }
  }

  window.BzlPluginHost.register(PLUGIN_ID, (ctx) => {
    const ws = window.__bzlWs;
    let mountEl = null;
    let inputEl = null;
    let rollBtnEl = null;
    let listEl = null;
    let errEl = null;
    let history = [];

    function setError(msg) {
      if (!errEl) return;
      errEl.textContent = String(msg || "");
      errEl.classList.toggle("hidden", !errEl.textContent);
    }

    function renderList() {
      if (!listEl) return;
      if (!history.length) {
        listEl.innerHTML = `<div class="small muted" style="padding:10px">No rolls yet.</div>`;
        return;
      }
      const rows = history
        .slice()
        .reverse()
        .slice(0, 60)
        .map((r) => {
          const rolls = Array.isArray(r.rolls) ? r.rolls.join(", ") : "";
          return `<div class="diceRow">
            <div class="diceTop">
              <span class="diceUser">@${esc(r.user || "unknown")}</span>
              <span class="muted">•</span>
              <span class="diceExpr">${esc(r.expr || "")}</span>
              <span class="muted">•</span>
              <span class="muted">${esc(fmtTime(r.createdAt))}</span>
            </div>
            <div class="diceBottom">
              <span class="muted">rolls:</span> <span>${esc(rolls)}</span>
              <span class="muted">→</span>
              <span class="diceTotal">total: ${esc(String(r.total))}</span>
            </div>
          </div>`;
        })
        .join("");
      listEl.innerHTML = rows;
    }

    function doRoll() {
      const expr = String(inputEl?.value || "").trim();
      if (!expr) return;
      setError("");
      ctx.send("roll", { expr });
    }

    function ensureUi() {
      if (!mountEl) return;
      mountEl.innerHTML = `
        <style>
          .diceWrap { display:flex; flex-direction:column; gap:10px; }
          .diceControls { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
          .diceControls input { flex: 1; min-width: 140px; }
          .diceErr { color: color-mix(in srgb, var(--bad) 80%, var(--text)); }
          .diceList { max-height: 340px; overflow:auto; border:1px solid rgba(246,240,255,0.10); border-radius:12px; }
          .diceRow { padding:10px 12px; border-bottom:1px solid rgba(246,240,255,0.06); }
          .diceRow:last-child { border-bottom:0; }
          .diceTop { display:flex; gap:8px; flex-wrap:wrap; align-items:baseline; }
          .diceBottom { display:flex; gap:8px; flex-wrap:wrap; margin-top:4px; }
          .diceUser { font-weight: 900; }
          .diceExpr { font-weight: 900; letter-spacing: 0.2px; }
          .diceTotal { font-weight: 900; color: color-mix(in srgb, var(--warn) 70%, var(--text)); }
        </style>
        <div class="diceWrap">
          <div class="diceControls">
            <input type="text" maxlength="40" placeholder="XdY+Z (e.g. 2d6+1, d20, 4d8-2)" data-diceexpr="1" />
            <button type="button" class="primary smallBtn" data-diceroll="1">Roll</button>
          </div>
          <div class="small muted">Rolls are server-generated and broadcast to everyone.</div>
          <div class="small diceErr hidden" data-diceerr="1"></div>
          <div class="diceList" data-dicelist="1"></div>
        </div>
      `;
      inputEl = mountEl.querySelector("[data-diceexpr='1']");
      rollBtnEl = mountEl.querySelector("[data-diceroll='1']");
      listEl = mountEl.querySelector("[data-dicelist='1']");
      errEl = mountEl.querySelector("[data-diceerr='1']");

      if (rollBtnEl) rollBtnEl.addEventListener("click", doRoll);
      if (inputEl) {
        inputEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            doRoll();
          }
        });
      }
      renderList();
    }

    function onWsMessage(evt) {
      const msg = safeJsonParse(evt.data);
      if (!msg || typeof msg !== "object") return;
      const type = String(msg.type || "");
      if (type === "plugin:dice:history") {
        history = Array.isArray(msg.history) ? msg.history : [];
        renderList();
        return;
      }
      if (type === "plugin:dice:rolled") {
        if (msg.roll && typeof msg.roll === "object") {
          history = [...history, msg.roll].slice(-120);
          renderList();
        }
        return;
      }
      if (type === "plugin:dice:error") {
        setError(String(msg.message || "Error."));
      }
    }

    ctx.ui?.registerPanel?.({
      id: "dice",
      title: "Dice",
      icon: "🎲",
      defaultRack: "right",
      role: "utility",
      presetHints: {
        defaultSocial: { place: "docked.bottom" },
        ops: { place: "docked.bottom" }
      },
      render(mount) {
        mountEl = mount;
        history = [];
        ensureUi();
        if (ws && ws.addEventListener) ws.addEventListener("message", onWsMessage);
        ctx.send("stateReq", {});
        return () => {
          if (ws && ws.removeEventListener) ws.removeEventListener("message", onWsMessage);
          mountEl = null;
        };
      }
    });
  });
})();

