import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');

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

  function startEditing(id, text) {
    setEditTodoId(id);
    setEditedTodoText(text);
  }

  function cancelEditing() {
    setEditTodoId(null);
    setEditedTodoText('');
  }

  function saveEditedTodo(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editedTodoText } : todo
    );
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditedTodoText('');
  }

  return (
    <div>
      <h2>Tasks</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addNewTodo}>Add</button>
      <ul>
        {todos.map((todo) => {
          if (editTodoId === todo.id) {
            return (
              <li key={todo.id}>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                />
                <button onClick={() => saveEditedTodo(todo.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </li>
            );
          } else {
            return (
              <li key={todo.id}>
                {todo.text}
                <button onClick={() => removeTodo(todo.id)}>Delete</button>
                <button onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
              </li>
            );
          }
        })}
      </ul>
      <button onClick={() => setTodos([])}>Clear All</button>
    </div>
  );
}

export default TodoList;
