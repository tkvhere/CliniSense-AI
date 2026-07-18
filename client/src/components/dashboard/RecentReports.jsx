import { FiEye, FiFileText } from "react-icons/fi";

const reports = [
  {
    id: 1,
    name: "Complete Blood Count.pdf",
    date: "18 Jul 2026",
    status: "Completed",
    risk: "Low",
  },
  {
    id: 2,
    name: "Chest X-Ray Report.pdf",
    date: "17 Jul 2026",
    status: "Completed",
    risk: "Medium",
  },
  {
    id: 3,
    name: "MRI Brain Scan.pdf",
    date: "15 Jul 2026",
    status: "Processing",
    risk: "--",
  },
];

const riskStyles = {
  Low: "bg-emerald-100 text-emerald-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
  "--": "bg-slate-100 text-slate-500",
};

const statusStyles = {
  Completed: "bg-sky-100 text-sky-700",
  Processing: "bg-violet-100 text-violet-700",
};

const RecentReports = () => {
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
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-sky-100 p-3">
                      <FiFileText className="text-sky-600" />
                    </div>

                    <span className="font-medium text-slate-700">
                      {report.name}
                    </span>
                  </div>
                </td>

                <td className="text-slate-500">
                  {report.date}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[report.status]
                    }`}
                  >
                    {report.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      riskStyles[report.risk]
                    }`}
                  >
                    {report.risk}
                  </span>
                </td>

                <td>
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-sky-600 transition hover:bg-sky-50">
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