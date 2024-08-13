declare const api: import("axios").AxiosInstance;
export declare const login: (credentials: {
    username: string;
    password: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const register: (userData: {
    username: string;
    email: string;
    password: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const validateToken: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getWorkouts: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const addWorkout: (workoutData: {
    type: string;
    duration: number;
    calories_burned: number;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const sendChatbotMessage: (message: string) => Promise<import("axios").AxiosResponse<any, any>>;
export default api;
