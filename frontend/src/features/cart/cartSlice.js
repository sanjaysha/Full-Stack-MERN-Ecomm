import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    loading: false,
    error: null,
    success: false,
    message: null,
    removingId: null,
    shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
    removeItemsFromCart: (state, action) => {
      state.removingId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload,
      );
      state.message = "Item removed from cart successfully.";
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.removingId = null;
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemsToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addItemsToCart.fulfilled, (state, action) => {
      const item = action.payload;
      const exixtingItem = state.cartItems.find(
        (i) => i.product === item.product,
      );
      if (exixtingItem) {
        exixtingItem.quantity = item.quantity;
        state.message = `${item.name} quantity updated in cart successfully.`;
      } else {
        state.cartItems.push(item);
        state.message = `${item.name} added to cart successfully.`;
      }
      state.loading = false;
      state.error = null;
      state.success = true;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    });
    builder.addCase(addItemsToCart.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload?.message || "An error occurred while adding to cart.";
      state.success = false;
    });
  },
});

// Add Items to cart

export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${productId}`);
      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while adding to cart.",
      );
    }
  },
);

export const {
  removeErrors,
  removeMessage,
  removeItemsFromCart,
  saveShippingInfo,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
