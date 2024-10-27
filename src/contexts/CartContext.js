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

  const updateOrderAmount = (orderId, updatedAmount) => {
    setOrders((prevOrders) => prevOrders.map((order) => {
      if (order.orderId === orderId) {
        const orderCopy = {...order}
        orderCopy.amount = updatedAmount;
        return orderCopy;
      }
      return order;
    }));
  };

  const updateOrder = (updatedOrder) => {
    setOrders((prevOrders) => prevOrders.map((order) => {
      if (order.orderId === updatedOrder.orderId) {
        return {
          ...updatedOrder,
          amount: order.amount,
        };
      }
      return order;
    }));
  }

  const value = {
    orders,
    addToOrders,
    deleteOrder,
    updateOrderAmount,
    updateOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}