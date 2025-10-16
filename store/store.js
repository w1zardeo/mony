import { configureStore, combineReducers } from "@reduxjs/toolkit";
import billsReducer from "./billsSlice";
import currencyReducer from "./currencySlice";
import transactionReducer from './transactionsSlice';
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
    transactions: transactionReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bills', 'currency', 'transactions']
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