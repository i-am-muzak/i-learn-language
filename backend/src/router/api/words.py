from fastapi import APIRouter, Depends
from typing import List

# Config
from sqlalchemy.orm import Session
from sqlalchemy import func
from config.database import get_db
from config.auth import get_current_user

# Models
from database.models.words import Word

# Schemas
from database.schemas.words import (
    WordView,
    CreateWord
)

router = APIRouter(prefix="/words", tags=["words"])


@router.post("/create", description="Create words (Test only)")
def createWord(data: CreateWord, db: Session = Depends(get_db), user=Depends(get_current_user)):
    for word in data.words:
        instance = Word()
        instance.word = word
        db.add(instance)

    db.commit()
    return {
        "detail": "success"
    }


@router.get("/random", response_model=List[WordView], description="Fetch all words from database.")
def get_random_words(db: Session = Depends(get_db), user=Depends(get_current_user)):
    words = db.query(Word).order_by(func.random()).limit(5).all()
    return words
