@echo off
setlocal
pushd "%~dp0"
echo [Bzl] Installer (Windows)
echo.
echo This window will stay open so you can see any errors.

where powershell >nul 2>nul
if errorlevel 1 (
  echo Missing PowerShell.
  echo.
  pause
  exit /b 1
)

REM Run the PowerShell installer with an execution-policy bypass so double-click works on most systems.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0INSTALL.ps1"
set code=%ERRORLEVEL%
if not "%code%"=="0" (
  echo [Bzl] Installer failed (exit %code%).
  echo.
  pause
  exit /b %code%
)

echo.
echo [Bzl] Install finished.
choice /c YN /n /m "Launch Bzl now? (Y/N) "
if errorlevel 2 goto end
call "%~dp0LAUNCH.cmd"

:end
echo.
pause
popd
endlocal
