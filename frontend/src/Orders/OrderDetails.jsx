import React, { useEffect } from "react";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, removeErrors } from "../features/order/orderSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function OrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.order);

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
    }
    dispatch(removeErrors());
  }, [dispatch, error, orderId]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle title={orderId} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-1 flex flex-col gap-4 justify-center items-center p-4">
          <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md gap-8 p-6">
            {/* Order Items */}
            <div>
              <h2 className="text-xl font-bold pb-2">Order Items</h2>
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="rounded-tl-md rounded-bl-md p-2">Image</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Quantity</th>
                    <th className="rounded-tr-md rounded-br-md p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems?.map((order) => (
                    <tr>
                      <td className="p-2 border-b border-gray-200">
                        <img
                          src={order.image}
                          alt={order.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </td>
                      <td className="p-2 border-b border-gray-200">
                        {order.name}
                      </td>
                      <td className="p-2 border-b border-gray-200">
                        {order.quantity}
                      </td>
                      <td className="p-2 border-b border-gray-200">
                        ₹{order.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Shipping Info */}
            <div>
              <h2 className="text-xl font-bold pb-2 border-b border-gray-200">
                Shipping Info
              </h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <th className="p-2 border-b border-gray-200">Address</th>
                    <td className="p-2 border-b border-gray-200">
                      {Object.values({
                        address: order.shippingInfo?.address,
                        city: order.shippingInfo?.city,
                        state: order.shippingInfo?.state,
                        country: order.shippingInfo?.country,
                        pinCode: order.shippingInfo?.pinCode,
                      })
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-2 border-b border-gray-200">Phone</th>
                    <td className="p-2 border-b border-gray-200">
                      {order?.shippingInfo?.phoneNo}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-bold pb-2 border-b border-gray-200">
                Order Summary
              </h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <th className="p-2 border-b border-gray-200">
                      Order Status
                    </th>
                    <td className="p-2 border-b border-gray-200">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th className="p-2 border-b border-gray-200">
                      Payment Status
                    </th>
                    <td className="p-2 border-b border-gray-200">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order?.paymentInfo?.status === "succeeded"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-red-800"
                        }`}
                      >
                        {order?.paymentInfo?.status === "succeeded"
                          ? "Paid"
                          : "Not Paid"}
                      </span>
                    </td>
                  </tr>
                  {order.paidAt && (
                    <tr>
                      <th className="p-2 border-b border-gray-200">Paid At</th>
                      <td className="p-2 border-b border-gray-200">
                        {formatDateTime(order.paidAt)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th className="p-2 border-b border-gray-200">
                      Items Price
                    </th>
                    <td className="p-2 border-b border-gray-200">
                      ₹{order?.itemsPrice?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-2 border-b border-gray-200">Tax Price</th>
                    <td className="p-2 border-b border-gray-200">
                      ₹{order?.taxPrice?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-2 border-b border-gray-200">
                      Shipping Price
                    </th>
                    <td className="p-2 border-b border-gray-200">
                      ₹{order?.shippingPrice?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-2 border-b border-gray-200">
                      Total Price
                    </th>
                    <td className="p-2 border-b border-gray-200">
                      ₹{order?.totalPrice?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default OrderDetails;
