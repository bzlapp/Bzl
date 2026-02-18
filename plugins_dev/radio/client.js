(() => {
  if (!window?.BzlPluginHost?.register) return;

  const PLUGIN_ID = "radio";
  const LS_ON = "bzl_radio_on";
  const LS_TUNED = "bzl_radio_stationId";

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

  function getSessionTokenSafe() {
    try {
      // Core stores the session token in localStorage.
      return localStorage.getItem("bzl_session_token") || "";
    } catch {
      return "";
    }
  }

  async function uploadMp3(file, toast) {
    if (!file) return "";
    const lowered = String(file.name || "").toLowerCase();
    const isMp3 = lowered.endsWith(".mp3") || String(file.type || "").toLowerCase() === "audio/mpeg";
    if (!isMp3) {
      toast("Radio", "Only MP3 files are allowed.");
      return "";
    }
    const token = getSessionTokenSafe();
    if (!token) {
      toast("Radio", "Sign in required to upload MP3s.");
      return "";
    }
    try {
      const res = await fetch("/api/upload?kind=audio", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "audio/mpeg"
        },
        body: file
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast("Radio", payload?.error || "Upload failed.");
        return "";
      }
      const url = String(payload?.url || "");
      if (!url) {
        toast("Radio", "Upload failed (no URL).");
        return "";
      }
      if (!/\.mp3(\?|#|$)/i.test(url)) {
        toast("Radio", "Upload rejected (not an MP3 URL).");
        return "";
      }
      return url;
    } catch {
      toast("Radio", "Upload failed (network error).");
      return "";
    }
  }

  window.BzlPluginHost.register(PLUGIN_ID, (ctx) => {
    const ws = window.__bzlWs;
    let mountEl = null;
    let audioEl = null;
    let fileInputEl = null;

    let stations = [];
    let isOn = false;
    let tunedStationId = "";
    let playingStationId = "";
    let lastPlayedTrackUrl = "";
    let lastPlayedTrackSrc = "";
    let needsManualPlay = false;

    function readPrefs() {
      try {
        isOn = localStorage.getItem(LS_ON) === "1";
        tunedStationId = String(localStorage.getItem(LS_TUNED) || "").trim().toLowerCase();
      } catch {
        isOn = false;
        tunedStationId = "";
      }
    }

    function writeOn(next) {
      isOn = Boolean(next);
      try {
        localStorage.setItem(LS_ON, isOn ? "1" : "0");
      } catch {}
    }

    function writeTuned(id) {
      tunedStationId = String(id || "").trim().toLowerCase();
      try {
        localStorage.setItem(LS_TUNED, tunedStationId);
      } catch {}
    }

    function stationById(id) {
      const sid = String(id || "").trim().toLowerCase();
      return stations.find((s) => String(s?.id || "") === sid) || null;
    }

    function ensureTunedExists() {
      if (!stations.length) {
        tunedStationId = "";
        return;
      }
      if (tunedStationId && stationById(tunedStationId)) return;
      tunedStationId = String(stations[0]?.id || "");
    }

    function pickRandomTrack(station) {
      const tracks = Array.isArray(station?.tracks) ? station.tracks : [];
      if (!tracks.length) return null;
      if (tracks.length === 1) return tracks[0];
      for (let i = 0; i < 6; i++) {
        const t = tracks[Math.floor(Math.random() * tracks.length)];
        if (t && String(t.url || "") !== lastPlayedTrackUrl) return t;
      }
      return tracks[Math.floor(Math.random() * tracks.length)];
    }

    function stopPlayback() {
      playingStationId = "";
      lastPlayedTrackUrl = "";
      lastPlayedTrackSrc = "";
      needsManualPlay = false;
      if (!audioEl) return;
      try {
        audioEl.pause();
        audioEl.removeAttribute("src");
        audioEl.load();
      } catch {}
      updateNowEl();
    }

    async function startPlaybackFor(stationId) {
      if (!audioEl) return;
      const station = stationById(stationId);
      if (!station) return;
      const track = pickRandomTrack(station);
      if (!track || !track.url) {
        stopPlayback();
        return;
      }
      playingStationId = String(station.id || "");
      lastPlayedTrackUrl = String(track.url || "");
      needsManualPlay = false;
      try {
        lastPlayedTrackSrc = new URL(String(track.url || ""), window.location.origin).href;
      } catch {
        lastPlayedTrackSrc = String(track.url || "");
      }
      audioEl.src = lastPlayedTrackSrc;
      try {
        audioEl.load();
      } catch {}
      try {
        await audioEl.play();
      } catch {
        // Autoplay can be blocked; keep controls visible and prompt user to press play.
        needsManualPlay = true;
      }
      updateNowEl();
    }

    function updateNowEl() {
      if (!mountEl) return;
      const nowWrap = mountEl.querySelector(".radioNow");
      if (!nowWrap) return;
      ensureTunedExists();
      const tuned = tunedStationId ? stationById(tunedStationId) : null;
      const trackCount = tuned ? Number(tuned.trackCount || (tuned.tracks || []).length || 0) : 0;
      const isPlaying = Boolean(isOn && playingStationId && playingStationId === tunedStationId);
      const nowTrack = isPlaying ? (tuned?.tracks || []).find((t) => String(t.url || "") === lastPlayedTrackUrl) : null;

      nowWrap.innerHTML = `
        ${
          !tuned
            ? `<span class="muted">No stations available.</span>`
            : !isOn
              ? `<span class="muted">Radio is off. Tune around, then toggle it on to listen.</span>`
              : trackCount === 0
                ? `<span class="muted">This station has no tracks yet. Upload some MP3s.</span>`
                : nowTrack
                  ? `Now playing: <b>${esc(nowTrack.title || "Track")}</b> <span class="muted">(${esc(
                      nowTrack.addedBy ? `@${nowTrack.addedBy}` : "unknown"
                    )})</span>`
                  : needsManualPlay
                    ? `<span class="muted">Press play to start listening (browser blocked autoplay).</span>`
                    : `<span class="muted">Ready.</span>`
        }
      `;
    }

    function stepTune(dir) {
      if (!stations.length) return;
      const currentIdx = Math.max(
        0,
        stations.findIndex((s) => String(s?.id || "") === tunedStationId)
      );
      const nextIdx = (currentIdx + (dir < 0 ? -1 : 1) + stations.length) % stations.length;
      const nextId = String(stations[nextIdx]?.id || "");
      writeTuned(nextId);
      render();
      if (isOn) {
        stopPlayback();
        startPlaybackFor(nextId);
      }
    }

    function render() {
      if (!mountEl) return;
      ensureTunedExists();

      const tuned = tunedStationId ? stationById(tunedStationId) : null;
      const canUpload = Boolean(ctx.getUser && ctx.getUser());
      const tunedName = tuned ? tuned.name : "No stations yet";
      const tunedAuthor = tuned ? tuned.author : "";
      const trackCount = tuned ? Number(tuned.trackCount || (tuned.tracks || []).length || 0) : 0;
      const isPlaying = Boolean(isOn && playingStationId && playingStationId === tunedStationId);
      const nowTrack = isPlaying ? (tuned?.tracks || []).find((t) => String(t.url || "") === lastPlayedTrackUrl) : null;

      mountEl.innerHTML = `
        <style>
          .radioWrap { display:flex; flex-direction:column; gap:10px; }
          .radioTop { display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; }
          .radioRow { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
          .radioStation { display:flex; flex-direction:column; gap:2px; padding:10px 12px; border:1px solid rgba(246,240,255,0.12); background:rgba(255,255,255,0.02); border-radius:14px; }
          .radioStationName { font-weight:900; letter-spacing:0.2px; }
          .radioMeta { opacity:0.75; }
          .radioNow { padding:8px 10px; border:1px dashed rgba(246,240,255,0.16); border-radius:12px; background:rgba(0,0,0,0.12); }
          .radioBtns button { padding:7px 10px; border-radius:10px; }
          .radioArrow { font-size:16px; line-height:1; }
          .radioSmall { font-size: 12px; opacity: 0.8; }
          .radioList { max-height: 220px; overflow:auto; border:1px solid rgba(246,240,255,0.10); border-radius:12px; }
          .radioStationItem { padding:8px 10px; display:flex; justify-content:space-between; gap:10px; border-bottom:1px solid rgba(246,240,255,0.06); cursor:pointer; }
          .radioStationItem:last-child { border-bottom:0; }
          .radioStationItem.active { background: rgba(255, 184, 77, 0.08); }
        </style>
        <div class="radioWrap">
          <div class="radioTop">
            <div class="radioRow">
              <label class="row" style="gap:8px;align-items:center">
                <input type="checkbox" data-radioon="1" ${isOn ? "checked" : ""} />
                <span style="font-weight:900">Radio</span>
              </label>
              <div class="radioBtns radioRow">
                <button type="button" class="ghost smallBtn radioArrow" data-tune="-1" title="Tune left">←</button>
                <button type="button" class="ghost smallBtn radioArrow" data-tune="1" title="Tune right">→</button>
              </div>
            </div>
            <div class="radioRow">
              <button type="button" class="ghost smallBtn" data-newstation="1">New station</button>
              <button type="button" class="ghost smallBtn" data-upload="1" ${!tuned ? "disabled" : ""}>Upload MP3s</button>
              <input type="file" accept=\".mp3,audio/mpeg\" multiple style="display:none" data-filepick="1" />
            </div>
          </div>

          <div class="radioStation">
            <div class="radioStationName">${esc(tunedName)}</div>
            <div class="radioMeta small muted">${tunedAuthor ? `by @${esc(tunedAuthor)} • ${trackCount} track${trackCount === 1 ? "" : "s"}` : "Create a station to get started."}</div>
          </div>

          <div class="radioNow small">
            ${
              !tuned
                ? `<span class="muted">No stations available.</span>`
                : !isOn
                  ? `<span class="muted">Radio is off. Tune around, then toggle it on to listen.</span>`
                  : trackCount === 0
                    ? `<span class="muted">This station has no tracks yet. Upload some MP3s.</span>`
                    : nowTrack
                      ? `Now playing: <b>${esc(nowTrack.title || "Track")}</b> <span class="muted">(${esc(nowTrack.addedBy ? `@${nowTrack.addedBy}` : "unknown")})</span>`
                      : needsManualPlay
                        ? `<span class="muted">Press play to start listening (browser blocked autoplay).</span>`
                        : `<span class="muted">Ready.</span>`
            }
          </div>

          <audio controls preload="none" style="width:100%"></audio>

          <div class="radioSmall muted">Stations</div>
          <div class="radioList">
            ${
              stations.length
                ? stations
                    .map((s) => {
                      const active = String(s.id || "") === tunedStationId;
                      const count = Number(s.trackCount || (s.tracks || []).length || 0);
                      return `<div class="radioStationItem ${active ? "active" : ""}" data-station="${esc(s.id)}">
                        <span><b>${esc(s.name || "Station")}</b> <span class="muted">by @${esc(s.author || "")}</span></span>
                        <span class="muted">${count}</span>
                      </div>`;
                    })
                    .join("")
                : `<div class="small muted" style="padding:10px">No stations yet.</div>`
            }
          </div>
        </div>
      `;

      audioEl = mountEl.querySelector("audio");
      fileInputEl = mountEl.querySelector('[data-filepick="1"]');

      if (audioEl) {
        // This plugin re-renders via innerHTML. Preserve the last selected track across renders so
        // the native audio controls don't end up disabled (no src).
        if (lastPlayedTrackSrc) {
          const current = String(audioEl.getAttribute("src") || "");
          if (current !== lastPlayedTrackSrc) {
            audioEl.src = lastPlayedTrackSrc;
            try {
              audioEl.load();
            } catch {}
          }
        }
      }

      const onEl = mountEl.querySelector('[data-radioon="1"]');
      const uploadBtn = mountEl.querySelector('[data-upload="1"]');

      if (onEl) {
        onEl.addEventListener("change", () => {
          writeOn(Boolean(onEl.checked));
          render();
          if (!isOn) stopPlayback();
          else if (tunedStationId) startPlaybackFor(tunedStationId);
        });
      }

      mountEl.querySelectorAll("[data-tune]").forEach((btn) => {
        btn.addEventListener("click", () => stepTune(Number(btn.getAttribute("data-tune") || "0")));
      });

      mountEl.querySelectorAll("[data-station]").forEach((row) => {
        row.addEventListener("click", () => {
          const id = String(row.getAttribute("data-station") || "").trim().toLowerCase();
          if (!id) return;
          writeTuned(id);
          render();
          if (isOn) {
            stopPlayback();
            startPlaybackFor(id);
          }
        });
      });

      const newBtn = mountEl.querySelector('[data-newstation="1"]');
      if (newBtn) {
        newBtn.addEventListener("click", () => {
          const name = prompt("Station name:");
          if (!name) return;
          ctx.send("createStation", { name: String(name).trim() });
        });
      }

      if (uploadBtn && fileInputEl) {
        uploadBtn.addEventListener("click", () => {
          if (!canUpload) {
            ctx.toast("Radio", "Sign in required to upload MP3s.");
            return;
          }
          if (!tunedStationId) return;
          fileInputEl.value = "";
          fileInputEl.click();
        });
        fileInputEl.addEventListener("change", async () => {
          const files = Array.from(fileInputEl.files || []);
          if (!files.length || !tunedStationId) return;
          const uploaded = [];
          for (const f of files) {
            const url = await uploadMp3(f, ctx.toast);
            if (!url) continue;
            uploaded.push({ url, title: String(f.name || "track").replace(/\.mp3$/i, "") });
          }
          if (!uploaded.length) return;
          ctx.send("addTracks", { stationId: tunedStationId, tracks: uploaded });
        });
      }

      if (audioEl) {
        audioEl.addEventListener("ended", () => {
          if (!isOn) return;
          if (!tunedStationId) return;
          startPlaybackFor(tunedStationId);
        });
        audioEl.addEventListener("error", () => {
          if (!isOn) return;
          stopPlayback();
          updateNowEl();
        });
        audioEl.addEventListener("play", () => {
          needsManualPlay = false;
          updateNowEl();
        });
      }

      // Keep audio element in sync with current state.
      if (!isOn) stopPlayback();
      else if (tunedStationId && (!playingStationId || playingStationId !== tunedStationId) && !needsManualPlay) {
        stopPlayback();
        startPlaybackFor(tunedStationId);
      }
    }

    function onWsMessage(evt) {
      let msg;
      try {
        msg = safeJsonParse(evt.data);
      } catch {
        return;
      }
      if (!msg || typeof msg !== "object") return;
      const type = String(msg.type || "");
      if (type === "plugin:radio:stations") {
        stations = Array.isArray(msg.stations) ? msg.stations : [];
        stations.sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
        ensureTunedExists();
        render();
        return;
      }
      if (type === "plugin:radio:createOk") {
        const id = String(msg.stationId || "").trim().toLowerCase();
        if (id) {
          writeTuned(id);
          render();
        }
        return;
      }
      if (type === "plugin:radio:addOk") {
        ctx.toast("Radio", `Added ${Number(msg.added || 0)} track(s).`);
        return;
      }
      if (type === "plugin:radio:error") {
        ctx.toast("Radio", String(msg.message || "Radio error."));
      }
    }

    readPrefs();

    ctx.ui?.registerPanel?.({
      id: "radio",
      title: "Radio",
      icon: "📻",
      defaultRack: "right",
      role: "aux",
      presetHints: {
        defaultSocial: { place: "docked.bottom" },
        browse: { place: "docked.bottom" },
        mapsSession: { place: "right" }
      },
      render(mount) {
        mountEl = mount;
        stations = [];
        playingStationId = "";
        lastPlayedTrackUrl = "";
        if (ws && ws.addEventListener) ws.addEventListener("message", onWsMessage);
        ctx.send("stateReq", {});
        render();
        return () => {
          if (ws && ws.removeEventListener) ws.removeEventListener("message", onWsMessage);
          stopPlayback();
          mountEl = null;
        };
      }
    });
  });
})();
