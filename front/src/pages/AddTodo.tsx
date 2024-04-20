import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TODO_APP_ROOT_URL } from './TodoList'
import axios from 'axios';

export const AddTodo = () => {
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${TODO_APP_ROOT_URL}/todos`, { task, status: 'todo' });
        navigate('/')
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="task" className="block mb-2">Task:</label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </form>
    </div>
  );
};