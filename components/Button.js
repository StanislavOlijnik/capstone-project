import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);  
  const [newTodo, setNewTodo] = useState('');  

  function handleAddTodo() {
    if (newTodo.trim() !== '') {
      
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  }

  return (
    <div>
      <h2>Tasks</h2>
      {}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      {}
      <button onClick={handleAddTodo}>add new Task</button>
      {}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

