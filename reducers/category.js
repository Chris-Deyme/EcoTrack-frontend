import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { nameCategory: null },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategoryToStore: (state, action) => {
      state.value.nameCategory = action.payload;
  },
  },
});

export const { addCategoryToStore } = categorySlice.actions;
export default categorySlice.reducer;
