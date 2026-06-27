import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteOrder,
  getAllOrders,
  removeError,
  removeSuccess,
} from "../features/admin/adminSlice";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function OrdersList() {
  const dispatch = useDispatch();
  const { orders, loading, error, deleting } = useSelector(
    (state) => state.admin,
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  const handleDelete = (orderId) => {
    const isConfirm = window.confirm(
      "Are you Sure you want to delete this order?",
    );
    if (isConfirm) {
      dispatch(deleteOrder(orderId)).then((action) => {
        if (action.payload?.data?.success) {
          toast.success(
            action.payload?.data?.message || "Deleted Successfully",
            {
              position: "top-center",
              autoClose: 3000,
            },
          );
          dispatch(removeSuccess());
          dispatch(clearMessage());
        }
      });
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <PageTitle title="Orders" />
          <div className="flex-1 flex p-4">
            <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md gap-6 p-6">
              <h1 className="text-xl font-bold pb-2">All Orders</h1>
              {orders.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="rounded-tl-md rounded-bl-md p-2">Sl No</th>
                      <th className="p-2">Order Id</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Total Price</th>
                      <th className="p-2">Number of Items</th>
                      <th className="rounded-tr-md rounded-br-md p-2">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders &&
                      orders.map((order, index) => (
                        <tr
                          key={order._id}
                          className="border-b border-gray-200"
                        >
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{order._id}</td>
                          <td className="p-2">
                            {" "}
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
                          <td className="p-2">
                            ₹{order.totalPrice.toFixed(2)}
                          </td>
                          <td className="p-2">{order.orderItems.length}</td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Link
                                to={`/admin/order/${order._id}`}
                                className="btn-secondary"
                              >
                                <SquarePen color="#24b508" />
                              </Link>
                              <button
                                className="btn-secondary cursor-pointer"
                                disabled={deleting[order._id]}
                                onClick={() => handleDelete(order._id)}
                              >
                                {deleting[order._id] ? (
                                  <div className=" flex justify-center items-center h-8 w-10">
                                    <Loader />
                                  </div>
                                ) : (
                                  <Trash2 color="#ff3838" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex items-center justify-center">
                  <p>No Orders Found.</p>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default OrdersList;
