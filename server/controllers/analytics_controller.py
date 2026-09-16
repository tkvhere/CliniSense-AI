# ============================================
# CliniSense AI
# Analytics Controller
# ============================================

from flask import g
import traceback

from config.response import success_response, error_response
from services.analytics_service import AnalyticsService


class AnalyticsController:

    @staticmethod
    def get_dashboard_analytics():

        try:

            user_id = g.current_user["_id"]

            analytics = AnalyticsService.get_dashboard_summary(user_id)

            return success_response(
                "Analytics fetched successfully.",
                analytics
            )

        except Exception as e:

            traceback.print_exc()

            return error_response(
                str(e),
                500
            )