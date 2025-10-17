import React from "react";
import UploadVideoArea from "@/components/UploadVideoArea";
import VideoPreview from "@/components/VideoPreview";
import VideoMetadataCard from "@/components/VideoMetadataCard";
import ReactJson from "react-json-view";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function VideoAnalysisPage() {
  // ---------- STATE ----------
  const [file, setFile] = React.useState(null);
  const [videoUrl, setVideoUrl] = React.useState(null);
  const [metadata, setMetadata] = React.useState(null);
  const [videoInfo, setVideoInfo] = React.useState(null);
  const [showMetadata, setShowMetadata] = React.useState(false);
  const [showRaw, setShowRaw] = React.useState(false);
  const [scanning, setScanning] = React.useState(false);

  // ---------- METADATA EXTRACTION ----------
  const extractVideoMetadata = async (file, videoEl) => {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      videoEl.src = objectUrl;
      videoEl.preload = "metadata";

      videoEl.onloadedmetadata = () => {
        try {
          const basic = {
            File_Name: file.name,
            File_Type: file.type,
            File_Size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            Last_Modified: new Date(file.lastModified).toLocaleString(),
          };

          const playback = {
            Duration: `${videoEl.duration.toFixed(2)} seconds`,
            Resolution: `${videoEl.videoWidth} × ${videoEl.videoHeight}`,
            Aspect_Ratio: (videoEl.videoWidth / videoEl.videoHeight).toFixed(2),
            Orientation:
              videoEl.videoWidth >= videoEl.videoHeight
                ? "Landscape"
                : "Portrait",
          };

          // ---- Frame rate estimation ----
          let frameRate = "N/A";
          if (videoEl.getVideoPlaybackQuality) {
            const quality = videoEl.getVideoPlaybackQuality();
            if (quality.totalVideoFrames && videoEl.duration > 0) {
              frameRate = (quality.totalVideoFrames / videoEl.duration).toFixed(2);
            }
          }

          // ---- Bitrate estimation ----
          const bitrate = videoEl.duration
            ? `${((file.size * 8) / videoEl.duration / 1000).toFixed(2)} kbps`
            : "N/A";

          const more = {
            Estimated_Frame_Rate: frameRate,
            Estimated_Bit_Rate: bitrate,
            Codec: file.type?.split("/")[1]?.toUpperCase() || "Unknown",
            Ready_State: videoEl.readyState,
            Network_State: videoEl.networkState,
            Buffered: videoEl.buffered.length
              ? `${videoEl.buffered.end(0).toFixed(2)}s`
              : "None",
            Default_Playback_Rate: videoEl.defaultPlaybackRate,
            Playback_Rate: videoEl.playbackRate,
            Volume: videoEl.volume,
            Muted: videoEl.muted ? "Yes" : "No",
            Paused: videoEl.paused ? "Yes" : "No",
            Loop: videoEl.loop ? "Enabled" : "Disabled",
            Controls: videoEl.controls ? "Enabled" : "Disabled",
            CrossOrigin: videoEl.crossOrigin || "N/A",
            Preload: videoEl.preload,
            Poster: videoEl.poster || "N/A",
          };

          const trackInfo = {
            Audio_Tracks:
              videoEl.audioTracks?.length ||
              "Unavailable (browser restricted)",
            Text_Tracks:
              videoEl.textTracks?.length ||
              "Unavailable (no captions found)",
          };

          const combined = { ...basic, ...playback, ...more, ...trackInfo };
          URL.revokeObjectURL(objectUrl);
          resolve(combined);
        } catch (err) {
          reject("⚠️ Error extracting metadata: " + err.message);
        }
      };

      videoEl.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject("❌ Failed to load video metadata.");
      };
    });
  };

  // ---------- FILE SELECTION ----------
  const handleVideoSelect = async (file) => {
    if (!file || !file.type.startsWith("video/")) {
      toast.error("⚠️ Please upload a valid video file.");
      return;
    }

    if (videoUrl) URL.revokeObjectURL(videoUrl);
    const url = URL.createObjectURL(file);

    setFile(file);
    setVideoUrl(url);
    setMetadata(null);
    setVideoInfo(null);
    setShowMetadata(false);
    setShowRaw(false);
    toast.success("🎥 Video uploaded successfully!");
  };

  // ---------- EXTRACT ----------
  const handleExtract = async () => {
    if (!file) {
      toast.error("Please upload a video first!");
      return;
    }

    setScanning(true);
    const videoEl = document.createElement("video");

    try {
      const extracted = await extractVideoMetadata(file, videoEl);
      setMetadata(extracted);
      setVideoInfo(extracted);
      setShowMetadata(true);
      toast.success("✅ Metadata extracted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("🚫 Error reading video metadata.");
    } finally {
      setScanning(false);
    }
  };

  // ---------- CLEAR ----------
  const handleClear = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setFile(null);
    setVideoUrl(null);
    setMetadata(null);
    setVideoInfo(null);
    setShowMetadata(false);
    setShowRaw(false);
    setScanning(false);
    toast.info("🧹 Cleared all data.");
  };

  // ---------- CLEANUP ----------
  React.useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  // ---------- UI ----------
  return (
    <div className="w-full p-4 md:p-6 space-y-8 text-left">
      {/* HEADER */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          MetaPeek Video Analyzer
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Upload and analyze your video in-browser. Instantly extract metadata
          such as duration, resolution, bitrate, frame rate, codec, and playback
          metrics.
        </p>
      </div>

      {/* UPLOAD AREA */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full sm:w-[500px]">
        <UploadVideoArea onVideoSelect={handleVideoSelect} />
      </div>

      {/* VIDEO PREVIEW + RESULTS */}
      {videoUrl && (
        <div className="flex flex-col gap-6 w-full">
          {/* Video Preview */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl text-left">
            <VideoPreview videoUrl={videoUrl} />

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap gap-4">
              <button
                onClick={handleExtract}
                disabled={scanning}
                className={`w-[200px] px-4 py-2 font-medium rounded-xl transition-all duration-200 ${
                  scanning
                    ? "bg-blue-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {scanning ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Extracting...
                  </span>
                ) : (
                  "Scan"
                )}
              </button>

              <button
                onClick={handleClear}
                className="w-[200px] px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-200"
              >
                Clear
              </button>

              {showMetadata && (
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="w-[200px] px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white font-medium rounded-xl transition-all duration-200"
                >
                  {showRaw ? "Hide JSON" : "View JSON"}
                </button>
              )}
            </div>

            {scanning && (
              <p className="text-sm mt-2 text-gray-500 animate-pulse">
                Extracting video metadata, please wait...
              </p>
            )}
          </div>

          {/* Structured Metadata */}
          {showMetadata && videoInfo && (
            <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
              <VideoMetadataCard metadata={videoInfo} />
            </div>
          )}

          {/* Raw JSON */}
          {showRaw && metadata && (
            <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl overflow-auto">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Raw Metadata
              </h2>
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
