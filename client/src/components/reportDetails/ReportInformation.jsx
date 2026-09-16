import HealthScoreCard from "../dashboard/HealthScoreCard";
import RiskLevelCard from "../dashboard/RiskLevelCard";

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

const ReportInformation = ({ report, healthScore }) => {
  return (
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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <HealthScoreCard score={healthScore} />
        <RiskLevelCard score={healthScore} />
      </div>
    </div>
  );
};

export default ReportInformation;