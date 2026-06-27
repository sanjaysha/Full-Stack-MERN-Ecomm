import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  register,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/profile.png");
  const { name, email, password } = user;
  const { loading, error, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      toast.success("Registration Successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, success]);

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.onerror = (error) => {
        toast.error("Error reading file. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitRegisterForm = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all the required fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    // console.log(myForm.entries());
    // for (let pair of myForm.entries()) {
    //   console.log(pair);
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    dispatch(register(myForm));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center rounded-lg shadow-lg bg-gray-100 p-6 w-full max-w-md">
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={submitRegisterForm}
          encType="multipart/form-data"
        >
          <h2 className="font-bold text-center pb-2">Sign Up</h2>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={name}
              className="bg-white"
              onChange={registerDataChange}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              className="bg-white"
              onChange={registerDataChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              className="bg-white"
              onChange={registerDataChange}
            />
          </div>
          <div className="input-group">
            <input
              type="file"
              name="avatar"
              accept="images/"
              className="bg-white"
              onChange={registerDataChange}
            />
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="rounded-full"
            />
          </div>
          <button type="submit" className="btn-primary">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
