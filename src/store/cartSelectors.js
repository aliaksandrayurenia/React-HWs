import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state) => state.cart.items;

export const selectTotalQty = createSelector([selectCartItems], (items) =>
  items.reduce((sum, x) => sum + (x.qty || 0), 0)
);

export const selectTotalAmount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, x) => sum + (x.qty || 0) * Number(x.price || 0), 0)
);
