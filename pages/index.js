import React from 'react';
import styled from 'styled-components'; 
import TodoList from '../components/TodoList';


const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const HomePage = () => {
  return (
    <div>
      <Title>My To-Do App</Title>
      <TodoList />
    </div>
  );
};

export default HomePage;