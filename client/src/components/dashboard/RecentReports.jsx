import { useNavigate } from "react-router-dom";
import { FiEye, FiFileText } from "react-icons/fi";

const riskStyles = {
  Low: "bg-emerald-100 text-emerald-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
  "--": "bg-slate-100 text-slate-500",
};

const statusStyles = {
  uploaded: "bg-sky-100 text-sky-700",
  processing: "bg-violet-100 text-violet-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const RecentReports = ({ reports = [], loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-slate-500">Loading reports...</p>
      </section>
    );
  }

  if (reports.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">
          Recent Reports
        </h2>

        <p className="mt-4 text-slate-500">
          No reports uploaded yet.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Recent Reports
          </h2>

          <p className="mt-2 text-slate-500">
            Your latest uploaded medical reports.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="pb-4 font-semibold text-slate-600">Report</th>
              <th className="pb-4 font-semibold text-slate-600">Date</th>
              <th className="pb-4 font-semibold text-slate-600">Status</th>
              <th className="pb-4 font-semibold text-slate-600">Risk</th>
              <th className="pb-4 font-semibold text-slate-600">Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.slice(0, 5).map((report) => (
              <tr
                key={report._id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-sky-100 p-3">
                      <FiFileText className="text-sky-600" />
                    </div>

                    <span className="font-medium text-slate-700">
                      {report.original_filename || "Medical Report"}
                    </span>
                  </div>
                </td>

                <td className="text-slate-500">
                  {report.created_at
                    ? new Date(report.created_at).toLocaleDateString("en-IN")
                    : "--"}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[report.status] ||
                      "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      riskStyles[
                        report.analysis?.analysis?.risk_level || "--"
                      ] || "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {report.analysis?.analysis?.risk_level || "--"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/reports/${report._id}`)
                    }
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-sky-600 transition hover:bg-sky-50"
                  >
                    <FiEye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentReports;