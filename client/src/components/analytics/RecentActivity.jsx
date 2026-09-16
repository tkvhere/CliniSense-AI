import {
  FiCheckCircle,
  FiAlertTriangle,
  FiFileText,
  FiUpload,
} from "react-icons/fi";

const getActivityIcon = (type) => {
  if (type === "high_risk") {
    return <FiAlertTriangle className="text-red-600" />;
  }

  if (type === "analysis_completed") {
    return <FiCheckCircle className="text-green-600" />;
  }

  if (type === "report_uploaded") {
    return <FiUpload className="text-blue-600" />;
  }

  return <FiFileText className="text-indigo-600" />;
};

const getTimeAgo = (timestamp) => {
  if (!timestamp) {
    return "Recently";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const seconds = Math.floor(
    (Date.now() - date.getTime()) / 1000
  );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Yesterday";
  }

  return `${days} days ago`;
};

const RecentActivity = ({ activities = [] }) => {
  const uniqueActivities = Array.from(
    new Map(
      activities.map((activity) => [
        `${activity.type}-${activity.filename}-${activity.timestamp}`,
        activity,
      ])
    ).values()
  );

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 h-[360px]">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4 overflow-y-auto h-[260px] pr-2">
        {uniqueActivities.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            No recent activity available.
          </div>
        ) : (
          uniqueActivities.map((activity, index) => (
            <div
              key={`${activity.type}-${activity.filename}-${activity.timestamp}-${index}`}
              className="flex items-center justify-between border-b border-gray-100 pb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                  {getActivityIcon(activity.type)}
                </div>

                <div>
                  <p className="font-medium text-gray-700">
                    {activity.title}
                  </p>

                  <p className="text-sm text-gray-400">
                    {getTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;