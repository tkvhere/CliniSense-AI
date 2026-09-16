import { Link } from "react-router-dom";

const ReportHeader = ({
  navigate,
  downloadReport,
  downloading,
  handleDelete,
}) => {
  return (
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
            {downloading
              ? "Generating AI Report..."
              : "📄 Download AI Report"}
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
  );
};

export default ReportHeader;