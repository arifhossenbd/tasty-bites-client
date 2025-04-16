import { useContext } from "react";
import { CartContext } from "../contexts/CartContext/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
