import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
    return (_jsx(AppContainer, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: isAuthenticated ? _jsx(WorkoutList, {}) : _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/workouts", element: _jsx(WorkoutList, {}) }), _jsx(Route, { path: "/log-workout", element: _jsx(WorkoutForm, {}) }), _jsx(Route, { path: "/chatbot", element: _jsx(Chatbot, {}) })] }) }) }));
};
export default App;
