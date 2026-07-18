import { motion } from "framer-motion";
import { FaStar, FaUserMd } from "react-icons/fa";

const TestimonialCard = ({
  name,
  role,
  hospital,
  rating,
  review,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-xl"
    >
      {/* Rating */}
      <div className="flex gap-1 text-amber-400">
        {[...Array(rating)].map((_, index) => (
          <FaStar key={index} />
        ))}
      </div>

      {/* Review */}
      <p className="mt-6 leading-7 text-slate-600">
        "{review}"
      </p>

      {/* User */}
      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-xl text-cyan-600 transition-all duration-300 group-hover:bg-cyan-600 group-hover:text-white">
          <FaUserMd />
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">
            {name}
          </h4>

          <p className="text-sm text-slate-500">
            {role}
          </p>

          <p className="text-sm text-cyan-600">
            {hospital}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;