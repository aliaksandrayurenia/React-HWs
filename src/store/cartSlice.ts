import { createSlice } from "@reduxjs/toolkit";

export type CartItem = {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  qty: number;
};


type Product = {
  id: CartItem["id"];
  title: string;
  price: number;
  image?: string;
};

type AddToCartPayload = {
  product: Product;
  qty?: number;
};

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

type SetQtyPayload = {
  id: CartItem["id"];
  qty: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: { payload: AddToCartPayload }) {
      const { product, qty = 1 } = action.payload;
      const addQty = Math.max(1, Number(qty) || 1);

      const existing = state.items.find((x) => x.id === product.id);
      if (existing) existing.qty += addQty;
      else state.items.push({ ...product, qty: addQty });
    },

    removeFromCart(state, action: { payload: CartItem["id"] }) {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },

    setQty(state, action: { payload: SetQtyPayload }) {
      const { id, qty } = action.payload;
      const n = Math.max(1, Number(qty) || 1);

      const existing = state.items.find((x) => x.id === id);
      if (existing) existing.qty = n;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setQty } = cartSlice.actions;
export default cartSlice.reducer;
