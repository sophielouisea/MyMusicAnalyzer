import { createSlice } from "@reduxjs/toolkit";



export const viewsSlice = createSlice({
  name: "viewsSlice",
  initialState: {
    timeRange: "medium_term"
  },
  reducers: {
    showShortTermView: (state) => {
      state.timeRange = "short_term"
    },
    showMediumTermView: (state) => {
      state.timeRange = "medium_term"
    },
    showLongTermView: (state) => {
      state.timeRange = "long_term"
    },
  }
})

export const {
  showShortTermView,
  showMediumTermView,
  showLongTermView,
} = viewsSlice.actions;

export default viewsSlice.reducer;
