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

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPES = "user-read-email user-library-read user-top-read user-read-recently-played";

const authParams = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  response_type: "code",
  scope: "user-read-email%20user-library-read%20user-top-read%20user-read-recently-played",
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
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
