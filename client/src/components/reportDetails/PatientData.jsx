import LabResultsTable from "../dashboard/LabResultsTable";

const PatientData = ({ patientData }) => {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Patient Data
      </h2>

      {patientData && Object.keys(patientData).length > 0 ? (
        <LabResultsTable patientData={patientData} />
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <p className="text-slate-500">
            No patient data available.
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientData;