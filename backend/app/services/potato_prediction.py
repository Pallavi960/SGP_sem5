"""
Potato leaf disease prediction service.
Model: MobileNetV2 trained on Early_blight / Healthy / Late_blight (128x128 input).
"""

import os
import io
import logging
from typing import Dict, Any, List

import numpy as np
from PIL import Image

logger = logging.getLogger(__name__)

# ── Class metadata ─────────────────────────────────────────────────────────────
CLASS_NAMES = ["Early_blight", "Healthy", "Late_blight"]

CLASS_INFO: Dict[str, Any] = {
    "Early_blight": {
        "id": "early_blight",
        "name": "Early Blight",
        "vernacular_name": "अर्ली ब्लाइट / आगाऊ झुलसा रोग",
        "pathogen": "Alternaria solani (Fungus)",
        "severity": "Moderate",
        "description": (
            "Early blight is caused by the fungus Alternaria solani. "
            "It appears as dark brown circular spots with concentric rings (target board pattern) "
            "on older leaves first, then spreads upward. Severe infections can cause defoliation "
            "and reduce tuber yield."
        ),
        "symptoms": [
            "Dark brown circular lesions with concentric rings on lower leaves",
            "Yellow halo surrounding necrotic spots",
            "Premature yellowing and dropping of affected leaves",
            "Stem lesions in severe cases (collar rot)",
        ],
        "immediate_actions": [
            "Remove and destroy heavily infected leaves",
            "Avoid overhead irrigation — use drip if possible",
            "Apply preventive fungicide spray at first sign",
        ],
        "chemical_control": [
            {
                "product": "Mancozeb 75% WP",
                "dosage": "2.0 g per litre of water",
                "application": "Foliar spray every 7–10 days during humid weather",
            },
            {
                "product": "Chlorothalonil 75% WP",
                "dosage": "2.0 g per litre of water",
                "application": "Protective spray before disease onset",
            },
            {
                "product": "Azoxystrobin 23% SC",
                "dosage": "1.0 ml per litre of water",
                "application": "Systemic fungicide — 2 sprays at 10-day interval",
            },
        ],
        "organic_control": [
            {
                "treatment": "Trichoderma viride bioagent",
                "dosage": "5 g per litre of water",
                "timing": "Foliar spray in early morning or evening",
            },
            {
                "treatment": "Neem oil (1500 ppm)",
                "dosage": "3 ml per litre + mild soap",
                "timing": "Spray every 7 days as protectant",
            },
        ],
        "prevention": [
            "Use certified disease-free seed tubers",
            "Maintain proper plant spacing for air circulation",
            "Rotate crops — avoid planting potato/tomato in same field consecutively",
            "Apply balanced fertilizer (avoid excess nitrogen)",
        ],
    },
    "Healthy": {
        "id": "healthy",
        "name": "Healthy Potato Leaf",
        "vernacular_name": "स्वस्थ पत्ता (No Disease Detected)",
        "pathogen": "None — plant is healthy",
        "severity": "Normal",
        "description": (
            "The leaf shows uniform green coloration, no necrotic lesions, "
            "no wilting or curling, and healthy cell structure. "
            "Photosynthesis is operating normally."
        ),
        "symptoms": [
            "Deep, uniform green foliage",
            "No spots, rings, or water-soaked lesions",
            "Intact leaf margins without curling or yellowing",
            "No fungal sporulation or insect damage visible",
        ],
        "immediate_actions": [
            "Continue standard crop management",
            "Monitor field twice a week for early signs of any disease",
            "Maintain soil moisture balance",
        ],
        "chemical_control": [],
        "organic_control": [
            {
                "treatment": "Panchagavya or Jeevamrutha foliar spray",
                "dosage": "30 ml per litre of water",
                "timing": "Every 15–20 days for plant immunity",
            },
        ],
        "prevention": [
            "Maintain N-P-K balance as per soil test recommendation",
            "Erect bird perches to reduce caterpillar pest pressure",
            "Regular field scouting every 7 days",
        ],
    },
    "Late_blight": {
        "id": "late_blight",
        "name": "Late Blight",
        "vernacular_name": "लेट ब्लाइट / पछेता झुलसा रोग",
        "pathogen": "Phytophthora infestans (Oomycete / Water Mould)",
        "severity": "Critical",
        "description": (
            "Late blight is one of the most devastating potato diseases, caused by Phytophthora infestans. "
            "It spreads extremely rapidly in cool, moist conditions. "
            "Water-soaked lesions turn dark brown/black on leaves and stems; "
            "white sporulation appears on the underside of leaves. "
            "It can destroy an entire crop within days if untreated."
        ),
        "symptoms": [
            "Water-soaked, pale green or dark lesions on leaf edges",
            "White sporulation (mould) on the underside of leaves in humid conditions",
            "Rapid brown-to-black necrosis spreading across the entire leaf",
            "Dark brown cankers on stems and rotting tubers in the ground",
        ],
        "immediate_actions": [
            "Apply systemic fungicide (Metalaxyl-M or Dimethomorph) immediately",
            "Remove and bury infected plant material — do NOT compost",
            "Avoid irrigation until weather dries — wet foliage accelerates spread",
        ],
        "chemical_control": [
            {
                "product": "Metalaxyl-M 4% + Mancozeb 64% WP (Ridomil Gold)",
                "dosage": "2.5 g per litre of water",
                "application": "Spray immediately at first sign; repeat every 7 days",
            },
            {
                "product": "Cymoxanil 8% + Mancozeb 64% WP",
                "dosage": "3.0 g per litre of water",
                "application": "Curative foliar spray; do not use more than 3 times consecutively",
            },
            {
                "product": "Dimethomorph 50% WP",
                "dosage": "1.0 g per litre of water",
                "application": "Systemic fungicide — alternates with Metalaxyl to prevent resistance",
            },
        ],
        "organic_control": [
            {
                "treatment": "Copper Oxychloride 50% WP",
                "dosage": "2.5 g per litre of water",
                "timing": "Protective spray before onset of humid/cool weather",
            },
            {
                "treatment": "Bordeaux Mixture (1%)",
                "dosage": "1 kg CuSO₄ + 1 kg lime in 100 litres water",
                "timing": "Apply as preventive measure in epidemic-prone seasons",
            },
        ],
        "prevention": [
            "Grow certified resistant varieties (Kufri Jyoti, Kufri Badshah, Kufri Himalini)",
            "Avoid dense planting — ensure adequate air movement",
            "Apply hilling to prevent tuber exposure to infected soil water",
            "In epidemic season, prophylactic spray every 5–7 days",
        ],
    },
}

# ── Model paths ────────────────────────────────────────────────────────────────
POTATO_MODEL_PATHS = [
    os.path.join(os.path.dirname(__file__), "..", "models", "potato_model.onnx"),
    os.path.join(os.path.dirname(__file__), "..", "..", "..", "backend", "app", "models", "potato_model.onnx"),
]

IMG_SIZE = 128  # must match training


def _softmax(x: np.ndarray) -> np.ndarray:
    e = np.exp(x - np.max(x))
    return e / e.sum()


def _preprocess(image: Image.Image) -> np.ndarray:
    img = image.convert("RGB").resize((IMG_SIZE, IMG_SIZE), Image.Resampling.BILINEAR)
    arr = np.array(img, dtype=np.float32) / 255.0          # rescale to [0,1] — matches training
    arr = np.expand_dims(arr, axis=0)                       # (1, 128, 128, 3)
    return arr


def _heuristic_fallback(image: Image.Image) -> Dict[str, Any]:
    """
    Simple colour-based heuristic when the ONNX model isn't available.
    Potato disease visual signatures:
      - Early blight: brown/dark necrotic concentric spots on green background
      - Late blight: dark water-soaked patches, possibly white sporulation
      - Healthy:      uniform lush green
    """
    img = image.convert("RGB").resize((64, 64))
    arr = np.array(img, dtype=np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

    green_ratio  = float(np.mean((g > r) & (g > b) & (g > 80)))
    brown_ratio  = float(np.mean((r > g) & (r > b) & (r > 60) & (r < 200)))
    dark_ratio   = float(np.mean((r < 80) & (g < 80) & (b < 80)))

    s_healthy      = max(0.05, green_ratio * 2.5 - brown_ratio * 1.5 - dark_ratio * 2.0)
    s_early_blight = max(0.05, brown_ratio * 3.0 + dark_ratio * 0.5)
    s_late_blight  = max(0.05, dark_ratio * 3.5 + brown_ratio * 1.0)

    raw = np.array([s_early_blight, s_healthy, s_late_blight])
    probs = _softmax(raw * 2.5) * 100.0
    order = np.argsort(probs)[::-1]

    top3 = [{"class_name": CLASS_NAMES[i], "probability": round(float(probs[i]), 2)} for i in order[:3]]
    best = order[0]
    return {
        "predicted_class": CLASS_NAMES[best],
        "confidence": round(float(probs[best]), 2),
        "top3": top3,
        "engine": "heuristic_fallback",
    }


def predict_potato(image_bytes: bytes) -> Dict[str, Any]:
    """Main prediction entry-point called by the FastAPI route."""
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Try ONNX
    onnx_path = None
    for p in POTATO_MODEL_PATHS:
        if os.path.exists(p):
            onnx_path = p
            break

    if onnx_path:
        try:
            import onnxruntime as ort
            sess = ort.InferenceSession(onnx_path, providers=["CPUExecutionProvider"])
            tensor = _preprocess(image)
            input_name = sess.get_inputs()[0].name
            raw = sess.run(None, {input_name: tensor})[0][0]   # (3,)
            # model outputs softmax probabilities (trained with categorical_crossentropy + softmax)
            probs = np.array(raw, dtype=np.float64) * 100.0
            order = np.argsort(probs)[::-1]
            top3 = [{"class_name": CLASS_NAMES[i], "probability": round(float(probs[i]), 2)} for i in order[:3]]
            best = order[0]
            result = {
                "predicted_class": CLASS_NAMES[best],
                "confidence": round(float(probs[best]), 2),
                "top3": top3,
                "engine": "onnx_mobilenetv2",
            }
        except Exception as exc:
            logger.warning(f"ONNX potato inference failed: {exc}. Using fallback.")
            result = _heuristic_fallback(image)
    else:
        result = _heuristic_fallback(image)

    pred_class = result["predicted_class"]
    details = CLASS_INFO.get(pred_class, CLASS_INFO["Healthy"])

    return {
        "status": "success",
        "predicted_class": pred_class,
        "confidence": result["confidence"],
        "top3": result["top3"],
        "engine": result["engine"],
        "details": details,
        "ai_prompt": (
            f"My potato plant leaf was diagnosed with '{details['name']}' "
            f"({details['vernacular_name']}) with {result['confidence']:.1f}% confidence. "
            f"The pathogen is {details['pathogen']}. "
            f"Severity: {details['severity']}. "
            f"Give me practical treatment steps and what I should do right now to save my crop."
        ),
    }
