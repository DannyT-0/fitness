import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../store/slices/workoutSlice';
import styled, { createGlobalStyle } from 'styled-components';
import { AppDispatch } from '../store';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const useAppDispatch = () => useDispatch<AppDispatch>();

const GlobalStyle = createGlobalStyle`
  .datepicker-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
  }
`;

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

const Select = styled.select`
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

const bodyParts = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'];

const exercises = {
  Chest: ['Bench Press', 'Push-ups', 'Chest Flyes'],
  Back: ['Pull-ups', 'Rows', 'Lat Pulldowns'],
  Legs: ['Squats', 'Lunges', 'Leg Press'],
  Arms: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls'],
  Shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises'],
  Core: ['Crunches', 'Planks', 'Russian Twists']
};

const WorkoutForm: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [bodyPart, setBodyPart] = useState<string>('');
  const [exercise, setExercise] = useState<string>('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && bodyPart && exercise) {
      dispatch(addWorkout({ 
        type: exercise,
        duration: parseInt(duration),
        calories_burned: parseInt(caloriesBurned),
        date: date.toISOString(),
        bodyPart
      }));
    }
    setDate(new Date());
    setBodyPart('');
    setExercise('');
    setDuration('');
    setCaloriesBurned('');
  };

  return (
    <WorkoutFormContainer>
      <GlobalStyle />
      <Title>Log Workout</Title>
      <Form onSubmit={handleSubmit}>
        <DatePicker
          selected={date}
          onChange={(date: Date | null) => setDate(date)}
          dateFormat="MMMM d, yyyy"
          className="datepicker-input"
        />
        {date && (
          <Select
            value={bodyPart}
            onChange={(e) => {
              setBodyPart(e.target.value);
              console.log('Selected body part:', e.target.value); // Debugging line
              setExercise('');
            }}
          >
            <option value="">Select Body Part</option>
            {bodyParts.map((part) => (
              <option key={part} value={part}>{part}</option>
            ))}
          </Select>
        )}
        {bodyPart && (
          <Select
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          >
            <option value="">Select Exercise</option>
            {exercises[bodyPart as keyof typeof exercises].map((ex) => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </Select>
        )}
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
