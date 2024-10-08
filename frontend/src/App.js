import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './store/slices/authSlice';
import Login from './components/Login';
import Register from './components/Register';
import WorkoutPage from './components/WorkoutPage';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
const AppContainer = styled.div `
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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
    return (_jsx(AppContainer, { children: _jsxs(Router, { children: [_jsx(GlobalStyles, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: isAuthenticated ? _jsx(Navigate, { to: "/workouts" }) : _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/workouts", element: isAuthenticated ? _jsx(WorkoutPage, {}) : _jsx(Navigate, { to: "/" }) })] })] }) }));
};
export default App;
