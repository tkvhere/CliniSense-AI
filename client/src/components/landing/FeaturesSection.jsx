import {
  FaFileMedical,
  FaBrain,
  FaNotesMedical,
  FaUserMd,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

import FeatureCard from "./FeatureCard";
const features = [
  {
    icon: <FaFileMedical />,
    title: "Medical Report Upload",
    description:
      "Securely upload medical reports for instant AI-powered analysis.",
  },
  {
    icon: <FaBrain />,
    title: "AI Report Summarization",
    description:
      "Generate concise and accurate summaries from complex clinical reports.",
  },
  {
    icon: <FaNotesMedical />,
    title: "Medical Entity Recognition",
    description:
      "Automatically identify diseases, medications, tests, and clinical terms.",
  },
  {
    icon: <FaUserMd />,
    title: "Patient-Friendly Explanation",
    description:
      "Translate medical terminology into simple language anyone can understand.",
  },
  {
    icon: <FaChartLine />,
    title: "Clinical Analytics",
    description:
      "Track trends and insights through interactive AI-powered dashboards.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Medical Records",
    description:
      "Privacy-focused architecture with secure handling of patient information.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Everything You Need for
            <span className="block text-cyan-600">
              AI Clinical Intelligence
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            CliniSense AI combines artificial intelligence, clinical
            analytics, and patient-friendly insights into one secure
            healthcare platform.
          </p>

        </div>
        
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
  {features.map((feature) => (
    <FeatureCard
      key={feature.title}
      icon={feature.icon}
      title={feature.title}
      description={feature.description}
    />
  ))}
</div>

      </div>
    </section>
  );
};

export default FeaturesSection;