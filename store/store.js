// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import billsReducer from "./billsSlice";
import currencyReducer from "./currencySlice";
import transactionReducer from './transactionsSlice';

export const store = configureStore({
  reducer: {
    bills: billsReducer,
    currency: currencyReducer,
    transactions: transactionReducer
  },
});