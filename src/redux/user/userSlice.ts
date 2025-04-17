import { Company, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  user: User | null;
  company: Company | null;
  loading: boolean;
  isLogged: boolean;
  isAdmin: boolean;
};
const initailState: initialStateType = {
  user: {
    id: "",
    email: "",
  },
  company: null,
  loading: false,
  isLogged: false,
  isAdmin: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initailState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLogged = true;
      state.loading = false;
    },
    handleUpdateCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
      window.location.reload();
    },

    handleSignUp: (state, { payload }) => {
      // console.log("SIGN UP USER: ", payload);
      state.user = payload;
    },
  },
});

export const { login, logout, handleSignUp, handleUpdateCompany } =
  userSlice.actions;
export default userSlice.reducer;
