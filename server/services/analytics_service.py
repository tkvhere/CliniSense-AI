from models.report_model import ReportModel


class AnalyticsService:

    @staticmethod
    def detect_report_type(analysis):

        if not isinstance(analysis, dict):
            return "unknown"

        report_type = analysis.get("report_type")

        if isinstance(report_type, str) and report_type.strip():
            return report_type.strip().lower()

        nested_analysis = analysis.get("analysis")

        if isinstance(nested_analysis, dict):
            report_type = nested_analysis.get("report_type")

            if isinstance(report_type, str) and report_type.strip():
                return report_type.strip().lower()

        results = analysis.get("results", {})

        if not isinstance(results, dict):
            return "unknown"

        parameter_names = {
            str(key).strip().lower()
            for key in results.keys()
        }

        if parameter_names.intersection({
            "hemoglobin",
            "haemoglobin",
            "wbc",
            "white blood cells",
            "rbc",
            "red blood cells",
            "platelets",
            "mcv",
            "mch",
            "mchc"
        }):
            return "cbc"

        if parameter_names.intersection({
            "total cholesterol",
            "cholesterol",
            "ldl",
            "hdl",
            "triglycerides",
            "vldl"
        }):
            return "lipid"

        if parameter_names.intersection({
            "glucose",
            "fasting glucose",
            "blood glucose",
            "hba1c",
            "hb1ac"
        }):
            return "diabetes"

        if parameter_names.intersection({
            "alt",
            "ast",
            "alp",
            "bilirubin",
            "total bilirubin",
            "direct bilirubin",
            "albumin"
        }):
            return "liver"

        if parameter_names.intersection({
            "creatinine",
            "urea",
            "blood urea",
            "egfr",
            "uric acid"
        }):
            return "kidney"

        if parameter_names.intersection({
            "tsh",
            "t3",
            "t4",
            "free t3",
            "free t4"
        }):
            return "thyroid"

        return "unknown"

    @staticmethod
    def extract_patient_name(report, analysis):

        patient_name = report.get("patient_name")

        if isinstance(patient_name, str) and patient_name.strip():
            return patient_name.strip()

        patient_data = analysis.get("patient_data")

        if isinstance(patient_data, dict):
            patient_name = (
                patient_data.get("name")
                or patient_data.get("patient_name")
                or patient_data.get("patientName")
            )

            if isinstance(patient_name, str) and patient_name.strip():
                return patient_name.strip()

        nested_analysis = analysis.get("analysis")

        if isinstance(nested_analysis, dict):
            patient_data = nested_analysis.get("patient_data")

            if isinstance(patient_data, dict):
                patient_name = (
                    patient_data.get("name")
                    or patient_data.get("patient_name")
                    or patient_data.get("patientName")
                )

                if isinstance(patient_name, str) and patient_name.strip():
                    return patient_name.strip()

        ocr_text = report.get("ocr_text", "")

        if isinstance(ocr_text, str) and ocr_text.strip():

            lines = [
                line.strip()
                for line in ocr_text.splitlines()
                if line.strip()
            ]

            for index, line in enumerate(lines):

                normalized_line = line.lower().replace(":", "").strip()

                if normalized_line in {
                    "patient name",
                    "patientname"
                }:

                    if index + 1 < len(lines):

                        candidate = lines[index + 1].strip()

                        if candidate:

                            candidate_lower = candidate.lower()

                            if candidate_lower not in {
                                "age",
                                "gender",
                                "sex",
                                "hemoglobin",
                                "rbc",
                                "wbc",
                                "platelets"
                            }:
                                return candidate

        return None

    @staticmethod
    def get_dashboard_summary(user_id):

        reports = ReportModel.find_by_user(user_id)

        total_reports = len(reports)

        patient_names = set()
        confidences = []
        high_risk_cases = 0

        risk_distribution = {
            "low": 0,
            "medium": 0,
            "high": 0
        }

        report_type_distribution = {}
        timeline_distribution = {}
        recent_activity = []

        for report in reports:

            created_at = report.get("created_at")

            if hasattr(created_at, "strftime"):

                timeline_date = created_at.strftime("%Y-%m-%d")

                timeline_distribution[timeline_date] = (
                    timeline_distribution.get(timeline_date, 0) + 1
                )

            analysis = report.get("analysis", {})

            if not isinstance(analysis, dict):
                continue

            patient_name = AnalyticsService.extract_patient_name(
                report,
                analysis
            )

            if isinstance(patient_name, str):

                patient_name = patient_name.strip().lower()

                if patient_name:
                    patient_names.add(patient_name)

            confidence = analysis.get("confidence")

            if confidence is None:

                nested_analysis = analysis.get("analysis", {})

                if isinstance(nested_analysis, dict):
                    confidence = nested_analysis.get("confidence")

            if isinstance(confidence, (int, float)):

                if 0 <= confidence <= 1:
                    confidence = confidence * 100

                confidence = min(max(confidence, 0), 100)

                confidences.append(confidence)

            risk_level = analysis.get("risk_level")

            if not risk_level:

                nested_analysis = analysis.get("analysis", {})

                if isinstance(nested_analysis, dict):
                    risk_level = nested_analysis.get("risk_level")

            normalized_risk = ""

            if isinstance(risk_level, str):

                normalized_risk = risk_level.strip().lower()

                if normalized_risk == "high":

                    high_risk_cases += 1
                    risk_distribution["high"] += 1

                elif normalized_risk in ["moderate", "medium"]:

                    risk_distribution["medium"] += 1

                elif normalized_risk == "low":

                    risk_distribution["low"] += 1

            report_type = AnalyticsService.detect_report_type(
                analysis
            )

            if report_type != "unknown":

                report_type_distribution[report_type] = (
                    report_type_distribution.get(report_type, 0) + 1
                )

            original_filename = report.get(
                "original_filename",
                "Medical Report"
            )

            activity_timestamp = created_at

            if hasattr(activity_timestamp, "isoformat"):
                activity_timestamp = activity_timestamp.isoformat()

            report_type_label = (
                report_type.upper()
                if report_type != "unknown"
                else "Medical"
            )

            recent_activity.append({
                "type": "analysis_completed",
                "title": f"{report_type_label} Report Analysis Completed",
                "filename": original_filename,
                "reportType": report_type,
                "riskLevel": normalized_risk,
                "timestamp": activity_timestamp
            })

        recent_activity = recent_activity[:5]

        total_patients = len(patient_names)

        average_confidence = (
            round(sum(confidences) / len(confidences), 1)
            if confidences
            else 0
        )

        return {
            "summary": {
                "totalReports": total_reports,
                "totalPatients": total_patients,
                "averageConfidence": average_confidence,
                "highRiskCases": high_risk_cases
            },
            "riskDistribution": risk_distribution,
            "reportTypeDistribution": report_type_distribution,
            "timeline": timeline_distribution,
            "recentActivity": recent_activity
        }