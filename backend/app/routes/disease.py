import base64
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from ..services.disease_detection import (
    predict_disease,
    CLASS_INFO,
    CLASS_NAMES
)

router = APIRouter()


class Base64DetectRequest(BaseModel):
    image_base64: str


@router.post("/detect")
async def detect_leaf_disease(
    file: Optional[UploadFile] = File(None),
    image_base64: Optional[str] = Form(None)
):
    """
    Accepts leaf photo either as file upload or base64 data string,
    runs the disease detection pipeline and returns diagnosis, remedies and confidence scores.
    """
    try:
        image_bytes: Optional[bytes] = None
        
        if file and file.filename:
            image_bytes = await file.read()
        elif image_base64:
            # Strip data URL prefix if present
            raw_base64 = image_base64
            if "," in raw_base64:
                raw_base64 = raw_base64.split(",")[1]
            image_bytes = base64.b64decode(raw_base64)
        else:
            raise HTTPException(status_code=400, detail="Please upload an image file or provide a base64 image string.")

        if not image_bytes or len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded image is empty.")

        result = predict_disease(image_bytes)
        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Leaf disease detection error: {str(e)}")


@router.post("/detect-base64")
async def detect_leaf_disease_json(req: Base64DetectRequest):
    """JSON body endpoint for base64 encoded leaf images (webcam / mobile capture)"""
    try:
        raw_b64 = req.image_base64
        if "," in raw_b64:
            raw_b64 = raw_b64.split(",")[1]
        image_bytes = base64.b64decode(raw_b64)
        return predict_disease(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Diagnosis error: {str(e)}")


@router.get("/classes")
def get_supported_classes():
    """List of all classes supported by the trained MobileNetV3 model"""
    return {
        "classes": CLASS_NAMES,
        "details": CLASS_INFO,
        "model_architecture": "MobileNetV3-Large (Transfer Learning)",
        "input_resolution": "224x224 RGB"
    }


@router.get("/info/{class_name}")
def get_class_info(class_name: str):
    """Retrieve in-depth remedies and pathogen details for a specific disease class"""
    cleaned_name = class_name.lower().strip()
    if cleaned_name not in CLASS_INFO:
        raise HTTPException(status_code=404, detail=f"Class '{class_name}' not found. Supported: {CLASS_NAMES}")
    return CLASS_INFO[cleaned_name]
