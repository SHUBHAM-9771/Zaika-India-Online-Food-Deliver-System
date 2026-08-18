import React, { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [item, setItem] = useState(() => {
    const SaveCart = localStorage.getItem("cart");
    return SaveCart ? JSON.parse(SaveCart) : [];
  });
  console.log("item", item);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(item));
  }, [item]);

  return (
    <CartContext.Provider value={{ item, setItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
