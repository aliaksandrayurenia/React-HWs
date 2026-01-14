import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], 
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
        const { product, qty = 1 } = action.payload;
        const addQty = Number(qty) || 1;

        const existing = state.items.find((x) => x.id === product.id);
        if (existing) {
            existing.qty += addQty;
        } else {
            state.items.push({ ...product, qty: addQty });
        }
    },

    removeFromCart(state, action) {
        const id = action.payload;
        state.items = state.items.filter((x) => x.id !== id);
    },

    clearCart(state) {
        state.items = [];
    },

    setQty(state, action) {
        const { id, qty } = action.payload;
        const n = Math.max(1, Number(qty) || 1);
        const existing = state.items.find((x) => x.id === id);
        if (existing) existing.qty = n;
        },
    },
});

export const { addToCart, removeFromCart, clearCart, setQty } =
    cartSlice.actions;

export default cartSlice.reducer;
