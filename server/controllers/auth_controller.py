# ============================================
# CliniSense AI
# Authentication Controller
# ============================================

from flask import request

from config.response import success_response, error_response
from services.auth_service import AuthService
from utils.validators import ValidationError


class AuthController:
    """
    Handles all authentication HTTP requests.
    """

    @staticmethod
    def signup():
        """
        POST /api/auth/signup
        """

        try:
            data = request.get_json()

            if not data:
                return error_response(
                    "Request body is required.",
                    400
                )

            result = AuthService.signup(data)

            return success_response(
                "User registered successfully.",
                result,
                201
            )

        except ValidationError as e:
            return error_response(str(e), 400)

        except Exception as e:
            return error_response(
                f"Internal Server Error: {str(e)}",
                500
            )

    @staticmethod
    def login():
        """
        POST /api/auth/login
        """

        try:
            data = request.get_json()

            if not data:
                return error_response(
                    "Request body is required.",
                    400
                )

            result = AuthService.login(data)

            return success_response(
                "Login successful.",
                result,
                200
            )

        except ValidationError as e:
            return error_response(str(e), 400)

        except Exception as e:
            return error_response(
                f"Internal Server Error: {str(e)}",
                500
            )
    @staticmethod
    def update_profile():
        try:
            from flask import g

            data = request.get_json()

            if not data:
                return error_response(
                    "Request body is required.",
                    400
                )

            user_id = g.current_user["_id"]

            result = AuthService.update_profile(
                user_id,
                data
            )

            return success_response(
                "Profile updated successfully.",
                result,
                200
            )

        except ValidationError as e:
            return error_response(str(e), 400)

        except Exception as e:
            return error_response(
                f"Internal Server Error: {str(e)}",
                500
            )