# Bzl Community Features Roadmap

## Purpose
Capture the next major product features requested for community growth, and define a practical build order.

## Related Specs
- `docs/ONBOARDING_AND_MOD_MESSAGE_IMPLEMENTATION_SPEC.md` (onboarding panes, mod messages, tutorial overlays, onboarding-first preset)

## Scope
This roadmap covers:
- Discovery and organization of hives (`Collections`, sorting, search)
- User personalization and access control (roles, ignore/block, hidden/starred views)
- Content controls (spoiler images)
- Owner customization (theme/banner/title)
- Private communication (DMs, inbox, group chat)

This roadmap does not replace moderation specs; it builds on top of them.

## Status (MVP)
Most of the items originally tracked here are already shipped in the current MVP build:
- Collections + tabs, keyword/author filtering, and sort modes
- Custom roles + collection gating
- Starred/Hidden views
- Ignore/Block (with owner/mod exceptions)
- Owner instance branding + theme/appearance
- 1:1 DMs (with request/accept) and rolling retention purge

Remaining roadmap items are mainly:
- Spoiler image support
- Group chats / richer inbox & notifications

## Requested Features (Normalized)
[x] 1. Search hives by author and keywords.
[x] 2. Curated collections for hives:
   - Hive must be assigned to a collection when created.
   - Collection filter tabs in hive panel.
   - Left-most tab is `All`.
[x] 3. Admin/mod-created extended user roles:
   - Decorative labels and optional collection gating.
[x] 4. Sort options:
   - `Most Popular`, `Most Recent Activity`, `About to Expire`.
[x] 5. Per-user Starred collection:
   - Add `⭐` reaction on hive posts.
   - Starred hives appear in the user's `Starred` view.
[x] 6. Per-user hidden hives:
   - `Hide Hive` action.
   - Hidden hives appear in the user's `Hidden` view.
[ ] 7. Spoiler image support.
[x] 8. Ignore/block users:
   - Cannot ignore/block `moderator` or `owner`.
[x] 9. Owner panel for instance branding/theme.
[ ] 10. DMs, inbox/notifications, and group chats (beyond 1:1 DMs).

## Architecture Notes
- Keep per-user preferences local-to-user data model (starred, hidden, ignored users).
- Keep curated structures server-authoritative (collections, custom roles, gating rules).
- Keep all access checks server-side (never trust client tab/role claims).
- Reuse existing WebSocket pattern (`init`, delta updates, permission errors).

## Data Model Additions (Reference)
### `collections`
- `id: string`
- `name: string`
- `slug: string`
- `description: string`
- `createdBy: string`
- `createdAt: number`
- `order: number`
- `visibility: "public" | "gated"`
- `allowedRoles: string[]` (custom role keys + base roles)
- `archived: boolean`

### `posts` additions
- `collectionId: string` (required; defaults to a server-defined default collection)
- `popularityScore: number` (derived/cached)

### `users` additions
- `customRoles: string[]` (owner/mod assigned tags)
- `starredPostIds: string[]`
- `hiddenPostIds: string[]`
- `ignoredUsers: string[]`

### `instanceConfig`
- `title: string`
- `bannerUrl: string`
- `theme: object` (colors, accents, optional typography profile)

### `dms` / `threads` (future phase)
- `threadId: string`
- `participants: string[]`
- `messages: []`
- `lastActivityAt: number`

## Permission Model Additions
- `owner/moderator` can manage collections.
- `owner` can manage custom role definitions and instance branding.
- `members` can star/hide hives and ignore eligible users.
- Gated collections require matching base role or custom role.
- Blocked/ignored users' content is filtered server-side per requesting user.

## UX Changes (High-Level)
- Hive compose form:
  - Collection dropdown (required).
  - Sort selector.
  - Keyword + author search inputs.
- Hive panel tabs:
  - `All` + curated collections + user-private `Starred` and `Hidden`.
- Hive card actions:
  - `Star`, `Hide`, `Chat`, existing moderation/report controls.
- Media rendering:
  - Spoiler images render blurred/covered until click-to-reveal.
- Owner panel:
  - Branding/theme editor with preview + save.
- People/communication:
  - Inbox and DMs surfaces; group threads in later phase.

## Implementation Plan (Phased)
Note: Phases 1–3 and the core of 5–6 are implemented in the current MVP. The main remaining items are spoiler images and group chat / richer inbox behavior.

### Phase 1: Discovery + Personal Filters
Deliver first:
1. Author + keyword search in hive feed.
2. Sort selector (`popular`, `recent`, `expiring`).
3. Star reaction + per-user `Starred`.
4. Hide action + per-user `Hidden`.

Acceptance:
- Users can quickly find, sort, star, and hide hives without affecting others.

### Phase 2: Curated Collections
1. Backend `collections` model + persistence.
2. Compose dropdown (collection required).
3. Hive tabs for collections + `All`.
4. Collection management UI for owner/moderator.

Acceptance:
- Mods/owner can curate structure; users browse by collection.

### Phase 3: Custom Roles + Gating
1. Role definition model and assignment controls.
2. Collection gating by role.
3. Enforcement for list/view/chat access.

Acceptance:
- Unauthorized users cannot discover or access gated collections.

### Phase 4: Safety + Personal Control
1. Ignore/block users (with owner/mod exceptions).
2. Spoiler image tool and rendering behavior.

Acceptance:
- Users can reduce unwanted exposure while moderation remains authoritative.

### Phase 5: Owner Branding
1. Instance theme/title/banner config.
2. Owner panel with live preview and save/reset.

Acceptance:
- Owner can personalize visual identity without code edits.

### Phase 6: Private Messaging
1. Inbox model and notification events.
2. 1:1 DMs.
3. Group chat threads.

Acceptance:
- Stable private communication layer with unread state and thread list.

## Dependencies and Order Constraints
- Collections should ship before role gating.
- Role gating should ship before private collection-like channels.
- Inbox notification plumbing should be established before full DMs/group chat.
- Ignore/block filtering should be in place before scaling DM usage.

## Open Questions
- Should Starred/Hidden be tabs or virtual collections from user prefs only?
- Should custom role tags be visible publicly or owner/mod-only?
- For Most Popular, should score weight reactions, chat volume, and recency equally?
- Should blocked users be hidden in people list and typing indicators too?
