import { createSelector } from "@reduxjs/toolkit";

export const selectMealsItems = (state) => state.meals.items;

export const selectMealTabs = createSelector([selectMealsItems], (all) => {
    const values = Array.from(
        new Set(
        all
            .map((x) => (x.category ?? "").toString().trim())
            .filter(Boolean)
        )
    );

    return values.map((value) => ({ value, label: value }));
});

export const makeSelectMealsByCategory = () =>
createSelector(
    [selectMealsItems, (_, category) => category],
    (all, category) => {

        if (!category) return [];
        const cat = category.toLowerCase();
        return all.filter(
        (x) => (x.category ?? "").toString().toLowerCase() === cat
    );
    }
);
