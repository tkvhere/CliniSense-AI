import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import Dashboard from "./pages/dashboard/Dashboard";
import UploadReport from "./pages/dashboard/UploadReport";
import ReportHistory from "./pages/dashboard/ReportHistory";
import ReportDetails from "./pages/dashboard/ReportDetails";
import Analytics from "./pages/dashboard/Analytics";
import PatientSettings from "./pages/dashboard/PatientSettings";

import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorReports from "./pages/doctor/DoctorReports";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorReportDetails from "./pages/doctor/DoctorReportDetails";
import DoctorClinicalAnalytics from "./pages/doctor/DoctorClinicalAnalytics";
import DoctorHighRisk from "./pages/doctor/DoctorHighRisk";
import DoctorSettings from "./pages/doctor/DoctorSettings";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleRoute from "./components/auth/RoleRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/upload" element={<UploadReport />} />
        <Route path="/dashboard/reports" element={<ReportHistory />} />
        <Route
          path="/dashboard/reports/:reportId"
          element={<ReportDetails />}
        />
        <Route
          path="/dashboard/analytics"
          element={<Analytics />}
        />
        <Route
          path="/dashboard/settings"
          element={<PatientSettings />}
        />

        <Route element={<RoleRoute allowedRoles={["doctor"]} />}>
          <Route
            path="/doctor"
            element={<DoctorDashboard />}
          />
          <Route
            path="/doctor/patients"
            element={<DoctorPatients />}
          />
          <Route
            path="/doctor/reports"
            element={<DoctorReports />}
          />
          <Route
            path="/doctor/reports/:reportId"
            element={<DoctorReportDetails />}
          />
          <Route
            path="/doctor/analytics"
            element={<DoctorClinicalAnalytics />}
          />
          <Route
            path="/doctor/high-risk"
            element={<DoctorHighRisk />}
          />
          <Route
            path="/doctor/settings"
            element={<DoctorSettings />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;