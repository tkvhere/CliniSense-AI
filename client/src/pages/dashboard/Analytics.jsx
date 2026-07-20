import { motion } from "framer-motion";
import AnalyticsCard from "../../components/analytics/AnalyticsCard";
import RiskPieChart from "../../components/analytics/RiskPieChart";
import DiseaseBarChart from "../../components/analytics/DiseaseBarChart";
import RecentActivity from "../../components/analytics/RecentActivity";
import AIInsights from "../../components/analytics/AIInsights";

import {
  FiFileText,
  FiHeart,
  FiAlertTriangle,
  FiCpu,
} from "react-icons/fi";

const Analytics = () => {
  // Demo Analytics Data
  const dashboardData = {
    totalReports: 126,
    avgHealthScore: "84%",
    highRisk: 18,
    processed: 126,
  };

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Healthcare Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          AI-powered clinical insights and report statistics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <AnalyticsCard
          title="Total Reports"
          value={dashboardData.totalReports}
          icon={<FiFileText />}
          color="bg-blue-600"
        />

        <AnalyticsCard
          title="Average Health Score"
          value={dashboardData.avgHealthScore}
          icon={<FiHeart />}
          color="bg-green-600"
        />

        <AnalyticsCard
          title="High Risk Cases"
          value={dashboardData.highRisk}
          icon={<FiAlertTriangle />}
          color="bg-red-600"
        />

        <AnalyticsCard
          title="AI Reports Processed"
          value={dashboardData.processed}
          icon={<FiCpu />}
          color="bg-indigo-600"
        />

      </div>

      {/* Charts */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

  <RiskPieChart />

  <DiseaseBarChart />

</div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RecentActivity />

        <AIInsights />

      </div>
    </motion.div>
  );
};

export default Analytics;