import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
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
  const [loading, setLoading] = useState(true);
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

        <div className="rounded-2xl bg-white p-8 shadow">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                Report Details
              </h1>

              <p className="mt-2 text-slate-500">
                View your uploaded medical report information.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

  <button
    onClick={() => navigate(-1)}
    className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
  >
    ← Back
  </button>

  <Link
    to="/dashboard/reports"
    className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700"
  >
    Report History
  </Link>

  <a
    href={fileUrl}
    target="_blank"
    rel="noreferrer"
    download
    className="rounded-lg bg-emerald-600 px-5 py-2 font-medium text-white transition hover:bg-emerald-700"
  >
    Download
  </a>

  <button
  onClick={handleDelete}
  className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
>
  Delete
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

    <a
      href={fileUrl}
      target="_blank"
      rel="noreferrer"
      download
      className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
    >
      Download Report
    </a>

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

        </div>

      </div>
    </DashboardLayout>
  );
};


export default ReportDetails;
{/* AI Analysis */}

<div className="rounded-2xl bg-white p-8 shadow">

  <div className="flex items-center justify-between">

    <div>

      <h2 className="text-xl font-semibold text-slate-800">
        AI Medical Analysis
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        AI-powered clinical insights will appear here after analysis.
      </p>

    </div>

    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
      Coming Soon
    </span>

  </div>

  <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

      <h3 className="font-semibold text-slate-800">
        OCR Status
      </h3>

      <p className="mt-3 text-sm text-slate-500">
        Waiting for OCR extraction.
      </p>

    </div>

    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

      <h3 className="font-semibold text-slate-800">
        Medical Summary
      </h3>

      <p className="mt-3 text-sm text-slate-500">
        AI summary will be generated.
      </p>

    </div>

    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

      <h3 className="font-semibold text-slate-800">
        Abnormal Values
      </h3>

      <p className="mt-3 text-sm text-slate-500">
        No analysis available yet.
      </p>

    </div>

    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

      <h3 className="font-semibold text-slate-800">
        Clinical Recommendation
      </h3>

      <p className="mt-3 text-sm text-slate-500">
        AI recommendations will appear here.
      </p>

    </div>

  </div>

</div>