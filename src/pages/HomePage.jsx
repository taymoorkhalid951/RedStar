import React from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const HomePage = () => {
  return (
    <div className='container'>
      <h1>My Todo</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default HomePage;
