from fastapi import APIRouter, HTTPException, Query
from typing import List
from ..core.supabase import supabase

router = APIRouter()


@router.get("/", response_model=List[dict])
def get_all_schemes():
    res = supabase.table("schemes").select("*").execute()
    return res.data


@router.get("/search", response_model=List[dict])
def search_schemes(query: str = Query(..., min_length=1)):
    res = supabase.table("schemes").select("*").ilike("title", f"%{query}%").execute()
    return res.data


@router.get("/category/{category}", response_model=List[dict])
def get_schemes_by_category(category: str):
    res = supabase.table("schemes").select("*").eq("category", category.lower()).execute()
    return res.data


@router.get("/state/{state}", response_model=List[dict])
def get_schemes_by_state(state: str):
    res = supabase.table("schemes").select("*").eq("state", state).execute()
    return res.data


@router.get("/{scheme_id}")
def get_scheme_by_id(scheme_id: int):
    res = supabase.table("schemes").select("*").eq("id", scheme_id).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return res.data
