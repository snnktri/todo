import React, {useEffect, useState} from 'react';
import { deleteTodo, updateTodo, getTodos } from '../features/todo.slice';
import { useSelector, useDispatch } from 'react-redux';
const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.todos);
   useEffect(() => {
          const getTodo = () => {
              dispatch(getTodos())
          }
          getTodo();
     }, [dispatch])
   // console.log(todos);
  return (
    
      <div className='p-2 w-full'>
        <h2 className='text-center text-xl uppercase font-semibold'>To-Do List</h2>
        {todos.map(todo => (
          <div key={todo._id} className='w-full'>
            <Item todo={todo} />
          </div>
        ))}
      </div>
    
  )
}

const Item = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    _id: todo._id,
  });

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox separately
    }));
  };

  const handleUpdate = () => {
    dispatch(updateTodo(data));
    setIsEdit((prev) => !prev); // Toggle edit mode after saving
  };

  return (
    <div className='w-full flex gap-2 items-center'>
      <div className=''>
        {/* Checkbox for completed task */}
        <input 
          type="checkbox" 
          name="completed" 
          checked={data.completed} // Bind to data.completed
          onChange={handleChange} // Handle checkbox changes
          disabled={!isEdit} // Disable checkbox if not in edit mode
          className='scale-150 mr-3' />
        {/* Title input */}
        <input 
          type="text" 
          name="title" 
          value={data.title} // Bind to data.title
          readOnly={!isEdit} // Read-only when not in edit mode
          onChange={handleChange} 
          // Handle title changes
        />
        {/* Description input */}
        <input 
          type="text" 
          name="description" 
          value={data.description} // Bind to data.description
          readOnly={!isEdit} // Read-only when not in edit mode
          onChange={handleChange} // Handle description changes
        />
        {/* Edit/Save button */}
        <button onClick={handleUpdate}
        className='p-2 bg-blue-500 m-2 px-4 rounded-md hover:bg-blue-700 text-white'>
          {isEdit ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Delete button */}
      <button onClick={handleDelete}
      className=' h-[100%] p-2 bg-red-500 rounded-md hover:bg-red-700 text-white'>Delete</button>
    </div>
  );
};

export default TodoList
