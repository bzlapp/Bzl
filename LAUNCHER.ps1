$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "[Bzl] Launcher UI (dev)" -ForegroundColor Cyan
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Missing node. Node.js 18+ required." }

$nodeMajor = [int]((node -p "process.versions.node.split('.')[0]" 2>$null) -join "")
if ($nodeMajor -lt 18) { throw "Node.js 18+ required. Found Node major: $nodeMajor" }

$uiPort = $env:BZL_LAUNCHER_PORT
if (-not $uiPort) { $uiPort = 8787 }
$url = "http://127.0.0.1:$uiPort/"

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

