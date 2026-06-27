import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, removeErrors, removeSuccess } from "../features/user/userSlice";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { loading, error, success, isAuthenticated } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

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
    if (isAuthenticated) {
      navigate(redirect ? redirect : "/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (success) {
      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate(redirect ? redirect : "/");
    }
  }, [dispatch, success]);

  const submitLoginForm = (e) => {
    e.preventDefault();
    // Implement login logic here
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center rounded-lg shadow-lg bg-gray-100 p-6 w-full max-w-md">
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={submitLoginForm}
        >
          <h2 className="font-bold text-center pb-2">Login</h2>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              className="bg-white"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              className="bg-white"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p className="text-sm text-center text-gray-600">
            Forget password?{" "}
            <Link
              to="/password/forgot"
              className="text-blue-500 hover:underline"
            >
              Click here
            </Link>
          </p>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
