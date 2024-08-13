import React from 'react';
export interface Workout {
    id: string;
    type: string;
    duration: number;
    calories_burned: number;
    date: string;
    bodyPart: string;
}
declare const WorkoutList: React.FC;
export default WorkoutList;
