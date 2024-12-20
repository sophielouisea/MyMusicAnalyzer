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

export const getTopTracks = createAsyncThunk(
  "tracksSlice/getTopTracks",
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
          apiUrl + "tracks/top_tracks",
          requestConfig,
        );
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        console.log("Error getting top tracks:", error);
        return rejectWithValue(error);
      }
    } else {
      console.log("No token found.");
      return rejectWithValue("No token was found.");
    }
  },
);

export const tracksSlice = createSlice({
  name: "tracksSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopTracks.pending, (state) => {
      setPending(state, "getTopTracks");
    });

    builder.addCase(getTopTracks.fulfilled, (state, action) => {
      setFulfilled(state, "getTopTracks");
      console.log("RES:", action?.payload);
      state.data = action?.payload;
    });

    builder.addCase(getTopTracks.rejected, (state) => {
      setRejected(state, "getTopTracks");
    });
  },
});

export default tracksSlice.reducer;
