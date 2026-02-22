# Updating a Live Bzl Server

This is the standard update flow when Bzl is running from a git checkout + Docker Compose on your host.

## Single instance update (quick path)

```bash
cd ~/Bzl
git status
git checkout main
git fetch origin
git pull --ff-only origin main
docker compose up -d --build --remove-orphans
```

## Update every detected Bzl instance on the host

Use this when you have multiple instance folders (for example `/root/Bzl`, `/opt/bzl-tawky`, `/opt/bzl-unianetwork`).

```bash
cd /root/Bzl
npm ci --omit=dev

# preview only
npm run instances:update -- --roots=/root,/srv,/opt,/home --max-depth=7 --dry-run

# execute
npm run instances:update -- --roots=/root,/srv,/opt,/home --max-depth=7
```

The updater runs per instance:
1. `git fetch`
2. `git checkout main`
3. `git pull --ff-only origin main`
4. `docker compose up -d --build --remove-orphans`

## Restart all detected instances (no pull, no rebuild)

Use this if you only changed env values or need a service restart.

```bash
cd /root/Bzl
npm run instances:update -- --roots=/root,/srv,/opt,/home --max-depth=7 --skip-git --skip-build
```

## Common failures

- `fatal: not a git repository`: you are in the wrong folder. `cd` into the repo root first.
- `npm: command not found`: install Node.js/npm on the host, then retry.
- `Target path is not empty` during `instance:create`: use an empty folder, or create manually in an existing clone.

## Validation checklist

```bash
docker ps
curl -fsS http://127.0.0.1:<PORT>/api/health
docker logs --tail 80 <container-name>
```

Replace `<PORT>` and `<container-name>` per instance.

## Related docs

- `docs/INSTANCE_FLEET_AUTOMATION.md`
- `docs/MULTI_INSTANCE_DOCKER.md`
- `docs/DIGITALOCEAN_DEPLOYMENT_AND_COST.md`
