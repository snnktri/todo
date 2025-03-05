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
    <div>
      <div>
        <h2>To-Do List</h2>
        {todos.map(todo => (
          <div key={todo._id}>
            <Item todo={todo} />
          </div>
        ))}
      </div>
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
    <div>
      <div>
        {/* Checkbox for completed task */}
        <input 
          type="checkbox" 
          name="completed" 
          checked={data.completed} // Bind to data.completed
          onChange={handleChange} // Handle checkbox changes
          disabled={!isEdit} // Disable checkbox if not in edit mode
        />
        {/* Title input */}
        <input 
          type="text" 
          name="title" 
          value={data.title} // Bind to data.title
          readOnly={!isEdit} // Read-only when not in edit mode
          onChange={handleChange} // Handle title changes
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
        <button onClick={handleUpdate}>
          {isEdit ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Delete button */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoList
