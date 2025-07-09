import { Company, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  user: User | null;
  company: Company | null;
  loading: boolean;
  isLogged: boolean;
  isAdmin: boolean;
  isMasterAdmin: boolean;
  isMarketing: boolean;
  isComms: boolean;
  isLegal: boolean;
  isProjectManagement: boolean;
  masterAdminLogin: {
    username: string;
    password: string;
  };
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
  isMasterAdmin: false,
  isMarketing: false,
  isComms: false,
  isProjectManagement: false,
  isLegal: false,
  masterAdminLogin: {
    username: "thinklabMasterEntry",
    password: "07080908Virtual",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState: initailState,
  reducers: {
    login: () => {
      // state.user = action.payload;
      // state.isLogged = true;
      // state.loading = false;
    },
    handleMasterAdminLogin: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      if (
        action.payload.username !== state.masterAdminLogin.username ||
        action.payload.password !== state.masterAdminLogin.password
      ) {
        return;
      }
      state.isMasterAdmin = true;
      state.isLogged = true;
      state.loading = false;
    },
    setUserRole: (
      state,
      action: PayloadAction<{
        role:
          | "isAdmin"
          | "isMarketing"
          | "isComms"
          | "isLegal"
          | "isProjectManagement";
        value: boolean;
      }>
    ) => {
      state[action.payload.role] = action.payload.value;
    },
    handleUpdateCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
      state.isAdmin = false;
      state.isMasterAdmin = false;
      state.isMarketing = false;
      state.isComms = false;
      state.isLegal = false;
      state.isProjectManagement = false;
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    },

    handleSignUp: (state, { payload }) => {
      // console.log("SIGN UP USER: ", payload);
      state.user = payload;
    },
  },
});

export const {
  login,
  logout,
  handleSignUp,
  handleUpdateCompany,
  setUserRole,
  handleMasterAdminLogin,
} = userSlice.actions;
export default userSlice.reducer;
