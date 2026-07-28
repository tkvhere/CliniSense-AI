import { motion } from "framer-motion";
import { FaStar, FaUserMd, FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({
  name,
  role,
  hospital,
  rating,
  review,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -12,
        scale: 1.03,
      }}
      transition={{ duration: 0.35 }}
      className="group relative overflow-hidden rounded-3xl border border-white/30 bg-white/70 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-100"
    >
      {/* Decorative Gradient */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-200/30 blur-3xl"></div>

      {/* Quote Icon */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-1 text-amber-400">
          {[...Array(rating)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>

        <FaQuoteLeft className="text-4xl text-cyan-100 transition-all duration-300 group-hover:text-cyan-300" />
      </div>

      {/* Review */}
      <p className="relative text-[16px] leading-8 text-slate-600">
        "{review}"
      </p>

      {/* Divider */}
      <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      {/* User */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-2xl text-white shadow-lg transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
          <FaUserMd />
        </div>

        <div>
          <h4 className="text-lg font-bold text-slate-900">
            {name}
          </h4>

          <p className="text-sm font-medium text-slate-500">
            {role}
          </p>

          <p className="mt-1 text-sm font-semibold text-cyan-600">
            {hospital}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;