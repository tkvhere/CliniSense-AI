import StatCard from "./StatCard";
import { statistics } from "./statisticsData.jsx";

const StatisticsGrid = () => {
  return (
    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {statistics.map((stat) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </div>
  );
};

export default StatisticsGrid;