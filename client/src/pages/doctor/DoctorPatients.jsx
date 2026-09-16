import { useEffect, useState } from "react";
import { FiSearch, FiUsers, FiMail, FiUser } from "react-icons/fi";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";
import { getDoctorPatients } from "../../services/doctorPatientService";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDoctorPatients();

        if (response?.success && Array.isArray(response.data)) {
          setPatients(response.data);
        } else {
          setPatients([]);
          setError(
            response?.message || "Unable to fetch patients."
          );
        }
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load patients."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const query = search.toLowerCase();

    return (
      patient?.full_name?.toLowerCase().includes(query) ||
      patient?.email?.toLowerCase().includes(query)
    );
  });

  return (
    <DoctorDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Patients
            </h1>

            <p className="mt-1 text-slate-500">
              View and manage patients assigned to your clinical care.
            </p>
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
              placeholder="Search patients..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading patients...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FiUsers size={28} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-800">
              {search ? "No Patients Found" : "No Patients Assigned"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {search
                ? "Try searching with a different name or email."
                : "Patients assigned to you will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Patient
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient) => {
                    const initials = patient?.full_name
                      ?.split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((name) => name.charAt(0).toUpperCase())
                      .join("");

                    return (
                      <tr
                        key={patient._id}
                        className="border-t border-slate-100 transition hover:bg-sky-50/40"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                              {initials || "P"}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {patient.full_name || "Patient"}
                              </p>

                              <p className="text-xs text-slate-400">
                                Patient ID: {patient._id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <FiMail size={16} />
                            {patient.email}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold capitalize text-slate-600">
                            <FiUser size={14} />
                            {patient.role}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                            Active
                          </span>
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

export default DoctorPatients;