import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: string; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
