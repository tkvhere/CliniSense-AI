import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiFileText, FiEye, FiDownload } from "react-icons/fi";
import ReportFilters from "../../components/reports/ReportFilters";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getMyReports } from "../../services/reportService";

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
  const [reportType, setReportType] = useState("All");
  const [riskLevel, setRiskLevel] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
  const result = reports.filter((report) =>
    report.original_filename
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  setFilteredReports(result);
}, [search, reports]);

  const fetchReports = async () => {
    try {
      const response = await getMyReports();

      setReports(response.data);
      setFilteredReports(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Report History
            </h1>

            <p className="mt-1 text-slate-500">
              Manage all uploaded medical reports.
            </p>

          </div>

          <ReportFilters
  search={search}
  setSearch={setSearch}
  reportType={reportType}
  setReportType={setReportType}
  riskLevel={riskLevel}
  setRiskLevel={setRiskLevel}
  sortBy={sortBy}
  setSortBy={setSortBy}
/>

        </div>

        {loading ? (

          <div className="rounded-xl bg-white p-10 text-center shadow">
            Loading reports...
          </div>

        ) : filteredReports.length === 0 ? (

          <div className="rounded-xl bg-white p-10 text-center shadow">

            <FiFileText
              size={55}
              className="mx-auto mb-4 text-slate-400"
            />

            <h2 className="text-xl font-semibold">
              No Reports Found
            </h2>

            <p className="mt-2 text-slate-500">
              Upload your first report to see it here.
            </p>

          </div>

        ) : (

          <div className="overflow-hidden rounded-2xl bg-white shadow">

            <table className="min-w-full">

              <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                <tr>

                  <th className="px-6 py-4 text-left">
                    Report
                  </th>

                  <th className="px-6 py-4 text-left">
                    Type
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Analysis
                  </th>

                  <th className="px-6 py-4 text-left">
                    Uploaded
                  </th>

                  <th className="px-6 py-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredReports.map((report) => (

                  <tr
                    key={report._id}
                    className="border-t border-slate-100 transition hover:bg-sky-50/40"
                  >

                    <td className="px-6 py-4 font-medium">
                      {report.original_filename}
                    </td>

                    <td className="px-6 py-4 uppercase">
                      {report.file_type}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {report.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                        {report.analysis_status}
                      </span>

                    </td>

                    <td className="px-6 py-4">
                      {new Date(report.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-3">

                        <button
  onClick={() => navigate(`/dashboard/reports/${report._id}`)}
  className="rounded-xl bg-sky-100 p-2.5 text-sky-600 transition hover:scale-105 hover:bg-sky-200"
  title="View"
>
  <FiEye />
</button>

                        <button
                          className="rounded-xl bg-slate-100 p-2.5 text-slate-600 transition hover:scale-105 hover:bg-slate-200"
                          title="Download"
                        >
                          <FiDownload />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
};

export default ReportHistory;