class TrendEngine:
    """
    Analyzes changes in laboratory parameters
    across multiple reports.
    """

    @staticmethod
    def analyze(previous_results, current_results):
        """
        Compare previous and current lab results.

        Parameters
        ----------
        previous_results : dict
            Results from the previous report.

        current_results : dict
            Results from the current report.
        """

        trends = []

        for key, current in current_results.items():

            if key not in previous_results:
                continue

            previous = previous_results[key]

            try:
                previous_value = float(previous["value"])
                current_value = float(current["value"])
            except (ValueError, TypeError):
                continue

            difference = current_value - previous_value

            if difference > 0:
                direction = "Increased"
            elif difference < 0:
                direction = "Decreased"
            else:
                direction = "Stable"

            trends.append({
                "parameter": current["name"],
                "previous": previous_value,
                "current": current_value,
                "change": round(difference, 2),
                "direction": direction
            })

        return trends