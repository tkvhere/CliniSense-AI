# ============================================
# CliniSense AI
# Report Routes
# ============================================

from flask import Blueprint

from controllers.report_controller import ReportController
from middleware.auth_middleware import jwt_required

report_bp = Blueprint(
    "reports",
    __name__,
    url_prefix="/api/reports"
)

# --------------------------------------------
# Upload Report
# --------------------------------------------

@report_bp.route(
    "/upload",
    methods=["POST"]
)
@jwt_required
def upload_report():
    return ReportController.upload_report()


# --------------------------------------------
# Get All Reports
# --------------------------------------------

@report_bp.route(
    "/my-reports",
    methods=["GET"]
)
@jwt_required
def get_my_reports():
    return ReportController.get_my_reports()


# --------------------------------------------
# Get Single Report
# --------------------------------------------

@report_bp.route(
    "/<report_id>",
    methods=["GET"]
)
@jwt_required
def get_report(report_id):
    return ReportController.get_report(report_id)

@report_bp.route(
    "/<report_id>",
    methods=["DELETE"]
)
@jwt_required
def delete_report(report_id):
    return ReportController.delete_report(report_id)