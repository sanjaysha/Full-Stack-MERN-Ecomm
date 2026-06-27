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
    dispatch(errorAllOrders);
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
        <div className="flex justify-center items-center mx-auto w-1/2 gap-8 p-6">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="w-96 h-96">
              <img
                src={selectedImage || product.image[0].url}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            {product.image.length > 1 && (
              <div className="flex gap-2">
                {product.image.map((img, index) => (
                  <div
                    className="w-24 h-24 flex-shrink-0"
                    key={index}
                    onMouseEnter={() => setSelectedImage(img.url)}
                    onMouseLeave={() => setSelectedImage(product.image[0].url)}
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
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">
              {" "}
              <strong>₹{product.price.toFixed(2)}</strong>
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
              <div className="flex items-center mt-2">
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
        <div className="border-t-1 border-gray-300 mx-12">
          <h3 className="text-xl font-bold mt-2">Customer Reviews</h3>
          <div className="review-section">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  className="flex flex-col gap-1 border-b-1 border-gray-300 py-3 last:mb-2"
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
