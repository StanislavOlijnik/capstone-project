import React from 'react';
import styled from 'styled-components';
import TodoList from '../components/TodoList';
import {
  CenteredContainer,
  AppTitle,
  ClearAllButton
} from '../components/styled-components';

const HomePage = () => {
  return (
    <CenteredContainer>
      <AppTitle style={{ margin: '0' }}>My To-Do App</AppTitle>
      <TodoList />
    </CenteredContainer>
  );
};

export default HomePage;
