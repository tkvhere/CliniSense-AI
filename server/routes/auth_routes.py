from flask import Blueprint, g

from controllers.auth_controller import AuthController
from middleware.auth_middleware import jwt_required
from config.response import success_response
from models.user_model import UserModel

auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)

auth_bp.route(
    "/signup",
    methods=["POST"]
)(AuthController.signup)

auth_bp.route(
    "/login",
    methods=["POST"]
)(AuthController.login)


@auth_bp.route(
    "/me",
    methods=["GET"]
)
@jwt_required
def current_user():
    return success_response(
        "User profile fetched successfully.",
        UserModel.sanitize_user(g.current_user)
    )


@auth_bp.route(
    "/profile",
    methods=["PUT"]
)
@jwt_required
def update_profile():
    return AuthController.update_profile()