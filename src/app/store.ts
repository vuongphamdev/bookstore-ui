import { configureStore } from "@reduxjs/toolkit";
import { authSlice, bookSlice } from "../features";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    books: bookSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
