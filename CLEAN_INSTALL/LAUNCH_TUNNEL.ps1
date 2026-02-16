$ErrorActionPreference = "Stop"

Write-Host "[Bzl] Launcher (Cloudflare quick tunnel)" -ForegroundColor Cyan

Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Missing node (Node.js 18+ required)" }
if (-not (Get-Command cloudflared -ErrorAction SilentlyContinue)) {
  throw "Missing cloudflared. Install it first (Windows: winget install Cloudflare.cloudflared)"
}

Write-Host "[Bzl] Starting (supervised) + cloudflared quick tunnel..." -ForegroundColor Yellow
node .\\scripts\\bzl-launch.js --supervised --cloudflared=quick
