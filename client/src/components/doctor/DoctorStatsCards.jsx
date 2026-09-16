import {
  FiUsers,
  FiFileText,
  FiAlertTriangle,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";

const DoctorStatsCards = ({
  analytics,
  loading,
  error,
}) => {
  const summary = analytics || {};
  const riskDistribution = summary.riskDistribution || {};

  const stats = [
    {
      title: "Total Patients",
      value: loading || error ? "—" : summary.totalPatients ?? 0,
      description: "Patients under care",
      icon: FiUsers,
      iconStyle: "bg-sky-50 text-sky-600",
    },
    {
      title: "Total Reports",
      value: loading || error ? "—" : summary.totalReports ?? 0,
      description: "Reports reviewed",
      icon: FiFileText,
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "High Risk Cases",
      value: loading || error ? "—" : riskDistribution.high ?? 0,
      description: "Require immediate attention",
      icon: FiAlertTriangle,
      iconStyle: "bg-red-50 text-red-600",
    },
    {
      title: "Moderate Risk",
      value: loading || error ? "—" : riskDistribution.moderate ?? 0,
      description: "Require clinical monitoring",
      icon: FiActivity,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Low Risk Cases",
      value: loading || error ? "—" : riskDistribution.low ?? 0,
      description: "Stable clinical status",
      icon: FiCheckCircle,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-800">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DoctorStatsCards;