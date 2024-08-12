import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workoutReducer from './slices/workoutSlice';
import chatbotReducer from './slices/chatbotSlice';
import { RootState } from './types';

const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutReducer,
    chatbot: chatbotReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type { RootState };

export default store;