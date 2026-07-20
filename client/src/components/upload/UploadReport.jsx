import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import UploadDropzone from "../../components/upload/UploadDropzone";
import SelectedFileCard from "../../components/upload/SelectedFileCard";
import AIFeaturesCard from "../../components/upload/AIFeaturesCard";

const UploadReport = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
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
          <UploadDropzone onFileSelect={handleFileSelect} />

          <SelectedFileCard
            file={selectedFile}
            onRemove={handleRemoveFile}
          />
          <UploadDropzone onFileSelect={handleFileSelect} />

<SelectedFileCard
  file={selectedFile}
  onRemove={handleRemoveFile}
/>

<AIFeaturesCard />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default UploadReport;