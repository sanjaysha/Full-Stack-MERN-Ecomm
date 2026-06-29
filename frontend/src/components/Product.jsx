import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating) => {
    setRating(rating);
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
        {/* Image */}
        <div className="w-full h-56 overflow-hidden">
          <img
            src={product.image[0].url}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Details */}
        <div className="p-4 flex flex-col text-center gap-2">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>

          {/* Price */}
          <p className="text-gray-600 text-sm">
            <span className="font-medium text-gray-800">Price: </span>
            <span className="text-indigo-600 font-semibold">
              ₹{product.price.toLocaleString()}
            </span>
          </p>
          {/* Rating */}
          <div className="group flex justify-center">
            <Rating
              value={product.ratings}
              onRatingChange={handleRatingChange}
              disabled={true}
            />
          </div>
          <span>
            ({product.numOfReviews}{" "}
            {product.numOfReviews === 1 ? "review" : "reviews"})
          </span>

          {/* Button */}
          <button className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 active:scale-95 transition duration-200">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Product;
