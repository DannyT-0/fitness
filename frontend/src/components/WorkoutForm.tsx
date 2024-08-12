import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../store/slices/workoutSlice';
import styled from 'styled-components';
import { AppDispatch } from '../store';

const useAppDispatch = () => useDispatch<AppDispatch>();



const WorkoutFormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ffc107;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }
`;

const WorkoutForm: React.FC = () => {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addWorkout({ type, duration: parseInt(duration), calories_burned: parseInt(caloriesBurned) }));
    setType('');
    setDuration('');
    setCaloriesBurned('');
  };

  return (
    <WorkoutFormContainer>
      <Title>Log Workout</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Workout Type"
        />
        <Input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (minutes)"
        />
        <Input
          type="number"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          placeholder="Calories Burned"
        />
        <Button type="submit">Log Workout</Button>
      </Form>
    </WorkoutFormContainer>
  );
};

export default WorkoutForm;