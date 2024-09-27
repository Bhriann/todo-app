import React, { useState } from "react";
import './App.css'; 

function TodoItem({ todo, onToggleComplete, onEdit, onRemove, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onSave(todo.id, editText);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditText(todo.text);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {editMode ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span className={todo.completed ? "strike" : ""}>{todo.text}</span>
      )}

      <div className="todo-actions">
        {editMode ? (
          <>
            <button onClick={handleSave} disabled={!editText.trim()}>
              Save
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            {!todo.completed && (
              <button onClick={() => onToggleComplete(todo.id)}>
                Complete
              </button>
            )}
            {todo.completed && (
              <button onClick={() => onToggleComplete(todo.id)}>
                Undo
              </button>
            )}
            <button
              onClick={() => setEditMode(true)}
              disabled={editMode || todo.completed}
            >
              Edit
            </button>
            <button
              onClick={() => onRemove(todo.id)}
              disabled={todo.completed || editMode}
            >
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemove = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleSave = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <img src="./images/MyTodoList Logo.png" alt="My Logo" className="app-logo" />
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Type your new activity..."
        />
        <button onClick={handleAddTodo}>Add Activity</button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
        <p><b>No activities available</b></p>
        ) : (
              todos.map(todo => (
              <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={handleToggleComplete}
                    onRemove={handleRemove}
                    onSave={handleSave}
              />
            ))
         )}
      </div>
    </div>
  );
}

export default App;


