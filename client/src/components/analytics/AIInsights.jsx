import {
  FiTrendingUp,
  FiAlertCircle,
  FiActivity,
  FiCpu,
  FiHeart,
} from "react-icons/fi";

const AIInsights = ({ analytics }) => {
  const summary = analytics?.summary || {};
  const riskDistribution = analytics?.riskDistribution || {};
  const reportTypeDistribution = analytics?.reportTypeDistribution || {};

  const totalReports = summary.totalReports || 0;
  const averageConfidence = summary.averageConfidence || 0;
  const highRiskCases = summary.highRiskCases || 0;

  const topReportType = Object.entries(reportTypeDistribution)
    .sort((a, b) => b[1] - a[1])[0];

  const topReportTypeName = topReportType
    ? topReportType[0].toUpperCase()
    : "No data";

  const topReportTypeCount = topReportType
    ? topReportType[1]
    : 0;

  const highRiskPercentage = totalReports
    ? Math.round((highRiskCases / totalReports) * 100)
    : 0;

  const insights = [];

  if (totalReports > 0) {
    insights.push({
      icon: <FiHeart className="text-green-600" />,
      title: `The system has processed ${totalReports} medical report${totalReports === 1 ? "" : "s"} for the current account.`,
    });
  }

  if (highRiskCases > 0) {
    insights.push({
      icon: <FiAlertCircle className="text-red-500" />,
      title: `${highRiskCases} report${highRiskCases === 1 ? "" : "s"} ${highRiskCases === 1 ? "has" : "have"} been classified as High Risk, representing ${highRiskPercentage}% of processed reports.`,
    });
  } else if (totalReports > 0) {
    insights.push({
      icon: <FiAlertCircle className="text-green-600" />,
      title: "No High Risk cases are currently recorded in the available analytics data.",
    });
  }

  if (topReportType) {
    insights.push({
      icon: <FiActivity className="text-blue-600" />,
      title: `${topReportTypeName} reports currently represent the largest report category with ${topReportTypeCount} report${topReportTypeCount === 1 ? "" : "s"}.`,
    });
  }

  if (averageConfidence > 0) {
    insights.push({
      icon: <FiCpu className="text-cyan-600" />,
      title: `The average AI analysis confidence across available reports is ${averageConfidence}%.`,
    });
  }

  const mediumRisk = riskDistribution.medium || 0;
  const lowRisk = riskDistribution.low || 0;

  if (mediumRisk > 0) {
    insights.push({
      icon: <FiTrendingUp className="text-indigo-600" />,
      title: `${mediumRisk} report${mediumRisk === 1 ? "" : "s"} ${mediumRisk === 1 ? "is" : "are"} currently classified as Medium Risk and may require clinical review.`,
    });
  } else if (lowRisk > 0) {
    insights.push({
      icon: <FiTrendingUp className="text-indigo-600" />,
      title: `${lowRisk} report${lowRisk === 1 ? "" : "s"} ${lowRisk === 1 ? "is" : "are"} currently classified as Low Risk.`,
    });
  }

  if (insights.length === 0) {
    insights.push({
      icon: <FiActivity className="text-blue-600" />,
      title: "No analytics insights are available yet.",
    });
  }

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