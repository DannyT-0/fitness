import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workoutReducer from './slices/workoutSlice';
import chatbotReducer from './slices/chatbotSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        workouts: workoutReducer,
        chatbot: chatbotReducer,
    },
});
export default store;
