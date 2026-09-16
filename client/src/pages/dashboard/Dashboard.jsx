import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatsCards from "../../components/dashboard/StatsCards";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentReports from "../../components/dashboard/RecentReports";
import ClinicalOverview from "../../components/clinical/ClinicalOverview";
import { getMyReports } from "../../services/reportService";
import RiskDistributionChart from "../../components/clinical/RiskDistributionChart";


const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getMyReports();

if (response?.success && Array.isArray(response.data)) {
  setReports(response.data);
} else {
  setReports([]);
}
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <section className="space-y-8">
        <WelcomeCard reports={reports} loading={loading} />

<ClinicalOverview reports={reports} loading={loading} />

<QuickActions />
<RiskDistributionChart reports={reports} />


<RecentReports reports={reports} loading={loading} />
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;