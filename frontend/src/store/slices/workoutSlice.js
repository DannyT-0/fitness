import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async () => {
    const response = await api.getWorkouts();
    return response.data;
});
export const addWorkout = createAsyncThunk('workouts/addWorkout', async (workoutData) => {
    const response = await api.addWorkout(workoutData);
    return response.data;
});
const workoutSlice = createSlice({
    name: 'workouts',
    initialState: {
        workouts: [],
        loading: false,
        error: null,
    },
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
