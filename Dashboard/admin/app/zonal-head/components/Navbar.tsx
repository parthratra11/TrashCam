"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/zonal-head">
              <Image
                src="/images/urbanEco.png"
                alt="UrbanEco Logo"
                width={120}
                height={120}
                className="object-contain pl-2"
              />
            </Link>
          </div>

          <div className="flex-1 max-w-3xl mx-8">
            <div className="flex items-center space-x-4">
              <Link
                href="/zonal-head"
                className={`px-4 py-2 text-gray-700 hover:text-[#2e7d32] rounded-md transition-all duration-300 flex items-center space-x-2 ${
                  pathname === "/zonal-head"
                    ? "border-b-2 border-[#2e7d32]"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span>Reports Dashboard</span>
              </Link>
              <Link
                href="/zonal-head/driver"
                className={`px-4 py-2 text-gray-700 hover:text-[#2e7d32] rounded-md transition-all duration-300 flex items-center space-x-2 ${
                  pathname === "/zonal-head/driver"
                    ? "border-b-2 border-[#2e7d32]"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Driver Management</span>
              </Link>
              <Link
                href="/zonal-head/analytics"
                className={`px-4 py-2 text-gray-700 hover:text-[#2e7d32] rounded-md transition-all duration-300 flex items-center space-x-2 ${
                  pathname === "/zonal-head/analytics"
                    ? "border-b-2 border-[#2e7d32]"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>Analytics & Insights</span>
              </Link>
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
    </div>
  );
};

export default Navbar;
