# Updating a Live Bzl Server (Git + Docker)

This doc is for a typical droplet setup where you:
- have the `bzlapp/Bzl` repo checked out on the server (example: `~/Bzl`)
- run Bzl via Docker / Docker Compose using that checkout (builds the image from the local Dockerfile)

If you’re not sure which setup you have, run `docker ps` and see whether Bzl is running as a container.

---

## The “golden” update flow (Compose + local build)

From the droplet host (not inside the container):

```bash
cd ~/Bzl

# 1) make sure you're on the right branch and clean
git status
git checkout main

# 2) pull latest code
git fetch origin
git pull --ff-only origin main

# 3) rebuild + recreate container(s)
docker compose up -d --build
```

That’s it.

### Why this order matters
- If you rebuild before pulling, you rebuild the *old* code.
- A `git pull` does **not** update a running container unless you rebuild/recreate it (or you’re bind-mounting the code into the container).

---

## Restart only (no code update)

```bash
docker compose restart
```

Or, if you run a single container named `bzl`:

```bash
docker restart bzl
```

---

## Common git mistake (your screenshot)

If you run:

```bash
git pull main
```

Git interprets `main` as a *remote name* (not a branch), and you’ll get:
`fatal: 'main' does not appear to be a git repository`

Use this instead:

```bash
git pull --ff-only origin main
```

Quick sanity checks:

```bash
git remote -v
git branch --show-current
git log -1 --oneline
```

---

## If you have local changes on the droplet

If `git status` shows modified files, decide whether you want to keep them.

To throw away local changes and match GitHub exactly:

```bash
git fetch origin
git reset --hard origin/main
```

Then rebuild:

```bash
docker compose up -d --build
```

---

## Confirm you’re actually updated

After updating/restarting:

```bash
docker ps
docker logs --tail 80 bzl
```

In the UI, the Moderation → Server panel should reflect the latest version string.

If the UI still looks unchanged, hard-refresh your browser:
- Chrome/Edge: `Ctrl+Shift+R`

---

## Next step (recommended): in-app core updates

For “Clean Install” desktop setups, the Launcher UI can already do opt-in updates via GitHub Releases.

For live servers, we can add a similar admin-only “Update core” flow (pull + rebuild + restart) later, but it needs extra safety:
- confirmation prompts + backup
- clear logs of what changed
- no “surprise” updates

