import React, { lazy, Suspense } from "react";

const ManageUser = lazy(() => import("./ManageUser"));

const Dashboard = () => {
  return (
    <div>
      <div className="w-1/3 bg-white p-4 shadow-lg rounded-lg">
        <Suspense fallback={<div>Loading...</div>}>
          <ManageUser />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
