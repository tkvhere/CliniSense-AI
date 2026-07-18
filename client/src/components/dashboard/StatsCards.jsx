import {
  FiFileText,
  FiCpu,
  FiAlertTriangle,
  FiHeart,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Reports",
    value: "24",
    description: "Medical reports uploaded",
    icon: FiFileText,
    color: "text-sky-600",
    bg: "bg-sky-100",
  },
  {
    title: "AI Analyses",
    value: "24",
    description: "Reports processed by AI",
    icon: FiCpu,
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
  {
    title: "High Risk Cases",
    value: "3",
    description: "Require immediate attention",
    icon: FiAlertTriangle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    title: "Health Score",
    value: "92%",
    description: "Average patient health",
    icon: FiHeart,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
];

const StatsCards = () => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-slate-800">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon size={26} className={item.color} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default StatsCards;