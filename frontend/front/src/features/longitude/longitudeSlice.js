import { createSlice } from "@reduxjs/toolkit";

export const longitudeSlice = createSlice({
  name: "longitude",
  initialState: {
    value: 139.7528,
  },
  reducers: {
    setLongitude: (state, lat) => {
      state.value = lat;
    },
  },
});

export const { setLongitude } = longitudeSlice.actions;

export default longitudeSlice.reducer;
