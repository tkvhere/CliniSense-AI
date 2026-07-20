import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const RiskPieChart = () => {
  const data = {
    labels: ["Low Risk", "Medium Risk", "High Risk"],
    datasets: [
      {
        data: [52, 56, 18],
        backgroundColor: [
          "#22c55e",
          "#facc15",
          "#ef4444",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 h-[380px]">

      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Risk Distribution
      </h2>

      <div className="h-[280px]">
        <Pie data={data} options={options} />
      </div>

    </div>
  );
};

export default RiskPieChart;