import { motion } from "framer-motion";

const StatCard = ({ icon, value, label }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-xl"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl text-cyan-600 transition-all duration-300 group-hover:bg-cyan-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-4xl font-bold text-slate-900">
        {value}
      </h3>

      <p className="mt-3 text-base text-slate-600">
        {label}
      </p>
    </motion.div>
  );
};

export default StatCard;