import { createSlice } from "@reduxjs/toolkit";
import { searchLogByLocation } from "../Features/TravelLogFeature";

const initialState = {
  searchLogLocation: [],
  filteredSearchLogs: [],
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
      // console.log(action.payload);
      state.yourSearchLocation = action.payload;

      sessionStorage.setItem(
        "yourSearchLocation",
        JSON.stringify(action.payload)
      );
    },

    searchByDate: (state, action) => {
      const date = new Date(action.payload).toLocaleDateString();
      // console.log(date);
      state.filteredSearchLogs = state.searchLogLocation.filter((item) => {
        const logDate = new Date(item.date).toLocaleDateString();
        if (logDate === date) {
          return item;
        } else {
          return null;
        }
      });
    },

    searchByBuget: (state, action) => {
      const budget = action.payload;
      if (state.filteredSearchLogs.length > 0) {
        state.filteredSearchLogs = state.filteredSearchLogs.filter((item) => {
          if (item.cost <= budget) {
            return item;
          } else {
            return null;
          }
        });
      } else {
        state.filteredSearchLogs = state.searchLogLocation.filter((item) => {
          if (item.cost <= budget) {
            return item;
          } else {
            return null;
          }
        });
      }
    },

    sortMostLikes: (state) => {
      state.searchLogLocation = state.searchLogLocation.sort((a, b) => {
        return b.likes.length - a.likes.length;
      });
    },

    clearSearchLogs: (state) => {
      state.filteredSearchLogs = [];
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

export const {
  yourSearchLocationQuery,
  searchByDate,
  searchByBuget,
  clearSearchLogs,
  sortMostLikes,
} = searchLogSlice.actions;

export default searchLogSlice.reducer;
