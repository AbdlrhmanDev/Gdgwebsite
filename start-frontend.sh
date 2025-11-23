#!/bin/bash

echo "========================================"
echo "  GDG Website - Starting Frontend"
echo "========================================"
echo ""

echo "Checking if dependencies are installed..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "Checking .env file..."
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

echo ""
echo "Starting frontend..."
echo "App will run on http://localhost:5173"
echo ""
npm run dev
