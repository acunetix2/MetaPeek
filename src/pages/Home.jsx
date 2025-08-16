import React from "react";
import UploadArea from "@/components/UploadArea";
import ImagePreview from "@/components/ImagePreview";
import MetadataCard from "@/components/MetadataCard";
import MapViewer from "@/components/MapViewer";
import exifr from "exifr";
import ReactJson from "react-json-view";

export default function HomePage() {
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [metadata, setMetadata] = React.useState(null);
  const [coords, setCoords] = React.useState(null);
  const [imageInfo, setImageInfo] = React.useState(null);
  const [showMetadata, setShowMetadata] = React.useState(false);
  const [showRaw, setShowRaw] = React.useState(false);
  const [scanning, setScanning] = React.useState(false);

  // Extract metadata with exifr
  const extractEXIFData = async (file) => {
    try {
      const allMeta = await exifr.parse(file, true);
      return allMeta || {};
    } catch (error) {
      console.error("exifr parse error:", error);
      return {};
    }
  };

  // Format helpers
  const formatAperture = (val) =>
    val ? `f/${parseFloat(val).toFixed(1)}` : "N/A";
  const formatShutterSpeed = (val) => {
    if (!val) return "N/A";
    return val >= 1 ? `${val}s` : `1/${Math.round(1 / val)}s`;
  };
  const formatFocalLength = (val) =>
    val ? `${parseFloat(val).toFixed(0)}mm` : "N/A";

  // Handle image selection
  const handleImageSelect = async (file) => {
    if (!file || !file.type.startsWith("image/"))
      return alert("Please upload a valid image file.");

    if (image) URL.revokeObjectURL(image);
    const imageUrl = URL.createObjectURL(file);

    setFile(file);
    setImage(imageUrl);
    setMetadata(null);
    setCoords(null);
    setImageInfo(null);
    setShowMetadata(false);
    setShowRaw(false);
    setScanning(false);

    try {
      const allMeta = await extractEXIFData(file);
      setMetadata(allMeta);

      if (allMeta.latitude && allMeta.longitude) {
        setCoords({
          lat: allMeta.latitude,
          lng: allMeta.longitude,
        });
      }
    } catch (error) {
      console.error("Error extracting metadata:", error);
    }
  };

  // Scan button click
  const handleScanClick = () => {
    if (!metadata) return;

    setScanning(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const info = {
        Name: file.name,
        Type: file.type,
        Size: `${(file.size / 1024).toFixed(2)} KB`,
        Modified: new Date(file.lastModified).toLocaleString(),
        Dimensions: `${img.naturalWidth} x ${img.naturalHeight} px`,

        // Camera info
        "Camera Make": metadata.Make || "N/A",
        "Camera Model": metadata.Model || "N/A",
        "Lens Model": metadata.LensModel || "N/A",
        ISO: metadata.ISO || "N/A",
        Aperture: formatAperture(metadata.FNumber),
        "Shutter Speed": formatShutterSpeed(metadata.ExposureTime),
        "Focal Length": formatFocalLength(metadata.FocalLength),
        "Focal Length (35mm)": formatFocalLength(metadata.FocalLengthIn35mmFilm),
        "Exposure Program": metadata.ExposureProgram || "N/A",
        "Metering Mode": metadata.MeteringMode || "N/A",
        "Exposure Mode": metadata.ExposureMode || "N/A",
        "White Balance": metadata.WhiteBalance || "N/A",
        Flash: metadata.Flash || "N/A",
        "Subject Distance": metadata.SubjectDistance || "N/A",

        // Date / Time
        "Date Taken": metadata.DateTimeOriginal || "N/A",
        "Date Digitized": metadata.DateTimeDigitized || "N/A",

        // Color / Orientation
        ColorSpace: metadata.ColorSpace || "N/A",
        Orientation: metadata.Orientation || "N/A",

        // Resolution info
        "X Resolution": metadata.XResolution || "N/A",
        "Y Resolution": metadata.YResolution || "N/A",
        "Resolution Unit": metadata.ResolutionUnit || "N/A",
        "YCbCr Positioning": metadata.YCbCrPositioning || "N/A",

        // Image Description
        "Image Description": metadata.ImageDescription || "N/A",

        // EXIF details
        "Exposure Time": metadata.ExposureTime || "N/A",
        "ExifTool Version": metadata.ExifToolVersion || "N/A",
        Contrast: metadata.Contrast || "N/A",
        "Interop Index": metadata.InteropIndex || "N/A",
        Saturation: metadata.Saturation || "N/A",
        "Digital Zoom Ratio": metadata.DigitalZoomRatio || "N/A",
        "Exif Image Height": metadata.ExifImageHeight || "N/A",
        "Exif Image Width": metadata.ExifImageWidth || "N/A",
        "Flashpix Version": metadata.FlashpixVersion || "N/A",
        "Max Aperture Value": metadata.MaxApertureValue || "N/A",
        "F Number": metadata.FNumber || "N/A",

        // GPS
        Longitude: coords?.lng?.toFixed(6) || "N/A",
        Latitude: coords?.lat?.toFixed(6) || "N/A",
        ...(coords && {
          GPS: `Lat ${coords.lat.toFixed(6)}, Lng ${coords.lng.toFixed(6)}`,
        }),

        // Misc
        Artist: metadata.Artist || "N/A",
        Copyright: metadata.Copyright || "N/A",
        Software: metadata.Software || "N/A",
        MakerNotes: metadata.MakerNote ? "[Present]" : "N/A",
      };

      setTimeout(() => {
        setImageInfo(info);
        setShowMetadata(true);
        setScanning(false);
        URL.revokeObjectURL(img.src);
      }, 1000);
    };
  };

  const handleClear = () => {
    if (image) URL.revokeObjectURL(image);
    setFile(null);
    setImage(null);
    setMetadata(null);
    setCoords(null);
    setImageInfo(null);
    setShowMetadata(false);
    setShowRaw(false);
    setScanning(false);
  };

  React.useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <div className="w-full p-4 md:p-6 space-y-8 text-left">
      {/* Intro */}
	<div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-left">
	  <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
		Welcome to MetaPeek
	  </h1>
	  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
		MetaPeek is a powerful image metadata scanner designed to help you uncover 
		the hidden details behind your images. Whether you're a digital forensics 
		analyst, a photographer reviewing camera information, or a developer 
		validating media integrity, MetaPeek provides a clear, structured view of 
		the metadata contained within your files.
	  </p>
	  <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
		Quickly analyze information such as camera settings, timestamps, geolocation 
		data, and descriptive tags all presented in an easy-to-read format. Gain 
		deeper insights, detect anomalies, and make more informed decisions with 
		confidence.
	  </p>
	</div>
      {/* Upload */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full sm:w-[500px] text-left">
        <UploadArea onImageSelect={handleImageSelect} />
      </div>

      {/* Preview + Metadata */}
      {image && (
        <div className="flex flex-col gap-6 w-full">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl text-left">
            <ImagePreview imageUrl={image} />
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              {!showMetadata ? (
                <button
                  onClick={handleScanClick}
                  className="w-[200px] px-4 py-2 bg-green-600 hover:bg-blue-700 text-white font-medium rounded-xl"
                >
                  {scanning ? "Scanning..." : "Display Details"}
                </button>
              ) : (
                <button
                  onClick={handleClear}
                  className="w-[200px] px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl"
                >
                  Clear Image
                </button>
              )}
              {showMetadata && (
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="w-[200px] px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white font-medium rounded-xl"
                >
                  {showRaw ? "Hide Raw Metadata" : "Show Raw Metadata"}
                </button>
              )}
            </div>
            {scanning && (
              <p className="text-sm mt-2 text-gray-500">
                Please wait, scanning image details...
              </p>
            )}
          </div>

          {/* Formatted Metadata */}
          {showMetadata && imageInfo && (
            <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl text-left">
              <MetadataCard metadata={imageInfo} />
            </div>
          )}

          {/* Raw JSON Metadata */}
          {showRaw && metadata && (
            <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl text-left overflow-auto">
              <h2 className="text-lg font-semibold mb-2">Raw Metadata</h2>
              <ReactJson
                src={metadata}
                theme="monokai"
                collapsed={2}
                enableClipboard={true}
                displayDataTypes={false}
                style={{ maxHeight: "500px", overflowY: "auto" }}
              />
            </div>
          )}
        </div>
      )}

      {/* Map Viewer */}
      {coords && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl h-[300px] md:h-[400px] lg:h-[500px] text-left w-full">
          <MapViewer lat={coords.lat} lng={coords.lng} />
        </div>
      )}
    </div>
  );
}
