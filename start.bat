@echo off
title Undangan Digital - Starting All Services
color 0A

echo ================================================
echo   UNDANGTEMAN.ID - Starting All Services
echo ================================================
echo.

:: ---- 1. MySQL ----
echo [1/5] Starting MySQL (port 3306)...
start "MySQL Server" /MIN "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --defaults-file="C:\Users\admin\mysql-data\my.ini" --console
echo     Waiting for MySQL to be ready (5s)...
timeout /t 5 /nobreak >nul

:: ---- 2. Backend Laravel ----
echo [2/5] Starting Backend - Laravel (port 8000)...
start "Backend Laravel :8000" /MIN cmd /c "cd /d "%~dp0backend" && php artisan serve --port=8000"
echo     Waiting for Laravel (4s)...
timeout /t 4 /nobreak >nul

:: ---- 3. Portal Frontend ----
echo [3/5] Starting Portal Frontend (port 5173)...
start "Portal Frontend :5173" /MIN cmd /c "cd /d "%~dp0frontend" && npx vite --port=5173 --strictPort"
echo     Waiting for Portal (4s)...
timeout /t 4 /nobreak >nul

:: ---- 4. Tema Sakura ----
echo [4/5] Starting Theme Sakura (port 5174)...
start "Theme Sakura :5174" /MIN cmd /c "cd /d "%~dp0themes\sakura" && npx vite --port=5174 --strictPort"
echo     Waiting for Sakura Theme (3s)...
timeout /t 3 /nobreak >nul

echo.
echo ================================================
echo   SEMUA SERVICE SUDAH BERJALAN
echo.
echo   [1] MySQL         : port 3306
echo   [2] Backend API   : http://localhost:8000
echo   [3] Portal        : http://localhost:5173
echo   [4] Tema Sakura   : http://localhost:5174
echo.
echo   LINK PENTING:
echo   Portal Katalog    : http://localhost:5173
echo   Edit Undangan     : http://localhost:5173  (login dulu)
echo   Preview Sakura    : http://localhost:5174/preview
echo   Undangan Demo     : http://localhost:5174/u/sakura-demo
echo   API Health Check  : http://localhost:8000/api/health
echo ================================================
echo.

:: ---- 5. Buka browser ----
echo [5/5] Opening browser...
timeout /t 2 /nobreak >nul
start "" "http://localhost:5173"

echo.
echo Tekan tombol apa saja untuk menutup jendela ini.
echo (Semua service tetap berjalan di background)
pause >nul
