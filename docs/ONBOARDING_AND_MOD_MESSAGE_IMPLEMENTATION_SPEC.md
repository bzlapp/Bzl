# Onboarding + Mod Message Implementation Spec (v1)

## Purpose
Define a shippable implementation for:
- Mod-to-user priority messaging (`MOD` sender identity in client UI)
- Server-configurable onboarding panes (`About`, `Rules`, `Role Select`)
- Rule reference shortcuts in chat (`&X`)
- Guided tutorial overlays
- A default layout preset that prioritizes onboarding UX on first run

This spec is implementation-focused and aligned with current panel/rack + mobile screen architecture.

## Product goals
- New users understand the community quickly before posting.
- Moderators can communicate urgent guidance without DM friction.
- UX remains usable on small mobile screens first, then scales up.
- Onboarding is the default first-run layout preset on all devices.

## Non-goals (v1)
- Full learning management / quizzes.
- Rich workflow automation for moderation.
- End-to-end plugin onboarding integration.
- Cross-instance federated onboarding sync.

## Feature scope

### 1) Mod Message
**Behavior**
- Moderators/owner can send a direct message as `MOD`.
- Message bypasses DM request acceptance.
- Recipient gets a high-priority notification.
- On open clients, UI focuses the mod thread in the primary view.

**Identity model**
- Client renders sender as `MOD`.
- Server stores `senderUserId` for audit.
- Non-mod recipients never see the underlying mod username.

**Controls**
- Rate limit per moderator (anti-spam).
- Recipient can mute future mod messages from the same instance for a time window (except critical notices flag).
- Full moderation log entries are mandatory.

### 2) Onboarding Panes
Three admin-configured panes:

1. **About**
   - Rich text content (sanitized HTML subset / markdown-rendered).
   - Optional media blocks.

2. **Rules**
   - Ordered list of rules:
     - `name`
     - `shortDescription`
     - `description`
   - Optional `requireAcceptance` gate.
   - If gate is enabled, users cannot post/chat until accepted.
   - Optional read-gate for viewing posts (configurable).

3. **Custom Role Select**
   - Displays selectable self-assignable custom roles.
   - Hidden when no self-assignable roles exist.

### 3) Rule shortcut in chat (`&X`)
- Typing `&3` expands to a highlighted rule reference chip/card.
- Expansion occurs client-side preview + server-side validation on send.
- If rule index invalid, send is rejected with actionable error.
- Hover/tap on rendered reference opens Rules pane anchored to that rule.

### 4) Tutorial overlays
- Entry point: Account panel button (`Show tutorial`).
- Device-specific walkthrough variants:
  - Mobile: bottom-nav + screen switching + compose/chat flow.
  - Desktop/tablet: panel layout, rack visibility, profile/people/chat flow.
- Supports replay anytime.
- Tracks completion per user/device.

### 5) Default layout preset: `onboardingDefault`
- New default preset for first-run sessions.
- Prioritizes onboarding surfaces before advanced layout customization.
- Applies once per user/device, then user customizations persist.

## UX per device

### Mobile (primary target)
- Bottom nav order: `Account`, `Hives`, `Chat`, `People`, `Profile`, `More`.
- `Maps` hidden by default on mobile.
- Onboarding appears as top-level flow when acceptance required.
- Rules gate CTA stays sticky at bottom: `Accept and continue`.
- Chat composer:
  - Hide advanced formatting/emoji reaction controls by default.
  - Keep quick actions: `Link`, `GIF/Image`, `Audio`.
  - `Send` button full-width and never obscured by nav/safe-area.
- People screen must always render a visible list state:
  - loading, empty, or populated.

### Tablet
- Same onboarding flow as mobile, with split-pane where width allows:
  - left: rules/about list
  - right: selected detail.
- Chat list + active chat can coexist in landscape.

### Desktop
- Onboarding is a guided preset, not a hard gate unless `requireAcceptance`.
- If side rack is hidden, remaining panels reflow without orphan floating panes.
- Mod message interrupt focuses chat panel but does not destroy current layout.

## Data model changes

### `instanceConfig.onboarding`
```json
{
  "enabled": true,
  "about": {
    "content": "sanitized-rich-text",
    "updatedAt": 0,
    "updatedBy": ""
  },
  "rules": {
    "requireAcceptance": false,
    "blockReadUntilAccepted": false,
    "items": [
      { "id": "r1", "order": 1, "name": "", "shortDescription": "", "description": "" }
    ]
  },
  "roleSelect": {
    "enabled": true,
    "selfAssignableRoleIds": []
  },
  "tutorial": {
    "enabled": true,
    "version": 1
  }
}
```

### `users.onboardingState[instanceId]`
```json
{
  "acceptedRulesVersion": 1,
  "acceptedAt": 0,
  "tutorialCompletedVersion": 1,
  "selectedRoleIds": []
}
```

### `messages` additions
```json
{
  "isModMessage": true,
  "senderLabel": "MOD",
  "auditSenderUserId": "u123",
  "priority": "high"
}
```

## API / WebSocket changes

### Admin/Mod config
- `onboarding:get`
- `onboarding:updateAbout`
- `onboarding:updateRules`
- `onboarding:updateRoleSelect`
- `onboarding:publish` (increments rules/tutorial version where needed)

### User actions
- `onboarding:getState`
- `onboarding:acceptRules`
- `onboarding:selectRoles`
- `tutorial:markComplete`

### Mod messaging
- `dm:sendModMessage`
- `dm:modMessageReceived` (high-priority client event)
- `dm:openThread` should accept mod thread ids identically to regular DMs

### Rule references
- `chat:resolveRuleRef` (optional helper)
- Server validates final message payload contains valid rule IDs.

## Permission rules
- Owner/moderator can manage onboarding content and send mod messages.
- Only owner can toggle `blockReadUntilAccepted`.
- Rule acceptance is per user per instance.
- Server enforces acceptance gate for read/post endpoints and WS events.

## Layout preset definition

Add preset to layout catalog:

```json
{
  "id": "onboardingDefault",
  "label": "Onboarding",
  "deviceProfiles": {
    "mobile": { "pinned": ["account", "hives", "chat", "people", "profile"] },
    "tablet": { "racks": { "left": ["onboarding"], "main": ["hives", "chat"], "right": ["people", "profile"] } },
    "desktop": { "racks": { "left": ["onboarding", "hives"], "main": ["chat"], "right": ["people", "profile"] } }
  },
  "firstRunOnly": true
}
```

Preset application rules:
- Applied when no prior user layout exists.
- If onboarding disabled, preset gracefully degrades to existing default.
- User edits override preset immediately and persist.

## Rollout plan

### Phase 1: Data + gating foundation
- Add onboarding config/state schemas.
- Implement rules acceptance gate checks server-side.
- Add migration defaults for existing instances/users.

### Phase 2: Mobile-first onboarding UX
- Build About/Rules/Role Select screens.
- Implement `onboardingDefault` first-run preset.
- Ensure safe-area/nav spacing for chat composer and send button.

### Phase 3: Mod message + rule refs
- Add mod message send/receive path and audit logging.
- Add `&X` parsing, validation, and rendering.
- Add notification + focus behavior.

### Phase 4: Tutorial overlays + polish
- Implement per-device tutorial flows.
- Add replay entry point in Account.
- Add analytics counters (started/completed/skipped).

## Acceptance criteria
- People pane always renders on mobile (no blank screen state).
- DM/mod thread open action always routes to a visible chat context.
- Send button never overlaps bottom nav on supported mobile sizes.
- With rules gate enabled, blocked actions return clear errors and CTA to rules.
- `&X` references resolve correctly and render consistently in chat history.
- First-run users see onboarding preset by default on each device class.

## UX ideas for later polish
- Rule chips in chat show color-coded severity (info/warn/critical).
- “Why this rule exists” collapsible rationale to reduce moderation friction.
- Progressive disclosure in composer: reveal rich tools only after tapping `+`.
- Smart onboarding resume: return user to last incomplete pane.
- Contextual tutorial nudges when user fails an action repeatedly.
