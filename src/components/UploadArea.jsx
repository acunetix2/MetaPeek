import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function UploadArea({ onImageSelect, resetCounter }) {
  const fileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isReady, setIsReady] = useState(false);

  // 🔄 Reset whenever parent increments resetCounter
  useEffect(() => {
    setSelectedFile(null);
    setImageUrl("");
    setIsReady(false);
    if (fileRef.current) fileRef.current.value = "";
  }, [resetCounter]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setImageUrl("");
      setIsReady(true);
    }
    // ✅ reset input so selecting the same file again triggers onChange
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
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
      setSelectedFile(file);
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
    // ❌ Do not clear here — let HomePage handle reset via resetCounter
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="image-upload">Upload an image</Label>
      <div
        className={`relative w-full h-40 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileRef.current?.click()}
      >
        <svg
          className="w-10 h-10 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8M8 16l4-4 4 4M12 4v8"
          />
        </svg>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Choose a file</span> or drag it here.
        </p>
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="space-y-2">
        <Label htmlFor="image-url">Or paste image URL</Label>
        <div className="flex gap-2">
          <Input
            id="image-url"
            type="url"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setSelectedFile(null);
              setIsReady(e.target.value.trim() !== "");
            }}
          />
          <Button
            type="button"
            onClick={handleGetUrl}
            disabled={!imageUrl.trim()} // ✅ disabled until URL entered
          >
            Get URL
          </Button>
        </div>
      </div>

      <Button onClick={handleUploadClick} disabled={!isReady}>
        Upload
      </Button>
    </div>
  );
}
