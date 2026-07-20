import { motion } from "framer-motion";
import {
  FiUploadCloud,
  FiFileText,
  FiCpu,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Upload Report",
    description: "Upload PDF or image medical reports",
    icon: FiUploadCloud,
    color: "from-blue-500 to-cyan-500",
    route: "/dashboard/upload",
  },
  {
    title: "Report History",
    description: "View previously uploaded reports",
    icon: FiFileText,
    color: "from-violet-500 to-indigo-500",
    route: "/dashboard/reports",
  },
  {
    title: "AI Analysis",
    description: "Explore healthcare analytics dashboard",
    icon: FiCpu,
    color: "from-emerald-500 to-green-500",
    route: "/dashboard/analytics",
  },
  {
    title: "My Profile",
    description: "Manage your account information",
    icon: FiUser,
    color: "from-orange-500 to-amber-500",
    route: "/dashboard/profile", // Change if your profile route is different
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Quick Actions
          </h2>

          <p className="mt-2 text-slate-500">
            Access the most frequently used features of CliniSense AI.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-medium text-blue-700">
            System Online
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => navigate(action.route)}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:border-blue-200 hover:shadow-xl"
            >
              {/* Decorative Circle */}
              <div
                className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${action.color} opacity-10`}
              ></div>

              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${action.color} text-white shadow-lg`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-lg font-bold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {action.description}
              </p>

              <div className="mt-6 flex items-center gap-2 font-semibold text-blue-600 transition-all group-hover:gap-4">
                Open
                <FiArrowRight size={18} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
};

export default QuickActions;