import React, { useState } from 'react';
import styled from 'styled-components';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #FFE5B4; // Light pastel orange background
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  background-color: #FFA500; // Darker orange for form
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const ListContainer = styled.div`
  flex: 1;
  background-color: #FFA500; // Darker orange for list
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
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
    </PageContainer>
  );
};

export default WorkoutPage;