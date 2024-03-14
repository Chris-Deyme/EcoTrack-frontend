import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    username: null,
    email: null,
    id: null,
    score: 0,
    carbone: 0,
    image: null,
    structuresAdded: 0,
  },
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
      state.value.carbone = 0;
      state.value.structuresAdded = 0;
      state.value.image = null;
    },
    addScoreToStore: (state, action) => {
      state.value.score = action.payload.score;
      state.value.carbone = action.payload.carbone;
    },
    addImgToStore: (state, action) => {
      state.value.image = action.payload.image;
    },
    addStructureToStore: (state, action) => {
      state.value.structuresAdded += action.payload.structuresAdded;
    },
  },
});

export const {
  login,
  logout,
  addScoreToStore,
  addImgToStore,
  addStructureToStore,
} = userSlice.actions;
export default userSlice.reducer;
