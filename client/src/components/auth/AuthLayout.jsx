import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-cyan-700 via-cyan-600 to-blue-700 p-16 text-white">

        <Link
          to="/"
          className="text-3xl font-bold"
        >
          CliniSense AI
        </Link>

        <h1 className="mt-12 text-5xl font-bold leading-tight">
          AI Powered
          <br />
          Clinical Intelligence
        </h1>

        <p className="mt-8 max-w-lg text-lg leading-8 text-cyan-100">
          Upload medical reports, receive intelligent clinical insights,
          and understand complex healthcare information with the help
          of Artificial Intelligence.
        </p>

        <div className="mt-12 space-y-5">

          <div className="flex items-center gap-3">
            ✅ AI Report Analysis
          </div>

          <div className="flex items-center gap-3">
            ✅ Medical Entity Recognition
          </div>

          <div className="flex items-center gap-3">
            ✅ Patient Friendly Summary
          </div>

          <div className="flex items-center gap-3">
            ✅ Secure Authentication
          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-slate-50 px-6 py-12">

        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

          <h2 className="text-3xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-3 text-slate-500">
            {subtitle}
          </p>

          <div className="mt-10">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;