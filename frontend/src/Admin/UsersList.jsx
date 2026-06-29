import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUsers,
  removeError,
  removeSuccess,
  clearMessage,
} from "../features/admin/adminSlice";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function UsersList() {
  const dispatch = useDispatch();
  const { users, loading, success, error, message, deleting } = useSelector(
    (state) => state.admin,
  );

  const handleDelete = (userId) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (isConfirm) {
      dispatch(deleteUser(userId)).then((action) => {
        if (action.payload?.data?.success) {
          toast.success(
            action.payload?.data?.message || "Deleted Successfully",
            {
              position: "top-center",
              autoClose: 3000,
            },
          );
          dispatch(removeSuccess());
          dispatch(clearMessage());
        }
      });
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        autoClose: 3000,
        position: "top-center",
      });
      dispatch(removeError());
    }
    if (success) {
      dispatch(removeSuccess());
    }
  }, [dispatch, error, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <PageTitle title="Users" />
            <div className="flex-1 flex p-4">
              <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md gap-6 p-6">
                <h1 className="text-xl font-bold pb-2">All Users</h1>
                <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                  {users.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="rounded-tl-md rounded-bl-md p-2">
                            Sl No
                          </th>
                          <th className="p-2">Avatar</th>
                          <th className="p-2">Name</th>
                          <th className="p-2">Email</th>
                          <th className="p-2">Role</th>
                          <th className="p-2">Created At</th>
                          <th className="rounded-tr-md rounded-br-md p-2">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.map((user, index) => (
                          <tr
                            key={user._id}
                            className="border-b border-gray-200"
                          >
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">
                              <img
                                src={user.avatar.url}
                                alt={user.name}
                                className="w-24 h-24 object-cover rounded-md"
                              ></img>
                            </td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>

                            <td className="p-2">
                              <div className="flex gap-2">
                                <Link
                                  to={`/admin/user/${user._id}`}
                                  className="btn-secondary"
                                >
                                  <SquarePen color="#24b508" />
                                </Link>
                                <button
                                  className="btn-secondary cursor-pointer"
                                  disabled={deleting[user._id]}
                                  onClick={() => handleDelete(user._id)}
                                >
                                  {deleting[user._id] ? (
                                    <div className=" flex justify-center items-center h-8 w-10">
                                      <Loader />
                                    </div>
                                  ) : (
                                    <Trash2 color="#ff3838" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex items-center justify-center">
                      <p>No User Found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default UsersList;
