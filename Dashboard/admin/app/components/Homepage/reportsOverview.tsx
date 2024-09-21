import React from "react";
import TotalReports from "./ReportsOverview/totalReports";
import InvalidReports from "./ReportsOverview/invalidReports";
import ResolvedReports from "./ReportsOverview/resolvedReports";
import PendingReports from "./ReportsOverview/pendingReports";

const ReportsOverview = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-1">
      <TotalReports />
      <InvalidReports />
      <ResolvedReports />
      <PendingReports />
    </div>
  );
};

export default ReportsOverview;
