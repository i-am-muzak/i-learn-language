from pydantic import BaseModel
from typing import List
from database.schemas.words import WordView


class UserTaskView(BaseModel):
    id: int
    title: str
    description: str
    created_at: int
    status_id: int
    status_text: str
    words: List[WordView]

    class Config:
        orm_mode = True
