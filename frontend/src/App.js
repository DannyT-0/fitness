import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './store/slices/authSlice';
import Login from './components/Login';
import Register from './components/Register';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import Chatbot from './components/Chatbot';
import styled from 'styled-components';
const AppContainer = styled.div `
  // Add your global styles here
`;
const App = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(login({ token }));
        }
    }, [dispatch]);
    return (_jsx(AppContainer, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: isAuthenticated ? _jsx(Navigate, { to: "/workouts" }) : _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/workouts", element: isAuthenticated ? _jsx(WorkoutForm, {}) : _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/log-workout", element: isAuthenticated ? _jsx(WorkoutList, {}) : _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/chatbot", element: isAuthenticated ? _jsx(Chatbot, {}) : _jsx(Navigate, { to: "/" }) })] }) }) }));
};
export default App;
