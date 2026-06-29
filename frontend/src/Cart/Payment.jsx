import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import CheckoutPath from "./CheckoutPath";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Payment() {
  const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const completePayment = async (amount) => {
    try {
      const { data: keyData } = await axios.get("/api/v1/getKey");
      const { data: orderData } = await axios.post("/api/v1/payment/process", {
        amount,
      });
      const { key } = keyData;
      const { order } = orderData;

      //   Open Razorpay Checkout
      const options = {
        key,
        amount,
        currency: "INR",
        name: "Sanjay Singh Shahi",
        description: "Test Transaction for Ecommerce website",
        order_id: order.id,
        // callback_url: "http://localhost:5173/api/v1/paymentVerification",
        handler: async function (response) {
          const { data } = await axios.post("/api/v1/paymentVerification", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          if (data.success) {
            navigate(`/paymentSuccess?reference=${data.reference}`);
          } else {
            alert("Payment Verification Failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle title="Process Payment" />
      <Navbar />
      <CheckoutPath activeStep={2} />
      <div className="flex-1 flex justify-center items-center gap-8 p-4 max-w-6xl mx-auto w-full">
        <Link to="/order/confirm" className="btn-secondary">
          Go Back
        </Link>
        <button
          className="btn-primary"
          onClick={() => completePayment(orderItem.total)}
        >
          Pay ₹{orderItem.total.toLocaleString()}
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;
