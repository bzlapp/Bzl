#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[Bzl] Launcher (Cloudflare quick tunnel)"
command -v node >/dev/null 2>&1 || { echo "Missing node (Node.js 18+ required)"; exit 1; }
command -v cloudflared >/dev/null 2>&1 || { echo "Missing cloudflared (try: winget install Cloudflare.cloudflared)"; exit 1; }

echo "[Bzl] Starting (supervised) + cloudflared quick tunnel..."
node ./scripts/bzl-launch.js --supervised --cloudflared=quick
