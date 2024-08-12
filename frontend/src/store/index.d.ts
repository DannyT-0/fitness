import { RootState } from './types';
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("./slices/authSlice").AuthState;
    workouts: import("./slices/workoutSlice").WorkoutState;
    chatbot: import("./slices/chatbotSlice").ChatbotState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: import("./slices/authSlice").AuthState;
        workouts: import("./slices/workoutSlice").WorkoutState;
        chatbot: import("./slices/chatbotSlice").ChatbotState;
    }, undefined, import("redux").UnknownAction>;
}, {}>, import("redux").StoreEnhancer<{}, {}>]>>;
export type AppDispatch = typeof store.dispatch;
export type { RootState };
export default store;
