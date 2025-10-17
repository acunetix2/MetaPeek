import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Copy,
  Download,
  AlertTriangle,
} from "lucide-react";

export default function DocMetadataCard({ metadata = {} }) {
  const [copied, setCopied] = useState(false);

  const formatValue = useCallback((value) => {
    if (value === null || value === undefined || value === "") return "None";
    if (Array.isArray(value)) return value.length ? value.join(", ") : "None";
    return String(value);
  }, []);

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

  const handleExportPDF = useCallback(() => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const { width: pageWidth, height: pageHeight } = doc.internal.pageSize;

      doc.setFillColor(240, 240, 240);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("Document Metadata Report", pageWidth / 2, 30, {
        align: "center",
      });

      const tableData = Object.entries(metadata).map(([key, value]) => [
        key,
        formatValue(value),
      ]);

      doc.autoTable({
        startY: 50,
        head: [["Field", "Value"]],
        body: tableData,
        theme: "grid",
        styles: {
          fontSize: 10,
          textColor: [0, 0, 0],
          fillColor: [255, 255, 255],
          lineColor: [0, 0, 0],
          lineWidth: 0.3,
        },
        headStyles: {
          fillColor: [30, 41, 59],
          textColor: [255, 255, 255],
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      doc.setFontSize(50);
      doc.setTextColor(200, 200, 200);
      doc.text("MetaPeek", pageWidth / 2, pageHeight / 2, {
        align: "center",
        angle: 45,
      });

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `Generated on: ${new Date().toLocaleString()} © MetaPeek`,
        14,
        pageHeight - 10
      );

      doc.save("document_metadata.pdf");
    } catch (error) {
      console.error("Failed to export PDF:", error);
    }
  }, [metadata, formatValue]);

  if (!metadata || Object.keys(metadata).length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Copy Notification */}
      {copied && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-green-500 text-white text-sm font-medium text-center py-2 rounded-t-md animate-in fade-in slide-in-from-top duration-300">
          Document metadata copied successfully
        </div>
      )}

      <Card className="w-full shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Document Information
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

        <CardContent className="p-6 space-y-6">
          {/* Metadata Grid */}
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="space-y-1.5">
                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                  {key}
                </p>
                <p
                  className={`break-all text-sm font-medium ${
                    key.toLowerCase().includes("risk")
                      ? value === "High"
                        ? "text-red-600 dark:text-red-400"
                        : value === "Moderate"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                      : "text-blue-700 dark:text-blue-400"
                  }`}
                >
                  {formatValue(value)}
                </p>
              </div>
            ))}
          </div>

          {/* Security Note */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed">
                <strong>Security Advisory:</strong> Always verify document
                hashes, scan for embedded links or macros, and inspect metadata
                before distribution or archival in production environments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
