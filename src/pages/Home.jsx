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

  // Enhanced EXIF extraction function
  const extractEXIFData = (file) => {
    return new Promise((resolve, reject) => {
      EXIF.getData(file, function () {
        try {
          const allMeta = EXIF.getAllTags(this);
          
          // Extract comprehensive camera information
          const cameraInfo = {
            // Basic camera info
            make: allMeta.Make || "Unknown",
            model: allMeta.Model || "Unknown",
            
            // Lens information
            lensModel: allMeta.LensModel || allMeta.LensInfo || "Unknown",
            lensMake: allMeta.LensMake || "Unknown",
            lensSerialNumber: allMeta.LensSerialNumber || "N/A",
            
            // Camera settings
            iso: allMeta.ISOSpeedRatings || allMeta.ISO || "N/A",
            aperture: allMeta.FNumber || allMeta.ApertureValue || "N/A",
            shutterSpeed: allMeta.ExposureTime || "N/A",
            focalLength: allMeta.FocalLength || "N/A",
            focalLength35mm: allMeta.FocalLengthIn35mmFilm || "N/A",
            
            // Additional camera settings
            whiteBalance: allMeta.WhiteBalance || "N/A",
            flash: allMeta.Flash || "N/A",
            meteringMode: allMeta.MeteringMode || "N/A",
            exposureMode: allMeta.ExposureMode || "N/A",
            exposureProgram: allMeta.ExposureProgram || "N/A",
            exposureBias: allMeta.ExposureBiasValue || "N/A",
            
            // Date and time
            dateTime: allMeta.DateTime || allMeta.DateTimeOriginal || "N/A",
            dateTimeOriginal: allMeta.DateTimeOriginal || "N/A",
            dateTimeDigitized: allMeta.DateTimeDigitized || "N/A", //Time needs to be convertred
            
            // Image quality settings
            colorSpace: allMeta.ColorSpace || "N/A",
            compression: allMeta.Compression || "N/A",
            orientation: allMeta.Orientation || "N/A",
            
            // GPS data
            gpsLatitude: allMeta.GPSLatitude,
            gpsLongitude: allMeta.GPSLongitude,
            gpsLatitudeRef: allMeta.GPSLatitudeRef,
            gpsLongitudeRef: allMeta.GPSLongitudeRef,
            gpsAltitude: allMeta.GPSAltitude || "N/A",
            gpsAltitudeRef: allMeta.GPSAltitudeRef || "N/A",
            
            // Description fields
            imageDescription: allMeta.ImageDescription || "N/A",
            userComment: allMeta.UserComment || "N/A",
            xpComment: allMeta.XPComment || "N/A",
            xpKeywords: allMeta.XPKeywords || "N/A",
            
            // Software/firmware
            software: allMeta.Software || "N/A",
            
            // Raw metadata for debugging
            allTags: allMeta
          };
          
          resolve(cameraInfo);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  // Helper function to format aperture value
  const formatAperture = (fNumber) => {
    if (fNumber === "N/A" || !fNumber) return "N/A";
    if (typeof fNumber === 'number') return `f/${fNumber}`;
    if (Array.isArray(fNumber) && fNumber.length === 2) {
      return `f/${(fNumber[0] / fNumber[1]).toFixed(1)}`;
    }
    return `f/${fNumber}`;
  };

  // Helper function to format shutter speed camera info
  const formatShutterSpeed = (exposureTime) => {
    if (exposureTime === "N/A" || !exposureTime) return "N/A";
    if (typeof exposureTime === 'number') {
      if (exposureTime >= 1) return `${exposureTime}s`;
      return `1/${Math.round(1 / exposureTime)}s`;
    }
    if (Array.isArray(exposureTime) && exposureTime.length === 2) {
      const speed = exposureTime[0] / exposureTime[1];
      if (speed >= 1) return `${speed}s`;
      return `1/${Math.round(1 / speed)}s`;
    }
    return exposureTime;
  };

  // Helper function to format focal length
  const formatFocalLength = (focalLength) => {
    if (focalLength === "N/A" || !focalLength) return "N/A";
    if (typeof focalLength === 'number') return `${focalLength}mm`;
    if (Array.isArray(focalLength) && focalLength.length === 2) {
      return `${(focalLength[0] / focalLength[1]).toFixed(0)}mm`;
    }
    return `${focalLength}mm`;
  };

  const handleImageSelect = async (file) => {
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

    try {
      const cameraData = await extractEXIFData(file);
      setMetadata(cameraData);

      // Process GPS coordinates
      const { gpsLatitude, gpsLongitude, gpsLatitudeRef, gpsLongitudeRef } = cameraData;
      if (gpsLatitude && gpsLongitude) {
        const toDecimal = (dms, ref) => {
          const [d, m, s] = dms;
          const sign = ref === "S" || ref === "W" ? -1 : 1;
          return sign * (d + m / 60 + s / 3600);
        };

        setCoords({
          lat: toDecimal(gpsLatitude, gpsLatitudeRef),
          lng: toDecimal(gpsLongitude, gpsLongitudeRef),
        });
      } else {
        setCoords(null);
      }
    } catch (error) {
      console.error("Error extracting EXIF data:", error);
      setMetadata(null);
      setCoords(null);
    }
  };

  const handleScanClick = () => {
    setScanning(true);

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // Enhanced metadata display with better formatting
      const info = {
        // Basic file info
        Name: file.name,
        Type: file.type,
        Size: `${(file.size / 1024).toFixed(2)} KB`,
        Modified: new Date(file.lastModified).toLocaleString(),
        Dimensions: `${img.naturalWidth} x ${img.naturalHeight} px`,
        
        // Camera information
        "Camera Make": metadata?.make,
        "Camera Model": metadata?.model || "Unknown",
        "Lens Model": metadata?.lensModel || "N/A",
        
        // Camera settings with proper formatting
        "ISO": metadata?.iso || "N/A",
        "Aperture": formatAperture(metadata?.aperture),
        "Shutter Speed": formatShutterSpeed(metadata?.shutterSpeed),
        "Focal Length": formatFocalLength(metadata?.focalLength),
        "Focal Length (35mm)": formatFocalLength(metadata?.focalLength35mm),
        
        // Additional settings
        "White Balance": metadata?.whiteBalance || "N/A",
        "Flash": metadata?.flash || "N/A",
        "Metering Mode": metadata?.meteringMode || "N/A",
        "Exposure Mode": metadata?.exposureMode || "N/A",
        
        // Date information
        "Date Taken": metadata?.dateTimeOriginal || metadata?.dateTime || "N/A",
        
        // Description
        "Description": metadata?.imageDescription || metadata?.xpComment || "Not available",
        
        // Location
        Longitude: coords ? coords.lng.toFixed(6) : "N/A",
        Latitude: coords ? coords.lat.toFixed(6) : "N/A",
        "GPS Altitude": metadata?.gpsAltitude || "N/A",
        ...(coords && {
          GPS: `Lat ${coords.lat.toFixed(6)}, Lng ${coords.lng.toFixed(6)}`,
        }),
        
        // Software
        Software: metadata?.software,
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
          Upload an image to extract and view its embedded metadata, including comprehensive EXIF data, GPS coordinates, camera settings, and more.
          This tool helps you understand what hidden information is stored inside your pictures. The tool also gives camera recognition capabilities.
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