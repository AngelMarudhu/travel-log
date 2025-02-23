import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { yourSearchLocationQuery } from "../../Redux/SearchLogSlice";

const SearchLog = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const { yourSearchLocation } = useSelector(
  //     (state) => state.searchLogByLocation
  //   );

  //   console.log(yourSearchLocation);

  const handleSearch = () => {
    if (searchLocation.trim() === "") {
      toast.error("Please enter a location", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    }

    if (searchLocation.trim() !== "") {
      dispatch(yourSearchLocationQuery(searchLocation));
      navigate("/search-results");
    }
    // console.log(searchLocation);
  };

  return (
    <div>
      <ToastContainer />
      <div className="border-2 border-black p-2 rounded-2xl">
        <input
          className=" border-r-2 focus:border-none outline-none mr-3"
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button onClick={handleSearch} className="cursor-pointer">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchLog;
