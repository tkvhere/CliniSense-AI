import {
  FiTrendingUp,
  FiAlertCircle,
  FiActivity,
  FiCpu,
  FiHeart,
} from "react-icons/fi";

const insights = [
  {
    icon: <FiHeart className="text-green-600" />,
    title: "Average health score is 84%, indicating good overall patient health.",
  },
  {
    icon: <FiAlertCircle className="text-red-500" />,
    title: "18 reports have been classified as High Risk and require follow-up.",
  },
  {
    icon: <FiActivity className="text-blue-600" />,
    title: "CBC reports account for the largest share of uploaded medical reports.",
  },
  {
    icon: <FiTrendingUp className="text-indigo-600" />,
    title: "Diabetes-related reports have increased compared to previous uploads.",
  },
  {
    icon: <FiCpu className="text-cyan-600" />,
    title: "Average AI analysis confidence is 96.2%.",
  },
];

const AIInsights = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 h-[360px]">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        AI Insights
      </h2>

      <div className="space-y-4 overflow-y-auto h-[260px] pr-2">
        {insights.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border-b border-gray-100 pb-4"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
              {item.icon}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;