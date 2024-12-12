"use client";
import { useState } from "react";
import reports from "../../reports.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import ChatBot from "./chatbot/chatbot";

export default function Home() {
  const [reportData, setReportData] = useState(reports.reports);
  const [searchQuery, setSearchQuery] = useState("");

  // Example driver data - in real app this would come from auth/API
  const driverData = {
    name: "Ramesh Kumar",
    vehicleNumber: "DL-09-U-0911",
  };

  const totalReports = reportData.length;
  const pendingReports = reportData.filter(
    (r) => r.status === "Pending"
  ).length;
  const resolvedReports = reportData.filter(
    (r) => r.status === "Resolved"
  ).length;

  const handleResolveReport = (id: string) => {
    setReportData(
      reportData.map((report) => {
        if (report.id === id) {
          return {
            ...report,
            status: report.status === "Resolved" ? "Pending" : "Resolved",
          };
        }
        return report;
      })
    );
  };

  const handleInvalidReport = (id: string) => {
    setReportData(
      reportData.map((report) => {
        if (report.id === id) {
          return {
            ...report,
            status: report.status === "Invalid" ? "Pending" : "Invalid",
          };
        }
        return report;
      })
    );
  };

  const filteredReports = reportData.filter((report) =>
    report.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-red-50 text-red-900 border border-red-200";
      case "Resolved":
        return "bg-green-50 text-green-900 border border-green-200";
      case "Invalid":
        return "bg-gray-50 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/urbanEco.png"
              alt="UrbanEco Logo"
              width={140}
              height={140}
              className="object-contain"
            />
          </Link>

          <div className="flex-1 max-w-3xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent transition-all"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Left Section - 2/3 width */}
        <div className="w-2/3 p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-[#4b5563] flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {driverData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#4b5563] drop-shadow-sm">
                  {driverData.name}
                </h1>
                <p className="text-lg text-[#4b5563] mt-1">
                  Vehicle: {driverData.vehicleNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            {[
              { label: "Total Reports", value: totalReports },
              { label: "Pending Reports", value: pendingReports },
              { label: "Resolved Reports", value: resolvedReports },
              {
                label: "Invalid Reports",
                value: reportData.filter((r) => r.status === "Invalid").length,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[#2e7d32] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 hover:scale-105 transform"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {stat.label}:
                  </h3>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#1b5e20] mb-6">
                Reports Dashboard
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {[
                        "ID",
                        "Location",
                        "Timestamp",
                        "Status",
                        "Mark Resolved",
                        "Mark Invalid",
                      ].map((header, i) => (
                        <th
                          key={i}
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-800"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReports.map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-700">{report.id}</td>
                        <td className="px-6 py-4">
                          <a
                            href={`https://www.google.com/maps?q=${report.coordinates.lat},${report.coordinates.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2"
                          >
                            {report.location}
                            <svg
                              className="h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {report.timestamp}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getStatusColor(
                              report.status
                            )}`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={report.status === "Resolved"}
                            onChange={() => handleResolveReport(report.id)}
                            className="w-4 h-4 text-[#2e7d32] border-gray-300 rounded focus:ring-[#2e7d32]"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={report.status === "Invalid"}
                            onChange={() => handleInvalidReport(report.id)}
                            className="w-4 h-4 text-gray-500 border-gray-300 rounded focus:ring-gray-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - 1/3 width */}
        <div className="w-1/3 h-[calc(100vh-4rem)] sticky top-0">
          <div className="h-full p-4 bg-white shadow-lg rounded-lg m-4">
            <iframe
              src="/Maps/route_map.html"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <ChatBot />
      </div>
    </div>
  );
}
