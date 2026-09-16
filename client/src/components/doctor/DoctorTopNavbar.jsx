import { FiBell, FiShield } from "react-icons/fi";
import { getUser } from "../../utils/auth";

const DoctorTopNavbar = () => {
  const user = getUser();

  const fullName = user?.full_name || "Doctor";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-800">
            Clinical Overview
          </h2>

          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
            Doctor
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Monitor patient activity, reports, and clinical risk.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative rounded-full border border-slate-200 p-3 transition hover:bg-slate-100">
          <FiBell size={20} className="text-slate-600" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
            {initials || "DR"}
          </div>

          <div className="hidden sm:block">
            <h4 className="text-sm font-semibold text-slate-800">
              {fullName}
            </h4>

            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <FiShield size={12} />
              Clinical Professional
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DoctorTopNavbar;