import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiFileText, FiEye, FiDownload } from "react-icons/fi";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getMyReports } from "../../services/reportService";

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
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

          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
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

              <thead className="bg-slate-100">

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
                    className="border-t hover:bg-slate-50"
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
  className="rounded-lg bg-sky-100 p-2 text-sky-600 transition hover:bg-sky-200"
  title="View"
>
  <FiEye />
</button>

                        <button
                          className="rounded-lg bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
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