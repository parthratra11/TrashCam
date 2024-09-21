import React from "react";
import "./urbanEcoLogo.css";
import Link from "next/link";

const UrbanEcoLogo = () => {
  return (
    <Link href="/" passHref>
      <div className="logoContainer btn btn-ghost ml-2">
        <img
          src="/images/urbanEco.png"
          alt="My SVG Image"
          className="logoImage"
        />
      </div>
    </Link>
  );
};

export default UrbanEcoLogo;
