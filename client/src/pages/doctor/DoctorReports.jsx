import { useEffect, useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiEye,
  FiFileText,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";
import {
  getDoctorPatients,
} from "../../services/doctorPatientService";

const DoctorReports = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoadingPatients(true);
        setError("");

        const response = await getDoctorPatients();

        if (response?.success && Array.isArray(response.data)) {
          setPatients(response.data);

          if (response.data.length > 0) {
            setSelectedPatientId(response.data[0]._id);
          }
        } else {
          setPatients([]);
        }
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load patients."
        );
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    if (!selectedPatientId) {
      setReports([]);
      return;
    }

    const fetchReports = async () => {
      try {
        setLoadingReports(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://127.0.0.1:5000/api/doctor/patients/${selectedPatientId}/reports`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to fetch patient reports."
          );
        }

        setReports(
          Array.isArray(data.data)
            ? data.data
            : []
        );
      } catch (err) {
        setReports([]);
        setError(
          err?.message ||
            "Unable to load patient reports."
        );
      } finally {
        setLoadingReports(false);
      }
    };

    fetchReports();
  }, [selectedPatientId]);

  const selectedPatient = patients.find(
    (patient) => patient._id === selectedPatientId
  );

  const filteredReports = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return reports;
    }

    return reports.filter((report) => {
      const filename =
        report?.original_filename?.toLowerCase() || "";

      const fileType =
        report?.file_type?.toLowerCase() || "";

      const status =
        report?.status?.toLowerCase() || "";

      const analysisStatus =
        report?.analysis_status?.toLowerCase() || "";

      return (
        filename.includes(query) ||
        fileType.includes(query) ||
        status.includes(query) ||
        analysisStatus.includes(query)
      );
    });
  }, [reports, search]);

  const getRiskStyle = (riskLevel) => {
    const value = (riskLevel || "").toLowerCase();

    if (value === "high") {
      return "bg-red-100 text-red-700";
    }

    if (value === "medium") {
      return "bg-amber-100 text-amber-700";
    }

    if (value === "low") {
      return "bg-green-100 text-green-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  const getRiskLevel = (report) => {
    return (
      report?.analysis?.risk_level ||
      report?.risk_level ||
      report?.riskLevel ||
      "Unknown"
    );
  };

  return (
    <DoctorDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Patient Reports
          </h1>

          <p className="mt-1 text-slate-500">
            Review medical reports from patients assigned to your care.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <FiUsers size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Assigned Patients
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-800">
                  {patients.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FiFileText size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Patient Reports
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-800">
                  {reports.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <FiAlertTriangle size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  High Risk Reports
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-800">
                  {
                    reports.filter(
                      (report) =>
                        getRiskLevel(report).toLowerCase() === "high"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:max-w-md">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Select Patient
              </label>

              <select
                value={selectedPatientId}
                onChange={(e) => {
                  setSelectedPatientId(e.target.value);
                  setSearch("");
                }}
                disabled={loadingPatients || patients.length === 0}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-50"
              >
                {patients.length === 0 ? (
                  <option value="">
                    No patients assigned
                  </option>
                ) : (
                  patients.map((patient) => (
                    <option
                      key={patient._id}
                      value={patient._id}
                    >
                      {patient.full_name} — {patient.email}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="relative w-full lg:w-80">
              <FiSearch
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..."
                disabled={reports.length === 0}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-50"
              />
            </div>
          </div>

          {selectedPatient && (
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl bg-sky-50 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                <FiUsers size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {selectedPatient.full_name}
                </p>

                <p className="text-xs text-slate-500">
                  {selectedPatient.email}
                </p>
              </div>
            </div>
          )}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        ) : loadingReports ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading patient reports...
            </p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FiFileText size={28} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-800">
              {search
                ? "No Reports Found"
                : "No Reports Available"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {search
                ? "Try a different search term."
                : "This patient has no uploaded reports yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Report
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Type
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Risk
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Uploaded
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReports.map((report) => {
                    const riskLevel = getRiskLevel(report);

                    return (
                      <tr
                        key={report._id}
                        className="border-t border-slate-100 transition hover:bg-sky-50/40"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                              <FiFileText size={19} />
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {report.original_filename ||
                                  "Medical Report"}
                              </p>

                              <p className="text-xs text-slate-400">
                                {report.analysis_status ||
                                  "Pending analysis"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase text-indigo-600">
                            {report.report_type ||
                              report.file_type ||
                              "Unknown"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold capitalize text-green-700">
                            {report.status || "Unknown"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getRiskStyle(
                              riskLevel
                            )}`}
                          >
                            {riskLevel}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {report.created_at
                            ? new Date(
                                report.created_at
                              ).toLocaleDateString()
                            : "—"}
                        </td>

                        <td className="px-6 py-5 text-center">
                          <button
  type="button"
  onClick={() =>
    navigate(`/doctor/reports/${report._id}`)
  }
  className="rounded-xl bg-sky-100 p-2.5 text-sky-600 transition hover:scale-105 hover:bg-sky-200"
  title="View Report"
>
  <FiEye size={18} />
</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DoctorDashboardLayout>
  );
};

export default DoctorReports;