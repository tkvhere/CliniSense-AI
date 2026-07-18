import {
  FaFileUpload,
  FaBrain,
  FaSearch,
  FaNotesMedical,
} from "react-icons/fa";

export const workflowSteps = [
  {
    step: "01",
    icon: <FaFileUpload />,
    title: "Upload Medical Report",
    description:
      "Securely upload prescriptions, lab reports, discharge summaries, or diagnostic reports.",
  },
  {
    step: "02",
    icon: <FaBrain />,
    title: "AI Clinical Analysis",
    description:
      "Our AI processes the report to understand clinical context and important medical information.",
  },
  {
    step: "03",
    icon: <FaSearch />,
    title: "Medical Entity Recognition",
    description:
      "Diseases, medications, symptoms, procedures, and lab values are automatically identified.",
  },
  {
    step: "04",
    icon: <FaNotesMedical />,
    title: "Patient-Friendly Summary",
    description:
      "Receive a clear, easy-to-understand explanation along with actionable medical insights.",
  },
];