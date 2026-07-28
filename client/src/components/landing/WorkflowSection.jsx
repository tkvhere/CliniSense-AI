import { motion } from "framer-motion";
import {
  FaUpload,
  FaBrain,
  FaSearch,
  FaFileMedical,
  FaChartLine,
} from "react-icons/fa";

const workflow = [
  {
    icon: <FaUpload />,
    title: "Upload Report",
    description:
      "Securely upload your medical reports in PDF or image format.",
  },
  {
    icon: <FaBrain />,
    title: "AI Analysis",
    description:
      "Our AI analyzes clinical values, diseases, and important findings.",
  },
  {
    icon: <FaSearch />,
    title: "Entity Extraction",
    description:
      "Automatically identifies diseases, medicines, tests, and biomarkers.",
  },
  {
    icon: <FaFileMedical />,
    title: "Patient Summary",
    description:
      "Generates an easy-to-understand explanation for patients.",
  },
  {
    icon: <FaChartLine />,
    title: "Clinical Dashboard",
    description:
      "Visualize insights and track health trends over time.",
  },
];

const WorkflowSection = () => {
  return (
    <section
      id="workflow"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            AI Clinical Workflow
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            From report upload to intelligent healthcare insights,
            CliniSense AI simplifies every step.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-5">

          {workflow.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-3xl text-white">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {step.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WorkflowSection;