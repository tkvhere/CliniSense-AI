import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiAlertTriangle,
  FiCheckCircle,
  FiFileText,
  FiUser,
} from "react-icons/fi";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";

const DoctorReportDetails = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://127.0.0.1:5000/api/doctor/reports/${reportId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to fetch report."
          );
        }

        setReport(data.data);
      } catch (err) {
        setError(
          err?.message ||
            "Unable to load report details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const analysis =
    report?.analysis || report?.ai_analysis || {};

  const patientData =
  report?.patient_info ||
  analysis?.patient_data ||
  report?.patient_data ||
  {};

  const riskLevel =
    analysis?.risk_level ||
    report?.risk_level ||
    report?.riskLevel ||
    "Unknown";

  const healthScore =
    analysis?.health_score ??
    report?.health_score ??
    null;

  const confidence =
    analysis?.confidence ??
    report?.confidence ??
    null;

  const getRiskStyle = () => {
    const value = riskLevel.toLowerCase();

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

  return (
    <DoctorDashboardLayout>
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/doctor/reports")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <FiArrowLeft size={17} />
          Back to Reports
        </button>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading report details...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <FiAlertTriangle
              size={32}
              className="mx-auto text-red-500"
            />

            <h2 className="mt-4 text-xl font-semibold text-red-700">
              Unable to Load Report
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          </div>
        ) : !report ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <FiFileText
              size={32}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 text-xl font-semibold text-slate-800">
              Report Not Found
            </h2>
          </div>
        ) : (
          <>
            <div className="rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-600 p-8 text-white shadow-lg">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <FiFileText size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-sky-100">
                        Clinical Report
                      </p>

                      <h1 className="text-2xl font-bold">
                        {report.original_filename ||
                          "Medical Report"}
                      </h1>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-sky-100">
                    Uploaded{" "}
                    {report.created_at
                      ? new Date(
                          report.created_at
                        ).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${getRiskStyle()}`}
                  >
                    {riskLevel} Risk
                  </span>

                  <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                    {report.report_type ||
                      report.file_type ||
                      "Medical Report"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">
                  Health Score
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {healthScore !== null
                    ? healthScore
                    : "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">
                  AI Confidence
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {confidence !== null
                    ? `${confidence <= 1
                        ? Math.round(confidence * 100)
                        : Math.round(confidence)}%`
                    : "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">
                  Analysis Status
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <FiCheckCircle
                    className="text-green-600"
                    size={20}
                  />

                  <span className="font-semibold capitalize text-green-700">
                    {report.analysis_status ||
                      "Completed"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <FiUser size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Patient Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Patient associated with this clinical report
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Name
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {patientData?.name ||
                      patientData?.patient_name ||
                      "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Age
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {patientData?.age || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Gender
                  </p>

                  <p className="mt-1 font-semibold capitalize text-slate-800">
                    {patientData?.gender || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Patient ID
                  </p>

                  <p className="mt-1 break-all font-semibold text-slate-800">
                    {report.user_id || "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800">
                Clinical Summary
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {analysis?.summary ||
                  report?.summary ||
                  "No clinical summary available."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800">
                Clinical Interpretation
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {analysis?.clinical_interpretation ||
                  report?.clinical_interpretation ||
                  "No clinical interpretation available."}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800">
                  Findings
                </h2>

                <div className="mt-4 space-y-3">
                  {Array.isArray(
                    analysis?.findings
                  ) &&
                  analysis.findings.length > 0 ? (
                    analysis.findings.map(
                      (finding, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600"
                        >
                          {typeof finding === "string"
                            ? finding
                            : finding?.finding ||
                              finding?.description ||
                              JSON.stringify(
                                finding
                              )}
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-sm text-slate-500">
                      No findings available.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800">
                  Recommendations
                </h2>

                <div className="mt-4 space-y-3">
                  {Array.isArray(
                    analysis?.recommendations
                  ) &&
                  analysis.recommendations.length > 0 ? (
                    analysis.recommendations.map(
                      (recommendation, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-sky-50 p-4 text-sm text-slate-600"
                        >
                          {typeof recommendation ===
                          "string"
                            ? recommendation
                            : recommendation?.description ||
                              recommendation?.recommendation ||
                              JSON.stringify(
                                recommendation
                              )}
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-sm text-slate-500">
                      No recommendations available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DoctorDashboardLayout>
  );
};

export default DoctorReportDetails;