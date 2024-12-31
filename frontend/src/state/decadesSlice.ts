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

export const getDecades = createAsyncThunk(
  "decadesSlice/getDecades",
  async (_, { rejectWithValue }) => {
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
          apiUrl + "tracks/top_decades",
          requestConfig,
        );
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        console.log("Error getting decades stats:", error);
        return rejectWithValue(error);
      }
    } else {
      console.log("No token found.");
      return rejectWithValue("No token was found.");
    }
  },
);

export const decadesSlice = createSlice({
  name: "decadesSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDecades.pending, (state) => {
      setPending(state, "getDecades");
    });

    builder.addCase(getDecades.fulfilled, (state, action) => {
      setFulfilled(state, "getDecades");
      state.data = action?.payload;
    });

    builder.addCase(getDecades.rejected, (state) => {
      setRejected(state, "getDecades");
    });
  },
});

export default decadesSlice.reducer;
