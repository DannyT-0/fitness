import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts } from '../store/slices/workoutSlice';
import styled from 'styled-components';
import { RootState } from '../store';
import { AppDispatch } from '../store';

export interface Workout {
  id: string;
  type: string;
  sets: number;
  reps: number;
  weight: number;
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

interface WorkoutListProps {
  selectedDate: Date;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ selectedDate }) => {
  const dispatch = useAppDispatch();
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const status = useSelector((state: RootState) => state.workouts.status);
  const error = useSelector((state: RootState) => state.workouts.error);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  if (status === 'loading') {
    return <LoadingMessage>Loading workouts...</LoadingMessage>;
  }

  if (status === 'failed') {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  const filteredWorkouts = workouts.filter((workout: Workout) => {
    const workoutDate = new Date(workout.date);
    return workoutDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <WorkoutListContainer>
      <Title>Your Workouts for {selectedDate.toLocaleDateString()}</Title>
      {filteredWorkouts.length === 0 ? (
        <p>No workouts found for this date. Start by adding a workout!</p>
      ) : (
        filteredWorkouts.map((workout: Workout) => (
          <WorkoutItem key={workout.id}>
            <WorkoutInfo>Body Part: {workout.bodyPart}</WorkoutInfo>
            <WorkoutInfo>Type: {workout.type}</WorkoutInfo>
            <WorkoutInfo>Sets: {workout.sets}</WorkoutInfo>
            <WorkoutInfo>Reps: {workout.reps}</WorkoutInfo>
            <WorkoutInfo>Weight: {workout.weight}</WorkoutInfo>
          </WorkoutItem>
        ))
      )}
    </WorkoutListContainer>
  );
};

export default WorkoutList;