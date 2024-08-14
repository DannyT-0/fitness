import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';
import Chatbot from './Chatbot';
const PageContainer = styled.div `
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;
const ContentContainer = styled.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const FormContainer = styled.div `
  flex: 1;
  margin-right: 20px;
`;
const ListContainer = styled.div `
  flex: 1;
`;
const WorkoutPage = () => {
    const [refreshList, setRefreshList] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleWorkoutAdded = () => {
        setRefreshList(prev => !prev);
    };
    return (_jsxs(PageContainer, { children: [_jsxs(ContentContainer, { children: [_jsx(FormContainer, { children: _jsx(WorkoutForm, { onWorkoutAdded: handleWorkoutAdded, selectedDate: selectedDate, onDateChange: setSelectedDate }) }), _jsx(ListContainer, { children: _jsx(WorkoutList, { selectedDate: selectedDate }, refreshList ? 'refresh' : 'normal') })] }), _jsx(Chatbot, {})] }));
};
export default WorkoutPage;
