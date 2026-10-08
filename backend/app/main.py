from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.ai import router as ai_router
from app.routes.disease import router as disease_router
from app.routes.prediction import router as prediction_router

app = FastAPI(
    title="SGP Smart Farming Assistant API",
    version="1.0.0",
    description="Backend API for the AI-Based Smart Farming Assistant",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router, prefix="/api/ai", tags=["AI Assistant"])
app.include_router(disease_router, prefix="/api/disease", tags=["Disease Detection"])
app.include_router(prediction_router, prefix="/api/prediction", tags=["Potato Prediction"])


@app.get("/health")
def health_check():
    return {"status": "Backend is running"}


@app.get("/")
def root():
    return {"message": "SGP Smart Farming Assistant API", "version": "1.0.0"}
