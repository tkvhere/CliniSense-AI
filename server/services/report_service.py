import os
import uuid

from flask import g
from werkzeug.utils import secure_filename

from models.report_model import ReportModel
from utils.ocr_service import OCRService
from ai.analyzer import AIAnalyzer
from services.cloudinary_service import CloudinaryService


class ReportService:
    ai_analyzer = AIAnalyzer()

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

        print("\n========== REPORT UPLOAD STARTED ==========")

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

        print("Saving file locally...")
        file.save(filepath)
        print("File saved:", filepath)

        # -------------------------------
        # Upload to Cloudinary
        # -------------------------------
        print("Uploading to Cloudinary...")

        try:
            cloudinary_result = CloudinaryService.upload_file(filepath)

            print("Cloudinary Response:")
            print(cloudinary_result)

            if not cloudinary_result["success"]:
                raise Exception(cloudinary_result["error"])

        except Exception as e:
            print("Cloudinary Upload Error:")
            print(str(e))
            raise

        # -------------------------------
        # OCR
        # -------------------------------
        print("Running OCR...")

        try:
            extracted_text = OCRService.extract_text(filepath)
            print("\n========== OCR TEXT ==========")
            print(extracted_text[:3000])   # Print first 3000 characters
            print("========== END OCR ==========\n")
            print("OCR Completed.")
        except Exception as e:
            print("OCR Error:")
            print(str(e))
            extracted_text = ""

        # -------------------------------
        # AI Analysis
        # -------------------------------
        print("Running AI Analysis...")

        print("\n========== OCR TEXT ==========")
        print(extracted_text[:5000])
        print("========== END OCR ==========\n")

        analysis = ReportService.ai_analyzer.analyze(extracted_text)
        if analysis.get("success"):
           analysis = analysis["analysis"]

        print("\n========== AI ANALYSIS ==========")
        print(analysis)
        print("========== END AI ANALYSIS ==========\n")

        print("AI Analysis Completed.")

        report_data = {
            "user_id": g.current_user["_id"],
            "original_filename": file.filename,
            "stored_filename": filename,
            "file_path": filepath,

            # Cloudinary
            "cloudinary_url": cloudinary_result["url"],
            "cloudinary_public_id": cloudinary_result["public_id"],

            "file_type": extension,
            "status": "uploaded",
            "analysis_status": "completed",
            "ocr_text": extracted_text,
            "analysis": analysis
        }
        print("Saving report to MongoDB...")
        print("Current User ID:", g.current_user["_id"])
        print("Report Data Keys:", list(report_data.keys()))

        report_id = ReportModel.create_report(report_data)

        print("Inserted Report ID:", report_id)
        print("MongoDB Save Successful.")
        print("========== REPORT UPLOAD COMPLETED ==========\n")

        return {
            "report_id": report_id,
            "original_filename": file.filename,
            "status": "uploaded",
            "cloudinary_url": cloudinary_result["url"]
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