@echo off
title Undangan Digital - Stopping All Services
color 0C

echo ================================================
echo   UNDANGTEMAN.ID - Stopping All Services
echo ================================================
echo.

echo [1/4] Stopping MySQL...
taskkill /F /IM mysqld.exe >nul 2>&1
echo     Done.

echo [2/4] Stopping Backend Laravel (php)...
taskkill /F /IM php.exe >nul 2>&1
echo     Done.

echo [3/4] Stopping Portal + Theme Sakura (node/vite)...
taskkill /F /IM node.exe >nul 2>&1
echo     Done.

echo [4/4] Cleaning up...
taskkill /F /IM cmd.exe /FI "WINDOWTITLE eq Backend Laravel :8000" >nul 2>&1
taskkill /F /IM cmd.exe /FI "WINDOWTITLE eq Portal Frontend :5173" >nul 2>&1
taskkill /F /IM cmd.exe /FI "WINDOWTITLE eq Theme Sakura :5174" >nul 2>&1
echo     Done.

echo.
echo ================================================
echo   Semua service berhasil dihentikan.
echo ================================================
echo.
pause
