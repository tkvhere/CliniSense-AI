import re

from ai.normal_ranges import NORMAL_RANGES


class CBCAnalyzer:
    def __init__(self):
        self.parameters = NORMAL_RANGES["cbc"]

    def _extract_value(self, text, aliases):
        for alias in aliases:
            pattern = rf"{re.escape(alias)}\s*[:=-]?\s*([0-9]+(?:\.[0-9]+)?)"

            match = re.search(pattern, text, re.IGNORECASE)

            if match:
                return float(match.group(1))

        return None

    def _classify(self, value, minimum, maximum):
        if value < minimum:
            return "Low"

        if value > maximum:
            return "High"

        return "Normal"

    def analyze(self, text):
        results = {}

        for key, parameter in self.parameters.items():
            value = self._extract_value(text, parameter["aliases"])

            if value is None:
                continue

            results[key] = {
                "name": parameter["name"],
                "value": value,
                "unit": parameter["unit"],
                "status": self._classify(
                    value,
                    parameter["min"],
                    parameter["max"],
                ),
                "reference_range": {
                    "min": parameter["min"],
                    "max": parameter["max"],
                },
            }

        return {
            "report_type": "cbc",
            "results": results,
        }