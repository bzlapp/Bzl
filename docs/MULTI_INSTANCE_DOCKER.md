# Multi-Instance Docker Stack (Single Compose Project)

This workflow runs many Bzl instances from one generated compose file (`multi_instance/docker-compose.yml`).

Use this when you want:
- one config file for all instances
- one command to start all instances
- one command to update all instances

## 1) Create or edit the config

```bash
cd /root/Bzl
npm run multi:init
```

If `multi_instance/instances.json` does not exist, a template is created.

Key fields:
- `instances[].id`: stable ID for env/service naming
- `instances[].hostname`: public hostname
- `instances[].hostPort`: unique local port
- `instances[].registrationCode`: per-instance registration code

## 2) Generate compose + env outputs

```bash
cd /root/Bzl
npm run multi:init
```

Generated:
- `multi_instance/docker-compose.yml`
- `multi_instance/env/<id>.env`
- `multi_instance/DNS_CHECKLIST.md`

Optional (Cloudflare tunnel DNS automation):

```bash
npm run multi:init -- --route-dns
```

## 3) Start all configured instances

```bash
docker compose -f multi_instance/docker-compose.yml up -d --build --remove-orphans
```

## 4) Update all configured instances

```bash
cd /root/Bzl
npm run multi:update
```

Default behavior:
1. `git fetch origin`
2. `git checkout main`
3. `git pull --ff-only origin main`
4. regenerate compose/env outputs
5. `docker compose -f multi_instance/docker-compose.yml up -d --build --remove-orphans`

Useful flags:
- `--skip-git`
- `--skip-build`
- `--route-dns`
- `--dry-run`
- `--config=/path/to/instances.json`

## 5) Validate routing

```bash
curl -fsS http://127.0.0.1:<hostPort>/api/health
```

Then verify each public hostname resolves to the expected instance.

## When to use this vs fleet automation

- Use this doc (`multi:*`) if you intentionally keep all instances in one managed stack.
- Use `docs/INSTANCE_FLEET_AUTOMATION.md` if your instances are spread across independent folders/projects.
