import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import AIStatCard from "../../components/dashboard/AIStatCard";
import HealthScoreCard from "../../components/dashboard/HealthScoreCard";
import RiskLevelCard from "../../components/dashboard/RiskLevelCard";
import LabResultsTable from "../../components/dashboard/LabResultsTable";
import {
  getReportById,
  deleteReport,
} from "../../services/reportService";

const getStatusBadge = (status) => {
  const value = (status || "").toLowerCase();

  if (value === "completed") {
    return "bg-green-100 text-green-700";
  }

  if (value === "processing") {
    return "bg-yellow-100 text-yellow-700";
  }

  if (value === "failed") {
    return "bg-red-100 text-red-700";
  }

  return "bg-slate-100 text-slate-700";
};

const DetailCard = ({ label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </p>

    <p className="mt-2 break-all text-sm font-medium text-slate-800">
      {value || "-"}
    </p>
  </div>
);

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
  ? `http://127.0.0.1:5000/uploads/${report.stored_filename}`
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
 

const downloadReport = async () => {
  try {
    setDownloading(true);

    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:5000/api/reports/${report._id}/download`,
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

<div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 p-8 text-white shadow-xl">

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <div className="mb-3 inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
        🩺 AI Clinical Intelligence
      </div>

      <h1 className="text-4xl font-bold">
        Report Details
      </h1>

      <p className="mt-3 max-w-2xl text-sky-100">
        Review your uploaded medical report, AI-generated analysis,
        clinical findings, health score, and personalized recommendations.
      </p>

    </div>

    <div className="flex flex-wrap gap-3">

      <button
        onClick={() => navigate(-1)}
        className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
      >
        ← Back
      </button>

      <Link
        to="/dashboard/reports"
        className="rounded-xl bg-white px-5 py-3 font-semibold text-sky-700 transition hover:scale-105"
      >
        Report History
      </Link>

      <button
        onClick={downloadReport}
        disabled={downloading}
        className={`rounded-xl px-5 py-3 font-semibold text-white transition ${
          downloading
            ? "cursor-not-allowed bg-slate-400"
            : "bg-emerald-500 hover:bg-emerald-600"
        }`}
      >
        {downloading ? "Generating AI Report..." : "📄 Download AI Report"}
      </button>

      <button
        onClick={handleDelete}
        className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
      >
        🗑 Delete
      </button>

    </div>

  </div>

</div>
        {/* Report Viewer */}

<div className="rounded-2xl bg-white p-8 shadow">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-xl font-semibold text-slate-800">
      Report Preview
    </h2>

    <button
  onClick={downloadReport}
  disabled={downloading}
  className={`rounded-lg px-5 py-2 font-medium text-white transition ${
    downloading
      ? "bg-slate-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {downloading ? "Generating..." : "📄 Download AI Report"}
</button>

  </div>

  {isPdf && (
    <iframe
      src={fileUrl}
      title="Medical Report"
      className="h-[700px] w-full rounded-xl border"
    />
  )}

  {isImage && (
    <img
      src={fileUrl}
      alt="Medical Report"
      className="mx-auto max-h-[700px] rounded-xl border"
    />
  )}

  {!isPdf && !isImage && (
    <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">

      <h3 className="text-lg font-semibold">
        Preview not available
      </h3>

      <p className="mt-2 text-slate-500">
        This report type cannot be previewed.
      </p>

    </div>
  )}

</div>

        {/* Report Information */}

        <div className="rounded-2xl bg-white p-8 shadow">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-slate-800">
              Report Information
            </h2>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusBadge(
                report.status
              )}`}
            >
              {report.status}
            </span>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <DetailCard
              label="Original File Name"
              value={report.original_filename}
            />

            <DetailCard
              label="Stored File Name"
              value={report.stored_filename}
            />

            <DetailCard
              label="File Type"
              value={report.file_type}
            />

            <DetailCard
              label="Analysis Status"
              value={report.analysis_status}
            />

            <DetailCard
              label="Upload Date"
              value={new Date(report.created_at).toLocaleString()}
            />

            <DetailCard
              label="Report ID"
              value={report._id}
            />

          </div>
          <div className="grid gap-6 lg:grid-cols-2">
  <HealthScoreCard score={healthScore} />
  <RiskLevelCard score={healthScore} />
</div>
       {/* AI Medical Analysis */}

<div className="rounded-2xl bg-white p-8 shadow">

  <div className="mb-6">

    <h2 className="text-xl font-semibold text-slate-800">
      AI Medical Analysis
    </h2>
  <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

  <AIStatCard
    title="AI Confidence"
    value={`${Math.round((report.analysis?.confidence || 0) * 100)}%`}
    color="blue"
  />

  <AIStatCard
    title="Findings"
    value={report.analysis?.findings?.length || 0}
    color="red"
  />

  <AIStatCard
    title="Recommendations"
    value={report.analysis?.recommendations?.length || 0}
    color="green"
  />

  <AIStatCard
    title="Patient Data"
    value={
      Object.keys(report.analysis?.patient_data || {}).length
    }
    color="yellow"
  />

</div>

    <p className="mt-2 text-sm text-slate-500">
      AI-generated interpretation of your uploaded medical report.
    </p>

  </div>

  {report.analysis ? (

    <div className="space-y-6">

      {/* Summary */}

      <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">

        <h3 className="font-semibold text-blue-700">
          Medical Summary
        </h3>

        <p className="mt-2 text-slate-700">
          {report.analysis.summary}
        </p>

      </div>
    {/* Clinical Interpretation */}

<div className="rounded-xl border border-purple-100 bg-purple-50 p-5">

  <h3 className="font-semibold text-purple-700">
    Clinical Interpretation
  </h3>

  <p className="mt-2 text-slate-700">
    {report.analysis.clinical_interpretation}
  </p>

</div>

{/* Severity & Follow-up */}

<div className="grid gap-5 md:grid-cols-2">

  <div className="rounded-xl border border-red-100 bg-red-50 p-5">

    <h3 className="font-semibold text-red-700">
      Severity
    </h3>

    <p className="mt-2 text-xl font-bold">
      {report.analysis.severity}
    </p>

  </div>

  <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">

    <h3 className="font-semibold text-amber-700">
      Follow-up Required
    </h3>

    <p className="mt-2 text-xl font-bold">
      {report.analysis.follow_up_required ? "Yes" : "No"}
    </p>

  </div>

</div>

      {/* Findings */}

      <div>

        <h3 className="mb-3 font-semibold text-slate-800">
          Findings
        </h3>

        <ul className="space-y-2">

          {report.analysis.findings?.map((item, index) => (

            <li
              key={index}
              className="rounded-lg bg-red-50 border border-red-100 p-3 text-red-700"
            >
              {item}
            </li>

          ))}

        </ul>

      </div>

      {/* Clinical Recommendations */}

<div>

  <h3 className="mb-4 font-semibold text-slate-800">
    Clinical Recommendations
  </h3>

  <div className="space-y-6">

    {report.analysis.recommendations?.map((item, index) => (

      <div
        key={index}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >

        <h4 className="mb-4 text-lg font-bold text-blue-700">
          {item.parameter}
        </h4>

        {item.medical?.length > 0 && (
          <div className="mb-4">
            <h5 className="font-semibold text-red-600">
              💊 Medical
            </h5>

            <ul className="ml-5 mt-2 list-disc space-y-1">
              {item.medical.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {item.diet?.length > 0 && (
          <div className="mb-4">
            <h5 className="font-semibold text-green-600">
              🥗 Diet
            </h5>

            <ul className="ml-5 mt-2 list-disc space-y-1">
              {item.diet.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {item.lifestyle?.length > 0 && (
          <div className="mb-4">
            <h5 className="font-semibold text-indigo-600">
              🏃 Lifestyle
            </h5>

            <ul className="ml-5 mt-2 list-disc space-y-1">
              {item.lifestyle.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {item.monitoring?.length > 0 && (
          <div>
            <h5 className="font-semibold text-amber-600">
              📅 Monitoring
            </h5>

            <ul className="ml-5 mt-2 list-disc space-y-1">
              {item.monitoring.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

      </div>

    ))}

  </div>

</div>

      {/* Patient Data */}

      <LabResultsTable
  patientData={analysis.patient_data}
/>

      {/* Confidence */}

      <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-5">

        <h3 className="font-semibold text-indigo-700">
          AI Confidence
        </h3>

        <p className="mt-2 text-2xl font-bold text-indigo-700">
          {(report.analysis.confidence * 100).toFixed(0)}%
        </p>

      </div>

    </div>

  ) : (

    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">

      <p className="text-slate-500">
        AI analysis is not available for this report.
      </p>

    </div>

  )}

</div>

        </div>

      </div>
    </DashboardLayout>
  );
};


export default ReportDetails;