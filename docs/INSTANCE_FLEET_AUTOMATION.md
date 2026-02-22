# Instance Fleet Automation (Detect, Create, Update, Restart)

Use this when you run several Bzl repos on one server and want one workflow for all of them.

## 1) Detect Bzl instances

```bash
cd /root/Bzl
npm run instances:scan -- --roots=/root,/srv,/opt,/home --max-depth=7
```

Detection sources:
- Filesystem scan for compose projects and Bzl source markers
- Docker labels (`com.docker.compose.project.working_dir`) so compose-only folders can still be found

Supported compose filenames:
- `compose.yaml`
- `compose.yml`
- `docker-compose.yml`
- `docker-compose.yaml`

## 2) Create a new instance folder

```bash
cd /root/Bzl
npm run instance:create -- --path=/opt/bzl-new --port=3405 --registration-code='replace-me' --hostname=new.example.com
```

What this does:
- Clones `https://github.com/bzlapp/Bzl.git` (`main`) into `--path`
- Writes `.env` with `PORT`, `HOST`, and `REGISTRATION_CODE`
- Starts Docker Compose unless `--no-start` is used

Important:
- `--path` must be empty
- `--port` must be unique per instance

Useful flags:
- `--repo=...`
- `--branch=...`
- `--no-start`
- `--dry-run`

## 3) Update all instances to latest `main`

```bash
cd /root/Bzl
npm run instances:update -- --roots=/root,/srv,/opt,/home --max-depth=7 --dry-run
npm run instances:update -- --roots=/root,/srv,/opt,/home --max-depth=7
```

Useful flags:
- `--skip-git` (restart/recreate only)
- `--skip-build` (skip image build)
- `--branch=main`
- `--remote=origin`
- `--dry-run`

## 4) Restart all instances (fast path)

```bash
cd /root/Bzl
npm run instances:update -- --roots=/root,/srv,/opt,/home --max-depth=7 --skip-git --skip-build
```

## 5) Verify each instance

```bash
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
curl -fsS http://127.0.0.1:<port>/api/health
```

## DNS + reverse proxy reminder

For each hostname:
1. DNS `A` record points to the server IP
2. Caddy routes hostname to the instance port
3. Public HTTPS URL returns app + `/api/health`

See also: `docs/DIGITALOCEAN_DEPLOYMENT_AND_COST.md`
