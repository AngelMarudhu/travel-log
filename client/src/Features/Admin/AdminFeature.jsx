import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/admin";

export const getAllUserDetails = createAsyncThunk(
  "get-user-details",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/get-all-users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
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
