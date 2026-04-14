import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (foodItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === foodItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === foodItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...foodItem, quantity: 1 }];
    });
  };

  const removeFromCart = (foodItemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== foodItemId));
  };

  const updateQuantity = (foodItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === foodItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getCartCount = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
