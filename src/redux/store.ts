import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import propertyReducer from "./properties/propertySlice";
import agentReducer from "./agent/agentSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const Allreducer = combineReducers({
  user: userReducer,
  properties: propertyReducer,
  agent: agentReducer,
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
