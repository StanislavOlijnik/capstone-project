import styled, { createGlobalStyle } from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
`;


export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? '#333' : '#B0E0E6')};
    transition: background-color 0.3s ease;
  }
`;



export const AppTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
  color: ${(props) => (props.darkMode ? 'white' : 'blue')};
`;

export const TodoContainer = styled.div`
  flex: 1;
  margin: 10px;
  max-height: calc(100vh - 150px); 
  overflow-y: auto; 
  position: sticky; 
  top: 0; 
`;

export const PriorityTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  text-align: center;
`;

export const HighPriorityTitle = styled(PriorityTitle)`
  font-size: 18px;
  margin-bottom: 8px;
  padding-left: 10px;
`;

export const TodoItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TodoText = styled.span`
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

export const TodoButton = styled.button`
  margin: 0 5px;
  background-color: ${(props) =>
    props.clear ? 'red' : props.add ? 'green' : props.edit ? 'orange' : 'transparent'};
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

export const DoneButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

export const NotesButton = styled.button`
  background-color: gray;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

export const Notes = styled.p`
  margin: 0;
  font-size: 14px;
  color: gray;
`;
export const ClearAllButton = styled.button`
  background-color: red;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;
export const TodoInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;