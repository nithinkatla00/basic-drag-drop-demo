// LeafletMap.js
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

const LeafletMap = () => {
  const theme = useSelector((state) => state.dashboard.theme);
  return (
    <MapContainer
      center={[51.505, -0.09]}
      bg={theme.mode === "light" ? "white" : "gray.800"}
      zoom={7}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default LeafletMap;
