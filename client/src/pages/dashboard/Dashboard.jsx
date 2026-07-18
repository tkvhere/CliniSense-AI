import DashboardLayout from "../../components/dashboard/DashboardLayout";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatsCards from "../../components/dashboard/StatsCards";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentReports from "../../components/dashboard/RecentReports";
const Dashboard = () => {
  return (
   <DashboardLayout>
  <section className="space-y-8">
    <WelcomeCard />

    <StatsCards />

    <QuickActions />
    <RecentReports />
    </section>

</DashboardLayout>
  );
};

export default Dashboard;