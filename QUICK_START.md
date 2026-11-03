# 🚀 Quick Start Guide

## Option 1: Start Everything (Easiest)

```powershell
.\start-all.ps1
```

This will open both backend and frontend in separate PowerShell windows.

## Option 2: Start Manually

### Terminal 1 - Backend:
```powershell
.\start-backend.ps1
```

### Terminal 2 - Frontend:
```powershell
.\start-frontend.ps1
```

## Option 3: Manual Commands

### Backend:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend:
```powershell
cd smart-farming-assistant
npm run dev
```

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Main Application |
| Backend | http://localhost:8000 | API Server |
| API Docs | http://localhost:8000/docs | Interactive API Documentation |
| Health Check | http://localhost:8000/health | Server Status |

## ✅ What's Configured

- ✅ Supabase (Database & Auth)
- ✅ Cohere AI API
- ✅ Backend API Connection
- ✅ CORS Settings
- ✅ All Dependencies Installed

## 🎯 First Time Setup Complete!

Everything is ready to go. Just run one of the start scripts above!

## 📱 For Mobile Testing

1. Find your PC's IP address:
   ```powershell
   ipconfig
   ```

2. Update `smart-farming-assistant/.env`:
   ```
   VITE_API_BASE_URL=http://<YOUR_IP>:8000
   ```

3. Start servers with `.\start-all.ps1`

4. Access from phone: `http://<YOUR_IP>:5173`

## ⚠️ Troubleshooting

**Backend won't start?**
- Check if port 8000 is free
- Verify virtual environment is activated
- Check `.env` file exists in backend folder

**Frontend won't start?**
- Run `npm install` in smart-farming-assistant folder
- Check if port 5173 is free
- Verify `.env` file exists in frontend folder

**API calls failing?**
- Verify backend is running at http://localhost:8000
- Check browser console for errors
- Visit http://localhost:8000/health to verify backend

## 🔑 Environment Variables

All sensitive keys are already configured in:
- `backend/.env`
- `smart-farming-assistant/.env`

**Never commit these files to git!** (They're in .gitignore)

---

**Need help?** Check `SETUP.md` for detailed information.
