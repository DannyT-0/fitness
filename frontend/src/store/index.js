import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workoutReducer from './slices/workoutSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        workouts: workoutReducer,
    },
});
export default store;
