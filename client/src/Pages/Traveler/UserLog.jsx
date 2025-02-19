import React, { useEffect, useState } from "react";
import { getUserTravelLogs } from "../../Features/UserLogFeature";
import { useDispatch, useSelector } from "react-redux";
import useDebouncing from "../../CustomHooks/useDebouncing";
import { CiMenuKebab } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import FeedMenu from "../../Components/FeedMenu";
import UpdateLog from "../../Components/UpdateLog";
import { toast, ToastContainer } from "react-toastify";

const UserLog = () => {
  const [feedMenu, setFeedMenu] = useState(null);
  const dispatch = useDispatch();
  const { yourLogs, isLoading, isEditing, updateLog, isUpdated } = useSelector(
    (state) => state.userLog
  );
  const debounce = useDebouncing(getUserTravelLogs);

  // console.log(yourLogs);

  useEffect(() => {
    debounce();
  }, [debounce, updateLog]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Log Updated Successfully", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  }, [isUpdated]);

  const handleMenuPopUp = (id) => {
    setFeedMenu(feedMenu === id ? null : id);
  };

  // console.log(updateLog);

  return (
    <div className="p-4">
      <ToastContainer />
      <div></div>
      <main className="flex flex-col md:flex-row flex-wrap items-center justify-between">
        {yourLogs?.map((log) => {
          return (
            <article
              key={log._id}
              className="bg-white mb-2 rounded-2xl overflow-hidden border border-pink-200 relative w-100"
            >
              <header className="p-4 bg-gray-100 flex justify-between items-center border-b-1 mb-1">
                <div className="flex flex-col items-start space-x-4">
                  <div className="flex flex-col items-start space-x-2">
                    <h2 className="text-lg font-semibold text-gray-800 capitalize">
                      {log.title}
                    </h2>
                    <p className="text-gray-600 text-sm capitalize">
                      {log.placesToVisit?.join(",⚓")}
                    </p>
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
                        className="w-full h-70 object-cover bg-amber-200"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <section className="p-4">
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
              {feedMenu === log._id && (
                <FeedMenu
                  userMenu={true}
                  logs={log}
                  closeMenu={() => {
                    // console.log("close");
                    setFeedMenu(null);
                  }}
                />
              )}
            </article>
          );
        })}
      </main>
      {isEditing && (
        <div>
          <UpdateLog />
        </div>
      )}
    </div>
  );
};

export default UserLog;
