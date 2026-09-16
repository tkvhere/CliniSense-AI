from flask import g, request
import traceback

from config.response import success_response, error_response
from services.doctor_patient_service import DoctorPatientService


class DoctorPatientController:

    @staticmethod
    def assign_patient():
        try:
            doctor_id = g.current_user["_id"]
            data = request.get_json()

            patient_id = data.get("patient_id")

            if not patient_id:
                return error_response(
                    "Patient ID is required.",
                    400
                )

            result = DoctorPatientService.assign_patient(
                doctor_id,
                patient_id
            )

            if not result["success"]:
                return error_response(
                    result["message"],
                    400
                )

            return success_response(
                result["message"],
                {
                    "assignment_id": result["assignment_id"]
                }
            )

        except Exception:
            traceback.print_exc()

            return error_response(
                "Unable to assign patient.",
                500
            )

    @staticmethod
    def get_my_patients():
        try:
            doctor_id = g.current_user["_id"]

            patients = DoctorPatientService.get_doctor_patients(
                doctor_id
            )

            return success_response(
                "Patients fetched successfully.",
                patients
            )

        except Exception:
            traceback.print_exc()

            return error_response(
                "Unable to fetch patients.",
                500
            )

    @staticmethod
    def remove_patient(patient_id):
        try:
            doctor_id = g.current_user["_id"]

            result = DoctorPatientService.remove_patient(
                doctor_id,
                patient_id
            )

            if not result["success"]:
                return error_response(
                    result["message"],
                    404
                )

            return success_response(
                result["message"],
                None
            )

        except Exception:
            traceback.print_exc()

            return error_response(
                "Unable to remove patient.",
                500
            )