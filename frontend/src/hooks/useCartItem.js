import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeErrors,
  removeItemsFromCart,
  removeMessage,
} from "../features/cart/cartSlice";

export default function useCartItem(item) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(item.quantity);

  const { success, error, message, loading } = useSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const increaseQuantity = () => {
    if (quantity >= item.stock) {
      toast.info(`You can only add up to ${item.stock} items`, {
        position: "top-center",
        autoClose: 3000,
      });

      dispatch(removeErrors());
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.info("Quantity cannot be less than 1", {
        position: "top-center",
        autoClose: 3000,
      });

      dispatch(removeErrors());
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  const handleUpdateCart = () => {
    if (quantity === item.quantity) {
      toast.info("Quantity is already up to date", {
        position: "top-center",
        autoClose: 3000,
      });

      return;
    }

    dispatch(
      addItemsToCart({
        productId: item.product,
        quantity,
      }),
    );
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItemsFromCart(item.product));
    toast.success("Item removed from cart successfully", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  useEffect(() => {
    if (!error) return;

    toast.error(error.message, {
      position: "top-center",
      autoClose: 3000,
      toastId: "cart-update-error",
    });

    dispatch(removeErrors());
  }, [error, dispatch]);

  useEffect(() => {
    if (!(success && message)) return;

    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      toastId: "cart-update-success",
    });

    dispatch(removeMessage());
  }, [success, message, dispatch]);

  return {
    quantity,
    loading,
    increaseQuantity,
    decreaseQuantity,
    handleUpdateCart,
    handleRemoveFromCart,
  };
}
