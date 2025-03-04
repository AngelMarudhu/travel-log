import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/login";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      // console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "get-user-info",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/user-info`, {
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
