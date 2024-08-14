import React from 'react';
export interface Workout {
    id: string;
    type: string;
    sets: number;
    reps: number;
    weight: number;
    date: string;
    bodyPart: string;
}
interface WorkoutListProps {
    selectedDate: Date;
}
declare const WorkoutList: React.FC<WorkoutListProps>;
export default WorkoutList;
