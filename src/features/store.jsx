import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employeeSlice";

export const store = configureStore({
  reducer: { employeeSlice: employeeReducer },
  devTools: process.env.NODE_ENV !== "production",
});
