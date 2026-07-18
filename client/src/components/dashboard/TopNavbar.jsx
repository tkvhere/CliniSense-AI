import { FiBell } from "react-icons/fi";

const TopNavbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Here's an overview of your clinical insights.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notification Button */}
        <button className="rounded-full border border-slate-200 p-3 transition hover:bg-slate-100">
          <FiBell size={20} className="text-slate-600" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-600 text-lg font-semibold text-white">
            U
          </div>

          <div className="hidden sm:block">
            <h4 className="text-sm font-semibold text-slate-800">
              User
            </h4>

            <p className="text-xs text-slate-500">
              Healthcare Member
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;