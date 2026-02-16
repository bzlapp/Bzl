$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

Write-Host "[Bzl] Installer (PowerShell)" -ForegroundColor Cyan
Write-Host "[Bzl] This will run npm install (if needed) and a quick init wizard."

function Require-Cmd($name) {
  $cmd = Get-Command $name -ErrorAction SilentlyContinue
  if (-not $cmd) { throw "Missing required command: $name" }
}

Require-Cmd node
Require-Cmd npm.cmd

Write-Host "[Bzl] Node:" (node -v)
Write-Host "[Bzl] npm:" (npm.cmd -v)

$nodeMajor = [int]((node -p "process.versions.node.split('.')[0]" 2>$null) -join "")
if ($nodeMajor -lt 18) { throw "Node.js 18+ required. Found Node major: $nodeMajor" }

if (-not (Test-Path ".\\node_modules")) {
  Write-Host "[Bzl] Installing dependencies..." -ForegroundColor Yellow
  npm.cmd install
  if ($LASTEXITCODE -ne 0) { throw "npm install failed (exit $LASTEXITCODE)" }
}

Write-Host "[Bzl] Running init wizard..." -ForegroundColor Yellow
npm.cmd run init
if ($LASTEXITCODE -ne 0) { throw "init failed (exit $LASTEXITCODE)" }

Write-Host ""
Write-Host "[Bzl] Start now with:" -ForegroundColor Green
Write-Host "  npm.cmd start"
Write-Host ""
Write-Host "Or supervised (auto-restart):"
Write-Host "  npm.cmd run start:supervised"

Write-Host ""
Write-Host "[Bzl] Tip: For one-click launch on Windows, use INSTALL.cmd then LAUNCH.cmd." -ForegroundColor DarkGray

Write-Host ""
Read-Host "Press Enter to close"
