import { FiArrowRight, FiUploadCloud } from "react-icons/fi";

const WelcomeCard = () => {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 p-8 text-white shadow-xl">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        {/* Left Content */}
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
            AI-Powered Clinical Intelligence
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight lg:text-5xl">
            Welcome to CliniSense AI
          </h1>

          <p className="mt-4 text-lg text-sky-100 leading-8">
            Securely upload medical reports, receive AI-generated clinical
            insights, extract medical entities, and monitor patient health
            trends—all from one intelligent platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-sky-700 transition hover:scale-105">
              <FiUploadCloud size={20} />
              Upload Report
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              View Reports
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Side Placeholder */}
        <div className="hidden lg:flex h-52 w-52 items-center justify-center rounded-full bg-white/10 backdrop-blur">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/20 text-5xl">
            🩺
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeCard;