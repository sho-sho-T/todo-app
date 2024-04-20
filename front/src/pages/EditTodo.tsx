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
    <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">タスクを編集</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="task" className="block mb-2 font-medium">
                    タスク:
                    </label>
                    <input
                    type="text"
                    id="task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block mb-2 font-medium">
                    ステータス:
                    </label>
                    <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="todo">未完了</option>
                    <option value="in_progress">進行中</option>
                    <option value="done">完了</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    更新
                </button>
            </form>
    </div>
  );
};