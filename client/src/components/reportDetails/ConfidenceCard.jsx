const ConfidenceCard = ({ confidence }) => {
  // Support both decimal (0.95) and percentage (95)
  const percentage =
    confidence <= 1
      ? Math.round((confidence || 0) * 100)
      : Math.round(confidence || 0);

  let color = "bg-red-500";

  if (percentage >= 80) {
    color = "bg-green-500";
  } else if (percentage >= 60) {
    color = "bg-yellow-500";
  }

  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
      <h3 className="font-semibold text-indigo-700">
        AI Confidence
      </h3>

      <p className="mt-3 text-3xl font-bold text-slate-800">
        {percentage}%
      </p>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-600">
        Confidence represents how certain the AI is about its interpretation.
      </p>
    </div>
  );
};

export default ConfidenceCard;