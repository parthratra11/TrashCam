import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const HelpMenu = () => {
  return (
    <div className="flex justify-center ml-4 btn btn-circle btn-ghost">
      <FontAwesomeIcon icon={faBars} size="2x" />
    </div>
  );
};

export default HelpMenu;
