import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SliceInitialState, UserSession } from "@/types";
import { setFulfilled, setPending, setRejected } from "./utils";

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
      console.log("Token found. Expires:", JSON.stringify(tokenExpiry))
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
  reducers: {
    setUserData: (state): void => {
      state.data.token = window.localStorage.getItem("spotifyToken") || "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkHasValidToken.pending, (state) => {
      setPending(state, "checkHasValidToken");
    })

    builder.addCase(checkHasValidToken.fulfilled, (state, action) => {
      setFulfilled(state, "checkHasValidToken");
      state.data.hasValidToken = action?.payload;
    })

    builder.addCase(checkHasValidToken.rejected, (state) => {
      setRejected(state, "checkHasValidToken");
    })
  }
});

export const { } = userSessionSlice.actions;
export default userSessionSlice.reducer;
