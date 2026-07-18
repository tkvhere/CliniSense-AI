import os
import uuid

from flask import g
from werkzeug.utils import secure_filename

from models.report_model import ReportModel
from utils.ocr_service import OCRService
from utils.medical_analyzer import MedicalAnalyzer


class ReportService:

    ALLOWED_EXTENSIONS = {
        "pdf",
        "png",
        "jpg",
        "jpeg"
    }

    UPLOAD_FOLDER = "uploads"

    @staticmethod
    def allowed_file(filename):
        return (
            "." in filename and
            filename.rsplit(".", 1)[1].lower()
            in ReportService.ALLOWED_EXTENSIONS
        )

    @staticmethod
    def upload_report(file):

        if not ReportService.allowed_file(file.filename):
            raise ValueError(
                "Unsupported file type. Please upload PDF, JPG, JPEG or PNG."
            )

        extension = file.filename.rsplit(".", 1)[1].lower()

        filename = secure_filename(
            f"{uuid.uuid4().hex}.{extension}"
        )

        os.makedirs(
            ReportService.UPLOAD_FOLDER,
            exist_ok=True
        )

        filepath = os.path.join(
            ReportService.UPLOAD_FOLDER,
            filename
        )

        file.save(filepath)

        try:
            extracted_text = OCRService.extract_text(filepath)
        except Exception as e:
            print("OCR Error:", e)
            extracted_text = ""

        analysis = MedicalAnalyzer.analyze(extracted_text)

        report_data = {
            "user_id": g.current_user["_id"],
            "original_filename": file.filename,
            "stored_filename": filename,
            "file_path": filepath,
            "file_type": extension,
            "status": "uploaded",
            "analysis_status": "completed",
            "ocr_text": extracted_text,
            "analysis": analysis
        }

        report_id = ReportModel.create_report(report_data)

        return {
            "report_id": report_id,
            "original_filename": file.filename,
            "status": "uploaded"
        }

    @staticmethod
    def delete_report(report_id):

        report = ReportModel.find_by_id(report_id)

        if not report:
            return {
                "success": False,
                "message": "Report not found."
            }

        file_path = report.get("file_path")

        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception:
                pass

        ReportModel.delete_report(report_id)

        return {
            "success": True,
            "message": "Report deleted successfully."
        }