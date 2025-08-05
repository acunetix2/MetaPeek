import React from "react";
import UploadArea from "@/components/UploadArea";
import ImagePreview from "@/components/ImagePreview";
import MetadataCard from "@/components/MetadataCard";
import MapViewer from "@/components/MapViewer";
import EXIF from "exif-js";
import DashboardLayout from "@/components/DashboardLayout";

export default function HomePage() {
  const [image, setImage] = React.useState(null);
  const [metadata, setMetadata] = React.useState(null);
  const [coords, setCoords] = React.useState(null);

  const handleImageSelect = (file) => {
    setImage(URL.createObjectURL(file));

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

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <UploadArea onImageSelect={handleImageSelect} />
          </div>
          {image && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <ImagePreview imageUrl={image} />
            </div>
          )}
        </div>

        <div className="space-y-6">
          {metadata && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <MetadataCard metadata={metadata} />
            </div>
          )}
          {coords && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow h-[300px]">
              <MapViewer lat={coords.lat} lng={coords.lng} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
