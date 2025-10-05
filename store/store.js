// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import billsReducer from "./billsSlice";
import currencyReducer from "./currencySlice";

export const store = configureStore({
  reducer: {
    bills: billsReducer,
    currency: currencyReducer,
  },
});
