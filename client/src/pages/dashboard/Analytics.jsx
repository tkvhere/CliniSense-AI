import { motion } from "framer-motion";
import AnalyticsCard from "../../components/analytics/AnalyticsCard";
import RiskPieChart from "../../components/analytics/RiskPieChart";
import DiseaseBarChart from "../../components/analytics/DiseaseBarChart";
import RecentActivity from "../../components/analytics/RecentActivity";
import AIInsights from "../../components/analytics/AIInsights";
import ReportsTimeline from "../../components/analytics/ReportsTimeline";
import AnalyticsSkeleton from "../../components/analytics/AnalyticsSkeleton";
import useAnalytics from "../../hooks/useAnalytics";

import {
  FiFileText,
  FiHeart,
  FiAlertTriangle,
  FiCpu,
  FiUsers,
} from "react-icons/fi";

const Analytics = () => {
  const { analytics, loading, error } = useAnalytics();

  const summary = analytics?.summary || {};

  const totalReports = summary.totalReports || 0;
  const totalPatients = summary.totalPatients || 0;
  const averageConfidence = summary.averageConfidence || 0;
  const highRiskCases = summary.highRiskCases || 0;

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Healthcare Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          AI-powered clinical insights and report statistics.
        </p>
      </div>

      {loading && <AnalyticsSkeleton />}

      {error && !loading && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-6">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            <AnalyticsCard
              title="Total Reports"
              value={totalReports}
              icon={FiFileText}
              color="bg-blue-600"
            />

            <AnalyticsCard
              title="Total Patients"
              value={totalPatients}
              icon={FiUsers}
              color="bg-purple-600"
            />

            <AnalyticsCard
              title="Average AI Confidence"
              value={`${averageConfidence}%`}
              icon={FiHeart}
              color="bg-green-600"
            />

            <AnalyticsCard
              title="High Risk Cases"
              value={highRiskCases}
              icon={FiAlertTriangle}
              color="bg-red-600"
            />

            <AnalyticsCard
              title="AI Reports Processed"
              value={totalReports}
              icon={FiCpu}
              color="bg-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <RiskPieChart
              riskDistribution={analytics?.riskDistribution}
            />

            <DiseaseBarChart
              reportTypeDistribution={
                analytics?.reportTypeDistribution
              }
            />
          </div>

          <div className="mb-8">
            <ReportsTimeline
              timeline={analytics?.timeline}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RecentActivity
              activities={analytics?.recentActivity}
            />

            <AIInsights
              analytics={analytics}
            />
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Analytics;