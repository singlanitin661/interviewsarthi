import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: {
    count: 0,
  },
  reducers: {
    changeCountValue(state) {
      state.count = state.count+1; 
    },
  },
});

export const { changeCountValue } = countSlice.actions;
export default countSlice.reducer;
