from models.report_model import ReportModel
from models.doctor_patient_model import DoctorPatientModel
from models.user_model import UserModel


class DoctorReportDetailService:

    @staticmethod
    def get_report(doctor_id, report_id):
        report = ReportModel.find_by_id(report_id)

        if not report:
            return {
                "success": False,
                "message": "Report not found.",
                "status_code": 404
            }

        patient_id = report.get("user_id")

        if not patient_id:
            return {
                "success": False,
                "message": "Patient information is missing from this report.",
                "status_code": 404
            }

        patient_id = str(patient_id)

        if not DoctorPatientModel.is_assigned(
            doctor_id,
            patient_id
        ):
            return {
                "success": False,
                "message": "You do not have permission to access this report.",
                "status_code": 403
            }

        patient = UserModel.find_by_id(patient_id)

        if not patient:
            return {
                "success": False,
                "message": "Patient account not found.",
                "status_code": 404
            }

        patient = UserModel.sanitize_user(patient)

        report["_id"] = str(report["_id"])
        report["user_id"] = patient_id

        report_patient_data = (
    report.get("analysis", {}).get("patient_data", {})
    if isinstance(report.get("analysis"), dict)
    else {}
)

        report["patient_info"] = {
    "id": patient.get("_id"),
    "name": patient.get("full_name"),
    "email": patient.get("email"),
    "role": patient.get("role"),
    "age": report_patient_data.get("age"),
    "gender": report_patient_data.get("gender")
}

        return {
            "success": True,
            "message": "Report fetched successfully.",
            "report": report,
            "status_code": 200
        }