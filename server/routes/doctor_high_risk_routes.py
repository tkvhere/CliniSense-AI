from flask import Blueprint

from controllers.doctor_high_risk_controller import DoctorHighRiskController
from middleware.auth_middleware import jwt_required, roles_required


doctor_high_risk_bp = Blueprint(
    "doctor_high_risk",
    __name__,
    url_prefix="/api/doctor"
)


@doctor_high_risk_bp.route(
    "/high-risk",
    methods=["GET"]
)
@jwt_required
@roles_required("doctor")
def get_high_risk_reports():
    return DoctorHighRiskController.get_high_risk_reports()