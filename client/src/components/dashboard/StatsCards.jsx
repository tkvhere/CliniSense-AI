import { motion } from "framer-motion";
import {
  FiFileText,
  FiCpu,
  FiAlertTriangle,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Reports",
    value: "24",
    description: "Medical reports uploaded",
    icon: FiFileText,
    color: "text-blue-600",
    bg: "from-blue-100 to-blue-50",
    border: "border-blue-500",
  },
  {
    title: "AI Analyses",
    value: "24",
    description: "Reports processed by AI",
    icon: FiCpu,
    color: "text-violet-600",
    bg: "from-violet-100 to-violet-50",
    border: "border-violet-500",
  },
  {
    title: "High Risk Cases",
    value: "3",
    description: "Require immediate attention",
    icon: FiAlertTriangle,
    color: "text-red-600",
    bg: "from-red-100 to-red-50",
    border: "border-red-500",
  },
  {
    title: "Health Score",
    value: "92%",
    description: "Average patient health",
    icon: FiHeart,
    color: "text-emerald-600",
    bg: "from-emerald-100 to-emerald-50",
    border: "border-emerald-500",
  },
];

const StatsCards = () => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className={`relative overflow-hidden rounded-3xl border-l-4 ${item.border} bg-white p-6 shadow-md transition-all`}
          >
            {/* Decorative Background */}
            <div
              className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${item.bg} opacity-60`}
            ></div>

            <div className="relative flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {item.title}
                </p>

                <h3 className="mt-4 text-4xl font-bold text-slate-800">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {item.description}
                </p>

                {/* Trend */}

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <FiTrendingUp />
                  <span>Updated Today</span>
                </div>

              </div>

              {/* Icon */}

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.bg} shadow-sm`}
              >
                <Icon size={30} className={item.color} />
              </div>

            </div>

            {/* Live Badge */}

            <div className="mt-6 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>

              <span className="text-xs text-slate-500">
                Live Dashboard
              </span>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default StatsCards;