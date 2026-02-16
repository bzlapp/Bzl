@echo off
setlocal
pushd "%~dp0"
echo [Bzl] Launcher
where node >nul 2>nul
if errorlevel 1 (
  echo Missing node. Node.js 18+ required.
  echo.
  pause
  popd
  exit /b 1
)
for /f %%v in ('node -p "process.versions.node"') do set "NODEVER=%%v"
for /f "tokens=1 delims=." %%a in ("%NODEVER%") do set "NODEMAJOR=%%a"
if %NODEMAJOR% LSS 18 (
  echo Node.js 18+ required. Found: v%NODEVER%
  echo Please update Node.js, then try again.
  echo.
  pause
  popd
  exit /b 1
)
echo [Bzl] Starting (supervised)...
node .\scripts\bzl-launch.js --supervised --log=bzl-launch.log
set code=%ERRORLEVEL%
if not "%code%"=="0" (
  echo.
  echo [Bzl] Launcher exited (code %code%).
  echo Logs: %~dp0bzl-launch.log
  pause
  popd
  exit /b %code%
)
popd
endlocal
