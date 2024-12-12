import React from "react";
import "./urbanEcoLogo.css";
import Link from "next/link";

const UrbanEcoLogo = () => {
  return (
    <Link href="/" passHref>
      <div className="logoContainer btn btn-ghost ml-4 w-fit pb-1">
        <img src="/images/urbanEco.png" alt="UrbanEco" className="logoImage" />
      </div>
    </Link>
  );
};

export default UrbanEcoLogo;
