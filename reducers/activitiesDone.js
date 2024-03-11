import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { activitiesDone : null },
};

export const activityDoneSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addActivitiesToStore: (state, action) => {
      state.value.activitiesDone = action.payload;
  },
  },
});

export const { addActivitiesToStore } = activityDoneSlice.actions;
export default activityDoneSlice.reducer;
