import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { getOrderDetails, removeErrors } from "../features/order/orderSlice";
import { useParams } from "react-router-dom";
import {
  getAllOrders,
  removeError,
  removeSuccess,
  updateOrderStatus,
} from "../features/admin/adminSlice";

function UpdateOrder() {
  const [status, setStatus] = useState("");
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const {
    order,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.order);
  const {
    success,
    loading: adminLoading,
    error: adminError,
  } = useSelector((state) => state.admin);
  const loading = orderLoading || adminLoading;
  const error = orderError || adminError;

  const handleStatusUpdate = () => {
    if (!status) {
      toast.error("Please select a status", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(updateOrderStatus({ orderId, status }));
  };

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Order Status Updated Successfully.", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, success, orderId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <PageTitle title="Update Order" />
          <div className="flex-1 flex p-4">
            <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md gap-6 p-6">
              <h1 className="text-xl font-bold pb-2">Update Order</h1>

              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-semibold pb-2 border-b border-gray-300">
                  Order Information
                </h1>
                <p>
                  <strong>Order Id: </strong>
                  {order._id}
                </p>
                <p>
                  <strong>Shipping Address: </strong>
                  {order.shippingInfo?.address} {order.shippingInfo?.city}{" "}
                  {order.shippingInfo?.state} {order.shippingInfo?.country}{" "}
                  {order.shippingInfo?.zipcode}
                </p>
                <p>
                  <strong>Phone Number: </strong>
                  {order.shippingInfo?.phoneNo}
                </p>
                <p>
                  <strong>Order Status: </strong>
                  {order.orderStatus}
                </p>
                <p>
                  <strong>Payment Status: </strong>
                  {order.paymentInfo?.status === "succeeded"
                    ? "Paid"
                    : "Not Paid"}
                </p>
                <p>
                  <strong>Total Price: </strong>₹
                  {order.totalPrice?.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-semibold pb-2 border-b border-gray-300">
                  Order Items
                </h1>
                <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="rounded-tl-md rounded-bl-md p-2">
                          Image
                        </th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Quantity</th>
                        <th className="rounded-tr-md rounded-br-md p-2">
                          Price
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {order &&
                        order.orderItems?.map((orderItem) => (
                          <tr
                            className="border-b border-gray-200"
                            key={orderItem._id}
                          >
                            <td className="p-2">
                              <img
                                src={orderItem.image}
                                alt={orderItem.name}
                                className="w-24 h-24 object-cover rounded-md"
                              />
                            </td>
                            <td className="p-2">{orderItem.name}</td>
                            <td className="p-2">{orderItem.quantity}</td>
                            <td className="p-2">
                              ₹{orderItem.price.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-semibold pb-2 border-b border-gray-300">
                  Update Order Status
                </h1>
                <div className="input-group">
                  <select
                    className="border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={loading || order.orderStatus === "Delivered"}
                  >
                    <option value="">Select Status</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="On the way">On the way</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button
                    className="btn-primary"
                    onClick={handleStatusUpdate}
                    disabled={
                      loading || !status || order.orderStatus === "Delivered"
                    }
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
}

export default UpdateOrder;
