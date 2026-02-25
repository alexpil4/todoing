import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import userReducer from './features/user/userSlice';

const rootReducer = combineReducers({
  // Define a top-level states
  user: userReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
