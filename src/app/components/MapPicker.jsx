"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import("react-leaflet").then(m => m.TileLayer),    { ssr: false });
const Marker       = dynamic(() => import("react-leaflet").then(m => m.Marker),       { ssr: false });

export default function MapPicker({ lat, lon, onPick }) {
  const [pos, setPos] = useState([lat, lon]);
  const [icon, setIcon] = useState(null);
  const markerRef = useRef(null);

  useEffect(() => {
    import("leaflet").then(L => {
      setIcon(
        L.icon({
          iconUrl: "/leaflet/marker-icon.png",
          iconRetinaUrl: "/leaflet/marker-icon-2x.png",
          shadowUrl: "/leaflet/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      );
    });
  }, []);

  const onDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const { lat, lng } = marker.getLatLng();
      setPos([lat, lng]);
      onPick({ lat, lon: lng });
    }
  };

  const handleMapClick = (e) => {
    setPos([e.latlng.lat, e.latlng.lng]);
    onPick({ lat: e.latlng.lat, lon: e.latlng.lng });
  };

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden">
      <MapContainer
        center={pos}
        zoom={7}
        scrollWheelZoom
        className="w-full h-full"
        whenCreated={map => map.on('click', handleMapClick)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        {icon && (
          <Marker
            position={pos}
            icon={icon}
            draggable={true}
            eventHandlers={{ dragend: onDragEnd }}
            ref={markerRef}
          />
        )}
      </MapContainer>
    </div>
  );
}