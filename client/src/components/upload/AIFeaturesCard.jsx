import {
  FiActivity,
  FiCheckCircle,
  FiFileText,
  FiHeart,
  FiShield,
  FiCpu,
} from "react-icons/fi";

const features = [
  {
    icon: <FiFileText />,
    title: "OCR Text Extraction",
  },
  {
    icon: <FiCpu />,
    title: "Medical Entity Recognition",
  },
  {
    icon: <FiHeart />,
    title: "AI Health Score",
  },
  {
    icon: <FiShield />,
    title: "Risk Assessment",
  },
  {
    icon: <FiActivity />,
    title: "Patient-Friendly Summary",
  },
  {
    icon: <FiCheckCircle />,
    title: "Clinical Recommendations",
  },
];

const AIFeaturesCard = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        AI Analysis Includes
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-sky-50"
          >
            <div className="rounded-lg bg-sky-100 p-2 text-sky-600">
              {feature.icon}
            </div>

            <span className="font-medium text-slate-700">
              {feature.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIFeaturesCard;