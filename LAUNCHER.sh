#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[Bzl] Launcher UI (dev)"
command -v node >/dev/null 2>&1 || { echo "Missing node. Node.js 18+ required."; exit 1; }

UI_PORT="${BZL_LAUNCHER_PORT:-8787}"
URL="http://127.0.0.1:${UI_PORT}/"

echo "[Bzl] UI URL: ${URL}"
echo "[Bzl] Starting local UI..."
node ./scripts/launcher-ui.js

