import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/types';
import { login } from './store/slices/authSlice';
import { AppDispatch } from './store';
import Login from './components/Login';
import Register from './components/Register';
import WorkoutPage from './components/WorkoutPage';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login({ token }));
    }
  }, [dispatch]);

  return (
    <AppContainer>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/workouts" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workouts" element={isAuthenticated ? <WorkoutPage /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </AppContainer>
  );
};

export default App;