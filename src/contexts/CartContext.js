import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null)

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addToOrders = (
    bowl,
    size,
    base,
    sauce,
    otherIngredients,
    extraIngredients,
    priceRegular,
    priceTotal,
  ) => {
    setOrders(prevOrders => [...prevOrders, {
      bowl,
      size,
      base,
      sauce,
      otherIngredients,
      extraIngredients,
      priceRegular,
      priceTotal,
    }]);
  }

  const value = {
    orders,
    addToOrders,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}