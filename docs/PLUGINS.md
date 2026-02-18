# Bzl Plugins (MVP)

This is the **minimal plugin system** used to ship optional features without forking the core app.

Plugins are **trusted code**: the owner installs them, and they can run both client-side and server-side logic.

## Install / manage (Owner UI)

1. Sign in as the `owner`.
2. Open the **Instance** panel in the left sidebar.
3. Under **Plugins**:
   - Upload a plugin `.zip` (must contain a `plugin.json` manifest).
   - Toggle **Enabled** to activate it.
   - Use **Uninstall** to remove it from disk.

Notes:
- Enabling/disabling a plugin may require a refresh for all connected clients (depends on what the plugin does).

### Dev: build the included example plugin zips
This repo includes starter plugins and zip builders:
- Maps: `plugins_dev/maps/`
  - Build: `node scripts/build-maps-plugin.js`
  - Upload: `dist/plugins/maps.zip`
- Library: `plugins_dev/library/`
  - Build: `node scripts/build-library-plugin.js`
  - Upload: `dist/plugins/library.zip`
- Directory Server (draft): `plugins_dev/directory-server/`
  - Build: `node scripts/build-directory-server-plugin.js`
  - Upload: `dist/plugins/directory-server.zip`
- Directory Publisher (draft): `plugins_dev/directory-publisher/`
  - Build: `node scripts/build-directory-publisher-plugin.js`
  - Upload: `dist/plugins/directory-publisher.zip`

## Where plugins live on disk

- Installed plugins are stored at: `data/plugins/<pluginId>/`
- Each plugin folder must contain: `plugin.json`

## `plugin.json` manifest

Required:
- `id`: `^[a-z0-9][a-z0-9_.-]{0,31}$`
- `name`
- `version`

Optional:
- `description`
- `entryClient`: path to a client JS file within the plugin folder
- `entryServer`: path to a server JS file within the plugin folder
- `permissions`: string labels shown in the UI (informational)

Example:
```json
{
  "id": "polls",
  "name": "Polls",
  "version": "0.1.0",
  "description": "Adds simple polls to hives.",
  "entryClient": "client.js",
  "entryServer": "server.js",
  "permissions": ["ui", "ws"]
}
```

## Zip format

The `.zip` you upload must include `plugin.json` either:
- at the zip root, or
- inside a single top-level folder

After extraction, the server installs it into `data/plugins/<id>/`.

## Client plugin API

If your plugin has `entryClient`, it is loaded from:
- `/plugins/<id>/<entryClient>`

### UI panels (draft)

Some plugins are primarily UI. We’re planning a UI “rack layout” where plugins (and core features) register **dockable panels** instead of directly manipulating core DOM.

See: `docs/UI_RACK_LAYOUT.md` (draft).

Client plugins can register via:
```js
window.BzlPluginHost.register("polls", (ctx) => {
  ctx.toast("Polls", "Plugin loaded!");

  // Send a plugin WS message to the server:
  ctx.send("ping", { hello: true });
});
```

`ctx` provides:
- `ctx.id`
- `ctx.toast(title, body)`
- `ctx.getUser()` / `ctx.getRole()`
- `ctx.ui.registerPanel(panelDef)` (experimental; only active when the core rack layout is enabled)
- `ctx.send(eventName, payload)` -> sends `{ type: "plugin:<id>:<eventName>", ...payload }`
- `ctx.devLog(level, message, data)` -> writes to the in-app dev log (Moderation -> Log -> Server dev log)

### `ctx.ui.registerPanel(panelDef)` (experimental)

This registers a dockable UI panel for your plugin under the rack layout system.

Notes:
- This is currently **experimental** and only works when the user has enabled the rack layout UI.
- If rack layout is disabled, your plugin should still work using the existing DOM integration patterns.

Example:
```js
window.BzlPluginHost.register("hello", (ctx) => {
  ctx.ui?.registerPanel?.({
    id: "hello",
    title: "Hello",
    icon: "👋",
    defaultRack: "right", // or "main"
    role: "aux", // "primary" | "aux" | "transient" | "utility"
    presetHints: {
      discordLike: { place: "docked.bottom" }
    },
    render(mount, api) {
      mount.innerHTML = "<div class='small'>Hello from a plugin panel.</div>";
    }
  });
});
```

## Server plugin API

If your plugin has `entryServer`, it must export a function:
```js
module.exports = function init(api) {
  api.registerWs("ping", (ws, msg) => {
    api.broadcast({ type: "plugin:polls:pong", at: api.now() });
  });
};
```

`api` provides:
- `api.id`
- `api.now()`
- `api.log(level, message, data)`
- `api.registerWs(eventName, handler)`
- `api.registerHttp(method, routePath, handler)`
- `api.broadcast(message)` (must have `type` prefixed with `plugin:<id>:`)

Server handlers are invoked when the client sends:
- `type: "plugin:<id>:<eventName>"`

### Plugin HTTP routes (draft)

Server plugins can optionally register same-origin HTTP endpoints under:
- `/api/plugins/<pluginId>/<routePath>`

Example:
```js
module.exports = function init(api) {
  api.registerHttp("GET", "/list", (req, res, ctx) => {
    ctx.sendJson(200, { ok: true, items: [] });
  });
};
```

The `handler` receives `(req, res, ctx)` where `ctx` provides:
- `ctx.readJsonBody({ maxBytes })` (async)
- `ctx.sendJson(status, body)`

## Security warning

Plugins run as code on your server and in every client browser.
- Only install plugins you trust.
- Treat plugins like installing an app, not a theme.
