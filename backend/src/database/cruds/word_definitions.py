from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from database.models.word_definitions import WordDefinition

# Logging
from config.logger import logger


def put(db: Session, data: dict, record: WordDefinition = None) -> WordDefinition:
    try:
        record = record if record else WordDefinition()

        for var, value in data.items():
            setattr(record, var, value)

        db.add(record)
        db.commit()
        db.refresh(record)

        return record
    except Exception as error:
        logger.exception(str(error), stack_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occured while creating a new user task.")
