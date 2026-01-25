import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import mealsReducer from "./mealsSlice";

export const store = configureStore({
reducer: {
    cart: cartReducer,
    meals: mealsReducer,
},
});

