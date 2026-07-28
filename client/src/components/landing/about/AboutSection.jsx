import { motion } from "framer-motion";
import {
  FaRobot,
  FaShieldAlt,
  FaHeartbeat,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI-Powered Analysis",
    description:
      "Advanced AI analyzes medical reports and extracts meaningful clinical insights within seconds.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Private",
    description:
      "Your healthcare data remains encrypted and protected using industry-standard security practices.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Patient Friendly",
    description:
      "Medical terminology is transformed into simple language anyone can understand.",
  },
  {
    icon: <FaChartLine />,
    title: "Clinical Intelligence",
    description:
      "Interactive dashboards help monitor trends and make informed healthcare decisions.",
  },
];

const AboutSection = () => {
  return (
    <section
  id="about"
  className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 py-24"
>
    <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

<div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              About CliniSense AI
            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-900">
              Revolutionizing Healthcare
              <span className="block text-cyan-600">
                Through Artificial Intelligence
              </span>
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600">
              CliniSense AI is an intelligent healthcare platform designed
              to simplify clinical report analysis, improve patient
              understanding, and assist healthcare professionals using
              Artificial Intelligence.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              From secure report uploads to AI-powered summaries and
              interactive analytics, our mission is to make healthcare
              smarter, faster, and more accessible.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
  <div className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-md">
    <h4 className="text-lg font-bold text-cyan-600">🎯 Mission</h4>
    <p className="mt-2 text-slate-600">
      Simplify healthcare by transforming complex medical reports into
      clear, AI-powered insights for everyone.
    </p>
  </div>

  <div className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-md">
    <h4 className="text-lg font-bold text-cyan-600">👁 Vision</h4>
    <p className="mt-2 text-slate-600">
      Build the world's most trusted AI-powered healthcare intelligence
      platform for patients and professionals.
    </p>
  </div>
</div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-transparent bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-100"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-2xl text-white">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;