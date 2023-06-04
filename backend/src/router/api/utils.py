from fastapi import APIRouter, Depends, HTTPException

# Config
from config.auth import get_current_user
from config.settings import Settings

# Schemas
from database.schemas.utils import TranslationRequestData

# Logging
from config.logger import logger

# Lib
from lib.google_translation import TranslationManager

router = APIRouter(prefix="/utils", tags=["utils"])
settings = Settings()


@router.post("/translate", description="Translate given text.")
def translateText(data: TranslationRequestData, user=Depends(get_current_user)):
    translationManager = TranslationManager()
    resp = translationManager.translate_text(text=data.text)

    return {
        "detail": resp
    }
