import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/types';
import Login from './components/Login';
import Register from './components/Register';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import Chatbot from './components/Chatbot';
import styled from 'styled-components';

const AppContainer = styled.div`
  // Add your global styles here
`;

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <WorkoutList /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/log-workout" element={<WorkoutForm />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </AppContainer>
  );
};

export default App;