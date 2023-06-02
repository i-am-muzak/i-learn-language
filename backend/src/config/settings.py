from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "ILearn API"

    # Auth Values
    JWT_ALGORITHM: str
    JWT_SECRET: str

    class Config:
        env_file = ".env"
