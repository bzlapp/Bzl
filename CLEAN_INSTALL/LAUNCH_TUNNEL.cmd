@echo off
setlocal
pushd "%~dp0"
echo [Bzl] Launcher (Cloudflare quick tunnel)
where node >nul 2>nul
if errorlevel 1 (
  echo Missing node. Node.js 18+ required.
  echo.
  pause
  popd
  exit /b 1
)
where cloudflared >nul 2>nul
if errorlevel 1 (
  echo Missing cloudflared. Install it first. Windows: winget install Cloudflare.cloudflared
  echo.
  pause
  popd
  exit /b 1
)
echo [Bzl] Starting (supervised) + cloudflared quick tunnel...
echo cloudflared will print a public URL in this window.
node .\scripts\bzl-launch.js --supervised --cloudflared=quick --log=bzl-launch-tunnel.log
set code=%ERRORLEVEL%
if not "%code%"=="0" (
  echo.
  echo [Bzl] Launcher exited (code %code%).
  echo Logs: %~dp0bzl-launch-tunnel.log
  pause
  popd
  exit /b %code%
)
popd
endlocal
