from fastapi import APIRouter

# Api Prefixed Routers
from router.auth.users import router

auth_router = APIRouter(prefix="/auth")

auth_router.include_router(router)
