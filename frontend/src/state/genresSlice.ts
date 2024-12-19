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

export const getTopGenres = createAsyncThunk(
  "genresSlice/getTopGenres",
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
          apiUrl + "genres/top_genres",
          requestConfig,
        );
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        console.log("Error getting top genres:", error);
        return rejectWithValue(error);
      }
    } else {
      console.log("No token found.");
      return rejectWithValue("No token was found.");
    }
  },
);

export const genresSlice = createSlice({
  name: "genresSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopGenres.pending, (state) => {
      setPending(state, "getTopGenres");
    });

    builder.addCase(getTopGenres.fulfilled, (state, action) => {
      setFulfilled(state, "getTopGenres");
      console.log("RES:", action?.payload);
      state.data = action?.payload;
    });

    builder.addCase(getTopGenres.rejected, (state) => {
      setRejected(state, "getTopGenres");
    });
  },
});

export default genresSlice.reducer;
