from pydantic import BaseModel
from typing import List
from database.schemas.word_definitions import WordDefinitionView
from database.schemas.word_sentences import WordSentenceView


class GenerateWordAudio(BaseModel):
    word_id: int


class GenerateWordInformation(BaseModel):
    task_id: int


class CreateWord(BaseModel):
    words: List[str]


class WordView(BaseModel):
    id: int
    word: str
    part_of_speech: str = None
    uk_audio: str = None
    us_audio: str = None
    word_definitions: List[WordDefinitionView]
    word_sentences: List[WordSentenceView]

    class Config:
        orm_mode = True


class WordViewWithoutRelationships(BaseModel):
    id: int
    word: str
    part_of_speech: str = None
    uk_audio: str = None
    us_audio: str = None

    class Config:
        orm_mode = True
