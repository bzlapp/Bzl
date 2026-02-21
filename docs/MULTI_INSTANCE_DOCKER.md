# Multi-instance Docker Setup (Single Server)

This workflow lets you run multiple Bzl instances on one host, each with its own:
- persistent data volume
- hostname
- registration code

It also supports generating Cloudflare tunnel ingress config and optional automated `cloudflared tunnel route dns` calls.

---

## 1) Create/edit config

Run once:

```bash
npm run multi:init
```

If `multi_instance/instances.json` does not exist, the script creates a template and exits.

Edit:
- `multi_instance/instances.json`

Key fields:
- `instances[].id` - stable identifier (used for service/env filenames)
- `instances[].hostname` - public hostname for that instance
- `instances[].hostPort` - unique localhost port each instance maps to
- `instances[].registrationCode` - per-instance registration code
- `cloudflared.*` - tunnel config + optional DNS route automation

---

## 2) Generate compose + env + DNS checklist

```bash
npm run multi:init
```

Generated files:
- `multi_instance/docker-compose.yml`
- `multi_instance/env/<id>.env` (one per instance)
- `multi_instance/DNS_CHECKLIST.md`
- Cloudflared config (path from `cloudflared.configPath`, default `~/.cloudflared/config.yml`)

Optional DNS automation:

```bash
npm run multi:init -- --route-dns
```

This runs `cloudflared tunnel route dns ...` for each configured hostname.

---

## 3) Start all instances

```bash
docker compose -f multi_instance/docker-compose.yml up -d --build --remove-orphans
```

Then verify local health endpoints from the host:

```bash
curl -fsS http://127.0.0.1:<hostPort>/api/health
```

---

## 4) Update all instances to latest source-of-truth

Use the updater script from the repo root:

```bash
npm run multi:update
```

Default behavior:
1. `git fetch origin`
2. `git checkout main`
3. `git pull --ff-only origin main`
4. regenerate multi-instance config outputs
5. `docker compose -f multi_instance/docker-compose.yml up -d --build --remove-orphans`

Options:
- `--skip-git` (skip fetch/pull)
- `--skip-build` (restart/update without image rebuild)
- `--route-dns` (also rerun DNS route commands during regeneration)
- `--dry-run` (show the docker command without executing it)
- `--config=/path/to/instances.json`

---

## DNS reminders

After generating or changing hostnames:
- ensure each hostname is routed to the intended tunnel (`cloudflared tunnel route dns ...`)
- confirm Cloudflare SSL/TLS mode is compatible (Full / Full strict recommended)
- restart tunnel process/service if ingress config changed
- verify each hostname reaches the expected instance (`/api/health`)
