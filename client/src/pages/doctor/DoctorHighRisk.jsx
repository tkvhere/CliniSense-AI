import { useEffect, useState } from "react";
import { FiAlertTriangle, FiEye, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";

const DoctorHighRisk = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHighRiskReports = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:5000/api/doctor/high-risk",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch high risk cases."
        );
      }

      setReports(data.data?.reports || []);
    } catch (err) {
      setError(
        err.message || "Unable to load high risk cases."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighRiskReports();
  }, []);

  return (
    <DoctorDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <FiAlertTriangle size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  High Risk Cases
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Review high-risk reports from patients under your care.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchHighRiskReports}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm">
              <FiAlertTriangle size={22} />
            </div>

            <div>
              <p className="text-sm font-medium text-red-600">
                High Risk Reports
              </p>

              <p className="mt-1 text-3xl font-bold text-red-700">
                {loading ? "—" : reports.length}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-semibold text-red-700">
              Unable to load cases
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && reports.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <FiAlertTriangle size={24} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              No High Risk Cases
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              No high-risk reports were found among your assigned patients.
            </p>
          </div>
        )}

        {!loading && !error && reports.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Patient
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Report
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Type
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Health Score
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Confidence
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {reports.map((report) => (
                    <tr
                      key={report.report_id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {report.patient_name || "Unknown Patient"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {report.patient_email || "—"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="max-w-[220px] truncate text-sm font-medium text-slate-700">
                          {report.filename || "Medical Report"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase text-indigo-600">
                          {report.report_type || "Unknown"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-700">
                          {report.health_score ?? "—"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-700">
                          {report.confidence != null
                            ? `${report.confidence}%`
                            : "—"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {report.created_at
                          ? new Date(
                              report.created_at
                            ).toLocaleDateString("en-IN")
                          : "—"}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/doctor/reports/${report.report_id}`
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                        >
                          <FiEye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DoctorDashboardLayout>
  );
};

export default DoctorHighRisk;