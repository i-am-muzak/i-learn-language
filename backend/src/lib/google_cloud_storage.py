from google.cloud import storage
from config.logger import logger

from fastapi import HTTPException


class GCSManager:
    def __init__(self) -> None:
        self.storage_client = storage.Client()

    def upload_blob_from_memory(self, data, bucket_name: str, destination_blob_name: str):
        try:
            bucket = self.storage_client.bucket(bucket_name)
            blob = bucket.blob(destination_blob_name)
            blob.upload_from_string(data)
            blob.make_public()
            return blob.public_url

        except Exception as e:
            logger.exception(str(e), stack_info=True)
            raise HTTPException(
                status_code=500, detail="An error occured while uploading the audio.")
