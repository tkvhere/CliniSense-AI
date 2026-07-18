import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/Logo";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl rounded-2xl border border-slate-200/70 bg-white/80 shadow-xl backdrop-blur-2xl"
    >
      <div className="flex h-20 items-center justify-between px-8">

        {/* Left */}
        <div className="flex items-center gap-3">
         <Logo />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            CliniSense AI
         </h1>

        <p className="text-xs font-medium tracking-wide text-slate-500">
              AI-Powered Clinical Intelligence
        </p>
            <p className="text-xs text-slate-500">
              AI Clinical Intelligence
            </p>
          </div>
        </div>

        {/* Center */}
<div className="hidden items-center gap-10 md:flex">
  {["Home", "Features", "Workflow", "About"].map((item) => (
    <a
      key={item}
      href="#"
      className="group relative text-[15px] font-medium text-slate-600 transition duration-300 hover:text-blue-600"
    >
      {item}

      <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
    </a>
  ))}
</div>
        {/* Right */}
<div className="hidden items-center gap-4 md:flex">
  <Link
  to="/login"
  className="rounded-xl border border-slate-300 bg-white/60 px-5 py-2.5 text-sm font-semibold text-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
>
  Login
</Link>

  <Link
  to="/register"
  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
>
  Get Started
</Link>
</div>
      </div>
    </motion.nav>
  );
};

export default Navbar;