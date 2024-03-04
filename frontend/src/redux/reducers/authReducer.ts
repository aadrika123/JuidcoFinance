import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("loginData") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      Cookies.set("loginData", JSON.stringify(action.payload), { expires: 1 });
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("loginData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
