# ============================================
# CliniSense AI
# Authentication Routes
# ============================================

from flask import Blueprint

from controllers.auth_controller import AuthController
from middleware.auth_middleware import jwt_required

auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)


# --------------------------------------------
# Public Routes
# --------------------------------------------

auth_bp.route(
    "/signup",
    methods=["POST"]
)(AuthController.signup)

auth_bp.route(
    "/login",
    methods=["POST"]
)(AuthController.login)


# --------------------------------------------
# Protected Routes
# --------------------------------------------

@auth_bp.route(
    "/me",
    methods=["GET"]
)
@jwt_required
def current_user():

    from flask import g
    from config.response import success_response
    from models.user_model import UserModel

    return success_response(
        "User profile fetched successfully.",
        UserModel.sanitize_user(g.current_user)
    )