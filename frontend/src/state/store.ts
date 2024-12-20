import { configureStore } from "@reduxjs/toolkit";
import userSessionReducer from "./userSessionSlice";
import artistsReducer from "./artistsSlice";
import genresReducer from "./genresSlice";
import popularityReducer from "./popularitySlice";
import tracksReducer from "./tracksSlice";
import viewsReducer from "./viewsSlice";
import decadesReducer from "./decadesSlice";

export const store = configureStore({
  reducer: {
    userSession: userSessionReducer,
    artists: artistsReducer,
    decades: decadesReducer,
    genres: genresReducer,
    popularity: popularityReducer,
    tracks: tracksReducer,
    views: viewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
