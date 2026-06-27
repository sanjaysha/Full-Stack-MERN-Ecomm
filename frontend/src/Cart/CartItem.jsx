import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeErrors,
  removeMessage,
  removeItemsFromCart,
} from "../features/cart/cartSlice";

function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { success, error, cartItems, message, loading } = useSelector(
    (state) => state.cart,
  );

  const dispatch = useDispatch();

  const increaseQuantity = () => {
    if (quantity == item.stock) {
      toast.info(`You can only add up to ${item.stock} items`, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    } else {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.info("Quantity cannot be less than 1", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleUpdateCart = () => {
    if (quantity === item.quantity) {
      toast.info("Quantity is already up to date", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    } else {
      dispatch(addItemsToCart({ productId: item.product, quantity }));
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItemsFromCart(item.product));
    toast.success("Item removed from cart successfully", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        toastId: "cart-update-error",
      });
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success && message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        toastId: "cart-update-success",
      });
      dispatch(removeMessage());
    }
  }, [success, message, dispatch]);
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
