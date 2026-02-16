$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "[Bzl] Launcher UI" -ForegroundColor Cyan
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Missing node (Node.js 18+ required)" }

$port = $env:BZL_LAUNCHER_PORT
if (-not $port) { $port = 8787 }
$url = "http://127.0.0.1:$port/"

Write-Host "[Bzl] Starting local UI..." -ForegroundColor Yellow
Write-Host "[Bzl] UI URL: $url" -ForegroundColor DarkGray

# Open in the background (node keeps this console busy).
$urlEsc = $url.Replace("'", "''")
Start-Process -WindowStyle Hidden -FilePath "powershell.exe" -ArgumentList @(
  "-NoProfile",
  "-Command",
  "Start-Sleep -Seconds 2; Start-Process '$urlEsc'"
) | Out-Null

node .\\scripts\\launcher-ui.js

if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "[Bzl] Launcher UI exited (code $LASTEXITCODE)." -ForegroundColor Red
  Write-Host "[Bzl] If it closed immediately, check: $PSScriptRoot\\launcher-ui.crash.log" -ForegroundColor DarkGray
  Read-Host "Press Enter to close"
}
