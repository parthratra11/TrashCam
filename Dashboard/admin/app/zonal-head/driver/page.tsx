"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import drivers from "../../../drivers.json";

interface Driver {
  id: number;
  name: string;
  vanDetails: string;
  assignedReports: {
    id: string;
    status: string;
    location: string;
    reportedOn: string;
  }[];
  historicalData: {
    totalResolved: number;
    avgResolutionTime: string;
    monthlyEfficiency: string;
  };
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDrivers, setExpandedDrivers] = useState<number[]>([]);

  const filteredDrivers = drivers.drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-900 border border-red-200";
      case "resolved":
        return "bg-green-100 text-green-900 border border-green-200";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-200";
    }
  };

  const toggleDriverExpansion = (driverId: number) => {
    setExpandedDrivers((prev) =>
      prev.includes(driverId)
        ? prev.filter((id) => id !== driverId)
        : [...prev, driverId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Driver Management Dashboard
        </h1> */}

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search drivers by name..."
            className="w-full md:w-96 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 transition-colors text-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Driver Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDrivers.map((driver) => (
            <div
              key={driver.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              {/* Driver Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {driver.name}
                  </h2>
                  <p className="text-gray-600">ID: {driver.id}</p>
                  <p className="text-gray-600">Van: {driver.vanDetails}</p>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="text-blue-900">Total Resolved</span>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    {driver.historicalData.totalResolved}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-green-900">Efficiency</span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    {driver.historicalData.monthlyEfficiency}
                  </span>
                </div>
              </div>

              {/* Current Assignments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Current Assignments
                </h3>
                <div className="space-y-4">
                  {(expandedDrivers.includes(driver.id)
                    ? driver.assignedReports
                    : driver.assignedReports.slice(0, 2)
                  ).map((report) => (
                    <div
                      key={report.id}
                      className="flex justify-between bg-gray-50 items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-100 shadow-sm"
                    >
                      <div>
                        <p className="text-gray-700 font-medium">
                          {report.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          {report.reportedOn}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </div>
                  ))}
                  {driver.assignedReports.length > 2 && (
                    <button
                      onClick={() => toggleDriverExpansion(driver.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      {expandedDrivers.includes(driver.id)
                        ? "Show less"
                        : `Show ${
                            driver.assignedReports.length - 2
                          } more reports...`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
