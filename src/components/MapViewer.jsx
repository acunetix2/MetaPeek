import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapViewer({ lat, lng }) {
  useEffect(() => {
    if (!lat || !lng) return;

    const map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([lat, lng]).addTo(map);

    return () => map.remove();
  }, [lat, lng]);

  if (!lat || !lng) return null;

  return (
    <div id="map" className="h-64 w-full rounded-md border" />
  );
}
