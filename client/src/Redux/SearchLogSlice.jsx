import { createSlice } from "@reduxjs/toolkit";
import { searchLogByLocation } from "../Features/TravelLogFeature";

const initialState = {
  searchLogLocation: [],
  isLoading: false,
  error: null,
  yourSearchLocation:
    JSON.parse(sessionStorage.getItem("yourSearchLocation")) || null,
};

const searchLogSlice = createSlice({
  name: "searchLogByLocation",
  initialState,

  reducers: {
    yourSearchLocationQuery: (state, action) => {
      console.log(action.payload);
      state.yourSearchLocation = action.payload;

      sessionStorage.setItem(
        "yourSearchLocation",
        JSON.stringify(action.payload)
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(searchLogByLocation.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(searchLogByLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchLogLocation = action.payload;
    });

    builder.addCase(searchLogByLocation.rejected, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.error = action.payload.error.message;
    });
  },
});

export const { yourSearchLocationQuery } = searchLogSlice.actions;

export default searchLogSlice.reducer;
