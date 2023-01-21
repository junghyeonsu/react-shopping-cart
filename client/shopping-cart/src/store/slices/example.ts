import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
  name: "example",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => ({ ...state, value: state.value + 1 }),
  },
});

export const { increment } = exampleSlice.actions;
export const exampleReducer = exampleSlice.reducer;
export default exampleSlice;
