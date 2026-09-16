import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProfile = async () => {
  const response = await API.get("/me");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await API.put("/profile", profileData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export default {
  getProfile,
  updateProfile,
};