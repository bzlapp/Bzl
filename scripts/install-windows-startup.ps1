param(
  [string]$TaskName = "BzlService",
  [string]$ProjectDir = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$npmCmd = Join-Path $env:ProgramFiles "nodejs\npm.cmd"
if (-not (Test-Path $npmCmd)) {
  $npmCmd = "npm.cmd"
}

$command = "cd /d `"$ProjectDir`" && `"$npmCmd`" run start:supervised"
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c $command"
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1)

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings -Description "Bzl supervised service runner" -Force | Out-Null
Write-Host "Installed startup task '$TaskName'."
Write-Host "Run now: Start-ScheduledTask -TaskName '$TaskName'"
