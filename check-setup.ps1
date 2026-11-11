#!/usr/bin/env pwsh
# Setup Verification Script

Write-Host "🔍 Checking Smart Farming Assistant Setup..." -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Python
Write-Host "Checking Python..." -NoNewline
try {
    $pythonVersion = python --version 2>&1
    Write-Host " ✅ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host " ❌ Python not found" -ForegroundColor Red
    $allGood = $false
}

# Check Node
Write-Host "Checking Node.js..." -NoNewline
try {
    $nodeVersion = node --version 2>&1
    Write-Host " ✅ v$nodeVersion" -ForegroundColor Green
} catch {
    Write-Host " ❌ Node.js not found" -ForegroundColor Red
    $allGood = $false
}

# Check Backend Virtual Environment
Write-Host "Checking Backend venv..." -NoNewline
if (Test-Path ".\backend\venv\Scripts\python.exe") {
    Write-Host " ✅ Virtual environment exists" -ForegroundColor Green
} else {
    Write-Host " ❌ Virtual environment not found" -ForegroundColor Red
    $allGood = $false
}

# Check Backend .env
Write-Host "Checking Backend .env..." -NoNewline
if (Test-Path ".\backend\.env") {
    Write-Host " ✅ Environment file exists" -ForegroundColor Green
} else {
    Write-Host " ❌ Environment file missing" -ForegroundColor Red
    $allGood = $false
}

# Check Frontend .env
Write-Host "Checking Frontend .env..." -NoNewline
if (Test-Path ".\smart-farming-assistant\.env") {
    Write-Host " ✅ Environment file exists" -ForegroundColor Green
} else {
    Write-Host " ❌ Environment file missing" -ForegroundColor Red
    $allGood = $false
}

# Check Frontend node_modules
Write-Host "Checking Frontend dependencies..." -NoNewline
if (Test-Path ".\smart-farming-assistant\node_modules") {
    Write-Host " ✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host " ❌ Dependencies not installed" -ForegroundColor Red
    $allGood = $false
}

# Check Backend dependencies
Write-Host "Checking Backend dependencies..." -NoNewline
if (Test-Path ".\backend\venv\Lib\site-packages\fastapi") {
    Write-Host " ✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host " ❌ Dependencies not installed" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

if ($allGood) {
    Write-Host ""
    Write-Host "✅ All checks passed! Your setup is ready." -ForegroundColor Green
    Write-Host ""
    Write-Host "Run .\start-all.ps1 to start both servers!" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "⚠️  Some issues found. Please review above." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To fix:" -ForegroundColor Yellow
    Write-Host "  1. Backend dependencies: cd backend; .\venv\Scripts\Activate.ps1; pip install -r requirements.txt" -ForegroundColor White
    Write-Host "  2. Frontend dependencies: cd smart-farming-assistant; npm install" -ForegroundColor White
    Write-Host ""
}
