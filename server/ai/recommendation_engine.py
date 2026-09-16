class RecommendationEngine:
    """
    Generates parameter-specific recommendations
    based on abnormal laboratory findings.

    Recommendations are educational and should not replace
    professional medical evaluation or treatment.
    """

    RECOMMENDATIONS = {

        # =========================================================
        # CBC
        # =========================================================

        "Hemoglobin": {
            "medical": [
                "Discuss the abnormal hemoglobin result with your healthcare provider.",
                "Your clinician may evaluate possible causes such as nutritional deficiency, blood loss, or other underlying conditions based on your overall clinical picture."
            ],
            "diet": [
                "Maintain a balanced diet containing iron-rich foods such as leafy green vegetables, beans, lentils, and lean meats.",
                "Include vitamin C-rich foods to support dietary iron absorption."
            ],
            "lifestyle": [
                "Maintain adequate hydration and balanced nutrition.",
                "Avoid self-starting iron supplements unless recommended by your healthcare provider."
            ],
            "monitoring": [
                "Repeat complete blood count testing as advised by your physician.",
                "Additional iron-related testing may be considered by your healthcare provider when clinically appropriate."
            ]
        },

        "RBC": {
            "medical": [
                "Discuss the abnormal red blood cell count with your healthcare provider.",
                "Interpretation should consider hemoglobin, hematocrit, red-cell indices, symptoms, and other clinical findings."
            ],
            "diet": [
                "Maintain a balanced diet containing adequate iron, vitamin B12, folate, and protein.",
                "Include a variety of vegetables, legumes, whole grains, and nutrient-rich foods."
            ],
            "lifestyle": [
                "Maintain adequate hydration.",
                "Avoid making dietary or supplement changes specifically for this result without professional guidance."
            ],
            "monitoring": [
                "Repeat CBC testing as advised by your physician.",
                "Further evaluation may be recommended depending on the pattern of CBC abnormalities."
            ]
        },

        "WBC": {
            "medical": [
                "Discuss the elevated or abnormal white blood cell count with your healthcare provider.",
                "The result may require clinical correlation with symptoms, infection history, medications, and other laboratory findings."
            ],
            "diet": [
                "Maintain a balanced diet with adequate protein, fruits, vegetables, and whole foods.",
                "Stay adequately hydrated."
            ],
            "lifestyle": [
                "Get adequate rest and sleep.",
                "Monitor for symptoms such as persistent fever, unusual fatigue, or other changes in health and report concerning symptoms to your healthcare provider."
            ],
            "monitoring": [
                "Repeat CBC testing as advised by your physician.",
                "Your healthcare provider may consider differential white blood cell testing or additional evaluation when appropriate."
            ]
        },

        "Platelets": {
            "medical": [
                "Discuss the abnormal platelet count with your healthcare provider.",
                "Interpretation should consider symptoms, medications, medical history, and other blood-count results."
            ],
            "diet": [
                "Maintain a balanced diet rich in vegetables, fruits, whole grains, and adequate protein.",
                "Maintain adequate hydration."
            ],
            "lifestyle": [
                "Avoid unnecessary medication or supplement changes without medical advice.",
                "Report unusual bruising, prolonged bleeding, or other concerning symptoms to your healthcare provider."
            ],
            "monitoring": [
                "Repeat CBC testing as advised by your physician.",
                "Further hematological evaluation may be considered depending on the degree and persistence of the abnormality."
            ]
        },

        "Hematocrit": {
            "medical": [
                "Discuss the abnormal hematocrit result with your healthcare provider.",
                "Interpretation should be considered together with hemoglobin and other CBC parameters."
            ],
            "diet": [
                "Maintain a balanced diet with adequate iron, vitamin B12, folate, and protein.",
                "Include a variety of nutrient-rich whole foods."
            ],
            "lifestyle": [
                "Maintain adequate hydration.",
                "Avoid self-treatment with supplements unless advised by a healthcare professional."
            ],
            "monitoring": [
                "Repeat CBC testing as advised by your physician.",
                "Additional testing may be considered depending on the overall CBC pattern."
            ]
        },

        "MCV": {
            "medical": [
                "Discuss the abnormal mean corpuscular volume with your healthcare provider.",
                "Your clinician may evaluate nutritional status and other possible causes based on the complete CBC pattern."
            ],
            "diet": [
                "Maintain a balanced diet containing adequate iron, vitamin B12, and folate.",
                "Include leafy vegetables, legumes, whole grains, eggs, and other nutrient-rich foods."
            ],
            "lifestyle": [
                "Maintain balanced nutrition and adequate hydration.",
                "Avoid taking vitamin or mineral supplements without professional guidance."
            ],
            "monitoring": [
                "Repeat CBC testing as advised by your physician.",
                "Additional nutritional or hematological testing may be considered when clinically appropriate."
            ]
        },

        "MCH": {
            "medical": [
                "Discuss the abnormal mean corpuscular hemoglobin result with your healthcare provider.",
                "Interpretation should be based on the complete red-cell profile rather than this value alone."
            ],
            "diet": [
                "Maintain a balanced diet containing adequate iron, vitamin B12, and folate.",
                "Include a variety of vegetables, legumes, whole grains, and protein sources."
            ],
            "lifestyle": [
                "Maintain adequate hydration and balanced nutrition.",
                "Avoid self-prescribing supplements based only on this laboratory value."
            ],
            "monitoring": [
                "Repeat CBC testing as advised by your physician.",
                "Further evaluation may be considered if the abnormality persists."
            ]
        },

        "MCHC": {
            "medical": [
                "Discuss the abnormal mean corpuscular hemoglobin concentration with your healthcare provider.",
                "The result should be interpreted together with hemoglobin, MCV, MCH, and other CBC parameters."
            ],
            "diet": [
                "Maintain a balanced and nutrient-rich diet.",
                "Include adequate sources of iron, vitamin B12, folate, and protein."
            ],
            "lifestyle": [
                "Maintain adequate hydration.",
                "Avoid unnecessary supplementation without professional advice."
            ],
            "monitoring": [
                "Repeat CBC testing as advised by your physician.",
                "Further evaluation may be considered based on the complete blood-count pattern."
            ]
        },

        "RDW": {
            "medical": [
                "Discuss the abnormal red cell distribution width with your healthcare provider.",
                "RDW should be interpreted alongside MCV, hemoglobin, and other CBC findings."
            ],
            "diet": [
                "Maintain a balanced diet containing iron, vitamin B12, folate, and protein.",
                "Include a variety of nutrient-rich whole foods."
            ],
            "lifestyle": [
                "Maintain balanced nutrition and adequate hydration.",
                "Avoid self-starting supplements without professional guidance."
            ],
            "monitoring": [
                "Repeat CBC testing as advised by your physician.",
                "Additional nutritional testing may be considered when clinically appropriate."
            ]
        },

        # =========================================================
        # LIPID PROFILE
        # =========================================================

        "LDL": {
            "medical": [
                "Discuss cholesterol management and your overall cardiovascular risk with your healthcare provider."
            ],
            "diet": [
                "Reduce saturated and trans fats.",
                "Increase soluble fiber intake through foods such as oats, beans, lentils, fruits, and vegetables."
            ],
            "lifestyle": [
                "Exercise regularly as recommended by your healthcare provider.",
                "Maintain a healthy body weight."
            ],
            "monitoring": [
                "Repeat lipid profile testing as advised by your physician.",
                "Follow your healthcare provider's cardiovascular risk-management plan."
            ]
        },

        "HDL": {
            "medical": [
                "Discuss your HDL result and overall cardiovascular risk with your healthcare provider."
            ],
            "diet": [
                "Choose healthy unsaturated fat sources such as nuts, seeds, and appropriate vegetable oils.",
                "Maintain a balanced diet rich in vegetables, fruits, whole grains, and legumes."
            ],
            "lifestyle": [
                "Engage in regular physical activity.",
                "Maintain a healthy body weight and avoid tobacco exposure."
            ],
            "monitoring": [
                "Repeat lipid profile testing as advised by your physician.",
                "Interpret HDL together with LDL, triglycerides, and overall cardiovascular risk."
            ]
        },

        "Triglycerides": {
            "medical": [
                "Discuss the elevated triglyceride result with your healthcare provider."
            ],
            "diet": [
                "Reduce excessive intake of added sugars and refined carbohydrates.",
                "Choose more vegetables, whole grains, legumes, and other nutrient-rich foods."
            ],
            "lifestyle": [
                "Exercise regularly.",
                "Maintain a healthy body weight and limit alcohol consumption."
            ],
            "monitoring": [
                "Repeat lipid profile testing as advised by your physician.",
                "Discuss persistent elevation with your healthcare provider."
            ]
        },

        "Total Cholesterol": {
            "medical": [
                "Discuss your total cholesterol result and overall cardiovascular risk with your healthcare provider."
            ],
            "diet": [
                "Limit foods high in saturated and trans fats.",
                "Increase vegetables, fruits, whole grains, legumes, and soluble-fiber-rich foods."
            ],
            "lifestyle": [
                "Exercise regularly.",
                "Maintain a healthy body weight and avoid tobacco exposure."
            ],
            "monitoring": [
                "Repeat lipid profile testing as advised by your physician.",
                "Consider the complete lipid profile rather than total cholesterol alone."
            ]
        },

        # =========================================================
        # DIABETES
        # =========================================================

        "HbA1c": {
            "medical": [
                "Discuss the HbA1c result with your healthcare provider.",
                "Your clinician can interpret the result together with your medical history and glucose measurements."
            ],
            "diet": [
                "Prefer balanced meals containing vegetables, whole grains, lean proteins, and high-fiber foods.",
                "Limit excessive intake of added sugars and highly refined carbohydrates."
            ],
            "lifestyle": [
                "Engage in regular physical activity as recommended by your healthcare provider.",
                "Maintain a healthy body weight when appropriate."
            ],
            "monitoring": [
                "Monitor blood glucose according to your healthcare provider's recommendations.",
                "Repeat HbA1c testing at the interval recommended by your clinician."
            ]
        },

        "Glucose": {
            "medical": [
                "Discuss the abnormal glucose result with your healthcare provider.",
                "Interpretation depends on factors such as whether the sample was fasting and your overall clinical context."
            ],
            "diet": [
                "Choose balanced meals with vegetables, fiber-rich foods, and appropriate protein.",
                "Limit excessive added sugars and highly refined carbohydrates."
            ],
            "lifestyle": [
                "Maintain regular physical activity as recommended by your healthcare provider.",
                "Maintain adequate sleep and a healthy lifestyle."
            ],
            "monitoring": [
                "Repeat glucose testing as advised by your physician.",
                "Additional testing such as HbA1c may be considered by your healthcare provider when appropriate."
            ]
        },

        # =========================================================
        # LIVER
        # =========================================================

        "ALT": {
            "medical": [
                "Discuss the abnormal ALT result with your healthcare provider.",
                "Your clinician may evaluate medications, alcohol exposure, metabolic factors, and other possible causes."
            ],
            "diet": [
                "Maintain a balanced diet rich in vegetables, fruits, whole grains, and lean protein.",
                "Limit excessive intake of highly processed and high-sugar foods."
            ],
            "lifestyle": [
                "Avoid excessive alcohol consumption.",
                "Maintain a healthy body weight and regular physical activity."
            ],
            "monitoring": [
                "Repeat liver function testing as advised by your physician.",
                "Further evaluation may be recommended if liver enzymes remain abnormal."
            ]
        },

        "AST": {
            "medical": [
                "Discuss the abnormal AST result with your healthcare provider.",
                "AST can be influenced by liver and other tissues, so it should be interpreted with other laboratory findings."
            ],
            "diet": [
                "Maintain a balanced diet rich in vegetables, fruits, whole grains, and lean protein.",
                "Limit excessive intake of highly processed foods."
            ],
            "lifestyle": [
                "Avoid excessive alcohol consumption.",
                "Maintain regular physical activity appropriate for your health status."
            ],
            "monitoring": [
                "Repeat liver function testing as advised by your physician.",
                "Interpret AST together with ALT and other relevant clinical findings."
            ]
        },

        "ALP": {
            "medical": [
                "Discuss the abnormal alkaline phosphatase result with your healthcare provider.",
                "ALP can be associated with liver, bile-duct, or bone-related conditions and requires clinical correlation."
            ],
            "diet": [
                "Maintain a balanced diet containing adequate protein, calcium, and vitamin-rich foods.",
                "Stay adequately hydrated."
            ],
            "lifestyle": [
                "Maintain regular physical activity appropriate for your health status.",
                "Avoid unnecessary supplements or medication changes without professional advice."
            ],
            "monitoring": [
                "Repeat liver or related testing as advised by your physician.",
                "Further evaluation may be recommended depending on other laboratory findings."
            ]
        },

        "Bilirubin": {
            "medical": [
                "Discuss the abnormal bilirubin result with your healthcare provider.",
                "Your clinician can determine whether additional liver, bile-duct, or blood-related evaluation is appropriate."
            ],
            "diet": [
                "Maintain a balanced diet with adequate hydration.",
                "Prefer nutrient-rich whole foods."
            ],
            "lifestyle": [
                "Avoid excessive alcohol consumption.",
                "Avoid self-medicating or changing medications without professional guidance."
            ],
            "monitoring": [
                "Repeat bilirubin and liver function testing as advised by your physician.",
                "Seek clinical evaluation if symptoms such as yellowing of the skin or eyes, dark urine, or significant abdominal discomfort occur."
            ]
        },

        # =========================================================
        # KIDNEY
        # =========================================================

        "Creatinine": {
            "medical": [
                "Discuss the abnormal creatinine result with your healthcare provider.",
                "Kidney function should be interpreted using creatinine together with eGFR, medical history, medications, and other laboratory findings."
            ],
            "diet": [
                "Maintain a balanced diet appropriate for your overall health.",
                "Avoid making major dietary protein or supplement changes without professional guidance."
            ],
            "lifestyle": [
                "Maintain adequate hydration unless your healthcare provider has advised fluid restriction.",
                "Avoid unnecessary use of medications or supplements that may affect kidney function."
            ],
            "monitoring": [
                "Repeat kidney-function testing as advised by your physician.",
                "Discuss eGFR and other kidney-function markers with your healthcare provider."
            ]
        },

        "Urea": {
            "medical": [
                "Discuss the abnormal urea result with your healthcare provider.",
                "Urea should be interpreted together with creatinine, hydration status, and other kidney-function findings."
            ],
            "diet": [
                "Maintain a balanced diet appropriate for your health needs.",
                "Avoid making major dietary protein changes without professional guidance."
            ],
            "lifestyle": [
                "Maintain adequate hydration unless fluid restriction has been advised.",
                "Follow your healthcare provider's recommendations regarding medications and supplements."
            ],
            "monitoring": [
                "Repeat kidney-function testing as advised by your physician.",
                "Interpret urea together with creatinine and eGFR."
            ]
        },

        "BUN": {
            "medical": [
                "Discuss the abnormal BUN result with your healthcare provider.",
                "BUN can be affected by hydration, dietary protein intake, medications, and kidney function."
            ],
            "diet": [
                "Maintain a balanced diet appropriate for your health status.",
                "Avoid major changes in protein intake without professional guidance."
            ],
            "lifestyle": [
                "Maintain adequate hydration unless your clinician has advised otherwise.",
                "Avoid unnecessary supplements or medication changes."
            ],
            "monitoring": [
                "Repeat kidney-function testing as advised by your physician.",
                "Interpret BUN together with creatinine and eGFR."
            ]
        },

        "eGFR": {
            "medical": [
                "Discuss the eGFR result with your healthcare provider.",
                "Kidney function should be interpreted using trends over time and other clinical findings."
            ],
            "diet": [
                "Maintain a balanced diet appropriate for your individual health needs.",
                "Avoid excessive use of supplements unless recommended by your healthcare provider."
            ],
            "lifestyle": [
                "Maintain healthy blood pressure and blood glucose through appropriate medical care.",
                "Stay adequately hydrated unless your healthcare provider has advised fluid restriction."
            ],
            "monitoring": [
                "Repeat kidney-function testing as advised by your physician.",
                "Your healthcare provider may monitor kidney function over time when appropriate."
            ]
        },

        # =========================================================
        # THYROID
        # =========================================================

        "TSH": {
            "medical": [
                "Discuss the abnormal TSH result with your healthcare provider.",
                "TSH should generally be interpreted together with thyroid hormone levels and clinical symptoms."
            ],
            "diet": [
                "Maintain a balanced diet with adequate nutrients.",
                "Avoid excessive use of iodine-containing supplements unless recommended by your healthcare provider."
            ],
            "lifestyle": [
                "Maintain regular sleep, physical activity, and a balanced lifestyle.",
                "Do not start or stop thyroid medication without professional guidance."
            ],
            "monitoring": [
                "Repeat thyroid-function testing as advised by your physician.",
                "Additional thyroid testing may be recommended depending on the clinical context."
            ]
        },

        "T3": {
            "medical": [
                "Discuss the abnormal T3 result with your healthcare provider.",
                "T3 should be interpreted together with TSH, other thyroid hormones, and clinical symptoms."
            ],
            "diet": [
                "Maintain a balanced diet containing a variety of nutrient-rich foods.",
                "Avoid excessive use of thyroid-related supplements without professional guidance."
            ],
            "lifestyle": [
                "Maintain regular sleep and physical activity.",
                "Do not change thyroid medication without consulting your healthcare provider."
            ],
            "monitoring": [
                "Repeat thyroid-function testing as advised by your physician.",
                "Additional thyroid evaluation may be recommended when clinically appropriate."
            ]
        },

        "T4": {
            "medical": [
                "Discuss the abnormal T4 result with your healthcare provider.",
                "T4 should be interpreted together with TSH, other thyroid hormones, and clinical symptoms."
            ],
            "diet": [
                "Maintain a balanced diet containing a variety of nutrient-rich foods.",
                "Avoid excessive use of iodine or thyroid-related supplements unless recommended by your healthcare provider."
            ],
            "lifestyle": [
                "Maintain regular sleep and physical activity.",
                "Do not start, stop, or change thyroid medication without professional guidance."
            ],
            "monitoring": [
                "Repeat thyroid-function testing as advised by your physician.",
                "Further thyroid evaluation may be recommended depending on the overall clinical picture."
            ]
        },
    }

    @classmethod
    def generate(cls, abnormal_parameters):

        recommendations = []

        for parameter in abnormal_parameters:

            name = parameter.get("name", "").strip()

            recommendation = cls.RECOMMENDATIONS.get(name)

            # -----------------------------------------------------
            # Known parameter
            # -----------------------------------------------------

            if recommendation:

                recommendations.append({
                    "parameter": name,
                    "medical": recommendation.get("medical", []),
                    "diet": recommendation.get("diet", []),
                    "lifestyle": recommendation.get("lifestyle", []),
                    "monitoring": recommendation.get("monitoring", [])
                })

            # -----------------------------------------------------
            # Unknown parameter fallback
            # -----------------------------------------------------

            else:

                recommendations.append({
                    "parameter": name,
                    "medical": [
                        f"Discuss the abnormal {name} result with your healthcare provider.",
                        f"Interpret the abnormal {name} value together with your medical history and other laboratory findings."
                    ],
                    "diet": [
                        "Maintain a balanced diet rich in whole foods.",
                        "Stay adequately hydrated unless your healthcare provider has advised otherwise."
                    ],
                    "lifestyle": [
                        "Maintain regular physical activity appropriate for your health status.",
                        "Avoid making major medication or supplement changes without professional guidance."
                    ],
                    "monitoring": [
                        f"Repeat {name} testing as advised by your physician.",
                        "Seek further clinical evaluation if the abnormality persists or if concerning symptoms develop."
                    ]
                })

        return recommendations