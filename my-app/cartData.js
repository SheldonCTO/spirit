import { atom } from "jotai";

// Initialize the cart from local storage if available
const savedCart = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) || [] : [];

export const cartListAtom = atom(savedCart);

// Automatically persist the cart to localStorage when it changes
cartListAtom.onMount = (setAtom) => {
  const handleStorageChange = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setAtom(cart);
  };

  // Listen for local storage changes and update the cart
  window.addEventListener("storage", handleStorageChange);

  // Set the initial cart state from localStorage
  setAtom(savedCart);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
};

// Update the cart to localStorage when the cartListAtom changes
cartListAtom.onSet = (newCart) => {
  localStorage.setItem("cart", JSON.stringify(newCart));
};