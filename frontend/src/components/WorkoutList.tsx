import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts, deleteWorkout } from '../store/slices/workoutSlice';
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
  background-color: #FFB347; // Slightly darker orange for items
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const WorkoutInfo = styled.p`
  margin: 5px 0;
  color: #333;
`;

const ErrorMessage = styled.div`
  color: #D8000C;
  background-color: #FFD2D2;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #666;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #FF8C00; // Dark orange for buttons
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FF7F00;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
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

  const handleDelete = (id: string) => {
    dispatch(deleteWorkout(id));
  };

  const handleEdit = (workout: Workout) => {
    // Implement edit functionality
    console.log("Edit workout:", workout);
  };

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
        <WorkoutItem>
          <WorkoutInfo>No workouts found for this date. Start by adding a workout!</WorkoutInfo>
        </WorkoutItem>
      ) : (
        filteredWorkouts.map((workout: Workout) => (
          <WorkoutItem key={workout.id}>
            <ButtonContainer>
              <Button onClick={() => handleEdit(workout)}>Edit</Button>
              <Button onClick={() => handleDelete(workout.id)}>Delete</Button>
            </ButtonContainer>
            <WorkoutInfo>Body Part: {workout.bodyPart}</WorkoutInfo>
            <WorkoutInfo>Type: {workout.type}</WorkoutInfo>
            <WorkoutInfo>Sets: {workout.sets}</WorkoutInfo>
            <WorkoutInfo>Reps: {workout.reps}</WorkoutInfo>
            <WorkoutInfo>Weight: {workout.weight} lbs</WorkoutInfo>
          </WorkoutItem>
        ))
      )}
    </WorkoutListContainer>
  );
};

export default WorkoutList;