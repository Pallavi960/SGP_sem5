from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import cohere
import json
import re
from ..core.config import settings

router = APIRouter()
co = cohere.ClientV2(settings.COHERE_API_KEY)


class CropRecommendationRequest(BaseModel):
    state: str
    district: str
    village: str = ""
    farmSize: float
    farmSizeUnit: str  # "Acres" or "Hectares"
    waterAvailability: str
    soilType: str
    previousCrop: str = ""
    season: str  # "Kharif", "Rabi", "Zaid"
    farmingPreference: str
    budget: str  # "Low", "Medium", "High"
    mainGoal: str


class CropRecommendation(BaseModel):
    name: str
    emoji: str
    whySuitable: str
    season: str
    duration: str
    waterRequirement: str
    soilSuitability: str
    estimatedYield: str | None
    importantConsiderations: list[str]
    suggestedAreaPercent: int


class CropRecommendationResponse(BaseModel):
    recommendations: list[CropRecommendation]
    location: dict


@router.post("/recommend", response_model=CropRecommendationResponse)
async def recommend_crops(req: CropRecommendationRequest):
    try:
        # Build detailed prompt
        system_prompt = """You are an expert agricultural advisor for Indian farmers. Your task is to recommend 3 suitable crops based on the farmer's inputs.

CRITICAL: You must return ONLY a valid JSON array. No markdown formatting, no code blocks, no explanations - just the raw JSON array.

Return exactly 3 crop recommendations as a JSON array with this structure:
[
  {
    "name": "Crop Name",
    "emoji": "🌾",
    "whySuitable": "2-3 sentences explaining why this crop fits the farmer's conditions, budget, and goal",
    "season": "Kharif/Rabi/Zaid",
    "duration": "e.g., 90-120 days",
    "waterRequirement": "e.g., Moderate - 4-5 irrigations",
    "soilSuitability": "Brief description of soil compatibility",
    "estimatedYield": null or "descriptive range if you are confident, otherwise null",
    "importantConsiderations": ["Point 1", "Point 2", "Point 3"],
    "suggestedAreaPercent": 40
  },
  ...
]

IMPORTANT RULES:
- The 3 suggestedAreaPercent values MUST sum to exactly 100
- Return crops suitable for the specified season and location
- Consider water availability, soil type, budget, and farmer's main goal
- NEVER fabricate yield/profit data - use null if uncertain
- estimatedYield should be null unless you have reliable information
- Make recommendations practical and realistic for Indian farming conditions
- importantConsiderations should contain 3-4 actionable farming tips
- First crop should get highest area percent (typically 40-50%), second (30-40%), third (10-30%)"""

        user_message = f"""Recommend 3 crops for this farm:

Location: {req.state}, {req.district}{', ' + req.village if req.village else ''}
Farm Size: {req.farmSize} {req.farmSizeUnit}
Water Availability: {req.waterAvailability}
Soil Type: {req.soilType}
Previous Crop: {req.previousCrop if req.previousCrop else 'None'}
Season: {req.season}
Farming Preference: {req.farmingPreference}
Budget: {req.budget}
Main Goal: {req.mainGoal}

Return ONLY the JSON array, no other text."""

        # Call Cohere API
        response = co.chat(
            model="command-a-03-2025",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
        )

        # Extract response text
        response_text = response.message.content[0].text.strip()

        # Remove markdown code blocks if present
        response_text = re.sub(r'^```(?:json)?\s*', '', response_text)
        response_text = re.sub(r'\s*```$', '', response_text)
        response_text = response_text.strip()

        # Parse JSON
        try:
            recommendations = json.loads(response_text)
        except json.JSONDecodeError as e:
            raise HTTPException(
                status_code=422,
                detail=f"Failed to parse AI response as JSON: {str(e)}"
            )

        # Validate structure
        if not isinstance(recommendations, list) or len(recommendations) != 3:
            raise HTTPException(
                status_code=422,
                detail="AI response must contain exactly 3 crop recommendations"
            )

        # Normalize percentages to ensure they sum to 100
        total_percent = sum(rec.get('suggestedAreaPercent', 0) for rec in recommendations)
        if total_percent != 100 and total_percent > 0:
            for rec in recommendations:
                rec['suggestedAreaPercent'] = round(
                    (rec.get('suggestedAreaPercent', 0) / total_percent) * 100
                )
            # Adjust any rounding error
            actual_sum = sum(rec['suggestedAreaPercent'] for rec in recommendations)
            if actual_sum != 100:
                recommendations[0]['suggestedAreaPercent'] += (100 - actual_sum)

        return {
            "recommendations": recommendations,
            "location": {
                "state": req.state,
                "district": req.district
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation service error: {str(e)}")
