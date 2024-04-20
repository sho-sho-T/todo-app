import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TODO_APP_ROOT_URL } from './TodoList'
import axios from 'axios';

export const AddTodo = () => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('todo');
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
    <div className="max-w-md mx-auto">
 <h2 className="text-xl font-bold mb-4">タスクを追加</h2>
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
       placeholder="タスクを入力してください"
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
     追加
   </button>
 </form>
</div>
  );
};