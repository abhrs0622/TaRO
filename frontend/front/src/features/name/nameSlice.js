import { createSlice } from "@reduxjs/toolkit";

export const nameSlice = createSlice({
  name: "name",
  initialState: {
    value: "taro",
  },
  reducers: {
    setName: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setName } = nameSlice.actions;

export default nameSlice.reducer;
