import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const LocationDropdown = () => {
  return (
    <div className="flex-none gap-2 flex flex-row items-center">
      <div className="dropdown menu-dropdown ml-auto">
        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
        <select className="select select-bordered border-gray-300 font-semibold btn ml-2 flex-shrink-0 w-40 hover:border-gray-500 hover:bg-base-100">
          <option className="font-semibold">Saket, Delhi</option>
          <option className="font-semibold">Live Location</option>
        </select>
      </div>
    </div>
  );
};

export default LocationDropdown;
