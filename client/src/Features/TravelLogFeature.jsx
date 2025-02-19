import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
