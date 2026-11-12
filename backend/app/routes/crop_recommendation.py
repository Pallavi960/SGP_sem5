from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
from ..core.config import settings

router = APIRouter()

class FarmerInput(BaseModel):
    state: str
    district: str = Field(min_length=1)
    village: str
    farmSize: float = Field(gt=0)
    farmSizeUnit: str
    waterAvailability: str
    soilType: str
    previousCrop: Optional[str] = None
    season: str
    farmingPreference: str
    budget: str
    mainGoal: str
    lang: Optional[str] = "en"

class CropRecommendation(BaseModel):
    cropName: str
    cropNameLocal: Optional[str] = None
    suitabilityScore: float
    whySuitable: str
    season: str
    duration: str
    waterRequirement: str
    soilSuitability: str
    estimatedYield: Optional[str] = None
    estimatedProfit: Optional[str] = None
    considerations: List[str]
    category: str

class FarmLayoutSection(BaseModel):
    cropName: str
    color: str
    areaPercentage: float
    area: float

class RecommendationResponse(BaseModel):
    success: bool
    recommendations: List[CropRecommendation]
    farmLayout: List[FarmLayoutSection]
    totalArea: float
    unit: str


def get_rule_based_recommendations(farmer_input: FarmerInput):
    """Fast rule-based recommendations"""
    season = farmer_input.season
    soil = farmer_input.soilType
    water = farmer_input.waterAvailability
    goal = farmer_input.mainGoal
    pref = farmer_input.farmingPreference
    state = farmer_input.state
    
    # Crop database with details
    crop_db = {
        "Wheat": {
            "local": "गेहूं",
            "season": "Rabi",
            "duration": "120 days",
            "water": "Moderate (4-5 irrigations)",
            "soil": ["loamy_soil", "black_soil"],
            "category": "Cereal",
            "considerations": [
                "Requires timely irrigation at CRI stage (20-25 days)",
                "Monitor for yellow rust and aphid infestations",
                "Harvest when grain moisture is below 14%",
                "Best suited for North India climate"
            ]
        },
        "Rice": {
            "local": "धान",
            "season": "Kharif",
            "duration": "130 days",
            "water": "High (standing water required)",
            "soil": ["clay_soil", "loamy_soil"],
            "category": "Cereal",
            "considerations": [
                "Requires continuous standing water of 2-3 cm",
                "Watch for stem borer and leaf folder pests",
                "Transplant at 20-25 day seedling stage",
                "Suitable for areas with good rainfall or irrigation"
            ]
        },
        "Cotton": {
            "local": "कपास",
            "season": "Kharif",
            "duration": "160 days",
            "water": "Moderate to High",
            "soil": ["black_soil"],
            "category": "Cash Crop",
            "considerations": [
                "Black soil provides best results",
                "Monitor for pink bollworm and whitefly",
                "Install pheromone traps for pest management",
                "Requires warm climate with 21-27°C temperature"
            ]
        },
        "Maize": {
            "local": "मक्का",
            "season": "Kharif",
            "duration": "100 days",
            "water": "Moderate",
            "soil": ["loamy_soil", "sandy_soil"],
            "category": "Cereal",
            "considerations": [
                "Fast growing with good market demand",
                "Scout for fall armyworm in whorl stage",
                "Critical water need at tasseling and silking",
                "Can be grown in both Kharif and Rabi with irrigation"
            ]
        },
        "Tomato": {
            "local": "टमाटर",
            "season": "Rabi",
            "duration": "115 days",
            "water": "Regular irrigation",
            "soil": ["loamy_soil", "sandy_soil"],
            "category": "Vegetable",
            "considerations": [
                "High profit potential with good market",
                "Requires staking and regular pruning",
                "Monitor for early blight and whitefly",
                "Maintain uniform moisture to prevent fruit cracking"
            ]
        },
        "Potato": {
            "local": "आलू",
            "season": "Rabi",
            "duration": "95 days",
            "water": "Moderate",
            "soil": ["loamy_soil", "sandy_soil"],
            "category": "Vegetable",
            "considerations": [
                "Tuber crop with good storage potential",
                "Watch for late blight disease in humid conditions",
                "Earthing up prevents greening of tubers",
                "Cool climate preferred (15-20°C)"
            ]
        },
        "Chickpea": {
            "local": "चना",
            "season": "Rabi",
            "duration": "115 days",
            "water": "Very Low (1-2 irrigations)",
            "soil": ["black_soil", "loamy_soil"],
            "category": "Pulse",
            "considerations": [
                "Excellent for water-scarce regions",
                "Fixes atmospheric nitrogen, improves soil",
                "Monitor for pod borer in flowering stage",
                "Good market price and low input cost"
            ]
        },
        "Mustard": {
            "local": "सरसों",
            "season": "Rabi",
            "duration": "110 days",
            "water": "Low (2-3 irrigations)",
            "soil": ["loamy_soil", "sandy_soil"],
            "category": "Oilseed",
            "considerations": [
                "Low water requirement makes it ideal for rainfed areas",
                "Watch for aphid infestation during flowering",
                "Sulphur application increases oil content",
                "Short duration allows crop rotation"
            ]
        },
        "Soybean": {
            "local": "सोयाबीन",
            "season": "Kharif",
            "duration": "95 days",
            "water": "Moderate (rain-dependent)",
            "soil": ["black_soil", "loamy_soil"],
            "category": "Oilseed",
            "considerations": [
                "Lower risk crop suitable for rainfed conditions",
                "Good market and processing industry support",
                "Improves soil through nitrogen fixation",
                "Monitor for yellow mosaic virus"
            ]
        },
        "Groundnut": {
            "local": "मूंगफली",
            "season": "Kharif",
            "duration": "120 days",
            "water": "Moderate",
            "soil": ["sandy_soil", "loamy_soil"],
            "category": "Oilseed",
            "considerations": [
                "Suitable for sandy and light soils",
                "Can be grown in Kharif and summer seasons",
                "Good market as both oil and snack food",
                "Avoid waterlogging for healthy pod development"
            ]
        },
        "Onion": {
            "local": "प्याज",
            "season": "Rabi",
            "duration": "135 days",
            "water": "Regular light irrigation",
            "soil": ["loamy_soil"],
            "category": "Vegetable",
            "considerations": [
                "High profit potential with steady demand",
                "Can be stored for 3-4 months",
                "Stop irrigation 10-15 days before harvest",
                "Requires well-drained soil"
            ]
        },
        "Sugarcane": {
            "local": "गन्ना",
            "season": "Year-round",
            "duration": "12-15 months",
            "water": "Very High",
            "soil": ["loamy_soil", "clay_soil"],
            "category": "Cash Crop",
            "considerations": [
                "Long duration but very high profit potential",
                "Requires consistent water supply throughout",
                "Government procurement ensures steady income",
                "High input cost but assured returns"
            ]
        }
    }
    
    # Selection logic
    candidates = []
    
    for crop, details in crop_db.items():
        score = 70  # Base score
        reasons = []
        
        # Season match
        if details["season"] == season or details["season"] == "Year-round":
            score += 15
            reasons.append(f"Perfect for {season} season")
        
        # Soil match
        if soil in details["soil"]:
            score += 10
            reasons.append(f"Excellent soil compatibility")
        
        # Water match
        if water == "sufficient_irrigation" and "High" in details["water"]:
            score += 8
        elif water == "limited_irrigation" and "Moderate" in details["water"]:
            score += 10
        elif water == "rainwater_only" and ("Low" in details["water"] or "rain" in details["water"].lower()):
            score += 12
            reasons.append("Low water requirement suits your condition")
        
        # Goal match
        if goal == "higher_profit" and details["category"] in ["Cash Crop", "Vegetable"]:
            score += 10
            reasons.append("High profit potential")
        elif goal == "lower_water" and "Low" in details["water"]:
            score += 12
            reasons.append("Minimal water needs")
        elif goal == "food_production" and details["category"] in ["Cereal", "Pulse"]:
            score += 8
        elif goal == "lower_risk" and details["category"] in ["Cereal", "Pulse", "Oilseed"]:
            score += 7
        
        # Preference match
        if pref == "food_crops" and details["category"] in ["Cereal", "Pulse"]:
            score += 8
        elif pref == "cash_crops" and details["category"] == "Cash Crop":
            score += 8
        elif pref == "vegetables" and details["category"] == "Vegetable":
            score += 8
        elif pref == "oilseeds" and details["category"] == "Oilseed":
            score += 8
        
        candidates.append((crop, details, min(score, 98), reasons))
    
    # Sort by score
    candidates.sort(key=lambda x: x[2], reverse=True)
    top3 = candidates[:3]
    
    # Build recommendations
    recommendations = []
    for crop, details, score, reasons in top3:
        why_suitable = f"{crop} is highly suitable for {season} season in {state}. " + " ".join(reasons[:2]) + f". Your {soil.replace('_', ' ')} and {water.replace('_', ' ')} conditions are favorable."
        
        recommendations.append(CropRecommendation(
            cropName=crop,
            cropNameLocal=details["local"],
            suitabilityScore=score,
            whySuitable=why_suitable,
            season=f"{details['season']} Season",
            duration=details["duration"],
            waterRequirement=details["water"],
            soilSuitability=f"Suitable for {', '.join([s.replace('_', ' ') for s in details['soil']])}",
            estimatedYield="Varies by region",
            estimatedProfit="Depends on market conditions",
            considerations=details["considerations"],
            category=details["category"]
        ))
    
    # Farm layout
    if len(top3) >= 3:
        layout_percentages = [60, 30, 10]  # Diversification strategy
    elif len(top3) == 2:
        layout_percentages = [70, 30]
    else:
        layout_percentages = [100]
    
    colors = ["#10b981", "#3b82f6", "#f59e0b"]
    farm_layout = []
    
    for idx, (crop, _, _, _) in enumerate(top3[:3]):
        area = (layout_percentages[idx] / 100) * farmer_input.farmSize
        farm_layout.append(FarmLayoutSection(
            cropName=crop,
            color=colors[idx],
            areaPercentage=layout_percentages[idx],
            area=round(area, 2)
        ))
    
    return {
        "recommendations": recommendations,
        "farmLayout": farm_layout
    }


@router.post("/recommend", response_model=RecommendationResponse)
async def recommend_crops(farmer_input: FarmerInput):
    """
    Generate crop recommendations - uses fast rule-based system
    """
    try:
        result = get_rule_based_recommendations(farmer_input)
        
        return RecommendationResponse(
            success=True,
            recommendations=result["recommendations"],
            farmLayout=result["farmLayout"],
            totalArea=farmer_input.farmSize,
            unit=farmer_input.farmSizeUnit
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating recommendations: {str(e)}"
        )
