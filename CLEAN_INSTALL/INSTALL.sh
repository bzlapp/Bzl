#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[Bzl] Installer (bash)"
command -v node >/dev/null 2>&1 || { echo "Missing node (Node.js 18+ required)"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Missing npm"; exit 1; }

echo "[Bzl] Node: $(node -v)"
echo "[Bzl] npm:  $(npm -v)"

if [ ! -d "./node_modules" ]; then
  echo "[Bzl] Installing dependencies..."
  npm install
fi

echo "[Bzl] Running init wizard..."
npm run init

echo ""
echo "[Bzl] Start now with:"
echo "  npm start"
echo ""
echo "Or supervised (auto-restart):"
echo "  npm run start:supervised"
