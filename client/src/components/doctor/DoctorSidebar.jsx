import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiAlertTriangle,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiActivity,
} from "react-icons/fi";

const menuItems = [
  {
    name: "Clinical Overview",
    path: "/doctor",
    icon: FiHome,
  },
  {
    name: "Patients",
    path: "/doctor/patients",
    icon: FiUsers,
  },
  {
    name: "Reports",
    path: "/doctor/reports",
    icon: FiFileText,
  },
  {
    name: "High Risk Cases",
    path: "/doctor/high-risk",
    icon: FiAlertTriangle,
  },
  {
    name: "Clinical Analytics",
    path: "/doctor/analytics",
    icon: FiBarChart2,
  },
  {
    name: "Settings",
    path: "/doctor/settings",
    icon: FiSettings,
  },
];

const DoctorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-8 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
            <FiActivity size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-sky-600">
              CliniSense AI
            </h1>

            <p className="text-xs text-slate-500">
              Clinical Workspace
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-5">
        <div className="rounded-xl bg-sky-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            Professional Portal
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            Doctor Workspace
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end={item.path === "/doctor"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-sky-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;