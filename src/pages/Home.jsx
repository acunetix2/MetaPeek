import React from "react";
import UploadArea from "@/components/UploadArea";
import ImagePreview from "@/components/ImagePreview";
import MetadataCard from "@/components/MetadataCard";
import MapViewer from "@/components/MapViewer";
import EXIF from "exif-js";
import DashboardLayout from "@/components/DashboardLayout";

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
      const info = {
        Name: file.name,
        Type: file.type,
        Size: `${(file.size / 1024).toFixed(2)} KB`,
        Modified: new Date(file.lastModified).toLocaleString(),
        Dimensions: `${img.width} x ${img.height} px`,
        ...(coords && { GPS: `Lat ${coords.lat.toFixed(6)}, Lng ${coords.lng.toFixed(6)}` }),
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
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        {/* Upload Area stays untouched */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl max-w-[500px]">
          <UploadArea onImageSelect={handleImageSelect} />
        </div>

        {/* Image + Metadata side-by-side layout */}
        {image && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* ImagePreview Card */}
            <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
              <ImagePreview imageUrl={image} />

              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                {!showMetadata && (
                  <button
                    onClick={handleScanClick}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl"
                  >
                    {scanning ? "Scanning..." : "Display Details"}
                  </button>
                )}
                {showMetadata && (
                  <button
                    onClick={handleClear}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl"
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

            {/* Metadata Card */}
            {showMetadata && imageInfo && (
              <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                <MetadataCard metadata={imageInfo} />
              </div>
            )}
          </div>
        )}

        {/* Optional Map */}
        {coords && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl h-[300px] md:h-[400px] lg:h-[500px]">
            <MapViewer lat={coords.lat} lng={coords.lng} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
