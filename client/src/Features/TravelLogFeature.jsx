import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:9000/api/traveler";

export const getTravelLogs = createAsyncThunk(
  "/get-travel-logs",
  async ({ page = 1 }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/get-travel-logs/${page}`, {
        params: { page },
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const createTraveLog = createAsyncThunk(
  "create/log",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      const response = await axios.post(`${API_URL}/log`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      return response.data.newTravelLog;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const searchLogByLocation = createAsyncThunk(
  "search-log-location",
  async (location, thunkAPI) => {
    // console.log(location);
    try {
      if (!location) {
        return thunkAPI.rejectWithValue({
          error: "Location is required",
        });
      }
      const response = await axios.get(
        `${API_URL}/search-log-by-location?fromLocation=${location.fromLocation}&toLocation=${location.toLocation}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            accept: "application/json",
          },
        }
      );

      // console.log(response.data);
      return response.data.searchLogs;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const getTrendingPlaces = createAsyncThunk(
  "get-trending-places",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/get-trending-logs`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
        },
      });

      // console.log(response.data.trendingPlaces);
      return response.data.trendingPlaces;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const getCommentTravelLog = createApi({
  reducerPath: "getCommentTravelLog",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getCommentTravelLog: builder.query({
        query: (id) => {
          return {
            url: `/get-comment-travel-log/${id}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetCommentTravelLogQuery } = getCommentTravelLog;
