import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, getTodos } from '../features/todo.slice';
import TodoList from './TodoList';

const TodoForm = () => {
    const dispatch = useDispatch();
    const [addtodo, setAddTodo] = useState({
        title: "",
        description: "",
        completed: false,
    });
    
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setAddTodo(prevTodo => ({
            ...prevTodo,
            [name]: type === 'checkbox' ? checked : value
        }));
    }, []);

  //  console.log(todos);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(addtodo.description && addtodo.description) {
            dispatch(createTodo(addtodo));
            setAddTodo({
                title: "",
                description: "",
                completed: false,
            });
        }
    };

    return (
        <div className='container min-h-screen flex justify-center p-4 bg-gray-100'>
            <div className='sm:w[100%] md:w-[70%] lg:w-[60%] bg-gray-300 shadow-md p-4'>
                <form onSubmit={handleSubmit} className='gap-2 p-4 bg-white rounded-xl flex items-center justify-center'>
                    {/* Checkbox for 'completed' */}
                    <input 
                        type="checkbox" 
                        id="completed" 
                        name="completed" 
                        checked={addtodo.completed} 
                        onChange={handleChange} 
                        className='scale-150'
                    />
                    {/* Title input */}
                    <input 
                        type="text" 
                        placeholder='Title' 
                        name="title" 
                        value={addtodo.title} 
                        onChange={handleChange} 
                        className='ml-2 border-1 p-1 border-gray-700 rounded-md focus:ring-1
                         placeholder:text-black' 
                    />
                    {/* Description input */}
                    <input 
                        id="description" 
                        name="description" 
                        value={addtodo.description} 
                        onChange={handleChange} 
                        placeholder='description' 
                        className='ml-2 border-1 p-1 border-gray-700 rounded-md focus:ring-1
                        placeholder:text-black' 
                    />
                    {/* Submit button */}
                    <button 
                        type="submit" 
                        className='bg-blue-500 p-1 px-2 rounded-sm hover:bg-blue-700 transition duration-300 delay-300 ease-in-out cursor-pointer hover:scale-105'>
                        Add Todo
                    </button>
                </form>
                {/* TodoList component */}
                <TodoList />
            </div>
        </div>
    );
};

export default TodoForm;
