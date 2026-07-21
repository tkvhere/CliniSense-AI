import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login
export const loginUser = async (loginData) => {
  const response = await API.post("/login", loginData);
  return response.data;
};

// Register
export const registerUser = async (registerData) => {
  const response = await API.post("/signup", registerData);
  return response.data;
};

// Current User
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