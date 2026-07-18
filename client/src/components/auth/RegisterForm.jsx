import { useState } from "react";

const RegisterForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    onSubmit({
      full_name: formData.full_name,
      email: formData.email,
      password: formData.password,
      role: "patient",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block mb-2 text-sm font-medium">
          Full Name
        </label>

        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Confirm Password
        </label>

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-cyan-600 py-3 text-white font-semibold hover:bg-cyan-700 disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

    </form>
  );
};

export default RegisterForm;