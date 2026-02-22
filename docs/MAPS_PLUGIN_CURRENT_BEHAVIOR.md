# Maps Plugin: Current Behavior (As Implemented)

Last updated: 2026-02-22  
Source of truth: `plugins_dev/maps/plugin.json`, `plugins_dev/maps/server.js`, `plugins_dev/maps/client.js`

## What it is

`maps` is a first-party plugin that adds:
- A **Maps panel** (rack mode) or Maps tab flow (legacy mode)
- Multi-user map rooms with avatar movement
- Local/global map chat
- Optional walkie (push-to-talk short audio clips)
- Optional TTRPG tooling (sprites, props/tokens, possession, polygon editors)

Manifest: `plugins_dev/maps/plugin.json`

## Core data model

Maps come from:
1. Built-in demo map(s) in code (`BUILTIN_MAPS`)
2. Custom maps persisted to disk at:
   - `data/plugin-data/maps.json`

Per-map fields include:
- `id`, `title`, `owner`
- `backgroundUrl`, `thumbUrl` (restricted to `/uploads/...` or `/assets/...`)
- `world`, `avatarSize`, `cameraZoom`
- `collisions`, `masks`, `exits`, `hiddenMasks`, `occluders`, `fallThroughs`
- `ttrpgEnabled`, `sprites`, `props`, `walkiesEnabled`

Runtime-only room state is in memory (not persisted):
- Active users/positions
- Global map chat buffer
- Pending walkie playback acknowledgements

## Permissions (current)

Current checks in plugin server code:
- **Create map**: `owner` or `moderator` only
- **Update/delete map**: `owner`, `moderator`, or map `owner`
- **TTRPG edits** (sprites/props/toggles): same map-management path
- Built-in maps are not editable/deletable via `updateMap`/`deleteMap`

Note: this plugin currently checks `owner/moderator` directly and does not yet include the new `admin` role in those permission gates.

## Networking / WS events

The plugin uses WS events under `plugin:maps:*`.

Main inbound actions:
- `list`, `createMap`, `updateMap`, `deleteMap`
- `join`, `leave`, `move`
- `chatSend`, `chatHistoryReq`, `say`
- `setInvisible`
- `walkieSend`, `walkiePlayed`
- TTRPG: `ttrpgSetEnabled`, `ttrpgSpriteAdd`, `ttrpgSpriteRemove`, `ttrpgPropAdd`, `ttrpgPropMove`, `ttrpgPropPatch`, `ttrpgPropRemove`, `ttrpgTokenPossess`

Main outbound messages:
- `plugin:maps:mapsList`
- `plugin:maps:joinOk`, `plugin:maps:left`
- `plugin:maps:roomState`, `plugin:maps:userMoved`
- `plugin:maps:chatMessage`, `plugin:maps:chatHistory`
- `plugin:maps:bubble`
- `plugin:maps:walkie`
- `plugin:maps:mapPatched`, `plugin:maps:ttrpgEnabled`
- TTRPG delta messages for sprite/prop add/move/patch/remove

## Chat behavior

Map chat has two scopes:
- `local` (default): delivered only to users within a normalized radius
- `global`: delivered to everyone in the room

Current server constants:
- `MAP_CHAT_LOCAL_RADIUS` default: `0.12` (env override `MAP_CHAT_LOCAL_RADIUS`, clamped `0.01..1.0`)
- `MAP_CHAT_GLOBAL_MAX` default history window: `200` messages

Global chat history is in-memory only (clears on server/plugin restart).

## Movement, collisions, exits

- Movement is client-driven, with periodic position sends (`move`)
- Coordinates are normalized (`0..1`)
- Collision polygons block movement
- Exit polygons can:
  - return user to Maps list (`toMaps`)
  - transfer user to another map (`toMap`, optional target exit name)

## TTRPG mode (current)

When enabled per map:
- Sprite library (uploaded images as `prop` or `token`)
- Placeable props/tokens with transform and z-order
- Token metadata: nickname, HP current/max, controller
- Token possession flow (`controlledBy`)
- Overlay/polygon editing for:
  - collisions
  - y-sort masks
  - exits
  - hidden masks (fog areas)
  - fall-through zones
  - occluders

## Walkie mode (current)

- Push-to-talk UX (`Backquote` / hold-to-talk)
- Client records short audio with `MediaRecorder`, uploads to `/uploads/...`
- Server relays playback event with sender position for spatial mix
- Cleanup model:
  - each walkie clip tracks pending listeners
  - deleted when all listeners ack (`walkiePlayed`) or timeout (~2 min)
  - server attempts to delete fresh upload file after cleanup

## UX integration notes

- In rack layout, plugin registers panel id `maps`
- In legacy mode, maps view toggles within the main workspace flow
- On mobile, Maps is usually treated as secondary/optional due to viewport constraints

## Current limitations / known behavior

- No built-in turn/initiative/combat engine; tools are positioning + token control only
- Chat in map context is text+bubble (plus optional walkie clips), not full RTC voice rooms
- Global map chat and room presence are ephemeral in memory
- Permission model is still owner/mod oriented (not yet fully aligned with owner/admin/mod hierarchy)

## Build & packaging

- Dev source: `plugins_dev/maps/`
- Build script: `scripts/build-maps-plugin.js`
- Zip output: `dist/plugins/maps.zip`
