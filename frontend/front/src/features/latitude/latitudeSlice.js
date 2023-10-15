import { createSlice } from "@reduxjs/toolkit";

export const latitudeSlice = createSlice({
  name: "latitude",
  initialState: {
    value: 35.6852,
  },
  reducers: {
    setLatitude: (state, lat) => {
      state.value = lat;
    },
  },
});

export const { setLatitude } = latitudeSlice.actions;

export default latitudeSlice.reducer;
