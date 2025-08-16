import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // ⬅️ need Input for URL field

export default function UploadArea({ onImageSelect }) {
  const fileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file); // store but don’t preview
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file); // store but don’t preview
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // ⬇️ New: fetch image from URL and convert to File
  const handleGetUrl = async () => {
    if (!imageUrl.trim()) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "image-from-url.jpg", { type: blob.type });
      setSelectedFile(file);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onImageSelect && onImageSelect(selectedFile); // send file up to parent
    } else if (imageUrl.trim() !== "") {
      onImageSelect && onImageSelect(imageUrl); // fallback send URL
    }
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

      {/* ⬇️ New section for inserting Image URL */}
      <div className="space-y-2">
        <Label htmlFor="image-url">Or paste image URL</Label>
        <div className="flex gap-2 bg-white-600">
          <Input
            id="image-url"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button type="button" onClick={handleGetUrl}>
            Get URL
          </Button>
        </div>
      </div>

      <Button
        onClick={handleUploadClick}
        disabled={!selectedFile && imageUrl.trim() === ""}
      >
        Upload
      </Button>
    </div>
  );
}
