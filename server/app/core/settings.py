from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str
    VERSION: str
    ENV: str

    QDRANT_URL: str
    QDRANT_KEY: str


    class Config:
        env_file = ".env"

settings = Settings()
