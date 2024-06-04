// components/TodoList.jsx

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTodos } from '../features/todos/todosSlice';
// import TodoItem from './TodoItem'; // Import TodoItem component

// const TodoList = () => {
//   const dispatch = useDispatch();
//   const todos = useSelector(state => state.todos.todos);

//   useEffect(() => {
//     dispatch(fetchTodos());
//   }, [dispatch]);

//   return (
//     <ul>
//       {todos.map(todo => (
//         <TodoItem key={todo.id} todo={todo} />
//       ))}
//     </ul>
//   );
// };

// export default TodoList;









import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, deleteTodo, toggleTodo } from '../features/todos/todosSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => dispatch(toggleTodo(todo.id))}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
