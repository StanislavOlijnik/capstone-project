import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const [priority, setPriority] = useState('medium');

  function addNewTodo() {
    if (newTodo.trim() !== '') {
      const todoItem = {
        id: Math.random().toString(32).substring(2),
        text: newTodo,
        priority: priority,
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

    if (editedTodoText.trim() === '') {
      return;
    }

    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditedTodoText('');
  }

  function handlePriorityChange(event) {
    setPriority(event.target.value);
  }

  const priorityGroups = {
    high: todos.filter(todo => todo.priority === 'high'),
    medium: todos.filter(todo => todo.priority === 'medium'),
    low: todos.filter(todo => todo.priority === 'low'),
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <select value={priority} onChange={handlePriorityChange}>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <button onClick={addNewTodo}>Add</button>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h3>High Priority</h3>
          <ul>
            {priorityGroups.high.map((todo) => (
              <li key={todo.id}>
                {editTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTodoText}
                      onChange={(e) => setEditedTodoText(e.target.value)}
                    />
                    <button onClick={() => saveEditedTodo(todo.id)}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                    {todo.text}
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                    <button onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Medium Priority</h3>
          <ul>
            {priorityGroups.medium.map((todo) => (
              <li key={todo.id}>
                {editTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTodoText}
                      onChange={(e) => setEditedTodoText(e.target.value)}
                    />
                    <button onClick={() => saveEditedTodo(todo.id)}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                    {todo.text}
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                    <button onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Low Priority</h3>
          <ul>
            {priorityGroups.low.map((todo) => (
              <li key={todo.id}>
                {editTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTodoText}
                      onChange={(e) => setEditedTodoText(e.target.value)}
                    />
                    <button onClick={() => saveEditedTodo(todo.id)}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                    {todo.text}
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                    <button onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={() => setTodos([])}>Clear All</button>
    </div>
  );
}

export default TodoList;