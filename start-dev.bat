@echo off
:: start-dev.bat – always launch Expo in offline/localhost mode to avoid the
:: "Failed to download remote update" error when the PC has no internet access.
echo Killing existing Node processes...
taskkill /f /im node.exe 2>nul
timeout /t 1 /nobreak >nul

echo Starting Expo (offline + localhost)...
adb reverse tcp:8081 tcp:8081
set EXPO_OFFLINE=1
npx expo start --localhost %*
