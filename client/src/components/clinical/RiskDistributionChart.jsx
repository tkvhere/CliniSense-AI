import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const RiskDistributionChart = ({ reports = [] }) => {
  const analyzedReports = reports.filter(
    (report) => report.analysis?.analysis
  );

  const low = analyzedReports.filter(
    (report) =>
      report.analysis.analysis.risk_level === "Low"
  ).length;

  const medium = analyzedReports.filter(
    (report) =>
      report.analysis.analysis.risk_level === "Medium"
  ).length;

  const high = analyzedReports.filter(
    (report) =>
      report.analysis.analysis.risk_level === "High"
  ).length;

  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [low, medium, high],
        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    cutout: "70%",
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          Risk Distribution
        </h2>

        <p className="text-sm text-slate-500">
          AI classified patient reports
        </p>
      </div>

      <div className="mx-auto max-w-xs">
        <Doughnut
          data={data}
          options={options}
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-green-600">
            {low}
          </p>
          <p className="text-sm text-slate-500">
            Low
          </p>
        </div>

        <div>
          <p className="text-2xl font-bold text-yellow-500">
            {medium}
          </p>
          <p className="text-sm text-slate-500">
            Medium
          </p>
        </div>

        <div>
          <p className="text-2xl font-bold text-red-500">
            {high}
          </p>
          <p className="text-sm text-slate-500">
            High
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskDistributionChart;