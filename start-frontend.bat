@echo off
echo ========================================
echo   GDG Website - Starting Frontend
echo ========================================
echo.

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
)

echo.
echo Starting frontend...
echo App will run on http://localhost:5173
echo.
call npm run dev
