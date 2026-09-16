from flask import Blueprint

from controllers.doctor_report_controller import DoctorReportController
from middleware.auth_middleware import jwt_required, roles_required


doctor_report_bp = Blueprint(
    "doctor_reports",
    __name__,
    url_prefix="/api/doctor"
)


@doctor_report_bp.route(
    "/patients/<patient_id>/reports",
    methods=["GET"]
)
@jwt_required
@roles_required("doctor")
def get_patient_reports(patient_id):
    return DoctorReportController.get_patient_reports(
        patient_id
    )