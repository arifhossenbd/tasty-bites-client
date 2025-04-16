import {
  useEffect,
  useState,
  useCallback,
} from "react";
import { showErrorToast, showSuccessToast } from "../../utils/CrudToast";
import { CartContext } from "./CartContext";

const getCartFromLocal = () => {
  const cart = localStorage.getItem("carts");
  return cart ? JSON.parse(cart) : [];
};

const saveCartToLocal = (cart) => {
  localStorage.setItem("carts", JSON.stringify(cart));
};

// 🛒 Context Provider
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // 🧠 Load cart once
  useEffect(() => {
    const initialCart = getCartFromLocal();
    setCartItems(initialCart);
  }, []);

  // 🧮 Recalculate totals when cartItems change
  useEffect(() => {
    const quantity = cartItems.reduce(
      (sum, item) => sum + (item?.quantity || 1),
      0
    );
    const price = cartItems.reduce(
      (sum, item) => sum + item?.price * (item?.quantity || 1),
      0
    );
    setTotalQuantity(quantity);
    setTotalPrice(price);
  }, [cartItems]);

  const syncCart = useCallback((updatedCart) => {
    const safeCart = [...updatedCart];
    saveCartToLocal(safeCart);
    setCartItems(safeCart);
  }, []);

  const isInCart = useCallback(
    (id) => {
      return cartItems.some((item) => item?.foodId === id);
    },
    [cartItems]
  );

  const addToCart = useCallback(
    (item, quantity = 1) => {
      if (isInCart(item?.foodId)) {
        showErrorToast("Already in cart", "This item is already added.");
        return;
      }
      const newItem = { ...item, quantity };
      const newCart = [...cartItems, newItem];
      syncCart(newCart);
      showSuccessToast("Added to Cart", item, "", "");
    },
    [cartItems, isInCart, syncCart]
  );

  const updateQuantity = useCallback(
    (foodId, quantity) => {
      const updatedCart = cartItems.map((item) =>
        item?.foodId === foodId ? { ...item, quantity } : item
      );
      syncCart(updatedCart);
    },
    [cartItems, syncCart]
  );

  const removeFromCart = useCallback(
    (data) => {
      const updatedCart = cartItems.filter(
        (item) => item?.foodId !== data.foodId
      );
      syncCart(updatedCart);
      showSuccessToast("Removed from Cart", data, "", "");
    },
    [cartItems, syncCart]
  );

  const clearCart = useCallback(() => {
    syncCart([]);
  }, [syncCart]);

  const setCart = useCallback(
    (newCart) => {
      syncCart(newCart);
    },
    [syncCart]
  );

  const getCartSummary = useCallback(() => {
    return { totalQuantity, totalPrice };
  }, [totalQuantity, totalPrice]);

  const values = {
    cartItems,
    totalQuantity,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setCart,
    isInCart,
    getCartSummary,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;