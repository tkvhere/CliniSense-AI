import { FiActivity, FiArrowRight, FiShield } from "react-icons/fi";
import { getUser } from "../../utils/auth";

const DoctorWelcome = () => {
  const user = getUser();

  const fullName = user?.full_name || "Doctor";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-600 p-8 text-white shadow-lg">
      <div className="relative z-10 max-w-3xl">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
            <FiActivity size={18} />
          </div>

          <span className="text-sm font-semibold text-sky-100">
            Clinical Intelligence Workspace
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back, {fullName}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100 sm:text-base">
          Review patient activity, analyze medical reports, and focus on
          clinical cases that require your attention.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50">
            Review Reports
            <FiArrowRight size={17} />
          </button>

          <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white">
            <FiShield size={16} />
            Clinical Professional
          </div>
        </div>
      </div>

      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />

      <div className="absolute -bottom-28 right-24 h-72 w-72 rounded-full bg-cyan-300/10" />
    </div>
  );
};

export default DoctorWelcome;