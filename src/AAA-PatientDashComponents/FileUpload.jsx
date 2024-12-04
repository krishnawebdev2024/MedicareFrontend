import React, { useState, useRef } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // Import toast and ToastContainer

import { apiUrl } from "../../config/config.js";
const API_URL = apiUrl;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Ref for the file input
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setUploadStatus("");
    } else {
      setUploadStatus("Please select a valid PDF file.");
      toast.error("Please select a valid PDF file.");
      setSelectedFile(null);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setQuestion("");
    setUploadStatus("");
    setSummary(""); // Clear the summary

    // Reset the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    toast.info("File cleared.");
  };

  //const API_URL = "http://localhost:3000";

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected.");
      return;
    }
    if (!question.trim()) {
      setUploadStatus("Please provide a question.");
      toast.error("Please provide a question.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("question", question);

    try {
      setLoading(true);
      setUploadStatus("");

      const response = await axios.post(
        `${API_URL}/api/v1/fileUpload/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUploadStatus("File uploaded successfully!And your Summary is below");

      toast.success("File uploaded successfully.Your summary is here!"); // Show success toast
      console.log("Response data:", response.data);

      setSummary(response.data.AIOutcome.summary); // Set the summary here
    } catch (error) {
      setUploadStatus("Error uploading file. Please try again.");
      toast.error("Error uploading file. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen   items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-md p-8 transition-all">
        {/* Heading */}
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <FaRobot className="text-4xl text-blue-500 dark:text-blue-300 animate-bounce" />
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
              Upload Your PDF and Ask a Question
            </h1>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-md">
            Seamlessly interact with our AI by uploading your report and getting
            insights or answers instantly.
          </p>
          {/* Status */}
        </div>

        {/* Input for Question */}
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="block w-full text-lg text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 mb-6 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-all"
        />

        {/* File Input */}
        <label className="flex items-center justify-center h-16 w-full bg-blue-50 dark:bg-gray-700 rounded-lg border border-dashed border-blue-500 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-600 text-blue-700 dark:text-gray-200 cursor-pointer transition-all mb-6">
          <span className="text-sm font-medium">
            {selectedFile
              ? `Selected File: ${selectedFile.name}`
              : "Click to select a PDF file"}
          </span>
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !question || loading}
            className={`flex-1 px-6 py-3 text-lg font-semibold text-white rounded-lg transition-all ${
              selectedFile && question
                ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={handleClear}
            disabled={!(selectedFile || question)}
            className="flex-1 px-6 py-3 text-lg font-semibold text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all"
          >
            Clear
          </button>
        </div>

        {/* Status Message */}
        {uploadStatus && (
          <p
            className={`mt-6 text-center text-lg ${
              uploadStatus.includes("success")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {uploadStatus}
          </p>
        )}

        {/* Summary Display */}
        {summary && (
          <div className="mt-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-md">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
              Summary
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              {summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
