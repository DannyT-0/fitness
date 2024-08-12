import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await api.login(credentials);
    return response.data;
});
export const register = createAsyncThunk('auth/register', async (userData) => {
    const response = await api.register(userData);
    return response.data;
});
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.access_token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.access_token);
        })
            .addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            // You might want to set isAuthenticated to true here, depending on your app's logic
        });
    },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
