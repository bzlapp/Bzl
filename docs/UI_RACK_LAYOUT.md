# UI Rack Layout (draft)

This doc describes a planned UI architecture change: turning the Bzl desktop layout into a **rack of dockable panels**.

The goal is to make core views (Hives, Chat, People, Moderation, Maps, Library, etc.) and **plugins** behave the same way:
- They are panels you can move between columns (“racks”).
- They can be minimized into edge docks.
- They can be restored from a bottom hotbar of small “orbs”.

This is a **design + migration doc**, not a completed implementation yet.

## Why (problem statement)

Today, plugins often:
- Directly query and manipulate core DOM nodes (`.main`, `.panelHeader`, etc.).
- Hide/show core panels with custom CSS.
- Invent their own navigation inside existing panes.

That works for MVP, but it creates friction:
- Plugins can fight with the core layout.
- Core layout changes become breaking changes for plugins.
- “Maps inside Hives” (or any plugin inside a core panel) makes it hard to treat the plugin as a first-class app surface.

The rack layout solves this by giving every surface a consistent home: **a panel container managed by core**.

## Terms

### Surface
A UI “screen” that renders content. Examples: Hives feed, a chat thread, the People list, the Maps room UI, a plugin directory.

### Panel roles
Panels are dockable, but not all panels should behave the same way. We classify panels by *role*:

- **Primary**: the main workspace surfaces that want the most space (e.g. Hives, Chat, Maps, Directory).
- **Auxiliary**: useful alongside a primary surface, usually in a side stack (e.g. People, Moderation, Library).
- **Transient**: task flows that shouldn’t permanently occupy workspace real estate (e.g. Profile, New Hive composer, setup wizards).
- **Utility**: small tools that are frequently docked/minimized (logs, debug).

Rack mode should feel great out of the box by using these roles to drive defaults and constraints.

### Display modes
Each panel should support different display modes (even if the first implementation only ships a subset):

- `full`: normal panel (default when active)
- `collapsed`: header-only (no body rendered)
- `overlay`: rendered as an overlay/drawer on top of a rack (ideal for transient panels)

The rack system uses these modes to prevent “everything is a full-height panel” layouts.

### Panel
A container for one surface, with standard chrome:
- title / icon
- drag handle
- close / minimize / restore
- optional “pin” behavior

Panels are the atomic units of layout.

### Rack
A column that holds an ordered list of panels.

Initial scope (MVP) assumes a few racks:
- left rack (current sidebar)
- main rack (current main content)
- right rack (current “People” / “Moderation” area)

Future scope could allow splits inside a rack (stacking panels vertically), but this doc does not require it.

### Dock
An edge storage area for minimized panels:
- left dock
- right dock
- bottom hotbar (primary “closed panel” surface)

### Orb
The minimized representation of a panel in the bottom hotbar (small pill/circle with label + optional badge).

Orbs can be:
- clicked to restore the panel
- dragged into a rack to restore at a specific position

## UX goals

- Panels are **movable** between racks by drag-and-drop.
- Panels are **minimizable** into a dock (no content rendered; just an orb).
- The bottom hotbar **auto-hides** but appears on hover/near-bottom cursor.
- The layout is **per-user** and persisted (initially `localStorage`).
- Plugins can register panels without DOM poking.

## Non-goals (for the first version)

- Perfect desktop-window-manager behavior (snapping, tearing out into new windows).
- Nested splits, arbitrary grids, or tiling layouts.
- Multi-user shared layouts.
- Heavy animation polish (we can add later).

## Current layout (reference)

The current app is a CSS grid with:
- left sidebar
- main area
- optional right moderation panel
- resizers between these major columns

The rack model can be implemented *on top of* the current grid by treating each grid area as one rack.

## Proposed layout state model

Persist as JSON in `localStorage` (per user) with a schema like:

```json
{
  "version": 1,
  "presetId": "discordLike",
  "racks": {
    "left": ["instance", "hives"],
    "main": ["chat"],
    "right": ["people", "moderation"]
  },
  "docked": {
    "bottom": ["maps", "library"],
    "left": [],
    "right": []
  },
  "sizes": {
    "leftWidth": 340,
    "rightWidth": 360
  }
}
```

Notes:
- Panel ids are stable strings (core + plugins share the namespace).
- A panel must exist in **exactly one** place: a rack or a dock.
- Unknown panels should be ignored safely (e.g. plugin removed).
- Missing panels can be auto-inserted into default racks (migration).
- `presetId` is informational (what preset the current layout originated from).

## Panel identity and ownership

Panel ids are global (e.g. `"maps"`, `"library"`, `"people"`).

Every panel has:
- `id` (string)
- `title` (string)
- `icon` (optional)
- `source`:
  - `"core"` (built-in)
  - `"plugin:<pluginId>"` (plugin-owned)
- `role` (string): `primary` | `aux` | `transient` | `utility`
- `defaultRack` (string): `left` | `main` | `right`

## Proposed plugin UI API (draft)

Today, a client plugin registers:

```js
window.BzlPluginHost.register("maps", (ctx) => { /* ... */ });
```

The rack layout introduces a panel-oriented extension:

```js
ctx.ui.registerPanel({
  id: "maps",
  title: "Maps",
  icon: "🗺️", // optional (or use a CSS class / svg id)
  defaultRack: "right", // "left" | "main" | "right"
  role: "primary", // "primary" | "aux" | "transient" | "utility" (optional)
  orderHint: 50, // optional: helps default ordering
  render(mount, api) {
    // mount is a DOM element owned by the panel container
    // render into mount; return optional cleanup()
  }
});
```

Design constraints:
- Plugins should not need to query core DOM nodes to mount UI.
- Core can add consistent chrome (title bar, minimize button, etc.) without plugin changes.
- Core controls visibility and lifecycle: `render()` when shown, `cleanup()` when closed/uninstalled.

### Panel `render()` contract (draft)

- Called when the panel becomes visible (restored into a rack).
- Receives:
  - `mount`: a container element unique to that panel instance.
  - `api`: helpers (toast, ws send, user/role, persistent panel storage).
- Should return:
  - `() => void` cleanup function (remove event listeners, timers).

### Minimal helper APIs a panel needs

Suggested `api` surface (exact shape TBD):
- `api.toast(title, body)`
- `api.send(eventName, payload)` (same as current `ctx.send`)
- `api.getUser()` / `api.getRole()`
- `api.storage.get(key)` / `api.storage.set(key, value)` (panel-scoped persistence)
- `api.requestAttention({ badge, pulse })` (optional: hotbar badge)

## Migration plan for existing plugins

### Phase 0 (now)
Plugins can manipulate the DOM directly. This is allowed but fragile.

### Phase 1 (introduce panel containers)
Core exposes `ctx.ui.registerPanel()` and provides:
- a stable mount node for panel content
- a stable way to show/hide panels

During this phase:
- existing plugins can continue working
- updated plugins can opt into panels

### Phase 2 (deprecate DOM poking)
Update docs and templates:
- “Do not query core DOM nodes” becomes the recommended path.
- `ctx.ui.registerPanel()` becomes the default expectation for UI plugins.

## Core surfaces as panels

Core should register its own panels using the same mechanism (internal):
- `hives` (feed + filters + compose)
- `chat` (thread + composer)
- `people`
- `moderation`
- `instance` (settings/plugins)

This enables the “everything is a panel” mental model for users.

## Separating Maps from Hives

Under the rack model, Maps becomes a standalone panel:
- Panel id: `maps`
- Default rack: `right` (or `main`, depending on preference)
- Behavior:
  - Opening a map room switches the **Maps panel’s internal mode** (list vs room) without hijacking the Hives panel.

This avoids “Maps inside Hives”, which is hard to reason about and makes plugin upgrades brittle.

## Bottom hotbar (“orbs”)

Behavior:
- Any panel can be minimized → moved to `docked.bottom`.
- Docked panels show as orbs with:
  - title (short)
  - optional icon
  - optional badge (count, dot)
- Click orb → restore to its last rack (or default rack).
- Drag orb → hover racks to preview drop targets → drop to restore.

Persistence:
- dock state is per-user (localStorage) and survives reload.

## Preset layouts (MVP)

We should ship a few **layout presets** so users can switch modes without hand-arranging panels every time.

### Default presets (proposed)

Notes / constraints:
- Full-height columns only (no half-height / vertical splits).
- The workspace can show up to 2 primary slots at once (left + right).
- The right rack is a **single** skinny-capable panel (toggleable).
- Skinny-capable panels: `people`, `profile`, `composer`, `hives` (list), `chat`.
- Moderation panels only exist for moderators (mod-only presets live in their own section).

#### Non-mod presets

1. **Default (Social)**
   - Workspace: `hives` | `chat`
   - Right rack (skinny): `people`
   - Side (collapsed): `profile`, `composer`
   - Docked bottom: `maps`, `library` (if installed)

2. **Chat Focus**
   - Workspace: `chat` (expanded)
   - Right rack (skinny): `people`
   - Side (collapsed): `profile`
   - Docked bottom: `hives`, `composer`, `maps`, `library` (if installed)

3. **Browse**
   - Workspace: `hives` (expanded)
   - Right rack (skinny): `profile` (inspector)
   - Side (collapsed): `chat`
   - Docked bottom: `people`, `composer`, `maps`, `library` (if installed)

4. **Creator**
   - Workspace: `hives` | `composer`
   - Right rack (skinny): `profile`
   - Side (collapsed): `people`
   - Docked bottom: `chat`, `maps`, `library` (if installed)

5. **Maps Session**
   - Workspace: `maps` | `chat`
   - Right rack (skinny): `people`
   - Side (collapsed): `hives` (list)
   - Docked bottom: `profile`, `composer`, `library` (if installed)

6. **Quiet (No People)**
   - Workspace: `hives` | `profile`
   - Right rack (skinny): (empty / off)
   - Side (collapsed): `composer`
   - Docked bottom: `chat`, `people`, `maps`, `library` (if installed)

#### Mod-only presets

7. **Ops**
   - Workspace: `moderation` | `chat`
   - Right rack (skinny): `people`
   - Side (collapsed): `hives` (list)
   - Docked bottom: `profile`, `composer`, `maps`, `library` (if installed)

8. **Reports Focus**
   - Workspace: `moderation` (expanded)
   - Right rack (skinny): `chat`
   - Side (collapsed): `people`
   - Docked bottom: `hives`, `profile`, `composer`, `maps`, `library` (if installed)

9. **Community Watch**
   - Workspace: `hives` | `moderation`
   - Right rack (skinny): `people`
   - Side (collapsed): `chat`
   - Docked bottom: `profile`, `composer`, `maps`, `library` (if installed)

10. **Server Admin**
   - Workspace: `moderation` | `hives`
   - Right rack (skinny): `people`
   - Side (collapsed): `chat`
   - Docked bottom: `profile`, `composer`, `maps`, `library` (if installed)

These are intentionally opinionated. Users can always customize after selecting a preset.

### How presets apply

Selecting a preset:
- **Hard apply**: replaces the current rack/dock assignments with the preset template (exact placement).
- Any panel not explicitly placed by the preset starts in the hotbar.
- Moderation panels are omitted for non-moderators; mod-only presets should either be hidden or gracefully degrade (e.g. replace `moderation` with `people`).
- Optionally preserves column widths (or resets them; TBD).
- Saves the result as the user’s current layout.

### Plugins extending presets (draft)

Plugins may register a panel and optionally provide **preset hints**, e.g.:
- preferred default rack for each preset
- whether the panel should start docked for a preset

Example shape (not final):
```js
ctx.ui.registerPanel({
  id: "maps",
  title: "Maps",
  defaultRack: "right",
  presetHints: {
    discordLike: { place: "docked.bottom" },
    browsing: { place: "right" },
    moderation: { place: "docked.bottom" },
    chat: { place: "docked.bottom" }
  }
});
```

Core should treat these hints as *suggestions*:
- If a preset doesn’t know a plugin panel, it can still place it using `defaultRack` (or dock it).
- If a plugin isn’t installed, the preset remains valid.

## Notes for plugin authors

When the rack layout exists:
- Prefer `ctx.ui.registerPanel()` for all UI.
- Avoid selecting core elements like:
  - `.main`, `.panelFill`, `.panelHeader`, `#feed`, etc.
- Treat your plugin UI as “just a panel”:
  - it should render into its mount
  - it should not assume what other panels exist or where they are

## Open questions

- Should panels be “single-instance” only, or can a plugin open multiple panels (e.g. multiple map rooms)?
- Should panel layout persist per-device or per-user (server-side)?
- How do we expose keyboard shortcuts for focusing panels?
- What is the best “default” panel set for first-time users?

## Mobile (separate model)

Rack layout is desktop-first. On mobile, we should treat panels as **screens + tools** (single active surface with a bottom nav + “More” sheet), while keeping the same panel registration model underneath.

See `docs/MOBILE_UX.md`.
