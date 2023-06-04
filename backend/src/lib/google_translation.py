# Imports the Google Cloud Translation library
from google.cloud import translate

# Config
from config.settings import Settings
from config.logger import logger

from fastapi import HTTPException

settings = Settings()


class TranslationManager:
    def __init__(self) -> None:
        self.project_id = settings.GCP_PROJECT_ID

    def translate_text(self, text: str) -> translate.TranslationServiceClient:
        try:
            client = translate.TranslationServiceClient()
            location = "global"
            parent = f"projects/{self.project_id}/locations/{location}"
            logger.info(f"Translating text: {text} into Turkish.")

            response = client.translate_text(
                request={
                    "parent": parent,
                    "contents": [text],
                    "mime_type": "text/plain",  # mime types: text/plain, text/html
                    "source_language_code": "en-US",
                    "target_language_code": "tr",
                }
            )

            return response.translations[0].translated_text
        except Exception as e:
            logger.exception(str(e))
            raise HTTPException(
                status_code=500, detail="An error occured while translating the given text.")
