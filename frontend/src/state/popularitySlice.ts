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

export const getPopularity = createAsyncThunk(
  "popularitySlice/getPopularity",
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
          apiUrl + "artists/popularity",
          requestConfig,
        );
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        console.log("Error getting popularity stats:", error);
        return rejectWithValue(error);
      }
    } else {
      console.log("No token found.");
      return rejectWithValue("No token was found.");
    }
  },
);

export const popularitySlice = createSlice({
  name: "popularitySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopularity.pending, (state) => {
      setPending(state, "getPopularity");
    });

    builder.addCase(getPopularity.fulfilled, (state, action) => {
      setFulfilled(state, "getPopularity");
      console.log("RES:", action?.payload);
      state.data = action?.payload;
    });

    builder.addCase(getPopularity.rejected, (state) => {
      setRejected(state, "getPopularity");
    });
  },
});

export default popularitySlice.reducer;
