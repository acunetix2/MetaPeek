import React, { useState, useEffect } from "react";
import UploadDocumentArea from "@/components/UploadDocumentArea";
import DocMetadataCard from "@/components/DocMetadataCard";
import ReactJson from "react-json-view";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import JSZip from "jszip";
import { xml2js } from "xml-js";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Info } from "lucide-react";

// ✅ Configure PDF.js worker
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

/**
 * Extract text content from supported document types
 */
async function extractTextFromFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();

  // 📝 Plain text
  if (["txt", "log"].includes(ext)) {
    return await file.text();
  }

  // 📄 PDF
  if (ext === "pdf") {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + " ";
      }

      pdf.cleanup();
      pdf.destroy();
      return text.trim();
    } catch (err) {
      console.error("PDF parsing error:", err);
      throw new Error(
        "Error reading PDF file — it may be encrypted or use unsupported encoding."
      );
    }
  }

  // 🧾 DOCX
  if (ext === "docx") {
    try {
      const buffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value || "";
    } catch (err) {
      console.error("DOCX parsing error:", err);
      throw new Error("Error reading DOCX file — ensure it’s a valid Word file.");
    }
  }

  // 🎞️ PPTX (PowerPoint)
  if (ext === "pptx") {
    try {
      const buffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(buffer);

      let text = "";
      const slideFiles = Object.keys(zip.files).filter((name) =>
        name.match(/ppt\/slides\/slide\d+\.xml/)
      );

      for (const slide of slideFiles) {
        const xml = await zip.files[slide].async("text");
        const json = xml2js(xml, { compact: true });
        const texts = [];
        const extractText = (obj) => {
          if (obj.t && obj.t._text) texts.push(obj.t._text);
          for (let key in obj) {
            if (typeof obj[key] === "object") extractText(obj[key]);
          }
        };
        extractText(json);
        text += texts.join(" ") + " ";
      }

      return text.trim();
    } catch (err) {
      console.error("PPTX parsing error:", err);
      throw new Error("Error reading PPTX file — possibly corrupted or invalid format.");
    }
  }

  throw new Error("Unsupported file format. Try PDF, DOCX, PPTX, or TXT.");
}

export default function DocumentAnalysis() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [showRaw, setShowRaw] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState(null); // { type, text }

  // Auto-hide messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  /**
   * Analyze document content and extract intelligence
   */
  const analyzeDocument = async (file) => {
    setScanning(true);
    setMessage({ type: "info", text: "🔍 Analyzing document..." });

    try {
      const text = await extractTextFromFile(file);

      const wordCount = text.split(/\s+/).filter(Boolean).length;
      const links = text.match(/https?:\/\/[^\s"]+/g) || [];
      const suspiciousLinks = links.filter(
        (url) =>
          !url.startsWith("https://") ||
          url.includes("bit.ly") ||
          url.includes("tinyurl")
      );
      const emails =
        text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g) || [];

      const hash = await computeFileHash(file);

      const metadataExtracted = {
        File_Name: file.name,
        File_Type: file.type || "Unknown",
        File_Size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        Last_Modified: new Date(file.lastModified).toLocaleString(),
        SHA256_Hash: hash,
        Word_Count: wordCount,
        Links_Found: links.length,
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
      console.error("❌ Document analysis error:", err);
      setMessage({
        type: "error",
        text: err.message || "Unknown error during document analysis.",
      });
    } finally {
      setScanning(false);
    }
  };

  /** Estimate risk level */
  const calculateRisk = (suspicious, emails) => {
    const score = suspicious * 20 + emails * 5;
    if (score === 0) return "Low";
    if (score <= 50) return "Moderate";
    return "High";
  };

  /** Detect file type category */
  const detectFileType = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (ext === "pdf") return "Portable Document Format (PDF)";
    if (["docx", "doc"].includes(ext)) return "Word Document";
    if (["pptx", "ppt"].includes(ext)) return "PowerPoint Presentation";
    if (["txt", "log"].includes(ext)) return "Plain Text File";
    return "Unknown Type";
  };

  /** Reset all states */
  const handleClear = () => {
    setFile(null);
    setMetadata(null);
    setShowRaw(false);
    setMessage({ type: "info", text: "🧹 Cleared — document data reset." });
  };

  /** Render notification banner */
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
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          🧠 NeuroScan Document Analysis Branch
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Upload a document to extract metadata, hidden text, and potential risks.
          Supports <b>PDF</b>, <b>DOCX</b>, <b>PPTX</b>, and <b>TXT</b> formats.
        </p>
      </div>

      {/* Notification */}
      {message && renderMessage()}

      {/* Upload */}
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
                  <Loader2 className="w-4 h-4 animate-spin" /> Scanning...
                </>
              ) : (
                "Scan"
              )}
            </Button>
            <Button variant="destructive" onClick={handleClear} className="gap-2">
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Scanning animation */}
      {scanning && (
        <p className="text-sm mt-2 text-gray-500 animate-pulse">
          Scanning document for metadata and text content...
        </p>
      )}

      {/* Results */}
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
