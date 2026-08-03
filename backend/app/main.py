from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.schemes import router as schemes_router

app = FastAPI(
    title="SGP Smart Farming Assistant API",
    version="1.0.0",
    description="Backend API for the AI-Based Smart Farming Assistant",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(schemes_router, prefix="/api/schemes")


@app.get("/health")
def health_check():
    return {"status": "Backend is running"}


@app.get("/")
def root():
    return {"message": "SGP Smart Farming Assistant API", "version": "1.0.0"}
