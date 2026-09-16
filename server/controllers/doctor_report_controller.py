from flask import g
import traceback

from config.response import success_response, error_response
from services.doctor_report_service import DoctorReportService


class DoctorReportController:

    @staticmethod
    def get_patient_reports(patient_id):
        try:
            doctor_id = g.current_user["_id"]

            result = DoctorReportService.get_patient_reports(
                doctor_id,
                patient_id
            )

            if not result["success"]:
                return error_response(
                    result["message"],
                    403
                )

            return success_response(
                result["message"],
                result["reports"]
            )

        except Exception:
            traceback.print_exc()

            return error_response(
                "Unable to fetch patient reports.",
                500
            )