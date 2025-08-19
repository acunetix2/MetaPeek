import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, ClipboardCopy, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "@/assets/logo.png";

export default function MetadataCard({ metadata }) {
  const [copied, setCopied] = useState(false);

  if (!metadata || typeof metadata !== "object") return null;

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "None";
    if (Array.isArray(value)) return value.length ? value.join(", ") : "None";
    return String(value);
  };

  const handleCopy = () => {
    const formatted = Object.entries(metadata)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join("\n");

    navigator.clipboard.writeText(formatted).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFillColor(156, 163, 175); 
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    const img = new Image();
    img.src = logo;
    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(img, "PNG", (pageWidth - imgWidth) / 2, 10, imgWidth, imgHeight);

    doc.setFontSize(18);
    const title = "Image Metadata Report";
    const textWidth = doc.getTextWidth(title);
    doc.setTextColor(0, 0, 0);
    doc.text(title, (pageWidth - textWidth) / 2, 70);

    const tableData = Object.entries(metadata).map(([key, value]) => [
      key,
      formatValue(value),
    ]);

    autoTable(doc, {
      startY: 80,
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
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.setFontSize(50);
    doc.setTextColor(200, 200, 200);
    doc.text("MetaPeek", pageWidth / 2, pageHeight / 2, { align: "center", angle: 45 });

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Generated on: ${new Date().toLocaleString()} © MetaPeek`,
      14,
      pageHeight - 10
    );

    doc.save("metadata.pdf");
  };

  return (
    <div className="relative w-full">
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
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              title="Copy all metadata"
              className="text-sm text-blue-500 hover:underline flex items-center gap-1"
            >
              <ClipboardCopy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={handleExportPDF}
              title="Export metadata as PDF"
              className="text-sm text-red-500 hover:underline flex items-center gap-1"
            >
              <FileDown className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {key}
                </span>
                <span className="text-green-500 break-all">
                  {formatValue(value)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
