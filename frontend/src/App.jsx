import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";

import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice";

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const ProductDetails = lazy(() => import("./pages/productDetails"));
const Products = lazy(() => import("./pages/products"));
const Register = lazy(() => import("./User/Register"));
const Login = lazy(() => import("./User/Login"));
const Profile = lazy(() => import("./User/Profile"));
const UpdateProfile = lazy(() => import("./User/UpdateProfile"));
const UpdatePassword = lazy(() => import("./User/UpdatePassword"));
const ForgetPassword = lazy(() => import("./User/ForgetPassword"));
const ResetPassword = lazy(() => import("./User/ResetPassword"));

const Cart = lazy(() => import("./Cart/Cart"));
const Shipping = lazy(() => import("./Cart/Shipping"));
const OrderConfirm = lazy(() => import("./Cart/OrderConfirm"));
const Payment = lazy(() => import("./Cart/Payment"));
const PaymentSuccess = lazy(() => import("./Cart/PaymentSuccess"));

const MyOrders = lazy(() => import("./Orders/MyOrders"));
const OrderDetails = lazy(() => import("./Orders/OrderDetails"));

const Dashboard = lazy(() => import("./Admin/Dashboard"));
const ProductsList = lazy(() => import("./Admin/ProductsList"));
const CreateProduct = lazy(() => import("./Admin/CreateProduct"));
const UpdateProduct = lazy(() => import("./Admin/UpdateProduct"));
const UsersList = lazy(() => import("./Admin/UsersList"));
const UpdateRole = lazy(() => import("./Admin/UpdateRole"));
const OrdersList = lazy(() => import("./Admin/OrdersList"));
const UpdateOrder = lazy(() => import("./Admin/UpdateOrder"));
const ReviewsList = lazy(() => import("./Admin/ReviewsList"));

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          ></Route>
          <Route
            path="/profile/update"
            element={<ProtectedRoute element={<UpdateProfile />} />}
          ></Route>
          <Route
            path="/password/update"
            element={<ProtectedRoute element={<UpdatePassword />} />}
          ></Route>
          <Route path="/password/forgot" element={<ForgetPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={<ProtectedRoute element={<Shipping />} />}
          ></Route>
          <Route
            path="/order/confirm"
            element={<ProtectedRoute element={<OrderConfirm />} />}
          ></Route>
          <Route
            path="/process/payment"
            element={<ProtectedRoute element={<Payment />} />}
          ></Route>
          <Route
            path="/paymentSuccess"
            element={<ProtectedRoute element={<PaymentSuccess />} />}
          ></Route>
          <Route
            path="/orders/user"
            element={<ProtectedRoute element={<MyOrders />} />}
          ></Route>
          <Route
            path="/order/:orderId"
            element={<ProtectedRoute element={<OrderDetails />} />}
          ></Route>

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute element={<Dashboard />} adminOnly={true} />
            }
          ></Route>
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute element={<ProductsList />} adminOnly={true} />
            }
          ></Route>
          <Route
            path="/admin/product/create"
            element={
              <ProtectedRoute element={<CreateProduct />} adminOnly={true} />
            }
          ></Route>
          <Route
            path="/admin/product/:updateId"
            element={
              <ProtectedRoute element={<UpdateProduct />} adminOnly={true} />
            }
          ></Route>
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute element={<UsersList />} adminOnly={true} />
            }
          ></Route>
          <Route
            path="/admin/user/:userId"
            element={
              <ProtectedRoute element={<UpdateRole />} adminOnly={true} />
            }
          ></Route>
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute element={<OrdersList />} adminOnly={true} />
            }
          ></Route>
          <Route
            path="/admin/order/:orderId"
            element={
              <ProtectedRoute element={<UpdateOrder />} adminOnly={true} />
            }
          ></Route>
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute element={<ReviewsList />} adminOnly={true} />
            }
          ></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
