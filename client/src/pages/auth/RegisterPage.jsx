import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";
import { registerUser } from "../../services/authService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData) => {
    try {
      setLoading(true);

      const response = await registerUser(formData);

      console.log(response);

      alert("🎉 Registration Successful!");

      navigate("/login");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join CliniSense AI and start using AI-powered clinical intelligence."
    >
      <RegisterForm
        onSubmit={handleRegister}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default RegisterPage;