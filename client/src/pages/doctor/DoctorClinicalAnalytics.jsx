import { motion } from "framer-motion";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";
import useDoctorAnalytics from "../../hooks/useDoctorAnalytics";

import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import AnalyticsCard from "../../components/analytics/AnalyticsCard";
import AnalyticsSkeleton from "../../components/analytics/AnalyticsSkeleton";
import RiskPieChart from "../../components/analytics/RiskPieChart";
import DiseaseBarChart from "../../components/analytics/DiseaseBarChart";
import ReportsTimeline from "../../components/analytics/ReportsTimeline";
import RecentActivity from "../../components/analytics/RecentActivity";
import AIInsights from "../../components/analytics/AIInsights";

import {
  FiUsers,
  FiFileText,
  FiActivity,
  FiAlertTriangle,
} from "react-icons/fi";

const DoctorClinicalAnalytics = () => {
  const {
    analytics,
    loading,
    error,
    refetch,
  } = useDoctorAnalytics();

  const summary = analytics || {};
  const riskDistribution = summary.riskDistribution || {};

  return (
    <DoctorDashboardLayout>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <AnalyticsHeader
          title="Clinical Analytics"
          subtitle="Monitor clinical trends, patient risk, and AI-assisted report insights."
        />

        {loading ? (
          <AnalyticsSkeleton />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-red-700">
                  Unable to load clinical analytics
                </h3>
                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={refetch}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <AnalyticsCard
                title="Assigned Patients"
                value={summary.totalPatients ?? 0}
                description="Patients currently under care"
                icon={FiUsers}
              />

              <AnalyticsCard
                title="Total Reports"
                value={summary.totalReports ?? 0}
                description="Reports from assigned patients"
                icon={FiFileText}
              />

              <AnalyticsCard
                title="Average AI Confidence"
                value={`${summary.averageConfidence ?? 0}%`}
                description="Average analysis confidence"
                icon={FiActivity}
              />

              <AnalyticsCard
                title="High Risk Rate"
                value={`${summary.highRiskPercentage ?? 0}%`}
                description={`${riskDistribution.high ?? 0} high-risk reports`}
                icon={FiAlertTriangle}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <RiskPieChart
                riskDistribution={riskDistribution}
              />

              <DiseaseBarChart
                reportTypeDistribution={
                  summary.reportTypeDistribution || {}
                }
              />
            </div>

            <ReportsTimeline
              timeline={summary.timeline || {}}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <RecentActivity
                activities={summary.recentActivity || []}
              />

              <AIInsights
                analytics={analytics}
              />
            </div>
          </>
        )}
      </motion.div>
    </DoctorDashboardLayout>
  );
};

export default DoctorClinicalAnalytics;