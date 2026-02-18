window.BzlPluginHost.register("directory-server", (ctx) => {
  ctx.devLog("info", "directory-server client loaded");

  const pluginId = ctx.id;
  const apiBase = `/api/plugins/${encodeURIComponent(pluginId)}`;

  let panelMount = null;
  let modMount = null;
  let lastList = [];
  let lastConfig = null;
  let lastEntries = [];

  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (k === "className") node.className = String(v || "");
      else if (k === "text") node.textContent = String(v ?? "");
      else if (k === "html") node.innerHTML = String(v ?? "");
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v === false || v == null) continue;
      else node.setAttribute(k, String(v));
    }
    for (const c of children) node.appendChild(c);
    return node;
  };

  const fmtTime = (t) => {
    const n = Number(t || 0);
    if (!n) return "-";
    try {
      return new Date(n).toLocaleString();
    } catch {
      return String(n);
    }
  };

  const getHost = (rawUrl) => {
    try {
      return new URL(String(rawUrl || "")).hostname || "";
    } catch {
      return "";
    }
  };

  async function loadPublicList() {
    try {
      const r = await fetch(`${apiBase}/list`, { cache: "no-store" });
      const j = await r.json();
      if (!j?.ok) throw new Error(j?.error || "Failed to load list");
      lastList = Array.isArray(j.entries) ? j.entries : [];
    } catch (e) {
      ctx.devLog("warn", "directory list fetch failed", { error: e?.message || String(e) });
      lastList = [];
    }
    renderDirectoryPanel();
  }

  function renderDirectoryPanel() {
    if (!panelMount) return;
    panelMount.innerHTML = "";

    const top = el("div", { className: "row", style: "justify-content:space-between; align-items:center; gap:10px; margin-bottom:10px" }, [
      el("div", { className: "row", style: "gap:10px; align-items:center" }, [
        el("div", { text: "Directory", style: "font-weight:700" }),
        el("div", { className: "muted small", text: `${lastList.length} instance${lastList.length === 1 ? "" : "s"}` }),
      ]),
      el("div", { className: "row", style: "gap:8px; align-items:center" }, [
        el("button", {
          type: "button",
          className: "ghost",
          text: "Refresh",
          onclick: () => loadPublicList(),
        }),
      ]),
    ]);

    const list = el("div", { style: "display:flex; flex-direction:column; gap:10px" });
    if (!lastList.length) {
      list.appendChild(el("div", { className: "muted", text: "No directory entries yet." }));
    } else {
      for (const entry of lastList) {
        const inst = entry?.instance || {};
        const name = String(inst.name || inst.id || "Instance").slice(0, 80);
        const url = String(inst.url || "");
        const desc = String(inst.description || "").slice(0, 240);
        const hives = Array.isArray(entry?.publicHives) ? entry.publicHives : [];

        const card = el("div", { className: "panel", style: "padding:12px" });
        card.appendChild(
          el("div", { className: "row", style: "justify-content:space-between; gap:10px; align-items:flex-start" }, [
            el("div", {}, [
              el("div", { text: name, style: "font-weight:700; margin-bottom:2px" }),
              el("div", { className: "muted small", text: url }),
            ]),
            el("a", { className: "ghost smallBtn", href: url || "#", target: "_blank", rel: "noreferrer", text: "Open" }),
          ])
        );
        if (desc) card.appendChild(el("div", { className: "small", text: desc, style: "margin-top:8px" }));
        card.appendChild(el("div", { className: "muted small", text: `Last seen: ${fmtTime(entry?.lastSeenAt)}`, style: "margin-top:8px" }));

        if (hives.length) {
          const ul = el("ul", { style: "margin:8px 0 0 18px" });
          for (const h of hives.slice(0, 10)) {
            const li = el("li", { className: "small" });
            const a = el("a", { href: String(h?.url || "#"), target: "_blank", rel: "noreferrer", text: String(h?.title || "Hive") });
            li.appendChild(a);
            const hd = String(h?.description || "").trim();
            if (hd) li.appendChild(el("span", { className: "muted", text: ` — ${hd}` }));
            ul.appendChild(li);
          }
          card.appendChild(el("div", { className: "muted small", text: "Public hives:", style: "margin-top:10px" }));
          card.appendChild(ul);
        }

        list.appendChild(card);
      }
    }

    panelMount.appendChild(top);
    panelMount.appendChild(list);
  }

  function renderMod() {
    if (!modMount) return;
    modMount.innerHTML = "";

    const tokenSet = Boolean(lastConfig?.tokenSet);
    const hiddenIds = Array.isArray(lastConfig?.hiddenIds) ? lastConfig.hiddenIds : [];
    const blockedHosts = Array.isArray(lastConfig?.blockedHosts) ? lastConfig.blockedHosts : [];

    const tokenInput = el("input", {
      placeholder: tokenSet ? "Token is set (enter to replace)" : "Set directory token (shared secret)",
      style: "flex:1",
    });
    const saveBtn = el("button", {
      type: "button",
      className: "primary",
      text: "Save token",
      onclick: () => {
        const token = String(tokenInput.value || "").trim();
        ctx.send("setToken", { token });
        tokenInput.value = "";
      },
    });

    modMount.appendChild(
      el("div", { className: "panel", style: "padding:12px; margin-bottom:12px" }, [
        el("div", { className: "row", style: "justify-content:space-between; align-items:center; gap:10px" }, [
          el("div", {}, [el("div", { text: "Directory settings", style: "font-weight:700" }), el("div", { className: "muted small", text: tokenSet ? "Token: set" : "Token: not set" })]),
          el("button", { type: "button", className: "ghost", text: "Refresh", onclick: () => ctx.send("getConfig", {}) }),
        ]),
        el("div", { className: "row", style: "gap:10px; margin-top:10px" }, [tokenInput, saveBtn]),
      ])
    );

    const blockedWrap = el("div", { className: "panel", style: "padding:12px; margin-bottom:12px" });
    blockedWrap.appendChild(el("div", { text: "Blocked hosts", style: "font-weight:700; margin-bottom:6px" }));
    if (!blockedHosts.length) blockedWrap.appendChild(el("div", { className: "muted small", text: "None." }));
    else {
      const ul = el("ul", { style: "margin:0 0 0 18px" });
      for (const host of blockedHosts.slice(0, 200)) {
        const li = el("li", { className: "small" });
        li.appendChild(el("span", { text: host }));
        li.appendChild(
          el("button", {
            type: "button",
            className: "ghost smallBtn",
            text: "Unblock",
            style: "margin-left:10px",
            onclick: () => ctx.send("setBlockedHost", { host, blocked: false }),
          })
        );
        ul.appendChild(li);
      }
      blockedWrap.appendChild(ul);
    }
    modMount.appendChild(blockedWrap);

    const entriesWrap = el("div", { className: "panel", style: "padding:12px" });
    entriesWrap.appendChild(
      el("div", { className: "row", style: "justify-content:space-between; align-items:center; gap:10px; margin-bottom:8px" }, [
        el("div", { text: "Entries", style: "font-weight:700" }),
        el("button", { type: "button", className: "ghost", text: "Refresh", onclick: () => ctx.send("getEntries", {}) }),
      ])
    );

    if (!lastEntries.length) {
      entriesWrap.appendChild(el("div", { className: "muted small", text: "No entries yet." }));
    } else {
      const list = el("div", { style: "display:flex; flex-direction:column; gap:10px" });
      for (const entry of lastEntries) {
        const inst = entry?.instance || {};
        const id = String(inst.id || "").trim().toLowerCase();
        const name = String(inst.name || inst.id || "Instance").slice(0, 60);
        const url = String(inst.url || "");
        const host = getHost(url).toLowerCase();
        const isHidden = Boolean(id && hiddenIds.includes(id));
        const isBlocked = Boolean(host && blockedHosts.includes(host));

        const row = el("div", { className: "row", style: "gap:10px; align-items:flex-start; justify-content:space-between" });
        const left = el("div", { style: "flex:1; min-width:0" }, [
          el("div", { text: name, style: "font-weight:700" }),
          el("div", { className: "muted small", text: url }),
          el("div", { className: "muted small", text: `Last seen: ${fmtTime(entry?.lastSeenAt)}` }),
        ]);

        const controls = el("div", { className: "row", style: "gap:8px; align-items:center; flex-wrap:wrap; justify-content:flex-end" });
        const hideCb = el("input", {
          type: "checkbox",
          checked: isHidden ? "checked" : null,
          onchange: (e) => ctx.send("setHidden", { id, hidden: Boolean(e?.target?.checked) }),
        });
        controls.appendChild(el("label", { className: "row small", style: "gap:8px; align-items:center" }, [hideCb, el("span", { text: "Hide" })]));
        if (host) {
          controls.appendChild(
            el("button", {
              type: "button",
              className: "ghost",
              text: isBlocked ? "Blocked" : "Block host",
              onclick: () => ctx.send("setBlockedHost", { host, blocked: true }),
              disabled: isBlocked ? "disabled" : null,
            })
          );
        }
        controls.appendChild(
          el("button", {
            type: "button",
            className: "ghost",
            text: "Delete",
            onclick: () => {
              if (!confirm(`Delete entry "${name}"?`)) return;
              ctx.send("deleteEntry", { id });
            },
          })
        );

        row.appendChild(left);
        row.appendChild(controls);
        list.appendChild(el("div", { style: "border-top:1px solid rgba(255,255,255,0.06); padding-top:10px" }, [row]));
      }
      entriesWrap.appendChild(list);
    }

    modMount.appendChild(entriesWrap);
  }

  ctx.on("updated", () => {
    loadPublicList();
    if (ctx.getRole() === "owner") ctx.send("getEntries", {});
  });
  ctx.on("config", (msg) => {
    lastConfig = msg && typeof msg === "object" ? msg : null;
    renderMod();
  });
  ctx.on("entries", (msg) => {
    lastEntries = Array.isArray(msg?.entries) ? msg.entries : [];
    renderMod();
  });
  ctx.on("configUpdated", () => {
    if (ctx.getRole() === "owner") {
      ctx.send("getConfig", {});
      ctx.send("getEntries", {});
    }
  });

  ctx.ui.registerPanel({
    id: "directory",
    title: "Directory",
    icon: "📡",
    defaultRack: "main",
    role: "primary",
    render(mount) {
      panelMount = mount;
      loadPublicList();
      return () => {
        if (panelMount === mount) panelMount = null;
      };
    },
  });

  ctx.ui.registerModTab({
    id: "directory",
    title: "Directory feed",
    ownerOnly: true,
    render(mount) {
      modMount = mount;
      renderMod();
      ctx.send("getConfig", {});
      ctx.send("getEntries", {});
    },
  });
});
