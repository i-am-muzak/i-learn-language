from pydantic import BaseModel


class WordSentenceView(BaseModel):
    id: int
    sentence: str
    part_of_speech: str

    class Config:
        orm_mode = True
