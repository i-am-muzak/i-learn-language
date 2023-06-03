from pydantic import BaseModel


class UserTaskView(BaseModel):
    id: int
    title: str
    description: str
    created_at: int
    status_id: str

    class Config:
        orm_mode = True
