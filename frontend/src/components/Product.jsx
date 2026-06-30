import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image[0].url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Price Badge */}
          <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow">
            ₹{product.price.toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex flex-col gap-3">
          {/* Product Name */}
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Rating value={product.ratings} disabled />

            <span className="text-xs sm:text-sm text-gray-500">
              ({product.numOfReviews}{" "}
              {product.numOfReviews === 1 ? "review" : "reviews"})
            </span>
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <span className="block w-full text-center rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors duration-200 group-hover:bg-indigo-700">
              View Details
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default Product;
