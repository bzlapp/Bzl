# PRIVATE: Security Upgrade Plan (Core)

Last updated: 2026-02-22

This document is for internal planning and prioritization.

## Scope

Core server and first-party client:
- `server.js`
- `public/app.js`
- auth/session, plugin loading, WebSocket abuse controls, upload surface, role controls

## Risk priorities

### P0 (immediate)

1. Tighten plugin trust boundary
   - Move plugin install/enable/uninstall/reload from moderator to admin/owner.
   - Add plugin signing + trusted publisher checks.
   - Add optional `PLUGIN_INSTALL_DISABLED=1` hard lock for production.

2. Add message flood controls
   - Add rate limits for:
     - `newPost`
     - `chatMessage`
     - `dmSend`
     - `dmSendMod`
   - Include server-side hard caps + backoff events.

3. Raise password baseline
   - Increase minimum from 4 to 10+.
   - Add optional strong policy mode (length + complexity).
   - Add migration note for existing instances.

### P1 (near-term)

4. Move session storage out of `localStorage`
   - Switch to secure session cookies:
     - `HttpOnly`
     - `Secure`
     - `SameSite=Lax` (or `Strict` if compatible)
   - Keep token rotation and invalidation.

5. WebSocket origin + payload hardening
   - Add explicit origin allowlist env (`WS_ORIGIN_ALLOWLIST`).
   - Reject unknown origins at WS handshake.
   - Set explicit WS max payload and close on overflow.

6. TURN credential hardening
   - Move from static TURN credentials to short-lived credentials.
   - Add relay abuse monitoring and quotas.

### P2 (mid-term)

7. Security headers and deployment defaults
   - Add HSTS when HTTPS is confirmed.
   - Re-check CSP for least privilege after plugin API updates.

8. Audit and tamper logging
   - Security log stream for:
     - role changes
     - plugin install/uninstall
     - repeated failed auth
     - unusual upload spikes

9. Safe plugin execution model
   - Evaluate plugin sandbox strategy:
     - isolate process
     - permission-gated API
     - no raw filesystem/process access by default

## New role model update (current change)

Added base role:
- `admin` (between `moderator` and `owner`)

Intent:
- Admin can manage plugins and access owner-level views.
- Owner remains final authority for destructive or ownership-sensitive operations.

## Implementation checkpoints

### Phase A (this release train)
- [x] Add `admin` role in core role hierarchy.
- [x] Restrict plugin management to admin/owner.
- [ ] Add RL buckets for post/chat/dm sends.

### Phase B
- [ ] Cookie-based session migration.
- [ ] WS origin allowlist.
- [ ] WS payload limit hard cap.

### Phase C
- [ ] Plugin signing and trust policy.
- [ ] Optional plugin sandbox architecture draft.

## Validation checklist per phase

- Unit/smoke test auth flows.
- Verify moderation matrix (member/mod/admin/owner).
- Load test chat + DM flood controls.
- Confirm plugin lifecycle still works for admin/owner only.
- Verify no regression in mobile/desktop UX around auth and chat.

