from fastapi import APIRouter, HTTPException, Query
from typing import List

router = APIRouter()

# Sample in-memory schemes data for development/testing
_SCHEMES = [
    {
        "id": 1,
        "title": "Soil Health Card Scheme",
        "category": "soil",
        "state": "Karnataka",
        "description": "Provides soil testing and nutrient recommendations.",
    },
    {
        "id": 2,
        "title": "Pradhan Mantri Fasal Bima Yojana",
        "category": "insurance",
        "state": "Punjab",
        "description": "Crop insurance to protect farmers against crop failure.",
    },
    {
        "id": 3,
        "title": "Per Drop More Crop (Micro-irrigation)",
        "category": "irrigation",
        "state": "Maharashtra",
        "description": "Promotes micro-irrigation systems for water efficiency.",
    },
]


@router.get("/", response_model=List[dict])
def get_all_schemes():
    return _SCHEMES


@router.get("/{scheme_id}")
def get_scheme_by_id(scheme_id: int):
    for s in _SCHEMES:
        if s["id"] == scheme_id:
            return s
    raise HTTPException(status_code=404, detail="Scheme not found")


@router.get("/search", response_model=List[dict])
def search_schemes(query: str = Query(..., min_length=1)):
    q = query.lower()
    results = [s for s in _SCHEMES if q in s["title"].lower() or q in s["description"].lower()]
    return results


@router.get("/category/{category}", response_model=List[dict])
def get_schemes_by_category(category: str):
    c = category.lower()
    return [s for s in _SCHEMES if s["category"].lower() == c]


@router.get("/state/{state}", response_model=List[dict])
def get_schemes_by_state(state: str):
    st = state.lower()
    return [s for s in _SCHEMES if s["state"].lower() == st]
