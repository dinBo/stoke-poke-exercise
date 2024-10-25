import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null)

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addToOrders = (
    orderId,
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
      orderId,
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

  const deleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
  };

  const value = {
    orders,
    addToOrders,
    deleteOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}