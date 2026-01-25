import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Meal } from "./mealsSlice";

export const selectMealsItems = (state: RootState): Meal[] => state.meals.items;

export const selectMealTabs = createSelector(
  [selectMealsItems],
  (all: Meal[]) => {
    const values = Array.from(
      new Set(
        all.map((x) => (x.category ?? "").toString().trim()).filter(Boolean)
      )
    );

    return values.map((value) => ({ value, label: value }));
  }
);

export const makeSelectMealsByCategory = () =>
  createSelector(
    [selectMealsItems, (_: RootState, category: string) => category],
    (all: Meal[], category: string) => {
      if (!category) return [];

      const cat = category.toLowerCase();

      return all.filter(
        (x) => (x.category ?? "").toString().toLowerCase() === cat
      );
    }
  );
