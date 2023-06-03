from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from config.database import Base
from database.models.rel_user_tasks_words import RelUserTaskWord

from lib.status_ids import (
    task_status_ids
)


class UserTask(Base):
    __tablename__ = "user_tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    created_at = Column(Integer)
    status_id = Column(Integer)

    user = relationship("User", backref="user_tasks")
    words = relationship(
        'Word', secondary='rel_user_tasks_words', back_populates='user_tasks')

    @property
    def status_text(self):
        return task_status_ids(self.status_id)
