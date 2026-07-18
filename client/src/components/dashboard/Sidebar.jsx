import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUpload,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    name: "Upload Report",
    path: "/dashboard/upload",
    icon: FiUpload,
  },
  {
    name: "Report History",
    path: "/dashboard/reports",
    icon: FiFileText,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: FiBarChart2,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: FiSettings,
  },
];

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 px-8 py-7">
        <h1 className="text-2xl font-bold text-sky-600">
          CliniSense AI
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Clinical Intelligence Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
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

      {/* Logout */}
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

export default Sidebar;