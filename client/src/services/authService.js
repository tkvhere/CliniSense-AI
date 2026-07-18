import axios from "axios";

// Backend Base URL
const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================
// Login
// ============================
export const loginUser = async (loginData) => {
  const response = await API.post("/login", loginData);
  return response.data;
};

// ============================
// Register
// ============================
export const registerUser = async (registerData) => {
  const response = await API.post("/signup", registerData);
  return response.data;
};

// ============================
// Get Current User
// ============================
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default API;