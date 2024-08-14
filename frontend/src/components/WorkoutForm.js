import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../store/slices/workoutSlice';
import styled, { createGlobalStyle } from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const useAppDispatch = () => useDispatch();
const WorkoutFormContainer = styled.div `
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #FFB347; // Slightly darker orange for form
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;
const GlobalStyle = createGlobalStyle `
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
    background-color: #FFF0D4; // Light orange for input
  }
`;
const Title = styled.h2 `
  text-align: center;
  color: #333;
`;
const Form = styled.form `
  display: flex;
  flex-direction: column;
`;
const Input = styled.input `
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #FFF0D4; // Light orange for input
`;
const Select = styled.select `
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #FFF0D4; // Light orange for select
`;
const Button = styled.button `
  padding: 10px 20px;
  font-size: 16px;
  background-color: #FF8C00; // Dark orange for button
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FF7F00;
  }
`;
const bodyParts = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'];
const exercises = {
    Chest: ['Bench Press', 'Push-ups', 'Chest Flyes', 'Dips', 'Db bench press', 'Machine Press', 'Incline Bench Press', 'Decline Bench Press'],
    Back: ['Pull-ups', 'Rows', 'Lat Pulldowns', 'Db Rows', 'Chin-ups', 'Deadlifts', 'Pull-overs', 'Cable Rows'],
    Legs: ['Squats', 'Lunges', 'Leg Press', 'Leg Extensions', 'Db Squats', 'Calf Raises', 'Stiff-Legged Deadlifts', 'Leg Curls'],
    Arms: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Tricep Dips', 'Cable Curls', 'Cable Tricep Extensions', 'Cable Curls', 'Cable Tricep Extensions'],
    Shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises', 'Side Raises', 'Cable Raises', 'Cable Front Raises', 'Cable Side Raises', 'Cable Lateral Raises'],
    Core: ['Crunches', 'Planks', 'Russian Twists', 'Leg Raises', 'Cable Raises', 'Cable Planks', 'Cable Russian Twists', 'Cable Leg Raises']
};
const WorkoutForm = ({ onWorkoutAdded, selectedDate, onDateChange }) => {
    const [bodyPart, setBodyPart] = useState('');
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const dispatch = useAppDispatch();
    const handleSubmit = (e) => {
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
    return (_jsxs(WorkoutFormContainer, { children: [_jsx(GlobalStyle, {}), _jsx(Title, { children: "Log Workout" }), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsx(DatePicker, { selected: selectedDate, onChange: (date) => date && onDateChange(date), dateFormat: "MMMM d, yyyy", className: "datepicker-input" }), _jsxs(Select, { value: bodyPart, onChange: (e) => {
                            setBodyPart(e.target.value);
                            setExercise('');
                        }, children: [_jsx("option", { value: "", children: "Select Body Part" }), bodyParts.map((part) => (_jsx("option", { value: part, children: part }, part)))] }), bodyPart && (_jsxs(Select, { value: exercise, onChange: (e) => setExercise(e.target.value), children: [_jsx("option", { value: "", children: "Select Exercise" }), exercises[bodyPart].map((ex) => (_jsx("option", { value: ex, children: ex }, ex)))] })), _jsx(Input, { type: "number", value: sets, onChange: (e) => setSets(e.target.value), placeholder: "Sets" }), _jsx(Input, { type: "number", value: reps, onChange: (e) => setReps(e.target.value), placeholder: "Reps" }), _jsx(Input, { type: "number", value: weight, onChange: (e) => setWeight(e.target.value), placeholder: "Weight in Pounds" }), _jsx(Button, { type: "submit", children: "Log Workout" })] })] }));
};
export default WorkoutForm;
