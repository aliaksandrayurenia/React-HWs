import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { CartItem } from "./cartSlice";

export const selectCartItems = (state: RootState): CartItem[] =>
  state.cart.items;

export const selectTotalQty = createSelector(
  [selectCartItems],
  (items: CartItem[]) => items.reduce((sum, x) => sum + x.qty, 0)
);

export const selectTotalAmount = createSelector(
  [selectCartItems],
  (items: CartItem[]) =>
    items.reduce((sum, x) => sum + x.qty * x.price, 0)
);
