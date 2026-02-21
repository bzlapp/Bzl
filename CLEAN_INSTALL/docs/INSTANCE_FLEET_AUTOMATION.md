# Instance Fleet Automation (Detect + Update + Create)

Use this when you run multiple Bzl clones in separate folders on one server (for example `/Bzl`, `/srv/bzl-staging`, `/opt/community/Bzl`).

## 1) Detect instances from root paths

List discovered Bzl instances:

```bash
npm run instances:scan -- --roots=/ --max-depth=4
```

By default, detection looks for folders containing:
- `package.json` with `"name": "bzl"`
- `server.js`
- one compose file (`compose.yaml`, `compose.yml`, or `docker-compose.yml`)

## 2) Update all discovered instances

Bulk update:

```bash
npm run instances:update -- --roots=/ --max-depth=4
```

This performs, per instance:
1. `git fetch`
2. `git checkout main`
3. `git pull --ff-only origin main`
4. `docker compose -f <compose-file> up -d --build --remove-orphans`

Useful flags:
- `--skip-git`
- `--skip-build`
- `--branch=main`
- `--remote=origin`
- `--dry-run`

## 3) Create a new instance in a new folder

Provision a fresh clone + `.env` + docker startup:

```bash
npm run instance:create -- --path=/srv/bzl-new --port=3405 --registration-code='replace-me' --hostname=new.example.com
```

Default repo source is `https://github.com/bzlapp/Bzl.git` on `main`.

Useful flags:
- `--repo=...`
- `--branch=...`
- `--no-start`
- `--dry-run`

## Caddy + DNS reminders

After creating/updating instances:
- ensure each hostname reverse proxies to the correct local port
- verify `curl http://127.0.0.1:<port>/api/health`
- confirm public hostname routes to the expected instance
