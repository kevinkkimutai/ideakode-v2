import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  auth: null,
  notifications: null,
  isAuthenticated: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logOut: (state) => {
      console.log("Logging out", state);  
      state.token = null;
      state.auth = null;
      state.user = null;
      state.notifications = null;
      state.isAuthenticated = false;
      Cookies.remove("token");

    },
  },
});

export const { setUser, setLoading, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state.auth;
