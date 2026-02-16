#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[Bzl] Launcher"
command -v node >/dev/null 2>&1 || { echo "Missing node (Node.js 18+ required)"; exit 1; }

echo "[Bzl] Starting (supervised)..."
node ./scripts/bzl-launch.js --supervised
