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
            MetaPeek Documentation
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
            Learn how to get started with <span className="font-semibold">MetaPeek</span> — 
            a privacy-first, browser-based image metadata inspection tool.
          </p>
        </div>

        {/* What is MetaPeek */}
        <section className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
            What is MetaPeek?
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>MetaPeek</strong> is a browser-based metadata viewer for images. It extracts and displays standard EXIF tags including:
          </p>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <li>Camera make & model</li>
            <li>Date and time captured</li>
            <li>GPS coordinates (if available)</li>
            <li>Exposure, ISO, focal length, and more</li>
            <span className="font-semibold text-green-600 dark:text-green-400">
              And more — discover image insights instantly.
            </span>
          </ul>
        </section>

        {/* How to Use */}
        <section className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
            How to Use
          </h2>
          <ol className="list-decimal ml-5 mt-2 space-y-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <li>Upload or drag and drop an image (or paste a link).</li>
            <li>Click the <strong>“Upload Image”</strong> button.</li>
            <li>After previewing, click <strong>"Extract"</strong> to analyze the image.</li>
            <li>Review results in table or JSON format.</li>
            <li>Copy metadata or click <strong>"Clear Image"</strong> when done.</li>
            <span className="font-semibold text-green-600 dark:text-green-400">
              Simple, secure, and instant.
            </span>
          </ol>
        </section>

        {/* Privacy */}
        <section className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
            Privacy by Design
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            MetaPeek runs entirely in your browser — your images are{" "}
            <strong>never uploaded or stored</strong> on external servers. All
            processing occurs locally, ensuring{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              complete privacy and data safety.
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
                  <th className="py-2 px-3 font-medium">Format</th>
                  <th className="py-2 px-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3">JPEG (.jpg, .jpeg)</td>
                  <td className="py-2 px-3">Full metadata support</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3">PNG (.png)</td>
                  <td className="py-2 px-3">Partial metadata support</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3">GIF (.gif)</td>
                  <td className="py-2 px-3">Limited metadata fields</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">BMP / WebP / TIFF</td>
                  <td className="py-2 px-3">Supported with minor limitations</td>
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
            <li>HEIC and RAW image format support</li>
            <li>Batch image analysis</li>
            <li>Exportable metadata reports</li>
          </ul>
        </section>

        {/* Footer note */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>📘 Last updated: {today}</p>
          <p>@MetaPeek Team</p>
        </div>
      </div>
    </div>
  );
}
