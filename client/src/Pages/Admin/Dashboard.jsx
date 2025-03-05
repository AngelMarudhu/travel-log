import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/AuthSlice";

const ManageUser = lazy(() => import("./ManageUser"));

const Dashboard = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logOut());
  };

  const { users, adminDetails } = useSelector((state) => state.admin);

  console.log(adminDetails);

  return (
    <div className="w-full h-screen bg-white overflow-hidden">
      <header className="flex bg-cyan-200 mb-3 shadow-2xl justify-between items-center p-4">
        <h1>Welcome, Admin!</h1>
        <button className="cursor-pointer" onClick={handleClick}>
          Logout
        </button>
      </header>
      <div className="w-full relative flex gap-4 p-4">
        <div className="w-1/3 bg-white p-4 shadow-lg rounded-lg">
          <Suspense fallback={<div>Loading...</div>}>
            <ManageUser />
          </Suspense>
        </div>
        <div className="w-2/4 h-80 grid grid-cols-3 gap-3 absolute top-4 right-4">
          <div className="border-1 rounded-lg shadow-2xl flex justify-center items-center flex-col">
            <h2 className="text-2xl font-bold">Total Users</h2>
            <h1 className="text-4xl font-semibold">
              {adminDetails.totalUsers || users.length}
            </h1>
          </div>
          <div className="border-1 rounded-lg shadow-2xl flex justify-center items-center flex-col">
            <h2 className="text-2xl font-bold">Total Likes</h2>
            <h1 className="text-4xl font-semibold">
              {adminDetails.totalLikes}
            </h1>
          </div>
          <div className="border-1 rounded-lg shadow-2xl flex justify-center items-center flex-col">
            <h2 className="text-2xl font-bold">Total Logs</h2>
            <h1 className="text-4xl font-semibold">{adminDetails.totalLogs}</h1>
          </div>
          <div className="border-1 rounded-lg shadow-2xl flex justify-center items-center flex-col">
            <h2 className="text-2xl font-bold">Comments</h2>
            <h1 className="text-4xl font-semibold">
              {adminDetails.totalComments}
            </h1>
          </div>
          <div className="border-1 rounded-lg shadow-2xl flex justify-center items-center flex-col">
            <h2 className="text-2xl font-bold">Trending</h2>
            <h1 className="text-4xl font-semibold">5</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
