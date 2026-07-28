import { motion } from "framer-motion";
import {
  FaFileMedical,
  FaUserMd,
  FaHeartbeat,
  FaGlobe,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaFileMedical />,
    value: "50K+",
    title: "Medical Reports",
    description: "Successfully analyzed with AI precision.",
  },
  {
    icon: <FaUserMd />,
    value: "2K+",
    title: "Healthcare Professionals",
    description: "Doctors and specialists using CliniSense AI.",
  },
  {
    icon: <FaHeartbeat />,
    value: "98.7%",
    title: "AI Accuracy",
    description: "Reliable clinical intelligence and report analysis.",
  },
  {
    icon: <FaGlobe />,
    value: "100K+",
    title: "Patients Assisted",
    description: "Helping people better understand their health.",
  },
];

const StatisticsSection = () => {
  return (
    <section
      id="statistics"
      className="py-24 bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-300 font-semibold uppercase tracking-widest">
            Trusted Healthcare Platform
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            Numbers That Reflect
            <span className="block text-cyan-400">
              Our Commitment
            </span>
          </h2>

          <p className="text-slate-300 mt-6 max-w-3xl mx-auto text-lg">
            CliniSense AI empowers patients and healthcare professionals
            through intelligent medical report analysis, secure data
            processing, and AI-driven clinical insights.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 text-center shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-white text-3xl">
                {stat.icon}
              </div>

              <h3 className="mt-6 text-4xl font-extrabold text-white">
                {stat.value}
              </h3>

              <h4 className="mt-2 text-xl font-semibold text-cyan-300">
                {stat.title}
              </h4>

              <p className="mt-4 text-slate-300 leading-7">
                {stat.description}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;