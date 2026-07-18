import { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

const UploadDropzone = ({ onFileSelect }) => {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      className="cursor-pointer rounded-3xl border-2 border-dashed border-sky-300 bg-white p-12 text-center transition-all duration-300 hover:border-sky-500 hover:bg-sky-50"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center">
        <div className="mb-6 rounded-full bg-sky-100 p-6">
          <FiUploadCloud className="text-5xl text-sky-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800">
          Drag & Drop Medical Report
        </h2>

        <p className="mt-4 max-w-md text-slate-500">
          Click anywhere to browse your files.
          PDF, JPG, JPEG and PNG are supported.
        </p>

        <button
          type="button"
          className="mt-8 rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          Choose File
        </button>
      </div>
    </div>
  );
};

export default UploadDropzone;