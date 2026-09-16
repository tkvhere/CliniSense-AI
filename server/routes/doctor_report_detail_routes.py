from flask import Blueprint

from controllers.doctor_report_detail_controller import DoctorReportDetailController
from middleware.auth_middleware import jwt_required, roles_required


doctor_report_detail_bp = Blueprint(
    "doctor_report_detail",
    __name__,
    url_prefix="/api/doctor"
)


@doctor_report_detail_bp.route(
    "/reports/<report_id>",
    methods=["GET"]
)
@jwt_required
@roles_required("doctor")
def get_report(report_id):
    return DoctorReportDetailController.get_report(report_id)