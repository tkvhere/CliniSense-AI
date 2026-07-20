from ai.detector import ReportDetector
from ai.report_builder import ReportBuilder

from ai.analyzers.cbc_analyzer import CBCAnalyzer
from ai.analyzers.lipid_analyzer import LipidAnalyzer
from ai.analyzers.diabetes_analyzer import DiabetesAnalyzer
from ai.analyzers.liver_analyzer import LiverAnalyzer
from ai.analyzers.kidney_analyzer import KidneyAnalyzer
from ai.analyzers.thyroid_analyzer import ThyroidAnalyzer


class AIAnalyzer:
    def __init__(self):
        self.detector = ReportDetector()

        self.analyzers = {
            "cbc": CBCAnalyzer(),
            "lipid": LipidAnalyzer(),
            "diabetes": DiabetesAnalyzer(),
            "liver": LiverAnalyzer(),
            "kidney": KidneyAnalyzer(),
            "thyroid": ThyroidAnalyzer(),
        }

    def analyze(self, text):
        # Validate OCR text
        if not text:
            return {
                "success": False,
                "message": "No OCR text provided.",
            }

        # Detect report type
        report_type = self.detector.detect(text)

        if report_type is None:
            return {
                "success": False,
                "message": "Unable to determine report type.",
            }

       

        # Select the correct analyzer
        analyzer = self.analyzers.get(report_type)

        if analyzer is None:
            return {
                "success": False,
                "message": f"No analyzer available for '{report_type}'.",
            }

        
        # Analyze OCR text directly
        analysis = analyzer.analyze(text)

        # Build a standardized AI report
        final_report = ReportBuilder.build(
            report_type,
            analysis,
        )

        # Return final response
        return {
            "success": True,
            "report_type": report_type,
            "analysis": final_report,
        }