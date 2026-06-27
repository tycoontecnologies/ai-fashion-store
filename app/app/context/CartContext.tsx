"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity?: number;
  size?: string;
};

type CartContextType = {
  cart: Product[];

  wishlist: Product[];

  addToCart: (
    product: Product
  ) => void;

  removeFromCart: (
    id: number
  ) => void;

  clearCart: () => void;

  addToWishlist: (
    product: Product
  ) => void;

  removeFromWishlist: (
    id: number
  ) => void;
};

const CartContext =
  createContext<CartContextType>({
    cart: [],

    wishlist: [],

    addToCart: () => {},

    removeFromCart: () => {},

    clearCart: () => {},

    addToWishlist: () => {},

    removeFromWishlist: () => {},
  });

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [cart, setCart] =
    useState<Product[]>([]);

  const [wishlist, setWishlist] =
    useState<Product[]>([]);

  useEffect(() => {

    const savedCart =
      localStorage.getItem(
        "guess360-cart"
      );

    const savedWishlist =
      localStorage.getItem(
        "guess360-wishlist"
      );

    if (savedCart) {
      setCart(
        JSON.parse(savedCart)
      );
    }

    if (savedWishlist) {
      setWishlist(
        JSON.parse(
          savedWishlist
        )
      );
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "guess360-cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  useEffect(() => {

    localStorage.setItem(
      "guess360-wishlist",
      JSON.stringify(
        wishlist
      )
    );

  }, [wishlist]);

  function addToCart(
    product: Product
  ) {

    const existing =
      cart.find(
        (item) =>
          item.id === product.id
      );

    if (existing) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  (item.quantity || 1) +
                  1,
              }
            : item
        )
      );

      return;

    }

    setCart((prev) => [
      ...prev,
      {
        ...product,
        quantity: 1,
      },
    ]);

  }

  function removeFromCart(
    id: number
  ) {

    setCart((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );

  }

  function clearCart() {

    setCart([]);

  }

  function addToWishlist(
    product: Product
  ) {

    const exists =
      wishlist.find(
        (item) =>
          item.id === product.id
      );

    if (exists) return;

    setWishlist((prev) => [
      ...prev,
      product,
    ]);

  }

  function removeFromWishlist(
    id: number
  ) {

    setWishlist((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );

  }

  return (

    <CartContext.Provider
      value={{
        cart,

        wishlist,

        addToCart,

        removeFromCart,

        clearCart,

        addToWishlist,

        removeFromWishlist,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {

  return useContext(
    CartContext
  );

}