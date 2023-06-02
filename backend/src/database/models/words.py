from sqlalchemy import Column, Integer, String
from config.database import Base


class Word(Base):
    __tablename__ = "words"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, unique=True)
    part_of_speech = Column(String)

    uk_audio = Column(String)
    us_audio = Column(String)
