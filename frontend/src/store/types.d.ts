import { AuthState } from './slices/authSlice';
import { WorkoutState } from './slices/workoutSlice';
import { ChatbotState } from './slices/chatbotSlice';
export interface RootState {
    auth: AuthState;
    workouts: WorkoutState;
    chatbot: ChatbotState;
}
