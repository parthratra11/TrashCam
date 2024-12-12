"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = () => {
  const [locations, setLocations] = useState([]);

  // Fetch the data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/updated_drivers_with_assignments.json");
      const data = await response.json();
      // Assuming you want to render routes for "Central"
      setLocations(data.Central[0].route);
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
        {locations.length > 0 && (
          <>
            {locations.map((loc, index) => (
              <CircleMarker
                key={index}
                center={[loc.lat, loc.lng]}
                radius={4} // Radius of the circle
                color="red" // Border color
                fillColor="red" // Fill color
                fillOpacity={0.8} // Fill opacity
              />
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default LocationMap;
