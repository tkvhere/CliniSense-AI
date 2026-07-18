import { motion } from "framer-motion";

const WorkflowCard = ({ step, icon, title, description, index }) => {
  return (
    <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: 0.5,
    delay: index * 0.15,
  }}
  whileHover={{ y: -8 }}
  className="group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-xl"
>
      {/* Step Number */}
      <div className="absolute -top-4 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white shadow-lg">
        {step}
      </div>

      {/* Icon */}
      <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl text-cyan-600 transition-colors duration-300 group-hover:bg-cyan-600 group-hover:text-white">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-semibold text-slate-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>
    </motion.div>
  );
};

export default WorkflowCard;