import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY")

    # JWT
    JWT_SECRET = os.getenv("JWT_SECRET_KEY")

    # MongoDB
    MONGO_URI = os.getenv("MONGO_URI")
    DATABASE_NAME = os.getenv("DATABASE_NAME")