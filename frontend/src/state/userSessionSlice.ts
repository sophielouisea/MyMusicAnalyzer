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

export const checkHasValidToken = createAsyncThunk(
  "userSessionSlice/checkValidToken",
  async () => {
    console.log("Checking for tokens...")
    const token = await window.localStorage.getItem("spotifyToken");

    const tokenExpiry = await window.localStorage.getItem("spotifyTokenExpiry");
    //  && tokenExpiry && Number(tokenExpiry) > Date.now()
    if (token) {
      return true;
    }
    return false;
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
  reducers: {},
  extraReducers: () => {}
});

export const { checkHasValidToken } = userSessionSlice.actions;
export default userSessionSlice.reducer;
