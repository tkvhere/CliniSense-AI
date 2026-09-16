# ============================================
# CliniSense AI
# Application Configuration
# ============================================

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Config:
    # ========================================
    # Flask
    # ========================================

    SECRET_KEY = os.getenv("SECRET_KEY", "clinisense-secret-key")

    # ========================================
    # JWT
    # ========================================

    JWT_SECRET = os.getenv("JWT_SECRET_KEY")

    # ========================================
    # MongoDB
    # ========================================

    MONGO_URI = os.getenv("MONGO_URI")
    DATABASE_NAME = os.getenv("DATABASE_NAME")

    # ========================================
    # Cloudinary
    # ========================================

    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")


# ============================================
# Debug (Remove before production)
# ============================================

print("=" * 60)
print("Configuration Loaded")
print(f"Database Name : {Config.DATABASE_NAME}")
print(f"Mongo URI Found : {'Yes' if Config.MONGO_URI else 'No'}")
print(f"JWT Secret Found : {'Yes' if Config.JWT_SECRET else 'No'}")
print("=" * 60)