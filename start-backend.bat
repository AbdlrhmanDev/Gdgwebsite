@echo off
echo ========================================
echo   GDG Website - Starting Backend Server
echo ========================================
echo.

cd server

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Checking .env file...
if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Please edit server/.env and set your MongoDB URI
    echo.
    pause
)

echo.
echo Starting backend server...
echo Server will run on http://localhost:5000
echo.
call npm run dev
