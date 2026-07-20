import {
  FiUpload,
  FiFileText,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

const activities = [
  {
    icon: <FiUpload className="text-blue-600" />,
    title: "CBC Report Uploaded",
    time: "2 min ago",
  },
  {
    icon: <FiCheckCircle className="text-green-600" />,
    title: "AI Analysis Completed",
    time: "10 min ago",
  },
  {
    icon: <FiFileText className="text-indigo-600" />,
    title: "PDF Report Generated",
    time: "35 min ago",
  },
  {
    icon: <FiAlertTriangle className="text-red-600" />,
    title: "High Risk Case Detected",
    time: "1 hour ago",
  },
  {
    icon: <FiUpload className="text-blue-600" />,
    title: "Diabetes Report Uploaded",
    time: "Yesterday",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 h-[360px]">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4 overflow-y-auto h-[260px] pr-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-100 pb-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                {activity.icon}
              </div>

              <div>
                <p className="font-medium text-gray-700">
                  {activity.title}
                </p>

                <p className="text-sm text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;