import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const viewsSlice = createSlice({
  name: "viewsSlice",
  initialState: {
    timeRange: "short_term",
    visibleDownloadSummaryModal: false,
  },
  reducers: {
    setTimeRangeView: (
      state,
      action: PayloadAction<"medium_term" | "short_term" | "long_term">,
    ) => {
      state.timeRange = action.payload;
    },
    setVisibleDownloadSummaryModal: (state, action: PayloadAction<boolean>) => {
      state.visibleDownloadSummaryModal = action.payload;
    },
  },
});

export const { setTimeRangeView, setVisibleDownloadSummaryModal } =
  viewsSlice.actions;

export default viewsSlice.reducer;
