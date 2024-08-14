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
const ErrorMessage = styled.div `
  color: red;
  text-align: center;
  margin-top: 20px;
`;
const LoadingMessage = styled.div `
  text-align: center;
  margin-top: 20px;
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
    return (_jsxs(WorkoutListContainer, { children: [_jsxs(Title, { children: ["Your Workouts for ", selectedDate.toLocaleDateString()] }), filteredWorkouts.length === 0 ? (_jsx("p", { children: "No workouts found for this date. Start by adding a workout!" })) : (filteredWorkouts.map((workout) => (_jsxs(WorkoutItem, { children: [_jsxs(WorkoutInfo, { children: ["Body Part: ", workout.bodyPart] }), _jsxs(WorkoutInfo, { children: ["Type: ", workout.type] }), _jsxs(WorkoutInfo, { children: ["Sets: ", workout.sets] }), _jsxs(WorkoutInfo, { children: ["Reps: ", workout.reps] }), _jsxs(WorkoutInfo, { children: ["Weight: ", workout.weight] })] }, workout.id))))] }));
};
export default WorkoutList;
