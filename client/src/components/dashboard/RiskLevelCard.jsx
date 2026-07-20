const RiskLevelCard = ({ score }) => {
  let risk = {
    label: "High Risk",
    color: "text-red-700",
    bg: "bg-red-100",
    border: "border-red-200",
    icon: "🔴",
  };

  if (score >= 80) {
    risk = {
      label: "Low Risk",
      color: "text-green-700",
      bg: "bg-green-100",
      border: "border-green-200",
      icon: "🟢",
    };
  } else if (score >= 60) {
    risk = {
      label: "Moderate Risk",
      color: "text-yellow-700",
      bg: "bg-yellow-100",
      border: "border-yellow-200",
      icon: "🟡",
    };
  }

  return (
    <div className={`rounded-2xl border p-8 ${risk.bg} ${risk.border}`}>
      <h2 className="text-xl font-bold text-slate-800">
        Overall Risk Level
      </h2>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-5xl">{risk.icon}</span>

        <div>
          <p className={`text-2xl font-bold ${risk.color}`}>
            {risk.label}
          </p>

          <p className="text-sm text-slate-600 mt-1">
            Based on the current AI analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskLevelCard;