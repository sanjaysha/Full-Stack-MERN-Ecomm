import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  removeErrors,
  removeSuccess,
  updateUserProfile,
} from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function UpdateProfile() {
  const [userNewData, setUserNewData] = useState({
    name: "",
    email: "",
  });
  const { name, email } = userNewData;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/profile.png");

  const { loading, success, message, error, user } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserNewData({
        name: user.name,
        email: user.email,
      });
      setAvatarPreview(user.avatar?.url || "./images/profile.png");
    }
  }, [user]);

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
      setUserNewData({ ...userNewData, [e.target.name]: e.target.value });
    }
  };

  const submitUpdateProfileForm = (e) => {
    e.preventDefault();
    if (!userNewData.name || !userNewData.email) {
      toast.error("Please fill all the required fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    // console.log("Updated form data", myForm.entries());
    // for (let pair of myForm.entries()) {
    //   console.log(pair);
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    dispatch(updateUserProfile(myForm));
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
          <form
            className="flex flex-col gap-4 "
            onSubmit={submitUpdateProfileForm}
            encType="multipart/form-data"
          >
            <h2 className="font-bold text-center pb-2">Update Profile</h2>
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
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={name}
                className="bg-white"
                onChange={registerDataChange}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={email}
                className="bg-white"
                onChange={registerDataChange}
              />
            </div>

            <button type="submit" className="btn-primary">
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}

export default UpdateProfile;
