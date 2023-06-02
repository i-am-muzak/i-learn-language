from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from config.database import Base


class WordSentence(Base):
    __tablename__ = "word_sentences"

    id = Column(Integer, primary_key=True, index=True)
    word_id = Column(Integer, ForeignKey("words.id"))
    sentence = Column(String)
    part_of_speech = Column(String)

    word = relationship("Word", backref="word_sentences")
