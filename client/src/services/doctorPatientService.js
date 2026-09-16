import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getDoctorPatients = async () => {
  const response = await API.get("/doctor/patients");

  return response.data;
};

export const assignPatient = async (patientId) => {
  const response = await API.post("/doctor/patients", {
    patient_id: patientId,
  });

  return response.data;
};

export const removePatient = async (patientId) => {
  const response = await API.delete(
    `/doctor/patients/${patientId}`
  );

  return response.data;
};

export default {
  getDoctorPatients,
  assignPatient,
  removePatient,
};