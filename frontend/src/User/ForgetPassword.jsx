import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  removeErrors,
  removeSuccess,
  requestPasswordReset,
} from "../features/user/userSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { loading, success, error, message } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();

  const handleSendResetLink = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the email to the backend to trigger the password reset process.
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(requestPasswordReset(myForm));
    setEmail("");
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
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col max-w-md mx-auto rounded-lg shadow-equal gap-6 p-6 my-10">
          <PageTitle title="Forget Password" />
          <form className="flex flex-col gap-4" onSubmit={handleSendResetLink}>
            <h2 className="font-bold text-center pb-2">Forget Password</h2>
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn-primary" type="submit">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}

export default ForgetPassword;
