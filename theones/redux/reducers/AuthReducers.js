import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  auth: null,
  notifications: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      Cookies.set("token", action.payload.token, { expires: 1, path: '/' }); // Ensure path is '/' (or the path used in your app)
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logOut: (state) => {
      // console.log("Logging out", state);  
      state.token = null;
      state.auth = null;
      state.user = null;
      state.notifications = null;
      state.isAuthenticated = false;
      Cookies.remove("token", { path: '/' }); // Ensure path is correct

    },
  },
});

export const { setUser, setLoading, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state.auth.user;
