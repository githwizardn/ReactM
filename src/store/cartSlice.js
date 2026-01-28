// src/store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  deletedItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // This handles the initial load from API or LocalStorage
    setCart: (state, action) => {
      state.items = action.payload;
    },
    // Add this action to fix your build error
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If it exists, just increase quantity (limit to 10)
        if (existingItem.quantity < 10) {
          existingItem.quantity += 1;
        }
      } else {
        // If it's new, add it with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        const newQty = item.quantity + amount;
        if (newQty >= 1 && newQty <= 10) { // Quantity limits (1–10 per item)
          item.quantity = newQty;
        }
      }
    },
    moveToTrash: (state, action) => {
      const itemToTrash = state.items.find((i) => i.id === action.payload);
      if (itemToTrash) {
        state.deletedItems.push(itemToTrash); // Move to Recently Deleted
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    restoreFromTrash: (state, action) => {
      const itemToRestore = state.deletedItems.find((i) => i.id === action.payload);
      if (itemToRestore) {
        state.items.push(itemToRestore); // Restore to Cart
        state.deletedItems = state.deletedItems.filter((i) => i.id !== action.payload);
      }
    },
    emptyTrash: (state) => {
      state.deletedItems = []; // Deterministic state transitions
    },
  },
});

// MAKE SURE addToCart IS IN THIS LIST
export const { 
  setCart, 
  addToCart, 
  updateQuantity, 
  moveToTrash, 
  restoreFromTrash, 
  emptyTrash 
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectDeletedItems = (state) => state.cart.deletedItems;
export const selectTotalQuantity = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0); // Memoized Selectors
export const selectTotalPrice = (state) => 
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;