import { useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import UploadDropZone from "../../components/upload/UploadDropZone";
import SelectedFileCard from "../../components/upload/SelectedFileCard";
import { uploadReport } from "../../services/reportService";

const UploadReport = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setMessage("");
    setError("");
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setMessage("");
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a medical report first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const response = await uploadReport(selectedFile);

      setMessage(response.message || "Report uploaded successfully.");
      console.log(response);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Failed to upload report."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <section className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Upload Medical Report
          </h1>

          <p className="mt-2 text-slate-500">
            Upload PDF or image reports for AI-powered clinical analysis.
          </p>
        </div>

        <div className="space-y-6">
          <UploadDropZone onFileSelect={handleFileSelect} />

          <SelectedFileCard
            file={selectedFile}
            onRemove={handleRemoveFile}
          />

          {selectedFile && (
            <div className="flex items-center gap-4">
              <button
                onClick={handleUpload}
                disabled={loading}
                className="rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Uploading..." : "Upload Report"}
              </button>

              {message && (
                <span className="text-sm font-medium text-green-600">
                  {message}
                </span>
              )}

              {error && (
                <span className="text-sm font-medium text-red-600">
                  {error}
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default UploadReport;