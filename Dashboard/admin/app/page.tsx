import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faLocationDot,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <>
      <div className="bg-base-100 p-5">
        {/* HEADER */}
        <header className="navbar bg-base-200 shadow-lg flex justify-between items-center">
          {/* UrbanEco LOGO */}
          <div>
            <a className="btn btn-ghost normal-case text-xl">UrbanEco</a>
          </div>

          {/* SEARCH BOX */}
          <div className="flex-grow flex items-center mx-4 pl-4 pr-4">
            <div className="w-full form-control flex flex-row relative">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-full h-10 ml-15 mr-15"
              />
              <div className="absolute flex items-center justify-center right-0 top-0 bottom-0 px-4">
                <FontAwesomeIcon
                  icon={faSearch}
                  color="gray"
                  className="ml-2"
                />
              </div>
            </div>
          </div>

          {/* LOCATION DROPDOWN */}
          <div className="flex-none gap-2 flex items-center">
            <div className="dropdown menu-dropdown ml-auto">
              <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
              <select className="select select-bordered font-semibold btn ml-2 flex-shrink-0 w-40">
                <option className="font-semibold">Saket, Delhi</option>
                <option className="font-semibold">Live Location</option>
              </select>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="ml-2 mr-1">
            <button className="btn btn-circle bg-base-100">
              <FontAwesomeIcon icon={faBell} className="text-xl" />
            </button>
          </div>
        </header>

        {/* MAIN-DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* COLUMN 1 */}
          <div className="lg:col-span-2">
            {/* REPORTS OVERVIEW */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-1 border border-black">
              <div className=" m-1 card card-body bg-primary h-4 flex justify-center items-center">
                <h2 className="text-xl font-roboto text-gray-100 font-semibold">
                  Total Reports
                </h2>
              </div>
              <div className=" m-1 card card-body bg-primary h-4 flex justify-center items-center">
                <h2 className="text-xl font-roboto text-gray-100 font-semibold">
                  Invalid Reports
                </h2>
              </div>
              <div className=" m-1 card card-body bg-primary h-4 flex justify-center items-center">
                <h2 className="text-xl font-roboto text-gray-100 font-semibold">
                  Resolved Reports
                </h2>
              </div>
              <div className=" m-1 card card-body bg-primary h-4 flex justify-center items-center">
                <h2 className="text-xl font-roboto text-gray-100 font-semibold">
                  Pending Reports
                </h2>
              </div>
            </div>
            {/* REPORTS LIST */}
            <div className="border border-black p-1">
              Reports
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
                      ? "bg-base-200"
                      : "bg-base-100 border border-gray-500"
                  }`}
                >
                  <span className="ml-2 font-sans font-medium">{location}</span>
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                    <button className="btn btn-xs mx-2 btn-outline px-4">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* COLUMN 2 */}
          <div className="border border-black flex flex-col justify-between items-center p-1">
            {/* VIEW REPORT */}
            <div className="border border-black w-full font-roboto font-semibold pr-2 pl-4 card flex flex-row p-2 justify-between items-center">
              Hotspot Areas
              <button className="btn btn-ghost bg-base-200">View Report</button>
            </div>
            {/* HEATMAP */}
            <div className="card border border-black w-full h-full mt-3 flex justify-center items-center">
              Heatmap
            </div>
            {/* LOCATION MAP */}
            <div className="card border border-black w-full h-full m-3 flex justify-center items-center">
              Location Map
            </div>
            {/* DRONE INSPECTION */}
            <div className="card w-full">
              <button className="btn btn-ghost text-lg bg-primary text-white font-roboto">
                Drone Inspection
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
