import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import AIStatCard from "../../components/dashboard/AIStatCard";
import ReportHeader from "../../components/reportDetails/ReportHeader";
import ReportPreview from "../../components/reportDetails/ReportPreview";
import ReportInformation from "../../components/reportDetails/ReportInformation";
import AIAnalysis from "../../components/reportDetails/AIAnalysis";
import ClinicalRecommendations from "../../components/reportDetails/ClinicalRecommendations";
import PatientData from "../../components/reportDetails/PatientData";
import ConfidenceCard from "../../components/reportDetails/ConfidenceCard";

import {
  getReportById,
  deleteReport,
} from "../../services/reportService";
const ReportDetails = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const analysis = report?.analysis || {};
  const healthScore = Math.max(
  40,
  100 - (analysis.findings?.length || 0) * 20
);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const fileUrl = report
  ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${report.stored_filename}`
  : "";

const isPdf = report?.file_type === "pdf";

const isImage = ["jpg", "jpeg", "png"].includes(
  report?.file_type || ""
);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await getReportById(reportId);
      setReport(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
 
const API_BASE_URL = import.meta.env.VITE_API_URL;
const downloadReport = async () => {
  try {
    setDownloading(true);

    const token = localStorage.getItem("token");

    const response = await fetch(
  `${import.meta.env.VITE_API_URL}/reports/${report._id}/download`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    if (!response.ok) {
      throw new Error("Failed to download report");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `CliniSense_Report_${report._id}.pdf`;

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);
    alert("Unable to download AI report.");
  } finally {
    setDownloading(false);
  }
};

  const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this report?\n\nThis action cannot be undone."
  );

  if (!confirmed) return;

  try {
    const response = await deleteReport(reportId);

    if (response.data.success) {
      alert("Report deleted successfully.");
      navigate("/dashboard/reports");
    } else {
      alert(response.data.message || "Unable to delete report.");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while deleting the report.");
  }
};

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          <h2 className="text-xl font-semibold text-slate-700">
            Loading Report...
          </h2>

          <p className="mt-2 text-slate-500">
            Please wait while we fetch your report.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!report) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          <h2 className="text-xl font-semibold text-red-600">
            Report Not Found
          </h2>

          <p className="mt-2 text-slate-500">
            The requested report does not exist.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}

<ReportHeader
  navigate={navigate}
  downloadReport={downloadReport}
  downloading={downloading}
  handleDelete={handleDelete}
/>
        {/* Report Viewer */}

<ReportPreview
  isPdf={isPdf}
  isImage={isImage}
  fileUrl={fileUrl}
  downloadReport={downloadReport}
  downloading={downloading}
/>
        {/* Report Information */}

<ReportInformation
  report={report}
  healthScore={healthScore}
/>

{report.analysis ? (

  <>
    <AIAnalysis report={report} />

    <ClinicalRecommendations
      recommendations={report.analysis?.recommendations}
    />

    <PatientData
      patientData={report.analysis?.patient_data}
    />

    <ConfidenceCard
  confidence={report.analysis?.confidence}
/>
  </>

) : (

  <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
    <p className="text-slate-500">
      AI analysis is not available for this report.
    </p>
  </div>

)}

</div>
</DashboardLayout>
  );
};

export default ReportDetails;