import { createSlice } from "@reduxjs/toolkit";

export const plansSlice = createSlice({
  name: "plans",
  initialState: {
    value: [],
  },
  reducers: {
    setPlans: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPlans } = plansSlice.actions;

export default plansSlice.reducer;
