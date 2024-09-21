import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/all-products/${id}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/products/create-product`,
        product,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/products/update-product/${id}`,
        updatedProduct,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      await axios.post(`${BASE_URL}/api/products/delete-product/${id}`);
      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/product/${id}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.data);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload,
        );
      });
  },
});

export default productSlice.reducer;
