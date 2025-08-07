import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function UploadArea({ onImageSelect }) {
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="image-upload">Choose or drag an image file</Label>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleFileChange}
        className="cursor-pointer"
      />
      <Button onClick={() => fileRef.current?.click()}>Upload</Button>
    </div>
  );
}