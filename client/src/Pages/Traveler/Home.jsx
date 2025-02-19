import React, { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// import Feed from "../../Components/Feed";
import { FaUser } from "react-icons/fa";
import { logOut } from "../../Redux/AuthSlice";
import SearchLog from "./SearchLog";
// import TrendingPlace from "../../Components/TrendingPlace";

const Feed = lazy(() => import("../../Components/Feed"));
const CreateLog = lazy(() => import("../../Components/CreateLog"));
const TrendingPlace = lazy(() => import("../../Components/TrendingPlace"));

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(logOut());
  };

  const handleProfile = () => {
    navigate("/user-profile");
  };

  return (
    <div>
      <div className="border-b-2 fixed top-0 bg-white w-full z-10">
        <header className="flex justify-between items-center p-4">
          <h1>Welcome, {user.role}!</h1>
          <SearchLog />
          <button
            className=" bg-black text-white p-1 rounded-2xl pl-3 pr-3 cursor-pointer"
            onClick={handleProfile}
          >
            Profile
          </button>
          <button className="cursor-pointer" onClick={handleClick}>
            Logout
          </button>
          <FaUser />
        </header>
      </div>
      <main className="flex space-x-6 mt-6 p-4 absolute top-10   left-0 right-0">
        <div className="w-1/3 bg-white p-4 shadow-lg rounded-lg">
          <CreateLog />
        </div>
        <div className="w-1/2 bg-white p-4 shadow-lg rounded-lg">
          <Suspense fallback={<div>Loading...</div>}>
            <Feed />
          </Suspense>
        </div>
        <div className="w-1/3 bg-white p-4 shadow-lg rounded-lg">
          <Suspense fallback={<div>Loading...</div>}>
            <TrendingPlace />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Home;
