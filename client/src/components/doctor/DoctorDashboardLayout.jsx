import DoctorSidebar from "./DoctorSidebar";
import DoctorTopNavbar from "./DoctorTopNavbar";

const DoctorDashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <DoctorSidebar />

      <div className="ml-72 flex min-h-screen flex-col">
        <DoctorTopNavbar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;