from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    COHERE_API_KEY: str
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
