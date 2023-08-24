import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexContainer, FlexChild } from './StyledComponents';


const TodoContainer = styled.div`
  flex: 1;
`;

const PriorityTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const TodoText = styled.span`
  flex: 1;
`;

const TodoButton = styled.button`
  margin-left: 8px;
`;

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleTodoEditing = (id, text) => {
    setEditTodoId(id);
    setEditedTodoText(text);
  };

  const handleTodoSaving = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editedTodoText } : todo
    );

    if (editedTodoText.trim() === '') {
      return;
    }

    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditedTodoText('');
  };

  const handleCancelEditing = () => {
    setEditTodoId(null);
    setEditedTodoText('');
  };

  const handleAddNewTodo = () => {
    if (newTodo.trim() !== '') {
      const todoItem = {
        id: Math.random().toString(32).substring(2),
        text: newTodo,
        priority: priority,
      };
      setTodos([...todos, todoItem]);
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const priorityGroups = {
    high: todos.filter((todo) => todo.priority === 'high'),
    medium: todos.filter((todo) => todo.priority === 'medium'),
    low: todos.filter((todo) => todo.priority === 'low'),
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input type="text" value={newTodo} onChange={handleNewTodoChange} />
      <select value={priority} onChange={handlePriorityChange}>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <button onClick={handleAddNewTodo}>Add</button>

      <FlexContainer>
        {Object.keys(priorityGroups).map((priorityKey) => (
          <TodoContainer key={priorityKey}>
            <PriorityTitle>{priorityKey} Priority</PriorityTitle>
            <ul>
              {priorityGroups[priorityKey].map((todo) => (
                <TodoItem key={todo.id}>
                  {editTodoId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editedTodoText}
                        onChange={(e) => setEditedTodoText(e.target.value)}
                      />
                      <TodoButton onClick={() => handleTodoSaving(todo.id)}>Save</TodoButton>
                      <TodoButton onClick={handleCancelEditing}>Cancel</TodoButton>
                    </>
                  ) : (
                    <>
                      <TodoText>{todo.text}</TodoText>
                      <TodoButton onClick={() => handleRemoveTodo(todo.id)}>Delete</TodoButton>
                      <TodoButton onClick={() => handleTodoEditing(todo.id, todo.text)}>Edit</TodoButton>
                    </>
                  )}
                </TodoItem>
              ))}
            </ul>
          </TodoContainer>
        ))}
      </FlexContainer>

      <button onClick={() => setTodos([])}>Clear All</button>
    </div>
  );
}

export default TodoList;
