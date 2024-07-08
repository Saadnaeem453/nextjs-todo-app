"use client"

import { AddTodo, DeleteTodo, FetchTodoById, FetchTodos, UpdateTodo } from '@/services/TodoService';
import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

interface Todo {
    _id: string;
    content: string;
}

interface Prop {
    initialTodos: Todo[];
}
const TodoList: React.FC<Prop> = ({ initialTodos }) => {

    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodo, setNewTodo] = useState<string>('');
    const [editTodoId, setEditTodoId] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            await fetchTodos();
        };

        fetchData();
    }, []);

    const handleAddTodo = async () => {
        if (!newTodo || newTodo.trim().length === 0) {
            return;
        }

        if (editTodoId) {
            try {
                const updatedTodo = await UpdateTodo(editTodoId, newTodo);
                await fetchTodos();
                setNewTodo('');
                setEditTodoId(null);
            } catch (error) {
                console.error("Error updating todo:", error);
            }
        } else {
            try {
                await AddTodo(newTodo);
                await fetchTodos();
                setNewTodo('');
            } catch (error) {
                console.error("Error adding todo:", error);
            }
        }
    };

    const handleDeleteTodo = async (id: string) => {
        try {
            await DeleteTodo(id);
            await fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleUpdateTodo = async (id: string) => {
        try {
            const fetchTodoById = await FetchTodoById(id);
            setNewTodo(fetchTodoById.content);
            setEditTodoId(fetchTodoById._id);
        } catch (error) {
            console.error("Error fetching todo by id:", error);
        }
    };

    const fetchTodos = async () => {
        const todos = await FetchTodos();
        setTodos(todos);
    };

    return (
        <div className="mt-0 mb-10">
            <div className="w-full  p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">Todo List</h1>
                </div>
                <div className="flex mb-6">
                    <input
                        type="text"
                        className="flex-grow p-4 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Add a new todo"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white p-4 rounded-r-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        onClick={handleAddTodo}
                    >
                        {editTodoId ? "Update Todo" : "Add Todo"}
                    </button>
                </div>
                <ul className="space-y-4">
                    {todos && todos.map(todo => (
                        <li
                            key={todo._id}
                            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm transition transform hover:scale-105 duration-300"
                        >
                            <span className="text-lg text-gray-800 dark:text-gray-100">{todo.content}</span>
                            <div className="flex space-x-2">
                                <button
                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                                    onClick={() => handleDeleteTodo(todo._id)}
                                >
                                    <FaTrashAlt className="h-6 w-6" />
                                </button>
                                <button
                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    onClick={() => handleUpdateTodo(todo._id)}
                                >
                                    <FaPencilAlt className="h-6 w-6" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
