"use client";
import reports from "../../reports.json";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Head() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-red-100 text-red-900 border border-red-200";
      case "Resolved":
        return "bg-green-100 text-green-900 border border-green-200";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Reports Dashboard
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                    Reporting Mode
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.reports.map((report) => (
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
                    <td className="px-6 py-4 text-gray-700">
                      {report.reportingMode}
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
                      <Link
                        href={`/zonal-head/details?id=${report.id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium gap-2 border border-blue-200"
                      >
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
