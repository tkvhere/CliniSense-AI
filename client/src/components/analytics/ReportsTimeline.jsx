import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { FiActivity } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const ReportsTimeline = ({ timeline }) => {
  const distribution = timeline || {};

  const sortedEntries = Object.entries(distribution).sort(
    ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
  );

  const labels = sortedEntries.map(([date]) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    })
  );

  const values = sortedEntries.map(([, count]) => count);

  const data = {
    labels,
    datasets: [
      {
        label: "Reports",
        data: values,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.12)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#2563eb",
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
            `${context.raw} Report${context.raw === 1 ? "" : "s"}`,
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
          Reports Timeline
        </h2>

        <p className="mt-2 text-slate-500">
          Number of medical reports processed over time.
        </p>
      </div>

      {labels.length === 0 ? (
        <div className="flex h-[320px] flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FiActivity className="text-2xl text-slate-400" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            No Timeline Data Available
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
            Your report processing activity will appear here over time.
          </p>
        </div>
      ) : (
        <div className="h-[320px]">
          <Line
            data={data}
            options={options}
          />
        </div>
      )}
    </div>
  );
};

export default ReportsTimeline;