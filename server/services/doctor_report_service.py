from models.report_model import ReportModel
from models.doctor_patient_model import DoctorPatientModel


class DoctorReportService:

    @staticmethod
    def get_patient_reports(doctor_id, patient_id):
        is_assigned = DoctorPatientModel.is_assigned(
            doctor_id,
            patient_id
        )

        if not is_assigned:
            return {
                "success": False,
                "message": "You do not have access to this patient."
            }

        reports = ReportModel.find_by_patient(patient_id)

        return {
            "success": True,
            "message": "Patient reports fetched successfully.",
            "reports": reports
        }