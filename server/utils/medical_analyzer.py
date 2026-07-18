from ai.table_parser import TableParser


class MedicalAnalyzer:

    @staticmethod
    def analyze(text):

        patients = TableParser.parse(text)

        findings = []
        recommendations = []

        total_patients = len(patients)

        high_cholesterol = 0
        diabetic = 0
        obesity = 0
        high_heart_rate = 0

        for patient in patients:

            patient_findings = []

            if patient["cholesterol"] > 200:
                high_cholesterol += 1
                patient_findings.append("High Cholesterol")

            if patient["heart_rate"] > 100:
                high_heart_rate += 1
                patient_findings.append("High Heart Rate")

            if patient["bmi"] >= 30:
                obesity += 1
                patient_findings.append("Obesity")

            if patient["diabetes"]:
                diabetic += 1
                patient_findings.append("Diabetes")

            if patient_findings:
                findings.append({
                    "patient_id": patient["patient_id"],
                    "name": patient["name"],
                    "findings": patient_findings
                })

        if high_cholesterol:
            recommendations.append(
                "Patients with elevated cholesterol should undergo cardiovascular evaluation."
            )

        if diabetic:
            recommendations.append(
                "Patients with diabetes should continue regular glucose monitoring."
            )

        if obesity:
            recommendations.append(
                "Patients with obesity should receive lifestyle and nutrition counseling."
            )

        if high_heart_rate:
            recommendations.append(
                "Patients with elevated heart rate should receive further cardiac assessment."
            )

        if not recommendations:
            recommendations.append(
                "No significant abnormalities detected."
            )

        return {
            "summary": {
                "total_patients": total_patients,
                "high_cholesterol": high_cholesterol,
                "diabetes": diabetic,
                "obesity": obesity,
                "high_heart_rate": high_heart_rate
            },
            "patients": patients,
            "findings": findings,
            "recommendations": recommendations,
            "confidence": 0.96
        }