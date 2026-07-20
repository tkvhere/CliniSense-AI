from ai.severity import SeverityEngine
from ai.recommendation_engine import RecommendationEngine


class ReportBuilder:

    @staticmethod
    def build(report_type, analysis):

        results = analysis.get("results", {})

        findings = []
        patient_data = {}

        abnormal_parameters = []
        normal_parameters = []

        abnormal = 0

        for _, item in results.items():

            patient_data[item["name"]] = (
                f'{item["value"]} {item["unit"]}'
            )

            if item["status"] == "Normal":

                normal_parameters.append({
                    "name": item["name"],
                    "value": item["value"],
                    "unit": item["unit"],
                    "status": item["status"],
                })

                findings.append(
                    f'{item["name"]} is within the normal range.'
                )

            else:

                abnormal += 1

                abnormal_parameters.append({
                    "name": item["name"],
                    "value": item["value"],
                    "unit": item["unit"],
                    "status": item["status"],
                })

                findings.append(
                    f'{item["name"]} is {item["status"]}.'
                )

        total = max(len(results), 1)

        health_score = max(
            40,
            round(((total - abnormal) / total) * 100)
        )

        if health_score >= 80:
            risk = "Low"
        elif health_score >= 60:
            risk = "Moderate"
        else:
            risk = "High"

        summary = (
            f"{report_type.upper()} analysis completed. "
            f"{abnormal} abnormal parameter(s) detected."
        )

        # -----------------------------
        # Clinical Interpretation
        # -----------------------------

        if abnormal == 0:

            clinical_interpretation = (
                f"The {report_type.upper()} report appears to be within "
                "normal limits. No clinically significant abnormalities "
                "were identified during AI analysis."
            )

        else:

            clinical_interpretation = (
                f"The AI analysis identified {abnormal} abnormal "
                f"parameter(s) in this {report_type.upper()} report. "
                "These findings should be clinically correlated and "
                "reviewed by a qualified healthcare professional."
            )

        # -----------------------------
        # Additional AI Outputs
        # -----------------------------

        follow_up_required = abnormal > 0

        severity = SeverityEngine.calculate(
            abnormal_parameters
        )

        recommendations = RecommendationEngine.generate(
            abnormal_parameters
        )

        # -----------------------------
        # Final Response
        # -----------------------------

        return {

            "summary": summary,

            "clinical_interpretation": clinical_interpretation,

            "follow_up_required": follow_up_required,

            "findings": findings,

            "recommendations": recommendations,

            "patient_data": patient_data,

            "abnormal_parameters": abnormal_parameters,

            "normal_parameters": normal_parameters,

            "confidence": 0.95,

            "health_score": health_score,

            "risk_level": risk,

            "severity": severity,

            "results": results,
        }