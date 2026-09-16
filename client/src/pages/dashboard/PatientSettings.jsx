import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiMail,
  FiSave,
  FiUser,
} from "react-icons/fi";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import profileService from "../../services/profileService";

const PatientSettings = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await profileService.getProfile();

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to load profile."
        );
      }

      setProfile({
        full_name: response.data?.full_name || "",
        email: response.data?.email || "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await profileService.updateProfile({
        full_name: profile.full_name,
        email: profile.email,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to update profile."
        );
      }

      const updatedProfile = {
        full_name: response.data?.full_name || profile.full_name,
        email: response.data?.email || profile.email,
      };

      setProfile(updatedProfile);

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              ...updatedProfile,
            })
          );
        } catch {
          localStorage.removeItem("user");
        }
      }

      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your personal profile and account information.
          </p>
        </div>

        {success && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
            <FiCheckCircle size={18} />
            {success}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <FiUser size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  Personal Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the information associated with your account.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
          >
            <div>
              <label
                htmlFor="full_name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>

              <div className="relative">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={profile.full_name}
                  onChange={handleChange}
                  disabled={loading || saving}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-50 disabled:bg-slate-50"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={loading || saving}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-50 disabled:bg-slate-50"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-6">
              <button
                type="submit"
                disabled={loading || saving}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSave size={17} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-800">
            Account Information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Account Role
              </p>

              <p className="mt-2 text-sm font-semibold capitalize text-slate-700">
                Patient
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Account Status
              </p>

              <p className="mt-2 text-sm font-semibold text-emerald-600">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientSettings;