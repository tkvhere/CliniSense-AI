# ============================================
# CliniSense AI
# Input Validation Utilities
# ============================================

import re


class ValidationError(Exception):
    """
    Custom validation exception.
    """
    pass


class Validator:

    VALID_ROLES = ["patient", "doctor", "admin"]

    @staticmethod
    def validate_full_name(full_name):
        """
        Validate full name.
        """

        if not full_name:
            raise ValidationError("Full name is required.")

        full_name = full_name.strip()

        if len(full_name) < 3:
            raise ValidationError(
                "Full name must contain at least 3 characters."
            )

        if len(full_name) > 100:
            raise ValidationError(
                "Full name cannot exceed 100 characters."
            )

        return full_name

    @staticmethod
    def validate_email(email):
        """
        Validate email address.
        """

        if not email:
            raise ValidationError("Email is required.")

        email = email.strip().lower()

        email_regex = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

        if not re.match(email_regex, email):
            raise ValidationError("Invalid email address.")

        return email

    @staticmethod
    def validate_password(password):
        """
        Password Rules

        Minimum 8 characters

        At least:
        - 1 uppercase
        - 1 lowercase
        - 1 number
        """

        if not password:
            raise ValidationError("Password is required.")

        if len(password) < 8:
            raise ValidationError(
                "Password must be at least 8 characters long."
            )

        if not re.search(r"[A-Z]", password):
            raise ValidationError(
                "Password must contain at least one uppercase letter."
            )

        if not re.search(r"[a-z]", password):
            raise ValidationError(
                "Password must contain at least one lowercase letter."
            )

        if not re.search(r"[0-9]", password):
            raise ValidationError(
                "Password must contain at least one number."
            )

        return password

    @staticmethod
    def validate_role(role):
        """
        Validate user role.
        """

        if not role:
            raise ValidationError("Role is required.")

        role = role.lower()

        if role not in Validator.VALID_ROLES:
            raise ValidationError(
                f"Role must be one of: {', '.join(Validator.VALID_ROLES)}"
            )

        return role

    @staticmethod
    def validate_signup_data(data):
        """
        Validate signup request body.
        """

        return {
            "full_name": Validator.validate_full_name(
                data.get("full_name")
            ),
            "email": Validator.validate_email(
                data.get("email")
            ),
            "password": Validator.validate_password(
                data.get("password")
            ),
            "role": Validator.validate_role(
                data.get("role", "patient")
            )
        }

    @staticmethod
    def validate_login_data(data):
        """
        Validate login request body.
        """

        return {
            "email": Validator.validate_email(
                data.get("email")
            ),
            "password": data.get("password")
        }