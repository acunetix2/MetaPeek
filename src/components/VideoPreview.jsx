import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function VideoPreview({ videoUrl, videoName }) {
  if (!videoUrl) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {videoName && (
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-1">
          {videoName}
        </p>
      )}

      <Card className="overflow-hidden">
        <CardContent className="p-0 bg-black">
          {/* Reduced height aspect ratio */}
          <div className="w-full" style={{ aspectRatio: "28 / 9" }}>
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-contain rounded-none"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
