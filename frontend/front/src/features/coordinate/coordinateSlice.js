import { createSlice } from "@reduxjs/toolkit";

export const coordinateSlice = createSlice({
  name: "coordinate",
  initialState: {
    value: [],
  },
  reducers: {
    setCoordinate: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setCoordinate } = coordinateSlice.actions;

export default coordinateSlice.reducer;
