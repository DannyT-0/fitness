import React, { useState } from 'react';
import styled from 'styled-components';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';
import Chatbot from './Chatbot';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ListContainer = styled.div`
  flex: 1;
`;

const WorkoutPage: React.FC = () => {
  const [refreshList, setRefreshList] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleWorkoutAdded = () => {
    setRefreshList(prev => !prev);
  };

  return (
    <PageContainer>
      <ContentContainer>
        <FormContainer>
          <WorkoutForm onWorkoutAdded={handleWorkoutAdded} selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </FormContainer>
        <ListContainer>
          <WorkoutList key={refreshList ? 'refresh' : 'normal'} selectedDate={selectedDate} />
        </ListContainer>
      </ContentContainer>
      <Chatbot />
    </PageContainer>
  );
};

export default WorkoutPage;