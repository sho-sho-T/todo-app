import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TODO_APP_ROOT_URL } from './TodoList'
import axios from 'axios';

export const EditTodo = () => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('todo');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${TODO_APP_ROOT_URL}/todos/${id}`);
        const { task, status } = response.data;
        setTask(task);
        setStatus(status);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };
  
    fetchTodo();
  }, [id]);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`${TODO_APP_ROOT_URL}/todos/${id}`, { task, status });
      navigate('/');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
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
        <div className="mb-4">
          <label htmlFor="status" className="block mb-2">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};