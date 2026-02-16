# Bzl - Functionality Reference (Video Script Aid)

This document is a detailed feature rundown of the current Bzl build so you can write a video script, plan a demo, or create release notes.

## What Bzl is (one sentence)
Bzl is an "ephemeral hive board": short posts ("hives") auto-expire after a TTL (or can be made permanent), and each hive has a live chat room with reactions, rich media, and moderation for small private communities.

## Core concepts / vocabulary
- Hive: a post on the board. Has a title, body (first message), keywords, and optional media.
- Chat: each hive has its own live chat room.
- TTL: "time to live". Hives expire after a duration unless permanent.
- Collections: curated categories (tabs) that hives belong to.
- Roles:
  - Base roles: `member`, `moderator`, `owner`
  - Custom roles: owner/mod-created labels (optionally used to gate collections)

## UI tour (desktop)
- Left sidebar: connection status, account/login, profile editor (your picture/color/bio), and owner instance settings (title/subtitle/policy).
- Center panel: either the hive board (browse + create) or a user profile view (when you click a username).
- Chat panel: the selected hive's chat room (or a DM thread).
- Right panel: People (members + DMs) and Moderation (mods/owner only).

## "30 second pitch" (talking points)
- Explore-first UX: browse hives, filter/sort, then create.
- Ephemeral by default: hives naturally fade away unless made permanent by policy.
- Activity-driven board: chat activity + boosts keep active conversations visible.
- Community-first features: reactions, mentions, profiles, DMs, and moderation.
- Self-hostable: designed for smaller private communities and personal instances.

## Demo path (recommended video flow)
1. Show the hive board: explain that each card is a hive with its own chat.
2. Open a hive chat: show reactions, replies, edits/deletes, rich media.
3. Create a hive: title + body, collection, keywords, TTL; optionally protected/walkie.
4. Filters + sorting: keyword filter, author filter, sort modes, collection tabs.
5. People -> Profiles: click a user, show bio + pronouns + theme song + links.
6. DMs: request/accept flow, thread list, chat.
7. Moderation: reports, user actions, hive actions, moderation log, NUKE (owner only).

---

## Accounts & identity
- Users sign in with a username + password.
- First user created becomes the `owner` (single-owner MVP model).
- Owner can promote/demote members to `moderator`.

### Persistent logins (sessions)
- Sessions persist so users do not have to re-login on every disconnect/reload.

## Instance branding (owner)
Owner can configure instance settings shown in the UI:
- Title + subtitle (top-left branding)
- "Allow members to make permanent hives" policy
- Theme/appearance (Moderation → Server):
  - Theme preset + colors (background/panel text/accent)
  - Muted %, divider %, and panel tint %
  - Body font + mono font

## Hive creation ("Pollinate")
When creating a hive, users can set:
- Title (kept short for card display)
- Body (rich text; becomes the first message in the hive chat)
- Collection (required; must pick one of the curated collections)
- Keywords (comma-separated, up to 6)
- TTL (minutes):
  - 1 minute to 2 days (max 2880 minutes)
  - 0 means permanent (availability controlled by instance policy; see below)
- Optional toggles:
  - Password protected (requires a password)
  - Walkie Talkie mode (audio-only "hold to talk" hive)

### Permanent hives (instance policy)
Permanent hives are controlled by an owner setting:
- Allow members to make permanent hives: if enabled, members may set TTL to 0.
- Moderators/owner can always make hives permanent (or change TTL) via moderation tools.

## Hive board behavior (how posts rise/fall)
- The board ordering favors recent activity (chat bumps the hive).
- Users can boost a hive to keep it visible (bounded duration).
- Sort modes include:
  - Most recent activity
  - Most popular (reactions)
  - About to expire (permanent hives sort last)

## Browsing tools (filters)
- Collection tabs: switch between curated collections (plus personal Starred/Hidden views).
- Filter by author: narrow the board to hives by a specific user.
- Filter by keywords: comma-separated keyword search.
- Sort dropdown + Clear: change ordering and reset filters quickly.
- Hide Creator (UI option): makes the hive board feel more content-first while still showing authors inside chat.

## Collections (curated tabs)
- Hives belong to a collection.
- Collections appear as tabs on the hive board.
- Moderators/owner can create and archive collections, and optionally gate collections.

### Collection gating (roles)
- A collection can be public or gated.
- Gated collections are visible only to users matching allowed tokens:
  - Base: `member`, `moderator`, `owner`
  - Custom: `role:<key>`

## Reactions
### Hive reactions
- Hive cards support emoji reactions including Star.
- Starred view: starring a hive stores it in your personal Starred list.
- Hidden view: users can hide hives for themselves without affecting others.

### Chat reactions
- Chat messages support a curated set of emoji reactions.
- Reactions are shown inline with other message actions.

## Mentions (@username)
- Typing `@` triggers mention autocomplete.
- Mentions are highlighted in chat and can be clicked to open profiles.
- If you are mentioned, Bzl can notify you (and optionally play a ping sound).

## Chat (in-hive)
Chat supports:
- Rich text + media (GIF/image/audio)
- Replies (with a quoted reference block)
- Emoji reactions
- Reports (members can report a message)

### Edit/Delete chat messages (self-service)
Users can:
- Edit their own messages
  - Chat shows edited count + edited time
  - Edits are recorded for moderation visibility
- Delete their own messages
  - Leaves a "message deleted" placeholder line
  - Deletion is recorded for moderation visibility

### Edit/Delete hives (self-service)
Hive authors can:
- Edit their hive:
  - Title + body
  - Keywords
  - Collection (must still be allowed by gating rules)
  - Protection/password (lock, unlock, or set/change password)
- Delete their hive:
  - Soft-delete by the author (visible as deleted and logged)

## Password-protected hives
- Authors (and moderators) can mark a hive as protected with a password.
- Users must unlock to view/chat.
- Moderators/owner can bypass protection for moderation purposes.

## Read-only hives (moderation)
Moderators/owner can toggle a hive:
- Read-only: members cannot send new messages; moderators/owner still can.

## Walkie Talkie hives (audio-only)
- A hive can be created in Walkie Talkie mode:
  - No text chat (audio clips only)
  - Users press-and-hold the "Hold to talk" button (or `~`) to record
  - Audio is processed to sound radio-like and sent as an audio message

## People panel
The People panel includes:
- Members tab: shows users (online/offline) and their base role badge.
- DMs tab: shows DM threads and incoming requests (accept/decline).

### Profiles (click-to-view)
Clicking a username opens a profile view in the center panel:
- Profile picture
- Display color
- Pronouns
- Bio (rich text; supports media/emoji and YouTube embeds)
- Theme song (audio)
- Social/self-promo links (with safe URL validation)

### Profile editor (profile owner only)
Users can edit their own:
- Profile picture + color
- Pronouns
- Bio (rich text)
- Theme song
- Links list

## YouTube embeds (allowed platform)
For safety and consistency, Bzl currently supports YouTube embedding:
- Links in rich text can be auto-decorated into a YouTube-nocookie iframe embed.

## DMs (Direct Messages)
DMs are:
- 1:1 private chat threads with a request/accept flow
- Stored server-side and encrypted at rest in the DM data file
- Purged on a rolling 24-hour window by default (space-saving policy; configurable via `DM_RETENTION_MS`)

Flow:
1. You send a DM request to a member.
2. They see an incoming request in DMs and can accept/decline.
3. Once accepted, the DM becomes an active private chat thread.

Blocking rules:
- If either side blocks the other, DM requests and sending are denied.

## Ignore / Block
From a profile, you can:
- Ignore a user: hides their content for you (feed + chat) and suppresses pings/toasts.
- Block a user: implies ignore + prevents DMs between you and that user.

Restrictions:
- You cannot block/ignore moderators or the owner.

## Reports (member workflow)
Members can report:
- A hive (post)
- A chat message

Reports appear in the Moderation panel for moderators/owner to review.

## Moderation panel (mods/owner only)
Moderation is a dedicated panel (and its own page on mobile).

### Reports tab
- Review open/resolved/dismissed reports
- Resolve/dismiss with a reason (and optionally apply related actions)

### Users tab
Moderators can:
- Mute / unmute (time-based)
- Suspend / unsuspend (time-based)
- Ban / unban

Owner can:
- Promote/demote moderators
- Create/archive custom roles (key + label + color)
- Assign/remove custom roles to/from users (for flair and/or gating)

Password reset (with moderator help):
- Moderators/owner can reset a user's password (sessions are revoked).
- The new password is not stored in moderation log metadata.

### Hives tab
Moderators can:
- Open chat
- Purge recent messages
- Delete (soft delete; can be restored)
- Restore (if a restore snapshot exists)
- Erase (hard delete; data is removed; uploads are removed when safe)
- Set TTL:
  - Permanent
  - Presets (for quick actions)
  - Custom minutes
- Toggle read-only
- Manage protection:
  - Protect with password
  - Unprotect
  - Change password

### Log tab (append-only moderation log)
All moderation actions write to an append-only log including:
- Action type
- Actor
- Target type/id
- Reason
- Timestamp
- Context metadata (when applicable)

The Log page also includes a **Server dev log** view (for debugging):
- Shows recent server/client dev log lines (in-memory; clears on server restart)
- Useful for plugin debugging and UI event tracing

### Owner-only: NUKE
Owner can NUKE the board (with an explicit confirm toggle) to:
- Clear all hives, reports, moderation log, and hive media uploads
- Keep users, profiles, and instance settings

## Media uploads & storage
Media is stored as files (not data URLs):
- Uploads go to `data/uploads/`
- Posts/messages store short local URLs like `/uploads/<file>`

Supported:
- Images / GIFs
- Audio (including walkie clips)

## Persistence
Bzl persists runtime state locally:
- Users + profile fields
- Posts + chat + reactions
- Reports
- Moderation log
- Sessions (persistent logins)
- Collections + custom roles
- Uploads
- Instance settings

## Security & privacy notes (honest framing)
Bzl is designed for small communities, not high-trust adversarial environments.

Implemented:
- Server-side role enforcement (client role claims are not trusted)
- Moderation audit log
- DMs encrypted at rest (still processed by the server to deliver messages)
- Rate limits for common abuse vectors (login/register/posts/reports/mod actions/uploads)
- Sensitive UI (like the LAN IP display) can be hidden for non-moderators

## Mobile UX
- Swipe-based paging across panels.
- People and Moderation behave as dedicated pages on mobile.

## UX polish highlights (quick callouts)
- Subtle animation for new hives/messages
- Compact filters and denser layouts
- Resizable chat panel on desktop (drag the divider)
- Inline reactions/actions row in chat bubbles

## Known limitations / future expansions (optional to mention)
- Appeals workflow (future)
- Automated moderation (future)
- Federation/multi-server moderation (future)
- Installer wizard / one-click hosting (in progress)
