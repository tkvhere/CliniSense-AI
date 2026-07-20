from ai.normal_ranges import NORMAL_RANGES


class ReportDetector:
    def __init__(self):
        self.report_keywords = {
            report_type: self._collect_keywords(report_type)
            for report_type in NORMAL_RANGES
        }

    def _collect_keywords(self, report_type):
        keywords = set()

        for parameter in NORMAL_RANGES[report_type].values():
            keywords.add(parameter["name"].lower())

            for alias in parameter["aliases"]:
                keywords.add(alias.lower())

        return keywords

    def detect(self, text):
        if not text:
            return None

        text = text.lower()

        scores = {}

        for report_type, keywords in self.report_keywords.items():
            score = 0

            for keyword in keywords:
                if keyword in text:
                    score += 1

            scores[report_type] = score

        best_match = max(scores, key=scores.get)

        if scores[best_match] == 0:
            return None

        return best_match