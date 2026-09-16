from flask import Blueprint

from controllers.analytics_controller import AnalyticsController
from middleware.auth_middleware import jwt_required

analytics_bp = Blueprint(
    "analytics",
    __name__,
    url_prefix="/api/analytics"
)

@analytics_bp.route(
    "/dashboard",
    methods=["GET"]
)
@jwt_required
def get_dashboard_analytics():
    return AnalyticsController.get_dashboard_analytics()