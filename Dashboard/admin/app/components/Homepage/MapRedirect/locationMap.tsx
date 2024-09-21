import React from "react";

const LocationMap = () => {
  return (
    //? STATIC IMAGE IMPLEMENTATION
    // <div className="card border border-gray-400 w-full h-48 m-3 flex justify-center items-center overflow-clip hover:cursor-pointer">
    //   <img src="/images/tempLocationMap.png" alt="Location Map" />
    // </div>

    <div className="card border border-gray-400 w-full h-48 m-3 flex justify-center items-center overflow-clip hover:cursor-pointer">
      <iframe
        src="/Maps/locationMap.html"
        title="Heat Map"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default LocationMap;
