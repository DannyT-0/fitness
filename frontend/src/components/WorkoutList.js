import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts, deleteWorkout } from '../store/slices/workoutSlice';
import styled from 'styled-components';
const WorkoutListContainer = styled.div `
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;
const Title = styled.h2 `
  text-align: center;
  color: #333;
`;
const WorkoutItem = styled.div `
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
const WorkoutInfo = styled.p `
  margin: 5px 0;
  color: #333;
`;
const ErrorMessage = styled.div `
  color: #D8000C;
  background-color: #FFD2D2;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 20px;
`;
const LoadingMessage = styled.div `
  text-align: center;
  margin-top: 20px;
  color: #666;
`;
const Button = styled.button `
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
const ButtonContainer = styled.div `
  position: absolute;
  top: 10px;
  right: 10px;
`;
const useAppDispatch = () => useDispatch();
const WorkoutList = ({ selectedDate }) => {
    const dispatch = useAppDispatch();
    const workouts = useSelector((state) => state.workouts.workouts);
    const status = useSelector((state) => state.workouts.status);
    const error = useSelector((state) => state.workouts.error);
    useEffect(() => {
        dispatch(fetchWorkouts());
    }, [dispatch]);
    const handleDelete = (id) => {
        dispatch(deleteWorkout(id));
    };
    const handleEdit = (workout) => {
        // Implement edit functionality
        console.log("Edit workout:", workout);
    };
    if (status === 'loading') {
        return _jsx(LoadingMessage, { children: "Loading workouts..." });
    }
    if (status === 'failed') {
        return _jsxs(ErrorMessage, { children: ["Error: ", error] });
    }
    const filteredWorkouts = workouts.filter((workout) => {
        const workoutDate = new Date(workout.date);
        return workoutDate.toDateString() === selectedDate.toDateString();
    });
    return (_jsxs(WorkoutListContainer, { children: [_jsxs(Title, { children: ["Your Workouts for ", selectedDate.toLocaleDateString()] }), filteredWorkouts.length === 0 ? (_jsx(WorkoutItem, { children: _jsx(WorkoutInfo, { children: "No workouts found for this date. Start by adding a workout!" }) })) : (filteredWorkouts.map((workout) => (_jsxs(WorkoutItem, { children: [_jsxs(ButtonContainer, { children: [_jsx(Button, { onClick: () => handleEdit(workout), children: "Edit" }), _jsx(Button, { onClick: () => handleDelete(workout.id), children: "Delete" })] }), _jsxs(WorkoutInfo, { children: ["Body Part: ", workout.bodyPart] }), _jsxs(WorkoutInfo, { children: ["Type: ", workout.type] }), _jsxs(WorkoutInfo, { children: ["Sets: ", workout.sets] }), _jsxs(WorkoutInfo, { children: ["Reps: ", workout.reps] }), _jsxs(WorkoutInfo, { children: ["Weight: ", workout.weight, " lbs"] })] }, workout.id))))] }));
};
export default WorkoutList;
