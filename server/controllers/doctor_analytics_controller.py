from flask import g
import traceback

from config.response import success_response, error_response
from services.doctor_analytics_service import DoctorAnalyticsService


class DoctorAnalyticsController:

    @staticmethod
    def get_dashboard_analytics():
        try:
            doctor_id = g.current_user["_id"]

            analytics = DoctorAnalyticsService.get_dashboard_summary(
                doctor_id
            )

            return success_response(
                "Doctor analytics fetched successfully.",
                analytics
            )

        except Exception:
            traceback.print_exc()
            return error_response(
                "Unable to fetch doctor analytics.",
                500
            )