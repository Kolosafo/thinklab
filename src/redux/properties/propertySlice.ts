import { KYCFormData, PropertyType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  properties: PropertyType[];
  agents: KYCFormData[];
};
const initailState: initialStateType = {
  properties: [],
  agents: [],
};
const propertySlice = createSlice({
  name: "property",
  initialState: initailState,
  reducers: {
    addProperty: (state, action: PayloadAction<PropertyType>) => {
      state.properties = [...state.properties, action.payload];
    },
    loadProperties: (state, action: PayloadAction<PropertyType[]>) => {
      state.properties = action.payload;
    },
    loadApplications: (state, action: PayloadAction<KYCFormData[]>) => {
      state.agents = action.payload;
    },
    updateApplications: (state, action: PayloadAction<KYCFormData>) => {
      const updatedApplication = action.payload;

      const index = state.agents.findIndex(
        (app) => app.id === updatedApplication.id
      );

      if (index !== -1) {
        state.agents[index] = {
          ...state.agents[index],
          ...updatedApplication,
        };
      }
    },
  },
});

export const { addProperty, loadProperties, loadApplications, updateApplications } =
  propertySlice.actions;
export default propertySlice.reducer;
