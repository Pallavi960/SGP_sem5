# Smart Farming Assistant - Setup Guide

## ✅ Configuration Complete

Your environment files have been created with your credentials:

### Frontend (.env)
- Location: `smart-farming-assistant/.env`
- Supabase URL: `https://sklzfvyptoxpbmtkkwoz.supabase.co`
- Backend API: `http://localhost:8000`

### Backend (.env)
- Location: `backend/.env`
- Supabase configured
- Cohere API Key configured

## 🚀 Quick Start

### 1. Start the Backend Server

```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: http://localhost:8000
API docs will be at: http://localhost:8000/docs

### 2. Start the Frontend (in a new terminal)

```powershell
cd smart-farming-assistant
npm run dev
```

The frontend will be available at: http://localhost:5173

## 📱 Testing on Mobile Device (Same WiFi)

### Find Your PC IP Address:
```powershell
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter (e.g., 192.168.1.100)

### Update Frontend .env:
Replace `VITE_API_BASE_URL=http://localhost:8000` with:
```
VITE_API_BASE_URL=http://<YOUR_PC_IP>:8000
```

### Start Backend with External Access:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Access from Phone:
Open browser on your phone and navigate to: `http://<YOUR_PC_IP>:5173`

## 🛠️ Troubleshooting

### Backend Issues

**Port Already in Use:**
```powershell
# Use a different port
uvicorn app.main:app --reload --port 8001
```
Then update `VITE_API_BASE_URL` in frontend `.env` to match.

**Module Import Errors:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Frontend Issues

**Dependencies Not Installed:**
```powershell
cd smart-farming-assistant
npm install
```

**Port 5173 in Use:**
Vite will automatically try the next available port (5174, 5175, etc.)

### CORS Issues
If you get CORS errors, make sure the backend `main.py` includes your frontend URL in `allow_origins`.

## 🔑 API Keys

Your configuration includes:
- ✅ Supabase URL and Key
- ✅ Cohere API Key
- ✅ Backend API URL

## 📋 Project Structure

```
sgp_project/
├── backend/               # FastAPI Backend
│   ├── app/
│   │   ├── main.py       # Main application entry
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   └── core/         # Config & utilities
│   ├── .env              # Backend environment variables ✅
│   └── requirements.txt  # Python dependencies
│
└── smart-farming-assistant/  # React + Vite Frontend
    ├── src/
    │   ├── components/   # React components
    │   ├── pages/        # Page components
    │   └── services/     # API services
    ├── .env              # Frontend environment variables ✅
    └── package.json      # Node dependencies
```

## ✨ Features Available

1. **Disease Detection** - Upload crop images for disease identification
2. **AI Assistant** - Chat with AI for farming advice
3. **Weather Information** - Real-time weather data
4. **Government Schemes** - Access to farming schemes
5. **Fertilizer Advisor** - Get fertilizer recommendations
6. **Crop Recommendations** - Soil-based crop suggestions
7. **Farm Planner** - Plan your farming activities

## 🔒 Authentication

The app uses Supabase authentication with phone/OTP verification.

## 📞 Support

If you encounter any issues:
1. Check that both backend and frontend are running
2. Verify your .env files have the correct values
3. Check the browser console for errors
4. Check the backend terminal for errors

---

**Status**: ✅ Ready to run!
