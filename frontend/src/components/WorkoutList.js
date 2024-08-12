import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts } from '../store/slices/workoutSlice';
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
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;
const WorkoutInfo = styled.p `
  margin: 5px 0;
`;
const useAppDispatch = () => useDispatch();
const WorkoutList = () => {
    const dispatch = useAppDispatch();
    const workouts = useSelector((state) => state.workouts.workouts);
    useEffect(() => {
        dispatch(fetchWorkouts());
    }, [dispatch]);
    return (_jsxs(WorkoutListContainer, { children: [_jsx(Title, { children: "Your Workouts" }), workouts.map((workout) => (_jsxs(WorkoutItem, { children: [_jsxs(WorkoutInfo, { children: ["Type: ", workout.type] }), _jsxs(WorkoutInfo, { children: ["Duration: ", workout.duration, " minutes"] }), _jsxs(WorkoutInfo, { children: ["Calories Burned: ", workout.calories_burned] }), _jsxs(WorkoutInfo, { children: ["Date: ", new Date(workout.date).toLocaleDateString()] })] }, workout.id)))] }));
};
export default WorkoutList;
