import axios from 'axios';
const API_URL = 'http://localhost:5000';
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const login = (credentials) => api.post('/login', credentials);
export const register = (userData) => api.post('/register', userData);
export const validateToken = () => api.post('/validate-token');
export const getWorkouts = () => api.get('/workouts');
export const addWorkout = (workoutData) => api.post('/workouts', workoutData);
export const deleteWorkout = (id) => api.delete(`/workouts/${id}`);
export default api;
