import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/slices/authSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const RegisterContainer = styled.div `
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
const LoginLink = styled.div `
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
const useAppDispatch = () => useDispatch();
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ username, email, password }));
    };
    return (_jsxs(RegisterContainer, { children: [_jsx(Title, { children: "Register" }), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsx(Input, { type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Username" }), _jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email" }), _jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password" }), _jsx(Button, { type: "submit", children: "Register" })] }), _jsxs(LoginLink, { children: ["Already have an account? ", _jsx(Link, { to: "/", children: "Login here" })] })] }));
};
export default Register;
