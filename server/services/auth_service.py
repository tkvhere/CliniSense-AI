# ============================================
# CliniSense AI
# Authentication Service
# Business Logic
# ============================================

import bcrypt

from models.user_model import UserModel
from utils.validators import Validator, ValidationError
from utils.jwt_helper import JWTHelper


class AuthService:

    @staticmethod
    def signup(data):
        """
        Register a new user.
        """

        data = Validator.validate_signup_data(data)

        if UserModel.email_exists(data["email"]):
            raise ValidationError("Email already registered.")

        hashed_password = bcrypt.hashpw(
            data["password"].encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        user = {
            "full_name": data["full_name"],
            "email": data["email"],
            "password": hashed_password,
            "role": data["role"],
            "is_verified": False,
            "is_active": True
        }

        user_id = UserModel.create_user(user)

        return {
            "user_id": user_id
        }

    @staticmethod
    def login(data):
        """
        Authenticate user.
        """

        data = Validator.validate_login_data(data)

        print("\n========== LOGIN DEBUG ==========")
        print("Login request:", data)

        user = UserModel.find_by_email(data["email"])

        print("User found:", user)

        if not user:
            print("❌ User not found")
            raise ValidationError("Invalid email or password.")

        if not user.get("is_active", True):
            print("❌ User account is disabled")
            raise ValidationError("Account has been disabled.")

        print("Stored Password Hash:", user["password"])

        password_matches = bcrypt.checkpw(
            data["password"].encode("utf-8"),
            user["password"].encode("utf-8")
        )

        print("Password Matches:", password_matches)

        if not password_matches:
            print("❌ Password verification failed")
            raise ValidationError("Invalid email or password.")

        print("✅ Login Successful")

        token = JWTHelper.generate_token(user)

        return {
            "token": token,
            "user": UserModel.sanitize_user(user)
        }