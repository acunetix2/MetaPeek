import React from "react";

export default function Docs() {
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-950 px-4 sm:px-6 py-12 sm:py-16 text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-14">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-green-700 dark:text-green-400 mb-3">
            NeuroScan Documentation
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
            Learn how to get started with{" "}
            <span className="font-semibold">NeuroScan </span>  
            a privacy-first, browser-based tool for analyzing{" "}
            <strong>images, videos, and documents</strong> right from your device.
          </p>
        </div>

        {/* What is NeuroScan */}
        <section className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
            What is NeuroScan?
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>NeuroScan</strong> is a browser-based metadata and content analysis platform 
            capable of extracting and displaying hidden details from{" "}
            <strong>image, video, and document files</strong>. It helps users uncover
            valuable digital traces  such as timestamps, camera information,
            codecs, authorship, and embedded data.
            anywhere.
          </p>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <li>View detailed image EXIF data (camera, GPS, date, etc.).</li>
            <li>Inspect video codec info, duration, and frame-level metadata.</li>
            <li>Analyze document properties like author, version, and title.</li>
            <li>All processing happens locally for complete data privacy.</li>
            <span className="font-semibold text-green-600 dark:text-green-400">
              A single platform for full digital transparency.
            </span>
          </ul>
        </section>

        {/* How to Use */}
        <section className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
            How to Use
          </h2>
          <ol className="list-decimal ml-5 mt-2 space-y-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <li>Upload or drag and drop an <strong>image, video, or document</strong>.</li>
            <li>Preview the file directly in the browser interface.</li>
            <li>Click <strong>"Extract"</strong> to analyze metadata and embedded properties.</li>
            <li>Review extracted results in structured or JSON view.</li>
            <li>Copy, download, or clear your analysis when finished.</li>
            <span className="font-semibold text-green-600 dark:text-green-400">
              Fast, private, and efficient all without cloud uploads.
            </span>
          </ol>
        </section>

        {/* Privacy */}
        <section className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
            How NeuroScan Ensures Privacy
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            NeuroScan runs entirely within your web browser files are{" "}
            <strong>never uploaded, transmitted, or stored externally</strong>. 
            Every analysis, whether image, video, or document, happens locally on your device,
            ensuring{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              total data control and confidentiality.
            </span>
          </p>
        </section>

        {/* Supported File Types */}
        <section className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
            Supported File Types
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border-collapse text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 px-3 font-medium">Category</th>
                  <th className="py-2 px-3 font-medium">Formats</th>
                  <th className="py-2 px-3 font-medium">Support Level</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">Images</td>
                  <td className="py-2 px-3">JPEG, PNG, TIFF, WebP, BMP</td>
                  <td className="py-2 px-3">Full/Partial metadata support</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">Videos</td>
                  <td className="py-2 px-3">MP4, MOV, AVI, MKV, WEBM</td>
                  <td className="py-2 px-3">Codec, duration, frame rate, and more</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold">Documents</td>
                  <td className="py-2 px-3">PDF, DOCX, PPTX, TXT</td>
                  <td className="py-2 px-3">Author info, creation date, and properties</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Roadmap */}
        <section className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
            Coming Soon
          </h2>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <li>AI-assisted metadata interpretation</li>
            <li>Batch file processing and report exporting</li>
            <li>Deeper file structure visualization and comparison</li>
            <li>Integration with advanced forensic analysis plugins</li>
          </ul>
        </section>

        {/* Footer note */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>Last updated: {today}</p>
          <p>@NeuroScan Team</p>
        </div>
      </div>
    </div>
  );
}
