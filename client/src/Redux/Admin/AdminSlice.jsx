import { createSlice } from "@reduxjs/toolkit";
import { getAllUserDetails } from "../../Features/Admin/AdminFeature";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserDetails.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
  },
});

export default adminSlice.reducer;
