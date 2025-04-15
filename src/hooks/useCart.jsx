import { useContext } from "react";
import { CartContext } from "../contexts/CartContext/CartContext"; // ✅ Make sure path is correct

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
