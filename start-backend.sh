#!/bin/bash

echo "========================================"
echo "  GDG Website - Starting Backend Server"
echo "========================================"
echo ""

cd server

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
    echo ""
    echo "⚠️  IMPORTANT: Please edit server/.env and set your MongoDB URI"
    echo ""
    read -p "Press enter to continue..."
fi

echo ""
echo "Starting backend server..."
echo "Server will run on http://localhost:5000"
echo ""
npm run dev
