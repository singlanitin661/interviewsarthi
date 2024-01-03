import { createSlice } from "@reduxjs/toolkit";

const startSlice = createSlice({
  name: "start",
  initialState: {
    value: false,
  },
  reducers: {
    changeStartValue(state, action) {
      state.value = action.payload;
    },
  },
});

export const { changeStartValue } = startSlice.actions;
export default startSlice.reducer;