import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product: null,
    resultsPerPage: 0,
    totalPages: 0,
    currentPage: 0,
    reviewSuccess: false,
    reviewLoading: false,
    message: "",
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.reviewSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultsPerPage = action.payload.resultsPerPage;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "An error occurred while fetching products.";
        state.products = [];
        state.productCount = 0;
        state.resultsPerPage = 0;
        state.totalPages = 0;
        state.currentPage = 0;
      });

    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "An error occurred while fetching product details.";
      });

    builder
      .addCase(createReview.pending, (state) => {
        state.reviewLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviewSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error =
          action.payload || "An error occurred while fetching product details.";
      });
  },
});

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ keyword, page = 1, category }, { rejectWithValue }) => {
    try {
      let link = "/api/v1/products?page=" + page;
      if (category) {
        link += "&category=" + encodeURIComponent(category);
      }
      if (keyword) {
        link += "&keyword=" + encodeURIComponent(keyword);
      }
      // const link = keyword
      //   ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}&category=${encodeURIComponent(category)}`
      //   : `/api/v1/products?page=${page}&category=${encodeURIComponent(category)}`;
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred",
      );
    }
  },
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const link = `/api/v1/product/${id}`;
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred",
      );
    }
  },
);

export const createReview = createAsyncThunk(
  "product/createReview",
  async ({ rating, comment, productId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/v1/review",
        { rating, comment, productId },
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred",
      );
    }
  },
);

export const { removeErrors, removeSuccess } = productSlice.actions;
export default productSlice.reducer;
