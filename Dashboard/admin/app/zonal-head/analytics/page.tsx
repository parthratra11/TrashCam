import Navbar from "../components/Navbar";
import driversData from "../../../drivers.json";

interface Driver {
  id: number;
  name: string;
  assignedReports: { status: string }[];
}

const { drivers } = driversData;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Driver Reports Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Driver Performance
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#E5E5E5] rounded-lg text-md font-bold text-gray-600 border border-gray-200 shadow-sm">
                <span>Driver Name</span>
                <span>Pending Reports</span>
              </div>
              {[...drivers]
                .sort(
                  (a, b) =>
                    b.assignedReports.filter(
                      (report: { status: string }) =>
                        report.status === "pending"
                    ).length -
                    a.assignedReports.filter(
                      (report: { status: string }) =>
                        report.status === "pending"
                    ).length
                )
                .slice(0, 5) // Show only top 5 drivers
                .map((driver: Driver, index) => (
                  <div
                    key={driver.id}
                    className="flex justify-between bg-gray-50 items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-100 shadow-sm"
                  >
                    <span className="text-gray-700 font-medium">
                      {driver.name}
                    </span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium border border-blue-100 shadow-sm">
                      {
                        driver.assignedReports.filter(
                          (report: { status: string }) =>
                            report.status === "pending"
                        ).length
                      }
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Statistics Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Report Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                  <span className="text-blue-900 font-semibold">
                    Total Reports
                  </span>
                </div>
                <span className="text-blue-600 font-semibold text-lg">
                  1,056
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-900 font-semibold">Resolved</span>
                </div>
                <span className="text-green-600 font-semibold text-lg">
                  811
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                  <span className="text-red-900 font-semibold">Pending</span>
                </div>
                <span className="text-red-600 font-semibold text-lg">245</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Report Density Map
            </h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <span className="text-sm text-gray-600">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <span className="text-sm text-gray-600">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <span className="text-sm text-gray-600">Low</span>
              </div>
            </div>
          </div>
          <div className="h-[500px] bg-gray-50 rounded-xl overflow-hidden">
            <iframe
              src="/Maps/HeatMap.html"
              title="Heat Map"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
