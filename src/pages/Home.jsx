import React from "react";
import UploadArea from "@/components/UploadArea";
import ImagePreview from "@/components/ImagePreview";
import MetadataCard from "@/components/MetadataCard";
import MapViewer from "@/components/MapViewer";
import EXIF from "exif-js";

export default function HomePage() {
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [metadata, setMetadata] = React.useState(null);
  const [coords, setCoords] = React.useState(null);
  const [imageInfo, setImageInfo] = React.useState(null);
  const [showMetadata, setShowMetadata] = React.useState(false);
  const [scanning, setScanning] = React.useState(false);

  const handleImageSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    if (image) URL.revokeObjectURL(image);

    const imageUrl = URL.createObjectURL(file);
    setFile(file);
    setImage(imageUrl);
    setMetadata(null);
    setCoords(null);
    setImageInfo(null);
    setShowMetadata(false);
    setScanning(false);

    EXIF.getData(file, function () {
      const allMeta = EXIF.getAllTags(this);
      setMetadata(allMeta);

      const { GPSLatitude, GPSLongitude, GPSLatitudeRef, GPSLongitudeRef } = allMeta;
      if (GPSLatitude && GPSLongitude) {
        const toDecimal = (dms, ref) => {
          const [d, m, s] = dms;
          const sign = ref === "S" || ref === "W" ? -1 : 1;
          return sign * (d + m / 60 + s / 3600);
        };

        setCoords({
          lat: toDecimal(GPSLatitude, GPSLatitudeRef),
          lng: toDecimal(GPSLongitude, GPSLongitudeRef),
        });
      } else {
        setCoords(null);
      }
    });
  };

  const handleScanClick = () => {
  setScanning(true);

  const imageUrl = URL.createObjectURL(file);
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    // Use previously extracted metadata from EXIF.getAllTags
    const cameraModel = metadata?.Model || "Unknown";
    const cameraMake = metadata?.Make || "Unknown";
    const areaName =
      metadata?.ImageDescription ||
      metadata?.XPComment ||
      "Not available";

    const info = {
      Name: file.name,
      Type: file.type,
      Size: `${(file.size / 1024).toFixed(2)} KB`,
      Modified: new Date(file.lastModified).toLocaleString(),
      Dimensions: `${img.naturalWidth} x ${img.naturalHeight} px`,
      CameraMake: cameraMake,
      CameraModel: cameraModel,
      AreaName: areaName,
      Longitude: coords ? coords.lng.toFixed(6) : "N/A",
      Latitude: coords ? coords.lat.toFixed(6) : "N/A",
      ...(coords && {
        GPS: `Lat ${coords.lat.toFixed(6)}, Lng ${coords.lng.toFixed(6)}`,
      }),
    };

    setTimeout(() => {
      setImageInfo(info);
      setShowMetadata(true);
      setScanning(false);
      URL.revokeObjectURL(imageUrl);
    }, 1200);
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
    setScanning(false);
  };

  React.useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <div className="max-w-7xl p-4 md:p-6 space-y-8 text-left">
      <div className="max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-left">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome to Image Metadata Scanner
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload an image to extract and view its embedded metadata, including EXIF data, GPS coordinates, and dimensions.
          This tool helps you understand what hidden information is stored inside your pictures.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl max-w-[500px] text-left">
        <UploadArea onImageSelect={handleImageSelect} />
      </div>
      {image && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl text-left">
            <ImagePreview imageUrl={image} />
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              {!showMetadata && (
                <button
                  onClick={handleScanClick}
                  className="w-[200px] px-4 py-2 bg-green-600 hover:bg-blue-700 text-white font-medium rounded-xl"
                >
                  {scanning ? "Scanning..." : "Display Details"}
                </button>
              )}
              {showMetadata && (
                <button
                  onClick={handleClear}
                  className="w-[200px] px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl"
                >
                  Clear Image
                </button>
              )}
            </div>
            {scanning && (
              <p className="text-sm mt-2 text-gray-500">
                Please wait, scanning image details...
              </p>
            )}
          </div>

          {showMetadata && imageInfo && (
            <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl text-left">
              <MetadataCard metadata={imageInfo} />
            </div>
          )}
        </div>
      )}

      {coords && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl h-[300px] md:h-[400px] lg:h-[500px] text-left">
          <MapViewer lat={coords.lat} lng={coords.lng} />
        </div>
      )}
    </div>
  );
}
