import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach JWT to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ============================
// Upload Report
// ============================
export const uploadReport = async (file) => {
  const formData = new FormData();

  formData.append("report", file);

  const response = await API.post("/reports/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ============================
// Get My Reports
// ============================
export const getMyReports = async () => {
  const response = await API.get("/reports/my-reports");
  return response.data;
};

// ============================
// Get Single Report
// ============================
export const getReportById = async (reportId) => {
  const response = await API.get(`/reports/${reportId}`);
  return response.data;
};

export const deleteReport = async (reportId) => {
  return API.delete(`/reports/${reportId}`);
};

export default {
  uploadReport,
  getMyReports,
  getReportById,
  deleteReport,
};