import { motion } from "framer-motion";

const AnalyticsCard = ({
  title,
  value,
  description,
  icon: Icon,
  color,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-md"
    >
      {/* Decorative Background */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-100 opacity-60" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600">
            <span>▲</span>
            <span>Updated Today</span>
          </div>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-md ${color}`}
        >
          <Icon size={28} />
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;