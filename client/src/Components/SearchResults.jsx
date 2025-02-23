import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { searchLogByLocation } from "../Features/TravelLogFeature";
import useDebouncing from "../CustomHooks/useDebouncing";
import { CiMenuKebab } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import FeedMenu from "./FeedMenu";

const SearchResult = () => {
  const { yourSearchLocation, searchLogLocation, isLoading, error } =
    useSelector((state) => state.searchLogByLocation);
  const [feedMenu, setFeedMenu] = useState(null);
  const debounce = useDebouncing(searchLogByLocation);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(searchLogLocation);
  // console.log(yourSearchLocation);
  // console.log(error);

  useEffect(() => {
    if (yourSearchLocation === null) {
      navigate("/home");
    }
    debounce(yourSearchLocation);
  }, [yourSearchLocation, navigate]);

  return (
    <div>
      <div>
        {isLoading ? "Loading..." : null}
        <h1 className="text-2xl">{`Your search result ${yourSearchLocation} ${
          searchLogLocation.length > 0
            ? `Found ${searchLogLocation.length}`
            : `${error}`
        }`}</h1>
      </div>
      <div className="w-1/2 m-auto mt-10">
        {searchLogLocation?.map((log) => (
          <article
            key={log._id}
            className="bg-white mb-2 rounded-2xl overflow-hidden border border-pink-200 relative"
          >
            <header className="p-4 bg-gray-100 flex justify-between items-center border-b-1 mb-1">
              <div className="flex flex-col items-start space-x-4">
                <h2 className="capitalize ">{log.user.name}</h2>
                <div className="flex flex-col items-start space-x-2 capitalize">
                  <h2 className="text-lg font-semibold text-gray-800 capitalize">
                    {log.title}
                  </h2>
                  <h2>Destination: {log.location}</h2>
                </div>
              </div>
              <button
                onClick={() => handleMenuPopUp(log._id)}
                className="cursor-pointer"
              >
                <CiMenuKebab />
              </button>
            </header>
            {/* ✅ Proper Swiper Implementation ✅ */}
            {log.images?.length > 0 && (
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                navigation
                spaceBetween={20}
                slidesPerView={1}
                className="w-full h-64"
              >
                {log.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${log.title} - Image ${index + 1}`}
                      className="w-full h-64 object-cover bg-amber-200"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <section className="p-4">
              <p className="text-gray-600 text-sm capitalize">
                Places Visit: {log.placesToVisit?.join(",⚓")}
              </p>
              <br />
              <p className="text-gray-600 capitalize">{log.description}</p>
            </section>
            <footer className="p-4 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
              <button className="p-2 rounded-lg bg-blue-500 text-white cursor-pointer">
                Like❤️
                <span className="text-gray-800 font-semibold ml-3">
                  {log.likes.length}
                </span>
              </button>
              <time dateTime={log.date}>
                {new Date(log.date).toLocaleDateString()}
              </time>
              <span className="text-sm">Cost: {log.cost} ₹</span>
            </footer>
            {feedMenu === log._id && <FeedMenu />}
          </article>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
