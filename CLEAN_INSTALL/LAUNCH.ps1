$ErrorActionPreference = "Stop"

Write-Host "[Bzl] Launcher" -ForegroundColor Cyan

Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Missing node (Node.js 18+ required)" }

Write-Host "[Bzl] Starting (supervised)..." -ForegroundColor Yellow
node .\\scripts\\bzl-launch.js --supervised
