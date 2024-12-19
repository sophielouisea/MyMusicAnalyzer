import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SliceInitialState } from "@/types";
import { setFulfilled, setPending, setRejected } from "./utils";

const apiUrl = import.meta.env.VITE_FASTAPI_URL;

const initialState: SliceInitialState = {
  isLoading: false,
  data: {},
  requestError: false,
  requestSuccess: false,
};

export const getTopArtists = createAsyncThunk(
  "artistsSlice/getTopArtists",
  async (arg, { rejectWithValue }) => {
    console.log("Getting user details...");
    const token = await window.localStorage.getItem("spotifyToken");
    if (token) {
      const requestConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      };

      try {
        const response = await fetch(
          apiUrl + "artists/top_artists",
          requestConfig,
        );
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        console.log("Error getting top artists:", error);
        return rejectWithValue(error);
      }
    } else {
      console.log("No token found.");
      return rejectWithValue("No token was found.");
    }
  },
);

export const artistsSlice = createSlice({
  name: "artistsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopArtists.pending, (state) => {
      setPending(state, "getTopArtists");
    });

    builder.addCase(getTopArtists.fulfilled, (state, action) => {
      setFulfilled(state, "getTopArtists");
      console.log("RES:", action?.payload);
      state.data = action?.payload;
    });

    builder.addCase(getTopArtists.rejected, (state) => {
      setRejected(state, "getTopArtists");
    });
  },
});

export default artistsSlice.reducer;
