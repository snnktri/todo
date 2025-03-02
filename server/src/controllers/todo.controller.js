import { Todo } from "../models/todo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const addTodo = asyncHandler(async(req, res) => {
    const { title, description, subTodo, completed } = req.body;
    if(!title ||!description) {
        throw new ApiError(400, "Title, description are required");
    }
    const user = req.user._id;

    const existUser = await User.findById(user);
    if(!existUser) {
        throw new ApiError(404, "User not found");
    }

    console.log()


    const todo = new Todo({
        title,               
        description,          
        subTodo: subTodo.map(sub => ({
            title: sub.title,          
            description: sub.description, 
            completed: false            
        })),
        user,                  
        completed: false       
    });
    

    await todo.save();
    await todo.save();

    return res.status(201).
    json(new ApiResponse(
        200,
        todo,
        "Todo added successfully"
    ))
});

export const getTodos = asyncHandler(async(req, res) => {
    const user = req.user._id;

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const userExists = await User.findById(user);

    if(!userExists) {
        throw new ApiError(404, "User not found");
    }

    const todos = await Todo.find({ user });

    if(!todos || todos.length < 0) {
        throw new ApiError(404, "No todos found");
    }
    return res.json(new ApiResponse(
        200,
        todos,
        "Todos fetched successfully"
    ));
});

export const updateTodo = asyncHandler(async(req, res) => {
    const _id = req.params.id;
    const { title, description, subTodo, completed } = req.body;
    if(!_id) {
        throw new ApiError(400, "id is required");
    }
    const user = req.user._id;
    const existUser = await User.findById(user);
    if(!existUser) {
        throw new ApiError(404, "User not found");
    }
    const todo = await Todo.findByIdAndUpdate(_id, { title,
        description, 
        subTodo: subTodo.map(todo => ({
            title: todo.title,
            description: todo.description,
            completed: false,
            _id: todo._id
        })),
        completed }, { new: true });
    if(!todo) {
        throw new ApiError(404, "Todo not found");
    }
    return res.json(new ApiResponse(
        200,
        todo,
        "Todo updated successfully"
    ));
});

export const deleteTodo = asyncHandler(async(req, res) => {
    const id  = req.params.id;
   // console.log(req.params);
    const user = req.user._id;
    if(!id) {
        throw new ApiError(400, "id is required");
    }
    const existUser = await User.findById(user);
    if(!existUser) {
        throw new ApiError(404, "User not found");
    }
    const todo = await Todo.findByIdAndDelete({
        _id: id
    });

    if(!todo) {
        throw new ApiError(404, "Todo not found");
    }

    return res.json(new ApiResponse(
        200,
        {},
        "Todo deleted successfully"
    ));
});