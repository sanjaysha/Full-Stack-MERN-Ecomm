import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import {
  CircleAlert,
  CircleCheck,
  IndianRupee,
  LayoutDashboard,
  ListOrdered,
  PackagePlus,
  ShelvingUnit,
  ShoppingCart,
  Star,
  Users,
  UserStar,
  Warehouse,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAdminProducts,
  getAllOrders,
  removeSuccess,
} from "../features/admin/adminSlice";

function Dashboard() {
  const { products, orders, totalAmount, success } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(removeSuccess());
    }
  }, [success]);

  const totalProduct = products.length;
  const totalOrders = orders.length;
  const outOfStock = products.filter((product) => product.stock === 0).length;
  const inStock = products.filter((product) => product.stock > 0).length;
  const totalReviews = products.reduce(
    (acc, product) => acc + (product.reviews.length || 0),
    0,
  );

  return (
    <>
      <Navbar />
      <PageTitle title="Admin Dashboard" />
      <div className="flex h-screen">
        <div className="w-64 h-full bg-gray-900 text-white flex flex-col">
          <div className="flex items-center gap-2 px-6 py-5 text-lg font-semibold border-b border-gray-800">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
            Admin Dashboard
          </div>
          <nav className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-1">
              <h3 className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Products
              </h3>
              <Link
                to="/admin/products"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Warehouse className="w-5 h-5" />
                All Products
              </Link>
              <Link
                to="/admin/product/create"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <PackagePlus className="w-5 h-5" />
                Create Products
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Users
              </h3>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Users className="w-5 h-5" />
                All Users
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Orders
              </h3>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <ListOrdered className="w-5 h-5" />
                All Orders
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Reviews
              </h3>
              <Link
                to="/admin/reviews"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Star className="w-5 h-5" />
                All Reviews
              </Link>
            </div>
          </nav>
        </div>
        <div className="flex-1 p-6 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
              <ShelvingUnit className="w-6 h-6 text-indigo-500" />
              <h3 className="text-sm font-medium text-gray-500">
                Total Products
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {totalProduct}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
              <h3 className="text-sm font-medium text-gray-500">
                Total Orders
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {totalOrders}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
              <UserStar className="w-6 h-6 text-purple-500" />
              <h3 className="text-sm font-medium text-gray-500">
                Total Reviews
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {totalReviews}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
              <IndianRupee className="w-6 h-6 text-green-500" />
              <h3 className="text-sm font-medium text-gray-500">
                Total Revenue
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                ₹ {totalAmount}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
              <CircleAlert className="w-6 h-6 text-red-500" />
              <h3 className="text-sm font-medium text-gray-500">
                Out Of Stock
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {outOfStock}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
              <CircleCheck className="w-6 h-6 text-emerald-500" />
              <h3 className="text-sm font-medium text-gray-500">In Stock</h3>
              <p className="text-2xl font-semibold text-gray-900">{inStock}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Dashboard;
