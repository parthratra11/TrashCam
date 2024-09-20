import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = () => {
  return (
    <div className="flex-grow flex items-center mx-4 pl-4 pr-4">
      <div className="w-full form-control flex flex-row relative">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full h-10 ml-15 mr-15"
        />
        <div className="absolute flex items-center justify-center right-0 top-0 bottom-0 px-4">
          <FontAwesomeIcon icon={faSearch} color="gray" className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
