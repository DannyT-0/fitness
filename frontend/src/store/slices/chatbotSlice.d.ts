export interface ChatbotState {
    messages: {
        text: string;
        sender: 'user' | 'bot';
    }[];
    isLoading: boolean;
    error: string | null;
    response: string | null;
}
export declare const sendMessage: import("@reduxjs/toolkit").AsyncThunk<any, string, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("redux").Reducer<ChatbotState, import("redux").UnknownAction, ChatbotState>;
export default _default;
