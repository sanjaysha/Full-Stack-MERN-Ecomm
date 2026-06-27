import React from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal < 500 ? 50 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle title="Your Cart" />
      <Navbar />
      {cartItems && cartItems.length > 0 ? (
        <div className="flex p-4 gap-4 items-start flex-1">
          <div className="w-3/4 p-4 rounded-lg shadow-lg bg-gray-50">
            <h2 className="text-xl font-bold pb-4">Your Cart</h2>
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="rounded-tl-md rounded-bl-md p-2">Product</th>
                  <th className=" p-2">Quantity</th>
                  <th className=" p-2">Total Price</th>
                  <th className="rounded-tr-md rounded-br-md p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItem key={item.product} item={item} />
                  ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/4 p-4 rounded-lg shadow-lg bg-gray-50 flex flex-col gap-2">
            <h2 className="text-xl font-bold pb-4 border-b border-gray-200">
              Order Summary
            </h2>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <span>Tax(18%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="mt-3 btn-primary" onClick={checkoutHandler}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 gap-4 flex-1">
          <p className="text-lg">Your cart is empty.</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;
