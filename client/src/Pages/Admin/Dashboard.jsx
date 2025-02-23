import React, { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../Redux/AuthSlice";

const ManageUser = lazy(() => import("./ManageUser"));

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4">
        <h1>Welcome, Admin!</h1>
        <button className="cursor-pointer" onClick={handleClick}>
          Logout
        </button>
      </header>
      <div className="w-full">
        <div className="w-1/3 bg-white p-4 shadow-lg rounded-lg">
          <Suspense fallback={<div>Loading...</div>}>
            <ManageUser />
          </Suspense>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
