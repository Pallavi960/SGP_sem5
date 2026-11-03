#!/usr/bin/env pwsh
# Start Backend Server Script

Write-Host "🚀 Starting Smart Farming Assistant Backend..." -ForegroundColor Green
Write-Host ""

# Navigate to backend directory
Set-Location -Path "$PSScriptRoot\backend"

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"

# Start server
Write-Host ""
Write-Host "Starting FastAPI server..." -ForegroundColor Yellow
Write-Host "Backend will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "API Documentation: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
