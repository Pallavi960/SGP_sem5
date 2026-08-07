from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import cohere
from ..core.config import settings

router = APIRouter()
co = cohere.ClientV2(settings.AI_API_KEY)

SYSTEM_PROMPT = """You are an expert smart farming assistant. You help farmers with:
- Crop recommendations based on soil, season, and region
- Plant disease identification and treatment
- Weather-based farming advice
- Irrigation and fertilizer guidance
- Pest control suggestions
Answer clearly and practically. If the question is not related to farming, politely redirect the user to ask farming-related questions."""


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(req: ChatRequest):
    try:
        response = co.chat(
            model="command-a-03-2025",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": req.message},
            ],
        )
        return {"reply": response.message.content[0].text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
