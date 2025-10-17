import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Link2, Loader2, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function UploadDocumentArea({ onDocumentSelect }) {
  const fileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // ✅ Automatically fade out errors after a few seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // -------- HANDLE FILE UPLOAD --------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && isSupported(file.name)) {
      setErrorMessage(null);
      onDocumentSelect(file);
    } else {
      setErrorMessage("Please select a valid document (PDF, DOCX, PPTX, or TXT).");
    }
    e.target.value = "";
  };

  const isSupported = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    return ["pdf", "docx", "pptx", "txt"].includes(ext);
  };

  // -------- DRAG & DROP --------
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && isSupported(file.name)) {
      setErrorMessage(null);
      onDocumentSelect(file);
    } else {
      setErrorMessage("Unsupported document format.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  // -------- URL UPLOAD --------
  const handleGetUrl = async () => {
    if (!docUrl.trim()) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(docUrl);
      if (!response.ok) throw new Error("Network error");
      const blob = await response.blob();
      const file = new File([blob], "remote-document", { type: blob.type });
      onDocumentSelect(file);
    } catch {
      setErrorMessage("Failed to load document from the provided URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Drag & Drop Area */}
      <div
        className={`relative w-full h-48 border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ease-in-out ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]"
            : "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
        } hover:border-blue-400 dark:hover:border-blue-500`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className={`p-3 rounded-full transition-colors ${
              isDragging
                ? "bg-blue-100 dark:bg-blue-900/40"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <Upload
              className={`w-6 h-6 transition-colors ${
                isDragging
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-700 dark:text-gray-200">
              Drag document here or click to upload
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supported formats: PDF, DOCX, PPTX, TXT
            </p>
          </div>
        </div>
      </div>

      {/* ⚠️ Inline Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm shadow-sm transition-all duration-300 animate-fadeIn">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.docx,.pptx,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
            Or paste document URL
          </span>
        </div>
      </div>

      {/* URL Input + Button */}
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="https://example.com/document.pdf"
          value={docUrl}
          onChange={(e) => setDocUrl(e.target.value)}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleGetUrl}
          disabled={!docUrl.trim() || isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Loading...
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" /> Get
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
