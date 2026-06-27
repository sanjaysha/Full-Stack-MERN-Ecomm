import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import CheckoutPath from "./CheckoutPath";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderConfirm() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal =
    cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;
  const shippingCharges = subtotal < 500 ? 50 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCharges + tax;

  const navigate = useNavigate();

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      total,
    };
    sessionStorage.setItem("orderItem", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle title="Order Confirmation" />
      <Navbar />
      <CheckoutPath activeStep={1} />
      <div className="flex-1 p-4 max-w-6xl mx-auto w-full">
        {/* Shipping Details */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Phone</th>
                  <th className="p-3 text-left font-semibold">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="p-3">{user?.name || "N/A"}</td>
                  <td className="p-3">{shippingInfo?.phoneNumber || "N/A"}</td>
                  <td className="p-3">
                    {shippingInfo?.address || "N/A"}, {shippingInfo?.city || ""}
                    , {shippingInfo?.state || ""},{shippingInfo?.country} -{" "}
                    {shippingInfo?.pinCode || ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Items */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left font-semibold">Image</th>
                  <th className="p-3 text-left font-semibold">Product Name</th>
                  <th className="p-3 text-left font-semibold">Price</th>
                  <th className="p-3 text-left font-semibold">Quantity</th>
                  <th className="p-3 text-left font-semibold">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item.product} className="border-t border-gray-200">
                      <td className="p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">₹{item.price * item.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t border-gray-200">
                    <td colSpan="5" className="p-3 text-center text-gray-500">
                      No items in cart
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left font-semibold">Subtotal</th>
                  <th className="p-3 text-left font-semibold">
                    Shipping Charges
                  </th>
                  <th className="p-3 text-left font-semibold">GST</th>
                  <th className="p-3 text-left font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="p-3">₹{subtotal.toFixed(2)}</td>
                  <td className="p-3">₹{shippingCharges.toFixed(2)}</td>
                  <td className="p-3">₹{tax.toFixed(2)}</td>
                  <td className="p-3 font-bold text-lg">₹{total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mb-8">
          <button className="btn-primary px-8 py-3" onClick={proceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderConfirm;
