import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts,
  removeError,
  removeSuccess,
} from "../features/admin/adminSlice";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function ProductsList() {
  const dispatch = useDispatch();
  const { products, loading, success, error, deleting } = useSelector(
    (state) => state.admin,
  );

  const handleDelete = (productId) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (isConfirm) {
      dispatch(deleteProduct(productId)).then((action) => {
        if (action.payload?.data?.success) {
          toast.success(
            action.payload?.data?.message || "Deleted Successfully",
            {
              position: "top-center",
              autoClose: 3000,
            },
          );
          dispatch(removeSuccess());
        }
      });
    }
  };

  useEffect(() => {
    dispatch(fetchAdminProducts());
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
            <PageTitle title="Products" />
            <div className="flex-1 flex p-4">
              <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md gap-6 p-6">
                <h1 className="text-xl font-bold pb-2">All Products</h1>
                {products.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="rounded-tl-md rounded-bl-md p-2">
                          Sl No
                        </th>
                        <th className="p-2">Product Image</th>
                        <th className="p-2">Product Name</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Rating</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Created At</th>
                        <th className="rounded-tr-md rounded-br-md p-2">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((product, index) => (
                        <tr
                          key={product._id}
                          className="border-b border-gray-200"
                        >
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">
                            <img
                              src={product.image[0].url}
                              alt={product.name}
                              className="w-24 h-24 object-cover rounded-md"
                            ></img>
                          </td>
                          <td className="p-2">{product.name}</td>
                          <td className="p-2">{product.category}</td>
                          <td className="p-2">₹{product.price.toFixed(2)}</td>
                          <td className="p-2">{product.ratings}</td>
                          <td className="p-2">{product.stock}</td>
                          <td className="p-2">
                            {new Date(product.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Link
                                to={`/admin/product/${product._id}`}
                                className="btn-secondary"
                              >
                                <SquarePen color="#24b508" />
                              </Link>
                              <button
                                className="btn-secondary cursor-pointer"
                                disabled={deleting[product._id]}
                                onClick={() => handleDelete(product._id)}
                              >
                                {deleting[product._id] ? (
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
                    <p>
                      No Product Found.{" "}
                      <Link
                        className="hover:underline text-blue-800 font-bold"
                        to={"/admin/product/create"}
                      >
                        Add a Product.
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default ProductsList;
