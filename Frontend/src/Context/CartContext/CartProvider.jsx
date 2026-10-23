import React, { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../../reducer/useReducer";
export const CartContext = createContext();

const getInitialCart = () => {
  try {
    const saveCart = localStorage.getItem("cart");
    return saveCart ? JSON.parse(saveCart) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, [], getInitialCart);
  console.log("CartProvider", state);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// export const useCart = useContext(CartContext);
