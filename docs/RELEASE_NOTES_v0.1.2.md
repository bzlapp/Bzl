# Bzl Release Notes - v0.1.2

Release target: GitHub + itch.io  
Previous release: v0.1.1

## Release artifacts

- Core installer zip: `dist/Bzl-CLEAN_INSTALL-v0.1.2.zip`
- Plugin zips:
  - `dist/plugins/maps.zip`
  - `dist/plugins/library.zip`
  - `dist/plugins/radio.zip`
  - `dist/plugins/dice.zip`
  - `dist/plugins/directory-server.zip`
  - `dist/plugins/directory-publisher.zip`

## Plugin quick reference (concise)

- **Maps (`maps`)**: map rooms, avatar movement, spatial chat, collisions, and GM/TTRPG map tooling.
- **Library (`library`)**: shelf + reader flow for persistent writing/reading and shared collections.
- **Radio (`radio`)**: user-created stations with uploads and communal listening.
- **Dice (`dice`)**: shared `XdY+Z` roller for roleplay sessions.
- **Directory Server (`directory-server`)**: central listing service + moderation queue for published instances.
- **Directory Publisher (`directory-publisher`)**: pushes your instance metadata/hives to a directory server.

## Changelog since v0.1.1

- Rack/workspace UX hardening:
  - Better panel placement rules and skinny/full behavior in side racks.
  - Empty workspace slot affordance (`+ Add panel`) for faster recovery and setup.
- Mobile flow stabilization:
  - Improved bottom-nav behavior and panel visibility consistency.
  - Chat composer and send-area spacing fixes to prevent nav overlap.
  - Reduced mobile clutter (focused controls and cleaner compact states).
- Chat navigation improvements:
  - Unified chat context switching via dropdown and `-` / `=` shortcuts.
  - Chat switcher now includes unread counts and relative activity hints.
  - Reduced accidental focus jumps while switching chat contexts.
- Discoverability and control:
  - New shortcut help modal (`?`), updated hints, and layout reset action.
  - New chat send-key preference: `Ctrl/Cmd+Enter` or `Enter` (with `Shift+Enter` newline).
- Onboarding/moderation and panel consistency updates:
  - Onboarding workflows and panel behavior further aligned with rack layout.
  - General panel/readability fixes across desktop and mobile usage patterns.
