import {
  FaFileMedical,
  FaBrain,
  FaNotesMedical,
  FaUserMd,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

export const features = [
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
      "Translate complex medical terminology into simple language patients can easily understand.",
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
      "Enterprise-grade security and privacy for sensitive patient information.",
  },
];