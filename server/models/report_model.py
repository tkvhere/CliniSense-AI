from datetime import datetime
from bson import ObjectId

from database.mongodb import db


class ReportModel:

    collection = db["reports"]

    @staticmethod
    def create_report(report_data):
        report_data["created_at"] = datetime.utcnow()
        report_data["updated_at"] = datetime.utcnow()

        print("=" * 50)
        print("INSERTING REPORT INTO MONGODB")
        print("Database:", ReportModel.collection.database.name)
        print("Collection:", ReportModel.collection.name)

        result = ReportModel.collection.insert_one(report_data)

        print("Inserted ID:", result.inserted_id)
        print("=" * 50)

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
    def find_by_patient(user_id):
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
    def find_previous_report(user_id):
        report = ReportModel.collection.find_one(
            {
                "user_id": user_id
            },
            sort=[("created_at", -1)]
        )

        if report:
            report["_id"] = str(report["_id"])

            if "user_id" in report:
                report["user_id"] = str(report["user_id"])

        return report

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
        return ReportModel.collection.find_one_and_delete(
            {
                "_id": ObjectId(report_id)
            }
        )