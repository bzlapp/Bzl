# Stream Pack (optional, dedicated servers)

Bzl core is designed to run without any domain name. **Streaming** (game/screen share + voice) is different: it needs a real-time media server and **HTTPS**.

This repo ships an **optional “Stream Pack”** that you can install on dedicated servers. It runs:
- **LiveKit** (SFU) for scalable WebRTC (one streamer, many viewers)
- **coturn** for NAT traversal reliability

Core Bzl remains unchanged: if you don’t install Stream Pack, everything still works (just no streaming).

## Quick start

1. Decide a hostname for streaming (example): `stream.yourdomain.com`
2. Create DNS A record to your server (set to **DNS-only**, not proxied).
3. Generate the pack:

```bash
node scripts/stream-pack-init.js --domain=stream.yourdomain.com --email=you@yourdomain.com
```

4. Edit `stream_pack/.env` and set `TURN_EXTERNAL_IP` to your public server IP.
5. Add `stream_pack/Caddyfile.snippet` to your Caddy config and reload.
6. Open firewall ports listed in `stream_pack/README.md`.
7. Start it:

```bash
cd stream_pack
docker compose up -d
```

## Notes
- The Stream Pack is infrastructure only. The actual “stream as a post” UX will be implemented as a plugin that mints LiveKit tokens from the Bzl server.

