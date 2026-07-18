# ============================================
# CliniSense AI
# JWT Helper
# Handles JWT Token Generation & Verification
# ============================================

import jwt
from datetime import datetime, timedelta
from flask import current_app


class JWTHelper:
    """
    Handles JWT token generation and verification.
    """

    @staticmethod
    def generate_token(user):
        """
        Generate JWT token for authenticated user.
        """

        payload = {
            "user_id": str(user["_id"]),
            "email": user["email"],
            "role": user["role"],
            "exp": datetime.utcnow() + timedelta(hours=24),
            "iat": datetime.utcnow()
        }

        token = jwt.encode(
            payload,
            current_app.config["JWT_SECRET"],
            algorithm="HS256"
        )

        return token

    @staticmethod
    def verify_token(token):
        """
        Verify JWT token.
        Returns decoded payload if valid.
        """

        try:
            payload = jwt.decode(
                token,
                current_app.config["JWT_SECRET"],
                algorithms=["HS256"]
            )

            return payload

        except jwt.ExpiredSignatureError:
            return None

        except jwt.InvalidTokenError:
            return None