const ReportPreview = ({
  isPdf,
  isImage,
  fileUrl,
  downloadReport,
  downloading,
}) => {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          Report Preview
        </h2>

        <button
          onClick={downloadReport}
          disabled={downloading}
          className={`rounded-lg px-5 py-2 font-medium text-white transition ${
            downloading
              ? "cursor-not-allowed bg-slate-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {downloading ? "Generating..." : "📄 Download AI Report"}
        </button>
      </div>

      {isPdf && (
        <iframe
          src={fileUrl}
          title="Medical Report"
          className="h-[700px] w-full rounded-xl border"
        />
      )}

      {isImage && (
        <img
          src={fileUrl}
          alt="Medical Report"
          className="mx-auto max-h-[700px] rounded-xl border"
        />
      )}

      {!isPdf && !isImage && (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
          <h3 className="text-lg font-semibold">
            Preview not available
          </h3>

          <p className="mt-2 text-slate-500">
            This report type cannot be previewed.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportPreview;