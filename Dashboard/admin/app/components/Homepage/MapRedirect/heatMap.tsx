"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const HeatLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const heat = L.heatLayer(points, {
        radius: 25, // Radius of each point on the heatmap
        blur: 15, // Blur effect
        maxZoom: 17, // Maximum zoom level
        max: 1, // Maximum intensity
      });

      heat.addTo(map);
    }
  }, [points, map]);

  return null;
};

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/updated_drivers_with_assignments.json");
      const data = await response.json();

      const points = data.Central[0].route.map((loc) => [
        loc.lat,
        loc.lng,
        loc.intensity || 100,
      ]);
      setHeatmapData(points);
    };

    fetchData();
  }, []);

  return (
    <div className="card border border-gray-400 w-full h-48 m-3">
      <MapContainer
        center={[28.7, 77.2]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatLayer points={heatmapData} />
      </MapContainer>
    </div>
  );
};

export default HeatMap;
