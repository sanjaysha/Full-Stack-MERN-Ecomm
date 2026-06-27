import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";

function Profile() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col max-w-md mx-auto rounded-lg shadow-equal gap-6 p-6 my-10">
          <PageTitle title={`Profile - ${user.name}`} />
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="font-bold">My Profile</h1>
            <img
              className="shadow-equal w-32 h-32 object-cover rounded-full"
              src={user.avatar.url ? user.avatar.url : "/images/profile.png"}
              alt="Profile Picture"
            />
            <Link className="btn-primary" to="/profile/update">
              Edit Profile
            </Link>
          </div>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex rounded-lg shadow-md p-3 gap-1">
              {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
              <div className="basis-1/3">
                <h2 className="font-bold">Name:</h2>
              </div>
              <div className="basis-2/3">
                <p>{user.name}</p>
              </div>
            </div>
            <div className="flex rounded-lg shadow-md p-3 gap-1">
              <div className="basis-1/3">
                <h2 className="font-bold">Email:</h2>
              </div>
              <div className="basis-2/3">
                <p>{user.email}</p>
              </div>
            </div>
            <div className="flex rounded-lg shadow-md p-3 gap-1">
              <div className="basis-1/3">
                <h2 className="font-bold">Joined On:</h2>
              </div>
              <div className="basis-2/3">
                <p>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Link className="btn-primary" to="/orders/user">
              My Orders
            </Link>
            <Link className="btn-primary" to="/password/update">
              Change Password
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Profile;
