import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import Dashboard from "./pages/dashboard/Dashboard";
import UploadReport from "./pages/dashboard/UploadReport";
import ReportHistory from "./pages/dashboard/ReportHistory";
import ReportDetails from "./pages/dashboard/ReportDetails";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/upload" element={<UploadReport />} />
      <Route path="/dashboard/reports" element={<ReportHistory />} />
      <Route
        path="/dashboard/reports/:reportId"
        element={<ReportDetails />}
      />

    </Routes>
  );
}

export default App;