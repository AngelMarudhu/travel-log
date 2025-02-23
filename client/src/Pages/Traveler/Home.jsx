import React, { useEffect, lazy, Suspense, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";
import { logOut } from "../../Redux/AuthSlice";
import SearchLog from "./SearchLog";
import { motion } from "framer-motion";

const Feed = lazy(() => import("../../Components/Feed"));
const CreateLog = lazy(() => import("../../Components/CreateLog"));
const TrendingPlace = lazy(() => import("../../Components/TrendingPlace"));

const Home = () => {
  const [hoverMenu, setHoverMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hoverRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const handleClick = () => {
    dispatch(logOut());
  };

  // console.log(user);

  const handleProfile = () => {
    navigate("/user-profile");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hoverRef.current && !hoverRef.current.contains(event.target)) {
        setHoverMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div>
      <div className=" fixed top-0 bg-white w-full z-10">
        <header className="flex justify-between items-center p-4">
          <h1>Welcome, {user.role}!</h1>
          <SearchLog />
          <div
            ref={hoverRef}
            onMouseEnter={() => setHoverMenu(true)}
            className="flex items-center border-2 rounded-full p-2 relative"
          >
            <FaUser />
            <span>{`${hoverMenu ? "⬆️" : "🔽"}`}</span>

            {hoverMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute border-2 top-12 right-0 bg-white shadow-lg rounded-lg p-2"
              >
                <button
                  className=" cursor-pointer border-b-2 "
                  onClick={handleProfile}
                >
                  Profile
                </button>
                <button className="cursor-pointer" onClick={handleClick}>
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </header>
      </div>

      <main className="flex space-x-6 mt-6 p-4 absolute top-10   left-0 right-0">
        <div className="w-1/3 bg-white p-4 shadow-lg rounded-lg">
          <CreateLog />
        </div>
        <div className="w-1/2 bg-white p-4 shadow-lg rounded-lg">
          <Suspense fallback={<div>Loading...</div>}>
            <Feed userId={user.id} />
          </Suspense>
        </div>
        <div className="w-1/3 bg-white p-4 shadow-lg rounded-lg">
          <Suspense fallback={<div>Loading...</div>}>
            <TrendingPlace />
          </Suspense>
        </div>
      </main>
    </motion.div>
  );
};

export default Home;
