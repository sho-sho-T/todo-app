import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Todo = {
  id: number;
  task: string;
  status: 'todo' | 'in_progress' | 'done';
};

export const TODO_APP_ROOT_URL = 'https://api.todo-app.workers.dev'

export const TodoList = () => {

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${TODO_APP_ROOT_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const deleteTodo = async (id: any) => {
    try {
      await axios.delete(`${TODO_APP_ROOT_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">タスク一覧</h2>
        <ul className="mb-4 space-y-4">
          {todos.map((todo) => (
            <li key={todo.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <span className="text-lg">{todo.task}</span>
                <div>
                  <Link to={`/editTodo/${todo.id}`} className="text-blue-500 mr-4">
                    編集
                  </Link>
                  <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
                    削除
                  </button>
                </div>
              </div>
              {todo.status && <p className="mt-2 text-gray-500">{todo.status}</p>}
            </li>
          ))}
        </ul>
      <Link to="/addTodo" className="bg-blue-500 text-white px-4 py-2 rounded block text-center">
        タスクを追加
      </Link>
   </div>
  )
};