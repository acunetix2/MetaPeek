import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, ClipboardCopy } from "lucide-react";

export default function MetadataCard({ metadata }) {
  const [copied, setCopied] = useState(false);

  if (!metadata || typeof metadata !== "object") return null;

  const handleCopy = () => {
    const formatted = Object.entries(metadata)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join("\n");

    navigator.clipboard.writeText(formatted).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Hide after 3 seconds
    });
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "None";
    if (Array.isArray(value)) return value.length ? value.join(", ") : "None";
    return String(value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Notification bar */}
      {copied && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-green-500 text-white text-sm font-medium text-center py-2 rounded-t-md animate-slide-down">
          Details copied successfully
        </div>
      )}

      <Card className="w-full">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <InfoIcon className="w-5 h-5 text-orange-500" />
            <span>Image Information</span>
          </div>
          <button
            onClick={handleCopy}
            title="Copy all metadata"
            className="text-sm text-blue-500 hover:underline flex items-center gap-1"
          >
            <ClipboardCopy className="w-4 h-4" />
            Copy
          </button>
        </CardHeader>
        <Separator />
        <CardContent className="p-4">
          <ScrollArea className="h-64 w-full pr-4">
            <ul className="text-sm space-y-2">
              {Object.entries(metadata).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{key}:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {formatValue(value)}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
