NORMAL_RANGES = {
    "cbc": {
        "hemoglobin": {
            "name": "Hemoglobin",
            "aliases": ["hemoglobin", "hb", "hgb"],
            "unit": "g/dL",
            "min": 12.0,
            "max": 17.5,
        },
        "wbc": {
            "name": "White Blood Cells",
            "aliases": ["wbc", "white blood cells", "total leukocyte count", "tlc"],
            "unit": "/µL",
            "min": 4000,
            "max": 11000,
        },
        "rbc": {
            "name": "Red Blood Cells",
            "aliases": ["rbc", "red blood cells"],
            "unit": "million/µL",
            "min": 4.2,
            "max": 6.1,
        },
        "platelets": {
            "name": "Platelets",
            "aliases": ["platelets", "platelet count"],
            "unit": "/µL",
            "min": 150000,
            "max": 450000,
        },
    },

    "lipid": {
        "total_cholesterol": {
            "name": "Total Cholesterol",
            "aliases": ["total cholesterol", "cholesterol"],
            "unit": "mg/dL",
            "min": 0,
            "max": 200,
        },
        "hdl": {
            "name": "HDL",
            "aliases": ["hdl", "hdl cholesterol"],
            "unit": "mg/dL",
            "min": 40,
            "max": 100,
        },
        "ldl": {
            "name": "LDL",
            "aliases": ["ldl", "ldl cholesterol"],
            "unit": "mg/dL",
            "min": 0,
            "max": 100,
        },
        "triglycerides": {
            "name": "Triglycerides",
            "aliases": ["triglycerides", "tg"],
            "unit": "mg/dL",
            "min": 0,
            "max": 150,
        },
    },

    "diabetes": {
        "fasting_glucose": {
            "name": "Fasting Blood Sugar",
            "aliases": [
                "fasting blood sugar",
                "fasting glucose",
                "fbs",
                "glucose fasting",
            ],
            "unit": "mg/dL",
            "min": 70,
            "max": 99,
        },
        "hba1c": {
            "name": "HbA1c",
            "aliases": ["hba1c", "glycated hemoglobin", "a1c"],
            "unit": "%",
            "min": 4.0,
            "max": 5.6,
        },
    },

    "liver": {
        "alt": {
            "name": "ALT (SGPT)",
            "aliases": ["alt", "sgpt"],
            "unit": "U/L",
            "min": 7,
            "max": 56,
        },
        "ast": {
            "name": "AST (SGOT)",
            "aliases": ["ast", "sgot"],
            "unit": "U/L",
            "min": 10,
            "max": 40,
        },
        "bilirubin": {
            "name": "Total Bilirubin",
            "aliases": ["bilirubin", "total bilirubin"],
            "unit": "mg/dL",
            "min": 0.2,
            "max": 1.2,
        },
    },

    "kidney": {
        "creatinine": {
            "name": "Creatinine",
            "aliases": ["creatinine", "serum creatinine"],
            "unit": "mg/dL",
            "min": 0.6,
            "max": 1.3,
        },
        "urea": {
            "name": "Blood Urea",
            "aliases": ["urea", "blood urea"],
            "unit": "mg/dL",
            "min": 15,
            "max": 40,
        },
        "egfr": {
            "name": "eGFR",
            "aliases": ["egfr", "estimated gfr"],
            "unit": "mL/min/1.73m²",
            "min": 90,
            "max": 150,
        },
    },

    "thyroid": {
        "tsh": {
            "name": "TSH",
            "aliases": ["tsh", "thyroid stimulating hormone"],
            "unit": "µIU/mL",
            "min": 0.4,
            "max": 4.0,
        },
        "t3": {
            "name": "T3",
            "aliases": ["t3", "triiodothyronine"],
            "unit": "ng/dL",
            "min": 80,
            "max": 200,
        },
        "t4": {
            "name": "T4",
            "aliases": ["t4", "thyroxine"],
            "unit": "µg/dL",
            "min": 5.0,
            "max": 12.0,
        },
    },
}