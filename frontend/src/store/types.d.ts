import { AuthState } from './slices/authSlice';
import { WorkoutState } from './slices/workoutSlice';
export interface RootState {
    auth: AuthState;
    workouts: WorkoutState;
}
