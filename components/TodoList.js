import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexContainer } from './StyledComponents';

const TodoContainer = styled.div`
  flex: 1;
`;

const PriorityTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const HighPriorityTitle = styled(PriorityTitle)`
  font-size: 18px;
  margin-bottom: 8px;
  padding-left: 10px;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const TodoText = styled.span``;

const TodoButton = styled.button`
  margin-left: 8px;
`;

const Notes = styled.p`
  margin: 0;
  font-size: 14px;
  color: gray;
`;

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState({});

  const handleNewTodoChange = (event) => {
    const inputText = event.target.value;

    if (inputText.split(' ').length <= 12 && inputText.length <= 20) {
      setNewTodo(inputText);
    }
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleTodoEditing = (id, text) => {
    if (text.split(' ').length <= 12) {
      setEditTodoId(id);
      setEditedTodoText(text);
    } else {
      alert('Maximal 12 Wörter sind für Aufgaben erlaubt.');
    }
  };

  const handleTodoSaving = (id) => {
    if (editedTodoText.trim() === '') {
      return;
    }

    const editedTodoWords = editedTodoText.split(' ');

    if (editedTodoWords.length <= 12) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: editedTodoText } : todo
      );

      setTodos(updatedTodos);
      setEditTodoId(null);
      setEditedTodoText('');
    } else {
      alert('Maximal 12 Wörter sind für Aufgaben erlaubt.');
    }
  };

  const handleCancelEditing = () => {
    setEditTodoId(null);
    setEditedTodoText('');

    if (notes[editTodoId]) {
      const noteWords = notes[editTodoId].split(' ');

      if (noteWords.length <= 1 && notes[editTodoId].length <= 12) {
        setNotes((prevNotes) => ({ ...prevNotes, [editTodoId]: notes[editTodoId] }));
      } else {
        alert('Maximal 12 Zeichen sind für Notizen erlaubt.');
      }
    }
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
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  const handleAddNote = (id, note) => {
    const noteWords = note.split(' ');

    if (noteWords.length <= 1 && note.length <= 12) {
      const truncatedNote = noteWords.slice(0, 6).join(' ');
      setNotes((prevNotes) => ({ ...prevNotes, [id]: truncatedNote }));
    } else {
      alert('Maximal 12 Zeichen sind für Notizen erlaubt.');
    }
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
            {priorityKey === 'high' ? (
              <HighPriorityTitle>{priorityKey} Priority</HighPriorityTitle>
            ) : (
              <PriorityTitle>{priorityKey} Priority</PriorityTitle>
            )}
            <ul>
              {priorityGroups[priorityKey].map((todo) => (
                <TodoItem key={todo.id}>
                  {editTodoId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editedTodoText}
                        onChange={(e) => {
                          if (e.target.value.length <= 12) {
                            setEditedTodoText(e.target.value);
                          }
                        }}
                      />
                      <TodoButton onClick={() => handleTodoSaving(todo.id)}>Save</TodoButton>
                      <TodoButton onClick={handleCancelEditing}>Cancel</TodoButton>
                    </>
                  ) : (
                    <>
                      <TodoText>{todo.text}</TodoText>
                      <TodoButton onClick={() => handleRemoveTodo(todo.id)}>Delete</TodoButton>
                      <TodoButton onClick={() => handleTodoEditing(todo.id, todo.text)}>Edit</TodoButton>
                      <TodoButton onClick={() => handleAddNote(todo.id, prompt('Enter a note:'))}>Notes</TodoButton>
                      {notes[todo.id] && (
                        <Notes>Notes: {notes[todo.id]}</Notes>
                      )}
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
