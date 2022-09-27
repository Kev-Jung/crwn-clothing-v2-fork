import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

export const CartContext = createContext({
  cartClicked: false,
  setCartClicked: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  totalAmount: 0,
});

export const CartProvider = ({ children }) => {
  const [cartClicked, setCartClicked] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, item) => {
        return total + item.quantity;
      }, 0)
    );

    setTotalAmount(
      cartItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0)
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
  };

  const value = {
    cartClicked,
    setCartClicked,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartItems,
    cartCount,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
