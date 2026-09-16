import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const DiseaseBarChart = ({ reportTypeDistribution }) => {
  const distribution = reportTypeDistribution || {};

  const labels = Object.keys(distribution);
  const values = Object.values(distribution);

  const data = {
    labels,
    datasets: [
      {
        label: "Reports",
        data: values,
        backgroundColor: [
          "#2563eb",
          "#9333ea",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#14b8a6",
          "#3b82f6",
          "#8b5cf6",
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.raw} Reports`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        grid: {
          color: "#e2e8f0",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Report Type Distribution
        </h2>

        <p className="mt-2 text-slate-500">
          Distribution of uploaded medical reports.
        </p>
      </div>

      {labels.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-slate-500">
          No reports available.
        </div>
      ) : (
        <div className="h-[320px]">
          <Bar
            data={data}
            options={options}
          />
        </div>
      )}
    </div>
  );
};

export default DiseaseBarChart;