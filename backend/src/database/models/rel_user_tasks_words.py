from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from config.database import Base

from database.models.words import Word


class RelUserTaskWord(Base):
    __tablename__ = "rel_user_tasks_words"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("user_tasks.id"))
    word_id = Column(Integer, ForeignKey("words.id"))

    word = relationship("Word", backref="rel_user_tasks_words", viewonly=True)
