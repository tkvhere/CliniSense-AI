# ============================================
# CliniSense AI
# Report Model
# Handles all MongoDB operations for reports
# ============================================

from datetime import datetime
from bson import ObjectId

from database.mongodb import db


class ReportModel:

    collection = db["reports"]

    @staticmethod
    def create_report(report_data):

        report_data["created_at"] = datetime.utcnow()
        report_data["updated_at"] = datetime.utcnow()

        result = ReportModel.collection.insert_one(report_data)

        return str(result.inserted_id)

    @staticmethod
    def find_by_id(report_id):

        return ReportModel.collection.find_one(
            {
                "_id": ObjectId(report_id)
            }
        )

    @staticmethod
    def find_by_user(user_id):

        reports = list(
            ReportModel.collection.find(
                {
                    "user_id": user_id
                }
            ).sort(
                "created_at",
                -1
            )
        )

        for report in reports:

            report["_id"] = str(report["_id"])

            if "user_id" in report:
                report["user_id"] = str(report["user_id"])

        return reports

    @staticmethod
    def update_report(report_id, update_data):

        update_data["updated_at"] = datetime.utcnow()

        return ReportModel.collection.update_one(
            {
                "_id": ObjectId(report_id)
            },
            {
                "$set": update_data
            }
        )

    @staticmethod
    def delete_report(report_id):
        """
        Delete a report by its MongoDB ObjectId.

        Returns:
            Deleted report document if found, otherwise None.
        """

        return ReportModel.collection.find_one_and_delete(
            {
                "_id": ObjectId(report_id)
            }
        )