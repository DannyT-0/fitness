import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/slices/chatbotSlice';
import styled from 'styled-components';
import { RootState } from '../store';

import { AppDispatch } from '../store';

const useAppDispatch = () => useDispatch<AppDispatch>();



const ChatbotContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Response = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const response = useSelector((state: RootState) => state.chatbot.response);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendMessage(message));
    setMessage('');
  };

  return (
    <ChatbotContainer>
      <Title>Fitness Chatbot</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a fitness question"
        />
        <Button type="submit">Send</Button>
      </Form>
      {response && <Response>{response}</Response>}
    </ChatbotContainer>
  );
};

export default Chatbot;