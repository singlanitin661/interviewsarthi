import { createSlice } from "@reduxjs/toolkit";

const speakSlice = createSlice({
  name: "speak",
  initialState: {
    value: false,
  },
  reducers: {
    changeSpeakValue(state, action) {
      state.value = action.payload; // Ensure this logic only modifies the 'value' within 'speakSlice'
    },
    // Other reducers for 'speakSlice' if any
  },
});

export const { changeSpeakValue } = speakSlice.actions;
export default speakSlice.reducer;
