import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import { loginUser } from "../../services/authService";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    try {
      setLoading(true);

      const response = await loginUser(formData);

      console.log("Login Response:", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      // Save JWT Token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      console.log("Saved Token:", localStorage.getItem("token"));

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed.";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue using CliniSense AI"
    >
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default LoginPage;