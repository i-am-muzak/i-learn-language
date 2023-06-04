from pydantic import BaseModel


class TranslationRequestData(BaseModel):
    text: str
