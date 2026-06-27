import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import {
  getSingleUser,
  removeError,
  removeRoleUpdateError,
  removeRoleUpdateSuccess,
  updateRole,
} from "../features/admin/adminSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function UpdateRole() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { userId } = useParams();
  const navigate = useNavigate();

  const roles = ["Admin", "User"];

  const {
    error,
    user,
    loading,
    errorRoleUpdate,
    successRoleUpdate,
    loadingRoleUpdate,
    message,
  } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const updateUserSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("role", role);
    dispatch(updateRole({ id: userId, role: myForm }));
    navigate("/admin/users");
  };

  useEffect(() => {
    if (errorRoleUpdate) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeRoleUpdateError());
    }
  }, [errorRoleUpdate, dispatch]);

  useEffect(() => {
    if (successRoleUpdate) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeRoleUpdateSuccess());
    }
  }, [successRoleUpdate, dispatch, message]);

  useEffect(() => {
    dispatch(getSingleUser(userId));
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [userId, error, dispatch]);

  useEffect(() => {
    if (!loading && user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageTitle title="Update Role" />
      <div className="flex-1 flex p-4">
        <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md gap-6 p-6">
          <form
            className="flex flex-col gap-2 py-3"
            onSubmit={updateUserSubmit}
          >
            <h3 className="text-xl font-bold">Update Role</h3>
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={name ?? ""}
                readOnly
              ></input>
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={email ?? ""}
                readOnly
              ></input>
            </div>
            <div className="input-group">
              <select
                id="role"
                className="border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                name="role"
                required
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="">Select User Role</option>
                {roles.map((role) => (
                  <option value={role.toLowerCase()} key={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn-primary">
              {loadingRoleUpdate ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateRole;
