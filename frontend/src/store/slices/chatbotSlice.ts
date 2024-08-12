import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export interface ChatbotState {
  messages: { text: string; sender: 'user' | 'bot' }[];
  isLoading: boolean;
  error: string | null;
}

export const sendMessage = createAsyncThunk(
  'chatbot/sendMessage',
  async (message: string) => {
    const response = await api.sendChatbotMessage(message);
    return response.data;
  }
);

const initialState: ChatbotState = {
  messages: [],
  isLoading: false,
  error: null,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<string>) => {
        state.messages.push({ text: action.payload, sender: 'bot' });
        state.isLoading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default chatbotSlice.reducer;