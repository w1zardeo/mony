import { configureStore, combineReducers } from "@reduxjs/toolkit";
import billsReducer from "./billsSlice";
import currencyReducer from "./currencySlice";
import transactionReducer from './transactionsSlice';
import categoriesReducer from './categoriesSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const rootReducer = combineReducers({
    bills: billsReducer,
    currency: currencyReducer,
    transactions: transactionReducer,
    categories: categoriesReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bills', 'currency', 'transactions', 'categories']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);