interface Workout {
    id: string;
    type: string;
    sets: number;
    reps: number;
    weight: number;
    date: string;
    bodyPart: string;
}
export interface WorkoutState {
    workouts: Workout[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
export declare const fetchWorkouts: import("@reduxjs/toolkit").AsyncThunk<Workout[], void, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const addWorkout: import("@reduxjs/toolkit").AsyncThunk<Workout, Omit<Workout, "id">, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const deleteWorkout: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("redux").Reducer<WorkoutState, import("redux").UnknownAction, WorkoutState>;
export default _default;
