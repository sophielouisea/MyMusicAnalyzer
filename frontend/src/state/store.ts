import { configureStore } from "@reduxjs/toolkit";
import userSessionReducer from "./userSessionSlice";
import artistsReducer from "./artistsSlice";

export const store = configureStore({
  reducer: {
    userSession: userSessionReducer,
    artists: artistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
