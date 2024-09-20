import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationIcon = () => {
  return (
    <div className="ml-2 mr-1">
      <button className="btn btn-circle bg-base-100">
        <FontAwesomeIcon icon={faBell} className="text-xl" />
      </button>
    </div>
  );
};

export default NotificationIcon;
