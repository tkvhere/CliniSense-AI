import AIStatCard from "../dashboard/AIStatCard";

const AIAnalysis = ({ report }) => {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          AI Medical Analysis
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <AIStatCard
            title="AI Confidence"
            value={`${Math.round((report.analysis?.confidence || 0) * 100)}%`}
            color="blue"
          />

          <AIStatCard
            title="Findings"
            value={report.analysis?.findings?.length || 0}
            color="red"
          />

          <AIStatCard
            title="Recommendations"
            value={report.analysis?.recommendations?.length || 0}
            color="green"
          />

          <AIStatCard
            title="Patient Data"
            value={Object.keys(report.analysis?.patient_data || {}).length}
            color="yellow"
          />
        </div>

        <p className="mt-2 text-sm text-slate-500">
          AI-generated interpretation of your uploaded medical report.
        </p>
      </div>

      {report.analysis ? (
        <div className="space-y-6">
          {/* Medical Summary */}

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="font-semibold text-blue-700">
              Medical Summary
            </h3>

            <p className="mt-2 text-slate-700">
              {report.analysis.summary}
            </p>
          </div>

          {/* Clinical Interpretation */}

          <div className="rounded-xl border border-purple-100 bg-purple-50 p-5">
            <h3 className="font-semibold text-purple-700">
              Clinical Interpretation
            </h3>

            <p className="mt-2 text-slate-700">
              {report.analysis.clinical_interpretation}
            </p>
          </div>

          {/* Severity & Follow-up */}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-red-100 bg-red-50 p-5">
              <h3 className="font-semibold text-red-700">
                Severity
              </h3>

              <p className="mt-2 text-xl font-bold">
                {report.analysis.severity}
              </p>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
              <h3 className="font-semibold text-amber-700">
                Follow-up Required
              </h3>

              <p className="mt-2 text-xl font-bold">
                {report.analysis.follow_up_required ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {/* Findings */}

          <div>
            <h3 className="mb-3 font-semibold text-slate-800">
              Findings
            </h3>

            <ul className="space-y-2">
              {report.analysis.findings?.map((item, index) => (
                <li
                  key={index}
                  className="rounded-lg border border-red-100 bg-red-50 p-3 text-red-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <p className="text-slate-500">
            AI analysis is not available for this report.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;