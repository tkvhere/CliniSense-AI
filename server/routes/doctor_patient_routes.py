from flask import Blueprint

from controllers.doctor_patient_controller import DoctorPatientController
from middleware.auth_middleware import jwt_required, roles_required


doctor_patient_bp = Blueprint(
    "doctor_patient",
    __name__,
    url_prefix="/api/doctor"
)


@doctor_patient_bp.route(
    "/patients",
    methods=["GET"]
)
@jwt_required
@roles_required("doctor")
def get_my_patients():
    return DoctorPatientController.get_my_patients()


@doctor_patient_bp.route(
    "/patients",
    methods=["POST"]
)
@jwt_required
@roles_required("doctor")
def assign_patient():
    return DoctorPatientController.assign_patient()


@doctor_patient_bp.route(
    "/patients/<patient_id>",
    methods=["DELETE"]
)
@jwt_required
@roles_required("doctor")
def remove_patient(patient_id):
    return DoctorPatientController.remove_patient(patient_id)