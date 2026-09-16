import { motion } from "framer-motion";
import {
  FiHeart,
  FiCpu,
  FiAlertTriangle,
  FiActivity,
} from "react-icons/fi";

const ClinicalOverview = ({ reports = [], loading }) => {
  const analyzedReports = reports.filter(
    (report) => report.analysis?.analysis
  );

  const totalReports = analyzedReports.length;

  const averageHealthScore =
    totalReports > 0
      ? Math.round(
          analyzedReports.reduce(
            (sum, report) =>
              sum +
              (report.analysis.analysis.health_score || 0),
            0
          ) / totalReports
        )
      : 0;

  const averageConfidence =
    totalReports > 0
      ? Math.round(
          (analyzedReports.reduce(
            (sum, report) =>
              sum +
              ((report.analysis.analysis.confidence || 0) * 100),
            0
          ) /
            totalReports)
        )
      : 0;

  const highRiskReports = analyzedReports.filter(
    (report) =>
      report.analysis.analysis.risk_level === "High"
  ).length;

  const abnormalParameters = analyzedReports.reduce(
    (sum, report) =>
      sum +
      (report.analysis.analysis.abnormal_parameters?.length || 0),
    0
  );

  const cards = [
    {
      title: "Average Health Score",
      value: `${averageHealthScore}%`,
      subtitle: "AI Health Assessment",
      icon: FiHeart,
      color: "text-emerald-600",
      bg: "from-emerald-100 to-emerald-50",
      border: "border-emerald-500",
    },
    {
      title: "AI Confidence",
      value: `${averageConfidence}%`,
      subtitle: "Model Confidence",
      icon: FiCpu,
      color: "text-violet-600",
      bg: "from-violet-100 to-violet-50",
      border: "border-violet-500",
    },
    {
      title: "High Risk Reports",
      value: highRiskReports,
      subtitle: "Need Attention",
      icon: FiAlertTriangle,
      color: "text-red-600",
      bg: "from-red-100 to-red-50",
      border: "border-red-500",
    },
    {
      title: "Abnormal Parameters",
      value: abnormalParameters,
      subtitle: "Detected by AI",
      icon: FiActivity,
      color: "text-sky-600",
      bg: "from-sky-100 to-sky-50",
      border: "border-sky-500",
    },
  ];

  if (loading) {
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-44 animate-pulse rounded-3xl bg-slate-100"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className={`relative overflow-hidden rounded-3xl border-l-4 ${card.border} bg-white p-6 shadow-md`}
          >
            <div
              className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${card.bg} opacity-60`}
            />

            <div className="relative flex justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-4 text-4xl font-bold text-slate-800">
                  {card.value}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.bg}`}
              >
                <Icon
                  size={30}
                  className={card.color}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default ClinicalOverview;