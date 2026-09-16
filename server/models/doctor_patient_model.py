from datetime import datetime
from bson import ObjectId

from database.mongodb import db


class DoctorPatientModel:

    collection = db["doctor_patient_assignments"]

    @staticmethod
    def create_assignment(doctor_id, patient_id):
        existing_assignment = DoctorPatientModel.collection.find_one(
            {
                "doctor_id": ObjectId(doctor_id),
                "patient_id": ObjectId(patient_id)
            }
        )

        if existing_assignment:
            return None

        assignment = {
            "doctor_id": ObjectId(doctor_id),
            "patient_id": ObjectId(patient_id),
            "status": "active",
            "assigned_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        result = DoctorPatientModel.collection.insert_one(assignment)

        return str(result.inserted_id)

    @staticmethod
    def find_by_doctor(doctor_id):
        return list(
            DoctorPatientModel.collection.find(
                {
                    "doctor_id": ObjectId(doctor_id),
                    "status": "active"
                }
            ).sort(
                "assigned_at",
                -1
            )
        )

    @staticmethod
    def find_by_patient(patient_id):
        return list(
            DoctorPatientModel.collection.find(
                {
                    "patient_id": ObjectId(patient_id),
                    "status": "active"
                }
            ).sort(
                "assigned_at",
                -1
            )
        )

    @staticmethod
    def is_assigned(doctor_id, patient_id):
        assignment = DoctorPatientModel.collection.find_one(
            {
                "doctor_id": ObjectId(doctor_id),
                "patient_id": ObjectId(patient_id),
                "status": "active"
            }
        )

        return assignment is not None

    @staticmethod
    def remove_assignment(doctor_id, patient_id):
        result = DoctorPatientModel.collection.update_one(
            {
                "doctor_id": ObjectId(doctor_id),
                "patient_id": ObjectId(patient_id),
                "status": "active"
            },
            {
                "$set": {
                    "status": "inactive",
                    "updated_at": datetime.utcnow()
                }
            }
        )

        return result.modified_count > 0