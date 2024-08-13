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
  bodyPart: string;
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

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const useAppDispatch = () => useDispatch<AppDispatch>();

const WorkoutList: React.FC = () => {
  const dispatch = useAppDispatch();
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const status = useSelector((state: RootState) => state.workouts.status);
  const error = useSelector((state: RootState) => state.workouts.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWorkouts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <LoadingMessage>Loading workouts...</LoadingMessage>;
  }

  if (status === 'failed') {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  return (
    <WorkoutListContainer>
      <Title>Your Workouts</Title>
      {workouts.length === 0 ? (
        <p>No workouts found. Start by adding a workout!</p>
      ) : (
        workouts.map((workout: Workout) => (
          <WorkoutItem key={workout.id}>
            <WorkoutInfo>Date: {new Date(workout.date).toLocaleDateString()}</WorkoutInfo>
            <WorkoutInfo>Body Part: {workout.bodyPart}</WorkoutInfo>
            <WorkoutInfo>Type: {workout.type}</WorkoutInfo>
            <WorkoutInfo>Duration: {workout.duration} minutes</WorkoutInfo>
            <WorkoutInfo>Calories Burned: {workout.calories_burned}</WorkoutInfo>
          </WorkoutItem>
        ))
      )}
    </WorkoutListContainer>
  );
};

export default WorkoutList;