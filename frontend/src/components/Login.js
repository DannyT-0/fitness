import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const useAppDispatch = () => useDispatch();
const LoginContainer = styled.div `
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background-color: #FFA500; // Darker orange for form
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;
const Title = styled.h2 `
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;
const Form = styled.form `
  display: flex;
  flex-direction: column;
`;
const Input = styled.input `
  margin-bottom: 15px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #FFF0D4; // Light orange for input
`;
const Button = styled.button `
  padding: 12px 20px;
  font-size: 16px;
  background-color: #FF8C00; // Dark orange for button
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FF7F00;
  }
`;
const RegisterLink = styled.div `
  text-align: center;
  margin-top: 20px;

  a {
    color: #333;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
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
    return (_jsxs(LoginContainer, { children: [_jsx(Title, { children: "Login" }), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsx(Input, { type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Username" }), _jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password" }), _jsx(Button, { type: "submit", children: "Login" })] }), _jsxs(RegisterLink, { children: ["Don't have an account? ", _jsx(Link, { to: "/register", children: "Register here" })] })] }));
};
export default Login;
