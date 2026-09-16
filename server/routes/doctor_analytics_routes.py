from flask import Blueprint

from controllers.doctor_analytics_controller import DoctorAnalyticsController
from middleware.auth_middleware import jwt_required, roles_required


doctor_analytics_bp = Blueprint(
    "doctor_analytics",
    __name__,
    url_prefix="/api/doctor"
)


@doctor_analytics_bp.route(
    "/analytics",
    methods=["GET"]
)
@jwt_required
@roles_required("doctor")
def get_dashboard_analytics():
    return DoctorAnalyticsController.get_dashboard_analytics()