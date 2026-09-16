from collections import Counter
from models.doctor_patient_model import DoctorPatientModel
from models.report_model import ReportModel


class DoctorAnalyticsService:

    @staticmethod
    def detect_report_type(report):
        report_type = report.get("report_type")

        if report_type:
            return str(report_type).lower()

        analysis = report.get("analysis", {})

        if not isinstance(analysis, dict):
            return "other"

        results = analysis.get("results", {})

        if not isinstance(results, dict):
            return "other"

        parameter_names = " ".join(
            str(key).lower()
            for key in results.keys()
        )

        if any(
            keyword in parameter_names
            for keyword in [
                "hemoglobin",
                "haemoglobin",
                "wbc",
                "rbc",
                "platelet"
            ]
        ):
            return "cbc"

        if any(
            keyword in parameter_names
            for keyword in [
                "cholesterol",
                "triglyceride",
                "hdl",
                "ldl"
            ]
        ):
            return "lipid"

        if any(
            keyword in parameter_names
            for keyword in [
                "glucose",
                "hba1c",
                "blood sugar"
            ]
        ):
            return "diabetes"

        if any(
            keyword in parameter_names
            for keyword in [
                "bilirubin",
                "alt",
                "ast",
                "sgpt",
                "sgot"
            ]
        ):
            return "liver"

        if any(
            keyword in parameter_names
            for keyword in [
                "creatinine",
                "urea",
                "egfr"
            ]
        ):
            return "kidney"

        if any(
            keyword in parameter_names
            for keyword in [
                "tsh",
                "t3",
                "t4"
            ]
        ):
            return "thyroid"

        return "other"

    @staticmethod
    def get_risk_level(report):
        analysis = report.get("analysis", {})

        if not isinstance(analysis, dict):
            return "low"

        risk_level = (
            analysis.get("risk_level")
            or report.get("risk_level")
            or ""
        )

        risk_level = str(risk_level).lower().strip()

        if risk_level in ["high", "moderate", "low"]:
            return risk_level

        if risk_level == "medium":
            return "moderate"

        return "low"

    @staticmethod
    def get_confidence(report):
        analysis = report.get("analysis", {})

        if not isinstance(analysis, dict):
            return None

        confidence = analysis.get("confidence")

        if confidence is None:
            confidence = report.get("confidence")

        if confidence is None:
            return None

        try:
            confidence = float(confidence)

            if confidence <= 1:
                confidence *= 100

            return confidence

        except (TypeError, ValueError):
            return None

    @staticmethod
    def get_dashboard_summary(doctor_id):
        assignments = DoctorPatientModel.find_by_doctor(doctor_id)

        patient_ids = [
            assignment.get("patient_id")
            for assignment in assignments
            if assignment.get("patient_id")
        ]

        reports = []

        for patient_id in patient_ids:
            patient_reports = ReportModel.find_by_patient(str(patient_id))
            reports.extend(patient_reports)

        risk_distribution = {
            "high": 0,
            "moderate": 0,
            "low": 0
        }

        report_type_distribution = Counter()
        timeline = Counter()
        confidence_values = []

        for report in reports:
            risk_level = DoctorAnalyticsService.get_risk_level(report)
            risk_distribution[risk_level] += 1

            report_type = DoctorAnalyticsService.detect_report_type(report)
            report_type_distribution[report_type] += 1

            created_at = report.get("created_at")

            if created_at:
                timeline[created_at.strftime("%Y-%m-%d")] += 1

            confidence = DoctorAnalyticsService.get_confidence(report)

            if confidence is not None:
                confidence_values.append(confidence)

        average_confidence = (
            round(
                sum(confidence_values) / len(confidence_values),
                2
            )
            if confidence_values
            else 0
        )

        total_reports = len(reports)

        high_risk_percentage = (
            round(
                (risk_distribution["high"] / total_reports) * 100,
                2
            )
            if total_reports
            else 0
        )

        recent_reports = sorted(
            reports,
            key=lambda report: report.get("created_at") or "",
            reverse=True
        )[:5]

        recent_activity = []

        for report in recent_reports:
            analysis = report.get("analysis", {})

            if not isinstance(analysis, dict):
                analysis = {}

            recent_activity.append({
                "filename": report.get(
                    "original_filename",
                    report.get("filename", "Medical Report")
                ),
                "reportType": DoctorAnalyticsService.detect_report_type(
                    report
                ),
                "riskLevel": DoctorAnalyticsService.get_risk_level(
                    report
                ),
                "confidence": DoctorAnalyticsService.get_confidence(
                    report
                ),
                "timestamp": (
                    report.get("created_at").isoformat()
                    if report.get("created_at")
                    else None
                ),
                "status": report.get(
                    "status",
                    analysis.get("status", "completed")
                )
            })

        return {
            "totalPatients": len(patient_ids),
            "totalReports": total_reports,
            "averageConfidence": average_confidence,
            "highRiskPercentage": high_risk_percentage,
            "riskDistribution": risk_distribution,
            "reportTypeDistribution": dict(report_type_distribution),
            "timeline": dict(sorted(timeline.items())),
            "recentActivity": recent_activity
        }