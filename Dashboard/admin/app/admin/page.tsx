"use client";

import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UrbanEcoLogo from "../components/urbanEcoLogo";
import SearchBox from "../components/Homepage/Header/searchBox";
import NotificationIcon from "../components/Homepage/Header/notificationIcon";
import ViewReport from "../components/Homepage/viewReport";
import IndividualReportDetails from "../components/Homepage/individualReportDetails";
import ReportsOverview from "../components/Homepage/reportsOverview";
import "../components/Homepage/header.css";
import Logout from "../components/Homepage/Header/logout";
import DistrictAnalytics from "../components/Homepage/districtAnalytics";

// Dynamically import components that might use window
const LocationMap = dynamic(
  () => import("../components/Homepage/MapRedirect/locationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-64 bg-base-200 animate-pulse rounded-lg"></div>
    ),
  }
);

const HeatMap = dynamic(
  () => import("../components/Homepage/MapRedirect/heatMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-64 bg-base-200 animate-pulse rounded-lg"></div>
    ),
  }
);

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(false);
  }, []);

  // Show loading state during server-side rendering
  if (!isMounted || isLoading) {
    return (
      <div className="bg-base-100 p-5">
        <div className="animate-pulse">
          <div className="h-16 bg-base-200 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-48 bg-base-200 rounded-lg"></div>
              <div className="h-64 bg-base-200 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-base-200 rounded-lg"></div>
              <div className="h-48 bg-base-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-5">
      <header className="navbar bg-accent shadow-sm homepageHeader rounded-md">
        <UrbanEcoLogo />
        <SearchBox />
        <div></div>
        <NotificationIcon />
        <Logout />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <ReportsOverview />
          <div className="p-1">
            <div className="flex flex-row items-center">
              <h1 className="font-semibold text-lg font-sans p-2 py-3">
                Reports
              </h1>
              <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
            </div>

            {[
              "Lajpat Nagar, Delhi-110024",
              "Timarpur, Delhi-110007",
              "Vijay Nagar, Delhi-110009",
              "Kalyan Vihar, Delhi-110009",
              "Dwarka, Delhi-110075",
              "Rohini, Delhi-110037",
              "Central Secretariat, Delhi-110069",
            ]
              .slice(0, 7)
              .map((location, index) => (
                <div
                  className={`flex flex-row h-10 shadow-md shadow-gray-400 justify-between items-center p-1 mb-3 ${
                    index % 2 === 0 ? "bg-base-300" : "bg-base-200"
                  }`}
                >
                  <span className="ml-2 font-sans font-medium text-sm">
                    {location}
                  </span>

                  <IndividualReportDetails />
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col justify-between items-center p-1 sticky top-0">
          <Suspense
            fallback={
              <div className="w-full h-64 bg-base-200 animate-pulse rounded-lg"></div>
            }
          >
            <ViewReport />
            <HeatMap />
            <LocationMap />
            <DistrictAnalytics />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
