import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Redux/AuthSlice.jsx";
import travelLogSlice from "../Redux/TravelLogSlice.jsx";
import userLogSlice from "../Redux/UserLogSlice.jsx";
import adminSlice from "../Redux/Admin/AdminSlice.jsx";
import { combineReducers } from "@reduxjs/toolkit";

// const travelerReducer = {
//   travelLog: travelLogSlice,
//   userLog: userLogSlice,
// };

// const adminReducer = {
//   admin: adminSlice,
// };

// const rootReducer = combineReducers({
//   auth: authSlice,
//   ...localStorage.getItem
// })

export const store = configureStore({
  reducer: {
    auth: authSlice,
    travelLog: travelLogSlice,
    userLog: userLogSlice,
    admin: adminSlice,
  },
});
