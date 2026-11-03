#!/usr/bin/env pwsh
# Start Frontend Development Server Script

Write-Host "🚀 Starting Smart Farming Assistant Frontend..." -ForegroundColor Green
Write-Host ""

# Navigate to frontend directory
Set-Location -Path "$PSScriptRoot\smart-farming-assistant"

# Start development server
Write-Host "Starting Vite development server..." -ForegroundColor Yellow
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

npm run dev
