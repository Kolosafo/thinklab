import { KYCFormData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  authAgent: KYCFormData | null;
};
const initailState: initialStateType = {
  authAgent: null,
};
const agentSlice = createSlice({
  name: "agent",
  initialState: initailState,
  reducers: {
    loadAgent: (state, action: PayloadAction<KYCFormData>) => {
      state.authAgent = action.payload;
    },

    removeAgent: (state) => {
      state.authAgent = null;
    },
  },
});

export const { loadAgent, removeAgent } = agentSlice.actions;
export default agentSlice.reducer;
