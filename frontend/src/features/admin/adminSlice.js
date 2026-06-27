import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    loading: false,
    success: false,
    error: null,
    product: {},
    deleting: {},
    message: null,
    orders: [],
    totalAmount: 0,
    users: [],
    user: {},
    loadingRoleUpdate: false,
    successRoleUpdate: false,
    errorRoleUpdate: null,
    order: {},
    reviews: [],
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
    removeRoleUpdateError: (state) => {
      state.errorRoleUpdate = null;
    },
    removeRoleUpdateSuccess: (state) => {
      state.successRoleUpdate = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Admin products
    builder.addCase(fetchAdminProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.products = action.payload.products || [];
    });
    builder.addCase(fetchAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Failed to fetch Admin Products";
      state.success = false;
    });

    // Create Product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.products.push(action.payload.product);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        "Failed to Create Product. Please Try again Later.";
      state.success = false;
    });

    // Update Product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.product = action.payload.product;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message || "Failed to Update. Please Try again Later.";
      state.success = false;
    });

    // Delete Product
    builder.addCase(deleteProduct.pending, (state, action) => {
      const productId = action.meta.arg;
      state.deleting[productId] = true;
      state.success = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const productId = action.payload.productId;
      state.deleting[productId] = false;
      state.products = state.products.filter(
        (product) => product._id !== productId,
      );
      state.success = action.payload.success;
      state.message = action.payload.message;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      const productId = action.meta.arg;
      state.deleting[productId] = false;
      state.error =
        action.payload.message || "Failed to Delete. Please Try again Later.";
      state.success = false;
    });

    // Get All Users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.users = action.payload.users || [];
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Failed to fetch Users";
    });

    // Get Single User
    builder.addCase(getSingleUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user || {};
    });
    builder.addCase(getSingleUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Failed to fetch User Data";
    });

    // Update Role
    builder.addCase(updateRole.pending, (state) => {
      state.loadingRoleUpdate = true;
      state.errorRoleUpdate = null;
      state.successRoleUpdate = false;
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.loadingRoleUpdate = false;
      state.errorRoleUpdate = null;
      state.successRoleUpdate = action.payload.success;
      state.user = action.payload.user;
      state.message = action.payload.message || "Role Updated Successfully.";
    });
    builder.addCase(updateRole.rejected, (state, action) => {
      state.loadingRoleUpdate = false;
      state.errorRoleUpdate =
        action.payload.message ||
        "Failed to Update Role. Please Try again Later.";
      state.successRoleUpdate = false;
    });

    // Delete User
    builder.addCase(deleteUser.pending, (state, action) => {
      const userId = action.meta.arg;
      state.deleting[userId] = true;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const userId = action.payload.userId;
      state.users = state.users.filter((user) => user._id !== userId);
      state.success = action.payload.success;
      state.message = action.payload.message || "User Deleted Successfully.";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      const userId = action.meta.arg;
      state.deleting[userId] = false;
      state.loading = false;
      state.error =
        action.payload.message ||
        "Failed to Delete User. Please Try again Later.";
      state.success = false;
    });

    // Get All Orders
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.data?.orders || [];
      state.success = action.payload.data?.success || true;
      state.totalAmount = action.payload.data?.totalAmount;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        "Failed to Fetch Orders. Please Try again Later.";
      state.success = false;
    });

    // Delete Order
    builder.addCase(deleteOrder.pending, (state, action) => {
      const orderId = action.meta.arg;
      state.deleting[orderId] = true;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const orderId = action.payload.orderId;
      state.orders = state.orders.filter((order) => order._id !== orderId);
      state.success = action.payload.success;
      state.message = action.payload.message || "Order Deleted Successfully.";
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      const orderId = action.meta.arg;
      state.deleting[orderId] = false;
      state.loading = false;
      state.error =
        action.payload.message ||
        "Failed to Delete Order. Please Try again Later.";
      state.success = false;
    });

    // Update order
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.order = action.payload.order;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        "Failed to Update Order Status. Please Try again Later.";
      state.success = false;
    });

    // Fetch All Reviews
    builder.addCase(fetchProductReviews.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchProductReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.reviews = action.payload.reviews;
    });
    builder.addCase(fetchProductReviews.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        "Failed to Fetch Reviews. Please Try again Later.";
      state.success = false;
    });

    // Delete Review
    builder.addCase(deleteReview.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload.message ||
        "Failed to Delete Review. Please Try again Later.";
      state.success = false;
    });
  },
});

// Fetch all Products
export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch Admin Products",
      );
    }
  },
);

// Create Product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/v1/admin/product/create",
        productData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Failed to Create Product. Please Try again Later.",
      );
    }
  },
);

// Update Product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Update. Please Try again Later.",
      );
    }
  },
);

// delete product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
      return { data, productId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Delete. Please Try again Later.",
      );
    }
  },
);

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/users");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch Users");
    }
  },
);

// Fetch Single user
export const getSingleUser = createAsyncThunk(
  "admin/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch User Data",
      );
    }
  },
);

//Update Role
export const updateRole = createAsyncThunk(
  "admin/updateRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        role,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Failed to Update Role. Please Try again Later.",
      );
    }
  },
);

// Delete User Profile
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/user/${userId}`);
      return { data, userId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Failed to Delete User. Please Try again Later.",
      );
    }
  },
);

// Get All Orders
export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/orders`);
      return { data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Failed to Fetch Orders. Please Try again Later.",
      );
    }
  },
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/${orderId}`);
      return { data, orderId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Failed to Delete Order. Please Try again Later.",
      );
    }
  },
);

// Update Order
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/order/${orderId}`,
        { status },
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Failed to Update Order Status. Please Try again Later.",
      );
    }
  },
);

// Fetch All Reviews
export const fetchProductReviews = createAsyncThunk(
  "admin/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/reviews?id=${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Failed to Fetch Reviews. Please Try again Later.",
      );
    }
  },
);

// Delete Review
export const deleteReview = createAsyncThunk(
  "admin/deleteReview",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/admin/reviews?productId=${productId}&reviewId=${reviewId}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          "Failed to Delete Review. Please Try again Later.",
      );
    }
  },
);

export const {
  removeError,
  removeSuccess,
  removeRoleUpdateError,
  removeRoleUpdateSuccess,
  clearMessage,
} = adminSlice.actions;
export default adminSlice.reducer;
