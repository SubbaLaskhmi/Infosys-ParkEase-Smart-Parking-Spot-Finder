@echo off
echo ========================================
echo ParkEase - Starting Application
echo ========================================
echo.

echo [1/3] Checking MongoDB...
sc query MongoDB | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo MongoDB is not running. Starting MongoDB...
    net start MongoDB
    if %errorlevel% neq 0 (
        echo ERROR: Failed to start MongoDB
        echo Please start MongoDB manually or install it from https://www.mongodb.com/try/download/community
        pause
        exit /b 1
    )
) else (
    echo MongoDB is already running ✓
)
echo.

echo [2/3] Starting Backend Server...
start "ParkEase Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
echo Backend server started ✓
echo.

echo [3/3] Starting Frontend Application...
start "ParkEase Frontend" cmd /k "npm start"
echo Frontend application started ✓
echo.

echo ========================================
echo Application Started Successfully!
echo ========================================
echo.
echo Backend API: http://localhost:5000
echo Frontend: Check the Expo window
echo.
echo Press any key to exit this window...
pause >nul
