import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, email: null, id: null, score: 0, carbone: 0 },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.id = action.payload.id;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.email = null;
      state.value.id = null;
      state.value.score = 0;
    },
    addScoreToStore: (state, action) => {
      state.value.score = action.payload.score;
      state.value.carbone = action.payload.carbone;
  },
  },
});

export const { login, logout, addScoreToStore } = userSlice.actions;
export default userSlice.reducer;
