import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function ImagePreview({ imageUrl, imageName }) {
  if (!imageUrl) return null;

  return (
    <div className="max-w-md">
      {/* Image name above the card */}
      {imageName && (
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-1">
          {imageName}
        </p>
      )}

      <Card>
        <CardContent className="p-4">
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="rounded-md w-full object-contain"
            onError={(e) => (e.target.style.display = "none")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
