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
        className="flex absolute top-3 max-w-32 right-8 gap-4 items-center"
        onClick={toggleMenu}
      >
        <img
          src={user.avatar.url ? user.avatar.url : "./images/profile.png"}
          alt="Profile picture"
          className="rounded-full w-10 h-10 object-cover cursor-pointer"
        />
        <span className="text-lg text-white">
          {user.name.length > 8 ? user.name.slice(0, 6) + "..." : user.name}
        </span>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col absolute top-18 right-8 gap-2 ">
          {options.map((option) => (
            <button
              className={` ${option.isCart ? (cartItems.length > 0 ? "btn-secondary" : "btn-primary") : "btn-primary"}`}
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
      )}
    </>
  );
}

export default UserDashboard;
