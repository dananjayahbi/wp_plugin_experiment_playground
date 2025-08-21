@echo off
title Trans Express API Tester Server
echo ========================================
echo    Trans Express API Tester Server
echo ========================================
echo.
echo Starting server...
echo.

cd /d "%~dp0"

if exist "server.py" (
    echo Found server.py, starting Python server...
    python server.py
    if errorlevel 1 (
        echo.
        echo Python not found or failed to start.
        echo Please make sure Python is installed and in your PATH.
        echo.
        echo Alternative: Try opening index.html directly and use a CORS browser extension.
        pause
    )
) else (
    echo server.py not found!
    echo Please make sure you're running this from the api-tester folder.
    pause
)

echo.
echo Server stopped.
pause
