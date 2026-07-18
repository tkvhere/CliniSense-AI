import { FiFileText, FiTrash2, FiCheckCircle } from "react-icons/fi";

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(2)} MB`;
};

const SelectedFileCard = ({ file, onRemove }) => {
  if (!file) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-sky-100 p-4">
            <FiFileText className="text-3xl text-sky-600" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {file.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {formatFileSize(file.size)} • {file.type || "Unknown"}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              <FiCheckCircle />
              Ready for Upload
            </div>
          </div>
        </div>

        <button
          onClick={onRemove}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-3 font-medium text-red-600 transition hover:bg-red-100"
        >
          <FiTrash2 />
          Remove
        </button>
      </div>
    </div>
  );
};

export default SelectedFileCard;