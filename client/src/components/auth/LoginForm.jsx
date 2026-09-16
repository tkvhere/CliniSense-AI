import { useState } from "react";

const LoginForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    onSubmit(formData);
  };

  const roles = [
    {
      value: "patient",
      label: "Patient",
    },
    {
      value: "doctor",
      label: "Doctor",
    },
    {
      value: "admin",
      label: "Admin",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Login As
        </label>

        <div className="grid grid-cols-3 gap-2">
          {roles.map((role) => (
            <button
              key={role.value}
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  role: role.value,
                }))
              }
              className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                formData.role === role.value
                  ? "border-cyan-600 bg-cyan-600 text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:border-cyan-400 hover:text-cyan-600"
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;