import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  getProductDetails,
  removeErrors,
  removeSuccess,
} from "../features/products/productSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Plus, Minus } from "lucide-react";
import { addItemsToCart, removeMessage } from "../features/cart/cartSlice";
import {
  getAllMyOrders,
  removeErrors as errorAllOrders,
} from "../features/order/orderSlice";

function productDetails() {
  const [userRating, setUserRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  const { product, loading, error, reviewSuccess, reviewLoading } = useSelector(
    (state) => state.product,
  );
  const {
    loading: ordersLoading,
    error: ordersError,
    orders,
  } = useSelector((state) => state.order);

  const {
    cartItems,
    loading: cartLoading,
    error: cartError,
    message,
    success,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { id } = useParams();

  const orderExists = orders.some((order) =>
    order.orderItems.some((item) => item.product === id),
  );

  useEffect(() => {
    dispatch(getAllMyOrders());
    if (ordersError) {
      toast.error(ordersError, { position: "top-center", autoClose: 3000 });
    }
    dispatch(errorAllOrders());
  }, [dispatch, ordersError]);

  const increaseQuantity = () => {
    if (quantity == product.stock) {
      toast.info(`You can only add up to ${product.stock} items`, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.info("Quantity cannot be less than 1", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
    if (cartError) {
      toast.error(cartError.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [error, cartError, dispatch]);

  useEffect(() => {
    if (success && message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeMessage());
    }
  }, [success, message, dispatch]);

  const addToCart = () => {
    dispatch(addItemsToCart({ productId: id, quantity }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userRating) {
      toast.info("Please select a rating", {
        position: "top-center",
        autoClose: 3000,
      });
    }
    dispatch(createReview({ rating: userRating, comment, productId: id }));
    return;
  };

  useEffect(() => {
    if (reviewSuccess) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      setUserRating(0);
      setComment("");
      dispatch(removeSuccess());
      dispatch(getProductDetails(id));
    }
  }, [dispatch, reviewSuccess, id]);

  if (loading || !product) {
    return (
      <>
        <Navbar />
        <PageTitle title="Product Details" />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageTitle title={product.name} />
      <Navbar />
      <div className="product-details-container">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 lg:flex-row lg:items-start lg:justify-center lg:px-8">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="w-full max-w-md aspect-square">
              <img
                src={selectedImage || product.image[0].url}
                alt={product.name}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            {product.image.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3">
                {product.image.map((img, index) => (
                  <div
                    // className="w-24 h-24 flex-shrink-0"
                    className=" w-20 h-20 sm:w-24 sm:h-24 cursor-pointer overflow-hidden rounded-lg border hover:border-olive-500"
                    key={index}
                    onMouseEnter={() => setSelectedImage(img.url)}
                    onClick={() => setSelectedImage(img.url)}
                  >
                    <img
                      src={img.url}
                      alt={`Thumbnail + index+1`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex w-full max-w-lg flex-col gap-4">
            <h2 className="text-2xl font-bold md:text-3xl">{product.name}</h2>
            <p className="text-gray-600 leading-7">{product.description}</p>
            <p className="text-3xl font-bold text-olive-600">
              ₹{product.price.toLocaleString()}
            </p>
            <div className="product-rating">
              <Rating value={product.ratings} disabled={true} />
              <span className="product-review-numbers">
                ({product.numOfReviews}{" "}
                {product.numOfReviews === 1 ? "review" : "reviews"})
              </span>
            </div>
            <div className="stock-status">
              <span
                className={product.stock ? "text-green-600" : "text-red-600"}
              >
                {product.stock
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
            </div>
            {product.stock ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="pr-6">Quantity:</span>
                <button className="btn-secondary" onClick={decreaseQuantity}>
                  <Minus />
                </button>
                <input
                  className="border p-2 w-16 mx-2 rounded-md text-center"
                  type="number"
                  value={quantity}
                  readOnly
                ></input>
                <button className="btn-secondary" onClick={increaseQuantity}>
                  <Plus />
                </button>
              </div>
            ) : null}
            <button
              className={`btn-primary ${product.stock ? "" : "opacity-50 cursor-not-allowed"}`}
              disabled={!product.stock}
              onClick={addToCart}
              disabled={cartLoading || !product.stock}
            >
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>
            {orderExists && (
              <form
                className="flex flex-col gap-2 py-3"
                onSubmit={handleReviewSubmit}
              >
                <h3 className="text-xl font-bold">Write a Review</h3>
                <Rating
                  value={0}
                  disabled={false}
                  onRatingChange={handleRatingChange}
                />
                <textarea
                  placeholder="Write your review here..."
                  className="border p-2 rounded-md w-full h-24 resize-none"
                  value={comment}
                  required
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button className="btn-primary" disabled={reviewLoading}>
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="border-t-1 border-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold mt-2">Customer Reviews</h3>
          <div className="review-section">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  className="flex flex-col gap-1 rounded-lg border p-4 shadow-sm border-gray-300 py-3 last:mb-2"
                  key={review._id}
                >
                  <div className="review-header">
                    <Rating value={review.rating} disabled={true} />
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <p className="reviewer-name">By: {review.name}</p>
                </div>
              ))
            ) : (
              <p className="py-3">
                No reviews yet.{" "}
                {orderExists && "Be the first to review this product!"}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default productDetails;
