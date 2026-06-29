import { Check, Icon } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createOrder,
  removeErrors,
  removeSuccess,
} from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import Loader from "../components/Loader";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { success, loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    const createOrderData = async () => {
      try {
        const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
        if (!orderItem) return;
        const orderData = {
          shippingInfo: {
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            country: shippingInfo.country,
            pinCode: shippingInfo.pinCode,
            phoneNo: shippingInfo.phoneNumber,
          },
          orderItems: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            product: item.product,
          })),
          paymentInfo: {
            id: reference,
            status: "succeeded",
          },
          itemsPrice: orderItem.subtotal,
          taxPrice: orderItem.tax,
          shippingPrice: orderItem.shippingCharges,
          totalPrice: orderItem.total,
        };
        dispatch(createOrder(orderData));
        sessionStorage.removeItem("orderItem");
      } catch (error) {
        toast.error(error.message || "Order Creation Failed", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    };
    createOrderData();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success("Order Palced.", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(clearCart());
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Payment Status" />
          <Navbar />

          <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg sm:p-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                <Check className="text-white" size={36} />
              </div>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                Order Confirmed!
              </h1>

              <p className="mt-3 break-words text-sm text-gray-600 sm:text-base">
                Your payment was successful.
              </p>

              <p className="mt-2 break-all text-sm text-gray-700 sm:text-base">
                Reference ID:
                <span className="ml-2 font-semibold">{reference}</span>
              </p>

              <Link
                to="/orders/user"
                className="btn-primary mt-8 flex w-full justify-center"
              >
                View Orders
              </Link>
            </div>
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default PaymentSuccess;
