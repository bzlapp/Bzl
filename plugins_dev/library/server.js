const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const MAX_PDF_BYTES = Number(process.env.LIBRARY_PDF_MAX_BYTES || 50 * 1024 * 1024); // 50MB
const CHUNK_MAX_B64 = Number(process.env.LIBRARY_CHUNK_MAX_B64 || 1024 * 1024); // base64 chars
const MAX_TEXT_BYTES = Number(process.env.LIBRARY_TEXT_MAX_BYTES || 512 * 1024); // 512KB

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function readJsonOrNull(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return safeJsonParse(raw);
  } catch {
    return null;
  }
}

function writeFileAtomic(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = `${filePath}.tmp.${crypto.randomBytes(6).toString("hex")}`;
  fs.writeFileSync(tmp, content, "utf8");
  fs.renameSync(tmp, filePath);
}

function nowMs() {
  return Date.now();
}

function normalizeId(id) {
  return String(id || "").trim().toLowerCase();
}

function normalizeTitle(title) {
  const t = String(title || "").trim().slice(0, 120);
  return t || "Untitled PDF";
}

function normalizeTextTitle(title) {
  const t = String(title || "").trim().slice(0, 120);
  return t || "Untitled text";
}

function normalizeTextBody(text) {
  let t = typeof text === "string" ? text : "";
  t = t.replace(/\r\n/g, "\n");
  if (Buffer.byteLength(t, "utf8") > MAX_TEXT_BYTES) {
    // Trim to max bytes (best-effort by characters).
    while (t && Buffer.byteLength(t, "utf8") > MAX_TEXT_BYTES) t = t.slice(0, Math.max(0, t.length - 4096));
    while (t && Buffer.byteLength(t, "utf8") > MAX_TEXT_BYTES) t = t.slice(0, Math.max(0, t.length - 256));
    while (t && Buffer.byteLength(t, "utf8") > MAX_TEXT_BYTES) t = t.slice(0, Math.max(0, t.length - 16));
    while (t && Buffer.byteLength(t, "utf8") > MAX_TEXT_BYTES) t = t.slice(0, Math.max(0, t.length - 1));
  }
  return t;
}

function normalizeAuthor(name) {
  const a = String(name || "").trim().slice(0, 80);
  return a || "Unknown";
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  const out = [];
  const seen = new Set();
  for (const raw of tags) {
    const t = String(raw || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 _-]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^[-_]+|[-_]+$/g, "")
      .slice(0, 32);
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
    if (out.length >= 16) break;
  }
  return out;
}

function sanitizeFilename(name) {
  const base = String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\\.pdf$/i, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 80);
  return base || "pdf";
}

function userRole(ws) {
  return String(ws?.user?.role || "").trim().toLowerCase();
}

function username(ws) {
  return String(ws?.user?.username || "").trim().toLowerCase();
}

module.exports = function init(api) {
  const dataFile = path.join(__dirname, "library.json");
  const uploadsRoot = path.resolve(process.env.UPLOADS_DIR || path.join(process.cwd(), "data", "uploads"));
  const uploadsDir = path.join(uploadsRoot, "library");
  const tmpDir = path.join(uploadsDir, "tmp");

  const inFlight = new Map(); // uploadId -> { fd, tmpPath, metaPath, expected, received, createdAt, createdBy, title, lastSeenAt }
  const INFLIGHT_TTL_MS = Number(process.env.LIBRARY_INFLIGHT_TTL_MS || 10 * 60_000); // 10m

  function metaPathFor(uploadId) {
    return path.join(tmpDir, `${uploadId}.json`);
  }

  function readMeta(metaPath) {
    return readJsonOrNull(metaPath);
  }

  function writeMeta(metaPath, meta) {
    writeFileAtomic(metaPath, JSON.stringify(meta, null, 2) + "\n");
  }

  function tryResumeInflight(uploadId, user) {
    const metaPath = metaPathFor(uploadId);
    const meta = readMeta(metaPath);
    if (!meta || String(meta.uploadId || "") !== uploadId) return null;
    if (String(meta.createdBy || "") !== String(user || "")) return null;
    const tmpPath = String(meta.tmpPath || "");
    if (!tmpPath) return null;
    if (!fs.existsSync(tmpPath)) return null;
    const expected = Number(meta.expected || 0);
    if (!Number.isFinite(expected) || expected <= 0 || expected > MAX_PDF_BYTES) return null;

    let received = 0;
    try {
      received = Number(fs.statSync(tmpPath).size || 0);
    } catch {
      received = 0;
    }
    if (!Number.isFinite(received) || received < 0 || received > expected) return null;

    let fd = null;
    try {
      fd = fs.openSync(tmpPath, "r+");
    } catch {
      return null;
    }
    const t = nowMs();
    const rec = {
      fd,
      tmpPath,
      metaPath,
      expected,
      received,
      createdAt: Number(meta.createdAt || t),
      createdBy: String(meta.createdBy || ""),
      title: String(meta.title || ""),
      author: normalizeAuthor(meta.author || meta.createdBy || ""),
      isOriginal: meta?.isOriginal !== false,
      tags: normalizeTags(meta?.tags),
      shelfId: normalizeId(meta.shelfId || ""),
      lastSeenAt: t
    };
    inFlight.set(uploadId, rec);
    api.log("info", "library:uploadResumed", { uploadId, user: rec.createdBy, received, expected });
    return rec;
  }

  function normalizeShelfName(name) {
    const s = String(name || "").trim().slice(0, 80);
    return s || "Untitled shelf";
  }

  function normalizeShelfDescription(description) {
    return String(description || "").trim().slice(0, 240);
  }

  function createShelfId() {
    return `shelf-${crypto.randomBytes(8).toString("hex")}`;
  }

  function createShelfItemId() {
    return `si-${crypto.randomBytes(8).toString("hex")}`;
  }

  function normalizeBook(raw) {
    const kind = String(raw?.kind || "pdf") === "text" ? "text" : "pdf";
    const id = normalizeId(raw?.id);
    if (!id) return null;
    const createdAt = Number(raw?.createdAt || 0) || nowMs();
    const out = {
      id,
      kind,
      title: kind === "text" ? normalizeTextTitle(raw?.title) : normalizeTitle(raw?.title),
      author: normalizeAuthor(raw?.author || raw?.createdBy || ""),
      isOriginal: raw?.isOriginal !== false,
      tags: normalizeTags(raw?.tags),
      format: kind === "text" ? (String(raw?.format || "text").toLowerCase() === "rtf" ? "rtf" : "text") : "pdf",
      bytes: Number(raw?.bytes || 0),
      createdAt,
      createdBy: String(raw?.createdBy || ""),
      updatedAt: Number(raw?.updatedAt || createdAt) || createdAt,
      sourceBookId: normalizeId(raw?.sourceBookId || ""),
      sourceShelfId: normalizeId(raw?.sourceShelfId || ""),
      checkedOutBy: String(raw?.checkedOutBy || ""),
    };
    if (kind === "text") {
      out.text = typeof raw?.text === "string" ? normalizeTextBody(raw.text) : "";
      out.bytes = Number(out.bytes || Buffer.byteLength(String(out.text || ""), "utf8"));
      return out;
    }
    out.url = String(raw?.url || "");
    out.filename = String(raw?.filename || "");
    if (!out.url || !out.filename) return null;
    return out;
  }

  function normalizeShelfItem(raw) {
    const id = normalizeId(raw?.id);
    const bookId = normalizeId(raw?.bookId);
    if (!id || !bookId) return null;
    const kind = ["own", "pin", "checkout"].includes(String(raw?.kind || "")) ? String(raw.kind) : "own";
    return {
      id,
      bookId,
      kind,
      addedBy: String(raw?.addedBy || ""),
      addedAt: Number(raw?.addedAt || 0) || nowMs(),
      note: String(raw?.note || "").slice(0, 180),
      sourceBookId: normalizeId(raw?.sourceBookId || ""),
      sourceShelfId: normalizeId(raw?.sourceShelfId || ""),
    };
  }

  function normalizeShelf(raw) {
    const id = normalizeId(raw?.id);
    if (!id) return null;
    const createdAt = Number(raw?.createdAt || 0) || nowMs();
    const subscribers = Array.isArray(raw?.subscribers) ? raw.subscribers.map((x) => String(x || "").trim().toLowerCase()).filter(Boolean) : [];
    const uniqSubs = [...new Set(subscribers)];
    const items = Array.isArray(raw?.items) ? raw.items.map(normalizeShelfItem).filter(Boolean) : [];
    return {
      id,
      name: normalizeShelfName(raw?.name),
      description: normalizeShelfDescription(raw?.description),
      owner: String(raw?.owner || "").trim().toLowerCase(),
      isPublic: raw?.isPublic !== false,
      createdAt,
      updatedAt: Number(raw?.updatedAt || createdAt) || createdAt,
      subscribers: uniqSubs,
      items,
    };
  }

  function userPrimaryShelfId(user) {
    return normalizeId(`shelf-user-${String(user || "").trim().toLowerCase()}`);
  }

  function ensureUserPrimaryShelf(store, user) {
    const u = String(user || "").trim().toLowerCase();
    if (!u) return { changed: false, shelf: null };
    const id = userPrimaryShelfId(u);
    const existing = store.shelves.find((s) => s.id === id);
    if (existing) return { changed: false, shelf: existing };
    const t = nowMs();
    const shelf = {
      id,
      name: `${u}'s shelf`,
      description: "My personal shelf",
      owner: u,
      isPublic: true,
      createdAt: t,
      updatedAt: t,
      subscribers: [],
      items: [],
    };
    store.shelves.push(shelf);
    return { changed: true, shelf };
  }

  function migrateLegacy(parsed) {
    const legacyItems = Array.isArray(parsed?.items) ? parsed.items : [];
    const books = [];
    const communityItems = [];
    for (const it of legacyItems) {
      const book = normalizeBook(it);
      if (!book) continue;
      books.push(book);
      communityItems.push({
        id: createShelfItemId(),
        bookId: book.id,
        kind: "own",
        addedBy: String(book.createdBy || ""),
        addedAt: Number(book.createdAt || nowMs()),
        note: "",
        sourceBookId: "",
        sourceShelfId: "",
      });
    }
    const t = nowMs();
    return {
      version: 2,
      books,
      shelves: [
        {
          id: "shelf-community",
          name: "Community shelf",
          description: "Shared shelf migrated from the classic library.",
          owner: "",
          isPublic: true,
          createdAt: t,
          updatedAt: t,
          subscribers: [],
          items: communityItems,
        },
      ],
    };
  }

  function loadStore() {
    const parsed = readJsonOrNull(dataFile);
    if (!parsed || typeof parsed !== "object") {
      return { version: 2, books: [], shelves: [] };
    }
    if (Number(parsed.version || 0) !== 2) return migrateLegacy(parsed);
    const books = Array.isArray(parsed.books) ? parsed.books.map(normalizeBook).filter(Boolean) : [];
    const byBook = new Map(books.map((b) => [b.id, b]));
    const shelves = Array.isArray(parsed.shelves) ? parsed.shelves.map(normalizeShelf).filter(Boolean) : [];
    for (const shelf of shelves) {
      shelf.items = shelf.items.filter((si) => byBook.has(si.bookId));
    }
    return { version: 2, books, shelves };
  }

  function saveStore(store) {
    writeFileAtomic(
      dataFile,
      JSON.stringify(
        {
          version: 2,
          books: Array.isArray(store?.books) ? store.books : [],
          shelves: Array.isArray(store?.shelves) ? store.shelves : [],
        },
        null,
        2
      ) + "\n"
    );
  }

  function findShelf(store, shelfId) {
    const id = normalizeId(shelfId);
    if (!id) return null;
    return store.shelves.find((s) => s.id === id) || null;
  }

  function findBook(store, bookId) {
    const id = normalizeId(bookId);
    if (!id) return null;
    return store.books.find((b) => b.id === id) || null;
  }

  function removeBookIfOrphan(store, bookId) {
    const id = normalizeId(bookId);
    if (!id) return null;
    const stillReferenced = store.shelves.some((shelf) => shelf.items.some((si) => si.bookId === id));
    if (stillReferenced) return null;
    const idx = store.books.findIndex((b) => b.id === id);
    if (idx < 0) return null;
    const book = store.books[idx];
    store.books.splice(idx, 1);
    return book;
  }

  function isShelfOwner(user, shelf) {
    return Boolean(user) && String(shelf?.owner || "") === String(user || "");
  }

  function canViewShelf(user, shelf) {
    if (!shelf) return false;
    if (shelf.isPublic) return true;
    return isShelfOwner(user, shelf);
  }

  function canAccessBook(user, store, bookId) {
    const id = normalizeId(bookId);
    if (!id) return false;
    return store.shelves.some((shelf) => canViewShelf(user, shelf) && shelf.items.some((si) => si.bookId === id));
  }

  function popularityByBook(store) {
    const byId = new Map();
    const add = (id, field) => {
      if (!id) return;
      if (!byId.has(id)) byId.set(id, { pins: 0, checkouts: 0 });
      byId.get(id)[field] += 1;
    };
    for (const shelf of store.shelves) {
      for (const si of shelf.items) {
        if (si.kind === "pin") add(si.bookId, "pins");
      }
    }
    for (const book of store.books) {
      if (book.sourceBookId) add(book.sourceBookId, "checkouts");
    }
    return byId;
  }

  function makeSnapshot(ws) {
    const u = username(ws);
    const role = userRole(ws);
    const isOwner = role === "owner";
    const store = loadStore();
    const ensured = ensureUserPrimaryShelf(store, u);
    if (ensured.changed) saveStore(store);

    const pop = popularityByBook(store);
    const booksById = new Map(store.books.map((b) => [b.id, b]));
    const shelves = store.shelves
      .filter((shelf) => canViewShelf(u, shelf))
      .sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0))
      .map((shelf) => {
        const shelfOwner = isShelfOwner(u, shelf);
        const items = shelf.items
          .slice()
          .sort((a, b) => Number(b.addedAt || 0) - Number(a.addedAt || 0))
          .map((si) => {
            const book = booksById.get(si.bookId);
            if (!book) return null;
            const score = pop.get(book.id) || { pins: 0, checkouts: 0 };
            return {
              id: si.id,
              kind: si.kind,
              addedAt: si.addedAt,
              addedBy: si.addedBy,
              note: si.note || "",
              sourceBookId: si.sourceBookId || "",
              sourceShelfId: si.sourceShelfId || "",
              canRemoveItem: shelfOwner,
              canReturn: shelfOwner && si.kind === "checkout",
              book: {
                id: book.id,
                kind: book.kind,
                title: book.title,
                author: book.author || normalizeAuthor(book.createdBy || ""),
                isOriginal: book.isOriginal !== false,
                tags: Array.isArray(book.tags) ? book.tags : [],
                format: String(book.format || (book.kind === "text" ? "text" : "pdf")),
                url: book.kind === "pdf" ? book.url : "",
                filename: book.kind === "pdf" ? book.filename : "",
                bytes: book.bytes,
                createdAt: book.createdAt,
                createdBy: book.createdBy,
                updatedAt: book.updatedAt || book.createdAt,
                sourceBookId: book.sourceBookId || "",
                sourceShelfId: book.sourceShelfId || "",
                checkedOutBy: book.checkedOutBy || "",
                popularity: { pins: Number(score.pins || 0), checkouts: Number(score.checkouts || 0) },
                canDeleteBook: isOwner || String(book.createdBy || "") === u,
              },
            };
          })
          .filter(Boolean);
        return {
          id: shelf.id,
          name: shelf.name,
          description: shelf.description || "",
          owner: shelf.owner || "",
          isPublic: shelf.isPublic !== false,
          createdAt: shelf.createdAt,
          updatedAt: shelf.updatedAt,
          isOwner: shelfOwner,
          isSubscribed: Boolean(u && shelf.subscribers.includes(u)),
          subscriberCount: Number((shelf.subscribers || []).length || 0),
          items,
        };
      });

    return {
      me: u,
      myShelfId: ensured.shelf?.id || userPrimaryShelfId(u),
      shelves,
    };
  }

  function broadcastChanged() {
    api.broadcast({ type: "plugin:library:changed" });
  }

  function send(ws, msg) {
    try {
      ws.send(JSON.stringify(msg));
      return true;
    } catch {
      return false;
    }
  }

  function sendError(ws, message, data) {
    send(ws, { type: "plugin:library:error", message: String(message || "Error."), data: data || null });
  }

  // Important: do not delete inflight uploads on WS close. Reconnects are common, and
  // the client may continue the upload on a new socket. Instead, time out abandoned uploads.
  setInterval(() => {
    const t = nowMs();
    for (const [uploadId, rec] of inFlight.entries()) {
      const last = Number(rec?.lastSeenAt || rec?.createdAt || 0);
      if (!last || t - last <= INFLIGHT_TTL_MS) continue;
      try {
        if (rec.fd) fs.closeSync(rec.fd);
      } catch {
        // ignore
      }
      try {
        if (rec.tmpPath) fs.unlinkSync(rec.tmpPath);
      } catch {
        // ignore
      }
      try {
        if (rec.metaPath && fs.existsSync(rec.metaPath)) fs.unlinkSync(rec.metaPath);
      } catch {
        // ignore
      }
      inFlight.delete(uploadId);
      api.log("info", "library:uploadTimeout", { uploadId, user: rec?.createdBy || "", received: rec?.received || 0, expected: rec?.expected || 0 });
    }
  }, 60_000).unref?.();

  api.registerWs("list", (ws) => {
    send(ws, { type: "plugin:library:list", ...makeSnapshot(ws) });
  });

  api.registerWs("shelfCreate", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const name = normalizeShelfName(msg?.name);
    const description = normalizeShelfDescription(msg?.description);
    const isPublic = msg?.isPublic !== false;
    const t = nowMs();
    const store = loadStore();
    const shelf = {
      id: createShelfId(),
      name,
      description,
      owner: u,
      isPublic,
      createdAt: t,
      updatedAt: t,
      subscribers: [],
      items: [],
    };
    store.shelves.push(shelf);
    saveStore(store);
    send(ws, { type: "plugin:library:shelfCreated", ok: true, shelfId: shelf.id });
    broadcastChanged();
  });

  api.registerWs("shelfUpdate", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const shelfId = normalizeId(msg?.shelfId);
    const store = loadStore();
    const shelf = findShelf(store, shelfId);
    if (!shelf) return sendError(ws, "Shelf not found.");
    if (!isShelfOwner(u, shelf)) return sendError(ws, "Only the shelf owner can edit it.");
    shelf.name = normalizeShelfName(msg?.name ?? shelf.name);
    shelf.description = normalizeShelfDescription(msg?.description ?? shelf.description);
    if (typeof msg?.isPublic === "boolean") shelf.isPublic = msg.isPublic;
    shelf.updatedAt = nowMs();
    saveStore(store);
    send(ws, { type: "plugin:library:shelfUpdated", ok: true, shelfId: shelf.id });
    broadcastChanged();
  });

  api.registerWs("shelfSubscribe", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const shelfId = normalizeId(msg?.shelfId);
    const subscribe = msg?.subscribe !== false;
    const store = loadStore();
    const shelf = findShelf(store, shelfId);
    if (!shelf || !canViewShelf(u, shelf)) return sendError(ws, "Shelf not found.");
    const set = new Set(Array.isArray(shelf.subscribers) ? shelf.subscribers : []);
    if (subscribe) set.add(u);
    else set.delete(u);
    shelf.subscribers = [...set];
    shelf.updatedAt = nowMs();
    saveStore(store);
    send(ws, { type: "plugin:library:shelfSubscribed", ok: true, shelfId: shelf.id, subscribed: subscribe });
    broadcastChanged();
  });

  api.registerWs("pinBook", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const shelfId = normalizeId(msg?.shelfId);
    const bookId = normalizeId(msg?.bookId);
    if (!shelfId || !bookId) return sendError(ws, "Missing shelf/book id.");
    const store = loadStore();
    const shelf = findShelf(store, shelfId);
    if (!shelf) return sendError(ws, "Shelf not found.");
    if (!isShelfOwner(u, shelf)) return sendError(ws, "You can only pin into your own shelves.");
    const book = findBook(store, bookId);
    if (!book) return sendError(ws, "Book not found.");
    if (!canAccessBook(u, store, book.id)) return sendError(ws, "Book not found.");
    if (shelf.items.some((si) => si.bookId === book.id && si.kind === "pin")) {
      return sendError(ws, "Already pinned on this shelf.");
    }
    shelf.items.push({
      id: createShelfItemId(),
      bookId: book.id,
      kind: "pin",
      addedBy: u,
      addedAt: nowMs(),
      note: "",
      sourceBookId: book.id,
      sourceShelfId: normalizeId(msg?.sourceShelfId || ""),
    });
    shelf.updatedAt = nowMs();
    saveStore(store);
    send(ws, { type: "plugin:library:pinned", ok: true, shelfId: shelf.id, bookId: book.id });
    broadcastChanged();
  });

  api.registerWs("checkoutBook", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const targetShelfId = normalizeId(msg?.targetShelfId);
    const sourceBookId = normalizeId(msg?.sourceBookId);
    const sourceShelfId = normalizeId(msg?.sourceShelfId);
    if (!targetShelfId || !sourceBookId) return sendError(ws, "Missing ids.");
    const store = loadStore();
    const shelf = findShelf(store, targetShelfId);
    if (!shelf) return sendError(ws, "Target shelf not found.");
    if (!isShelfOwner(u, shelf)) return sendError(ws, "You can only check out to your own shelf.");
    const source = findBook(store, sourceBookId);
    if (!source) return sendError(ws, "Source book not found.");
    if (!canAccessBook(u, store, source.id)) return sendError(ws, "Source book not found.");
    const t = nowMs();
    const copyId = crypto.randomBytes(10).toString("hex");
    const cloned = source.kind === "text"
      ? {
          id: copyId,
          kind: "text",
          title: source.title,
          author: source.author || source.createdBy || u,
          isOriginal: false,
          tags: normalizeTags(source.tags),
          format: String(source.format || "text").toLowerCase() === "rtf" ? "rtf" : "text",
          text: String(source.text || ""),
          bytes: Number(source.bytes || Buffer.byteLength(String(source.text || ""), "utf8")),
          createdAt: t,
          updatedAt: t,
          createdBy: u,
          sourceBookId: source.id,
          sourceShelfId,
          checkedOutBy: u,
        }
      : {
          id: copyId,
          kind: "pdf",
          title: source.title,
          author: source.author || source.createdBy || u,
          isOriginal: false,
          tags: normalizeTags(source.tags),
          format: "pdf",
          filename: source.filename,
          url: source.url,
          bytes: source.bytes,
          createdAt: t,
          updatedAt: t,
          createdBy: u,
          sourceBookId: source.id,
          sourceShelfId,
          checkedOutBy: u,
        };
    store.books.push(cloned);
    shelf.items.push({
      id: createShelfItemId(),
      bookId: cloned.id,
      kind: "checkout",
      addedBy: u,
      addedAt: t,
      note: "",
      sourceBookId: source.id,
      sourceShelfId,
    });
    shelf.updatedAt = t;
    saveStore(store);
    send(ws, { type: "plugin:library:checkedOut", ok: true, targetShelfId: shelf.id, newBookId: cloned.id, sourceBookId: source.id });
    broadcastChanged();
  });

  api.registerWs("shelfItemRemove", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const shelfId = normalizeId(msg?.shelfId);
    const shelfItemId = normalizeId(msg?.shelfItemId);
    if (!shelfId || !shelfItemId) return sendError(ws, "Missing ids.");
    const store = loadStore();
    const shelf = findShelf(store, shelfId);
    if (!shelf) return sendError(ws, "Shelf not found.");
    if (!isShelfOwner(u, shelf)) return sendError(ws, "Only the shelf owner can remove items.");
    const row = shelf.items.find((si) => si.id === shelfItemId);
    if (!row) return sendError(ws, "Item not found.");
    shelf.items = shelf.items.filter((si) => si.id !== shelfItemId);
    const maybeRemovedBook = removeBookIfOrphan(store, row.bookId);
    if (maybeRemovedBook?.kind === "pdf" && maybeRemovedBook.filename) {
      const filePath = path.join(uploadsDir, maybeRemovedBook.filename);
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {
        // ignore
      }
    }
    shelf.updatedAt = nowMs();
    saveStore(store);
    send(ws, { type: "plugin:library:shelfItemRemoved", ok: true, shelfId, shelfItemId });
    broadcastChanged();
  });

  api.registerWs("returnBook", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const shelfId = normalizeId(msg?.shelfId);
    const shelfItemId = normalizeId(msg?.shelfItemId);
    if (!shelfId || !shelfItemId) return sendError(ws, "Missing ids.");
    const store = loadStore();
    const shelf = findShelf(store, shelfId);
    if (!shelf) return sendError(ws, "Shelf not found.");
    if (!isShelfOwner(u, shelf)) return sendError(ws, "Only the shelf owner can return books.");
    const row = shelf.items.find((si) => si.id === shelfItemId);
    if (!row) return sendError(ws, "Item not found.");
    if (row.kind !== "checkout") return sendError(ws, "Only checked-out books can be returned.");

    shelf.items = shelf.items.filter((si) => si.id !== shelfItemId);
    const removed = removeBookIfOrphan(store, row.bookId);
    if (removed?.kind === "pdf" && removed.filename) {
      const filePath = path.join(uploadsDir, removed.filename);
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {
        // ignore
      }
    }
    shelf.updatedAt = nowMs();
    saveStore(store);
    send(ws, { type: "plugin:library:returned", ok: true, shelfId, shelfItemId, bookId: row.bookId });
    broadcastChanged();
  });

  api.registerWs("textGet", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const id = normalizeId(msg?.id);
    if (!id) return sendError(ws, "Missing id.");
    const store = loadStore();
    if (!canAccessBook(u, store, id)) return sendError(ws, "Not found.");
    const it = findBook(store, id);
    if (!it || it.kind !== "text") return sendError(ws, "Not found.");
    send(ws, {
      type: "plugin:library:text",
      item: {
        id: it.id,
        kind: "text",
        title: it.title,
        author: it.author || normalizeAuthor(it.createdBy || ""),
        isOriginal: it.isOriginal !== false,
        tags: Array.isArray(it.tags) ? it.tags : [],
        format: String(it.format || "text"),
        text: String(it.text || ""),
        bytes: Number(it.bytes || Buffer.byteLength(String(it.text || ""), "utf8")),
        createdAt: it.createdAt,
        createdBy: it.createdBy,
        updatedAt: it.updatedAt || it.createdAt,
      },
    });
  });

  api.registerWs("textCreate", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const store = loadStore();
    const ensured = ensureUserPrimaryShelf(store, u);
    const shelfId = normalizeId(msg?.shelfId || ensured.shelf?.id);
    const shelf = findShelf(store, shelfId);
    if (!shelf) return sendError(ws, "Shelf not found.");
    if (!isShelfOwner(u, shelf)) return sendError(ws, "You can only add books to your own shelf.");
    const title = normalizeTextTitle(msg?.title);
    const author = normalizeAuthor(msg?.author || u);
    const isOriginal = msg?.isOriginal !== false;
    const tags = normalizeTags(msg?.tags);
    const format = String(msg?.format || "text").toLowerCase() === "rtf" ? "rtf" : "text";
    const text = normalizeTextBody(msg?.text);
    const bytes = Buffer.byteLength(text, "utf8");
    if (bytes > MAX_TEXT_BYTES) return sendError(ws, `Text too large. Max is ${MAX_TEXT_BYTES} bytes.`);

    const id = crypto.randomBytes(10).toString("hex");
    const t = nowMs();
    store.books.push({
      id,
      kind: "text",
      title,
      author,
      isOriginal,
      tags,
      format,
      text,
      bytes,
      createdAt: t,
      updatedAt: t,
      createdBy: u,
    });
    shelf.items.push({
      id: createShelfItemId(),
      bookId: id,
      kind: "own",
      addedBy: u,
      addedAt: t,
      note: "",
      sourceBookId: "",
      sourceShelfId: "",
    });
    shelf.updatedAt = t;
    saveStore(store);
    api.log("info", "library:textCreate", { id, bytes, user: u, shelfId: shelf.id });
    send(ws, { type: "plugin:library:textCreated", ok: true, id });
    broadcastChanged();
  });

  api.registerWs("textUpdate", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const id = normalizeId(msg?.id);
    if (!id) return sendError(ws, "Missing id.");

    const store = loadStore();
    const idx = store.books.findIndex((x) => x.id === id);
    if (idx < 0) return sendError(ws, "Not found.");
    const it = store.books[idx];
    if (it.kind !== "text") return sendError(ws, "Not found.");
    if (String(it.createdBy || "") !== u) return sendError(ws, "Only the author can edit this text.");

    const title = normalizeTextTitle(msg?.title ?? it.title);
    const author = normalizeAuthor(msg?.author ?? it.author ?? u);
    const isOriginal = typeof msg?.isOriginal === "boolean" ? msg.isOriginal : it.isOriginal !== false;
    const tags = Array.isArray(msg?.tags) ? normalizeTags(msg.tags) : Array.isArray(it.tags) ? normalizeTags(it.tags) : [];
    const format = String(msg?.format || it.format || "text").toLowerCase() === "rtf" ? "rtf" : "text";
    const text = normalizeTextBody(msg?.text);
    const bytes = Buffer.byteLength(text, "utf8");
    if (bytes > MAX_TEXT_BYTES) return sendError(ws, `Text too large. Max is ${MAX_TEXT_BYTES} bytes.`);

    const t = nowMs();
    store.books[idx] = { ...it, title, author, isOriginal, tags, format, text, bytes, updatedAt: t };
    saveStore(store);
    api.log("info", "library:textUpdate", { id, bytes, user: u });
    send(ws, { type: "plugin:library:textUpdated", ok: true, id, updatedAt: t });
    broadcastChanged();
  });

  api.registerWs("uploadStart", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const store = loadStore();
    const ensured = ensureUserPrimaryShelf(store, u);
    const shelfId = normalizeId(msg?.shelfId || ensured.shelf?.id);
    const shelf = findShelf(store, shelfId);
    if (!shelf) return sendError(ws, "Shelf not found.");
    if (!isShelfOwner(u, shelf)) return sendError(ws, "You can only upload to your own shelf.");
    if (ensured.changed) saveStore(store);

    const size = Number(msg?.size || 0);
    if (!Number.isFinite(size) || size <= 0) return sendError(ws, "Invalid file size.");
    if (size > MAX_PDF_BYTES) return sendError(ws, `PDF too large. Max is ${MAX_PDF_BYTES} bytes.`);

    const original = String(msg?.filename || "").trim();
    const mime = String(msg?.mime || "").trim().toLowerCase();
    const isPdf = /\\.pdf$/i.test(original) || mime === "application/pdf";
    if (!isPdf) return sendError(ws, "Only PDF files are supported.");

    const title = normalizeTitle(msg?.title || original.replace(/\\.pdf$/i, ""));
    const author = normalizeAuthor(msg?.author || u);
    const isOriginal = msg?.isOriginal !== false;
    const tags = normalizeTags(msg?.tags);
    const uploadId = crypto.randomBytes(12).toString("hex");

    fs.mkdirSync(tmpDir, { recursive: true });
    const tmpPath = path.join(tmpDir, `${uploadId}.part`);
    const metaPath = metaPathFor(uploadId);
    let fd = null;
    try {
      fd = fs.openSync(tmpPath, "w");
    } catch (e) {
      return sendError(ws, "Failed to start upload.", { error: e?.message || String(e) });
    }

    const t = nowMs();
    try {
      writeMeta(metaPath, {
        version: 1,
        uploadId,
        tmpPath,
        expected: size,
        received: 0,
        createdAt: t,
        createdBy: u,
        title,
        author,
        isOriginal,
        tags,
        shelfId: shelf.id,
      });
    } catch (e) {
      try {
        fs.closeSync(fd);
      } catch {
        // ignore
      }
      try {
        fs.unlinkSync(tmpPath);
      } catch {
        // ignore
      }
      return sendError(ws, "Failed to start upload.", { error: e?.message || String(e) });
    }

    inFlight.set(uploadId, {
      fd,
      tmpPath,
      metaPath,
      expected: size,
      received: 0,
      createdAt: t,
      createdBy: u,
      title,
      author,
      isOriginal,
      tags,
      shelfId: shelf.id,
      lastSeenAt: t,
    });
    api.log("info", "library:uploadStart", { uploadId, size, user: u, shelfId: shelf.id });
    send(ws, { type: "plugin:library:uploadStarted", uploadId, maxBytes: MAX_PDF_BYTES });
  });

  api.registerWs("uploadChunk", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const uploadId = normalizeId(msg?.uploadId);
    let rec = inFlight.get(uploadId);
    if (!rec) rec = tryResumeInflight(uploadId, u);
    if (!rec || rec.createdBy !== u) return sendError(ws, "Upload not found.");

    const b64 = typeof msg?.data === "string" ? msg.data : "";
    if (!b64) return sendError(ws, "Missing chunk data.");
    if (b64.length > CHUNK_MAX_B64) return sendError(ws, "Chunk too large.");

    let buf = null;
    try {
      buf = Buffer.from(b64, "base64");
    } catch (e) {
      return sendError(ws, "Invalid base64 chunk.", { error: e?.message || String(e) });
    }
    if (!buf.length) return sendError(ws, "Empty chunk.");

    const next = rec.received + buf.length;
    if (next > rec.expected) return sendError(ws, "Upload exceeds expected size.");

    try {
      fs.writeSync(rec.fd, buf, 0, buf.length, rec.received);
    } catch (e) {
      return sendError(ws, "Failed writing chunk.", { error: e?.message || String(e) });
    }
    rec.received = next;
    rec.lastSeenAt = nowMs();
    inFlight.set(uploadId, rec);
    try {
      writeMeta(rec.metaPath, {
        version: 1,
        uploadId,
        tmpPath: rec.tmpPath,
        expected: rec.expected,
        received: rec.received,
        createdAt: rec.createdAt,
        createdBy: rec.createdBy,
        title: rec.title,
        author: rec.author || rec.createdBy || "",
        isOriginal: rec.isOriginal !== false,
        tags: normalizeTags(rec.tags),
        shelfId: rec.shelfId || "",
      });
    } catch {
      // ignore
    }

    if (rec.received % (1024 * 1024) < buf.length) {
      send(ws, { type: "plugin:library:uploadProgress", uploadId, received: rec.received, expected: rec.expected });
    }
  });

  api.registerWs("uploadFinish", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const uploadId = normalizeId(msg?.uploadId);
    let rec = inFlight.get(uploadId);
    if (!rec) rec = tryResumeInflight(uploadId, u);
    if (!rec || rec.createdBy !== u) return sendError(ws, "Upload not found.");

    if (rec.received !== rec.expected) {
      return sendError(ws, "Upload incomplete.", { received: rec.received, expected: rec.expected });
    }

    try {
      fs.closeSync(rec.fd);
    } catch {
      // ignore
    }

    fs.mkdirSync(uploadsDir, { recursive: true });
    const stamp = new Date(rec.createdAt).toISOString().replace(/[:.]/g, "-");
    const safe = sanitizeFilename(rec.title);
    const finalName = `${safe}-${stamp}-${crypto.randomBytes(4).toString("hex")}.pdf`;
    const finalPath = path.join(uploadsDir, finalName);
    try {
      fs.renameSync(rec.tmpPath, finalPath);
    } catch (e) {
      try {
        fs.unlinkSync(rec.tmpPath);
      } catch {
        // ignore
      }
      inFlight.delete(uploadId);
      return sendError(ws, "Failed to finalize upload.", { error: e?.message || String(e) });
    }

    const store = loadStore();
    const shelf = findShelf(store, rec.shelfId || userPrimaryShelfId(u));
    if (!shelf || !isShelfOwner(u, shelf)) {
      try {
        if (fs.existsSync(finalPath)) fs.unlinkSync(finalPath);
      } catch {
        // ignore
      }
      inFlight.delete(uploadId);
      return sendError(ws, "Target shelf not found.");
    }
    const itemId = crypto.randomBytes(10).toString("hex");
    const item = {
      id: itemId,
      kind: "pdf",
      title: rec.title,
      author: normalizeAuthor(rec.author || u),
      isOriginal: rec.isOriginal !== false,
      tags: normalizeTags(rec.tags),
      format: "pdf",
      filename: finalName,
      url: `/uploads/library/${finalName}`,
      bytes: rec.expected,
      createdAt: rec.createdAt,
      createdBy: u,
    };
    store.books.push(item);
    shelf.items.push({
      id: createShelfItemId(),
      bookId: itemId,
      kind: "own",
      addedBy: u,
      addedAt: rec.createdAt,
      note: "",
      sourceBookId: "",
      sourceShelfId: "",
    });
    shelf.updatedAt = nowMs();
    saveStore(store);
    inFlight.delete(uploadId);
    try {
      if (rec.metaPath && fs.existsSync(rec.metaPath)) fs.unlinkSync(rec.metaPath);
    } catch {
      // ignore
    }

    api.log("info", "library:uploadFinish", { id: itemId, bytes: rec.expected, user: u });
    send(ws, { type: "plugin:library:uploadFinished", ok: true, item });
    broadcastChanged();
  });

  api.registerWs("delete", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const id = normalizeId(msg?.id);
    if (!id) return sendError(ws, "Missing id.");

    const role = userRole(ws);
    const isOwner = role === "owner";

    const store = loadStore();
    const idx = store.books.findIndex((it) => it.id === id);
    if (idx < 0) return sendError(ws, "Not found.");
    const item = store.books[idx];
    if (!isOwner && item.createdBy !== u) return sendError(ws, "Not allowed.");

    store.books.splice(idx, 1);
    for (const shelf of store.shelves) {
      const before = shelf.items.length;
      shelf.items = shelf.items.filter((si) => si.bookId !== id);
      if (shelf.items.length !== before) shelf.updatedAt = nowMs();
    }
    saveStore(store);

    if (item.kind === "pdf" && item.filename) {
      const stillUsed = store.books.some((b) => b.kind === "pdf" && String(b.filename || "") === String(item.filename || ""));
      if (!stillUsed) {
        const filePath = path.join(uploadsDir, item.filename);
        try {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch {
          // ignore
        }
      }
    }

    api.log("info", "library:delete", { id, user: u });
    send(ws, { type: "plugin:library:deleted", ok: true, id });
    broadcastChanged();
  });
};
