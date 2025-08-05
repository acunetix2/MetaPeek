import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ImagePreview({ imageUrl }) {
  if (!imageUrl) return null;

  return (
    <Card className="max-w-md">
      <CardContent className="p-4">
        <img
          src={imageUrl}
          alt="Uploaded preview"
          className="rounded-md w-full object-contain"
          onError={(e) => (e.target.style.display = "none")}
        />
      </CardContent>
    </Card>
  );
}