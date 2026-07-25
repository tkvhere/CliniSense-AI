import os
import platform

import fitz
import pytesseract
from PIL import Image
from pdf2image import convert_from_path


# Configure Tesseract only on Windows
if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = (
        r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    )


class OCRService:

    @staticmethod
    def extract_text(file_path):

        extension = os.path.splitext(file_path)[1].lower()

        if extension in [".png", ".jpg", ".jpeg"]:
            return OCRService._image_to_text(file_path)

        if extension == ".pdf":
            return OCRService._pdf_to_text(file_path)

        return ""

    @staticmethod
    def _image_to_text(image_path):

        image = Image.open(image_path)

        return pytesseract.image_to_string(image)

    @staticmethod
    def _pdf_to_text(pdf_path):

        try:

            # -------------------------------------
            # Step 1: Extract text using PyMuPDF
            # -------------------------------------

            document = fitz.open(pdf_path)

            extracted_text = ""

            for page in document:
                extracted_text += page.get_text()

            document.close()

            if extracted_text.strip():

                print("✅ Text extracted using PyMuPDF")

                return extracted_text

            print("⚠️ No embedded text found. Falling back to OCR...")

            # -------------------------------------
            # Step 2: OCR Fallback
            # -------------------------------------

            if platform.system() == "Windows":

                pages = convert_from_path(
                    pdf_path,
                    poppler_path=r"C:\poppler\poppler-26.02.0\Library\bin"
                )

            else:

                pages = convert_from_path(pdf_path)

            extracted_text = ""

            for page in pages:
                extracted_text += pytesseract.image_to_string(page)
                extracted_text += "\n"

            return extracted_text

        except Exception as e:

            print("PDF OCR Error:", repr(e))
            raise