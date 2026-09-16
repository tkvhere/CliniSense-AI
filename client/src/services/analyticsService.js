import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/analytics";

const getAnalytics = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  getAnalytics,
};