import { createSlice } from "@reduxjs/toolkit";

export const selectedPlanSlice = createSlice({
  name: "selectedPlan",
  initialState: {
    value: [],
  },
  reducers: {
    setSelectedPlan: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedPlan } = selectedPlanSlice.actions;

export default selectedPlanSlice.reducer;
