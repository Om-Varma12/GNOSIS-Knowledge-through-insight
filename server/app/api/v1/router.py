from fastapi import APIRouter
from app.api.v1.routes import temp, chat

api_router = APIRouter(prefix="/api/v1")


api_router.include_router(
    chat.router,
    prefix="/chat",
    tags=["Chat"]
)
