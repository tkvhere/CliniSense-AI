import { FaFileMedical } from "react-icons/fa";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
  id="home"
  className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100"
>

      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl"></div>
      <div className="absolute top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-400/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-300/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center gap-20 px-8 py-28 lg:flex-row">

        {/* Hero Content */}
        <motion.div
  className="flex-[1.1] space-y-8"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>

          <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            AI-Powered Healthcare Platform
          </span>

          <h1 className="text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
            Smarter Clinical
            <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Intelligence
            </span>
            for Better Patient Care
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Upload medical reports, generate AI-powered summaries,
            understand clinical insights, and simplify healthcare
            decisions with CliniSense AI.
          </p>

         <div className="flex flex-wrap items-center gap-5">

  <button className="group rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40">
    Get Started
    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </button>

  <button className="rounded-xl border border-slate-300 bg-white/80 px-8 py-4 font-semibold text-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:text-cyan-600 hover:shadow-lg">
    Learn More
  </button>

</div>
        <div className="flex flex-wrap items-center gap-6 pt-2">

  <div className="flex items-center gap-2">
    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
    <span className="text-sm text-slate-600">
      Secure Reports
    </span>
  </div>

  <div className="flex items-center gap-2">
    <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
    <span className="text-sm text-slate-600">
      AI Powered
    </span>
  </div>

  <div className="flex items-center gap-2">
    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
    <span className="text-sm text-slate-600">
      Privacy First
    </span>
  </div>

</div>
        </motion.div>

        {/* AI Dashboard */}

        <motion.div
  className="flex flex-[0.9] items-center justify-center"
  initial={{ opacity: 0, x: 50, scale: 0.95 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 0.9, delay: 0.2 }}
>

            <div className="absolute -right-8 top-10 h-[420px] w-[320px] rounded-[32px] bg-gradient-to-br from-cyan-200/40 to-blue-300/30 blur-xl"></div>

          <div className="w-full max-w-xl rounded-[32px] border border-white/50 bg-white/80 p-10 shadow-[0_25px_70px_rgba(37,99,235,0.18)] backdrop-blur-xl">

            {/* Dashboard Header */}
            <div className="mb-8 flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600">
                  CliniSense AI
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  AI Clinical Dashboard
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Real-time patient report analysis
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

                <span className="text-xs font-semibold text-emerald-700">
                  Live Analysis
                </span>
              </div>

            </div>

            <div className="space-y-4">

              {/* Patient Report */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4">

                <div className="flex items-center gap-4">

                  <div className="rounded-2xl bg-cyan-100 p-3">
                    <FaFileMedical className="text-xl text-cyan-600" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Patient Report
                    </p>

                    <h4 className="font-semibold text-slate-900">
                      Blood Test Analysis
                    </h4>
                  </div>

                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Uploaded
                </span>

              </div>


              {/* Health Metrics */}
<div className="grid grid-cols-3 gap-4">

  <div className="rounded-2xl border border-slate-100 bg-white p-4">
    <p className="text-xs text-slate-500">Heart Rate</p>

    <h3 className="mt-2 text-2xl font-bold text-red-500">
      72
    </h3>

    <p className="text-xs text-slate-400">
      BPM
    </p>
  </div>

  <div className="rounded-2xl border border-slate-100 bg-white p-4">
    <p className="text-xs text-slate-500">
      AI Accuracy
    </p>

    <h3 className="mt-2 text-2xl font-bold text-cyan-600">
      99%
    </h3>

    <p className="text-xs text-slate-400">
      Verified
    </p>
  </div>

  <div className="rounded-2xl border border-slate-100 bg-white p-4">
    <p className="text-xs text-slate-500">
      Risk Score
    </p>

    <h3 className="mt-2 text-2xl font-bold text-emerald-600">
      Low
    </h3>

    <p className="text-xs text-slate-400">
      Stable
    </p>
  </div>

</div>

              {/* AI Scan Progress */}
<div className="rounded-2xl border border-slate-100 bg-white p-5">

  <div className="mb-4 flex items-center justify-between">
    <h4 className="font-semibold text-slate-900">
      AI Scan Progress
    </h4>

    <span className="text-sm font-semibold text-cyan-600">
      96%
    </span>
  </div>

  <div className="h-2 rounded-full bg-slate-200">
    <div className="h-2 w-[96%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
  </div>

  <div className="mt-4 flex justify-between text-xs text-slate-500">
    <span>Report Uploaded</span>
    <span>Entities Detected</span>
    <span>Summary Ready</span>
  </div>

</div>
              {/* Medical Report Preview */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900">
                    Recent Medical Report
                  </h4>

                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                    Processed
                  </span>
                </div>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Patient
                    </span>

                    <span className="font-medium">
                      John Anderson
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Report Type
                    </span>

                    <span className="font-medium">
                      Blood Test
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      AI Status
                    </span>

                    <span className="font-medium text-emerald-600">
                      Completed
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;