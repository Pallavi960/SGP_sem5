"""
FastAPI router for the Potato Leaf Disease Prediction feature.
Endpoint: POST /api/prediction/predict
"""

import base64
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
from typing import Optional

from ..services.potato_prediction import predict_potato, CLASS_NAMES, CLASS_INFO

router = APIRouter()


class Base64PredictRequest(BaseModel):
    image_base64: str


@router.post("/predict")
async def predict_potato_disease(
    file: Optional[UploadFile] = File(None),
    image_base64: Optional[str] = Form(None),
):
    """
    Classify a potato leaf image as Early Blight / Healthy / Late Blight.
    Accepts multipart file upload OR base64 string (with or without data-URL prefix).
    """
    try:
        image_bytes: Optional[bytes] = None

        if file and file.filename:
            image_bytes = await file.read()
        elif image_base64:
            raw = image_base64
            if "," in raw:
                raw = raw.split(",", 1)[1]
            image_bytes = base64.b64decode(raw)
        else:
            raise HTTPException(
                status_code=400,
                detail="Provide an image file or base64 string.",
            )

        if not image_bytes or len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded image is empty.")

        return predict_potato(image_bytes)

    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(exc)}")


@router.post("/predict-base64")
async def predict_potato_json(req: Base64PredictRequest):
    """JSON body endpoint for base64-encoded potato leaf images."""
    try:
        raw = req.image_base64
        if "," in raw:
            raw = raw.split(",", 1)[1]
        image_bytes = base64.b64decode(raw)
        return predict_potato(image_bytes)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(exc)}")


@router.get("/classes")
def get_classes():
    """List all supported classes and their details."""
    return {
        "classes": CLASS_NAMES,
        "details": CLASS_INFO,
        "model": "MobileNetV2 (128×128, trained on PlantVillage potato subset)",
    }
