from pydantic import BaseModel


class WordView(BaseModel):
    id: int
    word: str
    part_of_speech: str = None
    uk_audio: str = None
    us_audio: str = None

    class Config:
        orm_mode = True
