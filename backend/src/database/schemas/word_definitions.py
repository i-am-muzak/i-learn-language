from pydantic import BaseModel


class WordDefinitionView(BaseModel):
    id: int
    definition: str
    part_of_speech: str

    class Config:
        orm_mode = True
