import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { nameCategory: null, nameAction: null, keyword: null },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategoryToStore: (state, action) => {
      state.value.nameCategory = action.payload.nameCategory;
      state.value.keyword = action.payload.keyword
  },
  },
});

export const { addCategoryToStore } = categorySlice.actions;
export default categorySlice.reducer;
