const ClinicalRecommendations = ({ recommendations }) => {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Clinical Recommendations
      </h2>

      {recommendations?.length ? (
        <div className="space-y-5">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="rounded-xl border border-green-100 bg-green-50 p-6"
            >
              {/* Parameter Name */}
              <h3 className="mb-5 text-xl font-bold text-green-700">
                {recommendation.parameter}
              </h3>

              {/* Diet */}
              <div className="mb-4">
                <h4 className="mb-2 font-semibold text-slate-800">
                  🥗 Diet
                </h4>

                {recommendation.diet?.length ? (
                  <ul className="ml-6 list-disc space-y-1 text-slate-700">
                    {recommendation.diet.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-2 text-slate-500">
                    No dietary recommendation available.
                  </p>
                )}
              </div>

              {/* Lifestyle */}
              <div className="mb-4">
                <h4 className="mb-2 font-semibold text-slate-800">
                  🏃 Lifestyle
                </h4>

                {recommendation.lifestyle?.length ? (
                  <ul className="ml-6 list-disc space-y-1 text-slate-700">
                    {recommendation.lifestyle.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-2 text-slate-500">
                    No lifestyle recommendation available.
                  </p>
                )}
              </div>

              {/* Medical */}
              <div className="mb-4">
                <h4 className="mb-2 font-semibold text-slate-800">
                  💊 Medical
                </h4>

                {recommendation.medical?.length ? (
                  <ul className="ml-6 list-disc space-y-1 text-slate-700">
                    {recommendation.medical.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-2 text-slate-500">
                    No medical recommendation available.
                  </p>
                )}
              </div>

              {/* Monitoring */}
              <div>
                <h4 className="mb-2 font-semibold text-slate-800">
                  📅 Monitoring
                </h4>

                {recommendation.monitoring?.length ? (
                  <ul className="ml-6 list-disc space-y-1 text-slate-700">
                    {recommendation.monitoring.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-2 text-slate-500">
                    No monitoring recommendation available.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <p className="text-slate-500">
            No recommendations available.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClinicalRecommendations;