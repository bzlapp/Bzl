Bzl is a self-hostable, modular social platform designed for creators and communities who want full control of their space. Launch your own instance, extend it with plugins, and shape the experience to fit your world.

🔗 Try the live dev instance: https://chat.bzl.one/

🚀 Learn more & quick start: https://bzl.one/

💬 Follow development in real time: https://chat.bzl.one/

If you're experimenting, building plugins, or just curious how Bzl works in the wild — jump into the official instance and say hi.



# Bzl (MVP)

Keyword-driven ephemeral posts ("pollination") that auto-expire after a TTL and broadcast live over WebSockets. Each post has a tiny chat room.

Feed ordering:
- Posts rise to the top based on recent chat activity (and manual boosts), not just creation time.
- Other users can boost a post (+5m to +2h). Each chat message bumps the post (+2m, capped).
- Posts and chat messages support emoji reactions (thumbs-up, heart, angry, sob, pleading, laugh-cry).
- Hive feed supports filtering by keywords and author, plus sort modes (`Most recent activity`, `Most popular`, `About to expire`).
- Users get private `Starred` and `Hidden` hive views (`⭐` reaction on hives stars them; hidden hives are user-local).
- Hives are assigned to curated collections; compose includes a required collection selector and feed supports collection tabs.
- Owner/moderator can define custom role tags and gate collections by base/custom role.
- Clicking a member in `People` opens their profile view (bio, pronouns, theme song, and social links), with an in-panel editor for the profile owner.

Media uploads:
- GIF/image/audio attachments are uploaded to `data/uploads/` and referenced by short `/uploads/...` URLs.
- This avoids massive WebSocket payloads from base64 data URLs and is more reliable for larger files.

## Docs

- Full feature rundown (video script aid): `docs/FUNCTIONALITY_REFERENCE.md`
- Plugins (MVP): `docs/PLUGINS.md`
- UI rack layout (draft): `docs/UI_RACK_LAYOUT.md`
- Directory plugins (draft): `docs/DIRECTORY_SPEC.md`
- Moderation spec: `docs/MODERATION_MVP_SPEC.md`
- Self-hosted installer plan: `docs/SELF_HOSTED_INSTALLER_PLAN.md`
- Issue tracker guide: `docs/ISSUE_TRACKER.md`
- Updating a live server (git + docker): `docs/SERVER_UPDATE.md`

## Run locally

### Docker

To run a local instance of the app, the following command can be used:
```bash
docker compose -f compose.yaml up --build --remove-orphans
```

Optionally the `-d` flag can be specified to let the app run as a background process.

### Manual

1. Install Node.js (recommended: Node 18+)
2. From this folder:
   - Optional first-time wizard: `npm run init` (Windows PowerShell: `npm.cmd run init`)
   - `npm install` (or `npm.cmd install` in Windows PowerShell if `npm` is blocked by execution policy)
   - `npm start` (or `npm.cmd start` in Windows PowerShell)
   - Recommended: GUI launcher: `LAUNCHER.cmd` / `LAUNCHER.ps1` (or `npm run launcher:ui`) — includes Cloudflare setup + core auto-update
   - Or a launcher (opens the URL when ready): `npm run launch`
   - Or launcher + Cloudflare quick tunnel: `npm run launch:tunnel`
3. Open:
   - `http://localhost:3000`
   - or from another device on the same Wi-Fi/LAN: `http://<your-laptop-ip>:3000`

If another device can't connect, allow inbound connections for Node on your firewall.

Health check endpoint:
- `GET /api/health` returns basic runtime status for setup/service checks.
- Includes active rate-limit bucket count for diagnostics.

## Accounts (username/password)

Posting and chat require signing in.

Create users on the host machine (your laptop):
- `node scripts/create-user.js <username>`
- or `npm.cmd run create-user -- <username>`

The users file is stored at `data/users.json` on your host (ignored by git).

First-time setup option: if no users exist yet, you can create the first user from `http://localhost:3000` (loopback only).

To let other people create their own accounts (useful over a tunnel), set a registration code on the host:
- PowerShell (current session): `$env:REGISTRATION_CODE="some-long-random-string"`
- Then restart the server.

## Backups and restore

Runtime data can be snapshotted locally (users, posts, reports, mod log, sessions, uploads).

- Create backup: `npm run backup-data`
- List backups: `node scripts/restore-data.js --list`
- Restore latest backup: `npm run restore-data -- --yes`
- Restore a specific backup: `npm run restore-data -- --name <backup-folder-name> --yes`

Notes:
- Restore overwrites current runtime files in `data/`.
- Restore automatically creates a `pre-restore-*` safety snapshot first.

## Service reliability (Windows)

Run with supervision (auto-restart + health watchdog):
- `npm run start:supervised`

Install a startup task for your Windows user:
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\install-windows-startup.ps1`

Remove startup task:
- `powershell -ExecutionPolicy Bypass -File .\\scripts\\uninstall-windows-startup.ps1`

Runner env vars (optional):
- `HEALTHCHECK_URL` (default `http://127.0.0.1:<PORT>/api/health`)
- `HEALTHCHECK_MS` (default `15000`)
- `HEALTHCHECK_TIMEOUT_MS` (default `4000`)
- `HEALTHCHECK_FAILS` (default `3`)
- `RESTART_MIN_MS` (default `2000`)
- `RESTART_MAX_MS` (default `30000`)

## Share beyond LAN (tunnel)

If you want friends to connect from anywhere without port forwarding, run a tunnel on your host PC.

Cloudflare quick tunnel (no router changes):
1. Install: `winget install Cloudflare.cloudflared`
2. Start Bzl: `npm.cmd start`
3. In a second terminal run: `cloudflared tunnel --url http://localhost:3000`
4. Share the `https://...trycloudflare.com` URL it prints.

If you update the app and someone still sees an older UI, do a hard refresh (or open an incognito window). The server sets `Cache-Control: no-store`, but some browsers/proxies can still hold onto old assets briefly.

Cloudflare named tunnel (stable URL):
1. Put a domain on Cloudflare (DNS managed by Cloudflare).
2. Authenticate `cloudflared` (one-time; opens a browser): `cloudflared tunnel login`
3. Create the tunnel: `cloudflared tunnel create bzl`
4. Route a hostname to it (example): `cloudflared tunnel route dns bzl bzl.yourdomain.com`
5. Create a config file at `%HOMEPATH%\\.cloudflared\\config.yml`:
   - `tunnel: <TUNNEL-UUID>`
   - `credentials-file: C:\\Users\\<you>\\.cloudflared\\<TUNNEL-UUID>.json`
   - `ingress:` mapping your hostname to Bzl:
     - `- hostname: bzl.yourdomain.com`
       `service: http://localhost:3000`
     - `- service: http_status:404`
6. Run it:
   - Foreground: `cloudflared tunnel run bzl` (requires the `config.yml` ingress rules)
   - One-off (no config): `cloudflared tunnel run bzl --url http://localhost:3000`
   - As a service: `cloudflared service install` (then it starts on boot)

## Environment variables

- `PORT` (default `3000`)
- `HOST` (default `0.0.0.0`)
- `DEFAULT_TTL_MS` (default `3600000`)
- `MIN_TTL_MS` (default `60000`)
- `MAX_TTL_MS` (default `172800000`)
- `USERS_FILE` (default `data/users.json`)
- `POSTS_FILE` (default `data/posts.json`)
- `COLLECTIONS_FILE` (default `data/collections.json`)
- `ROLES_FILE` (default `data/roles.json`)
- `UPLOADS_DIR` (default `data/uploads`)
- `IMAGE_UPLOAD_MAX_BYTES` (default `104857600` = 100 MB)
- `AUDIO_UPLOAD_MAX_BYTES` (default `157286400` = 150 MB)
- `PROFILE_BIO_MAX_HTML_LEN` (default `120000`)
- `PROFILE_PRONOUNS_MAX_LEN` (default `40`)
- `PROFILE_LINK_LABEL_MAX_LEN` (default `40`)
- `PROFILE_LINK_URL_MAX_LEN` (default `280`)
- `PROFILE_LINKS_MAX` (default `8`)

Startup validation:
- Server validates critical env values at boot and exits with clear errors if invalid.

Rate limits:
- Auth: login/register/resume session are rate-limited.
- Uploads: image/audio uploads are rate-limited per sender.
- Moderation: report creation and moderation actions are rate-limited.
- Server emits `rateLimited` messages over WebSocket and `429` with `retryMs` for upload API.

Rate limit env vars:
- `RL_LOGIN_WINDOW_MS` (default `60000`)
- `RL_LOGIN_MAX` (default `12`)
- `RL_REGISTER_WINDOW_MS` (default `600000`)
- `RL_REGISTER_MAX` (default `6`)
- `RL_RESUME_WINDOW_MS` (default `60000`)
- `RL_RESUME_MAX` (default `30`)
- `RL_UPLOAD_WINDOW_MS` (default `300000`)
- `RL_UPLOAD_IMAGE_MAX` (default `20`)
- `RL_UPLOAD_AUDIO_MAX` (default `10`)
- `RL_REPORT_WINDOW_MS` (default `600000`)
- `RL_REPORT_MAX` (default `12`)
- `RL_MOD_WINDOW_MS` (default `60000`)
- `RL_MOD_MAX` (default `40`)

## Open source

Bzl is released under the MIT License. See `LICENSE`.

Community docs:
- Contributing: `CONTRIBUTING.md`
- Security policy: `SECURITY.md`
- Issue tracker guide: `docs/ISSUE_TRACKER.md`
