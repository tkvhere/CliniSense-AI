import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { FiBarChart2 } from "react-icons/fi";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const RiskPieChart = ({ riskDistribution }) => {
  const lowRisk = riskDistribution?.low || 0;
  const mediumRisk = riskDistribution?.medium || 0;
  const highRisk = riskDistribution?.high || 0;

  const totalReports = lowRisk + mediumRisk + highRisk;

  const data = {
    labels: ["Low Risk", "Medium Risk", "High Risk"],
    datasets: [
      {
        data: [lowRisk, mediumRisk, highRisk],
        backgroundColor: [
          "#22c55e",
          "#facc15",
          "#ef4444",
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Risk Distribution
        </h2>

        <p className="mt-2 text-slate-500">
          Distribution of patient risk levels.
        </p>
      </div>

      {totalReports === 0 ? (
        <div className="flex h-[320px] flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FiBarChart2 className="text-2xl text-slate-400" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            No Risk Data Available
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
            Risk distribution will appear here after medical reports
            have been processed.
          </p>
        </div>
      ) : (
        <>
          <div className="relative mx-auto h-72 w-72">
            <Doughnut
              data={data}
              options={options}
            />

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-800">
                {totalReports}
              </span>

              <span className="text-sm text-slate-500">
                Reports
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-emerald-50 p-4 text-center">
              <div className="mx-auto mb-2 h-3 w-3 rounded-full bg-emerald-500" />

              <p className="text-sm text-slate-500">
                Low
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {lowRisk}
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4 text-center">
              <div className="mx-auto mb-2 h-3 w-3 rounded-full bg-yellow-400" />

              <p className="text-sm text-slate-500">
                Medium
              </p>

              <p className="mt-1 text-2xl font-bold text-yellow-600">
                {mediumRisk}
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-4 text-center">
              <div className="mx-auto mb-2 h-3 w-3 rounded-full bg-red-500" />

              <p className="text-sm text-slate-500">
                High
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {highRisk}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RiskPieChart;