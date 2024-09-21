import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationIcon = () => {
  return (
    <div className="ml-3">
      <button className="btn btn-circle bg-base-100 border-gray-300 hover:border-gray-500 hover:bg-base-100">
        <FontAwesomeIcon icon={faBell} className="text-xl" />
      </button>
    </div>
  );
};

export default NotificationIcon;
