import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

export default function UploadArea({ onImageSelect, resetCounter }) {
  const fileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  // ✅ Restore last uploaded image from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("uploadedImage");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setPreviewUrl(parsed.previewUrl);
      setIsReady(true);
    }
  }, []);

  // ✅ Save previewUrl persistently
  useEffect(() => {
    if (isReady && previewUrl) {
      localStorage.setItem("uploadedImage", JSON.stringify({ previewUrl }));
    }
  }, [isReady, previewUrl]);

  // 🔄 Reset when parent triggers resetCounter
  useEffect(() => {
    setSelectedFile(null);
    setImageUrl("");
    setIsReady(false);
    setPreviewUrl("");
    if (fileRef.current) fileRef.current.value = "";
  }, [resetCounter]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const blobUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(blobUrl);
      setImageUrl("");
      setIsReady(true);
    }
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const blobUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(blobUrl);
      setImageUrl("");
      setIsReady(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleGetUrl = async () => {
    if (!imageUrl.trim()) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "image-from-url.jpg", { type: blob.type });
      const blobUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(blobUrl);
      setIsReady(true);
    } catch (error) {
      console.error("Error fetching image:", error);
      setSelectedFile(null);
      setIsReady(false);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onImageSelect?.(selectedFile);
    } else if (imageUrl.trim() !== "") {
      onImageSelect?.(imageUrl);
    }
  };

  // ✅ Clear uploaded image manually
  const handleClear = () => {
    setSelectedFile(null);
    setImageUrl("");
    setIsReady(false);
    setPreviewUrl("");
    localStorage.removeItem("uploadedImage");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-6 p-6 max-w-md">
      <div>
        <Label
          htmlFor="image-upload"
          className="text-base font-semibold text-gray-900 dark:text-white mb-3 block"
        >
          Upload an image
        </Label>
        <div
          className={`relative w-full h-48 border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105"
              : "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
          } hover:border-blue-400 dark:hover:border-blue-500`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileRef.current?.click()}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain rounded-xl"
            />
          ) : (
            <>
              <div
                className={`p-3 rounded-full ${
                  isDragging
                    ? "bg-blue-100 dark:bg-blue-900/40"
                    : "bg-gray-200 dark:bg-gray-700"
                } transition-colors`}
              >
                <Upload
                  className={`w-6 h-6 ${
                    isDragging
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                />
              </div>
              <p className="text-center">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Drop your image here
                </span>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                  or click to browse
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {!previewUrl && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400 font-medium">
                Or
              </span>
            </div>
          </div>

          <div>
            <Label
              htmlFor="image-url"
              className="text-base font-semibold text-gray-900 dark:text-white mb-3 block"
            >
              Paste image URL
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <Input
                  id="image-url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setSelectedFile(null);
                    setIsReady(e.target.value.trim() !== "");
                  }}
                  className="pl-10 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <Button
                type="button"
                onClick={handleGetUrl}
                disabled={!imageUrl.trim()}
                className="px-4 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium transition-colors"
              >
                Check
              </Button>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col gap-2">
        <Button
          onClick={handleUploadClick}
          disabled={!isReady}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-700 dark:disabled:to-gray-700 text-white font-semibold transition-all duration-200 hover:shadow-lg disabled:shadow-none"
        >
          Upload Image
        </Button>

        {isReady && (
          <Button
            variant="outline"
            onClick={handleClear}
            className="w-full flex gap-2 items-center justify-center"
          >
            <X className="w-4 h-4" /> Clear
          </Button>
        )}
      </div>
    </div>
  );
}
