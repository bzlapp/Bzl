# Bzl Moderation MVP Spec

## Purpose
Define the minimum moderation system required for Bzl to run safely in small private communities, with clear enforcement and a permanent moderation log.

## Scope
In scope:
- Role-based moderation permissions
- Report workflow for posts and chat messages
- Moderator actions on content and users
- Immutable moderation log in backend and UI
- Real-time moderation updates over WebSocket

Out of scope (later):
- Appeals workflow
- Automated moderation AI
- Cross-server federation moderation

## Roles
- `owner`: full permissions, can assign/remove moderators, can ban moderators.
- `moderator`: can moderate content/users, cannot demote owner.
- `member`: default user role.

Single-owner model for MVP:
- First account created becomes `owner`.
- Owner can promote/demote users to/from `moderator`.

## Permission Matrix
- `member`
  - Create report
  - View own report submissions
- `moderator`
  - All member permissions
  - View open/resolved reports
  - Delete post
  - Delete chat message
  - Purge recent messages in a post chat
  - Mute user (time-based)
  - Suspend user (time-based)
  - Ban/unban user
  - Lock/unlock post (optional visibility control)
- `owner`
  - All moderator permissions
  - Assign/remove moderator role
  - Override and reverse any moderation action

## Moderation Actions (MVP)
Every action below requires `reason` and creates one immutable log entry.

Content actions:
- `post_delete` (hard remove post + chat)
- `post_lock` / `post_unlock`
- `message_delete`
- `message_purge_recent` (count + window, ex: last 50 in 30m)

User actions:
- `user_mute` (`mutedUntil`)
- `user_unmute`
- `user_suspend` (`suspendedUntil`)
- `user_unsuspend`
- `user_ban` (`banned = true`)
- `user_unban`
- `user_role_set` (owner only)

Report actions:
- `report_resolve` (valid report)
- `report_dismiss` (invalid report)

## Behavioral Rules
- Muted user: cannot send chat; can still read.
- Suspended user: cannot post/chat/react/boost; can still sign in and read.
- Banned user: cannot sign in.
- Existing session revocation:
  - If user becomes suspended or banned, server pushes immediate auth state update and blocks new actions.
- Protected posts:
  - Moderators bypass post password access checks.

## Data Model Additions
All persisted to disk with existing persistence strategy.

### `users` additions
- `role: "owner" | "moderator" | "member"`
- `mutedUntil: number` (epoch ms, `0` for none)
- `suspendedUntil: number` (epoch ms, `0` for none)
- `banned: boolean`

### `reports` collection
- `id: string`
- `targetType: "post" | "chat"`
- `targetId: string`
- `postId: string` (required for chat target)
- `reporter: string`
- `reason: string`
- `status: "open" | "resolved" | "dismissed"`
- `resolutionNote: string`
- `createdAt: number`
- `resolvedAt: number`
- `resolvedBy: string`

### `modActions` collection (immutable)
- `id: string`
- `actionType: string`
- `actor: string`
- `targetType: "user" | "post" | "chat" | "report" | "system"`
- `targetId: string`
- `reason: string`
- `metadata: object`
- `createdAt: number`

Retention:
- Keep all log entries for MVP.
- Optional cap by count can be added later only with archival export.

## WebSocket Protocol Additions
### Client -> Server
- `reportCreate`
  - `{ type, targetType, targetId, postId?, reason }`
- `modAction`
  - `{ type, actionType, targetType, targetId, reason, metadata? }`
- `modListReports`
  - `{ type, status?, limit?, cursor? }`
- `modListLog`
  - `{ type, filters?, limit?, cursor? }`
- `modListUsers`
  - `{ type, query?, limit?, cursor? }`

### Server -> Client
- `reportCreated`
  - `{ type, report }`
- `reportUpdated`
  - `{ type, report }`
- `modActionApplied`
  - `{ type, action, effects }`
- `modLogAppended`
  - `{ type, entry }`
- `modSnapshot`
  - `{ type, reports, users, log, cursor }`
- `permissionDenied`
  - `{ type, message }`

## Server Enforcement Points
Add a centralized guard:
- `requireRole(ws, minRole)` helper.

Add status guards on write actions:
- block `chatMessage` if muted/suspended/banned.
- block `newPost`, `boostPost`, `react` if suspended/banned.
- block `login` if banned.

Moderation bypass:
- in protected post checks, allow if role is `moderator` or `owner`.

Audit-first rule:
- do not execute moderation action unless log write succeeds.

## Mod Panel UX (MVP)
Add a moderator panel visible only to `moderator`/`owner` with tabs:

1. `Reports`
- List open reports first.
- Quick actions: resolve + apply moderation action, dismiss.

2. `Users`
- Search users.
- Actions: mute/suspend/ban/unban, role set (owner only).
- Show current status badges.

3. `Hives`
- Quick post and chat moderation actions.

4. `Log`
- Chronological immutable list.
- Filters: action type, actor, target, date window.
- Clicking entry shows structured metadata.

## Validation and Limits
- `reason` min 8 chars, max 280 chars.
- `report reason` min 8 chars, max 500 chars.
- Rate limits:
  - report creation per user
  - moderation actions per moderator per minute
- Reject duplicate open reports from same user on same target in short window.

## Security Considerations
- Never trust client role claims; role loaded server-side from user store.
- Include actor + timestamp from server only.
- Log entries are append-only.
- Hide sensitive fields from non-moderators.

## Rollout Plan
1. Backend schemas + guards + log write path.
2. Report creation UI.
3. Moderator panel (`Reports`, `Users`, `Hives`).
4. Log tab and filtering.
5. End-to-end testing with at least 3 roles.

## Acceptance Criteria
- Members can report posts/messages.
- Moderators can action reports and moderate users/content.
- Every moderation action appears in log with actor/reason/time.
- Banned users cannot log in.
- Muted users cannot chat.
- Suspended users cannot post/chat/react/boost.
- Mod panel updates in real time for concurrent moderators.
