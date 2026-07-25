import cloudinary
import cloudinary.uploader

from config.settings import Config


# Configure Cloudinary
cloudinary.config(
    cloud_name=Config.CLOUDINARY_CLOUD_NAME,
    api_key=Config.CLOUDINARY_API_KEY,
    api_secret=Config.CLOUDINARY_API_SECRET,
    secure=True
)


class CloudinaryService:
    @staticmethod
    def upload_file(file_path, folder="clinisense/reports"):
        """
        Upload a file to Cloudinary.

        Args:
            file_path (str): Local path of the uploaded file.
            folder (str): Cloudinary folder.

        Returns:
            dict: Cloudinary upload response.
        """
        try:
            result = cloudinary.uploader.upload(
                file_path,
                resource_type="auto",
                folder=folder
            )

            return {
                "success": True,
                "url": result["secure_url"],
                "public_id": result["public_id"],
                "format": result.get("format"),
                "bytes": result.get("bytes"),
                "original_filename": result.get("original_filename"),
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }