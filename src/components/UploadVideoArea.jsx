import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Link2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function UploadVideoArea({ onVideoSelect }) {
  const fileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ---------- FILE UPLOAD HANDLER ----------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      onVideoSelect(file);
    } else {
      alert("Please select a valid video file.");
    }

    // Reset input so user can re-upload the same file
    e.target.value = "";
  };

  // ---------- DRAG & DROP ----------
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      onVideoSelect(file);
    } else {
      alert("Only video files are supported.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // ---------- URL INPUT ----------
  const handleGetUrl = async () => {
    if (!videoUrl.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      if (!blob.type.startsWith("video/")) throw new Error("Invalid video URL");
      const file = new File([blob], "video-from-url.mp4", { type: blob.type });
      onVideoSelect(file);
    } catch {
      alert("Could not load video from URL.");
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- UI ----------
  return (
    <div className="space-y-6">
      {/* Drag & Drop area */}
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
        <div className="flex flex-col items-center gap-3">
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
          <div className="text-center">
            <p className="font-semibold text-gray-700 dark:text-gray-200">
              Drag video here or click
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              MP4, WebM (Max 2GB)
            </p>
          </div>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="video/*"
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
            Or paste video URL
          </span>
        </div>
      </div>

      {/* URL input */}
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="https://example.com/video.mp4"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleGetUrl}
          disabled={!videoUrl.trim() || isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              Get
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
