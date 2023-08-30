import React, { useState } from 'react';
import {
  CenteredContainer,
  TodoContainer,
  PriorityTitle,
  HighPriorityTitle,
  TodoItem,
  TodoText,
  ButtonContainer,
  TodoButton,
  DoneButton,
  NotesButton,
  Notes,
  ClearAllButton,
  AppTitle, 
  TodoInput,
  PrioritySelect,
  GlobalStyle,
} from './styled-components';


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
        completed: false,
      };
      setTodos([...todos, todoItem]);
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id) => {
    const confirmDelete = window.confirm('Bist du sicher dass du es löschen möchtest ');
    if (confirmDelete) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  const handleAddNote = (id, note) => {
    if (note && note.trim() !== '') { 
      const noteWords = note.split(' ');
  
      if (note && noteWords) {
        if (noteWords.length <= 1 && note.length <= 12) {
          const truncatedNote = noteWords.slice(0, 6).join(' ');
          setNotes((prevNotes) => ({ ...prevNotes, [id]: truncatedNote }));
        } else {
          alert('Maximal 12 Zeichen sind für Notizen erlaubt.');
        }
      } else {
        alert('Bitte geben Sie eine gültige Notiz ein.');
      }
    };
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === taskId ? { ...todo, completed: true } : todo
    );

    setTodos(updatedTodos);
  };

  const priorityGroups = {
    high: todos.filter((todo) => todo.priority === 'high'),
    medium: todos.filter((todo) => todo.priority === 'medium'),
    low: todos.filter((todo) => todo.priority === 'low'),
  };

  return (
    <CenteredContainer >
      
      <div>
        <input type="text" value={newTodo} onChange={handleNewTodoChange} />
        <select value={priority} onChange={handlePriorityChange}>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <TodoButton add onClick={handleAddNewTodo}>Add</TodoButton>
  
        {Object.keys(priorityGroups).map((priorityKey) => (
          <TodoContainer key={priorityKey}>
            {priorityKey === 'high' ? (
              <HighPriorityTitle style={{ color: 'red' }}>{priorityKey} Priority</HighPriorityTitle>
            ) : priorityKey === 'medium' ? (
              <PriorityTitle style={{ color: 'orange' }}>{priorityKey} Priority</PriorityTitle>
            ) : (
              <PriorityTitle style={{ color: 'green' }}>{priorityKey} Priority</PriorityTitle>
            )}
            <ul>
              {priorityGroups[priorityKey].map((todo) => (
                <TodoItem key={todo.id}>
                  {editTodoId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editedTodoText}
                        onChange={(event) => setEditedTodoText(event.target.value)}
                        maxLength="12"
                      />
                      <ButtonContainer>
                        <TodoButton onClick={() => handleTodoSaving(todo.id)} add>
                          OK
                        </TodoButton>
                        <TodoButton onClick={handleCancelEditing} clear>
                          Cancel
                        </TodoButton>
                      </ButtonContainer>
                    </>
                  ) : (
                    <>
                      <TodoText completed={todo.completed}>{todo.text}</TodoText>
                      <ButtonContainer>
                        <DoneButton onClick={() => handleTaskCompletion(todo.id)}>Done</DoneButton>
                        <TodoButton clear onClick={() => handleRemoveTodo(todo.id)}>
                          Delete
                        </TodoButton>
                        <TodoButton edit onClick={() => handleTodoEditing(todo.id, todo.text)}>
                          Edit
                        </TodoButton>
                        <TodoButton onClick={() => handleAddNote(todo.id, prompt('Geben Sie eine Notiz ein:'))}>
                          <NotesButton>Notes</NotesButton>
                        </TodoButton>
                      </ButtonContainer>
                      {notes[todo.id] && <Notes>Notes: {notes[todo.id]}</Notes>}
                    </>
                  )}
                </TodoItem>
              ))}
            </ul>
          </TodoContainer>
        ))}
  
  <ClearAllButton onClick={() => setTodos([])}>Clear All</ClearAllButton>
      </div>
        </CenteredContainer>
  );
}

export default function App() {
  return <TodoList />;
}