# Mobile UX (Draft)

This doc proposes a mobile-first UX that stays consistent with Bzl’s modular “everything is a panel” direction, without trying to squeeze desktop racks onto a phone.

## Goals

- Mobile feels **intentional** (not a scaled-down desktop).
- Keep the modular mental model: **surfaces are registered modules** (core + plugins).
- Fast access to the few things you use constantly (Hives / Chat / People / Maps).
- Works for both **small phones** and **odd aspect ratios**.
- Supports moderator-only surfaces without breaking non-mod UX.

## Non-goals (MVP)

- Full rack / multi-column layout on mobile.
- Drag-and-drop panel layout editing.
- Multi-window / splits.
- Perfect parity with every desktop feature (we’ll ship in phases).

## Core idea: **Screens**, not racks

On mobile, the primary constraint isn’t layout; it’s attention and space.

So mobile becomes a **single active screen** at a time (full-height), plus:

- A **bottom nav** for pinned screens
- A **More** drawer/sheet for everything else
- **Overlays** (bottom sheet / fullscreen modal) for transient flows

We still preserve modularity by keeping the registration model the same:

- Desktop: panels can be docked and arranged in racks
- Mobile: the same panel ids become **screens** or **tools**

## Terminology

- **Screen**: a full-height mobile surface (Hives feed, Chat, People, Maps, Library, Instance, Moderation).
- **Tool**: a smaller surface shown as an overlay (Profile, Composer, Plugin Rack).
- **Pinned**: a screen shown in bottom nav.
- **More**: the place you can find and open any available surface.

## Information architecture

### Bottom nav (pinned screens)

Default (non-mod):
- Hives
- Chat
- People
- Maps (if installed) or Library
- More

Default (mod):
- Hives
- Chat
- Moderation
- People
- More

Rules:
- Max **4 pinned** + **More**.
- Long-press (or Edit mode) to reorder / replace pinned.
- Pinned screens show optional badges (unread / mention).

### More sheet

“More” opens a sheet with:
- A searchable list of **all available surfaces**
- Grouping:
  - Core
  - Plugins
  - Tools (overlays)
  - Moderation (mods only)
- Docked/hidden items (desktop hotbar equivalent) live here too on mobile.

## Interaction model

### Navigation

- Tap a pinned icon → opens that screen.
- Tap “More” → opens the surface list sheet.
- Tap a surface in “More” → opens that screen (or tool overlay).

### Back behavior

Recommended behavior:
- Hardware back / top-left back:
  - If a tool overlay is open → close it.
  - Else if the More sheet is open → close it.
  - Else → go to previous screen in history (small stack), otherwise do nothing.

### Chat thread selection

Mobile should avoid spawning multiple chat instances by default.

- Tapping “Chat” on a hive post:
  - If Chat screen is open and empty → fill it.
  - Else → switch Chat screen to the requested thread.
- Advanced: optional “multi-chat” power mode can still exist, but mobile default should be **single chat context**.

### Transient flows as overlays

These should not “steal” the whole navigation permanently:

- **Composer**: bottom sheet on phones; fullscreen on very small viewports.
- **Profile**: fullscreen modal (with its own internal scroll).
- **Plugin Rack**: fullscreen modal or tall bottom sheet depending on content.

## Layout rules (responsive)

We should not assume desktop-like columns.

Mobile containers should:
- Use `min-width: 0` everywhere
- Avoid fixed widths; rely on `%`, `clamp()`, and container constraints
- Prefer vertical stacking and bottom sheets

### Implementation notes (current)

- Mobile screen mode currently activates on **narrow viewports** (`max-width: 760px`) and on **touch-first devices** (coarse pointer) up to a wider threshold (including landscape phones).
- Bottom navigation is a fixed bar that is constrained to the viewport width; buttons flex and will ellipsize labels on very small screens.

## State model (MVP)

Persist as JSON in `localStorage` (per user/device) under something like `bzl_mobile_layout_v1`:

```json
{
  "version": 1,
  "pinned": ["hives", "chat", "people", "maps"],
  "active": "hives",
  "history": ["hives", "chat"],
  "tools": {
    "composerOpen": false,
    "profileOpen": false,
    "pluginRackOpen": false
  }
}
```

Notes:
- Missing panels should be ignored safely (plugin removed).
- If a pinned panel isn’t available, substitute a reasonable fallback.
- Moderation only appears if the user can moderate.

## Mapping desktop panels → mobile behavior

Recommended defaults:

- Primary/core screens:
  - `hives` → screen
  - `chat` → screen
  - `people` → screen
  - `maps` → screen (if installed)
  - `library` → screen
  - `instance` → screen (maybe inside More)
  - `moderation` → screen (mods only)

- Tools (overlays):
  - `profile` → tool overlay
  - `composer` → tool overlay
  - `pluginRack` → tool overlay

## Plugin integration (draft)

Plugins already register panels; mobile needs one extra hint so we don’t overwhelm “More” or pin tool-like widgets by default.

Proposed addition to `ctx.ui.registerPanel()` (draft):

```js
ctx.ui.registerPanel({
  id: "radio",
  title: "Radio",
  defaultRack: "main",
  role: "utility",
  mobileHint: "tool" // "screen" | "tool" | "hidden"
});
```

Defaults:
- `role: "primary"` → `mobileHint: "screen"`
- everything else → `mobileHint: "tool"`

## Phased implementation plan

### Phase 1: Mobile shell + core screens

- Add a mobile UI shell: `ScreenHost`, bottom nav, More sheet.
- Implement navigation + persistence (`pinned`, `active`, basic history).
- Hook up the core screens:
  - Hives, Chat, People, Instance
  - Maps/Library if installed
  - Moderation for mods

Acceptance:
- Works on small phone widths without horizontal overflow.
- Can switch between Hives/Chat/People quickly.

### Phase 2: Tools as overlays

- Composer as a bottom sheet / fullscreen modal (viewport-dependent).
- Profile as fullscreen modal.
- Plugin Rack as tool overlay (stacking widgets inside).

Acceptance:
- Tools open/close cleanly and don’t break navigation.

### Phase 3: Polishing + badges + shortcuts

- Unread / mention badges in bottom nav and More list.
- Search in More.
- “Edit pinned” mode.

Acceptance:
- Users can tailor bottom nav to their usage.

## Open questions

- Should mobile share “layout presets”, or is pinned nav personalization enough?
- Should plugin widgets be allowed as pinned screens, or restricted to tools by default?
- Do we want a “focus mode” (hide nav bar while scrolling, reveal on tap)?
- How do we handle Maps + associated chat (global/local) on small screens (tab within chat vs inline on map)?
