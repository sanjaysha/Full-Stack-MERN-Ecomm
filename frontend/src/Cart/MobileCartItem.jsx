import React from "react";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useCartItem from "../hooks/useCartItem";

function MobileCartItem({ item }) {
  const {
    quantity,
    loading,
    increaseQuantity,
    decreaseQuantity,
    handleUpdateCart,
    handleRemoveFromCart,
  } = useCartItem(item);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Product */}
      <div className="flex gap-4">
        <Link to={`/product/${item.product}`} className="shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="h-24 w-24 rounded-lg object-cover"
          />
        </Link>

        <div className="flex flex-1 flex-col">
          <Link
            to={`/product/${item.product}`}
            className="font-semibold text-lg hover:text-olive-600 transition"
          >
            {item.name}
          </Link>

          <p className="text-gray-600 mt-1">₹{item.price.toLocaleString()}</p>

          <p className="mt-1 text-sm text-gray-500">Available: {item.stock}</p>
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-5 flex items-center justify-between">
        <span className="font-medium">Quantity</span>

        <div className="flex items-center gap-2">
          <button
            className="btn-secondary"
            onClick={decreaseQuantity}
            disabled={loading}
          >
            <Minus size={18} />
          </button>

          <input
            className="w-14 rounded-md border p-2 text-center"
            type="number"
            readOnly
            value={quantity}
          />

          <button
            className="btn-secondary"
            onClick={increaseQuantity}
            disabled={loading}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
        <span className="font-medium">Total</span>

        <span className="font-bold text-olive-600">
          ₹{(item.price * quantity).toLocaleString()}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex gap-3">
        <button
          className="btn-primary flex-1"
          disabled={loading || quantity === item.quantity}
          onClick={handleUpdateCart}
        >
          {loading ? "Updating..." : "Update"}
        </button>

        <button
          className="btn-secondary flex-1"
          disabled={loading}
          onClick={handleRemoveFromCart}
        >
          {loading ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default MobileCartItem;
