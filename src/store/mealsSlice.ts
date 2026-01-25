import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMeals } from "../api/meals";

export type Meal = {
  id: string;
  meal: string;
  category: string;
  area: string;
  instructions: string;
  img: string;
  price: number;
};


type MealsState = {
    items: Meal[];
    status: "idle" | "loading" | "success" | "error";
    error: string;
    };

    export const loadMeals = createAsyncThunk<Meal[]>(
    "meals/load",
    async () => {
        const data = await fetchMeals();
        return Array.isArray(data) ? data : [];
    }
    );

    const initialState: MealsState = {
    items: [],
    status: "idle",
    error: "",
    };

    const mealsSlice = createSlice({
    name: "meals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadMeals.pending, (state) => {
            state.status = "loading";
            state.error = "";
        })
        .addCase(loadMeals.fulfilled, (state, action) => {
            state.status = "success";
            state.items = action.payload;
        })
        .addCase(loadMeals.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Failed to load meals";
        });
    },
});

export default mealsSlice.reducer;
