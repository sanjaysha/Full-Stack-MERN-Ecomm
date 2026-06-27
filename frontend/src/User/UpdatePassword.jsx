import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeErrors, updatePassword } from "../features/user/userSlice";

function UpdatePassword() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { currentPassword, newPassword, confirmPassword } = passwordData;
  const { loading, success, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerDataChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const passwordFormData = {
      oldPassword: currentPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updatePassword(passwordFormData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Password updated successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/profile");
    }
  }, [dispatch, success]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col max-w-md mx-auto rounded-lg shadow-equal gap-6 p-6 my-10">
          <PageTitle title={"Password Update"} />

          <form className="flex flex-col gap-4" onSubmit={updatePasswordSubmit}>
            <h2 className="font-bold text-center pb-2">Update Password</h2>
            <div className="input-group">
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                placeholder="Current Password"
                onChange={registerDataChange}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                placeholder="New Password"
                onChange={registerDataChange}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={registerDataChange}
              />
            </div>
            <button className="btn-primary" type="submit">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}

export default UpdatePassword;
