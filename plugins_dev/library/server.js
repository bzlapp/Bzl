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
      lastSeenAt: t
    };
    inFlight.set(uploadId, rec);
    api.log("info", "library:uploadResumed", { uploadId, user: rec.createdBy, received, expected });
    return rec;
  }

  function loadItems() {
    const parsed = readJsonOrNull(dataFile);
    const items = Array.isArray(parsed?.items) ? parsed.items : [];
    return items
      .map((it) => ({
        id: normalizeId(it?.id),
        kind: String(it?.kind || "pdf") === "text" ? "text" : "pdf",
        title: String(it?.kind || "pdf") === "text" ? normalizeTextTitle(it?.title) : normalizeTitle(it?.title),
        url: String(it?.url || ""),
        filename: String(it?.filename || ""),
        bytes: Number(it?.bytes || 0),
        createdAt: Number(it?.createdAt || 0),
        createdBy: String(it?.createdBy || ""),
        updatedAt: Number(it?.updatedAt || 0),
        text: typeof it?.text === "string" ? it.text : "",
      }))
      .filter((it) => {
        if (!it.id) return false;
        if (it.kind === "pdf") return Boolean(it.url && it.filename);
        return true;
      });
  }

  function saveItems(items) {
    writeFileAtomic(dataFile, JSON.stringify({ version: 1, items }, null, 2) + "\n");
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

  function listForClient() {
    const items = loadItems();
    items.sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
    return items.map((it) => {
      if (it.kind === "text") {
        return {
          id: it.id,
          kind: "text",
          title: it.title,
          bytes: Number(it.bytes || Buffer.byteLength(String(it.text || ""), "utf8")),
          createdAt: it.createdAt,
          createdBy: it.createdBy,
          updatedAt: it.updatedAt || it.createdAt,
        };
      }
      return {
        id: it.id,
        kind: "pdf",
        title: it.title,
        url: it.url,
        filename: it.filename,
        bytes: it.bytes,
        createdAt: it.createdAt,
        createdBy: it.createdBy,
      };
    });
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
    send(ws, { type: "plugin:library:list", items: listForClient() });
  });

  api.registerWs("textGet", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const id = normalizeId(msg?.id);
    if (!id) return sendError(ws, "Missing id.");
    const items = loadItems();
    const it = items.find((x) => x.id === id);
    if (!it || it.kind !== "text") return sendError(ws, "Not found.");
    send(ws, {
      type: "plugin:library:text",
      item: {
        id: it.id,
        kind: "text",
        title: it.title,
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
    const title = normalizeTextTitle(msg?.title);
    const text = normalizeTextBody(msg?.text);
    const bytes = Buffer.byteLength(text, "utf8");
    if (bytes > MAX_TEXT_BYTES) return sendError(ws, `Text too large. Max is ${MAX_TEXT_BYTES} bytes.`);

    const items = loadItems();
    const id = crypto.randomBytes(10).toString("hex");
    const t = nowMs();
    items.push({
      id,
      kind: "text",
      title,
      text,
      bytes,
      createdAt: t,
      updatedAt: t,
      createdBy: u,
    });
    saveItems(items);
    api.log("info", "library:textCreate", { id, bytes, user: u });
    send(ws, { type: "plugin:library:textCreated", ok: true, id });
    api.broadcast({ type: "plugin:library:changed" });
  });

  api.registerWs("textUpdate", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const id = normalizeId(msg?.id);
    if (!id) return sendError(ws, "Missing id.");

    const items = loadItems();
    const idx = items.findIndex((x) => x.id === id);
    if (idx < 0) return sendError(ws, "Not found.");
    const it = items[idx];
    if (it.kind !== "text") return sendError(ws, "Not found.");
    if (String(it.createdBy || "") !== u) return sendError(ws, "Only the author can edit this text.");

    const title = normalizeTextTitle(msg?.title ?? it.title);
    const text = normalizeTextBody(msg?.text);
    const bytes = Buffer.byteLength(text, "utf8");
    if (bytes > MAX_TEXT_BYTES) return sendError(ws, `Text too large. Max is ${MAX_TEXT_BYTES} bytes.`);

    const t = nowMs();
    items[idx] = { ...it, title, text, bytes, updatedAt: t };
    saveItems(items);
    api.log("info", "library:textUpdate", { id, bytes, user: u });
    send(ws, { type: "plugin:library:textUpdated", ok: true, id, updatedAt: t });
    api.broadcast({ type: "plugin:library:changed" });
  });

  api.registerWs("uploadStart", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");

    const size = Number(msg?.size || 0);
    if (!Number.isFinite(size) || size <= 0) return sendError(ws, "Invalid file size.");
    if (size > MAX_PDF_BYTES) return sendError(ws, `PDF too large. Max is ${MAX_PDF_BYTES} bytes.`);

    const original = String(msg?.filename || "").trim();
    const mime = String(msg?.mime || "").trim().toLowerCase();
    const isPdf = /\\.pdf$/i.test(original) || mime === "application/pdf";
    if (!isPdf) return sendError(ws, "Only PDF files are supported.");

    const title = normalizeTitle(msg?.title || original.replace(/\\.pdf$/i, ""));
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
      writeMeta(metaPath, { version: 1, uploadId, tmpPath, expected: size, received: 0, createdAt: t, createdBy: u, title });
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

    inFlight.set(uploadId, { fd, tmpPath, metaPath, expected: size, received: 0, createdAt: t, createdBy: u, title, lastSeenAt: t });
    api.log("info", "library:uploadStart", { uploadId, size, user: u });
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

    const items = loadItems();
    const itemId = crypto.randomBytes(10).toString("hex");
    const item = {
      id: itemId,
      kind: "pdf",
      title: rec.title,
      filename: finalName,
      url: `/uploads/library/${finalName}`,
      bytes: rec.expected,
      createdAt: rec.createdAt,
      createdBy: u,
    };
    items.push(item);
    saveItems(items);
    inFlight.delete(uploadId);
    try {
      if (rec.metaPath && fs.existsSync(rec.metaPath)) fs.unlinkSync(rec.metaPath);
    } catch {
      // ignore
    }

    api.log("info", "library:uploadFinish", { id: itemId, bytes: rec.expected, user: u });
    send(ws, { type: "plugin:library:uploadFinished", ok: true, item });
    api.broadcast({ type: "plugin:library:changed" });
  });

  api.registerWs("delete", (ws, msg) => {
    const u = username(ws);
    if (!u) return sendError(ws, "Sign in required.");
    const id = normalizeId(msg?.id);
    if (!id) return sendError(ws, "Missing id.");

    const role = userRole(ws);
    const isOwner = role === "owner";

    const items = loadItems();
    const idx = items.findIndex((it) => it.id === id);
    if (idx < 0) return sendError(ws, "Not found.");
    const item = items[idx];
    if (!isOwner && item.createdBy !== u) return sendError(ws, "Not allowed.");

    items.splice(idx, 1);
    saveItems(items);

    if (item.kind === "pdf") {
      const filePath = path.join(uploadsDir, item.filename);
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {
        // ignore
      }
    }

    api.log("info", "library:delete", { id, user: u });
    send(ws, { type: "plugin:library:deleted", ok: true, id });
    api.broadcast({ type: "plugin:library:changed" });
  });
};
