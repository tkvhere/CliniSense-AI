import bcrypt

from models.user_model import UserModel
from utils.validators import Validator, ValidationError
from utils.jwt_helper import JWTHelper


class AuthService:

    @staticmethod
    def signup(data):
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
        data = Validator.validate_login_data(data)

        user = UserModel.find_by_email(data["email"])

        if not user:
            raise ValidationError("Invalid email or password.")

        if not user.get("is_active", True):
            raise ValidationError("Account has been disabled.")

        if user.get("role") != data["role"]:
            raise ValidationError(
                f"This account is registered as a {user.get('role')}."
            )

        password_matches = bcrypt.checkpw(
            data["password"].encode("utf-8"),
            user["password"].encode("utf-8")
        )

        if not password_matches:
            raise ValidationError("Invalid email or password.")

        token = JWTHelper.generate_token(user)

        return {
            "token": token,
            "user": UserModel.sanitize_user(user)
        }
    @staticmethod
    def update_profile(user_id, data):
        full_name = data.get("full_name", "").strip()
        email = data.get("email", "").strip().lower()

        if not full_name:
            raise ValidationError("Full name is required.")

        if not email:
            raise ValidationError("Email is required.")

        existing_user = UserModel.find_by_email(email)

        if existing_user and str(existing_user["_id"]) != str(user_id):
            raise ValidationError("Email already registered.")

        update_data = {
            "full_name": full_name,
            "email": email
        }

        UserModel.update_user(user_id, update_data)

        updated_user = UserModel.find_by_id(user_id)

        return UserModel.sanitize_user(updated_user)