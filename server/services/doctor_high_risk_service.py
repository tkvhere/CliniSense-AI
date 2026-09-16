from models.doctor_patient_model import DoctorPatientModel
from models.report_model import ReportModel
from models.user_model import UserModel
from services.doctor_analytics_service import DoctorAnalyticsService

class DoctorHighRiskService:

    @staticmethod
    def get_high_risk_reports(doctor_id):
        assignments = DoctorPatientModel.find_by_doctor(doctor_id)

        high_risk_reports = []

        for assignment in assignments:
            patient_id = assignment.get("patient_id")

            if not patient_id:
                continue

            patient = UserModel.find_by_id(patient_id)

            if not patient:
                continue

            patient = UserModel.sanitize_user(patient)

            reports = ReportModel.find_by_patient(str(patient_id))

            for report in reports:
                analysis = report.get("analysis", {})

                if not isinstance(analysis, dict):
                    analysis = {}

                risk_level = (
                    analysis.get("risk_level")
                    or report.get("risk_level")
                    or ""
                )

                risk_level = str(risk_level).lower().strip()

                if risk_level != "high":
                    continue

                high_risk_reports.append({
                    "report_id": str(report.get("_id")),
                    "patient_id": str(patient_id),
                    "patient_name": patient.get("full_name"),
                    "patient_email": patient.get("email"),
                    "filename": report.get(
                        "original_filename",
                        report.get("filename", "Medical Report")
                    ),
                    "report_type": DoctorAnalyticsService.detect_report_type(
                       report
                    ),
                    "risk_level": "high",
                    "health_score": analysis.get("health_score"),
                    "confidence": analysis.get("confidence"),
                    "status": report.get(
                        "status",
                        "completed"
                    ),
                    "created_at": (
                        report.get("created_at").isoformat()
                        if report.get("created_at")
                        else None
                    )
                })

        high_risk_reports.sort(
            key=lambda report: report.get("created_at") or "",
            reverse=True
        )

        return {
            "total": len(high_risk_reports),
            "reports": high_risk_reports
        }