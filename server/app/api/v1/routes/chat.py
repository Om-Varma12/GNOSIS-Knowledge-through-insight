from fastapi import APIRouter
from pydantic import BaseModel

from pydantic import BaseModel
from typing import Any, Dict, List, Optional

from ai.agents import gnosisAiEngine

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str



class ChatResponse(BaseModel):
    final_verdict: str
    confidence_score: float
    summary: str
    evidence: Dict[str, Any]
    video_url: Optional[str] = None
    track: List[Any]
    impacts: Dict[str, Any]
    images: List[Any]


@router.post("/", response_model=ChatResponse)
async def chat(payload: ChatRequest):
    
    result = gnosisAiEngine.invokeEngine(payload.message)
    print(result)
    return result
