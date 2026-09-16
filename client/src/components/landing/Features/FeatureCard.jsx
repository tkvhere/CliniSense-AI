import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-xl"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl transition group-hover:bg-cyan-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="leading-7 text-slate-600">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;