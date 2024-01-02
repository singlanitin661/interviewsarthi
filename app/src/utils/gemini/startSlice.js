import { createSlice } from "@reduxjs/toolkit";

const startSlice = createSlice({
  name: "start",
  initialState: {
    value: false,
  },
  reducers: {
    changeStartValue(state, action) {
      state.value = action.payload; // Ensure this logic only modifies the 'value' within 'startSlice'
    },
    // Other reducers for 'startSlice' if any
  },
});

export const { changeStartValue } = startSlice.actions;
export default startSlice.reducer;
