import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SliceInitialState, UserSession } from "@/types";
import { setFulfilled, setPending, setRejected } from "./utils";

const apiUrl = import.meta.env.VITE_FASTAPI_URL;

const initialUserData: UserSession = {
  hasValidToken: undefined,
  isAuthenticated: undefined,
  userEmail: undefined,
  userName: undefined,
  hasTrends: undefined,
};

const initialState: SliceInitialState = {
  isLoading: false,
  requestSuccess: undefined,
  requestError: undefined,
  data: initialUserData,
};

export const checkHasValidToken = createAsyncThunk(
  "userSessionSlice/checkValidToken",
  async () => {
    console.log("Checking for tokens...");
    const token = await window.localStorage.getItem("spotifyToken");
    const tokenExpiry = await window.localStorage.getItem("spotifyTokenExpiry");
    const timeNow = (Date.now() / 1000) | 0;
    const validToken = token && tokenExpiry && Number(tokenExpiry) > timeNow;

    if (validToken) {
      console.log(
        "Token found. Expires:",
        JSON.stringify(new Date(Number(tokenExpiry) * 1000)),
      );
      return true;
    }
    return false;
  },
);

export const authenticateUser = createAsyncThunk(
  "userSessionSlice/authenticateUser",
  async (code: string, {rejectWithValue}) => {
    if (code) {
      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      }

      try {
        const response = await fetch(apiUrl + "user/auth", requestConfig);
        if (response.ok) {
          console.log("RESPONSE:",  response)
          const jsonResponse = await response.json();
          localStorage.setItem('spotifyToken', jsonResponse.access_token);
          localStorage.setItem('spotifyTokenExpiry', jsonResponse.expires_at);
        }
      } catch (error) {
        console.log("Error authenticating user:", error)
        return rejectWithValue(error);
      }
    } else {
      return rejectWithValue("No auth code was provided.")
    }
  }
)

export const getUserDetails = createAsyncThunk(
  "userSessionSlice/getUserDetails",
  async (arg, {rejectWithValue}) => {
    console.log("Getting user details...")
    const token = await window.localStorage.getItem("spotifyToken");
    if (token) {
      const requestConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }

      try {
        const response = await fetch(apiUrl + "user/details", requestConfig);
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        console.log("Error getting user details:", error)
        return rejectWithValue(error);
      }
    } else {
      console.log("No token found.")
      return rejectWithValue("No token was found.")
    }
  }
)

export const userSessionSlice = createSlice({
  name: "userSessionSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.pending, (state) => {
      setPending(state, "authenticateUser");
    });

    builder.addCase(authenticateUser.fulfilled, (state) => {
      setFulfilled(state, "authenticateUser");
      state.data.isAuthenticated = true;
    });

    builder.addCase(authenticateUser.rejected, (state) => {
      setRejected(state, "authenticateUser");
      state.data.isAuthenticated = false;
    });

    builder.addCase(checkHasValidToken.pending, (state) => {
      setPending(state, "checkHasValidToken");
    });

    builder.addCase(checkHasValidToken.fulfilled, (state, action) => {
      setFulfilled(state, "checkHasValidToken");
      state.data.hasValidToken = action?.payload;
    });

    builder.addCase(checkHasValidToken.rejected, (state) => {
      setRejected(state, "checkHasValidToken");
    });

    builder.addCase(getUserDetails.pending, (state) => {
      setPending(state, "getUserDetails");
    });

    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      setFulfilled(state, "getUserDetails");
      state.data.userEmail = action?.payload.email;
      state.data.userName = action?.payload.display_name;
    });

    builder.addCase(getUserDetails.rejected, (state) => {
      setRejected(state, "getUserDetails");
    });
  },
});

export default userSessionSlice.reducer;
