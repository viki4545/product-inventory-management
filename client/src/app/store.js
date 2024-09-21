// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});
