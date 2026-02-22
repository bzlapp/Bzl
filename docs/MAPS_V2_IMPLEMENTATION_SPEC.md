# Maps V2 Implementation Spec

Last updated: 2026-02-22  
Status: Draft (implementation-ready)

## 1) Goal

Upgrade Maps from a good prototype into a first-class social-world system that supports:
- immersive fullscreen play
- in-world GM authoring overlays
- stronger avatar systems (token/image/frame-animation + advanced spritesheet import)
- reliable spatial audio (walkie + stream audio)
- robust TTRPG authoring and runtime operations

This spec is intentionally scoped to be shippable in phases without breaking current maps.

## 2) Product outcomes

### Primary outcomes
- Players can enter a map and feel “present” immediately.
- GMs can author while playing (without modal-heavy context switching).
- Chat/map “open chat” flows are reliable and predictable.
- Audio features are reliable before adding complexity.

### Success metrics
- <1% map join failure rate (client-side measured)
- <1% walkie send failure rate after retry
- 95th percentile map interaction latency <150ms on same region
- 0 known panel-layout breakages in rack mode + mobile for Maps panel

## 3) Scope / non-scope

### In scope
- Fullscreen focus mode
- GM in-map tool overlays
- avatar mode system
- walkie reliability and directional audio
- opt-in stream audio with spatial routing
- stronger TTRPG editing workflow

### Not in scope (V2 baseline)
- full MMO combat/quest economy engine
- persistent server-authoritative physics
- cross-instance shared map worlds

## 4) Design principles

- **Play-first UI**: map gets screen priority, tools stay accessible.
- **Author in context**: no forced exit from gameplay to edit geometry/props.
- **Backward compatibility**: old maps load and work.
- **Capability flags**: client adapts by features supported by server/plugin version.
- **Fail-soft networking**: local prediction + clear recovery paths.

## 4.1 Design locks (locked decisions)

1. **Focus mode defaults to panel-focus, not browser fullscreen**
   - Primary behavior is map-focused panel mode.
   - Browser fullscreen (`requestFullscreen`) is optional and explicit.

2. **GM overlay is mode-driven**
   - One active mode at a time (initial set: `play`, `select`, `place`, `polygon`).
   - Hotbar binds to current mode actions, not free-floating UI state.
   - Default mode is always `play`.
   - Entering focus mode sets mode to `play`.
   - Exiting any tool returns mode to `play`.

3. **Capabilities handshake is mandatory on map join**
   - Server emits `plugin:maps:capabilities` immediately after `joinOk`.
   - Client does not guess feature support.

4. **Avatar state is user-owned**
   - Avatar configuration is stored in user prefs/plugin prefs, not map documents.
   - Maps may apply runtime display overrides only (e.g., possession/speak-as-token).
   - Default avatar animation pipeline is frame-based “Quick Mode”; spritesheets are advanced/optional.

5. **Walkie V2 ships before stream audio**
   - Walkie reliability is a hard prerequisite for stream audio mode.

6. **Undo/redo envelope defined early**
   - `toolCommand` command envelope exists in Phase 1, even with a small command set.

7. **GM tools remain in-map overlays**
   - No required separate “GM tools panel” in V2 baseline.

8. **ACL starts minimal**
   - Begin with `editors[]` + one/two policy toggles.
   - Defer role-group ACL complexity until usage evidence exists.

9. **Input priority is explicit**
   - Input arbitration order is defined up front: text inputs > drag/edit > movement.
   - Prevents WASD/overlay/tool conflicts.
   - Movement is never blocked silently; blocked-state reason must be visible in UI.

## 5) UX architecture

## 5.1 Map Focus mode

Add `Map Focus` state in Maps panel:
- hides rack clutter and non-essential panel controls
- uses full panel canvas area
- toggle from corner button or `F`
- `Esc` exits focus mode
- preserve previous layout state after exiting

### Desktop behavior
- “Focus” expands map panel to workspace emphasis
- optional true browser fullscreen (`requestFullscreen`) behind user action

### Mobile behavior
- map screen takes full app viewport
- overlays collapse to compact hotbar + slide-up drawers
- safe-area insets respected

## 5.2 GM overlays

Replace right-side heavy tool density with in-map overlays:
- top-left: mode + selected tool + map name
- bottom: hotbar (`1-9`) and quick actions
- right drawer: inspector (contextual, collapsible)
- command palette (`/` or `Ctrl/Cmd+K`) for advanced actions

Authoring must allow movement + editing without mode break.

### Movement feedback rule
- If movement is blocked, the user must get immediate visible feedback.
- Required cues:
  - drag/edit: pointer/cursor state
  - typing: obvious focused input state
  - tool lock: highlighted active tool/mode

## 5.3 Panel strategy

- Keep Maps as a standalone panel id `maps`.
- Do not embed maps inside hives panel.
- TTRPG/GM controls belong to map overlays/drawers, not separate mandatory panel.

## 6) Avatar system v2

Introduce `avatarMode` per user per map session:
- `profile_token`
- `image_token`
- `frame_animation` (default Quick Mode)
- `spritesheet`

## 6.1 Profile token
- circular token using profile image
- optional display name label

## 6.2 Image token
- uploaded image + metadata:
  - pivot/foot anchor
  - collision radius
  - facing direction support (flip/rotate)

## 6.3 Frame-based avatar animation (Quick Mode, default)

Users define animation states as ordered frame lists (individual uploaded images), without spritesheet slicing.

Baseline states:
- `idle`
- `walk_vertical`
- `walk_horizontal`

Optional states:
- directional idles/walks (`idle_up/down/left/right`, `walk_up/down/left/right`)
- emotes (`wave`, `dance`, etc.)

Quick Mode behavior:
- upload frame images one-by-one
- drag/reorder frames within each state
- instant preview in editor
- per-state loop toggle
- movement-driven state switching (`idle` vs walk states)
- directional horizontal flip by default (for left/right when dedicated states are not supplied)

Emote behavior:
- hotkey-triggered animation override
- emote plays then auto-returns to prior locomotion state
- emote can be non-looping (default) or looping with cancel

## 6.4 Spritesheet mode (advanced import)
- upload sheet + metadata:
  - frame width/height
  - rows/columns
  - animation sets by direction (`idle_up/down/left/right`, `walk_*`)
  - frame rate

## 6.5 Server avatar presets (staff-authored library)

Add a per-instance avatar preset library that can be authored by `owner`/`admin`/`moderator`, then selected by members.

Preset goals:
- remove setup friction for regular users
- let server team define coherent visual style packs
- keep user choice simple (`pick preset`, optional display name override)

Preset behavior:
- staff can create, update, delete, and publish presets
- users can browse and apply any published preset
- applying a preset copies its avatar config into the user avatar state (not a hard live link)
- optional server setting can enforce `preset-only` mode for members

Preset scope:
- supports `profile_token`, `image_token`, `frame_animation`, and `spritesheet`
- supports starter emotes/hotkeys bundled by staff
- supports tag/category metadata for browsing (e.g., fantasy, sci-fi, cozy)

### Data model (client/server)
```ts
type AvatarMode = "profile_token" | "image_token" | "frame_animation" | "spritesheet";

type AvatarState = {
  mode: AvatarMode;
  displayName?: string;
  showUsername?: boolean;
  frameAnimation?: {
    defaultFps: number;
    states: Record<
      string,
      {
        frames: Array<{ url: string }>;
        fps?: number;
        loop?: boolean;
        flipXWithDirection?: boolean;
      }
    >;
    movementMap?: {
      idle?: string;
      walkVertical?: string;
      walkHorizontal?: string;
      walkUp?: string;
      walkDown?: string;
      walkLeft?: string;
      walkRight?: string;
    };
    emotes?: Array<{
      name: string;
      state: string;
      hotkey?: string; // e.g. "Digit1", "KeyZ"
      loop?: boolean;
      interruptible?: boolean;
    }>;
  };
  imageToken?: {
    url: string;
    collisionRadius: number; // normalized / map scale aware
    pivotX: number;
    pivotY: number;
    facing: "left" | "right" | "up" | "down";
    flipWithDirection: boolean;
  };
  spritesheet?: {
    url: string;
    frameW: number;
    frameH: number;
    rows: number;
    cols: number;
    fps: number;
    animations: Record<string, number[]>; // key -> frame indices
  };
};

type AvatarPreset = {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  mode: AvatarMode;
  avatar: Omit<AvatarState, "displayName" | "showUsername">;
  createdBy: string;
  updatedBy: string;
  createdAt: number;
  updatedAt: number;
  published: boolean;
};
```

## 7) Audio systems

## 7.1 Walkie reliability pass (before stream mode)

Current walkie exists but requires hardening:
- explicit state machine: `idle -> recording -> encoding -> uploading -> sent -> played/timeout`
- retry policy for upload failure
- client-visible status + error toasts
- server ack tracking improvements + cleanup guarantees
- telemetry events for each failure stage

## 7.2 Directional spatial audio abstraction

Create shared spatial engine for all short/long audio:
- distance attenuation
- stereo pan
- configurable falloff curve
- future occlusion hook (not required in first pass)

## 7.3 Stream audio mode (opt-in)

Add low-latency stream channels per user/source:
- listeners opt-in per source
- source appears in map with directional spatialization
- per-source mute + quick volume controls

Implementation target:
- RTC-based media for live stream audio
- keep walkie upload model as fallback mode

## 8) TTRPG tool overhaul

## 8.1 Editing workflow

- drag/drop sprite placement
- transform gizmos (move/rotate/scale)
- layer controls (z-order, lock, hide)
- snap options (grid + vertex snapping)
- multi-select for batch actions
- undo/redo command stack

## 8.2 Geometry authoring improvements

- polygon tools unified in one editor rail:
  - collisions
  - masks
  - exits
  - hidden masks/fog
  - fall-through
  - occluders
- inline inspector for selected polygon metadata
- validity checks before save

## 8.3 Runtime token controls

- possession states
- token cards (hp/name/owner)
- token context menu
- optional “speak as token” clearly surfaced

## 9) Role and permissions model

Align maps plugin with core role hierarchy:
- `owner`, `admin`, `moderator`, `member`

Recommended matrix:
- create/delete/update map: owner/admin/moderator (+ map owner)
- ttrpg structural edits: owner/admin/moderator (+ delegated map editors)
- runtime token move/possess: configurable per map policy
- avatar preset create/update/delete/publish: owner/admin/moderator
- avatar preset apply: all authenticated users (published presets)

Add map-level ACL field:
```ts
type MapAcl = {
  editors: string[]; // usernames
  canMembersPlaceProps: boolean;
  canMembersUseTokens: boolean;
};
```

## 10) Networking contracts (v2 additions)

Keep existing events; add versioned extensions:
- `plugin:maps:capabilities` (server -> client)
- `plugin:maps:getCapabilities` (client -> server, on-demand refresh/debug)
- `plugin:maps:setAvatar`
- `plugin:maps:listAvatarPresets`
- `plugin:maps:upsertAvatarPreset` (staff only)
- `plugin:maps:deleteAvatarPreset` (staff only)
- `plugin:maps:applyAvatarPreset`
- `plugin:maps:walkieState`
- `plugin:maps:typing` (throttled presence signal)
- `plugin:maps:presence` (room activity snapshot)
- `plugin:maps:streamOffer` / `streamAnswer` / `streamIce` (if RTC in plugin WS channel)
- `plugin:maps:toolCommand` (for undoable commands)

## 10.1 Handshake timing contract

- On successful join:
  1. `plugin:maps:joinOk`
  2. `plugin:maps:capabilities`
- Client may request re-send with `plugin:maps:getCapabilities` after reconnects or plugin reload.

Server capability payload example:
```json
{
  "type": "plugin:maps:capabilities",
  "version": "2.0.0",
  "features": {
    "focusMode": true,
    "gmOverlay": true,
    "avatarModes": ["profile_token", "image_token", "frame_animation", "spritesheet"],
    "walkieV2": true,
    "spatialStreamAudio": true,
    "undoRedo": true
  }
}
```

### 10.2 Safe fallback contract

For capability mismatches, clients must degrade gracefully:
- unsupported feature UI is hidden (not shown as broken/disabled unless needed for explanation)
- unsupported avatar modes fallback to `profile_token`
- unsupported advanced tools fallback to `play` mode + baseline map interaction
- no capability mismatch should block join/movement/chat basics

## 11) Persistence and migration

Current map data lives at `data/plugin-data/maps.json`.

Migration strategy:
1. Add `schemaVersion` to map objects.
2. On load, migrate in memory to latest schema.
3. Persist migrated schema safely (write temp + atomic rename pattern).
4. Keep compatibility reader for at least 1 major cycle.

Key new persisted fields:
- map ACL
- optional map settings for focus defaults and tool preferences
- avatar metadata references (per user state can remain session/prefs scoped)

## 12) Performance constraints

- target 60fps render loop on mid-range desktop
- stable 30fps minimum on typical mobile
- throttle non-critical broadcasts
- avoid full-map payload rebroadcast for small edits (delta-based)
- lazy load spritesheet textures; cap memory per map
- texture guardrails:
  - max texture dimension: default 4096 (optional stricter deploy default 2048)
  - max decoded spritesheet memory budget per map (configurable hard cap)
  - reject/downscale oversized assets with clear user-visible error

## 12.1 Presence signal

Maps should expose an explicit activity signal to support discoverability:
- room user count
- active/live boolean (e.g., recent movement/chat/audio window)
- optional freshness timestamp in map list payloads

## 13) Security constraints

- enforce upload URL/path validation (already present, keep strict)
- sanitize all user-provided labels/display names
- rate limit audio/message actions
- avoid trusting client movement for restricted zones when game rules matter
- map ACL checks must be server-side authoritative

## 14) Rollout plan

## Phase 1: UX shell + reliability
- Must ship:
  - role update to include `admin` parity in maps permission gates
  - Focus mode (panel-focus first, Esc exit)
  - walkie reliability state machine + retry + deterministic cleanup
  - capabilities handshake (`joinOk` + `capabilities`)
- Scaffold (acceptable as minimal stubs):
  - GM overlay shell + hotbar
  - command palette stub
  - profile-token avatar UI stub

Exit criteria:
- no panel/layout regressions
- walkie failure rate materially reduced

## Phase 2: Avatar + TTRPG ergonomics
- profile/image token modes
- frame-based avatar animation Quick Mode (default)
- emote animation overrides + hotkeys
- server avatar preset library + user preset picker
- drag/drop props, gizmos, inspector improvements
- undo/redo command stack

Exit criteria:
- GM can build a playable scene without leaving map panel
- users can animate avatars in Quick Mode without spritesheet tooling

## Phase 3: Spritesheet + stream audio
- advanced spritesheet import mode
- opt-in spatial stream audio
- per-source controls + metrics

Exit criteria:
- stable multi-user session with directional stream audio in production

## 15) QA checklist

- rack mode + legacy mode + mobile behavior
- map focus enter/exit with preserved layout
- map editing permissions across roles
- chat open reliability from hives/maps/streams
- walkie send/play cleanup and timeout behavior
- migration on old `maps.json` files
- frame-state upload/reorder/preview flow (Quick Mode)
- emote override start/finish/return-to-idle behavior

## 16) Open decisions

- Stream audio stack: **reuse shared stream-pack/LiveKit infra**; maps plugin stays UI/routing layer.
- ACL grouping: **per-map ACL first**, role groups deferred.
- Spritesheet asset location: **per-user profile library first** (portable identity).
- Token movement authority: keep client-driven baseline; optional server-authoritative mode may be introduced later under a map flag.

## 17) Immediate implementation backlog (ready to build)

1. Add maps role checks for `admin` parity.
2. Add `Map Focus` mode state + UI toggle + `Esc` exit.
3. Move GM controls into overlay hotbar/drawer shell.
4. Instrument walkie state transitions and failures.
5. Introduce capability handshake event.
6. Add avatar mode schema + `profile_token` first.
7. Add `frame_animation` Quick Mode editor + runtime playback.
8. Add emote override/hotkey handling with auto-return behavior.
9. Add advanced spritesheet import path (after Quick Mode ships).
10. Add avatar preset CRUD (staff) + preset picker (users).

## 17.1 Phase 1 build checklist (file-by-file)

### A) Admin parity (server)
- File: `plugins_dev/maps/server.js`
- Update role checks for:
  - `createMap`
  - `updateMap`
  - `deleteMap`
  - `ttrpgSetEnabled`
  - all `ttrpg*` edit actions
  - other destructive map actions
- Target role policy: owner/admin/moderator (+ map owner where already supported).

### B) Focus mode (client)
- File: `plugins_dev/maps/client.js`
- Add state:
  - `isFocusMode: boolean`
- Add controls:
  - corner button
  - keyboard: `F` toggle, `Esc` exit
- Persist optional preference per-user (local preference key).
- Ensure safe-area and rack-mode resize behavior.

### C) GM overlay shell (client)
- File: `plugins_dev/maps/client.js`
- Add overlay frame:
  - top-left mode pill
  - bottom hotbar (`1-9`)
  - right inspector drawer
  - command palette stub (`/`, `Ctrl/Cmd+K`)
- Keep movement available while overlay is present.
- Enforce mode defaulting:
  - maps load in `play`
  - focus enter sets `play`
  - exiting tools returns `play`

### D) Walkie V2 reliability (client + server)
- Files:
  - `plugins_dev/maps/client.js`
  - `plugins_dev/maps/server.js`
- Client:
  - explicit state machine
  - one retry with backoff minimum
  - status UI (recording/uploading/sent/failed)
- Server:
  - deterministic cleanup on ack/timeout/disconnect
  - telemetry counters/logs for failure stages

### E) Capabilities handshake
- Files:
  - `plugins_dev/maps/server.js`
  - `plugins_dev/maps/client.js`
- Add:
  - server emit `plugin:maps:capabilities` after `joinOk`
  - server support `plugin:maps:getCapabilities` refresh
  - server handler `plugin:maps:getCapabilities`
  - client gating for feature-dependent UI elements
  - safe fallback rendering for unsupported capabilities

### F) Profile-token avatar (minimal)
- Files:
  - `plugins_dev/maps/client.js`
  - `plugins_dev/maps/server.js`
  - core prefs surface if needed (`server.js` / `public/app.js`) for plugin-pref persistence
- Add:
  - `setAvatar` event shape
  - profile-token render path
  - optional `displayName` + `showUsername` toggle

### G) Typing + presence baseline (low-cost, high-impact)
- Files:
  - `plugins_dev/maps/client.js`
  - `plugins_dev/maps/server.js`
- Add:
  - throttled `plugin:maps:typing`
  - lightweight `plugin:maps:presence` publish/update in map list + room state

## 17.2 Phase 1 edge cases (must test)

- Rack mode resize while in focus mode
- Switching away from maps panel and back while focused
- Mobile safe-area + virtual keyboard interactions
- Drag/edit interactions while movement keys are pressed
- Reconnect flow (`joinOk` + `capabilities`) consistency
- Walkie clip cleanup if sender/receiver disconnects mid-play
