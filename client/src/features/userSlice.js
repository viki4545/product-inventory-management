// src/features/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_BASE_URL } from "../utils/constant";

const BASE_URL = SERVER_BASE_URL;

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/register`,
        userData,
      );
      console.log(userData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const loginUser = createAsyncThunk("user/login", async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login`, userData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    isLoggedIn: false,
    status: "idle",
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
