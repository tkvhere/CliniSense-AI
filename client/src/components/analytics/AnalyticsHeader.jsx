import { FiActivity } from "react-icons/fi";

const AnalyticsHeader = () => {
  const lastUpdated = new Date().toLocaleString();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <FiActivity size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Monitor reports, AI performance, patient insights, and clinical
              trends in real time.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          Last Updated
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-700">
          {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default AnalyticsHeader;