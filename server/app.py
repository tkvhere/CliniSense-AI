from flask import Flask, send_from_directory
from flask_cors import CORS
import os

from config.constants import APP_NAME, VERSION
from config.response import success_response
from config.settings import Config

from routes.auth_routes import auth_bp
from routes.report_routes import report_bp
from routes.doctor_patient_routes import doctor_patient_bp
from routes.doctor_report_routes import doctor_report_bp
from routes.doctor_report_detail_routes import doctor_report_detail_bp
from routes.doctor_analytics_routes import doctor_analytics_bp
from routes.doctor_high_risk_routes import doctor_high_risk_bp
from routes.analytics_routes import analytics_bp
app = Flask(__name__)

app.config.from_object(Config)

CORS(app)


# Ensure uploads folder exists
UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "uploads"
)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return success_response(
        f"Welcome to {APP_NAME}",
        {
            "project": APP_NAME,
            "version": VERSION,
            "status": "Backend Running"
        }
    )


# Serve uploaded reports
@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    print("=" * 60)
    print("Requested File :", filename)
    print("Resolved Path  :", file_path)
    print("Exists         :", os.path.exists(file_path))

    if os.path.exists(file_path):
        print("File Size      :", os.path.getsize(file_path), "bytes")

    print("=" * 60)

    return send_from_directory(
        UPLOAD_FOLDER,
        filename,
        mimetype="application/pdf",
        as_attachment=False,
    )


# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(report_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(doctor_high_risk_bp)
app.register_blueprint(doctor_analytics_bp)
app.register_blueprint(doctor_patient_bp)
app.register_blueprint(doctor_report_bp)
app.register_blueprint(doctor_report_detail_bp)
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=os.environ.get("FLASK_ENV") == "development"
    )