import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    success: false,
    error: null,
    order: {},
    orders: [],
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
      state.success = action.payload.success;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error =
        action.payload.message ||
        "Order creation failed. Please try again later.";
    });

    // Get all user orders
    builder.addCase(getAllMyOrders.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(getAllMyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.success = action.payload.success;
    });
    builder.addCase(getAllMyOrders.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error =
        action.payload.message ||
        "Failed to fetch orders. Please try again later.";
    });

    // Get order details
    builder.addCase(getOrderDetails.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
      state.success = action.payload.success;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error =
        action.payload?.message ||
        "Failed to fetch order details. Please try again later.";
    });
  },
});

// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/new/order", order, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order creation failed.");
    }
  },
);

// Get all user orders
export const getAllMyOrders = createAsyncThunk(
  "order/getAllMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/orders/user");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders.");
    }
  },
);

// Get an order details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${orderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch order details.",
      );
    }
  },
);

export const { removeSuccess, removeErrors } = orderSlice.actions;
export default orderSlice.reducer;
