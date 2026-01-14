import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMeals } from "../api/meals";

export const loadMeals = createAsyncThunk("meals/load", async () => {
  const data = await fetchMeals();
  return Array.isArray(data) ? data : [];
});

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    items: [],
    status: "idle", 
    error: "",
},
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
            state.error = action.error?.message || "Failed to load meals"; });
},
});

export default mealsSlice.reducer;
