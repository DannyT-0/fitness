import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import styled from 'styled-components';
const useAppDispatch = () => useDispatch();
const LoginContainer = styled.div `
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h2 `
  text-align: center;
  color: #333;
`;
const Form = styled.form `
  display: flex;
  flex-direction: column;
`;
const Input = styled.input `
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Button = styled.button `
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };
    return (_jsxs(LoginContainer, { children: [_jsx(Title, { children: "Login" }), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsx(Input, { type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Username" }), _jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password" }), _jsx(Button, { type: "submit", children: "Login" })] })] }));
};
export default Login;
