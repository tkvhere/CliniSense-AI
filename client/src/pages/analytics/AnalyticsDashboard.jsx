import DashboardLayout from "../../components/dashboard/DashboardLayout";
import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import useAnalytics from "../../hooks/useAnalytics";

const AnalyticsDashboard = () => {
  const { analytics, loading, error } = useAnalytics();

  return (
    <DashboardLayout>
      <section className="space-y-8">
        <AnalyticsHeader />

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Loading analytics...
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && analytics && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Analytics API Connected
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {analytics.summary?.totalReports || 0} Reports
            </p>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default AnalyticsDashboard;