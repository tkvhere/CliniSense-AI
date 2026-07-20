const getRisk = (score) => {
  if (score >= 80) {
    return {
      label: "Low Risk",
      color: "text-green-600",
      bg: "bg-green-100",
    };
  }

  if (score >= 60) {
    return {
      label: "Moderate Risk",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    };
  }

  return {
    label: "High Risk",
    color: "text-red-600",
    bg: "bg-red-100",
  };
};

const HealthScoreCard = ({ score }) => {

  const risk = getRisk(score);

  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="text-xl font-bold text-slate-800">
        Overall Health Score
      </h2>

      <div className="mt-6">

        <div className="mb-3 flex items-end gap-3">

          <span className="text-5xl font-bold text-slate-800">
            {score}
          </span>

          <span className="pb-2 text-slate-500">
            /100
          </span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-indigo-600"
            style={{
              width: `${score}%`,
            }}
          />

        </div>

        <span
          className={`mt-5 inline-block rounded-full px-4 py-2 font-semibold ${risk.bg} ${risk.color}`}
        >
          {risk.label}
        </span>

      </div>

    </div>
  );
};

export default HealthScoreCard;