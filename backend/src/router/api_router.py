from fastapi import APIRouter

# Api Prefixed Routers
from router.api.words import router as words_router

api_router = APIRouter(prefix="/api")

api_router.include_router(words_router)
