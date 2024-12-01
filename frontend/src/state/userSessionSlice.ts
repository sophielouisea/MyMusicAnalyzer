import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SliceInitialState, UserSession } from "@/types";

const initialUserData: UserSession = {
  hasValidToken: undefined,
  userEmail: undefined,
  userName: undefined,
  token: undefined,
  hasTrends: undefined,
}

const initialState: SliceInitialState = {
  isLoading: false,
  requestSuccess: undefined,
  requestError: undefined,
  data: initialUserData
}

export const checkValidToken = createAsyncThunk(
  "userSessionSlice/checkValidToken",
  async () => {

  }
)

export const authorizeSpotifySession = createAsyncThunk(
  "userSessionSlice/authorizeSpotifySession",
  async () => {

  }
)

export const userSessionSlice = createSlice({
  name: "userSessionSlice",
  initialState: initialState,
  reducers: {
    setHasValidToken: (state): void => {
      state.data.hasValidToken = true;
    }
  },
  extraReducers: () => {}
});

export const { setHasValidToken } = userSessionSlice.actions;
export default userSessionSlice.reducer;
