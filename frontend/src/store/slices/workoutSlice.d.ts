interface Workout {
    id: string;
    type: string;
    duration: number;
    calories_burned: number;
    date: string;
}
export interface WorkoutState {
    workouts: Workout[];
    loading: boolean;
    error: string | null;
}
export declare const fetchWorkouts: import("@reduxjs/toolkit").AsyncThunk<Workout[], void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const addWorkout: import("@reduxjs/toolkit").AsyncThunk<Workout, {
    type: string;
    duration: number;
    calories_burned: number;
}, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("redux").Reducer<WorkoutState, import("redux").UnknownAction, WorkoutState>;
export default _default;
