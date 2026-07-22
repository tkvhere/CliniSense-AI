import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiUploadCloud,
  FiShield,
  FiActivity,
  FiCpu,
} from "react-icons/fi";

const WelcomeCard = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 p-8 text-white shadow-2xl"
    >
      {/* Decorative Background */}
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"></div>

      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl"></div>

      <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">

        {/* Left */}
        <div className="max-w-3xl">

          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
            <FiCpu />
            AI-Powered Clinical Intelligence
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
            Welcome to CliniSense AI
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Securely upload medical reports, extract clinical information using
            OCR, receive AI-generated insights, monitor health trends, and
            generate professional healthcare reports—all from one intelligent
            platform.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg"
            >
              <FiUploadCloud size={20} />
              Upload Report
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold backdrop-blur hover:bg-white/10"
            >
              View Reports
              <FiArrowRight />
            </motion.button>

          </div>

          {/* Feature Chips */}

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
              <FiShield className="text-green-300" />
              <span>Secure Reports</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
              <FiActivity className="text-yellow-300" />
              <span>Real-Time AI Analysis</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
              <FiCpu className="text-cyan-200" />
              <span>OCR + NLP Engine</span>
            </div>

          </div>

        </div>

        {/* Right */}

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="hidden lg:flex h-64 w-64 items-center justify-center rounded-full bg-white/10 backdrop-blur"
        >
          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white/20 text-7xl shadow-inner">
            🩺
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default WelcomeCard;