class RecommendationEngine:
    """
    Generates parameter-specific recommendations
    based on abnormal laboratory findings.
    """

    RECOMMENDATIONS = {
        "LDL": {
            "medical": [
                "Discuss cholesterol management with your healthcare provider."
            ],
            "diet": [
                "Reduce saturated and trans fats.",
                "Increase soluble fiber intake."
            ],
            "lifestyle": [
                "Exercise regularly.",
                "Maintain a healthy body weight."
            ],
            "monitoring": [
                "Repeat lipid profile as advised by your physician."
            ]
        },

        "HDL": (
            "Increase aerobic exercise, consume healthy fats, and maintain "
            "a healthy body weight."
        ),

        "Triglycerides": (
            "Reduce sugar and alcohol intake, exercise regularly, and "
            "follow a balanced diet."
        ),

        "Total Cholesterol": (
            "Limit high-cholesterol foods and maintain a heart-healthy lifestyle."
        ),

        "HbA1c": (
            "Monitor blood glucose regularly, follow your diabetes care plan, "
            "and consult your healthcare provider."
        ),

        "Creatinine": (
            "Stay hydrated and consult your healthcare provider to evaluate "
            "kidney function."
        ),

        "TSH": (
            "Discuss thyroid function with your healthcare provider for "
            "further evaluation if needed."
        ),
    }

    @classmethod
    def generate(cls, abnormal_parameters):

        recommendations = []

        for parameter in abnormal_parameters:

            name = parameter.get("name", "")

            recommendation = cls.RECOMMENDATIONS.get(name)

            if recommendation is None:

                recommendations.append({
                    "parameter": name,
                    "medical": [
                        f"Consult a healthcare professional regarding abnormal {name} levels."
                    ],
                    "diet": [],
                    "lifestyle": [],
                    "monitoring": []
                })

            elif isinstance(recommendation, str):

                recommendations.append({
                    "parameter": name,
                    "medical": [recommendation],
                    "diet": [],
                    "lifestyle": [],
                    "monitoring": []
                })

            else:

                recommendations.append({
                    "parameter": name,
                    "medical": recommendation.get("medical", []),
                    "diet": recommendation.get("diet", []),
                    "lifestyle": recommendation.get("lifestyle", []),
                    "monitoring": recommendation.get("monitoring", [])
                })

        return recommendations