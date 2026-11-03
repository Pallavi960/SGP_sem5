#!/usr/bin/env pwsh
# Start Both Backend and Frontend Servers

Write-Host "🚀 Starting Smart Farming Assistant (Full Stack)..." -ForegroundColor Green
Write-Host ""

# Start Backend in new window
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-File", "$PSScriptRoot\start-backend.ps1"

# Wait a bit for backend to initialize
Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-File", "$PSScriptRoot\start-frontend.ps1"

Write-Host ""
Write-Host "✅ Both servers are starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Close the server windows to stop them." -ForegroundColor Yellow
