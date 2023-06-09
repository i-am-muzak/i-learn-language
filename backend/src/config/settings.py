from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "ILearn API"

    # Auth Values
    JWT_ALGORITHM: str
    JWT_SECRET: str

    # Keys
    OPEN_AI_ACCESS_TOKEN: str
    GCP_PROJECT_ID: str

    class Config:
        env_file = ".env"
