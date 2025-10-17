import React, { useState, useEffect } from "react";
import UploadDocumentArea from "@/components/UploadDocumentArea";
import DocMetadataCard from "@/components/DocMetadataCard";
import ReactJson from "react-json-view";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Info } from "lucide-react";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Compute SHA-256 hash of a given file
 */
async function computeFileHash(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function DocumentAnalysis() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [showRaw, setShowRaw] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error" | "info", text: string }

  // Auto-hide messages after 5s
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  /**
   * Extracts text content from supported document formats.
   */
  const extractTextFromFile = async (file) => {
    const ext = file.name.split(".").pop().toLowerCase();

    if (ext === "txt" || ext === "log") return await file.text();

    if (ext === "pdf") {
      const pdf = await pdfjsLib.getDocument(await file.arrayBuffer()).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((s) => s.str).join(" ") + " ";
      }
      return text;
    }

    if (ext === "docx") {
      const buffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value;
    }

    throw new Error("Unsupported file format");
  };

  /**
   * Analyze document for metadata, links, and potential risks.
   */
  const analyzeDocument = async (file) => {
    setScanning(true);
    setMessage({ type: "info", text: "Analyzing document..." });
    try {
      const textContent = await extractTextFromFile(file);

      const wordCount = textContent.split(/\s+/).filter(Boolean).length;
      const links = textContent.match(/https?:\/\/[^\s"]+/g) || [];
      const suspiciousLinks = links.filter(
        (url) =>
          !url.startsWith("https://") ||
          url.includes("bit.ly") ||
          url.includes("tinyurl")
      );
      const emails =
        textContent.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g) || [];

      const hash = await computeFileHash(file);

      const metadataExtracted = {
        File_Name: file.name,
        File_Type: file.type || "Unknown",
        File_Size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        Last_Modified: new Date(file.lastModified).toLocaleString(),
        SHA256_Hash: hash,
        Word_Count: wordCount,
        Detected_Links: links.length,
        Suspicious_Links: suspiciousLinks.length,
        Emails_Found: emails.length,
        Risk_Level: calculateRisk(suspiciousLinks.length, emails.length),
        File_Category: detectFileType(file.name),
        Extracted_Links: links,
      };

      setMetadata(metadataExtracted);
      setMessage({
        type: "success",
        text: `✅ Document analyzed successfully: ${file.name}`,
      });
    } catch (err) {
      console.error("❌ Error analyzing document:", err);
      setMessage({
        type: "error",
        text:
          err.message === "Unsupported file format"
            ? "Unsupported file format. Please upload PDF, DOCX, or TXT."
            : "Error reading document metadata. Please check file integrity.",
      });
    } finally {
      setScanning(false);
    }
  };

  /**
   * Estimate document risk level
   */
  const calculateRisk = (suspicious, emails) => {
    let score = suspicious * 20 + emails * 5;
    if (score > 100) score = 100;
    if (score === 0) return "Low";
    if (score <= 50) return "Moderate";
    return "High";
  };

  /**
   * Detect document category
   */
  const detectFileType = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (["pdf"].includes(ext)) return "Portable Document (PDF)";
    if (["docx", "doc"].includes(ext)) return "Word Document";
    if (["pptx", "ppt"].includes(ext)) return "PowerPoint Presentation";
    if (["txt", "log"].includes(ext)) return "Plain Text / Log File";
    return "Unknown Type";
  };

  /**
   * Reset analysis
   */
  const handleClear = () => {
    setFile(null);
    setMetadata(null);
    setShowRaw(false);
    setMessage({ type: "info", text: "🧹 Cleared — document data reset." });
  };

  /**
   * Render modern banner for messages
   */
  const renderMessage = () => {
    if (!message) return null;
    const styles = {
      success: "bg-green-100 border-green-400 text-green-800",
      error: "bg-red-100 border-red-400 text-red-800",
      info: "bg-blue-100 border-blue-400 text-blue-800",
    };
    const icons = {
      success: <CheckCircle className="w-5 h-5" />,
      error: <XCircle className="w-5 h-5" />,
      info: <Info className="w-5 h-5" />,
    };

    return (
      <div
        className={`flex items-center gap-2 border px-4 py-3 rounded-xl shadow-md transition-all duration-500 ${styles[message.type]}`}
      >
        {icons[message.type]}
        <p className="font-medium">{message.text}</p>
      </div>
    );
  };

  return (
    <div className="w-full p-4 md:p-6 space-y-8 text-left">
      {/* 🔹 Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          MetaPeek Document Analysis Branch
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Upload a document to extract metadata, detect links, and analyze
          potential risks. Supports PDF, DOCX, and TXT formats.
        </p>
      </div>

      {/* 🔹 Message Banner */}
      {message && renderMessage()}

      {/* 🔹 Upload Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
        <UploadDocumentArea
          onDocumentSelect={(selected) => {
            setFile(selected);
            setMetadata(null);
          }}
        />

        {file && (
          <div className="flex flex-wrap gap-3 mt-4">
            <Button
              onClick={() => analyzeDocument(file)}
              disabled={scanning}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {scanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Scan"
              )}
            </Button>

            <Button
              variant="destructive"
              onClick={handleClear}
              className="gap-2"
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* 🔹 Scanning Indicator */}
      {scanning && (
        <p className="text-sm mt-2 text-gray-500 animate-pulse">
          Scanning document for metadata and links...
        </p>
      )}

      {/* 🔹 Analysis Results */}
      {metadata && (
        <div className="flex flex-col gap-6 w-full">
          <DocMetadataCard metadata={metadata} />

          <Button
            onClick={() => setShowRaw(!showRaw)}
            className="w-[200px] bg-gray-700 hover:bg-gray-900 text-white rounded-xl"
          >
            {showRaw ? "Hide JSON" : "View JSON"}
          </Button>

          {showRaw && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl overflow-auto">
              <ReactJson
                src={metadata}
                theme="monokai"
                collapsed={2}
                enableClipboard
                displayDataTypes={false}
                style={{ maxHeight: "500px", overflowY: "auto" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
