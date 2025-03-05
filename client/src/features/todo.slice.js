import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/axiosInstance";

const initialState = {
   todos: [],
   responseStatus: "",
   responseMessage: ""
};

export const createTodo = createAsyncThunk(
    "todo/createTodo", async(todo, { rejectWithValue }) => {
        const token = localStorage.getItem("user");
        try {
            const response = await api.post("/todos/addtodo", todo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getTodos = createAsyncThunk(
    "todo/getTodos", async(_, { rejectWithValue }) => {
        const token = localStorage.getItem("user");
        try {
            const response = await api.get("todos/gettodos", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateTodo = createAsyncThunk(
    "todo/updateTodo", async(todo, { rejectWithValue }) => {
        const token = localStorage.getItem("user");
        console.log("todo: ",todo);
        try {
            const response = await api.put(`/todos/updatetodo/${todo._id}`, todo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todo/deleteTodo", async(todoId, { rejectWithValue }) => {
        const token = localStorage.getItem("user");
        try {
            await api.delete(`/todos/deletetodo/${todoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return todoId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createTodo lifecycle
            .addCase(createTodo.pending, (state) => {
                state.responseStatus = "pending";
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                const { title, completed, _id, description } = action.payload.data;
                state.todos.push({
                    title,
                    completed,
                    _id,
                    description
                });
                state.responseStatus = "success";
                state.responseMessage = "Todo created successfully";
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.responseStatus = "error";
                state.responseMessage = action.payload;
            })

           
            .addCase(getTodos.pending, (state) => {
                state.responseStatus = "pending";
            })
            .addCase(getTodos.fulfilled, (state, action) => {
               // console.log(action)
                state.todos = action.payload.data.map(t => ({
                    title: t.title,
                    completed: t.completed,
                    _id: t._id,
                    description: t.description
                }));
                state.responseStatus = "success";
                state.responseMessage = "Todos fetched successfully";
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.responseStatus = "error";
                state.responseMessage = action.payload;
            })

            
            .addCase(updateTodo.pending, (state) => {
                state.responseStatus = "pending";
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const updatedTodos = state.todos.map(todo =>
                    todo._id === action.payload._id ? action.payload : todo
                );
                state.todos = updatedTodos;
                state.responseStatus = "success";
                state.responseMessage = "Todo updated successfully";
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.responseStatus = "error";
                state.responseMessage = action.payload;
            })

            // deleteTodo lifecycle
            .addCase(deleteTodo.pending, (state) => {
                state.responseStatus = "pending";
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const remainingTodos = state.todos.filter(todo => todo._id !== action.payload);
                state.todos = remainingTodos;
                state.responseStatus = "success";
                state.responseMessage = "Todo deleted successfully";
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.responseStatus = "error";
                state.responseMessage = action.payload;
            });
    }
});

export default todoSlice.reducer;
