# ============================================
# CliniSense AI
# Medical Analyzer Wrapper
# ============================================

from ai.analyzer import AIAnalyzer


class MedicalAnalyzer:

    _ai_analyzer = AIAnalyzer()

    @staticmethod
    def analyze(text):
        """
        Uses the production AI engine to analyze OCR text.
        """
        return MedicalAnalyzer._ai_analyzer.analyze(text)