import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, ClipboardCopy } from "lucide-react";

export default function MetadataCard({ metadata }) {
  if (!metadata) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(metadata, null, 2));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-lg font-semibold">
          <InfoIcon className="w-5 h-5 text-orange-500" />
          <span>Image Metadata</span>
        </div>
        <button
          onClick={handleCopy}
          title="Copy to clipboard"
          className="text-sm text-blue-500 hover:underline flex items-center gap-1"
        >
          <ClipboardCopy className="w-4 h-4" />
          Copy
        </button>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <ScrollArea className="h-64 w-full pr-4">
          <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
