from flask import g
import traceback

from config.response import success_response, error_response
from services.doctor_report_detail_service import DoctorReportDetailService


class DoctorReportDetailController:

    @staticmethod
    def get_report(report_id):
        try:
            doctor_id = g.current_user["_id"]

            result = DoctorReportDetailService.get_report(
                doctor_id,
                report_id
            )

            if not result["success"]:
                return error_response(
                    result["message"],
                    result["status_code"]
                )

            return success_response(
                result["message"],
                result["report"]
            )

        except Exception:
            traceback.print_exc()

            return error_response(
                "Unable to fetch report details.",
                500
            )