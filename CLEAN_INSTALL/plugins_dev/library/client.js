(function () {
  const PLUGIN_ID = "library";

  const PDF_CHUNK_BYTES = 256 * 1024;
  const TEXT_FILE_MAX_BYTES = 512 * 1024; // mirrors server default

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatBytes(n) {
    const v = Number(n || 0);
    if (!Number.isFinite(v) || v <= 0) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    let idx = 0;
    let x = v;
    while (x >= 1024 && idx < units.length - 1) {
      x /= 1024;
      idx += 1;
    }
    return `${x.toFixed(idx === 0 ? 0 : 1)} ${units[idx]}`;
  }

  function bytesToBase64(bytes) {
    let bin = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      // eslint-disable-next-line prefer-spread
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function sanitizeFilenameBase(name) {
    return String(name || "book")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^[-.]+|[-.]+$/g, "")
      .slice(0, 80);
  }

  function paginateText(text, opts = {}) {
    const maxLines = Number(opts.maxLines || 42);
    const maxChars = Number(opts.maxChars || 2200);
    const raw = String(text || "").replace(/\r\n/g, "\n");
    const lines = raw.split("\n");

    const pages = [];
    let buf = "";
    let lineCount = 0;

    const flush = () => {
      pages.push(buf);
      buf = "";
      lineCount = 0;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineWithNl = i === lines.length - 1 ? line : `${line}\n`;

      if (lineWithNl.length > maxChars) {
        let remaining = lineWithNl;
        while (remaining.length) {
          const take = remaining.slice(0, maxChars);
          remaining = remaining.slice(maxChars);
          if (buf && (buf.length + take.length > maxChars || lineCount >= maxLines)) flush();
          buf += take;
          lineCount += 1;
          if (buf.length >= maxChars || lineCount >= maxLines) flush();
        }
        continue;
      }

      if (buf && (buf.length + lineWithNl.length > maxChars || lineCount + 1 > maxLines)) flush();
      buf += lineWithNl;
      lineCount += 1;
    }

    if (buf || !pages.length) pages.push(buf);
    return pages;
  }

  function ensureStyles() {
    if (document.getElementById("bzlLibraryStyle")) return;
    const el = document.createElement("style");
    el.id = "bzlLibraryStyle";
    el.textContent = `
      .bzlLibraryToggle {
        position: fixed; right: 18px; bottom: 18px; z-index: 9998;
        padding: 10px 14px; border-radius: 999px;
        background: linear-gradient(180deg, rgba(255,140,0,0.95), rgba(255,80,160,0.95));
        color: #1b0a12; border: 0; cursor: pointer; font-weight: 700;
        box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      }
      .bzlLibraryPanel {
        position: fixed; z-index: 9999;
        left: 18px; top: 18px;
        width: min(560px, calc(100vw - 36px));
        height: min(74vh, 760px);
        max-width: calc(100vw - 36px);
        max-height: calc(100vh - 36px);
        overflow: hidden;
        border-radius: 16px;
        background: rgba(20, 12, 18, 0.92);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 22px 70px rgba(0,0,0,0.55);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
      }
      .bzlLibraryHeader {
        display: flex; align-items: center; justify-content: space-between;
        gap: 10px; padding: 12px 12px 10px 12px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }
      .bzlLibraryTitle {
        font-weight: 800;
        cursor: move;
        user-select: none;
        -webkit-user-select: none;
        touch-action: none;
      }
      .bzlLibraryBody { padding: 12px; overflow: auto; flex: 1 1 auto; min-height: 0; }
      .bzlLibraryRow { display:flex; gap: 10px; align-items:center; flex-wrap: wrap; margin-bottom: 10px; }
      .bzlLibraryRow input[type="text"], .bzlLibraryRow input[type="number"], .bzlLibraryRow textarea {
        background: rgba(255,255,255,0.08); color: #f6e8f0;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 10px; padding: 8px 10px;
      }
      .bzlLibraryBtn {
        border-radius: 999px; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.06); color: #f6e8f0; cursor: pointer;
      }
      .bzlLibraryBtn.primary {
        background: linear-gradient(180deg, rgba(255,140,0,0.95), rgba(255,80,160,0.95));
        color: #1b0a12; border: 0; font-weight: 800;
      }
      .bzlLibraryTabs { display:flex; gap: 8px; align-items:center; }
      .bzlLibraryList { display:flex; flex-direction: column; gap: 10px; }
      .bzlLibraryItem {
        border: 1px solid rgba(255,255,255,0.10);
        background: rgba(255,255,255,0.04);
        border-radius: 12px; padding: 10px;
        display:flex; align-items:flex-start; justify-content: space-between; gap: 10px;
      }
      .bzlLibraryMeta { opacity: 0.8; font-size: 12px; margin-top: 4px; }
      .bzlLibraryViewer { display:flex; flex-direction: column; gap: 10px; height: 100%; }
      .bzlLibraryDocWrap { flex: 1 1 auto; min-height: 240px; min-width: 0; }
      .bzlLibraryFrame {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 12px;
        background: rgba(0,0,0,0.25);
      }
      .bzlLibraryTextPage {
        width: 100%;
        height: 100%;
        overflow: auto;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 12px;
        background: rgba(0,0,0,0.18);
        padding: 10px;
        color: #f6e8f0;
        white-space: pre-wrap;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, \"Liberation Mono\", monospace;
        font-size: 13px;
        line-height: 1.35;
      }
      .bzlLibraryResize {
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 16px;
        height: 16px;
        border-radius: 5px;
        border: 1px solid rgba(255,255,255,0.18);
        background: rgba(255,255,255,0.10);
        cursor: se-resize;
        opacity: 0.85;
      }
      .bzlLibraryResize:hover { opacity: 1; }
      .bzlLibraryHint { opacity: 0.8; font-size: 12px; margin-top: 6px; }
      .hidden { display: none !important; }
    `;
    document.head.appendChild(el);
  }

  function whenBodyReady(fn) {
    if (document.body) return fn();
    const run = () => {
      try {
        document.removeEventListener("DOMContentLoaded", run);
      } catch {
        // ignore
      }
      fn();
    };
    document.addEventListener("DOMContentLoaded", run, { once: true });
  }

  window.BzlPluginHost?.register(PLUGIN_ID, (ctx) => {
    ensureStyles();

    const PANEL_RECT_KEY = "bzlLibraryPanelRect";
    const PANEL_MIN_W = 420;
    const PANEL_MIN_H = 320;

    let panelOpen = false;
    let viewerOpen = false;
    let items = [];
    let filterKind = "all"; // all | pdf | text

    let activeItem = null; // {id, kind, ...}
    let activePage = 1;
    let totalPages = 1;
    let textPages = [""];
    let activeText = "";
    let editorOpen = false;
    let editorText = "";
    let editorTitle = "";

    let uploadingPdf = false;
    let wsAttachedTo = null;

    function readPanelRect() {
      try {
        const raw = localStorage.getItem(PANEL_RECT_KEY);
        if (!raw) return null;
        const json = JSON.parse(raw);
        const left = Number(json?.left);
        const top = Number(json?.top);
        const width = Number(json?.width);
        const height = Number(json?.height);
        if (![left, top, width, height].every((n) => Number.isFinite(n))) return null;
        return { left, top, width, height };
      } catch {
        return null;
      }
    }

    function defaultPanelRect() {
      const width = Math.min(560, Math.max(PANEL_MIN_W, window.innerWidth - 36));
      const height = Math.min(Math.floor(window.innerHeight * 0.74), 760);
      const left = Math.max(18, Math.floor(window.innerWidth - width - 18));
      const top = Math.max(18, Math.floor(window.innerHeight - height - 70));
      return { left, top, width, height };
    }

    function clampPanelRect(rect) {
      const maxW = Math.max(PANEL_MIN_W, window.innerWidth - 36);
      const maxH = Math.max(PANEL_MIN_H, window.innerHeight - 36);
      const width = Math.min(maxW, Math.max(PANEL_MIN_W, Math.floor(rect.width)));
      const height = Math.min(maxH, Math.max(PANEL_MIN_H, Math.floor(rect.height)));
      const left = Math.min(window.innerWidth - 18 - width, Math.max(18, Math.floor(rect.left)));
      const top = Math.min(window.innerHeight - 18 - height, Math.max(18, Math.floor(rect.top)));
      return { left, top, width, height };
    }

    function applyPanelRect(panel, rect) {
      const r = clampPanelRect(rect);
      panel.style.left = `${r.left}px`;
      panel.style.top = `${r.top}px`;
      panel.style.right = "";
      panel.style.bottom = "";
      panel.style.width = `${r.width}px`;
      panel.style.height = `${r.height}px`;
    }

    function savePanelRect(rect) {
      try {
        localStorage.setItem(PANEL_RECT_KEY, JSON.stringify(rect));
      } catch {
        // ignore
      }
    }

    function savePanelRectFromEl(panel) {
      const left = Number.parseFloat(panel.style.left || "0");
      const top = Number.parseFloat(panel.style.top || "0");
      const width = Number.parseFloat(panel.style.width || "0");
      const height = Number.parseFloat(panel.style.height || "0");
      if (![left, top, width, height].every((n) => Number.isFinite(n) && n > 0)) return;
      savePanelRect(clampPanelRect({ left, top, width, height }));
    }

    function setStatus(msg) {
      const el = document.getElementById("bzlLibraryStatus");
      if (el) el.textContent = String(msg || "");
    }

    function attachWsListener() {
      const ws = window.__bzlWs;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;
      if (wsAttachedTo === ws) return;
      try {
        if (wsAttachedTo) wsAttachedTo.removeEventListener("message", onWsMsg);
      } catch {
        // ignore
      }
      wsAttachedTo = ws;
      ws.addEventListener("message", onWsMsg);
    }

    function requestList() {
      ctx.send("list", {});
    }

    function requestText(id) {
      ctx.send("textGet", { id });
    }

    function isAuthor(it) {
      const me = String(ctx.getUser() || "");
      return Boolean(me) && String(it?.createdBy || "") === me;
    }

    function canDelete(it) {
      const role = String(ctx.getRole() || "");
      return role === "owner" || isAuthor(it);
    }

    function downloadTextFile(filename, text) {
      try {
        const blob = new Blob([String(text || "")], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      } catch {
        // ignore
      }
    }

    function openItem(it) {
      activeItem = it;
      activePage = 1;
      viewerOpen = true;
      editorOpen = false;
      editorText = "";
      editorTitle = "";
      activeText = "";
      textPages = [""];
      totalPages = 1;
      render();
      if (String(it.kind || "pdf") === "text") {
        requestText(it.id);
      } else {
        setPage(1);
      }
    }

    function closeViewer() {
      viewerOpen = false;
      activeItem = null;
      activePage = 1;
      totalPages = 1;
      textPages = [""];
      activeText = "";
      editorOpen = false;
      editorText = "";
      editorTitle = "";
      render();
    }

    function setPage(n) {
      if (!viewerOpen || !activeItem) return;
      const kind = String(activeItem.kind || "pdf");
      if (kind === "text") {
        const next = Math.max(1, Math.min(totalPages, Number(n || 1)));
        activePage = next;
        const pageLabel = document.getElementById("bzlLibraryPageLabel");
        if (pageLabel) pageLabel.textContent = `Page ${activePage} / ${totalPages}`;
        const inp = document.getElementById("bzlLibraryPage");
        if (inp) inp.value = String(activePage);
        const textEl = document.getElementById("bzlLibraryTextPage");
        if (textEl) textEl.textContent = textPages[activePage - 1] || "";
        return;
      }
      const next = Math.max(1, Math.min(9999, Number(n || 1)));
      activePage = next;
      const iframe = document.getElementById("bzlLibraryFrame");
      if (iframe) iframe.src = `${activeItem.url}#page=${activePage}`;
      const inp = document.getElementById("bzlLibraryPage");
      if (inp) inp.value = String(activePage);
      const pageLabel = document.getElementById("bzlLibraryPageLabel");
      if (pageLabel) pageLabel.textContent = `Page ${activePage}`;
    }

    async function uploadSelectedPdf() {
      if (uploadingPdf) return;
      attachWsListener();
      const fileEl = document.getElementById("bzlLibraryPdfFile");
      const titleEl = document.getElementById("bzlLibraryPdfTitle");
      const file = fileEl?.files?.[0];
      if (!file) return setStatus("Choose a PDF first.");
      const mime = String(file.type || "").trim().toLowerCase();
      const isPdf = /\\.pdf$/i.test(file.name || "") || mime === "application/pdf";
      if (!isPdf) return setStatus("Only PDF files are supported.");

      uploadingPdf = true;
      setStatus("Starting PDF upload...");
      window.__bzlLibraryUploadId = "";
      ctx.send("uploadStart", { filename: file.name, mime, size: file.size, title: String(titleEl?.value || "").trim() });

      const t0 = Date.now();
      while (!window.__bzlLibraryUploadId && Date.now() - t0 < 3000) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(30);
      }
      const uploadId = String(window.__bzlLibraryUploadId || "");
      if (!uploadId) {
        uploadingPdf = false;
        return setStatus("Upload failed to start.");
      }
      ctx.devLog("info", "library:uploadId", { uploadId, size: file.size });

      let sent = 0;
      for (let off = 0; off < file.size; off += PDF_CHUNK_BYTES) {
        const slice = file.slice(off, Math.min(file.size, off + PDF_CHUNK_BYTES));
        // eslint-disable-next-line no-await-in-loop
        const buf = await slice.arrayBuffer();
        const bytes = new Uint8Array(buf);
        const b64 = bytesToBase64(bytes);
        ctx.send("uploadChunk", { uploadId, data: b64 });
        sent += bytes.length;
        setStatus(`Uploading PDF... ${formatBytes(sent)} / ${formatBytes(file.size)}`);
        // eslint-disable-next-line no-await-in-loop
        await sleep(0);
      }

      ctx.send("uploadFinish", { uploadId });
      setStatus("Finalizing PDF...");
    }

    async function importTextFromFile() {
      const fileEl = document.getElementById("bzlLibraryTextFile");
      const titleEl = document.getElementById("bzlLibraryTextTitle");
      const file = fileEl?.files?.[0];
      if (!file) return setStatus("Choose a text file first.");

      const name = String(file.name || "").toLowerCase();
      const okExt = name.endsWith(".txt") || name.endsWith(".md");
      if (!okExt && String(file.type || "").toLowerCase() !== "text/plain") {
        return setStatus("Supported: .txt, .md, or text/plain.");
      }
      if (file.size > TEXT_FILE_MAX_BYTES) {
        return setStatus(`Text file too large. Max is ${formatBytes(TEXT_FILE_MAX_BYTES)}.`);
      }

      let text = "";
      try {
        text = await file.text();
      } catch {
        return setStatus("Failed to read file.");
      }
      const title = String(titleEl?.value || "").trim() || String(file.name || "").replace(/\\.(txt|md)$/i, "");
      ctx.send("textCreate", { title, text });
      setStatus("Importing text...");
    }

    function createBlankTextBook() {
      const titleEl = document.getElementById("bzlLibraryTextNewTitle");
      const title = String(titleEl?.value || "").trim() || "Untitled text";
      ctx.send("textCreate", { title, text: "" });
      setStatus("Creating blank text...");
    }

    function openEditor() {
      if (!activeItem || String(activeItem.kind || "") !== "text") return;
      if (!isAuthor(activeItem)) {
        ctx.toast("Library", "Only the author can edit/export this text.");
        return;
      }
      editorOpen = true;
      editorText = String(activeText || "");
      editorTitle = String(activeItem.title || "");
      render();
    }

    function closeEditor() {
      editorOpen = false;
      editorText = "";
      editorTitle = "";
      render();
    }

    function saveEditor() {
      if (!activeItem || String(activeItem.kind || "") !== "text") return;
      if (!isAuthor(activeItem)) return;
      ctx.send("textUpdate", { id: activeItem.id, title: editorTitle, text: editorText });
      setStatus("Saving...");
    }

    function exportActiveText() {
      if (!activeItem || String(activeItem.kind || "") !== "text") return;
      if (!isAuthor(activeItem)) return;
      const base = sanitizeFilenameBase(activeItem.title || "book") || "book";
      downloadTextFile(`${base}.txt`, activeText);
    }

    function render() {
      ensureDom();
      const panel = document.getElementById("bzlLibraryPanel");
      if (!panel) return;
      panel.classList.toggle("hidden", !panelOpen);
      if (!panelOpen) return;

      const viewList = !viewerOpen;
      const list = items
        .filter((it) => {
          const k = String(it?.kind || "pdf");
          if (filterKind === "all") return true;
          return k === filterKind;
        })
        .map((it) => {
          const kind = String(it.kind || "pdf");
          const title = escapeHtml(it.title || it.filename || (kind === "text" ? "Text" : "PDF"));
          const when = new Date(Number(it.createdAt || 0) || 0).toLocaleString();
          const who = escapeHtml(String(it.createdBy || ""));
          const meta = `${kind.toUpperCase()} | ${who} | ${when} | ${formatBytes(it.bytes)}`;
          const delBtn = canDelete(it) ? `<button type="button" class="bzlLibraryBtn" data-libdel="${escapeHtml(it.id)}">Delete</button>` : "";
          const openBtn = `<button type="button" class="bzlLibraryBtn primary" data-libopen="${escapeHtml(it.id)}">Open</button>`;
          const newTab =
            kind === "pdf" && it.url
              ? `<a class="bzlLibraryBtn" href="${escapeHtml(it.url)}" target="_blank" rel="noreferrer">New tab</a>`
              : "";
          return `
            <div class="bzlLibraryItem">
              <div>
                <div><b>${title}</b></div>
                <div class="bzlLibraryMeta">${escapeHtml(meta)}</div>
              </div>
              <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; justify-content:flex-end;">
                ${openBtn}
                ${newTab}
                ${delBtn}
              </div>
            </div>
          `;
        })
        .join("");

      const kindTabs = `
        <div class="bzlLibraryTabs">
          <button type="button" class="bzlLibraryBtn ${filterKind === "all" ? "primary" : ""}" data-libkind="all">All</button>
          <button type="button" class="bzlLibraryBtn ${filterKind === "pdf" ? "primary" : ""}" data-libkind="pdf">PDFs</button>
          <button type="button" class="bzlLibraryBtn ${filterKind === "text" ? "primary" : ""}" data-libkind="text">Texts</button>
        </div>
      `;

      const isText = viewerOpen && activeItem && String(activeItem.kind || "pdf") === "text";
      const canEdit = isText && isAuthor(activeItem);
      const pageLabelText = isText ? `Page ${activePage} / ${totalPages}` : `Page ${activePage}`;

      panel.innerHTML = `
        <div class="bzlLibraryHeader">
          <div class="bzlLibraryTitle" id="bzlLibraryDrag" title="Drag to move">Library</div>
          <div style="display:flex; gap:8px; align-items:center;">
            ${kindTabs}
            <button type="button" class="bzlLibraryBtn" id="bzlLibraryRefresh">Refresh</button>
            <button type="button" class="bzlLibraryBtn" id="bzlLibraryReset" title="Reset panel size/position">Reset</button>
            <button type="button" class="bzlLibraryBtn" id="bzlLibraryClose">Close</button>
          </div>
        </div>

        <div class="bzlLibraryBody">
          <div class="${viewList ? "" : "hidden"}" id="bzlLibraryListView">
            <div class="bzlLibraryRow" style="align-items:flex-end;">
              <div style="flex: 1 1 260px;">
                <div class="bzlLibraryHint"><b>Upload PDF</b></div>
                <div class="bzlLibraryRow" style="margin: 6px 0 0 0;">
                  <input id="bzlLibraryPdfTitle" type="text" placeholder="PDF title (optional)" style="flex: 1 1 200px;" />
                  <input id="bzlLibraryPdfFile" type="file" accept="application/pdf,.pdf" />
                  <button type="button" class="bzlLibraryBtn primary" id="bzlLibraryPdfUpload">Upload PDF</button>
                </div>
              </div>
            </div>

            <div class="bzlLibraryRow" style="align-items:flex-end;">
              <div style="flex: 1 1 260px;">
                <div class="bzlLibraryHint"><b>Text books</b> (for lore, notes, character bios, poetry, etc)</div>
                <div class="bzlLibraryRow" style="margin: 6px 0 0 0;">
                  <input id="bzlLibraryTextNewTitle" type="text" placeholder="New text title" style="flex: 1 1 200px;" />
                  <button type="button" class="bzlLibraryBtn primary" id="bzlLibraryTextNew">New blank</button>
                </div>
                <div class="bzlLibraryRow" style="margin: 6px 0 0 0;">
                  <input id="bzlLibraryTextTitle" type="text" placeholder="Import title (optional)" style="flex: 1 1 200px;" />
                  <input id="bzlLibraryTextFile" type="file" accept="text/plain,.txt,.md" />
                  <button type="button" class="bzlLibraryBtn primary" id="bzlLibraryTextImport">Import</button>
                </div>
              </div>
            </div>

            <div id="bzlLibraryStatus" class="bzlLibraryHint"></div>
            <div class="bzlLibraryHint">Open to read here. Left/Right arrows change pages. Text books can be edited and exported by the author.</div>
            <div style="height: 10px;"></div>
            <div class="bzlLibraryList">
              ${list || `<div class="bzlLibraryHint">No library items yet.</div>`}
            </div>
          </div>

          <div class="${viewList ? "hidden" : ""} bzlLibraryViewer" id="bzlLibraryViewer">
            <div class="bzlLibraryRow" style="justify-content: space-between; align-items:center;">
              <div style="display:flex; gap:8px; align-items:center;">
                <button type="button" class="bzlLibraryBtn" id="bzlLibraryBack">Back</button>
                <div id="bzlLibraryPageLabel" class="bzlLibraryHint">${escapeHtml(pageLabelText)}</div>
              </div>
              <div style="display:flex; gap:8px; align-items:center; justify-content:flex-end; flex-wrap:wrap;">
                ${canEdit ? `<button type="button" class="bzlLibraryBtn" id="bzlLibraryEdit">Edit</button>` : ""}
                ${canEdit ? `<button type="button" class="bzlLibraryBtn" id="bzlLibraryExport">Export .txt</button>` : ""}
                <button type="button" class="bzlLibraryBtn" id="bzlLibraryPrev">&lt;</button>
                <input id="bzlLibraryPage" type="number" min="1" step="1" value="${activePage}" style="width: 92px;" />
                <button type="button" class="bzlLibraryBtn" id="bzlLibraryGo">Go</button>
                <button type="button" class="bzlLibraryBtn" id="bzlLibraryNext">&gt;</button>
              </div>
            </div>

            <div class="bzlLibraryDocWrap">
              <div class="${isText ? "hidden" : ""}" style="height:100%;">
                <iframe id="bzlLibraryFrame" class="bzlLibraryFrame" title="PDF viewer"></iframe>
              </div>
              <div class="${isText ? "" : "hidden"}" style="height:100%;">
                <div id="bzlLibraryTextPage" class="bzlLibraryTextPage"></div>
              </div>
            </div>

            <div class="bzlLibraryHint">${activeItem ? escapeHtml(activeItem.title || activeItem.filename || "") : ""}</div>

            <div class="${editorOpen ? "" : "hidden"}" id="bzlLibraryEditorWrap">
              <div style="height:10px;"></div>
              <div class="bzlLibraryHint"><b>Edit text book</b> (author only)</div>
              <div class="bzlLibraryRow" style="margin-top:6px;">
                <input id="bzlLibraryEditorTitle" type="text" placeholder="Title" value="${escapeHtml(editorTitle)}" style="flex: 1 1 240px;" />
              </div>
              <div class="bzlLibraryRow" style="margin-top:6px;">
                <textarea id="bzlLibraryEditorText" rows="12" style="width:100%; box-sizing:border-box;">${escapeHtml(
                  editorText
                )}</textarea>
              </div>
              <div class="bzlLibraryRow" style="justify-content:flex-end;">
                <button type="button" class="bzlLibraryBtn" id="bzlLibraryEditorCancel">Cancel</button>
                <button type="button" class="bzlLibraryBtn primary" id="bzlLibraryEditorSave">Save</button>
              </div>
              <div class="bzlLibraryHint">Note: pages are auto-generated from the text.</div>
            </div>
          </div>
        </div>

        <div class="bzlLibraryResize" id="bzlLibraryResize" title="Resize"></div>
      `;

      document.getElementById("bzlLibraryClose")?.addEventListener("click", () => {
        panelOpen = false;
        closeViewer();
        render();
      });
      document.getElementById("bzlLibraryRefresh")?.addEventListener("click", () => requestList());
      document.getElementById("bzlLibraryReset")?.addEventListener("click", () => {
        try {
          localStorage.removeItem(PANEL_RECT_KEY);
        } catch {
          // ignore
        }
        applyPanelRect(panel, defaultPanelRect());
        savePanelRectFromEl(panel);
      });
      panel.querySelectorAll("[data-libkind]").forEach((b) => {
        b.addEventListener("click", () => {
          filterKind = String(b.getAttribute("data-libkind") || "all");
          render();
        });
      });

      const drag = document.getElementById("bzlLibraryDrag");
      const resize = document.getElementById("bzlLibraryResize");

      if (drag) {
        drag.addEventListener("pointerdown", (e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          const start = { x: e.clientX, y: e.clientY };
          const rect = panel.getBoundingClientRect();
          const startRect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };

          const onMove = (ev) => {
            const dx = ev.clientX - start.x;
            const dy = ev.clientY - start.y;
            applyPanelRect(panel, { ...startRect, left: startRect.left + dx, top: startRect.top + dy });
          };
          const onUp = () => {
            window.removeEventListener("pointermove", onMove, true);
            window.removeEventListener("pointerup", onUp, true);
            window.removeEventListener("pointercancel", onUp, true);
            savePanelRectFromEl(panel);
          };

          window.addEventListener("pointermove", onMove, true);
          window.addEventListener("pointerup", onUp, true);
          window.addEventListener("pointercancel", onUp, true);
        });
      }

      if (resize) {
        resize.addEventListener("pointerdown", (e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          const start = { x: e.clientX, y: e.clientY };
          const rect = panel.getBoundingClientRect();
          const startRect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };

          const onMove = (ev) => {
            const dx = ev.clientX - start.x;
            const dy = ev.clientY - start.y;
            applyPanelRect(panel, { ...startRect, width: startRect.width + dx, height: startRect.height + dy });
          };
          const onUp = () => {
            window.removeEventListener("pointermove", onMove, true);
            window.removeEventListener("pointerup", onUp, true);
            window.removeEventListener("pointercancel", onUp, true);
            savePanelRectFromEl(panel);
          };

          window.addEventListener("pointermove", onMove, true);
          window.addEventListener("pointerup", onUp, true);
          window.addEventListener("pointercancel", onUp, true);
        });
      }

      document.getElementById("bzlLibraryPdfUpload")?.addEventListener("click", () => uploadSelectedPdf());
      document.getElementById("bzlLibraryTextImport")?.addEventListener("click", () => importTextFromFile());
      document.getElementById("bzlLibraryTextNew")?.addEventListener("click", () => createBlankTextBook());

      panel.querySelectorAll("[data-libopen]").forEach((b) => {
        b.addEventListener("click", () => {
          const id = String(b.getAttribute("data-libopen") || "");
          const it = items.find((x) => String(x.id || "") === id);
          if (it) openItem(it);
        });
      });
      panel.querySelectorAll("[data-libdel]").forEach((b) => {
        b.addEventListener("click", () => {
          const id = String(b.getAttribute("data-libdel") || "");
          if (!id) return;
          if (!confirm("Delete this item from the library?")) return;
          ctx.send("delete", { id });
        });
      });

      document.getElementById("bzlLibraryBack")?.addEventListener("click", () => closeViewer());
      document.getElementById("bzlLibraryPrev")?.addEventListener("click", () => setPage(activePage - 1));
      document.getElementById("bzlLibraryNext")?.addEventListener("click", () => setPage(activePage + 1));
      document.getElementById("bzlLibraryGo")?.addEventListener("click", () => {
        const inp = document.getElementById("bzlLibraryPage");
        setPage(Number(inp?.value || 1));
      });
      document.getElementById("bzlLibraryEdit")?.addEventListener("click", () => openEditor());
      document.getElementById("bzlLibraryExport")?.addEventListener("click", () => exportActiveText());
      document.getElementById("bzlLibraryEditorCancel")?.addEventListener("click", () => closeEditor());
      document.getElementById("bzlLibraryEditorSave")?.addEventListener("click", () => {
        const titleEl = document.getElementById("bzlLibraryEditorTitle");
        const textEl = document.getElementById("bzlLibraryEditorText");
        editorTitle = String(titleEl?.value || "").trim();
        editorText = String(textEl?.value || "");
        saveEditor();
        closeEditor();
      });

      if (viewerOpen && activeItem) {
        if (String(activeItem.kind || "pdf") === "pdf") {
          const iframe = document.getElementById("bzlLibraryFrame");
          if (iframe && !iframe.src) iframe.src = `${activeItem.url}#page=${activePage}`;
        } else {
          setPage(activePage);
        }
      }
    }

    function onWsMsg(ev) {
      try {
        const msg = JSON.parse(String(ev?.data || ""));
        const type = String(msg?.type || "");
        if (!type.startsWith("plugin:library:")) return;

        if (type === "plugin:library:list") {
          items = Array.isArray(msg.items) ? msg.items : [];
          render();
          return;
        }
        if (type === "plugin:library:changed") {
          if (panelOpen) requestList();
          return;
        }
        if (type === "plugin:library:uploadStarted") {
          const uploadId = String(msg.uploadId || "");
          if (uploadId) window.__bzlLibraryUploadId = uploadId;
          return;
        }
        if (type === "plugin:library:uploadProgress") {
          setStatus(`Uploading PDF... ${formatBytes(msg.received)} / ${formatBytes(msg.expected)}`);
          return;
        }
        if (type === "plugin:library:uploadFinished") {
          uploadingPdf = false;
          window.__bzlLibraryUploadId = "";
          setStatus("Upload complete.");
          requestList();
          render();
          return;
        }
        if (type === "plugin:library:text") {
          const it = msg.item;
          if (!it || !activeItem || String(activeItem.id || "") !== String(it.id || "")) return;
          activeText = String(it.text || "");
          textPages = paginateText(activeText);
          totalPages = Math.max(1, textPages.length);
          activeItem = { ...activeItem, title: it.title, createdBy: it.createdBy, updatedAt: it.updatedAt, bytes: it.bytes };
          editorTitle = String(activeItem.title || "");
          setStatus("");
          render();
          setPage(1);
          return;
        }
        if (type === "plugin:library:textCreated") {
          requestList();
          setStatus("Created.");
          return;
        }
        if (type === "plugin:library:textUpdated") {
          requestList();
          setStatus("Saved.");
          if (activeItem && String(activeItem.kind || "") === "text" && msg.id && String(msg.id) === String(activeItem.id)) {
            requestText(activeItem.id);
          }
          return;
        }
        if (type === "plugin:library:deleted") {
          requestList();
          if (activeItem && msg.id && String(msg.id) === String(activeItem.id)) closeViewer();
          return;
        }
        if (type === "plugin:library:error") {
          uploadingPdf = false;
          setStatus(String(msg.message || "Error."));
          ctx.toast("Library", String(msg.message || "Error."));
        }
      } catch {
        // ignore
      }
    }

    function ensureDom() {
      if (document.getElementById("bzlLibraryToggle")) return;
      if (!document.body) {
        ctx.devLog("warn", "library:bodyMissing", {});
        return;
      }
      const btn = document.createElement("button");
      btn.id = "bzlLibraryToggle";
      btn.className = "bzlLibraryToggle";
      btn.type = "button";
      btn.textContent = "Library";
      btn.addEventListener("click", () => {
        panelOpen = !panelOpen;
        if (panelOpen) {
          const panel = document.getElementById("bzlLibraryPanel");
          if (panel) applyPanelRect(panel, readPanelRect() || defaultPanelRect());
          requestList();
        }
        render();
      });
      document.body.appendChild(btn);
      ctx.devLog("info", "library:toggleMounted", {});

      const panel = document.createElement("div");
      panel.id = "bzlLibraryPanel";
      panel.className = "bzlLibraryPanel hidden";
      applyPanelRect(panel, readPanelRect() || defaultPanelRect());
      document.body.appendChild(panel);

      window.addEventListener("resize", () => {
        const p = document.getElementById("bzlLibraryPanel");
        if (!p) return;
        applyPanelRect(p, readPanelRect() || defaultPanelRect());
      });

      window.addEventListener("keydown", (e) => {
        if (!panelOpen || !viewerOpen) return;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setPage(activePage - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setPage(activePage + 1);
        }
      });
    }

    setInterval(attachWsListener, 1000);
    attachWsListener();
    whenBodyReady(ensureDom);
    ctx.devLog("info", "library:init", { ok: true });
  });
})();
