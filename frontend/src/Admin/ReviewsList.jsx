import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteReview,
  fetchAdminProducts,
  fetchProductReviews,
  removeError,
  removeSuccess,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function Reviews() {
  const dispatch = useDispatch();
  const { products, reviews, loading, error, success, message } = useSelector(
    (state) => state.admin,
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const [selectedProductName, setSelectedProductName] = useState("Product");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleViewReview = (productId, productName) => {
    setSelectedProductName(productName);
    setSelectedProductId(productId);
    dispatch(fetchProductReviews(productId));
  };

  const handleDeleteReview = (reviewId) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this review?",
    );
    if (isConfirm) {
      dispatch(deleteReview({ productId: selectedProductId, reviewId }));
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(clearMessage());
      dispatch(removeSuccess());
      dispatch(fetchAdminProducts());
      dispatch(fetchProductReviews(selectedProductId));
    }
  }, [dispatch, message]);
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <PageTitle title="Reviews" />
        <div className="flex flex-1 p-4">
          <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md gap-6 p-6">
            <h1 className="text-xl font-bold pb-2">All Products</h1>
            <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="rounded-tl-md rounded-bl-md p-2">Sl No</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Image</th>
                    <th className="p-2">Number of Reviews</th>
                    <th className="rounded-tr-md rounded-br-md p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr
                        className="border-b border-gray-200"
                        key={product._id}
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">
                          {" "}
                          <img
                            src={product.image[0]?.url}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-md"
                          />{" "}
                        </td>
                        <td className="p-2">{product.numOfReviews}</td>
                        <td className="p-2">
                          {product.numOfReviews ? (
                            <button
                              className="btn-primary"
                              onClick={() =>
                                handleViewReview(product._id, product.name)
                              }
                            >
                              View Reviews
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {reviews.length > 0 && (
              <div>
                <h1 className="text-xl font-bold pb-2">
                  Reviews for {`${selectedProductName}`}
                </h1>
                <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="rounded-tl-md rounded-bl-md p-2">
                          Sl No
                        </th>
                        <th className="p-2">Reviewer Name</th>
                        <th className="p-2">Rating</th>
                        <th className="p-2">Comment</th>
                        <th className="rounded-tr-md rounded-br-md p-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews &&
                        reviews.map((review, index) => (
                          <tr
                            className="border-b border-gray-200"
                            key={review._id}
                          >
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{review.name}</td>
                            <td className="p-2">{review.rating}</td>
                            <td className="p-2">{review.comment}</td>
                            <td className="p-2">
                              <button
                                className="btn-primary"
                                onClick={() => handleDeleteReview(review._id)}
                              >
                                <Trash2 />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Reviews;
