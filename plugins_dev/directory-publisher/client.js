window.BzlPluginHost.register("directory-publisher", (ctx) => {
  ctx.devLog("info", "directory-publisher client loaded");

  let mountEl = null;
  let config = null;
  let lastResult = null;

  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (k === "className") node.className = String(v || "");
      else if (k === "text") node.textContent = String(v ?? "");
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v === false || v == null) continue;
      else node.setAttribute(k, String(v));
    }
    for (const c of children) node.appendChild(c);
    return node;
  };

  const safe = (v) => String(v ?? "");

  function render() {
    if (!mountEl) return;
    mountEl.innerHTML = "";

    const c = config && typeof config === "object" ? config : {};
    const inst = c.instance && typeof c.instance === "object" ? c.instance : {};

    const directoryUrl = el("input", { value: safe(c.directoryUrl), placeholder: "https://chat.bzl.one" });
    const token = el("input", { value: safe(c.token), placeholder: "Directory token (shared secret)" });

    const id = el("input", { value: safe(inst.id), placeholder: "instance id (e.g. temple)" });
    const url = el("input", { value: safe(inst.url), placeholder: "https://your.instance" });
    const name = el("input", { value: safe(inst.name), placeholder: "Display name" });
    const description = el("input", { value: safe(inst.description), placeholder: "Short description" });
    const bzlVersion = el("input", { value: safe(inst.bzlVersion), placeholder: "bzl version (optional)" });
    const requiresReg = el("input", { type: "checkbox", checked: inst.requiresRegistrationCode ? "checked" : null });

    const statusText =
      lastResult && typeof lastResult === "object"
        ? lastResult.ok
          ? `Published (HTTP ${lastResult.status || 200})`
          : `Publish failed: ${safe(lastResult.error || lastResult.body || `HTTP ${lastResult.status || 0}`)}`
        : "";

    const status = statusText ? el("div", { className: lastResult?.ok ? "good small" : "bad small", text: statusText, style: "margin-top:10px" }) : null;

    const saveBtn = el("button", {
      type: "button",
      className: "primary",
      text: "Save",
      onclick: () => {
        ctx.send("setConfig", {
          config: {
            directoryUrl: safe(directoryUrl.value).trim(),
            token: safe(token.value).trim(),
            instance: {
              id: safe(id.value).trim(),
              url: safe(url.value).trim(),
              name: safe(name.value).trim(),
              description: safe(description.value).trim(),
              bzlVersion: safe(bzlVersion.value).trim(),
              requiresRegistrationCode: Boolean(requiresReg.checked),
            },
          },
        });
      },
    });

    const publishBtn = el("button", { type: "button", className: "ghost", text: "Publish now", onclick: () => ctx.send("publishNow", {}) });

    mountEl.appendChild(
      el("div", { className: "panel", style: "padding:12px" }, [
        el("div", { text: "Directory publisher", style: "font-weight:700; margin-bottom:8px" }),
        el("div", { className: "muted small", text: "Announces this instance to a directory (owner-only)." }),
        el("div", { className: "row", style: "gap:10px; margin-top:10px" }, [
          el("label", { style: "flex:1" }, [el("span", { className: "muted small", text: "Directory URL" }), directoryUrl]),
        ]),
        el("div", { className: "row", style: "gap:10px; margin-top:10px" }, [el("label", { style: "flex:1" }, [el("span", { className: "muted small", text: "Token" }), token])] ),
        el("div", { className: "muted small", text: "Instance metadata", style: "margin-top:14px" }),
        el("div", { className: "row", style: "gap:10px; margin-top:8px" }, [
          el("label", { style: "flex:1" }, [el("span", { className: "muted small", text: "Instance id" }), id]),
          el("label", { style: "flex:1" }, [el("span", { className: "muted small", text: "Instance URL" }), url]),
        ]),
        el("div", { className: "row", style: "gap:10px; margin-top:10px" }, [
          el("label", { style: "flex:1" }, [el("span", { className: "muted small", text: "Name" }), name]),
          el("label", { style: "flex:1" }, [el("span", { className: "muted small", text: "Bzl version" }), bzlVersion]),
        ]),
        el("div", { className: "row", style: "gap:10px; margin-top:10px" }, [el("label", { style: "flex:1" }, [el("span", { className: "muted small", text: "Description" }), description])] ),
        el("label", { className: "row small", style: "gap:10px; align-items:center; margin-top:10px" }, [requiresReg, el("span", { text: "Requires registration code" })]),
        el("div", { className: "row", style: "gap:10px; margin-top:14px" }, [saveBtn, publishBtn]),
        ...(status ? [status] : []),
      ])
    );
  }

  ctx.on("config", (msg) => {
    config = msg?.config || null;
    render();
  });
  ctx.on("configSaved", () => {
    ctx.toast("Saved", "Directory publisher config saved.");
  });
  ctx.on("result", (msg) => {
    lastResult = msg || null;
    render();
  });

  ctx.ui.registerModTab({
    id: "directory",
    title: "Directory publish",
    ownerOnly: true,
    render(mount) {
      mountEl = mount;
      render();
      ctx.send("getConfig", {});
    },
  });
});
