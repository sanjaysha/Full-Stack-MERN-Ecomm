import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logout,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";
import { toast } from "react-toastify";

function UserDashboard({ user }) {
  const { cartItems } = useSelector((state) => state.cart);
  const options = [
    {
      name: "Orders",
      funcName: orders,
    },
    {
      name: "Account",
      funcName: profile,
    },
    {
      name: `Cart (${cartItems.length})`,
      isCart: true,
      funcName: myCart,
    },
    {
      name: "Logout",
      funcName: logoutUser,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function orders() {
    navigate("/orders/user");
  }
  function profile() {
    navigate("/profile");
  }
  function myCart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logout Successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        dispatch(removeErrors());
        dispatch(removeSuccess());
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message || "Logout Failed! Try again Later.", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (user.role === "admin") {
    options.unshift({
      name: "Dashboard",
      funcName: dashboard,
    });
  }

  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50" onClick={toggleMenu}></div>
      )}
      <div
        className="relative flex items-center md:gap-3 cursor-pointer select-none"
        onClick={toggleMenu}
      >
        <img
          src={user.avatar.url ? user.avatar.url : "./images/profile.png"}
          alt="Profile picture"
          className="w-10 h-10 rounded-full object-cover border-2 border-white/80"
        />
        <span className="hidden md:block max-w-28 truncate text-base font-medium text-white">
          {user.name}
        </span>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl z-50">
          <div className="divide-y divide-gray-200">
            {options.map((option) => (
              <button
                className={` w-full px-4 py-3 text-left text-gray-700 transition hover:bg-gray-100 ${option.isCart && cartItems.length > 0 ? "font-semibold text-olive-600" : ""}`}
                key={option.name}
                onClick={() => {
                  setIsMenuOpen(false);
                  option.funcName();
                }}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserDashboard;
