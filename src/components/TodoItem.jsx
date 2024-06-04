// components/TodoItem.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../features/todos/todosSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <li>
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </span>
      <button onClick={handleToggle}>
        {todo.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
