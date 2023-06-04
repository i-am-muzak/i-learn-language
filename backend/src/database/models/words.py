from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from config.database import Base


class Word(Base):
    __tablename__ = "words"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, unique=True)
    part_of_speech = Column(String)

    uk_audio = Column(String)
    us_audio = Column(String)

    user_tasks = relationship(
        'UserTask', secondary='rel_user_tasks_words', back_populates='words', viewonly=True)

    word_sentences = relationship(
        "WordSentence", back_populates="word", viewonly=True)

    word_definitions = relationship(
        "WordDefinition", back_populates="word", viewonly=True)
