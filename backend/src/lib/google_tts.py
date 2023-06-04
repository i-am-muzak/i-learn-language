from google.cloud.texttospeech import (
    TextToSpeechClient,
    SynthesisInput,
    VoiceSelectionParams,
    SsmlVoiceGender,
    AudioConfig,
    AudioEncoding
)

from config.logger import logger
from fastapi import HTTPException


class GoogleTTSManager:
    '''
    SSML VOICE GENDERS: 
        1: A male voice.
        2: A female voice.
        3: Neutral Voice

    AUDIO ENCODING OPTIONS:
        0: AUDIO_ENCODING_UNSPECIFIED
        1: LINEAR16
        2: MP3
        3: OGG_OPUS
        5: MULAW
        6: ALAW
    '''

    def __init__(self, language_code: str = "en-US", ssml_gender: int = SsmlVoiceGender.NEUTRAL, audio_encoding: int = AudioEncoding.OGG_OPUS) -> None:
        self.client = TextToSpeechClient()
        self.voice = VoiceSelectionParams(
            language_code=language_code, ssml_gender=ssml_gender
        )
        self.config = AudioConfig(
            audio_encoding=audio_encoding
        )

    def generateTTS(self, text: str):
        try:
            input = SynthesisInput(text=text)

            response = self.client.synthesize_speech(
                input=input, voice=self.voice, audio_config=self.config
            )

            return response

        except Exception as e:
            logger.exception(str(e), stack_info=True)
            HTTPException(status_code=500,
                          detail=f"An error occured while creating TTS.")
