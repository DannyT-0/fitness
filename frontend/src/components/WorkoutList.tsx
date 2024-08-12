import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts } from '../store/slices/workoutSlice';
import styled from 'styled-components';
import { RootState } from '../store';
import { AppDispatch } from '../store';

export interface Workout {
    id: string;
    type: string;
    duration: number;
    calories_burned: number;
    date: string; 
  }
  

const WorkoutListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const WorkoutItem = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const WorkoutInfo = styled.p`
  margin: 5px 0;
`;

const useAppDispatch = () => useDispatch<AppDispatch>();

const WorkoutList: React.FC = () => {
  const dispatch = useAppDispatch();
  const workouts = useSelector((state: RootState) => state.workouts.workouts);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  return (
    <WorkoutListContainer>
      <Title>Your Workouts</Title>
      {workouts.map((workout: Workout) => (
        <WorkoutItem key={workout.id}>
          <WorkoutInfo>Type: {workout.type}</WorkoutInfo>
          <WorkoutInfo>Duration: {workout.duration} minutes</WorkoutInfo>
          <WorkoutInfo>Calories Burned: {workout.calories_burned}</WorkoutInfo>
          <WorkoutInfo>Date: {new Date(workout.date).toLocaleDateString()}</WorkoutInfo>
        </WorkoutItem>
      ))}
    </WorkoutListContainer>
  );
};

export default WorkoutList;