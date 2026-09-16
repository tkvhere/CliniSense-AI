import { motion } from "framer-motion";

import DoctorDashboardLayout from "../../components/doctor/DoctorDashboardLayout";
import DoctorWelcome from "../../components/doctor/DoctorWelcome";
import DoctorStatsCards from "../../components/doctor/DoctorStatsCards";
import useDoctorAnalytics from "../../hooks/useDoctorAnalytics";

const DoctorDashboard = () => {
  const {
    analytics,
    loading,
    error,
    refetch,
  } = useDoctorAnalytics();

  return (
    <DoctorDashboardLayout>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <DoctorWelcome />

        <DoctorStatsCards
          analytics={analytics}
          loading={loading}
          error={error}
          refetch={refetch}
        />
      </motion.div>
    </DoctorDashboardLayout>
  );
};

export default DoctorDashboard;