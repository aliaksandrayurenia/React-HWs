import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import mealsReducer from "./mealsSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        meals: mealsReducer,
    },
    
});
console.log("STORE CREATED", Date.now());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

