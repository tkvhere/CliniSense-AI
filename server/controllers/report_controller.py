# ============================================
# CliniSense AI
# Report Controller
# ============================================

from flask import request, g, jsonify

from config.response import success_response, error_response
from services.report_service import ReportService
from models.report_model import ReportModel
import traceback


class ReportController:

    @staticmethod
    def upload_report():

        try:

            if "report" not in request.files:
                return error_response(
                    "No report file was uploaded.",
                    400
                )

            file = request.files["report"]

            if file.filename == "":
                return error_response(
                    "Please select a report file.",
                    400
                )

            result = ReportService.upload_report(file)

            return success_response(
                "Report uploaded successfully.",
                result
            )

        except ValueError as e:

            return error_response(
                str(e),
                400
            )

        except Exception as e:

            traceback.print_exc()

            return error_response(
                str(e),
                500
            )

    @staticmethod
    def get_my_reports():

        try:

            user_id = g.current_user["_id"]

            reports = ReportModel.find_by_user(user_id)

            for report in reports:

                report["_id"] = str(report["_id"])

                if "user_id" in report:
                    report["user_id"] = str(report["user_id"])

            return success_response(
                "Reports fetched successfully.",
                reports
            )

        except Exception as e:

            traceback.print_exc()

            return error_response(
                "Unable to fetch reports.",
                500
            )

    @staticmethod
    def get_report(report_id):

        try:

            report = ReportModel.find_by_id(report_id)

            if not report:
                return error_response(
                    "Report not found.",
                    404
                )

            report["_id"] = str(report["_id"])

            if "user_id" in report:
                report["user_id"] = str(report["user_id"])

            return success_response(
                "Report fetched successfully.",
                report
            )

        except Exception as e:

            traceback.print_exc()

            return error_response(
                "Unable to fetch report.",
                500
            )

    @staticmethod
    def delete_report(report_id):

        try:

            result = ReportService.delete_report(report_id)

            if not result["success"]:
                return jsonify(result), 404

            return jsonify(result), 200

        except Exception as e:

            traceback.print_exc()

            return jsonify(
                {
                    "success": False,
                    "message": str(e)
                }
            ), 500