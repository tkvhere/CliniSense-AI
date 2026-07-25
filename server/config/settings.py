import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")
    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY")

    # JWT
    JWT_SECRET = os.getenv("JWT_SECRET_KEY")

    # MongoDB
    MONGO_URI = os.getenv("MONGO_URI")
    DATABASE_NAME = os.getenv("DATABASE_NAME")