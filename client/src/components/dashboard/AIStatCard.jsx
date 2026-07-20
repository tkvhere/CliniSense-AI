const colorVariants = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-700",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-100",
    text: "text-green-700",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    text: "text-yellow-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-100",
    text: "text-red-700",
  },
};

const AIStatCard = ({
  title,
  value,
  color = "blue",
}) => {

  const styles =
    colorVariants[color] || colorVariants.blue;

  return (
    <div
      className={`rounded-2xl border p-6 ${styles.bg} ${styles.border}`}
    >
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold ${styles.text}`}
      >
        {value}
      </h2>
    </div>
  );
};

export default AIStatCard;