from models.doctor_patient_model import DoctorPatientModel
from models.user_model import UserModel


class DoctorPatientService:

    @staticmethod
    def assign_patient(doctor_id, patient_id):
        doctor = UserModel.find_by_id(doctor_id)

        if not doctor:
            return {
                "success": False,
                "message": "Doctor not found."
            }

        if doctor.get("role") != "doctor":
            return {
                "success": False,
                "message": "Selected user is not a doctor."
            }

        patient = UserModel.find_by_id(patient_id)

        if not patient:
            return {
                "success": False,
                "message": "Patient not found."
            }

        if patient.get("role") != "patient":
            return {
                "success": False,
                "message": "Selected user is not a patient."
            }

        assignment_id = DoctorPatientModel.create_assignment(
            doctor_id,
            patient_id
        )

        if not assignment_id:
            return {
                "success": False,
                "message": "Patient is already assigned to this doctor."
            }

        return {
            "success": True,
            "message": "Patient assigned successfully.",
            "assignment_id": assignment_id
        }

    @staticmethod
    def get_doctor_patients(doctor_id):
        assignments = DoctorPatientModel.find_by_doctor(doctor_id)

        patients = []

        for assignment in assignments:
            patient_id = assignment.get("patient_id")

            patient = UserModel.find_by_id(patient_id)

            if not patient:
                continue

            patient = UserModel.sanitize_user(patient)

            patients.append(patient)

        return patients

    @staticmethod
    def get_patient_doctors(patient_id):
        assignments = DoctorPatientModel.find_by_patient(patient_id)

        doctors = []

        for assignment in assignments:
            doctor_id = assignment.get("doctor_id")

            doctor = UserModel.find_by_id(doctor_id)

            if not doctor:
                continue

            doctor = UserModel.sanitize_user(doctor)

            doctors.append(doctor)

        return doctors

    @staticmethod
    def is_patient_assigned(doctor_id, patient_id):
        return DoctorPatientModel.is_assigned(
            doctor_id,
            patient_id
        )

    @staticmethod
    def remove_patient(doctor_id, patient_id):
        removed = DoctorPatientModel.remove_assignment(
            doctor_id,
            patient_id
        )

        if not removed:
            return {
                "success": False,
                "message": "Patient assignment not found."
            }

        return {
            "success": True,
            "message": "Patient assignment removed successfully."
        }