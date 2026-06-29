import React, { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyOrders, removeErrors } from "../features/order/orderSlice";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function MyOrders() {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getAllMyOrders());
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
    }
    dispatch(removeErrors);
  }, [dispatch, error]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <PageTitle title="Orders" />
        <Navbar />
        <div className="flex-1 flex p-4">
          {loading ? (
            <Loader />
          ) : orders.length > 0 ? (
            <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md gap-6 p-6">
              <h2 className="text-xl font-bold pb-2">My Orders</h2>
              <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="rounded-tl-md rounded-bl-md p-2">
                        Order ID
                      </th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Item Count</th>
                      <th className="p-2">Total Price</th>
                      <th className="rounded-tr-md rounded-br-md p-2">
                        View Order
                      </th>
                    </tr>
                  </thead>
                  {
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b border-gray-200"
                        >
                          <td className="p-2 text-sm">{order._id}</td>
                          <td className="p-2">
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
                          <td className="p-2">{order.orderItems.length}</td>
                          <td className="p-2 font-semibold">
                            ₹{order.totalPrice.toFixed(2)}
                          </td>
                          <td className="p-2">
                            <Link to={`/order/${order._id}`}>
                              <ExternalLink />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  }
                </table>
              </div>
            </div>
          ) : (
            <p className="font-bold text-gray-600">No orders found.</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyOrders;
