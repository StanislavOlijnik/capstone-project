import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  function addNewTodo() {
    if (newTodo.trim() !== '') {
      
      const todoItem = {
        id: Math.random().toString(32).substring(2),
        text: newTodo,
      };
      setTodos([...todos, todoItem]);
      setNewTodo('');
    }
  }

  function removeTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div>
      <h2>Tasks</h2>
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addNewTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={() => setTodos([])}>Clear All</button>
    </div>
  );
}

export default TodoList;
