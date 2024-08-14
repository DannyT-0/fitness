import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../store/slices/workoutSlice';
import styled, { createGlobalStyle } from 'styled-components';
import { AppDispatch } from '../store';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const useAppDispatch = () => useDispatch<AppDispatch>();

const WorkoutFormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GlobalStyle = createGlobalStyle`
  .react-datepicker-wrapper {
    width: 100%;
  }
  .datepicker-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
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
  Chest: ['Bench Press', 'Push-ups', 'Chest Flyes', 'Dips', 'Db bench press', 'Machine Press', 'Incline Bench Press', 'Decline Bench Press'],
  Back: ['Pull-ups', 'Rows', 'Lat Pulldowns', 'Db Rows', 'Chin-ups','Deadlifts', 'Pull-overs', 'Cable Rows'],
  Legs: ['Squats', 'Lunges', 'Leg Press','Leg Extensions', 'Db Squats', 'Calf Raises', 'Stiff-Legged Deadlifts', 'Leg Curls'],
  Arms: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Tricep Dips', 'Cable Curls', 'Cable Tricep Extensions', 'Cable Curls', 'Cable Tricep Extensions'],
  Shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises', 'Side Raises', 'Cable Raises', 'Cable Front Raises', 'Cable Side Raises', 'Cable Lateral Raises'],
  Core: ['Crunches', 'Planks', 'Russian Twists', 'Leg Raises', 'Cable Raises', 'Cable Planks', 'Cable Russian Twists', 'Cable Leg Raises']
};

interface WorkoutFormProps {
  onWorkoutAdded: () => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onWorkoutAdded, selectedDate, onDateChange }) => {
  const [bodyPart, setBodyPart] = useState<string>('');
  const [exercise, setExercise] = useState<string>('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && bodyPart && exercise) {
      const workoutData = {
        type: exercise,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseInt(weight),
        date: selectedDate.toISOString(),
        bodyPart
      };
      console.log("Sending workout data:", workoutData);
      dispatch(addWorkout(workoutData));
      onWorkoutAdded();
      setBodyPart('');
      setExercise('');
      setSets('');
      setReps('');
      setWeight('');
    }
  };

  return (
    <WorkoutFormContainer>
      <GlobalStyle />
      <Title>Log Workout</Title>
      <Form onSubmit={handleSubmit}>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => date && onDateChange(date)}
          dateFormat="MMMM d, yyyy"
          className="datepicker-input"
        />
        <Select
          value={bodyPart}
          onChange={(e) => {
            setBodyPart(e.target.value);
            setExercise('');
          }}
        >
          <option value="">Select Body Part</option>
          {bodyParts.map((part) => (
            <option key={part} value={part}>{part}</option>
          ))}
        </Select>
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
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          placeholder="Sets"
        />
        <Input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="Reps"
        />
        <Input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight in Pounds"
        />
        <Button type="submit">Log Workout</Button>
      </Form>
    </WorkoutFormContainer>
  );
};

export default WorkoutForm;