import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UrbanEcoLogo from "./components/urbanEcoLogo";
import SearchBox from "./components/Homepage/searchBox";
import LocationDropdown from "./components/Homepage/locationDropdown";
import NotificationIcon from "./components/Homepage/notificationIcon";
import DroneInspection from "./components/Homepage/droneInspection";
import LocationMap from "./components/Homepage/locationMap";
import HeatMap from "./components/Homepage/heatMap";
import ViewReport from "./components/Homepage/viewReport";
import TotalReports from "./components/Homepage/totalReports";
import InvalidReports from "./components/Homepage/invalidReports";
import ResolvedReports from "./components/Homepage/resolvedReports";
import PendingReports from "./components/Homepage/pendingReports";
import IndividualReportDetails from "./components/Homepage/individualReportDetails";

const Dashboard = () => {
  return (
    <>
      <div className="bg-base-100 p-5">
        {/* HEADER */}
        <header className="navbar bg-accent shadow-sm flex justify-between items-center rounded-md">
          <UrbanEcoLogo />
          <SearchBox />
          <LocationDropdown />
          <NotificationIcon />
        </header>

        {/* MAIN-DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* COLUMN 1 */}
          <div className="lg:col-span-2">
            {/* REPORTS OVERVIEW */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-1">
              <TotalReports />
              <InvalidReports />
              <ResolvedReports />
              <PendingReports />
            </div>

            {/* REPORTS LIST */}
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
              ].map((location, index) => (
                <div
                  className={`card flex flex-row h-10 justify-between items-center p-1 mb-2 ${
                    index % 2 === 0
                      ? "bg-base-300"
                      : "bg-base-100 border border-gray-400"
                  }`}
                >
                  <span className="ml-2 font-sans font-medium">{location}</span>

                  {/* DETAILS REDIRECT */}
                  <IndividualReportDetails />
                </div>
              ))}
            </div>
          </div>
          {/* COLUMN 2 */}
          <div className=" flex flex-col justify-between items-center p-1">
            <ViewReport />
            <HeatMap />
            <LocationMap />
            <DroneInspection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
