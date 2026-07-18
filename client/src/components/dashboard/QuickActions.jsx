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
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Report History",
    description: "View previously uploaded reports",
    icon: FiFileText,
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "AI Analysis",
    description: "View AI generated clinical insights",
    icon: FiCpu,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "My Profile",
    description: "Manage your account information",
    icon: FiUser,
    color: "from-orange-500 to-amber-500",
  },
];

const QuickActions = () => {
    const navigate = useNavigate();
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-2 text-slate-500">
          Access the most frequently used features of CliniSense AI.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
  key={action.title}
  onClick={() => {
    switch (action.title) {
      case "Upload Report":
        navigate("/dashboard/upload");
        break;

      default:
        break;
    }
  }}
  className="group rounded-2xl border border-slate-200 p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-xl"
>
              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${action.color} text-white shadow-lg`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {action.description}
              </p>

              <div className="mt-6 flex items-center gap-2 font-medium text-sky-600 transition-all group-hover:gap-3">
                Open
                <FiArrowRight size={18} />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;