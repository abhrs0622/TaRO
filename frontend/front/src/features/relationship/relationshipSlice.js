import { createSlice } from "@reduxjs/toolkit";

export const relationshipSlice = createSlice({
  name: "name",
  initialState: {
    value: "友達",
  },
  reducers: {
    setRelationship: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setRelationship } = relationshipSlice.actions;

export default relationshipSlice.reducer;
