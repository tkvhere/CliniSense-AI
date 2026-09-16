import { FiFileText, FiCpu, FiAlertTriangle, FiHeart } from "react-icons/fi";

const ReportStatistics = ({ reports = [] }) => {
  const totalReports = reports.length;

  const aiProcessed = reports.filter(
    (report) => report.analysis?.analysis
  ).length;

  const highRisk = reports.filter(
    (report) =>
      report.analysis?.analysis?.risk_level === "High"
  ).length;

  const avgHealthScore =
    aiProcessed > 0
      ? Math.round(
          reports.reduce(
            (sum, report) =>
              sum +
              (report.analysis?.analysis?.health_score || 0),
            0
          ) / aiProcessed
        )
      : 0;

  const cards = [
    {
      title: "Total Reports",
      value: totalReports,
      icon: FiFileText,
      color: "text-sky-600",
      bg: "bg-sky-100",
    },
    {
      title: "AI Processed",
      value: aiProcessed,
      icon: FiCpu,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
    {
      title: "High Risk",
      value: highRisk,
      icon: FiAlertTriangle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Avg Health Score",
      value: `${avgHealthScore}%`,
      icon: FiHeart,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-slate-800">
                  {card.value}
                </h3>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.bg}`}
              >
                <Icon className={card.color} size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportStatistics;