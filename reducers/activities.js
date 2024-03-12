import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    activities : []
  },
};

export const activityDoneSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    addActivitiesToStore: (state, action) => {
      state.value.activities.push(action.payload);
    },
    removeAllActivities: (state) => {
      state.value.activities = [];
    },
  },
});

export const { addActivitiesToStore, removeAllActivities } = activityDoneSlice.actions;
export default activityDoneSlice.reducer;
