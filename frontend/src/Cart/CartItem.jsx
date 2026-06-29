import React from "react";
import { Minus, Plus } from "lucide-react";
import useCartItem from "../hooks/useCartItem";

function CartItem({ item }) {
  const {
    quantity,
    loading,
    increaseQuantity,
    decreaseQuantity,
    handleUpdateCart,
    handleRemoveFromCart,
  } = useCartItem(item);

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="p-2">
          <div className="flex items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex flex-col">
              <span className="">{item.name}</span>
              <span className="">Price:₹{item.price.toFixed(2)}</span>
              <span className="">Quantity:{item.quantity}</span>
            </div>
          </div>
        </td>
        <td className="p-2 gap-2">
          <div className="flex">
            <button
              className="btn-secondary"
              onClick={decreaseQuantity}
              disabled={loading}
            >
              <Minus />
            </button>
            <input
              className="border p-2 w-16 mx-2 rounded-md text-center"
              type="number"
              name="quantity"
              readOnly
              value={quantity}
            />

            <button
              className="btn-secondary"
              onClick={increaseQuantity}
              disabled={loading}
            >
              <Plus />
            </button>
          </div>
        </td>
        <td className="p-2">₹{(item.price * quantity).toFixed(2)}</td>
        <td className="p-2 flex flex-col gap-2">
          <button
            className="btn-primary"
            disabled={loading || quantity === item.quantity}
            onClick={handleUpdateCart}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            className="btn-secondary"
            disabled={loading}
            onClick={handleRemoveFromCart}
          >
            {loading ? "Removing..." : "Remove"}
          </button>
        </td>
      </tr>
    </>
  );
}

export default CartItem;
