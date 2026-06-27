import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  removeErrors,
  removeSuccess,
  resetPassword,
} from "../features/user/userSlice";

function ResetPassword() {
  const { loading, error, success } = useSelector((state) => state.user);

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = passwordData;
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDataChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const passwordFormData = {
      password,
      confirmPassword,
    };
    dispatch(resetPassword({ token, passwordData: passwordFormData }));
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
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, success]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col max-w-md mx-auto rounded-lg shadow-equal gap-6 p-6 my-10">
          <PageTitle title={"Reset Password"} />

          <form className="flex flex-col gap-4" onSubmit={resetPasswordSubmit}>
            <h2 className="font-bold text-center pb-2">Reset Password</h2>
            <div className="input-group">
              <input
                type="password"
                name="password"
                value={password}
                placeholder="New Password"
                onChange={handleDataChange}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={handleDataChange}
              />
            </div>
            <button className="btn-primary" type="submit">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}

export default ResetPassword;
