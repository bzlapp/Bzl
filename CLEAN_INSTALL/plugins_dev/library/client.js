
(function () {
  const PLUGIN_ID = "library";
  const PDF_CHUNK_BYTES = 256 * 1024;
  const TEXT_FILE_MAX_BYTES = 512 * 1024;
  const TAG_SUGGESTIONS = ["fic", "fix-it-fic", "journal", "fiction", "fantasy", "sci-fi", "lore", "poetry", "notes", "history"];

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

  function normalizeTag(raw) {
    return String(raw || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 _-]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^[-_]+|[-_]+$/g, "")
      .slice(0, 32);
  }

  function parseTags(raw) {
    const parts = String(raw || "")
      .split(",")
      .map((x) => normalizeTag(x))
      .filter(Boolean);
    return [...new Set(parts)].slice(0, 16);
  }

  function paginateText(text, opts = {}) {
    const maxLines = Number(opts.maxLines || 40);
    const maxChars = Number(opts.maxChars || 2400);
    const lines = String(text || "").replace(/\r\n/g, "\n").split("\n");
    const pages = [];
    let buf = "";
    let lineCount = 0;
    const flush = () => {
      pages.push(buf);
      buf = "";
      lineCount = 0;
    };
    for (let i = 0; i < lines.length; i++) {
      const lineWithNl = i === lines.length - 1 ? lines[i] : `${lines[i]}\n`;
      if (lineWithNl.length > maxChars) {
        let r = lineWithNl;
        while (r.length) {
          const take = r.slice(0, maxChars);
          r = r.slice(maxChars);
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
    if (document.getElementById("bzlLibraryPanelsStyle")) return;
    const el = document.createElement("style");
    el.id = "bzlLibraryPanelsStyle";
    el.textContent = `
      .lib3 { color: var(--text, #f3f7ff); display:flex; flex-direction:column; gap:10px; min-height:0; height:100%; flex:1 1 auto; }
      .lib3Row { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
      .lib3 input[type="text"], .lib3 input[type="number"], .lib3 textarea, .lib3 select { background: rgba(255,255,255,0.08); color:#f6e8f0; border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 7px 9px; }
      .lib3Btn { border-radius: 999px; padding: 7px 11px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.08); color:#f6e8f0; cursor:pointer; }
      .lib3Btn.primary { border:0; background: linear-gradient(180deg, rgba(255,145,50,0.95), rgba(255,90,160,0.95)); color:#1b0a12; font-weight:700; }
      .lib3Scroll { overflow:auto; min-height:0; flex:1 1 auto; }
      .lib3ReaderViewport { display:flex; flex:1 1 auto; min-height:0; }
      .lib3Card { border: 1px solid rgba(255,255,255,0.13); border-radius: 12px; padding: 9px; background: rgba(255,255,255,0.04); margin-bottom:8px; }
      .lib3Meta { opacity:.82; font-size:12px; margin-top:3px; }
      .lib3Tag { display:inline-block; font-size:11px; border:1px solid rgba(255,255,255,0.18); border-radius:999px; padding:2px 7px; margin-right:4px; margin-top:4px; }
      .lib3ReaderPage { white-space:pre-wrap; border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:10px; overflow:auto; height:100%; background: rgba(0,0,0,0.18); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size:13px; }
      .lib3Hint { opacity:.78; font-size:12px; }
      .lib3Iframe { width:100%; height:100%; border:1px solid rgba(255,255,255,0.12); border-radius:10px; }
    `;
    document.head.appendChild(el);
  }

  window.BzlPluginHost?.register(PLUGIN_ID, (ctx) => {
    ensureStyles();

    let wsAttachedTo = null;
    let snapshot = { me: "", myShelfId: "", shelves: [] };
    let activeShelfId = "";
    let readerBookId = "";
    let readerPage = 1;
    let searchQuery = "";
    let searchTag = "";
    let statusLine = "";
    let uploadInProgress = false;

    const textByBookId = new Map();
    const mounts = { library: null, shelf: null, reader: null };

    function setStatus(msg) {
      statusLine = String(msg || "");
      renderAll();
    }

    function ownedShelves() {
      return (snapshot.shelves || []).filter((s) => Boolean(s?.isOwner));
    }

    function activeShelf() {
      return (snapshot.shelves || []).find((s) => String(s?.id || "") === String(activeShelfId || "")) || null;
    }

    function defaultShelfId() {
      if (snapshot.myShelfId && ownedShelves().some((s) => s.id === snapshot.myShelfId)) return snapshot.myShelfId;
      return ownedShelves()[0]?.id || "";
    }

    function allShelfEntries() {
      const out = [];
      for (const shelf of snapshot.shelves || []) {
        for (const entry of shelf.items || []) out.push({ shelf, entry, book: entry?.book || null });
      }
      return out;
    }

    function getBookById(bookId) {
      const id = String(bookId || "");
      if (!id) return null;
      for (const x of allShelfEntries()) {
        if (String(x.book?.id || "") === id) return x.book;
      }
      return null;
    }

    function activeReaderBook() {
      return getBookById(readerBookId);
    }

    function requestList() {
      ctx.send("list", {});
    }

    function requestText(bookId) {
      ctx.send("textGet", { id: bookId });
    }

    function attachWsListener() {
      const ws = window.__bzlWs;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;
      if (wsAttachedTo === ws) return;
      try {
        if (wsAttachedTo) wsAttachedTo.removeEventListener("message", onWsMsg);
      } catch {}
      wsAttachedTo = ws;
      ws.addEventListener("message", onWsMsg);
    }

    function openInReader(bookId) {
      const id = String(bookId || "");
      if (!id) return;
      readerBookId = id;
      readerPage = 1;
      const book = getBookById(id);
      if (book && String(book.kind || "") === "text" && !textByBookId.has(id)) requestText(id);
      renderReader();
    }
    async function uploadPdfToShelf(file, meta, shelfId) {
      if (uploadInProgress) return;
      uploadInProgress = true;
      window.__bzlLibraryUploadId = "";
      ctx.send("uploadStart", {
        filename: file.name,
        mime: String(file.type || "").trim().toLowerCase(),
        size: file.size,
        title: meta.title,
        author: meta.author,
        isOriginal: meta.isOriginal,
        tags: meta.tags,
        shelfId,
      });

      const t0 = Date.now();
      while (!window.__bzlLibraryUploadId && Date.now() - t0 < 3000) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(35);
      }
      const uploadId = String(window.__bzlLibraryUploadId || "");
      if (!uploadId) {
        uploadInProgress = false;
        setStatus("Upload failed to start.");
        return;
      }

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
    }

    async function createBookFromFile(file, payload) {
      const name = String(file?.name || "").toLowerCase();
      const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
      if (ext === ".pdf" || String(file.type || "").toLowerCase() === "application/pdf") {
        await uploadPdfToShelf(file, payload, payload.shelfId);
        return;
      }
      if (![".txt", ".md", ".rtf"].includes(ext)) {
        setStatus("Supported upload types: PDF, TXT, MD, RTF.");
        return;
      }
      if (file.size > TEXT_FILE_MAX_BYTES) {
        setStatus(`Text/RTF too large. Max is ${formatBytes(TEXT_FILE_MAX_BYTES)}.`);
        return;
      }
      const text = await file.text();
      ctx.send("textCreate", {
        shelfId: payload.shelfId,
        title: payload.title,
        author: payload.author,
        isOriginal: payload.isOriginal,
        tags: payload.tags,
        format: ext === ".rtf" ? "rtf" : "text",
        text,
      });
      setStatus("Book created.");
    }

    function filteredBrowseRows() {
      const q = String(searchQuery || "").trim().toLowerCase();
      const tag = String(searchTag || "").trim().toLowerCase();
      return allShelfEntries().filter((x) => {
        const book = x.book || {};
        if (!book.id) return false;
        if (q) {
          const hay = `${book.title || ""} ${book.author || ""} ${(book.tags || []).join(" ")} ${x.shelf?.name || ""}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        if (tag) {
          const tags = Array.isArray(book.tags) ? book.tags.map((t) => String(t || "").toLowerCase()) : [];
          if (!tags.includes(tag)) return false;
        }
        return true;
      });
    }

    function uniqueTags() {
      const out = new Set();
      for (const x of allShelfEntries()) {
        for (const t of x?.book?.tags || []) out.add(String(t || "").toLowerCase());
      }
      return [...out].filter(Boolean).sort();
    }

    function renderLibrary() {
      const mount = mounts.library;
      if (!(mount instanceof HTMLElement)) return;
      const rows = filteredBrowseRows();
      const tags = uniqueTags();
      const targetShelfId = defaultShelfId();
      const shelfOpt = ownedShelves().map((s) => `<option value="${escapeHtml(s.id)}" ${s.id === targetShelfId ? "selected" : ""}>${escapeHtml(s.name)}</option>`).join("");

      mount.innerHTML = `
        <div class="lib3">
          <div class="lib3Row">
            <input id="lib3Search" type="text" placeholder="Search title, author, tags" value="${escapeHtml(searchQuery)}" style="flex:1 1 220px;" />
            <select id="lib3TagFilter"><option value="">All tags</option>${tags.map((t) => `<option value="${escapeHtml(t)}" ${t === searchTag ? "selected" : ""}>${escapeHtml(t)}</option>`).join("")}</select>
            <button type="button" class="lib3Btn" id="lib3Refresh">Refresh</button>
          </div>
          <div class="lib3Row"><span class="lib3Hint">Browse shelves and discover books. Choose one of your shelves for pin/check out:</span>
            <select id="lib3LibraryTargetShelf">${shelfOpt || "<option value=''>No owned shelf</option>"}</select>
          </div>
          <div class="lib3Scroll">
            ${rows.map((x) => {
              const b = x.book || {};
              const s = x.shelf || {};
              const tagsHtml = (b.tags || []).map((t) => `<span class="lib3Tag">${escapeHtml(t)}</span>`).join("");
              return `<div class="lib3Card">
                <div><b>${escapeHtml(b.title || "Untitled")}</b> ${x.entry?.kind === "checkout" ? "<span title='Checked out'>↩</span>" : ""}</div>
                <div class="lib3Meta">by ${escapeHtml(b.author || b.createdBy || "Unknown")} | shelf ${escapeHtml(s.name || "Shelf")}${s.owner ? ` · @${escapeHtml(s.owner)}` : ""} | ${formatBytes(b.bytes)} | pins ${Number(b?.popularity?.pins || 0)} | checkouts ${Number(b?.popularity?.checkouts || 0)}</div>
                <div>${tagsHtml}</div>
                <div class="lib3Row" style="margin-top:6px;">
                  <button type="button" class="lib3Btn primary" data-open-book="${escapeHtml(b.id)}">Read</button>
                  <button type="button" class="lib3Btn" data-pin-book="${escapeHtml(b.id)}" data-source-shelf="${escapeHtml(s.id || "")}">Pin</button>
                  <button type="button" class="lib3Btn" data-checkout-book="${escapeHtml(b.id)}" data-source-shelf="${escapeHtml(s.id || "")}">Check out</button>
                  <button type="button" class="lib3Btn" data-wander-shelf="${escapeHtml(s.id || "")}">Wander shelf</button>
                </div>
              </div>`;
            }).join("") || "<div class='lib3Hint'>No matches.</div>"}
          </div>
          <div class="lib3Hint">Wander shelves and open a book in Reader.</div>
        </div>
      `;

      mount.querySelector("#lib3Search")?.addEventListener("input", (e) => {
        searchQuery = String(e?.target?.value || "");
        renderLibrary();
      });
      mount.querySelector("#lib3TagFilter")?.addEventListener("change", (e) => {
        searchTag = String(e?.target?.value || "").toLowerCase();
        renderLibrary();
      });
      mount.querySelector("#lib3Refresh")?.addEventListener("click", () => requestList());
      mount.querySelectorAll("[data-open-book]").forEach((btn) => btn.addEventListener("click", () => openInReader(btn.getAttribute("data-open-book") || "")));
      mount.querySelectorAll("[data-wander-shelf]").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeShelfId = String(btn.getAttribute("data-wander-shelf") || "");
          renderShelf();
        });
      });
      mount.querySelectorAll("[data-pin-book]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const shelfId = String(mount.querySelector("#lib3LibraryTargetShelf")?.value || "");
          const bookId = String(btn.getAttribute("data-pin-book") || "");
          const sourceShelfId = String(btn.getAttribute("data-source-shelf") || "");
          if (!shelfId || !bookId) return setStatus("Pick one of your shelves first.");
          ctx.send("pinBook", { shelfId, bookId, sourceShelfId });
          setStatus("Pinned.");
        });
      });
      mount.querySelectorAll("[data-checkout-book]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetShelfId = String(mount.querySelector("#lib3LibraryTargetShelf")?.value || "");
          const sourceBookId = String(btn.getAttribute("data-checkout-book") || "");
          const sourceShelfId = String(btn.getAttribute("data-source-shelf") || "");
          if (!targetShelfId || !sourceBookId) return setStatus("Pick one of your shelves first.");
          ctx.send("checkoutBook", { targetShelfId, sourceBookId, sourceShelfId });
          setStatus("Checked out.");
        });
      });
    }
    function renderShelf() {
      const mount = mounts.shelf;
      if (!(mount instanceof HTMLElement)) return;
      const mine = ownedShelves();
      if (!activeShelfId || !(snapshot.shelves || []).some((s) => s.id === activeShelfId)) activeShelfId = snapshot.myShelfId || snapshot.shelves?.[0]?.id || "";
      const shelf = activeShelf();
      const shelfList = (snapshot.shelves || []).map((s) => `<option value="${escapeHtml(s.id)}" ${s.id === activeShelfId ? "selected" : ""}>${escapeHtml(s.name)}${s.owner ? ` (@${escapeHtml(s.owner)})` : ""}</option>`).join("");
      const mineDefault = defaultShelfId();
      const mineList = mine.map((s) => `<option value="${escapeHtml(s.id)}" ${s.id === mineDefault ? "selected" : ""}>${escapeHtml(s.name)}</option>`).join("");

      mount.innerHTML = `
        <div class="lib3">
          <div class="lib3Row">
            <select id="lib3ShelfPick" style="min-width:220px;">${shelfList || "<option>No shelves</option>"}</select>
            ${shelf && !shelf.isOwner ? `<button type="button" class="lib3Btn" id="lib3SubBtn">${shelf.isSubscribed ? "Unsubscribe" : "Subscribe"}</button>` : ""}
            <button type="button" class="lib3Btn" id="lib3RefreshShelf">Refresh</button>
          </div>
          <div class="lib3Card">
            <div class="lib3Row">
              <input id="lib3NewShelfName" type="text" placeholder="New shelf name" style="flex:1 1 180px;" />
              <input id="lib3NewShelfDesc" type="text" placeholder="Shelf description" style="flex:2 1 220px;" />
              <button type="button" class="lib3Btn" id="lib3CreateShelf">Create shelf</button>
            </div>
          </div>
          <div class="lib3Card">
            <div class="lib3Row"><b>Add Book</b> <span class="lib3Hint">(PDF, TXT, MD, RTF)</span></div>
            <div class="lib3Row">
              <select id="lib3CreateTargetShelf">${mineList || "<option value=''>No owned shelves</option>"}</select>
              <input id="lib3BookTitle" type="text" placeholder="Book name" style="flex:1 1 180px;" />
              <input id="lib3BookAuthor" type="text" placeholder="Author" style="flex:1 1 160px;" value="${escapeHtml(snapshot.me || "")}" />
              <label class="lib3Hint"><input id="lib3BookOriginal" type="checkbox" checked/> original</label>
            </div>
            <div class="lib3Row">
              <input id="lib3BookTags" type="text" placeholder="tags: fic, fantasy, journal" style="flex:1 1 260px;" />
              <select id="lib3TagQuick"><option value="">Tag quick-add</option>${TAG_SUGGESTIONS.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}</select>
            </div>
            <div class="lib3Row">
              <input id="lib3BookFile" type="file" accept=".pdf,.txt,.md,.rtf,application/pdf,text/plain,application/rtf,text/rtf" />
              <button type="button" class="lib3Btn primary" id="lib3UploadBook">Upload File</button>
            </div>
            <div class="lib3Row">
              <select id="lib3TextFormat"><option value="text">Text</option><option value="rtf">Rich text (RTF)</option></select>
              <textarea id="lib3BookText" rows="5" placeholder="Or create a book directly" style="width:100%; box-sizing:border-box;"></textarea>
              <button type="button" class="lib3Btn" id="lib3CreateText">Create Text Book</button>
            </div>
          </div>
          <div class="lib3Scroll">
            ${(shelf?.items || []).map((x) => {
              const b = x.book || {};
              const tHtml = (b.tags || []).map((t) => `<span class="lib3Tag">${escapeHtml(t)}</span>`).join("");
              return `<div class="lib3Card">
                <div><b>${escapeHtml(b.title || "Untitled")}</b> ${x.kind === "checkout" ? "<span title='Checked out'>↩</span>" : ""}</div>
                <div class="lib3Meta">by ${escapeHtml(b.author || b.createdBy || "Unknown")} | ${String(b.kind || "").toUpperCase()} | ${formatBytes(b.bytes)} | original: ${b.isOriginal !== false ? "yes" : "no"}</div>
                <div>${tHtml}</div>
                <div class="lib3Row" style="margin-top:6px;">
                  <button type="button" class="lib3Btn primary" data-open-book="${escapeHtml(b.id)}">Read</button>
                  ${x.canReturn ? `<button type="button" class="lib3Btn" data-return-item="${escapeHtml(x.id)}">Return</button>` : ""}
                  ${x.canRemoveItem ? `<button type="button" class="lib3Btn" data-remove-item="${escapeHtml(x.id)}">Remove</button>` : ""}
                  ${b.canDeleteBook ? `<button type="button" class="lib3Btn" data-delete-book="${escapeHtml(b.id)}">Delete book</button>` : ""}
                  <button type="button" class="lib3Btn" data-checkout-book="${escapeHtml(b.id)}" data-source-shelf="${escapeHtml(shelf?.id || "")}">Check out</button>
                </div>
              </div>`;
            }).join("") || "<div class='lib3Hint'>No books on this shelf.</div>"}
          </div>
          <div class="lib3Hint">${escapeHtml(statusLine)}</div>
        </div>
      `;

      mount.querySelector("#lib3ShelfPick")?.addEventListener("change", (e) => {
        activeShelfId = String(e?.target?.value || "");
        renderShelf();
      });
      mount.querySelector("#lib3RefreshShelf")?.addEventListener("click", () => requestList());
      mount.querySelector("#lib3SubBtn")?.addEventListener("click", () => {
        if (!shelf || shelf.isOwner) return;
        ctx.send("shelfSubscribe", { shelfId: shelf.id, subscribe: !shelf.isSubscribed });
      });
      mount.querySelector("#lib3CreateShelf")?.addEventListener("click", () => {
        const name = String(mount.querySelector("#lib3NewShelfName")?.value || "").trim();
        const description = String(mount.querySelector("#lib3NewShelfDesc")?.value || "").trim();
        if (!name) return setStatus("Shelf name required.");
        ctx.send("shelfCreate", { name, description, isPublic: true });
        setStatus("Shelf created.");
      });
      mount.querySelector("#lib3TagQuick")?.addEventListener("change", (e) => {
        const v = String(e?.target?.value || "").trim();
        if (!v) return;
        const inp = mount.querySelector("#lib3BookTags");
        const next = parseTags(`${String(inp?.value || "")}, ${v}`);
        if (inp) inp.value = next.join(", ");
        e.target.value = "";
      });
      mount.querySelector("#lib3UploadBook")?.addEventListener("click", async () => {
        const shelfId = String(mount.querySelector("#lib3CreateTargetShelf")?.value || "");
        const title = String(mount.querySelector("#lib3BookTitle")?.value || "").trim();
        const author = String(mount.querySelector("#lib3BookAuthor")?.value || "").trim();
        const isOriginal = Boolean(mount.querySelector("#lib3BookOriginal")?.checked);
        const tags = parseTags(String(mount.querySelector("#lib3BookTags")?.value || ""));
        const file = mount.querySelector("#lib3BookFile")?.files?.[0];
        if (!shelfId) return setStatus("Pick one of your shelves.");
        if (!file) return setStatus("Choose a file first.");
        try {
          await createBookFromFile(file, { shelfId, title: title || file.name, author: author || snapshot.me || "Unknown", isOriginal, tags });
        } catch {
          setStatus("Failed to create book from file.");
        }
      });
      mount.querySelector("#lib3CreateText")?.addEventListener("click", () => {
        const shelfId = String(mount.querySelector("#lib3CreateTargetShelf")?.value || "");
        const title = String(mount.querySelector("#lib3BookTitle")?.value || "").trim();
        const author = String(mount.querySelector("#lib3BookAuthor")?.value || "").trim();
        const isOriginal = Boolean(mount.querySelector("#lib3BookOriginal")?.checked);
        const tags = parseTags(String(mount.querySelector("#lib3BookTags")?.value || ""));
        const format = String(mount.querySelector("#lib3TextFormat")?.value || "text").toLowerCase() === "rtf" ? "rtf" : "text";
        const text = String(mount.querySelector("#lib3BookText")?.value || "");
        if (!shelfId) return setStatus("Pick one of your shelves.");
        if (!title) return setStatus("Book name required.");
        ctx.send("textCreate", { shelfId, title, author: author || snapshot.me || "Unknown", isOriginal, tags, format, text });
        setStatus("Book created.");
      });
      mount.querySelectorAll("[data-open-book]").forEach((btn) => btn.addEventListener("click", () => openInReader(btn.getAttribute("data-open-book") || "")));
      mount.querySelectorAll("[data-checkout-book]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetShelfId = String(mount.querySelector("#lib3CreateTargetShelf")?.value || "");
          const sourceBookId = String(btn.getAttribute("data-checkout-book") || "");
          const sourceShelfId = String(btn.getAttribute("data-source-shelf") || "");
          if (!targetShelfId || !sourceBookId) return;
          ctx.send("checkoutBook", { targetShelfId, sourceBookId, sourceShelfId });
          setStatus("Checked out.");
        });
      });
      mount.querySelectorAll("[data-remove-item]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!shelf) return;
          const shelfItemId = String(btn.getAttribute("data-remove-item") || "");
          if (!shelfItemId) return;
          ctx.send("shelfItemRemove", { shelfId: shelf.id, shelfItemId });
        });
      });
      mount.querySelectorAll("[data-return-item]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!shelf) return;
          const shelfItemId = String(btn.getAttribute("data-return-item") || "");
          if (!shelfItemId) return;
          ctx.send("returnBook", { shelfId: shelf.id, shelfItemId });
        });
      });
      mount.querySelectorAll("[data-delete-book]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const bookId = String(btn.getAttribute("data-delete-book") || "");
          if (!bookId) return;
          ctx.send("delete", { id: bookId });
        });
      });
    }

    function renderReader() {
      const mount = mounts.reader;
      if (!(mount instanceof HTMLElement)) return;
      const book = activeReaderBook();
      if (!book) {
        mount.innerHTML = `<div class="lib3"><div class="lib3Hint">Select a book from Shelf or Library to start reading.</div></div>`;
        return;
      }

      const isText = String(book.kind || "") === "text";
      const fullText = textByBookId.get(String(book.id || "")) || "";
      const pages = isText ? paginateText(fullText) : [];
      const totalPages = isText ? Math.max(1, pages.length) : 1;
      readerPage = Math.max(1, Math.min(isText ? totalPages : 9999, Number(readerPage || 1)));

      const tagsHtml = (book.tags || []).map((t) => `<span class="lib3Tag">${escapeHtml(t)}</span>`).join("");
      mount.innerHTML = `
        <div class="lib3">
          <div class="lib3Row" style="justify-content:space-between;">
            <div>
              <div><b>${escapeHtml(book.title || "Untitled")}</b> ${book.checkedOutBy ? "<span title='Checked out'>↩</span>" : ""}</div>
              <div class="lib3Meta">by ${escapeHtml(book.author || book.createdBy || "Unknown")} | ${String(book.kind || "").toUpperCase()} | ${formatBytes(book.bytes)}</div>
              <div>${tagsHtml}</div>
            </div>
            ${
              isText
                ? `<div class="lib3Row">
              <button type="button" class="lib3Btn" id="lib3ReadPrev">&lt;</button>
              <input id="lib3ReadPage" type="number" min="1" value="${readerPage}" style="width:84px;" />
              <button type="button" class="lib3Btn" id="lib3ReadGo">Go</button>
              <button type="button" class="lib3Btn" id="lib3ReadNext">&gt;</button>
            </div>`
                : `<div class="lib3Hint">Use the PDF toolbar to navigate pages.</div>`
            }
          </div>
          <div class="lib3ReaderViewport">
            ${isText ? `<div id="lib3ReaderText" class="lib3ReaderPage">${escapeHtml(pages[readerPage - 1] || (fullText ? "" : "Loading text..."))}</div>` : `<iframe class="lib3Iframe" src="${escapeHtml(`${book.url || ""}#page=${readerPage}`)}" title="Reader"></iframe>`}
          </div>
          <div class="lib3Hint">Page ${readerPage}${isText ? ` / ${totalPages}` : ""}</div>
        </div>
      `;

      if (isText && !textByBookId.has(String(book.id || ""))) requestText(book.id);
      if (isText) {
        mount.querySelector("#lib3ReadPrev")?.addEventListener("click", () => {
          readerPage -= 1;
          renderReader();
        });
        mount.querySelector("#lib3ReadNext")?.addEventListener("click", () => {
          readerPage += 1;
          renderReader();
        });
        mount.querySelector("#lib3ReadGo")?.addEventListener("click", () => {
          readerPage = Number(mount.querySelector("#lib3ReadPage")?.value || 1);
          renderReader();
        });
      }
    }
    function renderAll() {
      renderLibrary();
      renderShelf();
      renderReader();
    }

    function onWsMsg(ev) {
      try {
        const msg = JSON.parse(String(ev?.data || ""));
        const type = String(msg?.type || "");
        if (!type.startsWith("plugin:library:")) return;

        if (type === "plugin:library:list") {
          snapshot = { me: String(msg.me || ""), myShelfId: String(msg.myShelfId || ""), shelves: Array.isArray(msg.shelves) ? msg.shelves : [] };
          if (!activeShelfId || !snapshot.shelves.some((s) => s.id === activeShelfId)) activeShelfId = snapshot.myShelfId || snapshot.shelves[0]?.id || "";
          renderAll();
          return;
        }
        if (type === "plugin:library:changed") {
          requestList();
          return;
        }
        if (type === "plugin:library:text") {
          const it = msg.item || null;
          if (!it || !it.id) return;
          textByBookId.set(String(it.id), String(it.text || ""));
          renderReader();
          return;
        }
        if (type === "plugin:library:uploadStarted") {
          window.__bzlLibraryUploadId = String(msg.uploadId || "");
          return;
        }
        if (type === "plugin:library:uploadProgress") {
          setStatus(`Uploading PDF... ${formatBytes(msg.received)} / ${formatBytes(msg.expected)}`);
          return;
        }
        if (type === "plugin:library:uploadFinished") {
          uploadInProgress = false;
          window.__bzlLibraryUploadId = "";
          setStatus("Upload complete.");
          requestList();
          return;
        }
        if (type === "plugin:library:error") {
          uploadInProgress = false;
          setStatus(String(msg.message || "Error."));
          ctx.toast("Library", String(msg.message || "Error."));
          return;
        }
        if (
          type === "plugin:library:textCreated" ||
          type === "plugin:library:textUpdated" ||
          type === "plugin:library:shelfCreated" ||
          type === "plugin:library:shelfUpdated" ||
          type === "plugin:library:shelfSubscribed" ||
          type === "plugin:library:pinned" ||
          type === "plugin:library:checkedOut" ||
          type === "plugin:library:shelfItemRemoved" ||
          type === "plugin:library:returned" ||
          type === "plugin:library:deleted"
        ) {
          requestList();
        }
      } catch {
        // ignore
      }
    }

    function mountPanel(kind, mount) {
      if (!(mount instanceof HTMLElement)) return;
      mount.style.height = "100%";
      mount.style.minHeight = "0";
      mount.style.display = "flex";
      mounts[kind] = mount;
      renderAll();
    }

    const panelOpts = { defaultRack: "main", role: "primary" };
    if (ctx?.ui?.registerPanel) {
      ctx.ui.registerPanel({
        id: "library-reader",
        title: "Reader",
        icon: "Read",
        ...panelOpts,
        render(mount) {
          mountPanel("reader", mount);
          return () => {
            if (mounts.reader === mount) mounts.reader = null;
          };
        },
      });
      ctx.ui.registerPanel({
        id: "library-shelf",
        title: "Shelf",
        icon: "Shelf",
        ...panelOpts,
        render(mount) {
          mountPanel("shelf", mount);
          return () => {
            if (mounts.shelf === mount) mounts.shelf = null;
          };
        },
      });
      ctx.ui.registerPanel({
        id: "library-browser",
        title: "Library",
        icon: "Books",
        ...panelOpts,
        render(mount) {
          mountPanel("library", mount);
          return () => {
            if (mounts.library === mount) mounts.library = null;
          };
        },
      });
    }

    setInterval(attachWsListener, 1000);
    attachWsListener();
    requestList();
    ctx.devLog("info", "library:init", { ok: true, panels: ["library-reader", "library-shelf", "library-browser"] });
  });
})();
