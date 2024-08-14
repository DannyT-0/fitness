import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workoutReducer from './slices/workoutSlice';
import { RootState } from './types';

const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type { RootState };

export default store;