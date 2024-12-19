import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export const viewsSlice = createSlice({
  name: "viewsSlice",
  initialState: {
    timeRange: "short_term"
  },
  reducers: {
    setTimeRangeView: (state, action: PayloadAction<"medium_term" | "short_term" | "long_term">) => {
      state.timeRange = action.payload
    },
  }
})

export const {
  setTimeRangeView
} = viewsSlice.actions;

export default viewsSlice.reducer;
