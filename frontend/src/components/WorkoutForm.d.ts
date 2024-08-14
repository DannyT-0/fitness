import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
interface WorkoutFormProps {
    onWorkoutAdded: () => void;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}
declare const WorkoutForm: React.FC<WorkoutFormProps>;
export default WorkoutForm;
