import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UrbanEcoLogo from "./components/urbanEcoLogo";
import SearchBox from "./components/Homepage/Header/searchBox";
import LocationDropdown from "./components/Homepage/Header/locationDropdown";
import NotificationIcon from "./components/Homepage/Header/notificationIcon";
import DroneInspection from "./components/Homepage/droneInspection";
import LocationMap from "./components/Homepage/MapRedirect/locationMap";
import HeatMap from "./components/Homepage/MapRedirect/heatMap";
import ViewReport from "./components/Homepage/viewReport";
import IndividualReportDetails from "./components/Homepage/individualReportDetails";
import ReportsOverview from "./components/Homepage/reportsOverview";
import "./components/Homepage/header.css";
import HelpMenu from "./components/Homepage/Header/helpMenu";

const Dashboard = () => {
  return (
    <>
      <div className="bg-base-100 p-5">
        {/* HEADER */}
        {/* <header className="navbar bg-accent shadow-sm flex justify-between items-center rounded-md"> */}
        <header className="navbar bg-accent shadow-sm homepageHeader rounded-md">
          <UrbanEcoLogo />
          <SearchBox />
          <LocationDropdown />
          <NotificationIcon />
          <HelpMenu />
        </header>

        {/* MAIN-DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* COLUMN 1 */}
          <div className="lg:col-span-2">
            {/* REPORTS OVERVIEW */}
            <ReportsOverview />

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
                  className={`flex flex-row h-10 shadow-md shadow-gray-400 justify-between items-center p-1 mb-3 ${
                    index % 2 === 0 ? "bg-base-300" : "bg-base-200"
                  }`}
                >
                  <span className="ml-2 font-sans font-medium text-sm">
                    {location}
                  </span>

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
