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

const DiseaseBarChart = () => {
  const data = {
    labels: [
      "CBC",
      "Diabetes",
      "Lipid",
      "Liver",
      "Kidney",
      "Thyroid",
    ],
    datasets: [
      {
        label: "Reports",
        data: [40, 26, 18, 15, 14, 13],
        backgroundColor: "#2563eb",
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
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 h-[380px]">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Disease Distribution
      </h2>

      <div className="h-[280px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DiseaseBarChart;