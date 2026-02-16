@echo off
setlocal
pushd "%~dp0"
echo [Bzl] Launcher UI
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
set "UI_PORT=%BZL_LAUNCHER_PORT%"
if "%UI_PORT%"=="" set "UI_PORT=8787"
set "URL=http://127.0.0.1:%UI_PORT%/"
echo [Bzl] Starting local UI...
echo It should open in your browser automatically.
echo If it doesn't, open: %URL%
echo.
rem Open in the background (node keeps this console busy).
start "" cmd /c "timeout /t 2 /nobreak >nul & start \"\" \"%URL%\""
node .\scripts\launcher-ui.js
set code=%ERRORLEVEL%
if not "%code%"=="0" (
  echo.
  echo [Bzl] UI exited (code %code%).
  echo If it closed immediately, check: %~dp0launcher-ui.crash.log
  pause
)
popd
endlocal
