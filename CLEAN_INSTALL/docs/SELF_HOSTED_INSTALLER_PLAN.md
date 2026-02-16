# Bzl Self-Hosted Installer Plan

## Goal
Turn Bzl into a replicable self-hosted package that a non-technical community admin can install and run with minimal setup.

Target outcome:
- Download one installer.
- Enter a small set of config values.
- Receive a working public URL backed by Cloudflare Tunnel.
- Keep the server running automatically on reboot.

## Product Scope
This version is intentionally scoped for small private communities:
- Single host machine runs the server.
- Host controls moderation and invites.
- Persistence is local to the host.
- Scaling beyond one host is not part of this phase.

## Ideal Operator Experience
The install path should look like this for a new host:
1. Download `Bzl-Setup` for their OS.
2. Open installer and choose install location.
3. Complete first-run wizard prompts:
   - Domain (example: `yourdomain.com`)
   - Subdomain (example: `bzl`)
   - Cloudflare API token
   - Registration code
   - Initial admin username/password
   - App port (default `3000`)
4. Click "Launch".
5. Installer validates health and displays final URL.
6. Host shares URL with their community.

No manual DNS records, tunnel config edits, or service setup should be required in normal flow.

## Core Components To Build
### 1) Bootstrap CLI (`bzl-init`)
Purpose: single command that performs all setup work.

Responsibilities:
- Validate prerequisites.
- Create `.env` from template.
- Create/update Cloudflare named tunnel.
- Route hostname to tunnel.
- Write `cloudflared` config.
- Configure app and tunnel startup services.
- Run health checks and print diagnostics.

### 2) Installer Wrapper
Purpose: GUI around `bzl-init` for non-CLI users.

Responsibilities:
- Collect wizard inputs.
- Run `bzl-init` with progress display.
- Surface actionable errors (token permission, DNS, port in use).
- Provide "Repair" and "Update" modes.

### 3) Service Runtime
Purpose: keep Bzl online reliably.

Responsibilities:
- Auto-start app and tunnel on reboot.
- Restart on crash.
- Persist logs for debugging.

## Moderation Prerequisites (Before Wide Release)
These need to exist before presenting Bzl as install-and-run for other communities.

Required:
- Report content (posts and chat messages).
- Moderator role with ability to:
  - Remove posts
  - Remove chat messages
  - Suspend/ban users
- Basic moderation log (who took action, when, what target).
- Rate limiting and abuse protections:
  - Account creation rate limit
  - Post/chat spam throttle
  - Failed auth throttling

Strongly recommended:
- Optional invite-only mode.
- Profanity and unsafe content filter hooks.
- Temporary mute and timed bans.

## Phased Roadmap
## Phase 0: Hardening Current App
- Finalize environment variable model.
- Add stable config file templates.
- Add startup validation checks and clearer error messages.
- Improve backup/restore for local data.

## Phase 1: Moderation MVP
- Ship moderator role + moderation actions.
- Add report flow in UI.
- Add moderation event log.
- Add basic rate limiting.

Release gate: no public installer until this phase is complete.

## Phase 2: CLI Installer (`bzl-init`)
- Build interactive setup prompts.
- Integrate Cloudflare API flow.
- Generate tunnel + DNS + local config.
- Add health checks and recovery hints.

Release gate: repeatable setup on clean machines.

## Phase 3: GUI Installer
- Wrap CLI in desktop installer UX.
- Add guided setup, progress, and repair mode.
- Add one-click launch and URL copy actions.

Release gate: first user can complete setup without terminal usage.

## Phase 4: Operations and Updates
- Versioned releases and upgrade path.
- Auto-update or guided update utility.
- Document rollback path.

## Config Inputs (Installer Wizard)
Keep this list short and stable:
- `DOMAIN`
- `SUBDOMAIN`
- `CF_API_TOKEN`
- `PORT` (default `3000`)
- `REGISTRATION_CODE`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Derived values should be generated automatically.

## Cloudflare Requirements
Token must support:
- Tunnel management
- DNS record management for selected zone

Installer should verify permissions before attempting setup and return a clear error when insufficient.

## Risks and Mitigations
- Risk: API token mis-scoped.
  - Mitigation: preflight permission check before writes.
- Risk: Local port already in use.
  - Mitigation: install-time port probe and alternative prompt.
- Risk: stale DNS/tunnel mapping.
  - Mitigation: idempotent reconcile flow in repair mode.
- Risk: weak moderation leads to abuse.
  - Mitigation: moderation MVP as release gate.

## Definition of Done for "Replicable"
Bzl is considered replicable when:
- New host can install from scratch in under 15 minutes.
- No manual edits are required post-install.
- Public URL works after reboot.
- Host can recover setup using repair mode.
- Core moderation controls are enabled by default.

## Immediate Next Steps
1. Draft moderation MVP spec in detail (roles, actions, audit log schema).
2. Implement moderation MVP and test with at least 3 users.
3. Draft `.env.example` and startup validation checks.
4. Start `bzl-init` CLI prototype.
