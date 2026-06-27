import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import HandleError from "../utils/handleError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

// Create new order
export const cretaeNewOrder = handleAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
    paidAt: Date.now(),
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// Get a single order
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  // .populate("orderItems.product", "name price image");
  if (!order) {
    return next(new HandleError("No order found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// Get all my orders
export const getAllMyOrders = handleAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new HandleError("No order found with this id", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

// Admin get all orders
export const getAllOrders = handleAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// Admin update order status
export const updateOrderStatus = handleAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HandleError("No order found", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new HandleError("You have already delivered this order", 400));
  }
  if (req.body.status === "Delivered" && !order.stockUpdated) {
    await Promise.all(
      order.orderItems.map((item) =>
        updateQuantity(item.product, item.quantity),
      ),
    );

    order.stockUpdated = true;
    order.deliveredAt = Date.now();
  }
  order.orderStatus = req.body.status;
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
});

async function updateQuantity(id, quantity) {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete order -- Admin
export const deleteOrder = handleAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HandleError("No order found", 404));
  }
  if (order.orderStatus !== "Delivered") {
    return next(new HandleError("You can only delete delivered orders", 400));
  }
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
