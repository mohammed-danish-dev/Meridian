import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import procurementReducer from './slices/procurementSlice';
import vendorReducer from './slices/vendorSlice';
import riskReducer from './slices/riskSlice';
import complianceReducer from './slices/complianceSlice';
import notificationReducer from './slices/notificationSlice';
import dashboardReducer from './slices/dashboardSlice';
import auditReducer from './slices/auditSlice';
import reportReducer from './slices/reportSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  procurement: procurementReducer,
  vendors: vendorReducer,
  risk: riskReducer,
  compliance: complianceReducer,
  notifications: notificationReducer,
  dashboard: dashboardReducer,
  audit: auditReducer,
  reports: reportReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'ui'],
};

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
