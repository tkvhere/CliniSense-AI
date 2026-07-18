import re


class TableParser:

    @staticmethod
    def parse(ocr_text):

        patients = []

        lines = ocr_text.splitlines()

        for line in lines:

            line = line.strip()

            if not line:
                continue

            if line.lower().startswith("patient"):
                continue

            match = re.match(
                r"(\d+)\s+([A-Za-z]+)\s+(\d+)\s+([MF])\s+(\d+)\s+(\d+)\s+(Yes|No)\s+(\d+(\.\d+)?)",
                line,
                re.IGNORECASE
            )

            if not match:
                continue

            patients.append({
                "patient_id": int(match.group(1)),
                "name": match.group(2),
                "age": int(match.group(3)),
                "gender": match.group(4),
                "heart_rate": int(match.group(5)),
                "cholesterol": int(match.group(6)),
                "diabetes": match.group(7).lower() == "yes",
                "bmi": float(match.group(8))
            })

        return patients