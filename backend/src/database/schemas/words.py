from pydantic import BaseModel
from typing import List


class CreateWord(BaseModel):
    words: List[str]


class WordView(BaseModel):
    id: int
    word: str
    part_of_speech: str = None
    uk_audio: str = None
    us_audio: str = None

    class Config:
        orm_mode = True
