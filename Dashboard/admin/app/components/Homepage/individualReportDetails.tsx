import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const IndividualReportDetails = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faLocationDot} color="#A61F1F" />
      <Link
        href=""
        className="mx-2 px-2 text-xs font-semibold hover:underline justify-center"
      >
        Details
        <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
      </Link>
    </div>
  );
};

export default IndividualReportDetails;
