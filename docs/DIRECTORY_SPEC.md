# Directory plugins (draft)

Goal: make `chat.bzl.one` (or any chosen “directory instance”) show a list of other Bzl instances + links, without requiring account crossover.

This spec intentionally splits responsibilities:
- **`directory-server`** (install only on the directory instance) receives announcements and serves a directory feed.
- **`directory-publisher`** (install on any instance that wants to be listed) announces its instance info to the directory.

## Trust + safety model

Directory listings are a spam magnet unless you add a trust gate.

Baseline (simple + good enough for MVP):
- Directory has a **shared secret** (`token`) required for announcements.
- Publishers include the token as `Authorization: Bearer <token>` (or `X-Bzl-Directory-Token`).
- Directory can still **hide/block** entries via in-plugin config (manual moderation).

Future upgrade (better):
- Per-instance tokens issued by the directory (claim flow).
- Optional “verified domain” proof (e.g. DNS TXT, or hosting a token at `/.well-known/...`).

## Data model

### Announcement payload (publisher → directory)

`POST /api/plugins/directory-server/announce`

```json
{
  "instance": {
    "id": "temple",
    "url": "https://temple.azakaela.com",
    "name": "Temple",
    "description": "Cozy small-town chat",
    "bzlVersion": "0.1.0",
    "requiresRegistrationCode": false
  },
  "publicHives": [
    {
      "title": "Announcements",
      "url": "https://temple.azakaela.com/#/hive/announcements",
      "description": "What’s new",
      "tags": ["news"]
    }
  ]
}
```

Notes:
- `instance.id` is stable, unique within the directory.
- `publicHives` is **opt-in**. Default should be empty.

### Directory entry (stored by directory)

```json
{
  "instance": { "...": "..." },
  "publicHives": [ "..."],
  "lastSeenAt": 1700000000000
}
```

## Endpoints (directory-server)

- `POST /api/plugins/directory-server/announce`
  - Auth: `Authorization: Bearer <token>` OR `X-Bzl-Directory-Token: <token>`
  - Stores/updates the entry and updates `lastSeenAt`.

- `GET /api/plugins/directory-server/list`
  - Public JSON feed consumed by:
    - the directory UI (in-app plugin UI), and/or
    - external tooling.

## UX (directory instance)

Minimum viable UX:
- A “Directory” view that’s optionally shown first.
- Each entry shows: name, description, URL, “last seen”.
- Optional “Public hives” collapsible list under each entry.
- Owner controls:
  - Set token
  - Hide entry
  - Block hostname/instance id

## Publisher behavior

Publisher plugin should support:
- “Publish now” button (owner only)
- Auto-publish heartbeat every N minutes (default 10–30m)
- Local config:
  - directory URL
  - token
  - instance metadata (name/description/url)
  - list of public hive links

