from flask import g
import traceback

from config.response import success_response, error_response
from services.doctor_high_risk_service import DoctorHighRiskService


class DoctorHighRiskController:

    @staticmethod
    def get_high_risk_reports():
        try:
            doctor_id = g.current_user["_id"]

            result = DoctorHighRiskService.get_high_risk_reports(
                doctor_id
            )

            return success_response(
                "High risk reports fetched successfully.",
                result
            )

        except Exception:
            traceback.print_exc()
            return error_response(
                "Unable to fetch high risk reports.",
                500
            )