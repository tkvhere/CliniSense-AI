const getStatus = (key, value) => {
  const field = key.toLowerCase();

  if (field.includes("blood_pressure")) {
    const [sys] = String(value).split("/").map(Number);

    if (sys >= 140) {
      return {
        label: "Elevated",
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "Normal",
      color: "bg-green-100 text-green-700",
    };
  }

  if (field.includes("bmi")) {
    const bmi = Number(value);

    if (bmi < 18.5) {
      return {
        label: "Low",
        color: "bg-red-100 text-red-700",
      };
    }

    if (bmi > 25) {
      return {
        label: "High",
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "Normal",
      color: "bg-green-100 text-green-700",
    };
  }

  return {
    label: "Unknown",
    color: "bg-slate-100 text-slate-700",
  };
};

const LabResultsTable = ({ patientData = {} }) => {
  const entries = Object.entries(patientData);

  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Lab Results
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">Test</th>

              <th className="py-3 text-left">Value</th>

              <th className="py-3 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {entries.map(([key, value]) => {

              const status = getStatus(key, value);

              return (

                <tr
                  key={key}
                  className="border-b last:border-0"
                >

                  <td className="py-4 capitalize">
                    {key.replaceAll("_", " ")}
                  </td>

                  <td className="py-4 font-semibold">
                    {value}
                  </td>

                  <td className="py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${status.color}`}
                    >
                      {status.label}
                    </span>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LabResultsTable;