import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import { loginUser } from "../../services/authService";
import { getUserRole } from "../../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    try {
      setLoading(true);

      const response = await loginUser(formData);

      if (!response.success) {
        throw new Error(response.message);
      }

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      const role = getUserRole();

      if (role === "doctor") {
        navigate("/doctor");
        return;
      }

      if (role === "admin") {
        navigate("/admin");
        return;
      }

      navigate("/dashboard");

    } catch (error) {
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