import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async (_, { rejectWithValue }) => {
    try {
        const response = await api.getWorkouts();
        return response.data;
    }
    catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error occurred');
    }
});
export const addWorkout = createAsyncThunk('workouts/addWorkout', async (workoutData, { rejectWithValue }) => {
    try {
        const response = await api.addWorkout(workoutData);
        return response.data;
    }
    catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error occurred');
    }
});
export const deleteWorkout = createAsyncThunk('workouts/deleteWorkout', async (workoutId, { rejectWithValue }) => {
    try {
        await api.deleteWorkout(workoutId);
        return workoutId;
    }
    catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error occurred');
    }
});
const workoutSlice = createSlice({
    name: 'workouts',
    initialState: {
        workouts: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkouts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
            .addCase(fetchWorkouts.fulfilled, (state, action) => {
            state.workouts = action.payload;
            state.status = 'succeeded';
        })
            .addCase(fetchWorkouts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload ?? 'Unknown error occurred';
        })
            .addCase(addWorkout.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
            .addCase(addWorkout.fulfilled, (state, action) => {
            state.workouts.push(action.payload);
            state.status = 'succeeded';
        })
            .addCase(addWorkout.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload ?? 'Unknown error occurred';
        })
            .addCase(deleteWorkout.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
            .addCase(deleteWorkout.fulfilled, (state, action) => {
            state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
            state.status = 'succeeded';
        })
            .addCase(deleteWorkout.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload ?? 'Unknown error occurred';
        });
    },
});
export default workoutSlice.reducer;
