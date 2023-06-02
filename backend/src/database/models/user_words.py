from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from config.database import Base


class UserWord(Base):
    __tablename__ = "user_words"

    id = Column(Integer, primary_key=True, index=True)
    word_id = Column(Integer, ForeignKey("words.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    word = relationship("Word", backref="user_words")
    user = relationship("User", backref="user_words")
