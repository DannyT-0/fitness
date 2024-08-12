import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';



interface Workout {
  id: string;
  type: string;
  duration: number;
  calories_burned: number;
  date: string; 
}

export interface WorkoutState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}

export const fetchWorkouts = createAsyncThunk<Workout[]>(
  'workouts/fetchWorkouts',
  async () => {
    const response = await api.getWorkouts();
    return response.data;
  }
);

export const addWorkout = createAsyncThunk<Workout, { type: string; duration: number; calories_burned: number }>(
  'workouts/addWorkout',
  async (workoutData) => {
    const response = await api.addWorkout(workoutData);
    return response.data;
  }
);

const workoutSlice = createSlice({
  name: 'workouts',
  initialState: {
    workouts: [],
    loading: false,
    error: null,
  } as WorkoutState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.loading = false;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
      });
  },
});

export default workoutSlice.reducer;
