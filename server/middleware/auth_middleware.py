# ============================================
# CliniSense AI
# Authentication & Role Middleware
# ============================================

from functools import wraps
from flask import request, g

from config.response import error_response
from utils.jwt_helper import JWTHelper
from models.user_model import UserModel


def jwt_required(func):
    """
    Verify JWT before accessing protected routes.
    """

    @wraps(func)
    def wrapper(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return error_response(
                "Authorization token is missing.",
                401
            )

        if not auth_header.startswith("Bearer "):
            return error_response(
                "Invalid authorization format.",
                401
            )

        token = auth_header.split(" ")[1]

        payload = JWTHelper.verify_token(token)

        if not payload:
            return error_response(
                "Invalid or expired token.",
                401
            )

        user = UserModel.find_by_id(payload["user_id"])

        if not user:
            return error_response(
                "User not found.",
                401
            )

        if not user.get("is_active", True):
            return error_response(
                "Account has been disabled.",
                403
            )

        # Store authenticated user
        g.current_user = UserModel.sanitize_user(user)

        return func(*args, **kwargs)

    return wrapper


def roles_required(*roles):
    """
    Restrict endpoint access by role.
    """

    def decorator(func):

        @wraps(func)
        def wrapper(*args, **kwargs):

            current_user = g.current_user

            if current_user["role"] not in roles:
                return error_response(
                    "You do not have permission to access this resource.",
                    403
                )

            return func(*args, **kwargs)

        return wrapper

    return decorator