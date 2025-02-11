import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Logout = () => {
  return (
    // <div className="flex justify-center ml-4 btn btn-circle btn-ghost">
    //   <FontAwesomeIcon icon={faBars} size="2x" />
    // </div>
    <Link href="/">
      <button className="btn btn-ghost bg-slate-600 ml-2 text-white hover:bg-secondary font-bold font-sans px-6">
        Logout
      </button>
    </Link>
  );
};

export default Logout;
