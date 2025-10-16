import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Film, Copy, Download } from "lucide-react";

export default function VideoMetadataCard({ metadata = {} }) {
  const [copied, setCopied] = useState(false);

  //  Safely format metadata values for display
  const formatValue = useCallback((value) => {
    if (value === null || value === undefined || value === "") return "None";
    if (Array.isArray(value)) return value.length ? value.join(", ") : "None";
    if (typeof value === "number" && !isNaN(value)) return value.toString();
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  }, []);

  //  Copy metadata to clipboard
  const handleCopy = useCallback(async () => {
    try {
      const formatted = Object.entries(metadata)
        .map(([key, value]) => `${key}: ${formatValue(value)}`)
        .join("\n");
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      const timer = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Failed to copy metadata:", error);
    }
  }, [metadata, formatValue]);

  //  Export metadata as a styled PDF
  const handleExportPDF = useCallback(() => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const { width: pageWidth, height: pageHeight } = doc.internal.pageSize;

      // Header background
      doc.setFillColor(230, 230, 230);
      doc.rect(0, 0, pageWidth, 40, "F");

      doc.setFontSize(18);
      doc.setTextColor(33, 33, 33);
      doc.text(" Video Metadata Report", pageWidth / 2, 25, { align: "center" });

      const tableData = Object.entries(metadata).map(([key, value]) => [
        key,
        formatValue(value),
      ]);

      doc.autoTable({
        startY: 50,
        head: [["Attribute", "Value"]],
        body: tableData,
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 3,
          textColor: [0, 0, 0],
          fillColor: [255, 255, 255],
          lineColor: [0, 0, 0],
          lineWidth: 0.2,
        },
        headStyles: {
          fillColor: [25, 25, 25],
          textColor: [255, 255, 255],
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      // Watermark
      doc.setFontSize(48);
      doc.setTextColor(200, 200, 200);
      doc.text("MetaPeek", pageWidth / 2, pageHeight / 1.8, {
        align: "center",
        angle: 45,
      });

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Generated on: ${new Date().toLocaleString()} © MetaPeek Video Analysis`,
        14,
        pageHeight - 10
      );

      doc.save("video_metadata.pdf");
    } catch (error) {
      console.error("Failed to export PDF:", error);
    }
  }, [metadata, formatValue]);

  //  Guard clause — don’t render if no data
  if (!metadata || typeof metadata !== "object" || Object.keys(metadata).length === 0)
    return null;

  return (
    <div className="relative w-full">
      {/* Success notification after copying */}
      {copied && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-green-500 text-white text-sm font-medium text-center py-2 rounded-t-md animate-in fade-in slide-in-from-top duration-300">
          Metadata copied successfully
        </div>
      )}

      <Card className="w-full shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Video Information
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              aria-label="Copy all metadata"
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy</span>
            </button>

            <button
              onClick={handleExportPDF}
              aria-label="Export metadata as PDF"
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-6">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {Object.entries(metadata).map(([key, value]) => (
              <div
                key={key}
                className="space-y-1.5 bg-gray-50 dark:bg-gray-900/40 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="text-green-600 dark:text-green-400 break-all text-sm font-medium">
                  {formatValue(value)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
