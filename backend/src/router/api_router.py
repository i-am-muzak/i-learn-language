from fastapi import APIRouter

# Api Prefixed Routers
from router.api.words import router as words_router
from router.api.user_tasks import router as user_tasks_router

api_router = APIRouter(prefix="/api")

api_router.include_router(words_router)
api_router.include_router(user_tasks_router)
