"use client";
import { useState } from 'react';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      {/* Top Menu Bar */}
      <nav className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Todo App</div>
        </div>
      </nav>

      {/* ToDo App Content */}
      <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>

        {/* Todo Input */}
        <div className="flex mb-6">
          <input
            type="text"
            className="flex-grow p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-4 rounded-r-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={addTodo}
          >
            <FaPlusCircle className="h-6 w-6" />
          </button>
        </div>

        {/* Todo Items */}
        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <span className="text-lg">{todo}</span>
              <button
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setTodos(todos.filter((_, i) => i !== index))}
              >
                <FaTrashAlt className="h-6 w-6" />
              </button>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}
