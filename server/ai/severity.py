class SeverityEngine:
    """
    Determines overall report severity based on
    abnormal laboratory parameters.
    """

    @staticmethod
    def calculate(abnormal_parameters):
        """
        Determine overall clinical severity based on
        abnormal laboratory parameter statuses.
        """

        if not abnormal_parameters:
            return "Normal"

        critical_count = 0
        high_count = 0
        low_count = 0

        for parameter in abnormal_parameters:

            status = str(parameter.get("status", "")).strip().lower()

            if status == "critical":
                critical_count += 1

            elif status == "high":
                high_count += 1

            elif status == "low":
                low_count += 1

        if critical_count > 0:
            return "Critical"

        if high_count >= 3:
            return "High"

        if high_count > 0 or low_count >= 2:
            return "Moderate"

        return "Mild"