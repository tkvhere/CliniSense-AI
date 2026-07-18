# ============================================
# CliniSense AI
# User Model
# Handles all MongoDB operations for users
# ============================================

from datetime import datetime
from bson import ObjectId

# Import MongoDB database instance
# Update this import if your database connection file uses a different name.
from database.mongodb import db


class UserModel:
    """
    UserModel handles all database operations
    related to the users collection.
    """

    collection = db["users"]

    @staticmethod
    def create_user(user_data):
        """
        Create a new user document.
        """
        user_data["created_at"] = datetime.utcnow()
        user_data["updated_at"] = datetime.utcnow()

        result = UserModel.collection.insert_one(user_data)
        return str(result.inserted_id)

    @staticmethod
    def find_by_email(email):
        """
        Find user using email.
        """
        return UserModel.collection.find_one({"email": email})

    @staticmethod
    def find_by_id(user_id):
        """
        Find user using MongoDB ObjectId.
        """
        return UserModel.collection.find_one(
            {"_id": ObjectId(user_id)}
        )

    @staticmethod
    def update_user(user_id, update_data):
        """
        Update user profile.
        """
        update_data["updated_at"] = datetime.utcnow()

        return UserModel.collection.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set": update_data
            }
        )

    @staticmethod
    def deactivate_user(user_id):
        """
        Soft delete user.
        """
        return UserModel.collection.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set": {
                    "is_active": False,
                    "updated_at": datetime.utcnow()
                }
            }
        )

    @staticmethod
    def get_all_users():
        """
        Return all users.
        Used by Admin Dashboard.
        """
        return list(
            UserModel.collection.find({})
        )

    @staticmethod
    def email_exists(email):
        """
        Check if email already exists.
        """
        return UserModel.collection.find_one(
            {"email": email}
        ) is not None

    @staticmethod
    def sanitize_user(user):
        """
        Remove sensitive fields before
        sending user data to frontend.
        """

        if not user:
            return None

        user["_id"] = str(user["_id"])

        user.pop("password", None)

        return user